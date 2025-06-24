# 💼 Moneybox Product Categories – React App

This project is a technical task submission for the Web Team at Moneybox. It provides a single-page React application that displays all of Moneybox’s financial products, grouped by category, using a clean, scalable architecture and a modern UI.

---

## 🚀 Getting Started

### 1. Clone and install dependencies

```bash
git clone https://github.com/robhuzzey/moneyboxapp.git
cd moneyboxapp
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Visit the app in your browser:

* **Main product page:** [http://localhost:3000](http://localhost:3000)
* **Admin editor:** [http://localhost:3000/admin](http://localhost:3000/admin)

---

## ✍️ Updating Categories & Products

Business users can update product categories and products through the admin interface:

📍 Navigate to: `http://localhost:3000/admin`

This interface allows users to add, remove, or edit categories and products. All changes are saved to `data.json` and instantly reflected in the UI — no developer input required.

---

## 📂 Project Structure

```
.
├── app/                   → Next.js App Router structure (routes, layout, pages)
├── public/                → Static assets (e.g. favicon, images)
├── data.json              → Stores all editable category/product data
├── next.config.ts         → Next.js configuration
├── package.json           → Project dependencies and scripts
├── tsconfig.json          → TypeScript configuration
├── postcss.config.mjs     → Tailwind/PostCSS setup
├── eslint.config.mjs      → ESLint config
```

---

## 📊 Features

* Dynamic rendering of all product categories and products
* Products include:

  * Name
  * Description
  * Image
* Admin panel to modify `data.json` with no code changes
* Fully responsive layout using **Tailwind CSS**
* Built with **React**, **Next.js (App Router)**, and **TypeScript**

---

## 🌐 API Access for Other Platforms

The app exposes the product data for use by external platforms (e.g., a mobile app):

```
GET /api/categories
```

This returns the full list of categories and their products in JSON format.

---

## 🧪 Running Tests

To run tests:

```bash
npm run test
```

Tests are written using **Jest** and **React Testing Library**, covering key components and logic.

---

## 🧠 Architectural Decisions

* **Next.js App Router:** Modern, scalable routing and layout structure
* **Flat-file CMS style (`data.json`):** Editable without code changes
* **Modular components:** Easily extendable and maintainable UI
* **Tailwind CSS:** Fast and consistent styling
* **Public API route:** Enables easy reuse of data

---

## 💡 Note on AI Usage

Due to the time constraints of the challenge, I used AI tools to accelerate parts of the development. However, I fully understand all the code written, and have ensured that it follows best practices and is production-ready.

---

## 👤 Author

**Rob Huzzey**
GitHub: [@robhuzzey](https://github.com/robhuzzey)

---
