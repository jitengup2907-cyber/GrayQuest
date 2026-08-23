import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  onCheckEligibility: () => void;
  onStartApplication: () => void;
  onOpenPortal: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  onCheckEligibility, 
  onStartApplication,
  onOpenPortal
}) => {
  return (
    <div className="min-h-screen selection:bg-brand-blue/10 font-sans flex flex-col bg-brand-surface">
      <Navbar 
        onCheckEligibility={onCheckEligibility} 
        onStartApplication={onStartApplication}
        onOpenPortal={onOpenPortal} 
      />
      <main className="pt-[96px] flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

