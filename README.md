# 🔍 GitHub Finder

A polished GitHub profile search app built with React + TypeScript + Tailwind CSS, with full support for:

- 🌗 Dark mode
- 🔁 Pagination of repositories
- 🌀 Loading states
- 🔍 User search with GitHub REST API
- 💡 Fully commented and styled using modern Tailwind classes

## 📦 Tech Stack

- React + TypeScript (Vite)
- Tailwind CSS
- GitHub REST API
- Deployed via GitHub Pages or Vercel (suggested)

## ✨ Features

- Search GitHub usernames and view profiles
- Displays name, avatar, bio, followers, public repos
- Paginated list of latest repositories
- Light/Dark mode toggle
- Loading spinner during API fetch
- Form input disabled while loading
- Ready for backend extension (Node.js / Express / MongoDB)

## 💻 Installation

```bash
git clone https://github.com/M-S-Brough/github-finder.git
cd github-finder
npm install
npm run dev
```

## 🛠 Planned Backend (optional)

A Node.js backend (planned):
- API proxy for GitHub to avoid rate limits
- Search history storage
- Caching using Redis or memory
- Auth (optional for favorites)
- API route: `/api/github/:username`

## 🧪 Usage

- Open the app
- Search for a GitHub username (e.g. `vercel`)
- View user info, paginated repositories
- Toggle dark mode for style preview

## 🧠 Educational Goals

This project demonstrates:
- Real API integration
- Component-based design
- UX improvements via spinners, states
- Tailwind styling best practices
- Scalability via backend-ready architecture

## 📁 Folder Structure

```
github-finder/
├── public/
├── src/
│   ├── components/
│   │   └── Search.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── tailwind.config.js
└── README.md
```

## 👨‍💻 Author

**Mark Brough**  
[GitHub Profile](https://github.com/M-S-Brough)

---

> This project was built to demonstrate full-stack capability using modern frontend tech, with backend extensibility in mind.