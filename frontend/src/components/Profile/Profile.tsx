import React from 'react';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@store/store.ts";
import {useAuth} from "@hooks/useAuth.ts";

const Profile = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const {user, isAuthenticated, loading, error} = useAuth();
    // Определяем что показывать: имя или email
    const displayName = user?.name || user?.email;

    // Получаем первую букву для аватара
    const getInitial = () => {
        if (user?.name) {
            return user.name.charAt(0).toUpperCase();
        }
        if (user?.email) {
            return user.email.charAt(0).toUpperCase();
        }
        return 'U';
    };

    // Если пользователь не авторизован - показываем только кнопку
    if (!isAuthenticated) {
        return (
            <Link
                to="/login"
                className={`text-primary-color inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-white] border-2 border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--text-primary)] shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5`}
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                </svg>
                {t('menu.login')}
            </Link>
        );
    }

    // Если пользователь авторизован - показываем аватар и имя
    return (
        <div className="flex items-center gap-3">
            {/* Круглый аватар */}
            <div
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--text-primary)] shadow-md flex-shrink-0">
                {user?.avatar ? (
                    <img
                        src={user.avatar}
                        alt={displayName}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div
                        className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                        <span>{getInitial()}</span>
                    </div>
                )}
            </div>

            {/* Имя или Email */}
            <div className="hidden sm:flex flex-col">
                <span className="text-sm font-medium text-gray-800 truncate max-w-[150px]">
                    {displayName}
                </span>
            </div>
        </div>
    );
};

export default Profile;
