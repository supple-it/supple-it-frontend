import React from "react";
import Header from "../components/include/Header";
import "./Home.css"; // 스타일 추가

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <main className="home-main">
        <h2>건강한 영양제 추천을 받아보세요!</h2>
        <p>사용자의 건강 상태에 맞춘 맞춤 영양제를 추천해 드립니다.</p>
      </main>
      <footer className="home-footer">
        <p>© SUPP IT! All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
