'use client';

import { addLoan } from '@/lib/actions/loan-actions';
import { useRef, useState } from 'react';
import { PlusCircle } from 'lucide-react';

const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY || 'LKR';

export default function AddLoanForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  async function clientAction(formData: FormData) {
    setLoading(true);
    const result = await addLoan(formData);
    setLoading(false);
    
    if (result.success) {
      formRef.current?.reset();
    } else {
      alert(result.error || 'Failed to add loan');
    }
  }

  return (
    <form ref={formRef} action={clientAction} className="space-y-4 p-4 bg-slate-50 border border-slate-200 rounded-lg shadow-inner">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="borrower_name" className="block text-sm font-medium text-slate-700 mb-1">
            The Culprit / Future Ghoster
          </label>
          <input
            type="text"
            id="borrower_name"
            name="borrower_name"
            required
            placeholder="Who's robbing you today?"
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 text-sm"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">
            Losing Amount ({CURRENCY})
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            required
            min="1"
            step="0.01"
            placeholder="How much goodbye?"
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="loan_date" className="block text-sm font-medium text-slate-700 mb-1">
            Day of Regret
          </label>
          <input
            type="date"
            id="loan_date"
            name="loan_date"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 text-sm"
          />
        </div>
        <div>
          <label htmlFor="due_date" className="block text-sm font-medium text-slate-700 mb-1">
            The Day They'll Ignore Your Calls
          </label>
          <input
            type="date"
            id="due_date"
            name="due_date"
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
          Their Lies (Optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={2}
          placeholder="e.g. 'I'll pay you back next Friday, I swear!'"
          className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-2 px-4 rounded-md hover:bg-slate-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <PlusCircle className="w-4 h-4" />
        {loading ? 'Witnessing tragedy...' : 'Say Goodbye to This Money'}
      </button>
    </form>
  );
}
