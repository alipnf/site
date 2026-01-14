'use client';

import { useState, useLayoutEffect } from 'react';
import { cn } from '@/lib/utils';

type FooterProps = {
  className?: string;
  showLanguageToggle?: boolean;
  lang?: 'id' | 'en';
  onToggleLangAction?: () => void;
};

export default function Footer({
  className,
  showLanguageToggle = false,
  lang = 'id',
  onToggleLangAction: onToggleLang,
}: FooterProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Only render theme controls after client-side hydration
  const isHydrated = mounted;

  return (
    <footer
      className={cn(
        'mx-auto px-6 py-6 flex justify-between items-end',
        className
      )}
    >
      <nav>
        <ul className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
          <li>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-accent transition-colors"
            >
              ./ alipnf
            </button>
          </li>
        </ul>
      </nav>
      {isHydrated && (
        <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
          {showLanguageToggle && onToggleLang && (
            <>
              <button
                onClick={onToggleLang}
                className="hover:text-accent transition-colors"
              >
                [{lang === 'id' ? ' ID ' : ' EN '}]
              </button>
              <span>|</span>
            </>
          )}
          <button
            onClick={toggleTheme}
            className="hover:text-accent transition-colors"
          >
            [{isDark ? ' dark ' : ' light '}]
          </button>
        </div>
      )}
    </footer>
  );
}
