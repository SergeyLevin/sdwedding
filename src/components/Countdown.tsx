import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface CountdownProps {
  targetDate: string;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { label: 'дней', value: timeLeft.days },
    { label: 'часов', value: timeLeft.hours },
    { label: 'минут', value: timeLeft.minutes },
    { label: 'секунд', value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 md:gap-16 flex-wrap">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center min-w-[70px]"
        >
          <div className="text-4xl md:text-7xl font-serif mb-2 tabular-nums text-wedding-graphite font-light">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-wedding-muted font-medium font-sans">
            {item.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};



