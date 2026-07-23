# ShaadiWords — Deployment Guide

Everything is already written. You just need to do the same 3 things you did for DescGen: get a free API key, put the code on GitHub, and connect it to Vercel. About 10 minutes total.

## Step 1 — Get a free Gemini API key (skip if you kept your DescGen one)
1. Go to https://aistudio.google.com/apikey
2. Sign in with Google, click "Create API key"
3. Copy the key somewhere safe — you can reuse the SAME key you used for DescGen, no need for a new one.

## Step 2 — Put this code on GitHub
1. Go to https://github.com/new
2. Repository name: `shaadiwords`
3. Keep it Public, click "Create repository"
4. On the next page, click "uploading an existing file"
5. Drag in all the files from this folder (`index.html`, `package.json`, and the whole `api` folder with `generate.js` inside it)
6. Click "Commit changes"

## Step 3 — Deploy on Vercel
1. Go to https://vercel.com/new
2. Import the `shaadiwords` GitHub repo you just created
3. Before clicking Deploy, open "Environment Variables" and add:
   - Name: `GEMINI_API_KEY`
   - Value: (paste the key from Step 1)
4. Click Deploy
5. In ~1 minute you'll get a live link like `shaadiwords.vercel.app`

## Step 4 — Test it
Open your live link, fill in the form, click "Generate Wording" — you should see the invitation, WhatsApp message, and Instagram caption appear.

## Step 5 — Get your first users (same playbook as DescGen)
- Post in Indian wedding planning Facebook/Instagram groups
- Share on r/india, r/WeddingPhotography-style subreddits, and local city subreddits
- Post short demo videos/reels showing the tool generating wording in real time — this niche does very well on Instagram Reels
- Add it to your DescGen site footer ("also check out ShaadiWords") to cross-pollinate traffic

## Later — Monetization (once you have steady visitors)
The site is intentionally free for now so you can focus on getting traffic first. When you're ready to add payments, tell me — I already have a ready-made plan (a ₹49 paid print-ready PDF card, no payment gateway needed, works with just your UPI ID and WhatsApp) that we can drop back in within a few minutes.

Options once you have traffic:
- Google AdSense (apply once you have ~20-30 daily visitors and a few weeks of traffic history)
- The ₹49 print-ready PDF card feature (already designed, just needs your UPI ID/WhatsApp filled in)
- A "Buy Me a Chai" / UPI donation button

Tell me once it's live and I'll help you plan the launch posts.
