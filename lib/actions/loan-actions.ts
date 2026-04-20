'use server';

import { supabase } from '@/lib/supabase/client';
import { revalidatePath } from 'next/cache';

export async function addLoan(formData: FormData) {
  const borrower_name = formData.get('borrower_name') as string;
  const amount = parseFloat(formData.get('amount') as string);
  const loan_date = formData.get('loan_date') as string;
  const due_date = formData.get('due_date') as string || null;
  const description = formData.get('description') as string || null;

  const { error } = await supabase
    .from('loans')
    .insert([{
      borrower_name,
      amount,
      loan_date,
      due_date,
      description,
      status: 'pending'
    }]);

  if (error) {
    console.error('Error adding loan:', error);
    return { error: error.message };
  }

  revalidatePath('/');
  return { success: true };
}

export async function markAsPaid(id: string) {
  const { error } = await supabase
    .from('loans')
    .update({ status: 'paid' })
    .eq('id', id);

  if (error) {
    console.error('Error marking loan as paid:', error);
    return { error: error.message };
  }

  revalidatePath('/');
  return { success: true };
}
