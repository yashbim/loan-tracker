import { supabase } from '@/lib/supabase/client';
import AddLoanForm from '@/components/AddLoanForm';
import LoanCard from '@/components/LoanCard';
import { DollarSign } from 'lucide-react';

export const revalidate = 0;

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
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Loan Tracker</h1>
          <p className="text-sm text-slate-500">Track your personal loans effortlessly.</p>
        </div>
      </header>

      {/* Summary Section */}
      <section className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-sm font-medium text-slate-400 mb-1">Total Lent Out</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-medium text-slate-400">$</span>
            <span className="text-5xl font-bold tracking-tight">
              {totalLent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
        <DollarSign className="absolute -right-4 -bottom-4 w-32 h-32 text-slate-800 opacity-50" />
      </section>

      {/* Add Loan Form Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-slate-900">Record New Loan</h2>
        </div>
        <AddLoanForm />
      </section>

      {/* Active Loans List Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Active Loans</h2>
          <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
            {activeLoans.length} total
          </span>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {activeLoans.length === 0 ? (
            <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl">
              <p className="text-slate-500 text-sm">No active loans found. Time to lend some money?</p>
            </div>
          ) : (
            activeLoans.map((loan) => (
              <LoanCard key={loan.id} loan={loan} />
            ))
          )}
        </div>
      </section>

      <footer className="pt-8 text-center border-t border-slate-100">
        <p className="text-xs text-slate-400">Personal Loan Tracker &bull; Built with Next.js & Supabase</p>
      </footer>
    </main>
  );
}
