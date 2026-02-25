import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageCircle, ChevronDown } from 'lucide-react';
import { WEDDING_CONFIG } from './config/wedding';
import { SafeImage } from './components/SafeImage';
import { Countdown } from './components/Countdown';
import { Timeline } from './components/Timeline';
import { RSVPForm } from './components/RSVPForm';
import { Navigation } from './components/Navigation';

export default function App() {
  const revealProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="min-h-screen selection:bg-wedding-champagne selection:text-white">
      <Navigation />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-[--header-height]">
        <div className="absolute inset-0 z-0">
          <SafeImage 
            src={WEDDING_CONFIG.images.hero} 
            alt="Дарья и Сергей" 
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Enhanced Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-wedding-graphite/40 via-transparent to-wedding-ivory/60" />
          <div className="absolute inset-0 bg-wedding-graphite/10" />
          
          {/* Subtle Parallax Gradients (Desktop only, reduced motion aware) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.1, 0.15, 0.1],
              scale: [1, 1.05, 1],
              x: [0, 10, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute -top-1/4 -left-1/4 w-full h-full bg-radial-gradient from-wedding-champagne/20 to-transparent blur-3xl hidden md:block pointer-events-none"
          />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-[10px] md:text-xs uppercase tracking-[0.8em] font-medium opacity-90">
              Дорогие гости!
            </h2>
            {/* Shimmer Line */}
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "40px", opacity: 0.6 }}
              transition={{ duration: 1.5, delay: 0.8 }}
              className="h-px bg-white mx-auto mt-4"
            />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.99, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-8xl font-serif mb-12 leading-tight drop-shadow-sm"
          >
            {WEDDING_CONFIG.couple.bride} <br className="md:hidden" />
            <span className="italic text-3xl md:text-6xl mx-4 font-normal opacity-80">&</span> <br className="md:hidden" />
            {WEDDING_CONFIG.couple.groom}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <p className="text-base md:text-lg font-serif italic max-w-md mx-auto leading-relaxed opacity-95">
              Приглашаем вас разделить с нами <br className="hidden md:block" />
              самый важный день нашей жизни
            </p>
            
            <div className="pt-4 space-y-4">
              <div className="space-y-2">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-medium">
                  {WEDDING_CONFIG.date.display}
                </p>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] opacity-70">
                  Начало в {WEDDING_CONFIG.date.time}
                </p>
              </div>
              <p className="text-[11px] uppercase tracking-[0.3em] font-medium text-wedding-champagne">
                {WEDDING_CONFIG.location.city}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40"
        >
          <ChevronDown size={20} strokeWidth={1} />
        </motion.div>
      </section>

      {/* 2. PROGRAM SECTION */}
      <section id="program" className="section-wedding bg-wedding-ivory">
        <div className="container-wedding">
          <motion.div {...revealProps} className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-serif mb-6">Программа дня</h2>
            <div className="section-divider" />
          </motion.div>
          <Timeline />
        </div>
      </section>

      {/* 3. TIMER SECTION */}
      <section id="timer" className="section-wedding bg-wedding-secondary">
        <div className="container-wedding text-center">
          <motion.h2 {...revealProps} className="text-[10px] uppercase tracking-[0.5em] text-wedding-muted mb-16 font-medium">
            До свадьбы осталось
          </motion.h2>
          <Countdown targetDate={WEDDING_CONFIG.date.iso} />
        </div>
      </section>

      {/* 4. LOCATION SECTION */}
      <section id="location" className="section-wedding bg-wedding-ivory">
        <div className="container-wedding">
          {/* Centered Title */}
          <motion.div {...revealProps} className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-serif mb-6">Локация</h2>
            <div className="section-divider" />
          </motion.div>

          {/* Two-column Grid */}
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            
            {/* Left: Text Content */}
            <motion.div 
              {...revealProps}
              className="space-y-8 text-center md:text-left order-1"
            >
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-wedding-muted leading-relaxed">
                  Наша свадьба пройдет в <br />
                  <span className="text-wedding-graphite font-medium">{WEDDING_CONFIG.location.name}</span>
                </p>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-wedding-muted leading-loose max-w-md mx-auto md:mx-0">
                  {WEDDING_CONFIG.location.fullAddress}
                </p>
              </div>
              
              <div className="pt-4">
                <a 
                  href={WEDDING_CONFIG.location.twoGisUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  Посмотреть в 2GIS
                </a>
              </div>
            </motion.div>
            
            {/* Right: Image */}
            <motion.div 
              {...revealProps}
              className="aspect-[4/3] overflow-hidden rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-wedding-divider/20 order-2"
            >
              <SafeImage 
                src="/images/banket.webp" 
                alt="Банкетный зал Грильяж" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. DETAILS SECTION */}
      <section id="details" className="section-wedding bg-wedding-secondary">
        <div className="container-wedding text-center">
          <div className="max-w-prose-wedding space-y-10">
            <motion.h2 {...revealProps} className="text-3xl font-serif italic">Детали</motion.h2>
            <div className="section-divider" />
            <motion.div {...revealProps} className="space-y-8 text-wedding-muted leading-loose text-sm md:text-base">
              <p>
                Ваше присутствие на нашем празднике - самый главный подарок для нас. 
                Если вы планируете порадовать нас подарком, мы будем признательны за вклад в бюджет нашей будущей семьи.
              </p>
              <p>
                Мы очень просим вас воздержаться от покупки цветов, так как сразу после торжества мы улетаем в свадебное путешествие и не успеем насладиться их красотой.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. DRESS CODE SECTION */}
      <section id="dress-code" className="section-wedding bg-wedding-ivory">
        <div className="container-wedding text-center">
          <motion.h2 {...revealProps} className="text-3xl md:text-5xl font-serif mb-10">Дресс-код</motion.h2>
          <motion.div {...revealProps} className="max-w-prose-wedding mb-16">
            <p className="text-wedding-muted leading-relaxed text-sm md:text-base">
              {WEDDING_CONFIG.dressCode.description}
            </p>
          </motion.div>

          {/* Color Palette */}
          <motion.div 
            {...revealProps}
            className="grid grid-cols-3 md:flex md:justify-center gap-8 md:gap-12 mb-20"
          >
            {WEDDING_CONFIG.dressCode.colors.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3">
                <div 
                  className="w-14 h-14 rounded-full border border-wedding-divider/20 shadow-sm relative overflow-hidden group"
                  style={{ backgroundColor: item.hex }}
                >
                  {/* Inner Highlight */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-white/10 pointer-events-none" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-wedding-muted font-medium">
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div {...revealProps} className="max-w-prose-wedding space-y-10 text-wedding-muted leading-loose text-sm md:text-base">
            <p>
              <span className="text-wedding-graphite font-medium">Дамы</span> - платья или костюмы в светлых и тёплых оттенках.
            </p>
            <p>
              <span className="text-wedding-graphite font-medium">Мужчины</span> - {WEDDING_CONFIG.dressCode.menDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7. CONTACTS (HOST ONLY) */}
      <section id="contacts" className="section-wedding bg-wedding-secondary">
        <div className="container-wedding">
          <div className="max-w-xl mx-auto">
            <motion.div 
              {...revealProps}
              className="card-premium text-center space-y-8"
            >
              <div className="w-32 h-32 rounded-full bg-wedding-ivory mx-auto overflow-hidden border border-wedding-divider/30 p-1">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <SafeImage 
                    src={WEDDING_CONFIG.images.host} 
                    alt="Ведущий Артур" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-serif mb-2">Ведущий {WEDDING_CONFIG.contacts.host.name}</h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-wedding-muted">Вашего настроения</p>
                </div>
                <p className="text-xs text-wedding-muted leading-relaxed px-4 italic">
                  "Если готовите сюрприз или есть вопросы - напишите ведущему."
                </p>
                <div className="flex justify-center gap-6">
                  <a href={`tel:${WEDDING_CONFIG.contacts.host.phone}`} className="w-12 h-12 rounded-full border border-wedding-divider/50 flex items-center justify-center hover:bg-wedding-champagne hover:text-white hover:border-wedding-champagne transition-all duration-500">
                    <Phone size={18} strokeWidth={1.5} />
                  </a>
                  <a href={WEDDING_CONFIG.contacts.host.vk} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-wedding-divider/50 flex items-center justify-center hover:bg-wedding-champagne hover:text-white hover:border-wedding-champagne transition-all duration-500">
                    <span className="text-[10px] font-bold tracking-tighter">VK</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. RSVP SECTION */}
      <section id="rsvp" className="section-wedding bg-wedding-ivory">
        <div className="container-wedding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image for mobile and desktop */}
            <motion.div 
              {...revealProps}
              className="relative order-1 lg:order-2"
            >
              <div className="aspect-[3/4] max-w-[400px] mx-auto overflow-hidden rounded-[16px] shadow-sm border border-wedding-divider/20 p-4 bg-white/30">
                <SafeImage 
                  src={WEDDING_CONFIG.images.rsvp} 
                  alt="Дарья и Сергей" 
                  className="w-full h-full object-cover rounded-[12px]"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-wedding-champagne/10 -z-10 rounded-[16px] hidden lg:block" />
            </motion.div>

            <motion.div {...revealProps} className="space-y-12 lg:space-y-16 order-2 lg:order-1">
              <div className="space-y-6 text-center lg:text-left">
                <h2 className="text-3xl md:text-5xl font-serif">Присутствие</h2>
                <div className="max-w-prose-wedding mx-auto lg:mx-0">
                  <p className="text-wedding-muted leading-relaxed text-sm md:text-base">
                    Ваши ответы помогут нам в организации свадьбы. <br />
                    Будем ждать ответ до <span className="text-wedding-graphite font-medium">{WEDDING_CONFIG.date.rsvpDeadline}</span>
                  </p>
                </div>
              </div>
              <RSVPForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="section-wedding bg-wedding-secondary text-center">
        <motion.h2 
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.6em' }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="text-xl md:text-3xl font-serif uppercase tracking-[0.6em] text-wedding-graphite"
        >
          МЫ БУДЕМ СЧАСТЛИВЫ ВИДЕТЬ ВАС!
        </motion.h2>
        <div className="mt-16 text-[10px] uppercase tracking-[0.4em] text-wedding-muted opacity-60">
          &copy; 2026 {WEDDING_CONFIG.couple.names}
        </div>
      </footer>
    </div>
  );
}
