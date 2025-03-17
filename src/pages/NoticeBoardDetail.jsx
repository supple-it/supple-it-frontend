import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Header from "../components/include/Header";

const NoticeBoardDetail = ({ notices }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(true);

  const notice = notices.find((n) => n.id === parseInt(id));

  if (!notice) {
    return (
      <Container style={{ marginTop: "100px" }}>
        <Card className="p-4 shadow-lg text-center">
          <h3>해당 공지사항을 찾을 수 없습니다.</h3>
          <Button variant="primary" className="mt-3" onClick={() => navigate("/notices")}>
            공지사항 목록으로 돌아가기
          </Button>
        </Card>
      </Container>
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
      <Container style={{ marginTop: "100px" }}>
        <Card className="p-4 shadow-lg">
          <h2 className="mb-3">{notice.title}</h2>
          <p>
            <strong>작성자:</strong> {notice.author} | <strong>조회수:</strong> {notice.views} | <strong>날짜:</strong> {notice.date}
          </p>
          <hr />
          <div dangerouslySetInnerHTML={{ __html: notice.content }} className="mb-4" />
          <Row className="mt-3">
            <Col>
              <Button variant="secondary" onClick={() => navigate("/notices")}>
                목록으로 돌아가기
              </Button>
            </Col>
            {isAdmin && (
              <Col className="text-end">
                <Button variant="warning" className="me-2" onClick={handleEdit}>
                  수정
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  삭제
                </Button>
              </Col>
            )}
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default NoticeBoardDetail;
