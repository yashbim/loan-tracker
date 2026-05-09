import { supabase } from '@/lib/supabase/client';
import AddLoanForm from '@/components/AddLoanForm';
import LoanCard from '@/components/LoanCard';
import { Banknote, LogOut } from 'lucide-react';
import { logout } from '@/lib/actions/auth-actions';

export const revalidate = 0;

const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY || 'LKR';

export default async function Dashboard() {
  const { data: loans, error } = await supabase
    .from('loans')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching loans:', error);
  }

  const activeLoans = loans?.filter((l) => l.status === 'pending') || [];
  const totalLent = activeLoans.reduce((sum, loan) => sum + Number(loan.amount), 0);

  return (
    <main className="p-4 sm:p-6 md:p-8 space-y-8">
      <header className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Financial Mistake Tracker</h1>
          <p className="text-sm text-slate-500">Documenting every time you were too nice for your own good.</p>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            title="Escape from Reality"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </form>
      </header>

      {/* Summary Section */}
      <section className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-sm font-medium text-slate-400 mb-1">Total Amount You&apos;ll Probably Never See Again</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-medium text-slate-400 mr-1">{CURRENCY}</span>
            <span className="text-5xl font-bold tracking-tight">
              {totalLent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
        <Banknote className="absolute -right-4 -bottom-4 w-32 h-32 text-slate-800 opacity-50" />
      </section>

      {/* Add Loan Form Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-slate-900">Witness a New Financial Tragedy</h2>
        </div>
        <AddLoanForm />
      </section>

      {/* Active Loans List Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">People Who Currently Owe You Their Souls</h2>
          <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
            {activeLoans.length} victims
          </span>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {activeLoans.length === 0 ? (
            <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl">
              <p className="text-slate-500 text-sm">Wow, you actually have money in your bank account? Unbelievable.</p>
            </div>
          ) : (
            activeLoans.map((loan) => (
              <LoanCard key={loan.id} loan={loan} />
            ))
          )}
        </div>
      </section>

      <footer className="pt-8 text-center border-t border-slate-100">
        <p className="text-xs text-slate-400">Debt Trap Simulator &bull; Built with Tears & Hopelessness</p>
      </footer>
    </main>
  );
}
