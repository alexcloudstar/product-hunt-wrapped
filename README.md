<a href="https://www.producthunt.com/products/product-hunt-wrapped?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-product-hunt-wrapped" target="_blank" rel="noopener noreferrer"><img alt="Product Hunt Wrapped - Your year in shipping, visualized. See your 2025 impact. | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1053707&amp;theme=light&amp;t=1766506297752"></a>

# 🚀 Product Hunt Wrapped 2025

![Product Hunt Wrapped](https://img.shields.io/badge/Product%20Hunt-Wrapped%202025-orange?style=for-the-badge&logo=producthunt)
![Privacy](https://img.shields.io/badge/Privacy-Safe-blue?style=for-the-badge)

**Product Hunt Wrapped** is a high-fidelity _Year in Review_ for makers. Visualize your launch velocity, vote counts, and global rankings in a beautiful, shareable **Story** format.

---


## 🔐 Privacy & Security

> **Your data, your control.**

- 🛡️ **Zero Storage:** Your Product Hunt token is **never** stored or sent to any server—it's used only in your browser.
- 🖥️ **Client-Side Only:** All API requests are made directly from your device.
- ⏳ **Ephemeral:** Refresh or close the page, and your token is gone.
- 🔎 **Open Source:** Audit the code yourself—privacy is built-in, not a promise.

**Note:** To provide deep insights without hitting public API limits, this tool requires your **Product Hunt Developer Token**.


## ✨ Features

- 🎬 **The Story Reel:** Animated journey through your 2025 launches, daily ranks, and global standing.
- 🧑‍🚀 **Maker Personas:** Get a custom personality type (e.g., "The Blitzscaler").
- 📸 **Instant Export:** Share high-DPI PNGs of your stats to X/Twitter and LinkedIn.
- ⚡ **Smart Caching:** Neon DB caches public stats for the global leaderboard & marquee.


## 🛠 Tech Stack

- 🖥️ **Frontend:** Next.js 16, Tailwind CSS, Framer Motion
- 🗄️ **Database:** [Neon](https://neon.tech) (PostgreSQL) for public stat caching
- 🖼️ **Image Generation:** `html-to-image`
- 🎉 **Animations:** Canvas Confetti


## 🚦 Getting Started

1. **Clone the repo**
	```bash
	git clone https://github.com/alexcloudstar/product-hunt-wrap.git
	cd product-hunt-wrap
	npm install
	# or yarn / pnpm / bun
	```
2. **Set up your environment**
	- Add your Neon DB connection string to `.env` as `DATABASE_URL` (optional, for leaderboard caching)
3. **Run the app**
	```bash
	npm run dev
	```
4. **Open in your browser**
	- Visit [http://localhost:3000](http://localhost:3000)

---

_Built with 🧡 by [Alex Cloudstar](https://www.producthunt.com/@alexcloudstar) for the Maker Community._
