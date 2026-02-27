/**
 * Wedding Configuration
 * All wedding details are centralized here for easy modification.
 */

export const WEDDING_CONFIG = {
  couple: {
    groom: "Сергей",
    bride: "Дарья",
    names: "Сергей и Дарья",
  },
  date: {
    iso: "2026-08-08T16:00:00", // ISO format for countdown
    display: "08 августа 2026",
    time: "16:00",
    rsvpDeadline: "01.06.2026",
  },
  location: {
    name: "Банкетный зал «Грильяж»",
    city: "Магнитогорск",
    address: "пр-т Карла Маркса, 143/1, 1 этаж",
    fullAddress: "пр-т Карла Маркса, 143/1, 1 этаж, Магнитогорск",
    twoGisUrl: "https://2gis.ru/magnitogorsk/firm/3659702978382850",
  },
  program: [
    {
      time: "15:30",
      title: "Сбор гостей",
      description: "Просим взять с собой хорошее настроение и улыбки",
    },
    {
      time: "16:00",
      title: "Начало банкета",
      description: "Время вкусной еды, танцев и развлечений",
    },
    {
      time: "23:00",
      title: "Торжественное завершение вечера",
      description: "Благодарим, что разделили этот день с нами",
    },
  ],
  dressCode: {
    title: "Дресс-код",
    description:
      "Будем рады, если вы поддержите цветовую гамму нашего вечера. Материал и фасон могут быть любыми - выбирайте то, в чём вам комфортно.",
    colors: [
      { name: "Бежевый", hex: "#D8CFC6" },
      { name: "Золотистый", hex: "#C6A77A" },
      { name: "Розовый", hex: "#E8C6CF" },
      { name: "Коричневый", hex: "#5A4338" },
    ],
    menDescription:
      "светлый верх, тёмный низ. Если есть костюм - отлично, если нет - подойдёт рубашка или водолазка и тёмные брюки. Желательно чёрный, тёмно-синий и коричневый цвета.",
  },
  contacts: {
    host: {
      name: "Артур",
      phone: "+7 987 059-00-08",
      vk: "https://vk.com/artur080490",
    },
  },
  images: {
    hero: `${import.meta.env.BASE_URL}images/herosd.webp`,
    banket: `${import.meta.env.BASE_URL}images/banket.webp`,
    host: `${import.meta.env.BASE_URL}images/artur.webp`,
    rsvp: `${import.meta.env.BASE_URL}images/para.webp`,
  },
};

