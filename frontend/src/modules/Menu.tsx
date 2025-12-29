import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import LanguageSwitcher from '@components/LanguageSwitcher/LanguageSwitcher';

export default function Menu() {
    const {t} = useTranslation();

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-indigo-600">MyApp</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600"
                            >
                                {t('menu.home')}
                            </Link>
                            <Link
                                to="/today"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300"
                            >
                                {t('menu.today')}
                            </Link>
                            <Link
                                to="/my"
                                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 hover:border-gray-300"
                            >
                                {t('menu.my')}
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            to="/login"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {t('menu.login')}
                        </Link>
                        <LanguageSwitcher/>
                    </div>
                </div>
            </div>

            {/* Мобильное меню */}
            <div className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                    <Link
                        to="/"
                        className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                    >
                        {t('menu.home')}
                    </Link>
                    <Link
                        to="/today"
                        className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    >
                        {t('menu.today')}
                    </Link>
                    <Link
                        to="/my"
                        className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    >
                        {t('menu.my')}
                    </Link>
                </div>
            </div>
        </nav>
    );
}