# Next.js Supabase Starter

A modern, production-ready starter template for building web applications with Next.js 16, Supabase, and shadcn/ui. This starter includes a complete authentication system so you can focus on building your unique features right away.

## Features

- **Authentication System** - Ready-to-use email/password authentication with Supabase
  - Sign up with email verification
  - Login/Logout functionality
  - Protected routes with automatic redirects
  - User profile management
  - Secure session handling

- **Modern Tech Stack**
  - [Next.js 16](https://nextjs.org/) - React framework with App Router
  - [React 19](https://react.dev/) - Latest React features
  - [Supabase](https://supabase.com/) - Backend as a Service (Auth + Database)
  - [TypeScript](https://www.typescriptlang.org/) - Type safety throughout
  - [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first styling
  - [shadcn/ui](https://ui.shadcn.com/) - Beautiful, accessible components

- **Developer Experience**
  - Form validation with [Zod](https://zod.dev/) and [React Hook Form](https://react-hook-form.com/)
  - Toast notifications with [Sonner](https://sonner.emilkowal.ski/)
  - Dark mode support with [next-themes](https://github.com/pacocoursey/next-themes)
  - Icons from [Lucide](https://lucide.dev/)
  - Clean, organized project structure
  - Type-safe environment variables

## Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **npm** or **yarn** or **pnpm** or **bun** package manager
- A **Supabase account** ([Sign up for free](https://supabase.com/))

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd nextjs-shadcn-supabase-starter
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set Up Supabase

#### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com/) and sign in
2. Click "New Project"
3. Fill in your project details:
   - **Name**: Choose any name for your project
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for setup to complete (1-2 minutes)

#### Run the Database Migration

1. In your Supabase project dashboard, go to the **SQL Editor** (in the left sidebar)
2. Click **"New query"**
3. Copy the entire contents of the file `supabase/migrations/001_initial_setup.sql` from this project
4. Paste it into the SQL Editor
5. Click **"Run"** or press `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)
6. You should see "Success. No rows returned" - that's perfect!

This creates:
- A `profiles` table to store user information
- Automatic profile creation when users sign up
- Row Level Security (RLS) policies for data protection

#### Get Your Supabase API Keys

1. In your Supabase dashboard, go to **Settings** (gear icon in sidebar)
2. Click on **API** in the settings menu
3. You'll need two keys:
   - **Project URL** - Look for "Project URL" (starts with `https://`)
   - **anon public** key - Look for "anon public" under "Project API keys"

### 4. Configure Environment Variables

1. Create a `.env.local` file in the root of your project:

```bash
# Copy the example file
cp .env.example .env.local
```

2. Open `.env.local` and fill in your Supabase credentials:

```env
# Get these from Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# This is only needed for server-side operations (optional for basic auth)
SUPABASE_SECRET_KEY=your_supabase_service_role_key

# Your app's URL (use localhost for development)
NEXT_PUBLIC_META_URL=http://localhost:3000
```

**Where to find the Service Role Key (optional):**
- In Supabase Dashboard → Settings → API
- Look for "service_role" key under "Project API keys"
- **Warning:** Keep this secret! Never commit it to Git or expose it in client-side code

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Test Authentication

1. Click **"Sign Up"** and create an account with your email
2. Check your email for a confirmation link (check spam folder too!)
3. Click the confirmation link in the email
4. You'll be redirected back to the app and automatically logged in
5. Try the **Profile** page to see your user information
6. Test **Logout** and **Login** functionality

That's it! Your authentication is ready to use.

## Project Structure

```
nextjs-shadcn-supabase-starter/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages (login, signup)
│   │   ├── login/                # Login page
│   │   ├── sign-up/              # Sign up page
│   │   ├── auth/confirm/         # Email confirmation handler
│   │   └── layout.tsx            # Auth layout (prevents logged-in users from accessing)
│   ├── (root)/                   # Main application
│   │   ├── (protected)/          # Routes that require authentication
│   │   │   ├── profile/          # User profile page
│   │   │   └── layout.tsx        # Protected layout with navigation
│   │   └── page.tsx              # Public home page
│   ├── globals.css               # Global styles and Tailwind theme
│   └── layout.tsx                # Root layout (fonts, theme provider)
├── components/
│   ├── forms/                    # Form components
│   │   ├── login-form.tsx        # Login form with validation
│   │   ├── signup-form.tsx       # Sign up form with validation
│   │   └── schemas/              # Zod validation schemas
│   ├── ui/                       # shadcn/ui components
│   └── logout-button.tsx         # Logout button component
├── lib/
│   ├── env.ts                    # Centralized environment variables
│   └── utils.ts                  # Utility functions (cn helper)
├── utils/
│   ├── data-access/
│   │   └── auth.ts               # Server actions for authentication
│   └── supabase/
│       ├── client.ts             # Supabase client for browser
│       ├── server.ts             # Supabase client for server components
│       └── middleware.ts         # Session management
├── types/
│   └── common.interfaces.ts      # TypeScript type definitions
├── supabase/
│   └── migrations/               # Database migration files
├── middleware.ts                 # Next.js middleware for auth
└── .env.local                    # Your environment variables (create this!)
```

## How Authentication Works

This starter uses a multi-layered authentication system:

1. **Middleware** ([middleware.ts](middleware.ts))
   - Runs on every request
   - Refreshes user sessions automatically
   - Redirects unauthenticated users from protected routes to `/login`
   - Redirects authenticated users from auth pages (login/signup) to home

2. **Layout Guards**
   - Auth Layout ([app/(auth)/layout.tsx](app/(auth)/layout.tsx)) - Prevents logged-in users from seeing login/signup
   - Protected Layout ([app/(root)/(protected)/layout.tsx](app/(root)/(protected)/layout.tsx)) - Requires authentication for certain pages

3. **Server Actions** ([utils/data-access/auth.ts](utils/data-access/auth.ts))
   - `signUp()` - Create new user account
   - `login()` - Authenticate user
   - `logOut()` - End user session
   - `getCurrentUser()` - Get logged-in user
   - `getProfile()` - Get user profile data
   - `updateProfile()` - Update user profile

4. **Database Security** (Row Level Security in Supabase)
   - Users can only see their own profile data
   - Public profiles are viewable by everyone (you can change this)
   - Profiles are automatically created when users sign up

## Extending the Starter

### Adding a New Protected Page

1. Create a new folder in `app/(root)/(protected)/`:

```tsx
// app/(root)/(protected)/dashboard/page.tsx
import { getCurrentUser } from "@/utils/data-access/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.email}</p>
    </div>
  );
}
```

2. Add a link in the navigation ([app/(root)/(protected)/layout.tsx](app/(root)/(protected)/layout.tsx)):

```tsx
<Link href="/dashboard">Dashboard</Link>
```

That's it! The page is automatically protected by the layout guard.

### Adding a New Database Table

1. Create a new migration file:

```sql
-- supabase/migrations/002_add_posts.sql
CREATE TABLE public.posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own posts"
  ON public.posts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own posts"
  ON public.posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

2. Run the migration in Supabase SQL Editor (same as step 3 of setup)

3. Create server actions in `utils/data-access/`:

```typescript
// utils/data-access/posts.ts
'use server'
import { createClient } from "@/utils/supabase/server";

export async function getPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return { success: false, error: error.message };
  return { success: true, data };
}
```

### Customizing the Theme

Edit [app/globals.css](app/globals.css) to change colors:

```css
@theme {
  --color-primary: oklch(0.7 0.2 250);  /* Change the hue (250) for different colors */
  --color-secondary: oklch(0.5 0.1 180);
}
```

Or use the [shadcn theme editor](https://ui.shadcn.com/themes) for a visual editor.

### Adding More Auth Features

**Want password reset?**
- Create pages for "forgot password" and "reset password"
- Use Supabase's `resetPasswordForEmail()` and `updateUser()` methods

**Want OAuth (Google, GitHub)?**
- Enable providers in Supabase Dashboard → Authentication → Providers
- Add OAuth buttons to your login page
- Use `supabase.auth.signInWithOAuth({ provider: 'google' })`

**Want to protect API routes?**
- Use the server Supabase client in your route handlers
- Check for `user` before processing requests

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket

2. Go to [vercel.com](https://vercel.com/) and import your repository

3. Add your environment variables in Vercel:
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`
   - **Important:** For production, use your actual domain for `NEXT_PUBLIC_META_URL`

4. Update Supabase redirect URLs:
   - In Supabase Dashboard → Authentication → URL Configuration
   - Add your Vercel URL to "Site URL" and "Redirect URLs"
   - Format: `https://your-app.vercel.app/auth/confirm`

5. Deploy! Vercel will automatically deploy on every push to your main branch

### Other Deployment Options

This is a standard Next.js app and can be deployed to:
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- Any platform that supports Next.js

Just make sure to:
- Set all environment variables
- Update your Supabase redirect URLs
- Use the correct production URL in `NEXT_PUBLIC_META_URL`

## Troubleshooting

### "Invalid login credentials" error

- Make sure you confirmed your email (check spam folder)
- Try resetting your password in Supabase dashboard if needed
- Verify your environment variables are correct

### Email confirmation link doesn't work

- Check if `NEXT_PUBLIC_META_URL` matches your app's URL
- In Supabase Dashboard → Authentication → URL Configuration, make sure your site URL is correct
- The link should redirect to: `http://localhost:3000/auth/confirm` (or your production URL)

### "fetch failed" or connection errors

- Make sure your Supabase project is active (not paused due to inactivity)
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check your internet connection

### Changes to `.env.local` not working

- Restart your development server (`Ctrl+C` then `npm run dev` again)
- Clear your browser cache and cookies for localhost

### "relation 'public.profiles' does not exist"

- You need to run the database migration (Step 3 of Quick Start)
- Go to Supabase SQL Editor and run the migration file

### Sign up works but profile page is empty

- Make sure the database trigger was created properly
- Try running the migration again
- Check Supabase logs: Database → Logs

## Tech Stack Details

- **Next.js 16** - App Router, React Server Components, Server Actions
- **React 19** - Latest React with improved performance
- **TypeScript** - Full type safety
- **Supabase** - PostgreSQL database, authentication, and real-time features
- **Tailwind CSS v4** - Utility-first CSS framework (beta)
- **shadcn/ui** - Re-usable components built with Radix UI
- **Zod** - Schema validation for forms and data
- **React Hook Form** - Performant, flexible forms
- **Sonner** - Toast notifications
- **Lucide** - Beautiful icon library

## Contributing

This is a starter template - feel free to:
- Fork it and make it your own
- Submit issues if you find bugs
- Create pull requests to improve it
- Share it with other developers

## License

MIT License - feel free to use this for personal or commercial projects!

## Support

If you have questions or run into issues:
1. Check the Troubleshooting section above
2. Review the [Next.js documentation](https://nextjs.org/docs)
3. Check [Supabase documentation](https://supabase.com/docs)
4. Look at the code - it's well-commented and organized!

## What's Next?

Now that authentication is set up, you can focus on building your unique features:
- Add your business logic
- Create your database schema
- Build your UI components
- Deploy to production
- Ship your product!

Happy coding!
