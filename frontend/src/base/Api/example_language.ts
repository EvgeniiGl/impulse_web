import i18n from "i18next";

await fetch('/api/user', {
    headers: {
        // 'Authorization': getAccessToken(),
        'Accept-Language': i18n.language, // берем текущий язык
    }
});