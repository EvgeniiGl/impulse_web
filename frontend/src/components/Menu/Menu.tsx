import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Menu = () => {
    const {t} = useTranslation();

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
        },
        {
            path: "/create",
            label: t('menu.create'),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 6v12m6-6H6"/>
                    <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2}/>
                </svg>
            )
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
                                    : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'}`
                        }}
                    >
                        {item.icon}
                        <span className="text-2xl font-bold mt-1">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Menu;
