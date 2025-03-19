import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/include/Header";

const NoticeBoardDetail = ({ notices }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(true);

  const notice = notices.find((n) => n.id === parseInt(id));

  if (!notice) {
    return (
      <div className="mt-24 flex justify-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">해당 공지사항을 찾을 수 없습니다.</h3>
          <button 
            onClick={() => navigate("/")} 
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            공지사항 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // ✅ 수정 페이지로 이동
  const handleEdit = () => {
    navigate(`/notices/edit/${id}`);
  };

  // ✅ 삭제 기능 (현재는 알림만)
  const handleDelete = () => {
    alert("삭제 기능은 나중에 추가될 예정입니다!");
  };

  return (
    <>
      <Header />
      <div className="mt-24 flex justify-center">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-3">{notice.title}</h2>
          <p className="text-gray-600">
            <strong>작성자:</strong> {notice.author} | <strong>조회수:</strong> {notice.views} | <strong>날짜:</strong> {notice.date}
          </p>
          <hr className="my-4" />
          <div 
            dangerouslySetInnerHTML={{ __html: notice.content }} 
            className="mb-4 text-gray-700"
          />
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => navigate("/notices")}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              목록으로 돌아가기
            </button>
            {isAdmin && (
              <div className="space-x-2">
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                >
                  수정
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeBoardDetail;
