import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple scroll spy
      const sections = ['program', 'timer', 'location', 'dress-code', 'contacts', 'rsvp'];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(`#${current}`);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Программа', href: '#program' },
    { label: 'Таймер', href: '#timer' },
    { label: 'Локация', href: '#location' },
    
    { label: 'Дресс-код', href: '#dress-code' },
    { label: 'Ведущий', href: '#contacts' },
    { label: 'Присутствие', href: '#rsvp' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 h-[--header-height] flex items-center ${
          scrolled
            ? 'bg-wedding-ivory/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.03)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1280px] w-full mx-auto px-6 md:px-10 flex justify-between items-center">
          <a href="#" className="text-xl md:text-2xl font-serif tracking-[0.3em] uppercase text-wedding-graphite font-bold">
            S & D
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 lg:gap-12 items-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`nav-link text-[12px] lg:text-[13px] uppercase tracking-[0.2em] text-wedding-graphite hover:text-[#C6A77A] font-bold ${
                  activeSection === item.href ? 'active text-[#C6A77A]' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-wedding-graphite hover:text-[#C6A77A] transition-colors"
            aria-label="Открыть меню"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-80 bg-wedding-ivory z-50 md:hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-serif tracking-[0.3em] uppercase text-wedding-graphite font-bold">
                    S & D
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-wedding-graphite hover:text-[#C6A77A] transition-colors"
                    aria-label="Закрыть меню"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-3 text-sm uppercase tracking-[0.2em] text-wedding-graphite hover:text-[#C6A77A] transition-colors font-bold ${
                        activeSection === item.href ? 'text-[#C6A77A]' : ''
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};


