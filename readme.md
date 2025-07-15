# Expense Tracker Frontend

A modern, minimalist expense tracking application built with React 19, TypeScript, and GraphQL.

## Features

- 🔐 User Authentication (Login/Signup)
- 📊 Dashboard with financial overview
- 💰 Transaction management (Add, view, categorize)
- 📈 Analytics with charts and insights
- 🎨 Modern, responsive UI with Tailwind CSS
- ⚡ Real-time GraphQL integration
- 🔄 Optimistic updates and caching

## Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **React Router v7** - Modern routing solution
- **Apollo Client** - GraphQL client with caching
- **Tailwind CSS v4** - Next-generation utility-first CSS framework
- **React Hook Form** - Performant forms with validation
- **Recharts** - Beautiful charts and graphs
- **Lucide React** - Modern icon library
- **Vite** - Fast build tool and dev server

## Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (Header, Layout)
│   └── ui/              # Reusable UI components (Button, Input, Card)
├── context/             # React Context providers
├── graphql/             # GraphQL queries and mutations
├── lib/                 # Library configurations (Apollo)
├── pages/               # Page components
│   ├── auth/           # Authentication pages
│   ├── DashboardPage.tsx
│   ├── AddTransactionPage.tsx
│   └── AnalyticsPage.tsx
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── App.tsx              # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Features Overview

### Authentication

- Clean, modern login/signup forms
- Form validation with error handling
- Automatic redirects based on auth state

### Dashboard

- Financial overview with net worth calculation
- Category breakdown charts (Pie & Bar charts)
- Recent transactions list
- Quick action buttons

### Transaction Management

- Add new transactions with form validation
- Categorize as expense, saving, or investment
- Support for cash and card payments
- Optional location tracking

### Analytics

- Detailed category distribution charts
- Financial insights and summaries
- Responsive chart visualizations

## Design Principles

### Separation of Concerns

- **Components**: Reusable UI components in `/components/ui/`
- **Pages**: Route-based page components
- **Context**: State management with React Context
- **GraphQL**: API layer with Apollo Client
- **Utils**: Pure utility functions
- **Types**: Centralized TypeScript definitions

### Minimalist UI Design

- Clean, modern interface
- Consistent spacing and typography
- Thoughtful use of color and contrast
- Responsive design for all devices
- Intuitive navigation and user flow

### Performance Optimizations

- Lazy loading and code splitting
- Optimistic updates for better UX
- Efficient GraphQL caching
- Minimal bundle size with tree shaking

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Environment Setup

The app expects the GraphQL server to be running on `http://localhost:4000/graphql`.

## Backend Integration

This frontend integrates with a GraphQL backend that provides:

- User authentication and session management
- Transaction CRUD operations
- Category statistics and analytics
- Real-time data synchronization

## Contributing

1. Follow the existing code structure and patterns
2. Use TypeScript for all new code
3. Follow the component composition principles
4. Write meaningful commit messages
5. Test your changes across different screen sizes
