import {useTranslation} from "react-i18next";
import css from './LanguageSwitcher.module.css';

const languages = [
    {code: "en", label: "English"},
    {code: "ru", label: "Русский"},
];

export default function LanguageSwitcher() {
    const {i18n} = useTranslation();

    const changeLanguage = async (lang: string) => {
        await i18n.changeLanguage(lang);
    };

    return (
        <div className="flex justify-end w-full">
            <div
                className="inline-flex items-center gap-0.5 p-0.5 bg-white border border-gray-300 rounded absolute m-1 z-[1]">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`${css.languageButton} ${
                            i18n.language === lang.code ? css.active : ""
                        }`}
                    >
                        {lang.code.toUpperCase()}
                    </button>
                ))}
            </div>
        </div>
    );
}