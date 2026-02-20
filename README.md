# CardCraft

CardCraft is a premium profile card studio built with React, Vite, and Tailwind CSS.
It helps users create polished personal brand cards with live preview, theme customization, smart layout control, and high-quality export for portfolio and social sharing.

## Live Preview
- Live preview at : https://card-craft-five.vercel.app


## Highlights

- Real-time profile card preview
- Premium theme system: `Ivory`, `Noir`, `Aurora`
- Animated UI and card transitions (Framer Motion)
- Custom background controls (gradient, tint, blur, overlay)
- Drag-and-drop layout composition (`@dnd-kit`)
- Skill tags: add, reorder, remove
- Social preview surfaces: LinkedIn, X/Twitter, Instagram, GitHub README, Mobile
- Premium Date of Birth calendar picker (month/year/day selection)
- Export options:
  - High-resolution PNG
  - Print-ready PDF
  - Social-optimized image export

## Tech Stack

- React (Vite)
- Tailwind CSS
- Framer Motion
- `@dnd-kit` (drag-and-drop)
- `html2canvas` (image export)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Project Structure

```text
src/
├── components/
│   ├── BackgroundDesigner.jsx
│   ├── LayoutBuilder.jsx
│   ├── LivePreview.jsx
│   ├── ProfileForm.jsx
│   ├── SkillTag.jsx
│   ├── SocialPreview.jsx
│   └── ThemeSwitcher.jsx
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   └── useLocalStorage.js
├── utils/
│   └── exportCard.js
├── App.jsx
├── index.css
└── main.jsx
```

## Notes

- Current behavior starts with a clean form state on each run.
- If you plan to deploy publicly, consider adding route/code splitting to reduce main bundle size.

# Author

**Abid Hasan**

GitHub: [https://github.com/abidsejan](https://github.com/abidsejan)



# If you like this project

Give it a star ⭐ on GitHub — it motivates further development.
