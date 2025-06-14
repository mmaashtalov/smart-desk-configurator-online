/* Материал столешницы */
export const TOP_MATERIALS = [
  { id: "chipboard",   name: "ЛДСП",            addPrice: 0   },
  { id: "plywood",     name: "Фанера",          addPrice: 2500 },
  { id: "plywood_oak", name: "Фанера + Шпон",   addPrice: 4500 },
] as const

/* Подстолье */
export const FRAMES = [
  { id: "lift", name: "Подъёмное",      addPrice: 12000 },
  { id: "static_p", name: "П-образное", addPrice:   0   },
  { id: "static_o", name: "O-образное", addPrice: 1500 },
] as const

/* Тумбы */
export const PEDESTALS = [
  { id: "none",     name: "Без тумбы",                          addPrice: 0 },
  { id: "suspend",  name: "Подвесная, 2 ящика",                addPrice: 6600 },
  { id: "mobile",   name: "Подкатная, 3 ящика",                addPrice: 7900 },
] as const

/* Доп-опции (чекбоксы) */
export const ADDONS = [
  { id: "power",   name: "2 х 220 В + 2 USB",          price: 2900 },
  { id: "tray",    name: "Полка под провода",          price: 1200 },
  { id: "cpu",     name: "Подвес под ПК",              price: 2100 },
  { id: "voice",   name: "Голосовое управление",       price: 3400 },
  { id: "bag",     name: "Держатель для портфеля",     price: 900  },
  { id: "screen",  name: "Звукоизоляционный экран",    price: 4700 },
] as const 