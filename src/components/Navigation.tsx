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
      const sections = ['program', 'timer', 'location', 'details', 'dress-code', 'contacts', 'rsvp'];
      const current = sections.find(section => {
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
    { label: 'Детали', href: '#details' },
    { label: 'Дресс-код', href: '#dress-code' },
    { label: 'Ведущий', href: '#contacts' },
    { label: 'Присутствие', href: '#rsvp' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 h-[--header-height] flex items-center ${
          scrolled ? 'bg-wedding-ivory/95 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.03)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1280px] w-full mx-auto px-6 md:px-10 flex justify-between items-center">
          <a href="#" className="text-xl md:text-2xl font-serif tracking-[0.3em] uppercase text-wedding-graphite font-bold">
            D & S
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 lg:gap-12 items-center">
            {navItems.map(item => (
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

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-wedding-graphite"
          >
            {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 bg-wedding-ivory z-40 flex flex-col items-center justify-center gap-10"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-serif text-wedding-graphite tracking-wide"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
