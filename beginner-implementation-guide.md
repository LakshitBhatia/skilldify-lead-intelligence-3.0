# Beginner Implementation Guide

This guide is for running the Skilldify Apollo lead-intelligence system without needing to understand backend development.

## What You Already Have

Inside this folder:

```text
skilldify-apollo-channel-partner-system.html  Main client-facing Apollo system
live-scraping-server.js                       Backend server
.env.example                                  API key template
run-system.bat                                Starts the system
open-system.bat                               Opens the website
ultra-luxury-channel-partner-research-script.md  Apollo/web research script
central-park-lead-system-mvp.html             Older full dashboard
```

## Step 1: Start The System

Double-click:

```text
run-system.bat
```

Keep that black terminal window open.

Then double-click:

```text
open-system.bat
```

The website opens at:

```text
http://127.0.0.1:4174/
```

## Step 2: Check Apollo

On the website:

1. Click `Check Apollo`.
2. It should say Apollo is configured.

If it says Apollo is missing:

1. Open `.env`.
2. Add:

```text
APOLLO_API_KEY=your_actual_apollo_key
```

3. Save.
4. Restart `run-system.bat`.

## Step 3: Run The Client Flow

Use this flow in front of the client:

1. Show the Skilldify branded page.
2. Show the research script box.
3. Explain that the system is searching Apollo for ultra-luxury NCR channel partners.
4. Keep Market as `Delhi NCR`.
5. Keep keywords like:

```text
luxury real estate, channel partner, property consultant, real estate advisory, luxury homes, ultra luxury homes, Golf Course Road
```

6. Click `Run Apollo Research`.
7. Wait for the pipeline to finish.
8. Show the table.
9. Explain the `Fit Score`.
10. Click `Download CSV`.

## What The System Does

```text
Research script
-> Apollo live people search
-> multiple narrow keyword searches
-> deduplication
-> 1-5 ultra-luxury fit score
-> client-ready table
-> CSV download
```

## Fit Score

```text
5 = confirmed or strongly indicated ultra-luxury seller
4 = strong luxury residential broker
3 = luxury-adjacent, needs verification
2 = general broker with weak luxury evidence
1 = low fit
```

## What To Say To Client

Say:

```text
Skilldify is not creating a bulk scraped list. It is building a scored intelligence layer. We run targeted Apollo searches, identify real estate decision-makers, deduplicate contacts, score them for ultra-luxury fit, and export only the rows worth reviewing.
```

Also say:

```text
Apollo gives the live contact layer. For boutique NCR brokers, we still recommend web verification for Instagram, Camellias, DLF Golf Links, Magnolias, Golf Course Road, and Rs. 25 Cr+ inventory evidence.
```

## First Real Workflow

```text
1. Start system.
2. Run Apollo Research.
3. Download CSV.
4. Open top Fit 4-5 LinkedIn/company profiles.
5. Web-verify ultra-luxury evidence.
6. Present the final scored list.
```

## Important Note

This version is Apollo-first and designed for live contact research through Apollo.
