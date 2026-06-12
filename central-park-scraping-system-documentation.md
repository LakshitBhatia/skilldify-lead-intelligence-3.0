# Central Park Lead Scraping System Documentation

## Purpose

This system Systemnstrates how Central Park Dwarka Expressway can build qualified lead lists for:

1. Channel partners and brokers.
2. Luxury buyer prospects.
3. HNI-like prospect profiles using public/professional signals.

The core idea is:

```text
ICP -> source search -> lead extraction -> enrichment -> scoring -> sales handoff
```

The system should not be presented as random number scraping. It is a qualification engine that extracts only leads matching defined criteria.

## What The Website Does

The website is an MVP System interface with these modules:

### 1. Overview

Shows the complete process from ICP to call-ready leads.

It explains that the system can collect and score leads from sources such as:

- Google Maps
- Apollo
- Sales Navigator exports
- broker websites
- real estate portals
- Clay enrichment workflows

### 2. ICP Builder

Defines the lead selection parameters before scraping starts.

User can select:

- lead segment
- geography
- target role/title
- intent or proof signal
- minimum lead score
- target extraction count

The system then creates a clear ICP statement.

### 3. Scraper Control Room

This section lets the user:

- select a source
- enter keywords
- enter city/market
- generate sample leads
- open live source searches
- import CSV leads from Apollo/Sales Navigator/Google Maps tools
- clear leads

The current website includes a sample lead generator. Real-time extraction requires API keys or approved source exports.

### 4. Integrations

### 4. Project Intelligence

Uses the uploaded Belanova ready reckoner and project video to make the system project-specific.

Extracted project points added to the website:

- Belanova Prive positioning: rarity in residence.
- Sector 48, Gurugram location.
- G+34 tower.
- 124 residences.
- 3-5 bed configurations.
- single unit per core.
- private lift lobbies.
- two dedicated elevators per unit.
- Unit C: 4,799 sq ft.
- Unit D: 4,328 sq ft.
- Unit A: 6,583 sq ft.
- Unit B: 5,827 sq ft.
- 114,000 sq ft exclusive clubhouse.
- 16 curated lounges and sky deck.
- 170+ bespoke amenities.

How this improves the System:

- broker leads can be filtered for ultra-luxury Gurgaon specialization.
- buyer leads can be filtered for people who can evaluate large-format 4,000+ sq ft residences.
- HNI-proxy leads can be scored around scarcity, lifestyle, investment, and premium product fit.
- sales scripts now include project-specific talking points.

### 5. Integrations

Shows how Apollo, Google Maps, LinkedIn/Sales Navigator, and Clay should connect.

Important integration positioning:

- Apollo can be connected directly through a backend API.
- Google Maps can be connected using Google Places API.
- LinkedIn/Sales Navigator should be used via approved export/manual workflow, not blind automated scraping.
- Clay is best used as an enrichment/scoring layer via webhook or workflow.

### 6. Lead Database

Displays extracted and imported leads.

Each lead has:

- priority
- name
- company/profile
- segment
- phone
- email
- city
- score
- reason to call
- source

The database supports:

- filtering by segment
- filtering A-priority leads
- searching leads
- exporting CSV

### 7. Sales Handoff

Provides call scripts and sales workflow for:

- brokers/channel partners
- buyer prospects
- HNI-proxy prospects

## How Leads Are Selected

### Segment 1: Channel Partners / Brokers

This is the best first segment for the builder.

Selection parameters:

| Parameter | Criteria |
|---|---|
| Location | Gurgaon, Delhi NCR, Dwarka Expressway, South Delhi, West Delhi |
| Business Type | Broker, channel partner, property consultant, real estate advisor |
| Title | Founder, Owner, Director, Sales Head, Real Estate Consultant |
| Specialization | Ultra-luxury property, Rs. 25-50 Cr inventory, Camellias, DLF Golf Links, Magnolias, Golf Course Road, penthouses, HNI/NRI clients |
| Proof | Website, Google listing, LinkedIn profile, Instagram, YouTube, portal listing |
| Contactability | Phone, email, LinkedIn, website |

Example search keywords:

```text
luxury real estate broker Gurgaon
ultra luxury real estate broker Gurgaon Camellias
DLF Golf Links channel partner
Magnolias broker Gurgaon
Golf Course Road luxury property consultant
property consultant Dwarka Expressway
channel partner Gurgaon real estate
new launch property broker Gurgaon
real estate consultant Sector 104 Gurgaon
Central Park 104 broker
```

## Apollo-First Ultra-Luxury Channel Partner Workflow

Use Apollo as the organized-company layer, then use web research for boutique CP firms.

### Step 1 - Apollo Organization Search

Run separate narrow searches. Do not cram all keywords into one search.

Filters:

```text
Industry: Real Estate
Location: Gurgaon, New Delhi, Noida, India
Company size: 1-200 employees
```

Run these keyword searches separately:

```text
luxury real estate
channel partner
property consultant
real estate advisory
luxury homes
ultra luxury homes
Golf Course Road
```

Compile one de-duplicated company list.

### Step 2 - Apollo People Search

Search inside the firms found and independently.

Titles:

```text
Founder
Director
Managing Director
Partner
CEO
Head of Sales
Luxury Sales Head
```

Pull:

```text
Name
Title
Company
LinkedIn URL
Email
Phone, where available
```

### Step 3 - Web Enrichment

For the top firms, verify:

```text
Do they sell Rs. 25 Cr+ inventory?
Do they mention Camellias, Magnolias, DLF Golf Links, Trump Towers, Golf Course Road, penthouses?
Do they signal HNI/NRI clientele?
Do they have Instagram/YouTube/website evidence?
```

### Step 4 - Backup If Apollo Is Thin

Apollo may be weak for boutique Indian brokers. If results are thin:

```text
1. Search Google Maps for ultra-luxury brokers.
2. Search broker websites.
3. Search Instagram for Camellias / Golf Course Road brokers.
4. Check YouTube real estate reviewers.
5. Check Haryana/UP RERA agent registries.
6. Use Apollo only for organized firms and decision-maker enrichment.
```

### Output Table

Use one table:

| Firm | Key Person | Title | Phone | Email | LinkedIn | Instagram | Luxury Evidence | Source | Fit Score |
|---|---|---|---|---|---|---|---|---|---|

Fit Score:

| Score | Meaning |
|---:|---|
| 5 | Confirmed ultra-luxury Rs. 25 Cr+ NCR seller with decision-maker contact |
| 4 | Strong luxury residential broker with evidence of Golf Course Road / Camellias / DLF / premium inventory |
| 3 | Luxury-adjacent, needs verification |
| 2 | General NCR broker with weak luxury evidence |
| 1 | General broker, low fit |

Quality rule:

```text
30 verified, scored rows are better than 300 raw rows.
```

What gets extracted:

```text
Broker name
Company name
Phone
Email
Website
LinkedIn URL
Instagram/YouTube URL
City
Area specialization
Project specialization
Source URL
Reason for fit
```

### Segment 2: Buyer Prospects

For buyers, the system uses professional and income proxies.

Selection parameters:

| Parameter | Criteria |
|---|---|
| Location | Gurgaon, Delhi NCR, South Delhi, Noida, Dubai Indians |
| Seniority | Founder, CEO, CXO, VP, Director, Partner |
| Profession | Business owner, doctor, lawyer, CA, consultant, investor |
| Industry | Finance, tech, healthcare, manufacturing, legal, exports, consulting |
| Income Proxy | Business ownership, senior title, large company, premium profession |
| Intent Proxy | Real estate interest, Gurgaon connection, relocation, investment relevance |

This should be positioned as high-probability buyer prospecting, not guaranteed buyer data.

### Segment 3: HNI Proxy Profiles

The system identifies HNI-like prospects through public/professional signals.

Selection parameters:

| Parameter | Criteria |
|---|---|
| Seniority | Founder, CEO, MD, Partner, Investor, Family Office |
| Company Type | Private company, funded company, profitable SME, premium service firm |
| Location | Delhi NCR, Gurgaon, South Delhi, Dubai |
| Industry | Finance, healthcare, manufacturing, legal, tech, exports |
| Wealth Proxy | Business ownership, company scale, premium profession, senior role |
| Contactability | Phone, email, LinkedIn, company website |

Recommended language:

```text
We identify HNI-like prospects using public professional indicators such as seniority, business ownership, industry, geography, and investment relevance.
```

Avoid saying:

```text
We scrape HNI numbers.
```

## Lead Scoring Model

Each lead is scored out of 100.

| Criteria | Points |
|---|---:|
| Geography fit | 20 |
| Role/title fit | 20 |
| Property relevance | 25 |
| Contactability | 20 |
| Online proof/activity | 15 |

Priority levels:

| Score | Priority | Action |
|---:|---|---|
| 80-100 | A | Call first |
| 60-79 | B | Call second / WhatsApp |
| Below 60 | C | Keep aside or discard |

## Affluence Fit / Buying Capacity Model

The ICP can also be generated through scraped public signals. The goal is not to know a person's exact net worth. The goal is to estimate whether the person is likely capable of evaluating a luxury property based on public and professional indicators.

Recommended positioning:

```text
We calculate an Affluence Fit Score using public/professional signals and luxury intent proxies. This is not an exact net-worth calculation.
```

### Safe Signals To Use

| Signal Category | Examples | Why It Helps |
|---|---|---|
| Professional wealth proxy | Founder, promoter, CXO, MD, partner, investor, family office, doctor, lawyer, CA | Indicates income or wealth potential |
| Business capacity proxy | company size, funding, directorships, revenue mentions, premium industry, export/manufacturing ownership | Indicates ability to buy premium inventory |
| Real estate access proxy | public mentions of Camellias, Magnolias, Golf Course Road, Central Park, luxury Gurgaon property | Indicates proximity to luxury property market |
| Luxury lifestyle proxy | public event pages, premium hospitality mentions, luxury car/business media mentions, high-end club/event references | Indicates premium consumption pattern |
| Investment intent proxy | real estate investment content, second-home interest, relocation, rental yield, broker engagement | Indicates property buying relevance |
| Contactability | business email, company phone, LinkedIn, website, public event/association page | Allows compliant outreach path |

### Risky Signals To Avoid

Avoid scraping or claiming:

- exact personal net worth unless from a credible public source and clearly cited.
- private club membership data.
- private travel/hotel stays.
- private restaurant visits.
- private social media activity.
- leaked databases.
- WhatsApp group data.
- hidden personal phone numbers.
- non-public financial information.

For example, if a person publicly posts about a luxury hotel/event or appears on a public event page, it can be used as a soft lifestyle signal. But the system should not attempt to secretly determine where someone eats, travels, stays, or what private club they belong to.

### Affluence Fit Scoring

| Criteria | Points |
|---|---:|
| Professional wealth proxy | 25 |
| Business capacity proxy | 25 |
| Luxury access proxy | 20 |
| Real estate intent proxy | 20 |
| Contactability / compliant outreach path | 10 |

Priority:

| Score | Meaning |
|---:|---|
| 80-100 | Strong buying-capacity fit |
| 60-79 | Possible fit, needs qualification |
| Below 60 | Weak fit |

Example:

```text
Person: Founder of a 100+ employee export business
Location: South Delhi / Gurgaon
Public signal: attended luxury real estate investment event
Contact path: company email and LinkedIn
Score: 85
Decision: A-priority buyer/HNI-proxy lead
```

### How The System Decides Whether To Generate A Lead

```text
1. Scrape public/professional data.
2. Extract role, company, location, source URL, contact path, and visible luxury/real-estate signals.
3. Calculate Affluence Fit Score.
4. Calculate Property Relevance Score.
5. Generate lead only if score crosses threshold.
6. Add reason to call and source evidence.
```

Recommended threshold:

```text
Broker/channel partner: 65+
Buyer prospect: 75+
HNI-proxy prospect: 80+
```

## How Scraping Is Done

### Step 1: Define ICP

Before scraping, select:

- segment
- city/market
- titles
- keywords
- source
- minimum score

Example:

```text
Segment: Channel partners / brokers
Market: Gurgaon + Dwarka Expressway
Titles: Founder, Owner, Director, Property Consultant
Keywords: luxury real estate broker Gurgaon
Minimum score: 65
Target count: 100
```

### Step 2: Search Sources

Use different sources depending on segment.

Broker sources:

- Google Maps
- broker websites
- real estate portals
- Sales Navigator
- Apollo
- Instagram/YouTube real estate creators

Buyer/HNI sources:

- Sales Navigator
- Apollo
- company websites
- business directories
- event/summit pages
- association/member pages
- Crunchbase or startup directories

### Step 3: Extract Data

Extract:

```text
name
company
role/title
segment
phone
email
city
website
LinkedIn URL
source URL
reason for fit
```

### Step 4: Enrich Missing Data

Use Apollo/Clay/Google/website parsing to enrich:

- phone
- email
- company domain
- profile link
- broker category
- specialization
- company size
- buyer/HNI proxy signal

### Step 5: Verify And Clean

Remove:

- duplicate leads
- invalid phone numbers
- missing source leads
- generic non-relevant contacts
- low-score leads
- personal/private data that should not be used

### Step 6: Score Leads

Apply the 100-point scoring model.

Example:

```text
Gurgaon broker: +20
Founder/Owner title: +20
Luxury property specialization: +25
Phone + email available: +20
Website/listing proof: +15
Total: 100
Priority: A
```

### Step 7: Handoff To Sales

Export CSV or send to CRM with:

```text
Priority
Name
Company
Phone
Email
Segment
Reason to call
Source
Sales owner
Disposition
Follow-up date
```

## Real-Time Integration Options

## How To Implement Real-Time Web Scraping

For production, do not run scraping directly inside the browser website. Build a backend scraping layer.

Recommended architecture:

```text
Website
-> Backend API
-> Scraping/API workers
-> Parser + normalizer
-> Enrichment layer
-> Affluence/ICP scoring engine
-> Database
-> Lead dashboard + CSV/CRM export
```

### Backend Routes

Use a Node.js backend with endpoints like:

```text
POST /api/scrape/google-maps
POST /api/scrape/company-websites
POST /api/import/sales-navigator-csv
POST /api/enrich/apollo
POST /api/enrich/clay
POST /api/score/leads
GET  /api/leads
```

### Source-Specific Implementation

| Source | Best Method | Why |
|---|---|---|
| Google Maps | Google Places API | Reliable real business data: phone, website, address, rating |
| Apollo | Apollo API | Best direct people/company search and enrichment |
| Sales Navigator | Export/import workflow | Avoids account restriction from automated LinkedIn scraping |
| Broker websites | Scraper with Playwright/Cheerio | Extract public phone, email, project specialization |
| Real estate portals | Prefer approved export/API where possible | Many portals restrict scraping |
| Public event pages | Scraper with Cheerio/Playwright | Useful for HNI-like professional/lifestyle signals |
| Company websites | Scraper + enrichment | Extract domain, leadership, phone, email, business type |

### Real-Time Scraping Flow

```text
1. User selects ICP: Broker / Buyer / HNI Proxy.
2. User enters keyword and geography.
3. Backend creates source-specific searches.
4. Worker fetches public/API data.
5. Parser extracts name, role, company, phone, email, city, URL, and visible signals.
6. Deduplication runs using phone, email, domain, and LinkedIn URL.
7. Apollo/Clay enriches missing contact/company data.
8. Affluence Fit Score and Property Relevance Score are calculated.
9. Only leads above threshold are saved.
10. Website displays qualified leads in real time.
```

### Scraping Worker Logic

Use a queue so scraping does not freeze the website.

```text
Search request created
-> queued job
-> scraper/API worker runs
-> raw records saved
-> enrichment job runs
-> scoring job runs
-> qualified leads saved
-> dashboard updates
```

Recommended tools:

```text
Backend: Node.js / Next.js / Express
Static parsing: Cheerio
Browser rendering: Playwright
Queue: BullMQ + Redis
Database: PostgreSQL or Supabase
CSV export: json2csv
Enrichment: Apollo API + Clay
Maps data: Google Places API
```

### Example Google Maps Implementation

Use Google Places API instead of scraping the Google Maps page.

```text
Search query:
luxury real estate broker Gurgaon Dwarka Expressway

API steps:
1. Places Text Search
2. Place Details for each result
3. Extract business name, phone, website, address, rating, reviews, map URL
4. Score as broker/channel-partner lead
```

### Example Broker Website Scraper

For each broker website:

```text
1. Crawl homepage, contact page, about page, project/listing pages.
2. Extract phone numbers and emails.
3. Extract keywords: luxury, Gurgaon, Dwarka Expressway, new launch, Central Park, DLF, Camellias.
4. Identify broker category.
5. Score relevance.
```

### Example HNI/Buyer Signal Scraper

Use only public and professional pages.

Possible public sources:

```text
company leadership pages
event speaker/attendee pages
business award pages
public interviews
startup/funding directories
association member pages
public LinkedIn/Sales Navigator exports
luxury real estate event pages
```

Extract:

```text
name
role
company
location
industry
public source URL
visible wealth/intent signal
business contact path
```

Then score:

```text
Professional wealth proxy
+ Business capacity proxy
+ Luxury access proxy
+ Real estate intent proxy
+ Contactability
= Affluence Fit Score
```

### What Not To Scrape

Do not scrape:

```text
private social profiles
private WhatsApp groups
private club membership lists
hidden personal phone numbers
restaurant/hotel visits unless publicly posted by the person or source
leaked databases
banking/financial records
private location history
```

### Real-Time Dashboard Behaviour

The website should show:

```text
Search running
-> raw records found
-> enrichment pending
-> scored leads
-> A/B/C priority
-> export ready
```

For example:

```text
42 raw records found
31 unique records
24 enriched
16 qualified
8 A-priority leads
```

### Production Safeguards

Add:

```text
rate limiting
source URL logging
robots/terms review where relevant
deduplication
email/phone verification
manual review before outreach
unsubscribe/compliance tracking
API key protection
audit log of where every lead came from
```

### Apollo API

Apollo is the easiest direct API connection.

Use cases:

- people search
- company search
- people enrichment
- company enrichment
- email discovery

Recommended architecture:

```text
Website
-> Backend API
-> Apollo API
-> Save results
-> Score leads
-> Show in dashboard
```

Important:

Do not call Apollo directly from browser frontend. API keys must stay on the backend.

Example backend endpoint:

```text
POST /api/apollo/search
```

Example request body:

```json
{
  "titles": ["Founder", "Owner", "Director", "Property Consultant"],
  "locations": ["Gurgaon", "Delhi NCR"],
  "keywords": "luxury real estate broker Gurgaon"
}
```

### Google Maps / Google Places API

Best for extracting public broker offices and property consultants.

Use cases:

- broker business name
- phone number
- website
- address
- rating
- reviews
- Google Maps URL

Recommended architecture:

```text
Website
-> Backend API
-> Google Places Text Search
-> Place Details
-> Save broker records
-> Score and show leads
```

Example backend endpoint:

```text
GET /api/maps/search?query=luxury real estate broker Gurgaon
```

### LinkedIn / Sales Navigator

Do not position this as direct automated scraping.

Recommended workflow:

```text
Sales Navigator search
-> review profiles
-> export through approved workflow/tool or manual CSV
-> import into website
-> enrich with Apollo/Clay
-> score leads
```

Why:

LinkedIn restricts automated scraping and can block accounts. For client presentations, use Sales Navigator as a research source and CSV import flow.

### Clay

Clay is best as enrichment and scoring layer.

Use cases:

- enrich email/phone
- classify broker/buyer/HNI fit
- run waterfall enrichment
- generate personalization lines
- send records to CRM

Recommended workflow:

```text
Raw leads
-> Clay table/webhook
-> enrich phone/email/company
-> AI classify and score
-> return/export enriched leads
```

## Production Build Roadmap

### Phase 1: System MVP

Already covered by the website:

- ICP builder
- Sample Scraper
- CSV import
- lead scoring
- lead database
- export CSV
- sales scripts
- integration plan

### Phase 2: Apollo Integration

Build backend:

- `/api/apollo/search`
- `/api/apollo/enrich`

Add:

- API key environment variable
- result normalization
- error handling
- credit usage monitoring

### Phase 3: Google Maps Integration

Build backend:

- `/api/maps/search`
- `/api/maps/details`

Add:

- Google Places API key
- deduplication by phone/domain
- broker category detection

### Phase 4: Clay Enrichment

Add:

- Clay webhook/table workflow
- enrichment fields
- AI scoring prompt
- export back to database/CRM

### Phase 5: CRM + Sales Workflow

Add:

- HubSpot/Zoho/Pipedrive integration
- sales owner assignment
- call disposition
- WhatsApp status
- follow-up reminders

## Compliance And Safety Rules

Use:

- public business data
- professional profiles
- company websites
- approved APIs
- opted-in CRM data

Avoid:

- private WhatsApp group scraping
- leaked databases
- hidden personal data scraping
- bypassing LinkedIn restrictions
- claiming guaranteed HNI phone lists

Best client-facing line:

```text
We use ICP filters, public/professional data sources, enrichment tools, and scoring logic to create qualified sales-ready lead lists.
```

## Final client presentation Script

1. Show the ICP Builder.
2. Select Channel Partners / Brokers.
3. Choose Gurgaon + Delhi NCR.
4. Set keyword: `luxury real estate broker Gurgaon`.
5. Show Project Intelligence and open the ready reckoner/video assets.
6. Explain why the ICP targets ultra-luxury Gurgaon brokers and HNI-like profiles.
7. Open Google Maps source search.
8. Run Sample Scraper or live API search.
9. Show generated leads in Lead Database.
10. Filter A-priority leads.
11. Export CSV.
12. Show Sales Handoff script.
13. Explain Apollo/Google Maps API connection for production.

