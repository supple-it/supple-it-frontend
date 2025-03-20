import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Header from '../../components/include/Header';
import Footer from '../../components/include/Footer';

const MyPage = () => {
  const [date, setDate] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // 사이드바 상태 관리

  // 주간 날짜 구하기
  const getWeekDates = (currentDate) => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1); // 월요일 기준

    return Array.from({ length: 7 }, (_, i) => {
      const newDate = new Date(startOfWeek);
      newDate.setDate(startOfWeek.getDate() + i);
      return newDate;
    });
  };

  const weekDates = getWeekDates(date);

  // 예시 복용 계획
  const weeklyPlan = {
    Monday: ['비타민 C', '오메가-3'],
    Tuesday: ['칼슘', '비타민 D'],
    Wednesday: ['마그네슘'],
    Thursday: ['유산균'],
    Friday: ['아연', '철분'],
    Saturday: ['종합비타민'],
    Sunday: ['오메가-3'],
  };

  const todayPlan = weeklyPlan[weekDates[date.getDay()].toLocaleDateString('en-US', { weekday: 'long' })];

  return (
    <div className="bg-gray-50 font-['Noto_Sans_KR']">
      <Header />

      {/* 메인 레이아웃 */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* 사이드바 */}
        <aside className={`transition-all duration-300 ${isSidebarOpen ? 'w-40' : 'w-10'} bg-white shadow-sm p-4`}>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} // 버튼 클릭 시 사이드바 열기/닫기
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'} text-2xl`}></i>
          </button>
          <nav className={`space-y-1 ${isSidebarOpen ? 'block' : 'hidden'}`}>
            <Link to="/schedule" className="text-gray-600 hover:bg-gray-50 flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <i className="fas fa-calendar w-6"></i> {isSidebarOpen && '복용 일정'}
            </Link>
            {/* 새로운 메뉴 항목들 추가 */}
            <Link to="/goals" className="text-gray-600 hover:bg-gray-50 flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <i className="fas fa-trophy w-6"></i> {isSidebarOpen && '나의 목표'}
            </Link>
            <Link to="/activity" className="text-gray-600 hover:bg-gray-50 flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <i className="fas fa-running w-6"></i> {isSidebarOpen && '최근 활동'}
            </Link>
            <Link to="/health-status" className="text-gray-600 hover:bg-gray-50 flex items-center px-3 py-2 text-sm font-medium rounded-md">
              <i className="fas fa-heartbeat w-6"></i> {isSidebarOpen && '건강 상태'}
            </Link>
          </nav>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className={`flex-1 overflow-y-auto p-6 ${isSidebarOpen ? 'ml-40' : 'ml-10'}`}>
          <div className="max-w-7xl mx-auto">

            {/* 🗓 오늘의 영양제 */}
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">오늘의 영양제</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* 아침 */}
              <div className="bg-white shadow rounded-lg p-5 flex items-center">
                <i className="fas fa-sun text-yellow-400 text-2xl"></i>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-gray-900">아침</h4>
                  <p className="text-sm text-gray-900">{todayPlan?.[0]}, {todayPlan?.[1]}</p>
                </div>
              </div>
              {/* 저녁 */}
              <div className="bg-white shadow rounded-lg p-5 flex items-center">
                <i className="fas fa-moon text-blue-500 text-2xl"></i>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-gray-900">저녁</h4>
                  <p className="text-sm text-gray-900">마그네슘, 칼슘</p>
                </div>
              </div>
            </div>

            {/* 🗓 주간 복용 일정 */}
            <div className="bg-white shadow rounded-lg p-5 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">📅 주간 복용 계획</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 text-center">
                {weekDates.map((day, index) => (
                  <div key={index} className="p-3 border rounded-lg bg-gray-100">
                    <p className="text-sm font-semibold">{day.toLocaleDateString('ko-KR', { weekday: 'short' })}</p>
                    <p className="text-xs text-gray-600">{day.toLocaleDateString()}</p>
                    <ul className="mt-1 text-xs text-gray-700">
                      {weeklyPlan[day.toLocaleDateString('en-US', { weekday: 'long' })]?.map((item, i) => (
                        <li key={i}>✅ {item}</li>
                      )) || <li>❌ 없음</li>}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 📆 달력 */}
            <div className="mt-4 p-4 bg-white shadow rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-900">복용 일정</h2>
              <Calendar onChange={setDate} value={date} />
              <p className="mt-4 text-gray-900">선택한 날짜: {date.toLocaleDateString()}</p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default MyPage;
