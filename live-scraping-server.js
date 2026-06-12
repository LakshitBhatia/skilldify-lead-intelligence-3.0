const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

loadEnvFile(path.join(__dirname, ".env"));

const PORT = Number(process.env.PORT || 4174);
const ROOT = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8"
};

const phoneResults = new Map();

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (key && !process.env[key]) process.env[key] = value;
  }
}

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type"
  });
  res.end(JSON.stringify(body, null, 2));
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        req.destroy();
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function hasConfiguredKey(value, placeholder) {
  return Boolean(value && value.trim() && value.trim() !== placeholder);
}

function scoreLead(lead) {
  const text = Object.values(lead).join(" ").toLowerCase();
  let score = 30;
  if (/gurgaon|gurugram|dwarka|delhi|ncr|noida|dubai/.test(text)) score += 20;
  if (/founder|owner|director|ceo|partner|broker|consultant|advisor|realty|real estate|property/.test(text)) score += 20;
  if (/luxury|premium|real estate|property|investment|new launch|residential|dwarka expressway/.test(text)) score += 20;
  if (lead.email) score += 5;
  if (lead.phone) score += 5;
  return Math.min(score, 100);
}

function withPriority(lead) {
  const score = scoreLead(lead);
  return {
    ...lead,
    score,
    priority: score >= 80 ? "A" : score >= 60 ? "B" : "C"
  };
}

function calculateFitScore(lead) {
  const text = Object.values(lead).join(" ").toLowerCase();
  let fit = 1;
  if (/real estate|property|realty|broker|channel partner|consultant|advisory/.test(text)) fit = Math.max(fit, 2);
  if (/luxury|premium|residential|golf course|gurgaon|gurugram|delhi|noida/.test(text)) fit = Math.max(fit, 3);
  if (/camellias|magnolias|dlf|golf links|trump towers|hni|nri|ultra/.test(text)) fit = Math.max(fit, 4);
  if ((/camellias|magnolias|dlf golf links|trump towers|25 cr|50 cr|ultra-luxury/.test(text)) && (lead.email || lead.phone || lead.linkedin)) fit = 5;
  return fit;
}

function normalizeApolloPerson(person, query) {
  const organization = person.organization || person.account || {};
  const lead = {
    apolloId: person.id || "",
    hasEmail: Boolean(person.has_email || person.email),
    hasDirectPhone: Boolean(person.has_direct_phone || person.phone_numbers?.length || person.sanitized_phone),
    firm: organization.name || person.company || "",
    keyPerson: [person.first_name, person.last_name].filter(Boolean).join(" ") || person.name || "Unknown",
    title: person.title || "",
    phone: person.phone_numbers?.[0]?.raw_number || person.sanitized_phone || "",
    email: person.email || "",
    linkedin: person.linkedin_url || "",
    instagram: "",
    luxuryEvidence: `${person.title || "Profile"} matched Apollo query "${query}". Verify Camellias / DLF Golf Links / Magnolias evidence via web enrichment.`,
    source: "Apollo",
    city: [person.city, person.state, person.country].filter(Boolean).join(", "),
    website: organization.website_url || ""
  };
  lead.fitScore = calculateFitScore(lead);
  return lead;
}

function getApolloPhoneWebhookUrl() {
  if (process.env.APOLLO_PHONE_WEBHOOK_URL) return process.env.APOLLO_PHONE_WEBHOOK_URL;
  if (process.env.PUBLIC_BASE_URL) return `${process.env.PUBLIC_BASE_URL.replace(/\/$/, "")}/api/apollo-phone-webhook`;
  return "";
}

async function requestApolloPhoneReveal(lead, apiKey) {
  const webhookUrl = getApolloPhoneWebhookUrl();
  if (!lead.apolloId || !lead.hasDirectPhone || !webhookUrl) return "";

  const phoneUrl = new URL("https://api.apollo.io/api/v1/people/match");
  phoneUrl.searchParams.set("id", lead.apolloId);
  phoneUrl.searchParams.set("reveal_phone_number", "true");
  phoneUrl.searchParams.set("webhook_url", webhookUrl);

  const response = await fetch(phoneUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      "accept": "application/json",
      "x-api-key": apiKey
    }
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    return data.error || data.message || `Phone request failed with ${response.status}`;
  }

  return "Phone requested; Apollo will send it to webhook";
}

async function enrichApolloLeadEmail(lead, apiKey) {
  if (!lead.apolloId) {
    return {
      ...lead,
      email: lead.email || "Not available from Apollo search",
      phone: lead.phone || (lead.hasDirectPhone ? "Requires Apollo phone reveal" : "Not available in Apollo")
    };
  }

  const url = new URL("https://api.apollo.io/api/v1/people/match");
  url.searchParams.set("id", lead.apolloId);
  url.searchParams.set("reveal_personal_emails", "true");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "accept": "application/json",
        "x-api-key": apiKey
      }
    });
    const data = await response.json();
    const person = data.person || {};
    const email = person.email || person.personal_emails?.[0] || lead.email || "";
    const linkedin = person.linkedin_url || lead.linkedin || "";
    const name = person.name || lead.keyPerson;
    const phoneRequestStatus = await requestApolloPhoneReveal(lead, apiKey);

    return {
      ...lead,
      keyPerson: name,
      email: email || (lead.hasEmail ? "Email not revealed by Apollo plan/credits" : "Not available in Apollo"),
      linkedin,
      phone: lead.phone || phoneRequestStatus || (lead.hasDirectPhone ? "Needs hosted webhook URL" : "Not available in Apollo"),
      luxuryEvidence: `${lead.luxuryEvidence} Email enrichment ${email ? "completed" : "attempted"}.`
    };
  } catch (error) {
    return {
      ...lead,
      email: lead.email || `Email enrichment failed: ${error.message}`,
      phone: lead.phone || (lead.hasDirectPhone ? "Requires Apollo phone reveal" : "Not available in Apollo")
    };
  }
}

async function googlePlacesSearch(query) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!hasConfiguredKey(key, "paste_your_google_places_api_key_here")) {
    return {
      ok: false,
      setupRequired: true,
      message: "GOOGLE_MAPS_API_KEY is missing. Add it before running a live Google Maps System."
    };
  }

  const textSearchUrl = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
  textSearchUrl.searchParams.set("query", query);
  textSearchUrl.searchParams.set("key", key);

  const searchResponse = await fetch(textSearchUrl);
  const searchData = await searchResponse.json();

  if (searchData.status && !["OK", "ZERO_RESULTS"].includes(searchData.status)) {
    return { ok: false, provider: "google", message: searchData.error_message || searchData.status };
  }

  const baseResults = (searchData.results || []).slice(0, 12);
  const leads = [];

  for (const place of baseResults) {
    const detailsUrl = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    detailsUrl.searchParams.set("place_id", place.place_id);
    detailsUrl.searchParams.set("fields", "name,formatted_phone_number,international_phone_number,website,formatted_address,rating,user_ratings_total,url,types");
    detailsUrl.searchParams.set("key", key);

    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();
    const d = detailsData.result || {};

    leads.push(withPriority({
      name: d.name || place.name || "Unknown business",
      company: d.name || place.name || "Unknown business",
      segment: "broker",
      phone: d.international_phone_number || d.formatted_phone_number || "",
      email: "",
      city: d.formatted_address || place.formatted_address || "",
      source: "Google Places",
      sourceUrl: d.url || "",
      website: d.website || "",
      reason: `Matched Google Maps query "${query}". Rating ${d.rating || "NA"} from ${d.user_ratings_total || 0} reviews.`
    }));
  }

  return { ok: true, provider: "google", leads };
}

async function apolloSearch(query, city) {
  const key = process.env.APOLLO_API_KEY;
  if (!hasConfiguredKey(key, "paste_your_apollo_api_key_here")) {
    return {
      ok: false,
      setupRequired: true,
      message: "APOLLO_API_KEY is missing. Add it before running a live Apollo System."
    };
  }

  const titles = [
    "Founder",
    "Owner",
    "Director",
    "Real Estate Consultant",
    "Property Consultant",
    "Channel Partner",
    "Sales Head"
  ];

  const response = await fetch("https://api.apollo.io/api/v1/mixed_people/api_search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key
    },
    body: JSON.stringify({
      q_keywords: query,
      person_titles: titles,
      person_locations: city ? [city] : ["Gurgaon", "Delhi", "Noida"],
      page: 1,
      per_page: 25
    })
  });

  const data = await response.json();
  if (!response.ok) {
    return { ok: false, provider: "apollo", message: data.message || `Apollo request failed with ${response.status}` };
  }

  const people = data.people || data.contacts || [];
  const leads = people.map((person) => withPriority({
    name: [person.first_name, person.last_name].filter(Boolean).join(" ") || person.name || "Unknown",
    company: person.organization?.name || person.account?.name || person.company || "",
    segment: "broker",
    phone: person.phone_numbers?.[0]?.raw_number || person.sanitized_phone || "",
    email: person.email || "",
    city: person.city || person.state || person.country || "",
    source: "Apollo",
    sourceUrl: person.linkedin_url || "",
    website: person.organization?.website_url || "",
    reason: `${person.title || "Profile"} matched Apollo query "${query}".`
  }));

  return { ok: true, provider: "apollo", leads };
}

async function apolloChannelPartnerResearch(options = {}) {
  const key = process.env.APOLLO_API_KEY;
  if (!hasConfiguredKey(key, "paste_your_apollo_api_key_here")) {
    return {
      ok: false,
      setupRequired: true,
      message: "APOLLO_API_KEY is missing. Add it before running Apollo research."
    };
  }

  const city = options.city || "Gurgaon";
  const keywords = options.keywords?.length ? options.keywords : [
    "luxury real estate",
    "channel partner",
    "property consultant",
    "real estate advisory",
    "luxury homes",
    "ultra luxury homes",
    "Golf Course Road"
  ];

  const titles = [
    "Founder",
    "Director",
    "Managing Director",
    "Partner",
    "CEO",
    "Head of Sales",
    "Luxury Sales Head",
    "Real Estate Consultant",
    "Property Consultant"
  ];

  const locations = city.toLowerCase().includes("delhi ncr")
    ? ["Gurgaon", "Gurugram", "New Delhi", "Noida"]
    : [city];

  const all = [];
  const searches = [];

  for (const keyword of keywords.slice(0, 7)) {
    const response = await fetch("https://api.apollo.io/api/v1/mixed_people/api_search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key
      },
      body: JSON.stringify({
        q_keywords: keyword,
        person_titles: titles,
        person_locations: locations,
        organization_num_employees_ranges: ["1,10", "11,50", "51,200"],
        page: 1,
        per_page: 10
      })
    });

    const data = await response.json();
    searches.push({ keyword, status: response.status, count: (data.people || data.contacts || []).length });

    if (!response.ok) {
      all.push({
        firm: "Apollo request issue",
        keyPerson: "",
        title: "",
        phone: "",
        email: "",
        linkedin: "",
        instagram: "",
        luxuryEvidence: data.message || `Apollo request failed for "${keyword}" with ${response.status}`,
        source: "Apollo",
        fitScore: 1
      });
      continue;
    }

    const people = data.people || data.contacts || [];
    all.push(...people.map((person) => normalizeApolloPerson(person, keyword)));
  }

  const seen = new Set();
  const deduped = [];
  for (const lead of all) {
    const keyParts = [lead.email, lead.linkedin, lead.keyPerson, lead.firm].filter(Boolean).join("|").toLowerCase();
    if (!keyParts || seen.has(keyParts)) continue;
    seen.add(keyParts);
    deduped.push(lead);
  }

  deduped.sort((a, b) => (b.fitScore || 0) - (a.fitScore || 0));
  const limited = deduped.slice(0, Number(options.limit || 40));
  const enriched = [];
  for (const lead of limited) {
    const enrichedLead = await enrichApolloLeadEmail(lead, key);
    enrichedLead.fitScore = calculateFitScore(enrichedLead);
    enriched.push(enrichedLead);
  }
  enriched.sort((a, b) => (b.fitScore || 0) - (a.fitScore || 0));

  return {
    ok: true,
    provider: "apollo",
    searches,
    rows: enriched,
    note: "Apollo results are live. Email enrichment is attempted through Apollo People Match. Phone numbers require Apollo phone reveal access."
  };
}

async function handleApi(req, res, url) {
  if (url.pathname === "/api/health") {
    return sendJson(res, 200, {
      ok: true,
      googleMapsConfigured: hasConfiguredKey(process.env.GOOGLE_MAPS_API_KEY, "paste_your_google_places_api_key_here"),
      apolloConfigured: hasConfiguredKey(process.env.APOLLO_API_KEY, "paste_your_apollo_api_key_here"),
      apolloPhoneWebhookConfigured: Boolean(getApolloPhoneWebhookUrl())
    });
  }

  if (url.pathname === "/api/apollo-phone-webhook" && req.method === "POST") {
    try {
      const body = await readRequestBody(req);
      const payload = body ? JSON.parse(body) : {};
      const items = [];
      if (Array.isArray(payload.people)) items.push(...payload.people);
      if (payload.person) items.push(payload.person);
      if (Array.isArray(payload)) items.push(...payload);
      if (!items.length) items.push(payload);

      for (const item of items) {
        const id = item.id || item._id || item.person_id || item.apollo_id || item.contact_id;
        const numbers = item.phone_numbers || item.phones || item.phone_number || item.mobile_phone || item.sanitized_phone || item.phone;
        if (id && numbers) phoneResults.set(String(id), numbers);
      }

      return sendJson(res, 200, { ok: true, stored: phoneResults.size });
    } catch (error) {
      return sendJson(res, 400, { ok: false, message: error.message });
    }
  }

  if (url.pathname === "/api/apollo-phone-results") {
    return sendJson(res, 200, {
      ok: true,
      results: Object.fromEntries(phoneResults.entries())
    });
  }

  if (url.pathname === "/api/live-search") {
    const source = url.searchParams.get("source") || "google";
    const keyword = url.searchParams.get("keyword") || "luxury real estate broker";
    const city = url.searchParams.get("city") || "Gurgaon";
    const query = `${keyword} ${city}`.trim();

    try {
      const result = source === "apollo"
        ? await apolloSearch(keyword, city)
        : await googlePlacesSearch(query);
      return sendJson(res, result.ok ? 200 : 400, result);
    } catch (error) {
      return sendJson(res, 500, { ok: false, message: error.message });
    }
  }

  if (url.pathname === "/api/apollo-channel-partners") {
    const city = url.searchParams.get("city") || "Delhi NCR";
    const limit = url.searchParams.get("limit") || "40";
    const keywords = (url.searchParams.get("keywords") || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    try {
      const result = await apolloChannelPartnerResearch({ city, limit, keywords });
      return sendJson(res, result.ok ? 200 : 400, result);
    } catch (error) {
      return sendJson(res, 500, { ok: false, message: error.message });
    }
  }

  return sendJson(res, 404, { ok: false, message: "API route not found." });
}

function serveStatic(req, res, url) {
  let filePath = decodeURIComponent(url.pathname);
  if (filePath === "/") filePath = "/skilldify-apollo-channel-partner-system.html";
  const resolved = path.resolve(ROOT, `.${filePath}`);
  if (!resolved.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.readFile(resolved, (error, data) => {
    if (error) {
      res.writeHead(404);
      return res.end("Not found");
    }
    const ext = path.extname(resolved);
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
    });
    return res.end();
  }

  if (url.pathname.startsWith("/api/")) {
    return handleApi(req, res, url);
  }
  serveStatic(req, res, url);
});

const HOST = process.env.HOST || "0.0.0.0";

server.listen(PORT, HOST, () => {
  console.log(`Skilldify lead system running on ${HOST}:${PORT}`);
  console.log(`Apollo configured: ${hasConfiguredKey(process.env.APOLLO_API_KEY, "paste_your_apollo_api_key_here")}`);
});

