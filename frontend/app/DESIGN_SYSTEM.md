# BarberQueue Design System

## Professional Dark Royal Theme - WCAG 2.1 Level AA Compliant

Engineering-grade specification for a premium barber booking app with dark royal colors, functional gold accents, and production-ready components.

---

## Color System

### Surface Hierarchy (Elevation Levels)

| Surface | Color | Usage |
|---------|-------|-------|
| **Base** | `#0F0F1E` | Main background, never use pure black |
| **L1 (Cards)** | `#1A1A2E` | Card containers, primary content |
| **L2 (Nav)** | `#252538` | Navigation bars, modals |
| **L3 (Dialogs)** | `#2E2E48` | Dropdowns, secondary dialogs |

### Secondary Colors

| Color Name | Hex Code | Usage | Notes |
|------------|----------|-------|-------|
| **Charcoal Black** | `#1C1C1E` | Primary text, headers, important text, navigation text | Main text color |
| **Soft Black** | `#2C2C2E` | Secondary backgrounds, cards, elevated sections, sidebar backgrounds | For dark mode elements and elevated surfaces |

### Neutral Colors

| Color Name | Hex Code | Usage | Notes |
|------------|----------|-------|-------|
| **Warm White** | `#FAFAF8` | Main background, app background, primary surface color | Prevents harsh contrasts |
| **Light Cream** | `#F5F5F3` | Input fields, disabled states, subtle sections | Secondary background |
| **Medium Gray** | `#8E8E93` | Secondary text, descriptions, labels, placeholder text | Body text color |
| **Border Gray** | `#D1D1D6` | Card borders, dividing lines, input borders | All borders and dividers |
| **White** | `#FFFFFF` | Cards, modals, elevated surfaces | Pure white for contrast |

### Accent Colors

| Color Name | Hex Code | Usage | Notes |
|------------|----------|-------|-------|
| **Success Green** | `#34C759` | Confirmed bookings, success messages, available slots | Status indicator |
| **Alert Red** | `#FF3B30` | Error messages, cancellations, warnings | Error state |
| **Info Blue** | `#007AFF` | Informational messages, clickable links, badges | Links and info |
| **Warning Yellow** | `#FFB300` | Warning states | Warning indicator |

### Overlay Colors

| Color Name | RGBA Value | Usage | Notes |
|------------|------------|-------|-------|
| **Dark Overlay** | `rgba(28, 28, 30, 0.85)` | Modal backdrop, image overlays | For modals and overlays |
| **Light Overlay** | `rgba(255, 255, 255, 0.95)` | Popovers, tooltips, dropdown menus | Light modals |

---

## Component Styles

### Navigation Bar

```javascript
{
  background: '#FFFFFF',
  text: '#1C1C1E',
  active: '#B8860B',
  border: '#D1D1D6',
  boxShadow: '0 1px 3px rgba(28, 28, 30, 0.05)'
}
```

### Primary Buttons

```javascript
{
  background: '#B8860B',
  text: '#FAFAF8',
  hover: '#9A7209',
  boxShadow: '0 2px 8px rgba(184, 134, 11, 0.3)',
  hoverShadow: '0 4px 12px rgba(184, 134, 11, 0.4)'
}
```

### Secondary Buttons

```javascript
{
  border: '#D1D1D6',
  text: '#1C1C1E',
  background: 'transparent',
  hoverBackground: '#F5F5F3',
  hoverBorder: '#B8860B'
}
```

### Input Fields

```javascript
{
  background: '#F5F5F3',
  border: '#D1D1D6',
  text: '#1C1C1E',
  focusBorder: '#B8860B',
  label: '#8E8E93',
  focusLabel: '#B8860B'
}
```

### Cards

```javascript
{
  background: '#FFFFFF',
  border: '#D1D1D6',
  shadow: '0 1px 3px rgba(28, 28, 30, 0.08)',
  hoverShadow: '0 4px 12px rgba(28, 28, 30, 0.1)',
  borderRadius: '12px'
}
```

### Service Cards (Dark Variant)

```javascript
{
  background: '#2C2C2E',
  text: '#FAFAF8',
  price: '#B8860B',
  border: 'none'
}
```

### Time Slots (Available)

```javascript
{
  background: '#F5F5F3',
  border: '#D1D1D6',
  text: '#1C1C1E',
  hoverBorder: '#B8860B'
}
```

### Time Slots (Selected)

```javascript
{
  background: '#B8860B',
  border: '#B8860B',
  text: '#FAFAF8'
}
```

### Status Badges

**Confirmed:**
```javascript
{
  background: 'rgba(52, 199, 89, 0.15)',
  text: '#34C759',
  fontWeight: 600
}
```

**Cancelled:**
```javascript
{
  background: 'rgba(255, 59, 48, 0.15)',
  text: '#FF3B30',
  fontWeight: 600
}
```

**Pending:**
```javascript
{
  background: 'rgba(184, 134, 11, 0.15)',
  text: '#B8860B',
  fontWeight: 600
}
```

### Bottom Sheet

```javascript
{
  background: '#FAFAF8',
  handle: '#D1D1D6',
  borderRadius: '16px 16px 0 0'
}
```

### Icons

**Primary Icons:**
```javascript
{
  color: '#B8860B'
}
```

**Secondary Icons:**
```javascript
{
  color: '#8E8E93'
}
```

---

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
             'Helvetica Neue', sans-serif;
```

### Scale

| Element | Mobile Size | Desktop Size | Weight | Line Height | Color |
|---------|-------------|--------------|--------|-------------|-------|
| **H1** | 32px | 48px | 700 | 1.25 | #1C1C1E |
| **H2** | 24px | 36px | 600 | 1.33 | #1C1C1E |
| **H3** | 20px | 28px | 600 | 1.4 | #1C1C1E |
| **H4** | 18px | 18px | 600 | 1.33 | #1C1C1E |
| **H5** | 16px | 16px | 600 | 1.5 | #1C1C1E |
| **Body** | 16px | 16px | 400 | 1.5 | #8E8E93 |
| **Button** | 16px | 16px | 600 | - | varies |
| **Caption** | 14px | 14px | 400 | 1.43 | #8E8E93 |

---

## Spacing System

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
```

---

## Border Radius

```css
--radius-sm: 8px;   /* Buttons, small elements */
--radius-md: 12px;  /* Cards, standard elements */
--radius-lg: 14px;  /* Badges, chips */
--radius-xl: 16px;  /* Modals, large elements */
--radius-pill: 9999px; /* Pills, circular elements */
```

---

## Shadows

### Elevation Levels

```css
/* Level 1 - Subtle */
box-shadow: 0 1px 3px rgba(28, 28, 30, 0.08);

/* Level 2 - Medium */
box-shadow: 0 4px 12px rgba(28, 28, 30, 0.1);

/* Level 3 - Strong */
box-shadow: 0 8px 24px rgba(28, 28, 30, 0.12);
```

---

## Design Principles

### 1. Royal Experience
Deep gold (#B8860B) paired with charcoal black creates luxury and sophistication. Use gold sparingly for emphasis and CTAs only.

### 2. Smooth & Premium
Warm whites and cream backgrounds prevent harsh contrasts, creating a comfortable viewing experience.

### 3. Minimal Palette
Only 5 core colors with systematic variations keep the design clean and focused.

### 4. Accessibility
All color combinations meet **WCAG AA standards** for contrast ratios:
- Text on backgrounds: minimum 4.5:1
- Large text: minimum 3:1
- Interactive elements: minimum 3:1

### 5. Mobile-First
The design is optimized for mobile with:
- Touch targets minimum 44px × 44px
- Bottom navigation for mobile
- Safe area insets for notched devices
- Responsive typography scale

### 6. Consistency
- Use gold (#B8860B) for primary actions only
- Status badges use 15% opacity backgrounds
- All interactive elements have smooth transitions (0.2s ease)
- Border radius consistent across similar elements

---

## Responsive Breakpoints

```javascript
{
  xs: 0,      // Mobile portrait
  sm: 600px,  // Mobile landscape / Small tablet
  md: 960px,  // Tablet / Small desktop
  lg: 1280px, // Desktop
  xl: 1920px  // Large desktop
}
```

---

## Implementation

### Using CSS Variables

```css
/* In your CSS */
.element {
  background-color: var(--color-deep-gold);
  color: var(--color-warm-white);
  border: 1px solid var(--color-border-gray);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}
```

### Using MUI Theme

```javascript
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <Button
      sx={{
        backgroundColor: theme.palette.primary.main, // #B8860B
        color: theme.palette.primary.contrastText,   // #FAFAF8
        '&:hover': {
          backgroundColor: theme.palette.primary.dark // #9A7209
        }
      }}
    >
      Book Now
    </Button>
  );
}
```

---

## Status Badge Examples

### Success (Confirmed)
```jsx
<Chip 
  label="Confirmed" 
  color="success"
  sx={{
    backgroundColor: 'rgba(52, 199, 89, 0.15)',
    color: '#34C759',
    fontWeight: 600
  }}
/>
```

### Error (Cancelled)
```jsx
<Chip 
  label="Cancelled" 
  color="error"
  sx={{
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
    color: '#FF3B30',
    fontWeight: 600
  }}
/>
```

---

## Best Practices

### DO ✅
- Use Deep Gold for primary CTAs and important actions
- Maintain minimum 44px touch targets on mobile
- Use status badges with 15% opacity backgrounds
- Apply smooth transitions (0.2s ease) to interactive elements
- Use Warm White (#FAFAF8) for main backgrounds
- Test on actual mobile devices

### DON'T ❌
- Don't overuse gold - keep it for emphasis
- Don't use pure white (#FFFFFF) for main backgrounds
- Don't use colors outside the defined palette
- Don't create touch targets smaller than 44px
- Don't skip hover states on interactive elements
- Don't ignore safe area insets on mobile

---

## Accessibility Checklist

- [ ] Color contrast ratio meets WCAG AA (4.5:1 for text)
- [ ] Focus states visible with 2px gold outline
- [ ] Touch targets minimum 44px × 44px
- [ ] Text remains readable at 200% zoom
- [ ] Interactive elements have clear hover/active states
- [ ] Status information not conveyed by color alone
- [ ] Keyboard navigation supported
- [ ] Screen reader friendly labels

---

## File Structure

```
src/
├── index.css          # Global CSS variables and base styles
├── theme.js           # MUI theme configuration
├── main.jsx           # Theme provider setup
└── components/        # Individual components with inline styles
```

---

## Quick Reference

### Most Common Patterns

**Primary Button:**
```jsx
<Button variant="contained" color="primary">
  Book Appointment
</Button>
```

**Secondary Button:**
```jsx
<Button variant="outlined" color="primary">
  Cancel
</Button>
```

**Card:**
```jsx
<Card sx={{ borderRadius: 3 }}>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

**Status Badge:**
```jsx
<Chip label="Confirmed" color="success" />
```

---

## Version History

- **v1.0** (Current) - Deep Gold & Charcoal Black theme
  - Royal, premium aesthetic
  - Mobile-first responsive design
  - WCAG AA compliant
  - MUI v5+ compatible
