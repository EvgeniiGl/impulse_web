import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import TodayPage from './pages/TodayPage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';
import CreateCollectionPage from "@pages/CreateCollectionPage.tsx";
import RegisterPage from "@pages/RegisterPage.tsx";
import {initializeAuth, selectAuthToken, refreshAccessToken} from '@store/auth/authSlice.ts';
import {isTokenExpired} from "@/utils/tokenUtils.ts";
import {useAppDispatch, useAppSelector} from "@store/store.ts";
import {useEffect} from 'react';
import CreateCardPage from "@pages/CreateCardPage.tsx";
import CardPage from "@pages/CardPage.tsx";
import {NotificationsPage} from "@pages/NotificationsPage.tsx";
import {SubscriptionWarning} from "@components/Notifications/SubscriptionWarning.tsx";

// import {notificationManager} from '@utils/notificationManager.ts';

function App() {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectAuthToken);

    useEffect(() => {
        if (token && isTokenExpired(token)) {
            dispatch(refreshAccessToken())
        }
        dispatch(initializeAuth());
    }, [dispatch]);

    //
    // useEffect(() => {
    //     // Проверяем подписку при загрузке приложения
    //     const checkSubscriptionOnLoad = async () => {
    //         try {
    //             if (notificationManager.isSupported()) {
    //                 const permission = notificationManager.getPermissionStatus();
    //
    //                 if (permission === 'granted') {
    //                     // Проверяем валидность подписки
    //                     const isValid = await notificationManager.validateSubscription();
    //
    //                     if (!isValid) {
    //                         console.log('Subscription invalid, attempting to resubscribe...');
    //                         await notificationManager.resubscribeIfNeeded();
    //                     }
    //                 }
    //             }
    //         } catch (error) {
    //             console.error('Error checking subscription on load:', error);
    //         }
    //     };
    //
    //     checkSubscriptionOnLoad();
    // }, []);

    return (
        <>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/today" element={<TodayPage/>}/>
                        <Route path="/my" element={<MyPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/card/create" element={<CreateCardPage/>}/>
                        <Route path="/collection/create" element={<CreateCollectionPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/card/:id" element={<CardPage/>}/>
                        <Route path="/notification" element={<NotificationsPage/>}/>
                    </Routes>
                </div>
            </Router>
            <SubscriptionWarning/>
        </>
    );
}

export default App;