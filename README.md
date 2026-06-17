<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/dcd2bfbc-7972-4059-9468-3ef3261941fb

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Start the API backend:
   `npm run server`
3. Start the frontend in another terminal:
   `npm run dev`
4. Open the app at `http://localhost:3000`

The frontend proxies API requests from `/api/*` to the backend running on port `3002`.
