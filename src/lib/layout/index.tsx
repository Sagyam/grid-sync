import type { ReactNode } from 'react';

import { ThemeProvider } from '@/lib/components/theme-provider';

import Footer from './Footer';
import Header from './Header';
import Meta from './Meta';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Meta />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="h-1/2">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
