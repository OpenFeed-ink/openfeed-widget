# @openfeed/widget

**Embeddable feedback, roadmap and changelog widget.**  
Part of [OpenFeed](https://openfeed.ink) — the open source alternative to Canny and Frill.

[![npm](https://img.shields.io/npm/v/@openfeed/widget?color=6366f1)](https://www.npmjs.com/package/@openfeed-ink/widget)
[![npm downloads](https://img.shields.io/npm/dm/@openfeed/widget?color=6366f1)](https://www.npmjs.com/package/@openfeed-ink/widget)

---

## Install

```bash
npm install @openfeed/widget
# or
pnpm add @openfeed/widget
# or
yarn add @openfeed/widget
```

**Prefer a script tag?**
```html
<script async src="https://cdn.openfeed.ink/widget/v1/widget.iife.js" data-project-id="your-project-id"></script>
```

---

## Usage

### React

```tsx
import { OpenFeedWidget } from '@openfeed/widget'

export default function App() {
  return (
    <>
      <YourApp />
      <OpenFeedWidget projectId="your-project-id" />
    </>
  )
}
```

### Next.js

```tsx
// app/layout.tsx
import { OpenFeedWidget } from '@openfeed/widget'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <OpenFeedWidget projectId="your-project-id" />
      </body>
    </html>
  )
}
```

### Plain HTML / Any framework

```html
<script
  async
  src="https://cdn.openfeed.ink/widget/v1/widget.iife.js"
  data-project-id="your-project-id">
</script>
```

---

## What it includes

One widget. Three tabs. All customizable from your dashboard — no code changes needed.

| Tab | What it does |
|---|---|
| 💬 Feedback | Users submit, upvote feature requests and write comments |
| 🗺️ Roadmap | Users see what's Planned / In Progress / Done |
| 📣 Changelog | Users see your latest updates with notification dot |

Enable or disable each tab from your OpenFeed dashboard.

---

## How customization works

You **never edit code** to change how the widget looks or behaves.

1. Go to your OpenFeed dashboard → Widget Settings
2. Change colors, theme, button position, which tabs to show
3. Click Save
4. Widget updates instantly in your app

The `projectId` prop is the only thing that never changes.

---

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `projectId` | `string` | ✅ | Your project slug from OpenFeed dashboard |

All other configuration (colors, theme, position, enabled tabs) is managed from your dashboard.

---

## TypeScript

Fully typed. No `@types` package needed.

```tsx
import { OpenFeedWidget } from '@openfeed/widget'
// Types are included — no extra install required
```

---

## Shadow DOM isolation

The widget renders inside a Shadow DOM container. This means:

- ✅ Widget styles never affect your app
- ✅ Your app styles never affect the widget
- ✅ Works in any framework — React, Vue, Svelte, plain HTML
- ✅ No CSS conflicts, ever

---

## Get started

1. Create a free account at [openfeed.ink](https://openfeed.ink)
2. Create a project and copy your project slug
3. Install this package and add `<OpenFeedWidget projectId="your-slug" />`
4. Customize everything from your dashboard

**Or self-host OpenFeed for free** → [github.com/yourusername/openfeed](https://github.com/OpenFeed-ink/openfeed)
