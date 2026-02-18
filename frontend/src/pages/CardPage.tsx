// CardPage.tsx
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import Header from "@modules/Header.tsx";
import Footer from "@modules/Footer.tsx";
import Main from "@modules/Main.tsx";
import {fetchCard, resetCurrentCard} from '@store/card/cardSlice.ts';
import {LiaSignatureSolid} from "react-icons/lia";
import {CardState} from "@store/store.ts";

export default function CardPage() {
    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {currentCard, isLoading, error}: CardState = useSelector((state: any) => state.card);

    // Handle missing ID
    useEffect(() => {
        if (!id) {
            navigate('/404');
            return;
        }

        dispatch(fetchCard(id));

        // Cleanup on unmount
        return () => {
            dispatch(resetCurrentCard());
        };
    }, [id, dispatch, navigate]);

    // Show loading state
    if (isLoading) {
        return (
            <>
                <Header/>
                <Main>
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                            <h2 className="mt-4 text-xl font-medium text-gray-700">{t('card.loading')}</h2>
                        </div>
                    </div>
                </Main>
                <Footer/>
            </>
        );
    }

    // Show error state
    if (error || !currentCard) {
        return (
            <>
                <Header/>
                <Main>
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">{t('card.error.title')}</h3>
                            <p className="mt-2 text-gray-500">
                                {error ? error : t('card.error.notFound')}
                            </p>
                            <div className="mt-6">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="text-indigo-600 hover:text-indigo-900 font-medium"
                                >
                                    {t('card.error.back')}
                                </button>
                            </div>
                        </div>
                    </div>
                </Main>
                <Footer/>
            </>
        );
    }

    return (
        <>
            <Header/>
            <Main>
                <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        {t('card.title')}
                    </h1>

                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {/* Card Image Container */}
                        <div className="relative w-full bg-gray-200 overflow-hidden" style={{aspectRatio: '9/16'}}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                {currentCard.url ? (
                                    <img
                                        src={currentCard.url}
                                        alt={currentCard.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div
                                        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                )}

                                {/* Title overlay */}
                                {currentCard.show_title_on_image && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
                                        <div className="text-center">
                                            <h3 className="font-['Pacifico'] text-white text-3xl md:text-4xl
                                                drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]
                                                mb-3">
                                                {currentCard.title}
                                            </h3>
                                            <div
                                                className="w-16 h-0.5 mx-auto bg-gradient-to-r from-transparent via-white to-transparent"/>
                                        </div>
                                    </div>
                                )}

                                {/* Access type badge */}
                                <div className="absolute bottom-3 left-3 z-20">
                                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full shadow-lg ${
                                        currentCard.access_type === 'private'
                                            ? 'bg-white text-gray-900 border border-gray-300'
                                            : 'bg-indigo-600 text-white'
                                    }`}>
                                        {currentCard.access_type === 'public'
                                            ? t('card.access.public')
                                            : currentCard.access_type === 'shared'
                                                ? t('card.access.shared')
                                                : t('card.access.private')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Card Details */}
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <h2 className="text-2xl font-bold text-gray-900">{currentCard.title}</h2>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                    ${currentCard.is_active
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'}">
                                    {currentCard.is_active ? t('card.status.active') : t('card.status.inactive')}
                                </span>
                            </div>

                            {currentCard.description && (
                                <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <div className="flex items-center mb-2">
                                        <LiaSignatureSolid className="w-4 h-4 text-gray-500 mr-2"/>
                                        <h3 className="font-medium text-gray-900">{t('card.description')}</h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">{currentCard.description}</p>
                                </div>
                            )}

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">{t('card.created')}</h3>
                                    <p className="mt-1 text-gray-900">
                                        {new Date(currentCard.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">{t('card.lastUpdated')}</h3>
                                    <p className="mt-1 text-gray-900">
                                        {new Date(currentCard.updated_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end space-x-4">
                                <button
                                    onClick={() => navigate('/')}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    {t('card.backToHome')}
                                </button>
                                <button
                                    onClick={() => window.print()}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    {t('card.print')}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Additional info section */}
                    <div className="mt-12 bg-indigo-50 rounded-xl p-6">
                        <h3 className="text-lg font-medium text-indigo-900 mb-3">{t('card.info.title')}</h3>
                        <p className="text-indigo-700">
                            {/*{t('card.info.description', {*/}
                            {/*    fileName: currentCard.original_name || currentCard.file_name,*/}
                            {/*    path: currentCard.object_path*/}
                            {/*})}*/}
                        </p>
                    </div>
                </div>
            </Main>
            <Footer/>
        </>
    );
}