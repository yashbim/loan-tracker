# 💸 Personal Loan Tracker (LKR)

A minimalist, mobile-friendly personal loan tracking application built with **Next.js 15**, **Tailwind CSS**, and **Supabase**.

## 🚀 Features

- **Total Summary:** Instantly see the total amount you've lent out in LKR.
- **Add Loans:** Quickly record new loans with borrower names, dates, and optional descriptions.
- **Manage Loans:** Track active loans and mark them as paid with a single click.
- **Mobile First:** Designed to be used on the go.

## 🛠️ Setup Instructions

### 1. Database (Supabase)

1. Create a new project at [Supabase](https://supabase.com).
2. Go to the **SQL Editor** and run the following script:

```sql
CREATE TYPE loan_status AS ENUM ('pending', 'paid');

CREATE TABLE loans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  borrower_name TEXT NOT NULL,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  loan_date DATE NOT NULL,
  due_date DATE,
  status loan_status DEFAULT 'pending' NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE loans DISABLE ROW LEVEL SECURITY;
```

### 2. Environment Variables

Rename `.env.example` to `.env.local` and add your Supabase credentials:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your `anon` `public` API key |

### 3. Installation

```bash
npm install
npm run dev
```

## 🌐 Deployment

Deploy easily on **Vercel**:

1. Connect your GitHub repo.
2. Add your environment variables in the Vercel dashboard.
3. Deploy!