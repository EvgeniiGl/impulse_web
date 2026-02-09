import Header from "@modules/Header.tsx";
import Main from "@modules/Main.tsx";
import Footer from "@modules/Footer.tsx";
import React, {useEffect, useState} from "react";
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "@store/store.ts";
import {
    createCard,
    clearError,
    clearSuccess,
    myCollections,
    AccessType,
    createCollection,
    setSelectedCollections
} from "@store/card/cardSlice.ts";
import {CreateCardRequest} from "@api/cardsApi.ts";
import CollectionSelect from "@components/Form/Select/CollectionSelect.tsx";

export default function CreateCollectionPage() {


    return (
        <>
            <Header/>
            <Main>
                <>
                    create collection
                </>
            </Main>
            <Footer/>
        </>
    );
}


