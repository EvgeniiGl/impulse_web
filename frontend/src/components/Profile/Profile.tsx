import {useState, useRef, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@store/store.ts";
import {useAuth} from "@hooks/useAuth.ts";
import {logoutUser} from "@store/slices/authSlice";

const Profile = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const {user, isAuthenticated} = useAuth();

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

    // Закрытие dropdown при клике вне его
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    // Обработчик выхода
    const handleLogout = async () => {
        try {
            await dispatch(logoutUser());
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            setIsDropdownOpen(false);
            navigate('/');
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    // Если пользователь не авторизован - показываем только кнопку
    if (!isAuthenticated) {
        return (
            <Link
                to="/login"
                className="text-primary-color inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-white border-2 border-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--text-primary)] shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
            >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                </svg>
                <span className="mt-1">{t('menu.login')}</span>
            </Link>
        );
    }

    // Если пользователь авторизован - показываем аватар и имя
    return (
        <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="relative flex items-center gap-3" ref={dropdownRef}>
            {/* Круглый аватар с кликабельностью */}
            <div
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-[var(--text-primary)] shadow-md flex-shrink-0 cursor-pointer hover:border-[var(--text-primary)] hover:shadow-lg transition-all duration-200"
            >
                {/*{user?.avatar ? (*/}
                {/*    <img*/}
                {/*        src={user.avatar}*/}
                {/*        alt={displayName}*/}
                {/*        className="w-full h-full object-cover"*/}
                {/*    />*/}
                {/*) : (*/}
                <div
                    className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold hover:from-indigo-500 hover:to-purple-600 transition-all duration-200">
                    <span>{getInitial()}</span>
                </div>
                {/*)}*/}
            </div>
            {/* Имя или Email */}
            <div className="hidden sm:flex flex-col cursor-pointer">
                <span className="text-sm font-medium text-gray-800 truncate max-w-[150px]">
                    {displayName}
                </span>
            </div>

            {/* Dropdown меню */}
            {isDropdownOpen && (
                <div
                    className="absolute bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-fadeIn">
                    {/* Информация о пользователе */}
                    <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {user?.name || ''}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                            {user?.email}
                        </p>
                    </div>

                    {/* Кнопка выхода */}
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 flex items-center"
                    >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        {t('menu.logout') || 'Выход'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;
