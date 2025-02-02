
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkLoaded,
  ClerkLoading,
  ClerkProvider,
} from '@clerk/nextjs'
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Interview Taker",
  description: "Give an interview with AI.",
};

export default function RootLayout({ children }) {
  

  // const afterSignIn = () => {
  //   // Your logic here (redirect, API calls, etc.)
  //   console.log("User signed in!");

  //   // Example 1: Redirect to a specific page (Next.js)
  //   redirect('/dashboard');
  // }
  return (
    <ClerkProvider>
    <head>
    <link rel='icon' href='/favicon.jpeg' />
    </head>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col`}
      >
       
       <ClerkLoading>
          <div className="flex items-center justify-center h-screen text-2xl">
            Loading...
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <div className=" ">
            <div className="flex flex-col h-screen ">
             
              
              {children}
              <Toaster />
              <Footer/>
            </div>
          </div>
        </ClerkLoaded>
      </body>
    </html>
  </ClerkProvider>
  );
}
