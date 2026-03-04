import {NavLink, useMatch} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useState, useRef, useEffect} from "react";
import {HomeIcon} from "@ui/icons/HomeIcon.tsx";
import {CalendarIcon} from "@ui/icons/CalendarIcon.tsx";
import {UserIcon} from "@ui/icons/UserIcon.tsx";
import {DocumentIcon} from "@ui/icons/DocumentIcon.tsx";
import {CollectionIcon} from "@ui/icons/CollectionIcon.tsx";
import {ChevronIcon} from "@ui/icons/ChevronIcon.tsx";
import {PlusIcon} from "@ui/icons/PlusIcon.tsx";
import css from './Menu.module.css'

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

    const isCreateActive = useMatch("/card/create") ||
        useMatch("/collection/create");

    const menuItems = [
        {
            path: "/",
            label: t('menu.home'),
            icon: <HomeIcon/>
        },
        {
            path: "/today",
            label: t('menu.today'),
            icon: <CalendarIcon/>
        },
        {
            path: "/my",
            label: t('menu.my'),
            icon: <UserIcon/>
        }
    ];

    const createSubmenuItems = [
        {
            path: "/card/create",
            label: t('menu.createCard'),
            icon: <DocumentIcon/>
        },
        {
            path: "/collection/create",
            label: t('menu.createCollection'),
            icon: <CollectionIcon/>
        }
    ];

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
                        className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-between space-x-1 ${
                            isCreateActive
                                ? 'border-primary font-semibold'
                                : `hover:bg-gray-50 border-0 ${css.btn_create}`
                        }`}
                    >
                        <div className="flex items-center space-x-1">
                            <PlusIcon/>
                            <span className="text-2xl font-bold mt-1">{t('menu.create')}</span>
                        </div>
                        <ChevronIcon isOpen={isCreateMenuOpen}/>
                    </button>
                    {/* Выпадающий список */}
                    {isCreateMenuOpen && (
                        <div
                            className="absolute left-0 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            {createSubmenuItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsCreateMenuOpen(false)}
                                    className={(st) => {
                                        return `px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center space-x-2  rounded-lg ${
                                            st.isActive
                                                ? 'border-primary bg-indigo-50 font-semibold'
                                                : 'hover:bg-gray-50'
                                        }`
                                    }}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
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