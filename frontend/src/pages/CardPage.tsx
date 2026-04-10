// CardPage.tsx
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import Header from "@modules/Header.tsx";
import Footer from "@modules/Footer.tsx";
import Main from "@modules/Main.tsx";
import {fetchCard, resetCurrentCard} from '@store/card/cardSlice.ts';
import {LiaSignatureSolid} from "react-icons/lia";
import {CardState, RootState, useAppDispatch, useAppSelector} from "@store/store.ts";
import {RiEdit2Line} from "react-icons/ri";
import {DEFAULT_TEXT_COLOR} from "@/constants/colors";
import css from './CardPage.module.css'

export default function CardPage() {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {currentCard, isLoading, error}: CardState = useAppSelector((state: RootState) => state.card);

    const authUser = useAppSelector((state: RootState) => state.auth.user);
    const isOwner = !!(currentCard && authUser && currentCard.creator?.id === authUser.id);

    useEffect(() => {
        if (!id) {
            navigate('/404');
            return;
        }
        dispatch(fetchCard(id));
        return () => {
            dispatch(resetCurrentCard());
        };
    }, [id, dispatch, navigate]);

    const handleEditClick = () => {
        if (id) {
            navigate(`/card/${id}/edit`);
        }
    };

    if (isLoading) {
        return (
            <>
                <Header/>
                <Main>
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"/>
                            <h2 className="mt-4 text-xl font-medium text-gray-700">{t('common.loading')}</h2>
                        </div>
                    </div>
                </Main>
                <Footer/>
            </>
        );
    }

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
                            <h3 className="mt-4 text-lg font-medium text-gray-900">{t('common.error')}</h3>
                            <p className="mt-2 text-gray-500">
                                {error ? error : t('common.notFound')}
                            </p>
                            <div className="mt-6">
                                <button onClick={() => navigate(-1)}
                                        className="text-indigo-600 hover:text-indigo-900 font-medium">
                                    {t('common.back')}
                                </button>
                            </div>
                        </div>
                    </div>
                </Main>
                <Footer/>
            </>
        );
    }

    const titleColor = (currentCard as any).title_color || DEFAULT_TEXT_COLOR;

    return (
        <>
            <Header/>
            <Main>
                <div className="flex h-screen">
                    {/* Image panel */}
                    <div style={{display: 'flex', flexDirection: 'column', height: '100vh', maxWidth: '50%'}}>
                        <div style={{flex: 1, minHeight: 0}}>
                            <div style={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minWidth: '500px',
                                padding: '30px',
                            }}>
                                <div style={{
                                    aspectRatio: '9/16',
                                    height: '100%',
                                    position: 'relative',
                                    maxHeight: '900px'
                                }}>
                                    {currentCard.url ? (
                                        <img
                                            src={currentCard.url}
                                            alt={currentCard.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: 'var(--radius-xl)',
                                                border: '1px solid var(--color-gray-400)',
                                            }}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <svg className="w-16 h-16 text-gray-400" fill="none"
                                                 stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                            </svg>
                                        </div>
                                    )}
                                    {currentCard.show_title_on_image && (
                                        <div
                                            className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
                                            <div className="text-center">
                                                <h3
                                                    className="font-['Pacifico'] text-3xl md:text-4xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] mb-3"
                                                    style={{color: titleColor}}
                                                >
                                                    {currentCard.title}
                                                </h3>
                                                <div
                                                    className="w-16 h-0.5 mx-auto"
                                                    style={{
                                                        background: `linear-gradient(to right, transparent, ${titleColor}, transparent)`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info panel */}
                    <div className={`p-8 overflow-y-auto ${css.info_panel}`}>
                        <div>
                            {/* Заголовок */}
                            <div className="flex items-start gap-2">
                                <h3 className="text-2xl font-bold text-gray-900">{currentCard.title}</h3>
                            </div>

                            {/* Статус отображения названия */}
                            {/*<div className="mt-5 flex items-center gap-3">*/}
                            {/*    <div className="flex items-center gap-3">*/}
                            {/*        <div*/}
                            {/*            className={`w-10 h-6 rounded-full ${showTitle ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`}*/}
                            {/*        >*/}
                            {/*            <div*/}
                            {/*                className={`w-5 h-5 bg-white rounded-full shadow transform translate-y-0.5 transition-transform ${showTitle ? 'translate-x-4' : 'translate-x-1'}`}*/}
                            {/*            />*/}
                            {/*        </div>*/}
                            {/*        <span className="text-sm font-medium text-gray-700">*/}
                            {/*        {t('cards.showTitleOnImage')}*/}
                            {/*    </span>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {/* Description section */}
                            <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center">
                                        <LiaSignatureSolid className="w-4 h-4 text-gray-500 mr-2"/>
                                        <h3 className="font-medium text-gray-900">{t('cards.descriptionLabel')}</h3>
                                    </div>
                                </div>

                                {currentCard.description ? (
                                    <p className="text-gray-700 whitespace-pre-wrap">
                                        {currentCard.description}
                                    </p>
                                ) : (
                                    <p className="text-gray-400 italic">
                                        {t('cards.noDescription')}
                                    </p>
                                )}
                            </div>

                            {/* Creator info */}
                            {currentCard.creator && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h4 className="text-sm font-medium text-gray-500 mb-3">
                                        {t('cards.createdBy')}
                                    </h4>
                                    <div className="flex items-center gap-3">
                                        {/* Аватар */}
                                        <div
                                            className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium shrink-0">
                                        <span>
                                            {currentCard.creator.name?.charAt(0).toUpperCase() || '?'}
                                        </span>
                                        </div>
                                        {/* Имя и email */}
                                        <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-medium text-gray-900 truncate">
                                            {currentCard.creator.name}
                                        </span>
                                            <span className="text-xs text-gray-500 truncate">
                                            {currentCard.creator.email}
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {isOwner && (
                            <div>
                                <button
                                    onClick={handleEditClick}
                                    className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-dark)] transition font-medium shadow-lg hover:shadow-xl"
                                >
                                    <RiEdit2Line size={20}/>
                                    {t('common.edit')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </Main>
            <Footer/>
        </>
    );
}