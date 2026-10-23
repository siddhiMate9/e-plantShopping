# Paradise Nursery Shopping Application

Paradise Nursery is a plant shopping web app that helps customers explore indoor plants, add them to a cart, and complete a simple front-end checkout flow. The project is built with React, Redux Toolkit, Vite, and React Router for a clean shopping experience.

## Features

- Nature-themed landing page with a clear "Get Started" call to action
- Product listing with search and category filtering
- Cart powered by Redux Toolkit with add, remove, and quantity updates
- Cart summary with item totals, quantity count, and checkout confirmation
- About Us section describing the brand mission and values
- Responsive layout for desktop, tablet, and mobile screens

## Technologies Used

- React
- Redux Toolkit
- React Redux
- React Router DOM
- Vite
- Lucide React
- CSS3

## Project Structure

```text
src/
├── App.jsx             # Landing page + route layout
├── App.css             # App styling, landing page background, product, and cart styles
├── AboutUs.jsx         # About Paradise Nursery section
├── ProductList.jsx     # Product listing page with Redux-based cart actions
├── CartItem.jsx        # Shopping cart page with quantity controls and totals
├── CartSlice.jsx       # Redux Toolkit slice for cart reducers
├── store.js            # Redux store configuration
├── data/
│   └── plants.js       # Plant catalog data
├── components/
│   ├── Navbar.jsx      # Top navigation with cart badge
│   ├── PlantCard.jsx   # Card UI for products
│   └── CartItem.jsx    # Small cart row component used inside the cart page
├── pages/
│   ├── Home.jsx        # Existing landing-page example (kept for reference)
│   ├── Products.jsx    # Existing product listing example (kept for reference)
│   └── Cart.jsx        # Existing cart example (kept for reference)
├── index.css           # Global base styles
├── main.jsx            # App entry point with Redux Provider
└── assets/             # Static local assets, when present
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the app in development mode:

```bash
npm run dev
```

3. Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

4. To build for production:

```bash
npm run build
```

## App Flow

1. Open the landing page.
2. Click "Get Started" to go to the product catalog.
3. Add plants to the cart.
4. View the cart and update quantities or remove items.
5. Continue shopping or confirm the checkout.

## Notes

- The cart uses Redux Toolkit so the cart count and totals stay consistent across pages.
- Product data and pricing are stored in the static `src/data/plants.js` catalog.
- This is a front-end shopping demo; no real payment processing is connected.

## GitHub

Repository: https://github.com/shreyavaidya24-cpu/paradise-nursery

Main branch files are published publicly from the repository root and the exact project file paths under the `src` folder.
