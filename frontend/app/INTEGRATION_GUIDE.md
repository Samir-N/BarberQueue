# BarberQueue Design System - Integration Guide

## Quick Start

This guide walks you through implementing the professional dark royal theme in your React application.

---

## Step 1: Install Dependencies

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## Step 2: Tailwind Configuration

Update your `tailwind.config.js` file with the extended configuration provided in the project. This includes:
- Custom color palette (dark surfaces, gold accents, semantic colors)
- Typography scale (Playfair Display + Inter Variable)
- Spacing system
- Drop shadow utilities
- Custom animations

---

## Step 3: Global Styles

Import `index.css` in your main app entry point. This file includes:
- Font imports (Playfair Display Variable, Inter Variable)
- Tailwind directives
- Custom focus ring styles
- Scrollbar styling
- Selection colors
- Utility classes

---

## Step 4: Component Library

All reusable components are ready to use in `src/components/`:

### Button Component
```jsx
import Button from '../components/Button';

<Button variant="primary" size="md" onClick={handler}>
  Book Now
</Button>
```

**Variants:** primary, secondary, tertiary, danger, success
**Sizes:** sm, md, lg

### Input Component
```jsx
import Input from '../components/Input';

<Input
  label="Phone Number"
  placeholder="Enter your phone"
  value={value}
  onChange={handler}
  error="Invalid format"
  type="tel"
/>
```

### Card Component
```jsx
import Card from '../components/Card';

<Card elevation="l1" interactive onClick={handler}>
  <h3>Service Title</h3>
  <p>Description</p>
</Card>
```

**Elevations:** l1, l2, l3

### EmptyState Component
```jsx
import EmptyState from '../components/EmptyState';

<EmptyState
  icon={CalendarIcon}
  headline="No Bookings"
  body="Book your first appointment today!"
  ctaText="Explore Services"
  ctaAction={handleExplore}
/>
```

---

## Step 5: Screen Implementation

All screens are in `src/screens/` and follow a consistent pattern:

### Structure
1. Sticky header with title and back button
2. Main content area
3. Bottom navigation bar
4. Optional: Progress indicator, filters, tabs

### Common Pattern
```jsx
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const MyScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-base pb-20">
      {/* Header */}
      <header className="bg-surface-l2 border-b border-gold-functional sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="font-display text-h2 text-text-high">Title</h1>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Your content */}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface-l2">
        {/* Navigation items */}
      </nav>
      <div className="h-16" />
    </div>
  );
};
```

---

## Step 6: Routing Setup

Update your main routing file with the screen paths:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import BookingScreen from './screens/BookingScreen';
import BookingsHistoryScreen from './screens/BookingsHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/booking" element={<BookingScreen />} />
        <Route path="/bookings" element={<BookingsHistoryScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Step 7: API Integration

All screens already include API integration to your backend:

### Authentication
```javascript
// Login
POST /api/v1/user/login
{ phone: string, password: string }

// Register
POST /api/v1/user/register
{ name: string, phone: string, password: string, role: string }
```

### Services
```javascript
// Get all services
GET /api/v1/user/services
```

### Bookings
```javascript
// Create booking
POST /api/v1/user/bookingInfo
{ service: string, bookingTime: ISO8601, userId: string }
Headers: { Authorization: 'Bearer token' }

// Get all bookings
GET /api/v1/user/getBookings

// Get user booking
POST /api/v1/user/personalBookings
Headers: { Authorization: 'Bearer token' }

// Delete booking
DELETE /api/v1/user/personalBooking/delete/:id
Headers: { Authorization: 'Bearer token' }

// Update booking
PUT /api/v1/user/personalBooking/edit/:id
Headers: { Authorization: 'Bearer token' }
```

---

## Step 8: Local Storage Management

The app uses localStorage for auth tokens and user data:

```javascript
// Save after login/register
localStorage.setItem('token', token);
localStorage.setItem('user', JSON.stringify(userData));

// Retrieve
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

// Clear on logout
localStorage.removeItem('token');
localStorage.removeItem('user');
```

---

## Step 9: Running the App

### Frontend
```bash
cd frontend/app
npm install
npm run dev
```

Runs on `http://localhost:5173`

### Backend
```bash
cd mongodb
npm install
npm run server
```

Runs on `http://localhost:8080`

---

## Color Reference

### Key Colors to Remember

| Use Case | Color | Tailwind |
|----------|-------|----------|
| Buttons | #E8C547 | `gold-functional` |
| Surfaces | #1A1A2E | `surface-l1` |
| Text | rgba(255, 255, 255, 0.87) | `text-high` |
| Borders | #2E2E48 | `surface-l3` |
| Success | #10B981 | `semantic-success` |
| Error | #EF4444 | `semantic-error` |

---

## Customizing Components

### Extending a Button
```jsx
<Button
  variant="primary"
  size="lg"
  className="w-full my-custom-class"
  onClick={handler}
>
  Custom Button
</Button>
```

### Creating a Custom Card
```jsx
<Card elevation="l2" interactive>
  <div className="space-y-4">
    <h3 className="font-display text-h3 text-text-high">Title</h3>
    <p className="text-text-medium text-body">Description</p>
  </div>
</Card>
```

---

## Accessibility Best Practices

1. **Always use focus states** - The theme includes gold focus rings
2. **Touch targets** - Keep interactive elements minimum 44x44px
3. **Color contrast** - All text meets WCAG AA standards
4. **Keyboard navigation** - Test all forms work with keyboard only
5. **Screen readers** - Use proper labels on inputs/buttons

---

## Performance Tips

1. **Use Tailwind utilities** - No custom CSS needed for most cases
2. **Drop shadows** - Already optimized with `filter: drop-shadow()`
3. **Avoid box-shadow** - Use Tailwind drop-shadow classes instead
4. **Animations** - Limited to 150ms-400ms transitions
5. **Images** - Lazy load service/profile images

---

## Troubleshooting

### Colors Not Appearing?
- Make sure Tailwind config includes the custom color extensions
- Check that `index.css` is imported in main entry point
- Verify `content` paths in `tailwind.config.js`

### Fonts Not Loading?
- Check that Playfair Display and Inter are imported in `index.css`
- Verify font-family in Tailwind config matches CSS imports
- Check browser network tab for font files

### Focus Ring Not Visible?
- Focus ring is included in global styles
- If hidden, check if `:focus-visible` is being overridden
- Test with Tab key on buttons

---

## Next Steps

1. ✅ Set up Tailwind configuration
2. ✅ Import global styles
3. ✅ Test component library
4. ✅ Integrate authentication flow
5. ✅ Connect to backend APIs
6. ✅ Test on mobile devices
7. ✅ Run accessibility audit (WAVE, Axe)
8. ✅ Deploy to production

---

## Additional Resources

- **Tailwind Docs:** https://tailwindcss.com/docs
- **React Router:** https://reactrouter.com
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **Design Tokens:** See `constants/tokens.json`

---

## Support

For issues or questions:
1. Check the `DESIGN_SYSTEM.md` for detailed specifications
2. Review component examples in `src/components/`
3. Check screen implementations for patterns
4. Verify API endpoints match backend routes

---

**Version:** 1.0.0  
**Last Updated:** December 2025  
**Status:** Production Ready ✅
