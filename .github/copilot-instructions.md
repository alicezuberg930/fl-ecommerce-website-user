# FL E-commerce Website User Portal - AI Agent Instructions

## Project Overview
This is a Next.js based e-commerce website user portal built with TypeScript, Material-UI, and Redux Toolkit. The project uses the App Router pattern and features a robust authentication system.

## Core Architecture

### Authentication System
- Uses JWT-based authentication (`src/auth/JwtContext.tsx`)
- Auth state management through React Context API
- Protected routes handling via AuthGuard components
- Session management with token validation and refresh mechanisms

### Project Structure
```
src/
├── @types/      # TypeScript type definitions
├── app/         # Next.js App Router pages and layouts
├── auth/        # Authentication context and guards
├── components/  # Reusable UI components
├── layouts/     # Page layout components
├── sections/    # Feature-specific components
└── utils/       # Utility functions and helpers
```

### Key Technology Stack
- Next.js 15.x with App Router
- Material-UI v7
- React Query for API data management
- Redux Toolkit for state management
- React Hook Form with Yup validation
- Notistack for notifications

## Development Workflow

### Getting Started
```bash
npm install
npm run dev
```
The development server will start at http://localhost:3000 using Turbopack.

### Authentication Flow
1. User credentials are sent to `/api/login` endpoint
2. JWT token is stored and managed via `setSession` utility
3. Protected routes check auth state via `useAuthContext` hook
4. Token refresh is handled automatically by the auth provider

### Common Patterns

#### API Integration
- API calls should use the configured Axios instance from `utils/httpClient`
- React Query is used for data fetching and caching
- Response types are defined in `@types/response.ts`

#### Component Organization
- Base UI components in `/components`
- Feature-specific components in `/sections`
- Page layouts in `/layouts/main`
- Auth-related components in `/auth`

#### Form Handling
```typescript
// Example form pattern using React Hook Form + Yup
const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required()
});

const methods = useForm({
  resolver: yupResolver(schema)
});
```

#### State Management
- Authentication state: Use `useAuthContext` hook
- Global UI state: Redux store with persisted storage
- Server state: React Query hooks

## Important Files
- `src/auth/JwtContext.tsx`: Authentication provider implementation
- `src/app/layout.tsx`: Root layout with providers
- `src/components/hook-form/`: Form component utilities
- `src/utils/httpClient.ts`: API client configuration

## Common Tasks
1. Adding a new protected route:
   - Create page in `app/` directory
   - Wrap with appropriate auth guards

2. Implementing data fetching:
   - Define types in `@types/`
   - Create React Query hook
   - Handle loading and error states

3. Form implementation:
   - Use `FormProvider` from `components/hook-form`
   - Define Yup validation schema
   - Implement submission handler with error handling

## Conventions
- File naming: PascalCase for components, camelCase for utilities
- Component structure: Prop types at top, styled components next, main component last
- Error handling: Use the snackbar system for user feedback
- Type definitions: Keep in `@types` directory with descriptive names