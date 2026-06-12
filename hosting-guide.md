# Hosting Guide

Yes, this system can be hosted and shared as a link.

## Important

Do not host only the HTML file. Apollo needs a backend because the API key must stay private.

Host these together:

```text
skilldify-apollo-channel-partner-system.html
live-scraping-server.js
package.json
```

Set the Apollo key as a hosting environment variable:

```text
APOLLO_API_KEY=your_apollo_api_key
```

For phone numbers, also set a public base URL after the first deploy:

```text
PUBLIC_BASE_URL=https://your-app-name.onrender.com
```

The server will use this as the Apollo phone webhook:

```text
https://your-app-name.onrender.com/api/apollo-phone-webhook
```

Do not upload `.env` publicly.

## Easiest Option: Render

1. Create a GitHub repository.
2. Upload the files from this `outputs` folder.
3. Go to `https://render.com`.
4. Create `New Web Service`.
5. Connect your GitHub repository.
6. Use:

```text
Build Command: npm install
Start Command: npm start
```

7. Add environment variable:

```text
APOLLO_API_KEY=your_apollo_api_key
```

8. Deploy.
9. Render gives you a public URL.
10. Copy the public URL.
11. Go to Render environment variables and add:

```text
PUBLIC_BASE_URL=https://your-app-name.onrender.com
```

12. Redeploy.

Apollo can now send phone reveal results to:

```text
https://your-app-name.onrender.com/api/apollo-phone-webhook
```

## Railway Option

1. Go to `https://railway.app`.
2. Create a new project from GitHub.
3. Select the repository.
4. Add environment variable:

```text
APOLLO_API_KEY=your_apollo_api_key
```

5. Deploy.

## Local vs Hosted

Local:

```text
http://127.0.0.1:4174/
```

Hosted:

```text
https://your-app-name.onrender.com/
```

## Security

Since the Apollo key was shared in chat, rotate it before hosting.

## Phone Number Reality

Apollo does not return mobile phone numbers immediately in the normal search response. The system requests phone reveal through Apollo People Match using:

```text
reveal_phone_number=true
webhook_url=https://your-app-name.onrender.com/api/apollo-phone-webhook
```

Apollo sends phone numbers asynchronously to the webhook. This can take several minutes and may consume Apollo credits. If Apollo does not have a phone number for a person, no phone will be returned.
