import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/include/Header";

const NoticeBoardEdit = ({ notices }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const notice = notices.find((n) => n.id === parseInt(id));

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (notice) {
      setTitle(notice.title);
      setContent(notice.content);
    }
  }, [notice]);

  if (!notice) {
    return (
      <div className="mt-24 flex justify-center">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">해당 공지사항을 찾을 수 없습니다.</h3>
          <button 
            onClick={() => navigate("/home")} 
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            공지사항 목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // ✅ 수정 저장 (현재는 alert만 띄움)
  const handleSave = () => {
    alert("수정 내용 저장 기능은 나중에 추가될 예정입니다!");
    navigate(`/notices/${id}`);
  };

  return (
    <>
      <Header />
      <div className="mt-24 flex justify-center">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">📢 공지사항 수정</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">내용</label>
            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">작성자</label>
            <input
              type="text"
              value="관리자"
              readOnly
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => navigate(`/notices/${id}`)}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              수정 완료
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoticeBoardEdit;
