'use client';

import { markAsPaid } from '@/lib/actions/loan-actions';
import { Calendar, User, Banknote, CheckCircle } from 'lucide-react';

interface Loan {
  id: string;
  borrower_name: string;
  amount: number;
  loan_date: string;
  due_date: string | null;
  status: 'pending' | 'paid';
  description: string | null;
}

const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY || 'LKR';

export default function LoanCard({ loan }: { loan: Loan }) {
  return (
    <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-slate-400" />
          <h3 className="font-semibold text-slate-900">{loan.borrower_name}</h3>
        </div>
        <div className="flex items-center gap-1 font-bold text-slate-900">
          <span className="text-xs text-slate-500 font-medium mr-0.5">{CURRENCY}</span>
          {Number(loan.amount).toLocaleString()}
        </div>
      </div>

      <div className="space-y-2 text-sm text-slate-500 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Lent on: {new Date(loan.loan_date).toLocaleDateString()}</span>
        </div>
        {loan.due_date && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-red-400" />
            <span className="text-red-600 font-medium">Due: {new Date(loan.due_date).toLocaleDateString()}</span>
          </div>
        )}
        {loan.description && (
          <p className="mt-2 text-slate-600 italic">"{loan.description}"</p>
        )}
      </div>

      <form action={async () => {
        if (confirm('Mark this loan as paid?')) {
          await markAsPaid(loan.id);
        }
      }}>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-slate-800 transition-colors text-sm font-medium"
        >
          <CheckCircle className="w-4 h-4" />
          Mark as Paid
        </button>
      </form>
    </div>
  );
}
