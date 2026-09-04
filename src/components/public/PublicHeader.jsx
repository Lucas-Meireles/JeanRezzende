import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { LiquidButton } from '../motion/LiquidButton';
import { smoothScrollToId } from '../../services/navigation';
import { useAppStore } from '../../store/useAppStore';

const links = [
  ['O show', '#show'],
  ['Nossa história', '#historia'],
  // ['Agenda', '#agenda'],
  ['Ao vivo', '#ao-vivo'],
  ['Repertório', '#repertorio'],
];

export function PublicHeader() {
  const { theme, setTheme } = useAppStore();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('show');

  useEffect(() => {
    const sections = links
      .map(([, hash]) => document.getElementById(hash.slice(1)))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-22% 0px -62% 0px', threshold: [0.05, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleNavigation = (event, hash) => {
    event.preventDefault();
    setOpen(false);
    smoothScrollToId(hash);
  };

  return (
    <header className="public-header">
      <Logo />

      <nav className={open ? 'public-nav public-nav--open' : 'public-nav'}>
        {links.map(([label, hash]) => {
          const id = hash.slice(1);

          return (
            <a
              key={label}
              href={hash}
              className={active === id ? 'is-active' : ''}
              aria-current={active === id ? 'location' : undefined}
              onClick={(event) => handleNavigation(event, hash)}
            >
              {label}
            </a>
          );
        })}

        <LiquidButton href="https://wa.me/5511939397691">
          Contratar
        </LiquidButton>
      </nav>

      <div className="header-actions">
        <button
          className="icon-button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Alternar tema"
        >
          {theme === 'dark' ? <Sun key="sun" size={18} className="icon-pop" /> : <Moon key="moon" size={18} className="icon-pop" />}
        </button>

        <button
          className="icon-button menu-button"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X key="close" size={21} className="icon-pop" /> : <Menu key="open" size={21} className="icon-pop" />}
        </button>
      </div>
    </header>
  );
}
