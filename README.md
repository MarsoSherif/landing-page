# micromatch — Minimal Static Landing Template

This is a small, responsive landing page scaffold inspired by examples like `shipfa.st` and `codefa.st`.

Files:

- `index.html` — main page
- `src/script.js` — interactivity + Airtable integration

## Setup Airtable Integration

### 1. Create an Airtable Base

1. Go to [airtable.com](https://airtable.com) and sign in
2. Create a new base (or use an existing one)
3. Create a table with these fields:
   - **Name** (Single line text)
   - **Email** (Single line text)
   - **Submitted At** (Date with time) — optional
   - **Source** (Single line text) — optional

### 2. Get Your Credentials

**Base ID:**

1. Open your base in Airtable
2. Click **Help** → **API documentation**
3. Find your Base ID (starts with `app...`)

**Personal Access Token:**

1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click **Create new token**
3. Name it (e.g., "Landing Page")
4. Add these scopes:
   - `data.records:write`
   - `data.records:read`
5. Add access to your base
6. Click **Create token** and copy it

**Table Name:**

- Use the exact name of your table (e.g., "Emails" or "Waitlist")

### 3. Configure the Landing Page

Open `src/script.js` and replace the config values:

```javascript
const AIRTABLE_CONFIG = {
  baseId: "appXXXXXXXXXXXXXX", // Your actual Base ID
  tableName: "Emails", // Your table name
  apiKey: "patXXXXXXXXXXXXXX", // Your Personal Access Token
};
```

⚠️ **Security Note:** The API key will be visible in the browser. For production:

- Use a serverless function (Netlify/Vercel) as a proxy
- Or use Airtable Forms with redirect
- Or implement rate limiting on Airtable side

## How to Run Locally

1. Open `index.html` directly in your browser (double-click).
2. Or run a simple static server (recommended):

```powershell
cd "g:\landing page"
python -m http.server 8000
# Then open http://localhost:8000 in your browser
```

## Next Steps

- Replace copy, icons and colors with your branding
- Deploy to Netlify/Vercel for free hosting
- Add analytics (Google Analytics, Plausible, etc.)
- Create a serverless proxy for better API key security
