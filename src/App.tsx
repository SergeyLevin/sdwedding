﻿import React from 'react';
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

  
  const DRESS_TEXTURES: Record<string, string> = {
    "Бежевый": `${import.meta.env.BASE_URL}images/beige.webp`,
    "Золотистый": `${import.meta.env.BASE_URL}images/gold.webp`,
    "Розовый": `${import.meta.env.BASE_URL}images/pink.webp`,
    "Коричневый": `${import.meta.env.BASE_URL}images/brown.webp`,
  };
return (
    <div className="min-h-screen selection:bg-wedding-champagne selection:text-white">
      <Navigation />

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-[--header-height]">
        <div className="absolute inset-0 z-0">
          <SafeImage 
            src={WEDDING_CONFIG.images.hero} 
            alt="Сергей и Дарья" 
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
            {WEDDING_CONFIG.couple.groom} <br className="md:hidden" />
            <span className="italic text-3xl md:text-6xl mx-4 font-normal opacity-80">&</span> <br className="md:hidden" />
            {WEDDING_CONFIG.couple.bride}
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
                <p className="text-[11px] md:text-[12px] uppercase tracking-[0.6em] font-medium opacity-90">
                  {WEDDING_CONFIG.date.display}
                </p>
                <p className="text-[11px] md:text-[12px] uppercase tracking-[0.6em] font-medium opacity-90">
                  Начало в {WEDDING_CONFIG.date.time}
                </p>
                <p className="text-[11px] md:text-[12px] uppercase tracking-[0.6em] font-medium opacity-80 text-wedding-champagne">
                  {WEDDING_CONFIG.location.city}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-white/70"
            >
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. PROGRAM SECTION */}
      <section id="program" className="section-wedding bg-wedding-ivory">
        <div className="container-wedding">
          <motion.div {...revealProps} className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-serif mb-6">Программа дня</h2>
          </motion.div>
          <Timeline />
        </div>
      </section>

      {/* 3. TIMER SECTION */}
      <section id="timer" className="section-wedding bg-wedding-secondary">
        <div className="container-wedding text-center">
          <motion.div {...revealProps} className="mb-16 md:mb-24">
            <motion.h2 className="text-[10px] uppercase tracking-[0.5em] text-wedding-muted mb-16 font-medium">
              До свадьбы осталось
            </motion.h2>
            <Countdown targetDate={WEDDING_CONFIG.date.iso} />
          </motion.div>
        </div>
      </section>

      {/* 4. LOCATION SECTION */}
      <section id="location" className="section-wedding bg-wedding-ivory">
        <div className="container-wedding">
          <motion.div {...revealProps} className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-serif mb-6">Локация</h2>
          </motion.div>

          {/* Two-column Grid */}
          <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...revealProps} className="space-y-6">
              <p className="text-wedding-muted leading-relaxed text-base">
                Наша свадьба пройдёт в <br />
                <span className="text-wedding-graphite font-medium">{WEDDING_CONFIG.location.name}</span>
              </p>
              <p className="text-[11px] uppercase tracking-[0.3em] text-wedding-muted leading-relaxed">
                {WEDDING_CONFIG.location.address}, <br />
                {WEDDING_CONFIG.location.city}
              </p>

              <a
                href={WEDDING_CONFIG.location.twoGisUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-wedding-graphite text-white text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-black transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
              >
                Посмотреть в 2GIS
              </a>
            </motion.div>

            <motion.div {...revealProps} className="overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.06)]">
              <SafeImage
                src={WEDDING_CONFIG.images.banket}
                alt={WEDDING_CONFIG.location.name}
                className="w-full h-full object-cover rounded-[24px]"
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
            <motion.h2 {...revealProps} className="text-3xl md:text-5xl font-serif mb-6">Детали</motion.h2>
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
          <motion.h2 {...revealProps} className="text-3xl md:text-5xl font-serif mb-6">Дресс-код</motion.h2>

          <motion.p {...revealProps} className="max-w-prose-wedding text-wedding-muted leading-relaxed mb-20 text-sm md:text-base">
            {WEDDING_CONFIG.dressCode.description}
          </motion.p>

          {/* Colors */}
          <motion.div {...revealProps} className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-10 justify-items-center mb-20">
            {WEDDING_CONFIG.dressCode.colors.map((color) => (
              <div key={color.name} className="text-center space-y-4">
                <div 
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.10)]"
                  style={{
  backgroundColor: color.hex,
  backgroundImage: DRESS_TEXTURES[color.name] ? `url(${DRESS_TEXTURES[color.name]})` : undefined,
  backgroundSize: "cover",
  backgroundPosition: "center",
}}
                />
                <p className="text-[11px] uppercase tracking-[0.22em] text-wedding-muted font-medium">
                  {color.name}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Text */}
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

      {/* 7. CONTACTS / HOST */}
      <section id="contacts" className="section-wedding bg-wedding-secondary">
        <div className="container-wedding">
          <div className="max-w-[720px] mx-auto">
            <motion.div {...revealProps} className="card-premium text-center">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border border-white/40 shadow-[0_12px_35px_rgba(0,0,0,0.12)] mb-6">
                  <SafeImage
                    src={WEDDING_CONFIG.images.host}
                    alt="Ведущий"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <h3 className="text-3xl md:text-4xl font-serif mb-2 uppercase tracking-[0.15em]">
  {WEDDING_CONFIG.contacts.host.name}
</h3>
<p className="text-[11px] uppercase tracking-[0.25em] text-zinc-600 mb-8 font-medium">
  ведущий нашего вечера
</p>

                <p className="text-sm text-wedding-muted italic leading-relaxed max-w-md mx-auto mb-10">
                  Если готовите сюрприз или есть вопросы — напишите ведущему.
                </p>

                <div className="flex gap-4 justify-center">
                  <a
                    href={`tel:${WEDDING_CONFIG.contacts.host.phone.replace(/\s/g, '')}`}
                    className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/50 transition-all duration-300"
                    aria-label="Позвонить"
                  >
                    <Phone size={18} className="text-wedding-graphite" />
                  </a>
                  <a
                    href={WEDDING_CONFIG.contacts.host.vk}
                    target="_blank"
                    rel="noreferrer"
                    className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/50 transition-all duration-300"
                    aria-label="VK"
                  >
                    <MessageCircle size={18} className="text-wedding-graphite" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. RSVP SECTION */}
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
                  alt="Сергей и Дарья"
                  className="w-full h-full object-cover rounded-[12px]"
                  loading="lazy"
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
                    Будем ждать ответ до{' '}
                    <span className="text-wedding-graphite font-medium">{WEDDING_CONFIG.date.rsvpDeadline}</span>
                  </p>
                </div>
              </div>
              <RSVPForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="section-wedding bg-wedding-secondary">
        <div className="container-wedding text-center">
          <motion.h2 {...revealProps} className="text-xl md:text-3xl font-serif uppercase tracking-[0.6em] text-wedding-graphite">
            МЫ БУДЕМ СЧАСТЛИВЫ ВИДЕТЬ ВАС!
          </motion.h2>
          <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-wedding-muted">
            © 2026 Сергей и Дарья
          </p>
        </div>
      </footer>
    </div>
  );
}















