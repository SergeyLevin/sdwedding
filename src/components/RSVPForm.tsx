import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    presence: '',
    firstName: '',
    lastName: '',
    isMultiple: false,
    multipleNames: '',
    drinks: [] as string[],
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const drinkOptions = [
    'Вино красное',
    'Вино белое',
    'Виски',
    'Коньяк',
    'Водка',
    'Что-нибудь безалкогольное',
  ];

  const handleDrinkChange = (drink: string) => {
    setFormData((prev) => ({
      ...prev,
      drinks: prev.drinks.includes(drink) ? prev.drinks.filter((d) => d !== drink) : [...prev.drinks, drink],
    }));
  };

  const resetForm = () => {
    setFormData({
      presence: '',
      firstName: '',
      lastName: '',
      isMultiple: false,
      multipleNames: '',
      drinks: [],
      honeypot: '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-bot (honeypot): если поле заполнено — "тихо" завершаем успехом
    if (formData.honeypot.trim()) {
      setStatus('success');
      resetForm();
      return;
    }

    // Validation
    if (!formData.presence) {
      setErrorMessage('Пожалуйста, выберите вариант присутствия');
      return;
    }

    const attending = formData.presence.includes('Я приду') ? 'yes' : 'no';

    // Если человек приходит — имя/фамилия обязательны (или список гостей)
    if (attending === 'yes') {
      if (!formData.isMultiple && (!formData.firstName.trim() || !formData.lastName.trim())) {
        setErrorMessage('Пожалуйста, введите Имя и Фамилию');
        return;
      }
      if (formData.isMultiple && !formData.multipleNames.trim()) {
        setErrorMessage('Пожалуйста, введите имена гостей');
        return;
      }
    } else {
      // Если не приходит — всё равно желательно имя, но не заставляем
      // (оставим мягко: если одиночный режим и пусто — ок)
    }

    setStatus('submitting');
    setErrorMessage('');

    const endpoint = import.meta.env.VITE_RSVP_ENDPOINT as string | undefined;

    if (!endpoint) {
      setStatus('error');
      setErrorMessage('Endpoint RSVP не настроен. Проверьте переменные окружения (VITE_RSVP_ENDPOINT).');
      return;
    }

    // Map drinks to 0/1 for the spreadsheet
    const drinksMap = {
      wine_red: formData.drinks.includes('Вино красное') ? 1 : 0,
      wine_white: formData.drinks.includes('Вино белое') ? 1 : 0,
      whiskey: formData.drinks.includes('Виски') ? 1 : 0,
      cognac: formData.drinks.includes('Коньяк') ? 1 : 0,
      vodka: formData.drinks.includes('Водка') ? 1 : 0,
      soft: formData.drinks.includes('Что-нибудь безалкогольное') ? 1 : 0,
    };

    const guestsList = formData.isMultiple
      ? formData.multipleNames
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean)
          .join('\n')
      : '';

    const guestsTotal = formData.isMultiple ? (guestsList ? guestsList.split('\n').length : 2) : 1;

    const payload = {
      submittedAt: new Date().toISOString(),
      attending, // "yes" | "no"
      isMultiple: Boolean(formData.isMultiple), // true/false
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      guestsTotal,
      guestsList,
      drinks: drinksMap,
      comment: '',
      source: 'website',
      userAgent: navigator.userAgent,
    };

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      // ВАЖНО: no-cors => ответ "opaque", читать нельзя. Если fetch не кинул ошибку — считаем успехом.
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      setStatus('success');
      resetForm();
    } catch (err: any) {
      setStatus('error');
      if (err?.name === 'AbortError') {
        setErrorMessage('Превышено время ожидания. Пожалуйста, попробуйте ещё раз.');
      } else {
        setErrorMessage('Ошибка при отправке. Пожалуйста, попробуйте позже.');
      }
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
        <h3 className="text-2xl font-serif mb-4">Спасибо!</h3>
        <p className="text-wedding-muted">Ваш ответ успешно отправлен. Мы будем рады видеть вас!</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 text-[10px] uppercase tracking-widest underline underline-offset-8 decoration-wedding-champagne/40"
        >
          Отправить еще раз
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Question 1: Presence */}
      <div className="space-y-4">
        <label className="text-[10px] uppercase tracking-[0.2em] text-wedding-muted block">
          Сможете ли вы присутствовать на торжестве?
        </label>
        <div className="space-y-3">
          {['Я приду / Мы придем', 'Прийти не получится'].map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="presence"
                value={option}
                checked={formData.presence === option}
                onChange={(e) => setFormData({ ...formData, presence: e.target.value })}
                className="w-4 h-4 border border-wedding-divider rounded-full checked:bg-wedding-champagne appearance-none cursor-pointer transition-all"
              />
              <span className="text-sm group-hover:text-wedding-muted transition-colors">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Question 2: Names */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-[10px] uppercase tracking-[0.2em] text-wedding-muted">
            Введите Имя и Фамилию
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isMultiple}
              onChange={(e) => setFormData({ ...formData, isMultiple: e.target.checked })}
              className="checkbox-custom"
            />
            <span className="text-[10px] uppercase tracking-widest text-wedding-muted">Нас несколько</span>
          </label>
        </div>

        <AnimatePresence mode="wait">
          {formData.isMultiple ? (
            <motion.textarea
              key="multiple"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              placeholder="Введите имена (каждое с новой строки)"
              className="input-field min-h-[120px] resize-none"
              value={formData.multipleNames}
              onChange={(e) => setFormData({ ...formData, multipleNames: e.target.value })}
            />
          ) : (
            <motion.div
              key="single"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                type="text"
                placeholder="Имя"
                className="input-field"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Фамилия"
                className="input-field"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Question 3: Drinks */}
      <div className="space-y-4">
        <label className="text-[10px] uppercase tracking-[0.2em] text-wedding-muted block">
          Предпочтения по напиткам
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {drinkOptions.map((drink) => (
            <label key={drink} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.drinks.includes(drink)}
                onChange={() => handleDrinkChange(drink)}
                className="checkbox-custom"
              />
              <span className="text-sm group-hover:text-wedding-muted transition-colors">{drink}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="honeypot"
        className="hidden"
        value={formData.honeypot}
        onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        tabIndex={-1}
        autoComplete="off"
      />

      {errorMessage && <p className="text-red-500 text-[10px] uppercase tracking-widest">{errorMessage}</p>}

      <button type="submit" disabled={status === 'submitting'} className="btn-outline w-full disabled:opacity-50">
        {status === 'submitting' ? 'ОТПРАВКА...' : 'ОТПРАВИТЬ'}
      </button>
    </form>
  );
};
