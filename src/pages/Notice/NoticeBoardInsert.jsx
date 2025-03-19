import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../components/include/Header";

const NoticeBoardInsert = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author] = useState("관리자");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력하세요!");
      return;
    }

    const newNotice = {
      id: Date.now(),
      title,
      content,
      author,
      views: 0, // 신규 글이므로 조회수 0
      date: new Date().toISOString().split("T")[0],
    };

    onSubmit(newNotice);
    navigate("/notices"); // 목록으로 이동
  };

  return (
    <>
      <Header />
      <Container style={{ marginTop: "100px" }}>
        <Card className="p-4 shadow-lg">
          <h2 className="mb-4 text-center">📢 공지사항 작성</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                placeholder="공지사항 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="공지사항 내용을 입력하세요"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>작성자</Form.Label>
              <Form.Control type="text" value={author} readOnly />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => navigate("/notices")}>취소</Button>
              <Button variant="success" type="submit">등록</Button>
            </div>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default NoticeBoardInsert;
