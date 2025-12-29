import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Menu from '@modules/Menu';
import HomePage from './pages/HomePage';
import TodayPage from './pages/TodayPage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <Router>
            <div className="App">
                <Menu/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/today" element={<TodayPage/>}/>
                    <Route path="/my" element={<MyPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;