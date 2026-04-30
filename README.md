# 💸 Financial Mistake Tracker (The "I'm Too Nice" Edition)

A minimalist, mobile-friendly application for documenting exactly how much money you've "lent" to people who will probably never pay you back. Built with **Next.js 15**, **Tailwind CSS**, and **Supabase** (to store your regrets).

## 🚀 Features of Despair

- **Total Summary:** Instantly see the total amount of money that has escaped your bank account.
- **Record Tragedies:** Quickly document new loans with the name of the culprit, the day of regret, and their creative excuses.
- **Manage Victims:** Track active "loans" and wait for a miracle to mark them as paid.
- **Mobile First:** Because you need to record the mistake immediately after you hand over the cash.

## 🛠️ Setup Instructions (If you still have money for electricity)

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

Create `.env.local` and add your Supabase credentials along with the preffered currency:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your `anon` `public` API key |
| `NEXT_PUBLIC_CURRENCY` | Your preffered currency ($, ₹, £, etc.) |

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