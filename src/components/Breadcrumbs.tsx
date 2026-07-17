'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 font-body text-xs font-semibold py-3 px-4 bg-[#F5EDE3] border-2 border-[#2C1810] shadow-tactile-sm mb-6 overflow-x-auto whitespace-nowrap">
      <Link href="/" className="text-[#8B1A2B] hover:text-[#2C1810] flex items-center gap-1 font-heading text-[11px] uppercase">
        <Home className="w-3.5 h-3.5" />
        Главная
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 text-[#2C1810]/50 shrink-0" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-[#8B1A2B] hover:text-[#2C1810] font-heading text-[11px] uppercase"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#2C1810] font-heading text-[11px] uppercase font-bold truncate max-w-xs">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
