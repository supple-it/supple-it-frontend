import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/include/Navbar';
import Footer from './components/include/Footer';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import Login from './pages/Login';

const AppContent = () => {
  const location = useLocation(); // 현재 URL 경로를 얻음

  // 로그인 페이지나 마이페이지에서는 Navbar와 Footer를 제외
  const isSpecialPage = location.pathname === '/login' || location.pathname === '/mypage';

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100 font-[Noto_Sans_KR]">
      {/* 로그인 페이지나 마이페이지가 아니면 Navbar 렌더링 */}
      {!isSpecialPage && <Navbar />}

      {/* 라우팅 설정 */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      {/* 로그인 페이지나 마이페이지가 아니면 Footer 렌더링 */}
      {!isSpecialPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router> {/* <Router>로 감싸기 */}
      <AppContent />
    </Router>
  );
};

export default App;
