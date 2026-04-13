# Frontend Agent Rules – Next.js (Production Ready)

## 🎯 Objective
Build highly optimized, mobile-first, accessible interfaces in Next.js with strong technical SEO.

---

## 📱 Responsive Design (Mobile First)

- ALWAYS design for mobile first (min-width: 320px).
- Use progressive breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

- Avoid:
  - Fixed units (px) in main layout
  - Horizontal overflow (NEVER allowed)

- Use:
  - Flexbox or Grid (NO floats)
  - `max-width` + `margin: auto` for layout containment
  - `clamp()` for fluid typography

Example:
```css
font-size: clamp(1rem, 2vw, 1.5rem);
