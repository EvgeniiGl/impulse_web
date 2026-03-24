// CardPage.tsx
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Header from "@modules/Header.tsx";
import Footer from "@modules/Footer.tsx";
import Main from "@modules/Main.tsx";
import {fetchCard, resetCurrentCard, updateCard} from '@store/card/cardSlice.ts';
import {LiaSignatureSolid} from "react-icons/lia";
import {CardState, useAppDispatch, useAppSelector} from "@store/store.ts";
import {MdOutlineSchedule} from "react-icons/md";
import {IoCloseCircleOutline, IoTrashOutline} from "react-icons/io5";
import {ScheduleForm} from "@components/Notifications/ScheduleForm.tsx";

export default function CardPage() {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {currentCard, isLoading, isUpdating, error}: CardState = useAppSelector((state: any) => state.card);

    const authUser = useAppSelector((state: any) => state.auth.user);
    const isOwner = !!(currentCard && authUser && currentCard.creator_id === authUser.id);

    const [showTitle, setShowTitle] = useState(false);

    // Sync local state when card loads
    useEffect(() => {
        if (currentCard) {
            setShowTitle(currentCard.show_title_on_image);
        }
    }, [currentCard?.id]);

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

    const handleShowTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!currentCard || !id) return;
        const newValue = e.target.checked;
        setShowTitle(newValue);
        dispatch(updateCard({id, data: {show_title_on_image: newValue}}));
    };

    if (isLoading) {
        return (
            <>
                <Header/>
                <Main>
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div
                                className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"/>
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
                            <h3 className="mt-4 text-lg font-medium text-gray-900">{t('card.error.title')}</h3>
                            <p className="mt-2 text-gray-500">
                                {error ? error : t('card.error.notFound')}
                            </p>
                            <div className="mt-6">
                                <button onClick={() => navigate(-1)}
                                        className="text-indigo-600 hover:text-indigo-900 font-medium">
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
                <div className="flex h-screen">
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
                                <div style={{aspectRatio: '9/16', height: '100%', position: "relative"}}>
                                    {currentCard.url ? (
                                        <img
                                            src={currentCard.url}
                                            alt={currentCard.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: 'var(--radius-xl)'
                                            }}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
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
                                    {/* Title overlay */}
                                    {currentCard.show_title_on_image && (
                                        <div
                                            className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
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
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card Details */}
                    <div className="p-6 overflow-y-auto flex-1">
                        <div className="flex justify-between items-start">
                            <h3 className="text-2xl font-bold text-gray-900">{currentCard.title}</h3>
                        </div>
                        {/* show_title_on_image — only visible to the card owner */}
                        {isOwner ? (
                            <div className="mt-5 flex items-center gap-3">
                                <label
                                    htmlFor="show_title_on_image"
                                    className="flex items-center gap-3 cursor-pointer select-none"
                                >
                                    {/* Toggle switch */}
                                    <div className="relative">
                                        <input
                                            id="show_title_on_image"
                                            type="checkbox"
                                            checked={showTitle}
                                            onChange={handleShowTitleChange}
                                            disabled={isUpdating}
                                            className="sr-only peer"
                                        />
                                        <div className="w-10 h-6 bg-gray-200 rounded-full
                                                        peer-checked:bg-[var(--color-primary)]
                                                        peer-disabled:opacity-50
                                                        transition-colors duration-200"/>
                                        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white
                                                        rounded-full shadow
                                                        peer-checked:translate-x-4
                                                        peer-disabled:opacity-50
                                                        transition-transform duration-200"/>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                                    {t('createCard.showTitleOnImage')}
                                                </span>
                                </label>
                                {isUpdating && (
                                    <svg className="w-4 h-4 animate-spin text-gray-400" fill="none"
                                         viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10"
                                                stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8v8H4z"/>
                                    </svg>
                                )}
                            </div>
                        ) : (
                            <div className="mt-5 flex items-center gap-3">
                                {/* Show the current state as a non-editable indicator */}
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-6 rounded-full ${
                                        showTitle ? 'bg-[var(--color-primary)]' : 'bg-gray-200'
                                    }`}>
                                        {/* Optional: Add a visual indicator dot */}
                                        <div
                                            className={`w-5 h-5 bg-white rounded-full shadow transform translate-y-0.5 transition-transform ${
                                                showTitle ? 'translate-x-4' : 'translate-x-1'
                                            }`}/>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                                    {t('createCard.showTitleOnImage')}
                                                </span>
                                </div>
                            </div>
                        )}

                        {currentCard.description && (
                            <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center mb-2">
                                    <LiaSignatureSolid className="w-4 h-4 text-gray-500 mr-2"/>
                                    <h3 className="font-medium text-gray-900">{t('createCard.descriptionLabel')}</h3>
                                </div>
                                <p className="text-gray-700 leading-relaxed">{currentCard.description}</p>
                            </div>
                        )}

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">{t('cards.createdAt')}</h3>
                                <p className="mt-1 text-gray-900">{currentCard.created_at}</p>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">{t('cards.updatedAt')}</h3>
                                <p className="mt-1 text-gray-900">{currentCard.updated_at}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
            <Footer/>
        </>
    );
}