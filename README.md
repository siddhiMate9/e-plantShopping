# Paradise Nursery

A complete e-commerce web application for buying indoor and house plants. Built with React, React Router, and Lucide icons.

## Features

- **Landing Page** — Hero section with the tagline "Bring Nature Home," plant benefits, and a "Get Started" button.
- **Product Listing Page** — 9 plants across 3 categories (Air-Purifying, Low-Maintenance, Decorative) with category filters, images, descriptions, and prices in Indian Rupees.
- **Shopping Cart Page** — Add/remove items, adjust quantities, see per-item subtotals, total plant count, grand total, and an order confirmation on checkout.
- **Navigation bar** with live cart item count that stays consistent across all pages.
- Fully responsive for desktop, tablet, and mobile.
- No backend or database required — cart state lives in React.

## Tech Stack

- React 18 (Hooks: `useState`)
- React Router DOM (page navigation)
- Lucide React (icons)
- Vite (build tool)
- CSS3 (custom green/beige botanical theme)

## Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx       # Top nav bar with logo + cart badge
│   ├── PlantCard.jsx    # Single product card
│   └── CartItem.jsx     # Single cart row with qty controls
├── pages/
│   ├── Home.jsx         # Landing page
│   ├── Products.jsx     # Product listing with category filters
│   └── Cart.jsx         # Shopping cart + checkout confirmation
├── data/
│   └── plants.js        # Static plant catalog (9 plants, 3 categories)
├── App.jsx              # Root: holds shared cart state + routes
├── main.jsx             # Entry point
├── App.css              # All component/page styles
└── index.css            # Global base styles
```

## Installation & Running

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

To create a production build:

```bash
npm run build
```

## How the Shopping Cart Works

1. **Cart state** lives in `App.jsx` via `useState`. The `cart` array and handler functions are passed down to the Products and Cart pages as props, keeping state consistent across navigation.

2. **Adding to cart** — `addToCart(plant)` checks if the plant's `id` already exists in the cart. If so, it increments the quantity (no duplicates). Otherwise it adds the plant with `quantity: 1`.

3. **Quantity controls** — `increaseQuantity` adds 1; `decreaseQuantity` subtracts 1 but never below 1 (the decrease button is disabled at quantity 1).

4. **Removing** — `removeItem(id)` filters the plant out of the cart.

5. **Totals** — `cartCount` (sum of all quantities) is shown in the navbar badge. The Cart page computes `totalItems` and `grandTotal` (sum of price × quantity) on every render.

6. **Checkout** — Clicking "Checkout" shows an order confirmation message. No payment processing; this is a front-end-only demo.

## Testing Checklist

- [ ] Home page loads with hero, benefits, and "Get Started" button.
- [ ] "Get Started" navigates to the product listing page.
- [ ] Each plant card shows image, name, price (₹), description, and "Add to Cart" button.
- [ ] Adding a plant to cart updates the navbar badge.
- [ ] Adding the same plant twice increases its quantity (button shows "Added").
- [ ] Cart page shows each item's image, name, unit price, quantity, and subtotal.
- [ ] Increase/decrease buttons update quantities and totals.
- [ ] Decrease button is disabled at quantity 1.
- [ ] Remove button removes the item and updates the cart badge and total.
- [ ] Empty cart shows an empty-cart message with a "Browse Plants" button.
- [ ] "Continue Shopping" navigates back to the products page.
- [ ] "Checkout" shows an order confirmation message.
- [ ] Cart count in the navbar persists across page navigation.
- [ ] Layout is responsive on mobile, tablet, and desktop.

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Paradise Nursery shopping cart app"
git branch -M main
git remote add origin https://github.com/<your-username>/paradise-nursery.git
git push -u origin main
```
