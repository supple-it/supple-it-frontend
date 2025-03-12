import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPage from "./pages/MyPage";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import ReviewForm from "./pages/ReviewForm";
import FavoriteList from "./pages/FavoriteList";
import NoticeBoard from "./pages/NoticeBoard";
import Schedule from "./pages/schedule";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/favorites" element={<FavoriteList />} />
        <Route path="/notices" element={<NoticeBoard />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </Router>
  );
}

export default App;
