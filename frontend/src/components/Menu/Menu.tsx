import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useState, useRef, useEffect} from "react";

const Menu = () => {
    const {t} = useTranslation();
    const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Закрытие меню при клике вне его
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsCreateMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems = [
        {
            path: "/",
            label: t('menu.home'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
            )
        },
        {
            path: "/today",
            label: t('menu.today'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
            )
        },
        {
            path: "/my",
            label: t('menu.my'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
            )
        }
    ];

    const createSubmenuItems = [
        {
            path: "/card/create",
            label: t('menu.createCard'),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
            )
        },
        {
            path: "/collection/create",
            label: t('menu.createCollection'),
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
            )
        }
    ];

    const createIcon = (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 6v12m6-6H6"/>
            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2}/>
        </svg>
    );

    const chevronIcon = (
        <svg
            className={`w-4 h-4 transition-transform duration-200 ${isCreateMenuOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
    );

    return (
        <div className="flex items-center space-x-8">
            <div className="flex flex-col space-y-1">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/"}
                        className={(st) => {
                            return `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1 ${
                                st.isActive
                                    ? 'border-primary font-semibold'
                                    : 'hover:bg-gray-50'}`
                        }}
                    >
                        {item.icon}
                        <span className="text-2xl font-bold mt-1">{item.label}</span>
                    </NavLink>
                ))}

                {/* Выпадающее меню "Создать" */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsCreateMenuOpen(!isCreateMenuOpen)}
                        className="w-full rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-between space-x-1"
                    >
                        <div className="flex items-center space-x-1">
                            {createIcon}
                            <span className="text-2xl font-bold mt-1">{t('menu.create')}</span>
                        </div>
                        {chevronIcon}
                    </button>

                    {/* Выпадающий список */}
                    {isCreateMenuOpen && (
                        <div
                            className="absolute left-0 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                            {createSubmenuItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsCreateMenuOpen(false)}
                                    className={(st) => {
                                        return `px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                                            st.isActive
                                                ? 'bg-indigo-50 font-semibold'
                                                : 'hover:bg-gray-50'
                                        }`
                                    }}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                    {/* Галочка для активного пункта */}
                                    <NavLink to={item.path}>
                                        {({isActive}) => isActive && (
                                            <svg className="w-4 h-4 ml-auto" fill="currentColor"
                                                 viewBox="0 0 20 20">
                                                <path fillRule="evenodd"
                                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        )}
                                    </NavLink>
                                </NavLink>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;
