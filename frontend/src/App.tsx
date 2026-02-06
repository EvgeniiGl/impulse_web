import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import TodayPage from './pages/TodayPage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';
import CreatePage from "@pages/CreatePage.tsx";
import RegisterPage from "@pages/RegisterPage.tsx";
import {initializeAuth, selectAuthToken, refreshAccessToken} from '@store/auth/authSlice.ts';
import {isTokenExpired} from "@/utils/tokenUtils.ts";
import {useAppDispatch, useAppSelector} from "@store/store.ts";
import {useEffect} from 'react';

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
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/today" element={<TodayPage/>}/>
                    <Route path="/my" element={<MyPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/create" element={<CreatePage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;