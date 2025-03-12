import React from 'react'
import { Navbar } from './navbar';
import Footer from './footer';

export default function Layout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>
) {
  return (
    <>
      <Navbar />
      <main className="">
        {children}
        <Footer />
      </main>
    </>
  )
}
