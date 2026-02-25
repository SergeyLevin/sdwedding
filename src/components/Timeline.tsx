import React from 'react';
import { motion } from 'motion/react';
import { WEDDING_CONFIG } from '../config/wedding';

export const Timeline: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-16">
      {WEDDING_CONFIG.program.map((item, index) => (
        <motion.div
          key={item.time}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-start gap-8 md:gap-16"
        >
          <div className="w-16 text-right pt-1">
            <span className="text-xl font-serif text-wedding-graphite">{item.time}</span>
          </div>
          
          <div className="relative flex flex-col items-center pt-3">
            <div className="w-1.5 h-1.5 rounded-full bg-wedding-champagne shadow-[0_0_8px_rgba(200,169,106,0.4)]" />
            {index !== WEDDING_CONFIG.program.length - 1 && (
              <div className="w-px h-28 bg-wedding-divider absolute top-3" />
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-serif mb-3 text-wedding-graphite">{item.title}</h3>
            <p className="text-sm text-wedding-muted leading-relaxed font-light">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
