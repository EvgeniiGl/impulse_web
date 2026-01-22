import {useTranslation} from 'react-i18next';
import Header from "@modules/Header.tsx";
import Footer from "@modules/Footer.tsx";
import Main from "@modules/Main.tsx";
import Menu from "@modules/Menu.tsx";

export default function HomePage() {
    const {t} = useTranslation();

    return (
        <>
            <Header/>

            <Main>
                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                                {t('home.welcome')}
                            </h1>
                            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                                {t('home.description')}
                            </p>

                            <div className="mt-10 flex justify-center space-x-4">
                                <a
                                    href="#"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    {t('home.getStarted')}
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
                                >
                                    {t('home.learnMore')}
                                </a>
                            </div>
                        </div>

                        <div className="mt-20">
                            <h2 className="text-3xl font-bold text-gray-900 text-center">
                                {t('home.features')}
                            </h2>
                            <div className="mt-10 flex flex-wrap gap-10">
                                <div
                                    className="bg-white overflow-hidden shadow rounded-lg flex-1 min-w-[280px] sm:min-w-0 sm:basis-[calc(50%-1.25rem)] lg:basis-[calc(33.333%-1.67rem)]">
                                    <div className="p-5">
                                        <div className="text-lg font-medium text-gray-900">
                                            {t('home.feature1.title')}
                                        </div>
                                        <div className="mt-2 text-sm text-gray-500">
                                            {t('home.feature1.description')}
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="bg-white overflow-hidden shadow rounded-lg flex-1 min-w-[280px] sm:min-w-0 sm:basis-[calc(50%-1.25rem)] lg:basis-[calc(33.333%-1.67rem)]">
                                    <div className="p-5">
                                        <div className="text-lg font-medium text-gray-900">
                                            {t('home.feature1.title')}
                                        </div>
                                        <div className="mt-2 text-sm text-gray-500">
                                            {t('home.feature1.description')}
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="bg-white overflow-hidden shadow rounded-lg flex-1 min-w-[280px] sm:min-w-0 sm:basis-[calc(50%-1.25rem)] lg:basis-[calc(33.333%-1.67rem)]">
                                    <div className="p-5">
                                        <div className="text-lg font-medium text-gray-900">
                                            {t('home.feature2.title')}
                                        </div>
                                        <div className="mt-2 text-sm text-gray-500">
                                            {t('home.feature2.description')}
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="bg-white overflow-hidden shadow rounded-lg flex-1 min-w-[280px] sm:min-w-0 sm:basis-[calc(50%-1.25rem)] lg:basis-[calc(33.333%-1.67rem)]">
                                    <div className="p-5">
                                        <div className="text-lg font-medium text-gray-900">
                                            {t('home.feature3.title')}
                                        </div>
                                        <div className="mt-2 text-sm text-gray-500">
                                            {t('home.feature3.description')}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </Main>
            <Footer/>
        </>
    );
}