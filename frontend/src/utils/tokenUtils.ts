// src/utils/tokenUtils.ts
export interface DecodedToken {
    id: string;
    name: string;
    email: string;
    iat: number;
    exp: number;

    [key: string]: any;
}

export const decodeToken = (token: string): DecodedToken | null => {
    try {
        const parts = token.split('.');

        if (parts.length !== 3) {
            console.error('Неверный формат токена');
            return null;
        }

        // Декодируем payload (вторая часть)
        const payload = parts[1];
        const decoded = JSON.parse(atob(payload));

        return decoded;
    } catch (error) {
        console.error('Ошибка при декодировании токена:', error);
        return null;
    }
};

export const isTokenExpired = (token: string): boolean => {
    const decoded = decodeToken(token);

    if (!decoded || !decoded.exp) {
        return true;
    }

    // exp в секундах, Date.now() в миллисекундах
    return decoded.exp * 1000 < Date.now();
};
