# Greg Cunningham Portfolio

A personal portfolio built with Next.js App Router, React, Tailwind CSS, Framer Motion, and `lucide-react`.

## What is in the site

- A fixed left-hand profile and navigation panel on desktop
- A homepage with profile, experience, projects, writing, and contact sections
- Dedicated pages for resume, about, and hobbies
- Project cards with a `Load more projects` interaction
- Pop-out detail modals for both Projects and Writing

## Project structure

```text
app/
  about/page.tsx      About page
  hobbies/page.tsx    Hobbies page
  layout.tsx          App shell and metadata
  page.tsx            Homepage and interactive sections
  resume/page.tsx     Resume preview/download page
public/
  resume.pdf          Resume PDF placeholder path
```

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Common edits

### Update navigation or homepage content

- Edit `navItems`, `experience`, `projects`, `writingItems`, and `socials` in `app/page.tsx`
- These arrays drive most of the homepage UI

### Change project cards or writing pop-outs

- Update the objects in `projects` or `writingItems` in `app/page.tsx`
- The modal content is pulled directly from those objects

### Update the resume page

- Place the latest PDF at `public/resume.pdf`
- The page at `app/resume/page.tsx` previews and downloads that file automatically

### Update the About or Hobbies pages

- Edit `app/about/page.tsx`
- Edit `app/hobbies/page.tsx`

## Development notes

- `app/page.tsx` is a client component because it uses animation, state, and modal interactions
- The left sidebar is intentionally sticky without its own scroll area
- Modal close behavior supports both overlay click and `Escape`
- The homepage initially shows 4 projects, then reveals more in batches

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Verification

Run:

```bash
npm run lint
```

## Tech stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Framer Motion
- lucide-react
