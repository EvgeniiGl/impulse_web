// Палитра цветов для текста на карточках
export const TEXT_COLORS = [
    '#FFFFFF', // Белый
    '#000000', // Чёрный
    '#FF6B6B', // Красный
    '#4ECDC4', // Бирюзовый
    '#FFE66D', // Жёлтый
    '#95E1D3', // Мятный
    '#F38181', // Коралловый
    '#AA96DA', // Лавандовый
    '#FCBAD3', // Розовый
    '#A8D8EA', // Голубой
    '#FF9F43', // Оранжевый
    '#26DE81', // Зелёный
] as const;

export type TextColor = typeof TEXT_COLORS[number];

export const DEFAULT_TEXT_COLOR = '#FFFFFF';