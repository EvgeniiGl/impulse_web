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
import CardEditorPage from "@pages/CardEditorPage.tsx";
import CardPage from "@pages/CardPage.tsx";
import {NotificationsPage} from "@pages/NotificationsPage.tsx";
import {SubscriptionWarning} from "@components/Notifications/SubscriptionWarning.tsx";
import {DevicesPage} from "@pages/DevicesPage .tsx";

function App() {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectAuthToken);

    useEffect(() => {
        if (token && isTokenExpired(token)) {
            dispatch(refreshAccessToken())
        }
        dispatch(initializeAuth());
    }, [dispatch]);

    return (
        <>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/today" element={<TodayPage/>}/>
                        <Route path="/my" element={<MyPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/card/create" element={<CardEditorPage/>}/>
                        <Route path="/card/:id/edit" element={<CardEditorPage/>}/>
                        <Route path="/collection/create" element={<CreateCollectionPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/card/:id" element={<CardPage/>}/>
                        <Route path="/notification" element={<NotificationsPage/>}/>
                        <Route path="/devices" element={<DevicesPage/>}/>
                    </Routes>
                </div>
            </Router>
            <SubscriptionWarning/>
        </>
    );
}

export default App;