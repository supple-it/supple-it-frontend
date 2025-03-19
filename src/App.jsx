
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import MyPage from "./pages/Home/MyPage";
import ProductList from "./pages/Product/ProductList";
import ProductDetail from "./pages/Product/ProductDetail";
import ReviewForm from "./pages/Product/ReviewForm";
import FavoriteList from "./pages/Home/FavoriteList";
import NoticeBoard from "./pages/Notice/NoticeBoard";
import Schedule from "./pages/schedule";
import NoticeBoardInsert from "./pages/Notice/NoticeBoardInsert";
import { useState } from "react";
import NoticeBoardDetail from "./pages/Notice/NoticeBoardDetail";
import NoticeBoardEdit from "./pages/Notice/NoticeBoardEdit";
import UpdateProfile from "./pages/Auth/UpdateProfile";

function App() {
  //공지사항 관리 시 리덕스 등의 상태관리가 필요한데 리덕스 사용대신 App.jsx에서 넘겨주는 걸로 했습니다.
  const [notices, setNotices] = useState([]);

  const handleAddNotice = (newNotice) => {
    setNotices((prevNotices) => [newNotice, ...prevNotices]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/profile" element={<UpdateProfile />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/favorites" element={<FavoriteList />} />
        <Route path="/notices" element={<NoticeBoard notices={notices}/>} />
        <Route path="/notice/:id" element={<NoticeBoardDetail notices={notices} />} />
        <Route path="/notices/edit/:id" element={<NoticeBoardEdit notices={notices} />} />
        <Route path="/newnotice" element={<NoticeBoardInsert onSubmit={handleAddNotice} />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </Router>
  );
};

export default App;
