import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import TodayPage from './pages/TodayPage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <Router>
            <div className="App">
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