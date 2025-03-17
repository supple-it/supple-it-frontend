import { Button, Card, Form, Table } from "react-bootstrap";
import Header from "../components/include/Header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NoticeBoard = ({ notices }) => {  
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const moveInsert = () => {
    navigate("/newnotice");
  };

  return (
    <>
      <Header />
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <Card className="shadow-lg p-4 rounded-3 w-75">
          <Card.Body>
            <h2 className="text-center mb-4 fw-bold">공지사항</h2>

            {/* 검색창 */}
            <div className="d-flex mb-3">
              <Form.Control
                type="text"
                placeholder="검색어를 입력하세요"
                className="me-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="success">Search</Button>
            </div>

            {/* 공지사항 테이블 */}
            <Table striped bordered hover responsive className="notice-table">
              <thead className="table-success text-center">
                <tr>
                  <th style={{ width: "10%" }}>번호</th>
                  <th style={{ width: "40%" }}>제목</th>
                  <th style={{ width: "15%" }}>작성자</th>
                  <th style={{ width: "10%" }}>조회수</th>
                  <th style={{ width: "15%" }}>작성일</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotices.length > 0 ? (
                  filteredNotices.map((notice, index) => (
                    <tr key={index} style={{ textAlign: "center", verticalAlign: "middle" }}>
                      <td>{notice.id}</td>
                      {/* 제목 스타일 조정 */}
                      <td 
                        onClick={() => navigate(`/notice/${notice.id}`)} 
                        style={{ 
                          cursor: "pointer", 
                          color: "black", 
                          textDecoration: "none", 
                          fontWeight: "bold" 
                        }}
                      >
                        {notice.title}
                      </td>
                      <td>{notice.author}</td>
                      <td>{notice.views}</td>
                      <td>{notice.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* 글쓰기 버튼 */}
            <div className="d-flex justify-content-end">
              <Button variant="success" className="rounded-pill px-4" onClick={moveInsert}>
                글쓰기
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default NoticeBoard;
