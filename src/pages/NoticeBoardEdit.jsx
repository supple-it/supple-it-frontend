import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Form } from "react-bootstrap";
import Header from "../components/include/Header";
import { Editor } from "@tinymce/tinymce-react"; // TinyMCE 에디터 추가

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

  // ✅ 수정 저장 (현재는 alert만 띄움)
  const handleSave = () => {
    alert("수정 내용 저장 기능은 나중에 추가될 예정입니다!");
    navigate(`/notices/${id}`); // 수정 후 상세 페이지로 이동
  };

  return (
    <>
      <Header />
      <Container style={{ marginTop: "100px" }}>
        <Card className="p-4 shadow-lg">
          <h2 className="mb-3">
            📢 공지사항 수정
          </h2>
          <Form.Group className="mb-3">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>내용</Form.Label>
            <Editor
              initialValue={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 300,
                menubar: false,
                plugins: ["advlist autolink lists link charmap print preview anchor", "searchreplace visualblocks code fullscreen", "insertdatetime media table paste code help wordcount"],
                toolbar: "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>작성자</Form.Label>
            <Form.Control type="text" value="관리자" readOnly />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={() => navigate(`/notices/${id}`)}>
              취소
            </Button>
            <Button variant="success" onClick={handleSave}>
              수정 완료
            </Button>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default NoticeBoardEdit;
