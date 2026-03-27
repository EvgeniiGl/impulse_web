// CardPage.tsx
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Header from "@modules/Header.tsx";
import Footer from "@modules/Footer.tsx";
import Main from "@modules/Main.tsx";
import {fetchCard, resetCurrentCard, updateCard} from '@store/card/cardSlice.ts';
import {LiaSignatureSolid} from "react-icons/lia";
import {CardState, RootState, useAppDispatch, useAppSelector} from "@store/store.ts";
import {RiEdit2Line} from "react-icons/ri";
import {FaCheck} from "react-icons/fa6";
import {RxCross1} from "react-icons/rx";

export default function CardPage() {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {currentCard, isLoading, isUpdating, error}: CardState = useAppSelector((state: RootState) => state.card);

    const authUser = useAppSelector((state: RootState) => state.auth.user);
    const isOwner = !!(currentCard && authUser && currentCard.creator?.id === authUser.id);
    console.log("log--",
        "\ncurrentCard--", currentCard,
        "\nauthUser--", authUser,
    );
    const [showTitle, setShowTitle] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [titleValue, setTitleValue] = useState('');
    const titleInputRef = useRef<HTMLTextAreaElement>(null);

    // Description editing states
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [descriptionValue, setDescriptionValue] = useState('');
    const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (currentCard) {
            setShowTitle(currentCard.show_title_on_image);
            setTitleValue(currentCard.title);
            setDescriptionValue(currentCard.description || '');
        }
    }, [currentCard?.id]);

    useEffect(() => {
        if (isEditingTitle && titleInputRef.current) {
            titleInputRef.current.focus();
            titleInputRef.current.select();
        }
    }, [isEditingTitle]);

    useEffect(() => {
        if (isEditingDescription && descriptionInputRef.current) {
            descriptionInputRef.current.focus();
            descriptionInputRef.current.select();
        }
    }, [isEditingDescription]);

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

    const handleStartEditTitle = () => {
        if (!isOwner) return;
        setTitleValue(currentCard?.title ?? '');
        setIsEditingTitle(true);
    };

    const handleSaveTitle = () => {
        if (!id || !currentCard) return;
        const trimmed = titleValue.trim();
        if (!trimmed || trimmed === currentCard.title) {
            setIsEditingTitle(false);
            setTitleValue(currentCard.title);
            return;
        }
        dispatch(updateCard({id, data: {title: trimmed}})).then(() => {
            setIsEditingTitle(false);
        });
    };

    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') handleSaveTitle();
        if (e.key === 'Escape') {
            setIsEditingTitle(false);
            setTitleValue(currentCard?.title ?? '');
        }
    };

    // Description handlers
    const handleStartEditDescription = () => {
        if (!isOwner) return;
        setDescriptionValue(currentCard?.description ?? '');
        setIsEditingDescription(true);
    };

    const handleSaveDescription = () => {
        if (!id || !currentCard) return;
        const trimmed = descriptionValue.trim();
        if (trimmed === (currentCard.description ?? '')) {
            setIsEditingDescription(false);
            setDescriptionValue(currentCard.description ?? '');
            return;
        }
        dispatch(updateCard({id, data: {description: trimmed || null}})).then(() => {
            setIsEditingDescription(false);
        });
    };

    const handleDescriptionKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Ctrl+Enter or Cmd+Enter to save
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            handleSaveDescription();
        }
        if (e.key === 'Escape') {
            setIsEditingDescription(false);
            setDescriptionValue(currentCard?.description ?? '');
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
                                <div style={{aspectRatio: '9/16', height: '100%', position: 'relative'}}>
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
                                                <h3 className="font-['Pacifico'] text-white text-3xl md:text-4xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] mb-3">
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
                    <div className="p-8 overflow-y-auto flex-1">
                        <div className="flex items-start gap-2">
                            {isEditingTitle ? (
                                <>
                                    <textarea
                                        ref={titleInputRef}
                                        value={titleValue}
                                        onChange={e => {
                                            setTitleValue(e.target.value);
                                            // Автоматическая регулировка высоты
                                            e.target.style.height = 'auto';
                                            e.target.style.height = e.target.scrollHeight + 'px';
                                        }}
                                        onKeyDown={handleTitleKeyDown}
                                        disabled={isUpdating}
                                        className="text-2xl font-bold text-gray-900 border-b-2 border-[var(--color-primary)] outline-none bg-transparent flex-1 disabled:opacity-50 resize-none overflow-hidden"
                                        rows={1}
                                    />
                                    <button
                                        onClick={handleSaveTitle}
                                        disabled={isUpdating}
                                        className="bottom-3 right-21 z-30 rounded-full hover:bg-black/80 transition-colors shadow-lg"
                                        style={{
                                            padding: '5px',
                                            borderRadius: '50%',
                                            backgroundColor: 'none',
                                            color: 'var(--color-primary)',
                                            border: '1px solid var(--color-primary)',
                                        }}
                                        title={t('common.save')}
                                    >
                                        {isUpdating ? (
                                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10"
                                                        stroke="currentColor" strokeWidth="4"/>
                                                <path className="opacity-75" fill="currentColor"
                                                      d="M4 12a8 8 0 018-8v8H4z"/>
                                            </svg>
                                        ) : (
                                            <FaCheck/>
                                        )}
                                    </button>
                                    {/* Cancel button */}
                                    <button
                                        onClick={() => {
                                            setIsEditingTitle(false);
                                            setTitleValue(currentCard.title);
                                        }}
                                        disabled={isUpdating}
                                        className="bottom-3 right-21 z-30 rounded-full hover:bg-black/80 transition-colors shadow-lg"
                                        style={{
                                            padding: '5px',
                                            borderRadius: '50%',
                                            backgroundColor: 'none',
                                            color: 'var(--color-primary)',
                                            border: '1px solid var(--color-primary)',
                                        }}
                                        title={t('common.cancel')}
                                    >
                                        <RxCross1/>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold text-gray-900">{currentCard.title}</h3>
                                    {isOwner && (
                                        <button
                                            onClick={handleStartEditTitle}
                                            className="bottom-3 right-21 z-30 rounded-full hover:bg-black/80 transition-colors shadow-lg"
                                            style={{
                                                padding: '5px',
                                                borderRadius: '50%',
                                                backgroundColor: 'none',
                                                color: 'var(--color-primary)',
                                                border: '1px solid var(--color-primary)',
                                            }}
                                            title={t('common.edit')}
                                        >
                                            <RiEdit2Line/>
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                        {isOwner ? (
                            <div className="mt-5 flex items-center gap-3">
                                <label htmlFor="show_title_on_image"
                                       className="flex items-center gap-3 cursor-pointer select-none">
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
                                        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow
                                                        peer-checked:translate-x-4
                                                        peer-disabled:opacity-50
                                                        transition-transform duration-200"/>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {t('createCard.showTitleOnImage')}
                                    </span>
                                </label>
                                {isUpdating && !isEditingTitle && !isEditingDescription && (
                                    <svg className="w-4 h-4 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10"
                                                stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                                    </svg>
                                )}
                            </div>
                        ) : (
                            <div className="mt-5 flex items-center gap-3">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-10 h-6 rounded-full ${showTitle ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`}>
                                        <div
                                            className={`w-5 h-5 bg-white rounded-full shadow transform translate-y-0.5 transition-transform ${showTitle ? 'translate-x-4' : 'translate-x-1'}`}/>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
                                        {t('createCard.showTitleOnImage')}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Description section with editing */}
                        <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <LiaSignatureSolid className="w-4 h-4 text-gray-500 mr-2"/>
                                    <h3 className="font-medium text-gray-900">{t('createCard.descriptionLabel')}</h3>
                                </div>
                                {isOwner && !isEditingDescription && (
                                    <button
                                        onClick={handleStartEditDescription}
                                        className="rounded-full hover:bg-gray-200 transition-colors p-1"
                                        style={{
                                            padding: '5px',
                                            borderRadius: '50%',
                                            backgroundColor: 'none',
                                            color: 'var(--color-primary)',
                                            border: '1px solid var(--color-primary)',
                                        }}
                                        title={t('common.edit')}
                                    >
                                        <RiEdit2Line size={14}/>
                                    </button>
                                )}
                            </div>

                            {isEditingDescription ? (
                                <div className="space-y-2">
                                    <textarea
                                        ref={descriptionInputRef}
                                        value={descriptionValue}
                                        onChange={e => {
                                            setDescriptionValue(e.target.value);
                                            e.target.style.height = 'auto';
                                            e.target.style.height = e.target.scrollHeight + 'px';
                                        }}
                                        onKeyDown={handleDescriptionKeyDown}
                                        disabled={isUpdating}
                                        placeholder={t('createCard.descriptionPlaceholder')}
                                        className="w-full text-gray-700 leading-relaxed border border-gray-300 rounded-lg p-3 outline-none focus:border-[var(--color-primary)] disabled:opacity-50 resize-none"
                                        rows={3}
                                        style={{minHeight: '80px'}}
                                    />
                                    <div className="flex items-center gap-2 justify-end">
                                        <button
                                            onClick={handleSaveDescription}
                                            disabled={isUpdating}
                                            className="rounded-full hover:bg-black/80 transition-colors shadow-lg flex items-center gap-1 px-3 py-1"
                                            style={{
                                                backgroundColor: 'none',
                                                color: 'var(--color-primary)',
                                                border: '1px solid var(--color-primary)',
                                            }}
                                            title={t('common.save')}
                                        >
                                            {isUpdating ? (
                                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10"
                                                            stroke="currentColor" strokeWidth="4"/>
                                                    <path className="opacity-75" fill="currentColor"
                                                          d="M4 12a8 8 0 018-8v8H4z"/>
                                                </svg>
                                            ) : (
                                                <FaCheck size={12}/>
                                            )}
                                            <span className="text-sm">{t('common.save')}</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsEditingDescription(false);
                                                setDescriptionValue(currentCard.description ?? '');
                                            }}
                                            disabled={isUpdating}
                                            className="rounded-full hover:bg-black/80 transition-colors shadow-lg flex items-center gap-1 px-3 py-1"
                                            style={{
                                                backgroundColor: 'none',
                                                color: 'var(--color-primary)',
                                                border: '1px solid var(--color-primary)',
                                            }}
                                            title={t('common.cancel')}
                                        >
                                            <RxCross1 size={12}/>
                                            <span className="text-sm">{t('common.cancel')}</span>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-700 leading-relaxed">
                                    {currentCard.description || (
                                        <span className="text-gray-400 italic">{t('createCard.noDescription')}</span>
                                    )}
                                </p>
                            )}
                        </div>

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
                        {currentCard.creator && (
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <h3 className="text-sm font-medium text-gray-500 mb-3">
                                    {t('cards.author')}
                                </h3>
                                <div className="flex items-center gap-3">
                                    {/* Аватар с инициалом */}
                                    <div
                                        className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-semibold text-sm">
                                            {currentCard.creator.name?.charAt(0).toUpperCase() ?? '?'}
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
                </div>
            </Main>
            <Footer/>
        </>
    );
}