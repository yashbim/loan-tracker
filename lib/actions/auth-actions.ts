'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const password = formData.get('password');
  const correctPassword = process.env.APP_PASSWORD;

  if (password === correctPassword) {
    (await cookies()).set('session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
    redirect('/');
  } else {
    return { error: 'Invalid password' };
  }
}

export async function logout() {
  (await cookies()).delete('session');
  redirect('/login');
}
