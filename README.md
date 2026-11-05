
# BazarDor — বাজার দর 🛒

BazarDor is a modern grocery price tracking web application built with Next.js. It helps users explore daily grocery prices, track price changes, and compare product prices across different markets in Bangladesh.

## 🔗 Live Links

- **Live Website:** https://b14-a7-bazar-dor-eta.vercel.app
- **GitHub Repository:** https://github.com/Junaid-redart/B14-A7-BazarDor

## 🚀 Key Features

1. **Daily Market Prices:** Displays updated grocery product prices using an external REST API.
2. **Price Increase & Decrease:** Shows products with rising and falling prices.
3. **Category Browsing:** Allows users to explore grocery products by category.
4. **Product Sorting:** Sort products by price from low to high or high to low.
5. **Product Details:** Displays detailed product information, price statistics, and market comparisons.
6. **User Authentication:** Supports email/password, Google, and GitHub authentication using Better Auth.
7. **User Profile Management:** Users can view and update their profile information.
8. **Responsive Design:** Provides a user-friendly experience across desktop, tablet, and mobile devices.
9. **Protected Routes:** Restricts product details and profile pages to authenticated users.
10. **Price Ticker:** Displays grocery price updates in a continuously scrolling ticker.

## 🛠️ Technologies Used

- **Frontend:** Next.js (App Router), React, TypeScript
- **Styling:** Tailwind CSS, DaisyUI
- **Authentication:** Better Auth
- **Database:** MongoDB Atlas
- **Data Source:** BazarDor REST API
- **Deployment:** Vercel
- **Version Control:** Git and GitHub

## 📂 Application Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with grocery prices and price trends |
| `/category/[slug]` | Category-based products with sorting |
| `/product/[slug]` | Product details and market price comparison |
| `/signin` | User sign-in page |
| `/signup` | User registration page |
| `/profile` | User profile dashboard |
| `/profile/update` | Update profile information |
| `/api/auth/[...all]` | Better Auth API routes |

## 🌐 API Integration

The application fetches grocery product data from the BazarDor REST API.

**Products API:**

https://api.api-store.workers.dev/api/bazardor/products

The API is used to display product information, category listings, market prices, and price trends.

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Junaid-redart/B14-A7-BazarDor.git
cd B14-A7-BazarDor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root.

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

**Note:** Never commit `.env.local` or actual credentials to GitHub.

### 4. Start the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Build for Production

```bash
npm run build
```

## 🔐 Authentication

BazarDor uses Better Auth for user authentication.

Supported authentication methods:

- Email and password
- Google OAuth
- GitHub OAuth

Users can manage their profiles after signing in. Protected routes redirect unauthenticated users to the sign-in page.

## 📱 Responsive UI

The application is designed to work on:

- Desktop computers
- Tablets
- Mobile devices

Tailwind CSS and DaisyUI are used to build a responsive and consistent interface.

## ☁️ Deployment

BazarDor is deployed using Vercel.

The production environment uses MongoDB Atlas for authentication data and the external REST API for grocery product information.

Production environment variables must be configured in Vercel before deployment.

## 👨‍💻 Author

Developed by **Junaid Rashid** as part of Programming Hero Assignment 7.
