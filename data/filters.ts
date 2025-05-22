// /data/filters.ts

export const mockFilters = [
  {
    id: 'category',
    label: {
      ru: 'Категория',
      uz: 'Kategoriya'
    },
    options: [
      { value: 'linen', label: { ru: 'Лён', uz: "Zig'ir" }, count: 8 },
      { value: 'cotton', label: { ru: 'Хлопок', uz: 'Paxta' }, count: 12 }
    ]
  },
  {
    id: 'width',
    label: {
      ru: 'Ширина',
      uz: 'Kenglik'
    },
    options: [
      { value: '150', label: { ru: '150 см', uz: '150 sm' }, count: 14 },
      { value: '180', label: { ru: '180 см', uz: '180 sm' }, count: 6 }
    ]
  },
  {
    id: 'density',
    label: {
      ru: 'Плотность',
      uz: 'Zichlik'
    },
    options: [
      { value: '120', label: { ru: '120 г/м²', uz: '120 g/m²' }, count: 10 },
      { value: '200', label: { ru: '200 г/м²', uz: '200 g/m²' }, count: 5 }
    ]
  },
  {
    id: 'dyeing',
    label: {
      ru: 'Вид крашения',
      uz: 'Boʻyoqlash turi'
    },
    options: [
      { value: 'dyed', label: { ru: 'Окрашенная', uz: 'Boʻyalgan' }, count: 7 },
      { value: 'raw', label: { ru: 'Сырая', uz: 'Xom' }, count: 9 }
    ]
  },
  {
    id: 'composition',
    label: {
      ru: 'Состав',
      uz: 'Tarkibi'
    },
    options: [
      { value: 'cotton_100', label: { ru: '100% хлопок', uz: '100% paxta' }, count: 12 },
      { value: 'cotton_linen', label: { ru: '50% лён, 50% хлопок', uz: "50% zig'ir, 50% paxta" }, count: 6 }
    ]
  }
];
