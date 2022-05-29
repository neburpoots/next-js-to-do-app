import Head from 'next/head';
import React from 'react';
import NavBar from './NavBar';
import Title from './Title';

interface PageProps {
  title: string;
}

const Page: React.FC<PageProps> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title} - To do applicatie</title>
      </Head>
      <header className="z-50	border-b border-gray-500 text-sm sticky top-0 g-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60">
        <NavBar />
      </header>
      <main className="px-6 py-4 backdrop-blur min-h-screen	">
        <Title>{title}</Title>
        {children}
      </main>
    </>
  );
};

export default Page;
