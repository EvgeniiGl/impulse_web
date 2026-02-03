import {useTranslation} from 'react-i18next';
import Menu from "@components/Menu/Menu.tsx";
import Profile from "@components/Profile/Profile.tsx";
import MenuMobail from "@components/Menu/MenuMobail.tsx";

export default function SideLeft() {
    const {t} = useTranslation();

    return (
        <nav className="bg-white border-r border-gray-100 h-full">
            <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between flex-col items-start h-full">
                    <div>
                        <div className="mb-12 mt-5 mx-4">
                            <h3 className="text-primary-color">{t('app_name')}</h3>
                        </div>
                        <Menu/>
                    </div>
                    <div className="flex items-center flex-col space-x-4 w-full mb-6">
                        <Profile/>
                    </div>
                </div>
            </div>
            <MenuMobail/>
        </nav>
    );
}