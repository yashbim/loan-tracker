'use client';

import { useState } from 'react';
import { markAsPaid, updateLoanAmount } from '@/lib/actions/loan-actions';
import { Calendar, User, CheckCircle, MinusCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

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
  const [isPaying, setIsPaying] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');

  const handleMarkAsPaid = async () => {
    if (confirm('Mark this loan as paid?')) {
      const result = await markAsPaid(loan.id);
      if (result.success) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0f172a', '#334155', '#64748b', '#94a3b8']
        });
      }
    }
  };

  const handlePartialPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) return;

    const newAmount = Math.max(0, loan.amount - amount);
    const result = await updateLoanAmount(loan.id, newAmount);

    if (result.success) {
      if (newAmount === 0) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0f172a', '#334155', '#64748b', '#94a3b8']
        });
      }
      setIsPaying(false);
      setPaymentAmount('');
    }
  };

  return (
    <div className={`p-4 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow ${loan.status === 'paid' ? 'opacity-75' : ''}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-slate-400" />
          <h3 className="font-semibold text-slate-900">{loan.borrower_name}</h3>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 font-bold text-slate-900 text-lg">
            <span className="text-xs text-slate-500 font-medium mr-0.5">{CURRENCY}</span>
            {Number(loan.amount).toLocaleString()}
          </div>
          {loan.status === 'paid' && (
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Paid
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 text-sm text-slate-500 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Lent on: {new Date(loan.loan_date).toLocaleDateString()}</span>
        </div>
        {loan.due_date && loan.status !== 'paid' && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-red-400" />
            <span className="text-red-600 font-medium">Due: {new Date(loan.due_date).toLocaleDateString()}</span>
          </div>
        )}
        {loan.description && (
          <p className="mt-2 text-slate-600 italic">&quot;{loan.description}&quot;</p>
        )}
      </div>

      {loan.status === 'pending' && (
        <div className="space-y-2">
          {!isPaying ? (
            <div className="flex gap-2">
              <button
                onClick={handleMarkAsPaid}
                className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-slate-800 transition-colors text-sm font-medium"
              >
                <CheckCircle className="w-4 h-4" />
                Paid
              </button>
              <button
                onClick={() => setIsPaying(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-2 px-4 rounded-md hover:bg-slate-50 transition-colors text-sm font-medium"
              >
                <MinusCircle className="w-4 h-4" />
                Partial
              </button>
            </div>
          ) : (
            <form onSubmit={handlePartialPayment} className="flex flex-col gap-2 p-2 bg-slate-50 rounded-md border border-slate-100">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">{CURRENCY}</span>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Amount paid..."
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="w-full pl-10 pr-3 py-1.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    autoFocus
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-slate-900 text-white py-1.5 rounded-md text-xs font-bold hover:bg-slate-800"
                >
                  Record
                </button>
                <button
                  type="button"
                  onClick={() => setIsPaying(false)}
                  className="flex-1 bg-white border border-slate-200 text-slate-500 py-1.5 rounded-md text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

