'use client'
import { useUser } from '@clerk/clerk-react';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react'; // Import useEffect
import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      redirect('/dashboard') // Navigate AFTER the render
    }
  }, [isSignedIn, router]); // Add isSignedIn and router to the dependency array

  if (isSignedIn) {
    return null; // Or a loading indicator if you prefer
  }
  return(
  <div className='w-full h-screen flex items-center justify-center'>
    <SignIn afterSignInUrl="/dashboard"/>
  </div> 
  )
}