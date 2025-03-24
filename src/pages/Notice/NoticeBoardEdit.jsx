import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { getNoticeById, updateNotice } from '../../services/api';
import Header from "../../components/include/Header";

const NoticeBoardEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [removeExistingFile, setRemoveExistingFile] = useState(false); // 첨부파일 제거 플래그
  const [removeExistingImage, setRemoveExistingImage] = useState(false); // 이미지 제거 플래그
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null); // 이미지 미리보기 URL
  
  // Quill 에디터 참조 추가
  const quillRef = useRef(null);

  useEffect(() => {
    const checkUserRole = () => {
      const userRole = localStorage.getItem("role");
      const isAdmin = userRole === "ADMIN";
      setIsAdmin(isAdmin);

      if (!isAdmin) {
        alert("공지사항 수정 권한이 없습니다.");
        navigate("/notices");
      }
    };

const fetchNotice = async () => {
  try {
    setLoading(true);
    console.log("상세 조회 요청 ID:", id); // ID 로그 출력

    const response = await getNoticeById(id); // 데이터 받아오기
    console.log("서버 응답 객체:", response); // 응답 객체 로그 출력

    // 응답에 상태 코드가 없거나 데이터가 없으면 예외 처리
    if (!response || !response.data) {
      throw new Error("응답에 데이터가 없습니다");
    }

    const noticeData = response.data;
    console.log("공지사항 상세 데이터:", noticeData); // 응답 데이터 로그 출력

    setNotice(noticeData);
    setTitle(noticeData.title);
    setContent(noticeData.content);
    setLoading(false);
  } catch (error) {
    console.error("공지사항 조회 중 오류:", error);
    setError(`공지사항을 불러오는 중 오류가 발생했습니다: ${error.message}`);
    setLoading(false);
  }
};


    checkUserRole();
    fetchNotice();
  }, [id, navigate]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileType(selectedFile.type);
      
      // 이미지인 경우 미리보기 설정
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreviewImage(null);
      }
      
      console.log("선택된 파일:", selectedFile.name, "타입:", selectedFile.type);
    } else {
      setPreviewImage(null);
    }
  };

  // 기존 첨부파일 제거 핸들러
  const handleRemoveFile = () => {
    setRemoveExistingFile(true);
    // 화면에서만 제거하고 실제 삭제는 저장 시 처리
  };

  // 기존 이미지 제거 핸들러
  const handleRemoveImage = () => {
    setRemoveExistingImage(true);
    setPreviewImage(null);
    // 화면에서만 제거하고 실제 삭제는 저장 시 처리
  };

  // 이미지 업로드 핸들러 추가 - 에디터 내 이미지 삽입 기능
  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // 이미지 파일 검증
        if (!file.type.startsWith('image/')) {
          alert('이미지 파일만 업로드할 수 있습니다.');
          return;
        }
        
        // 임시 URL 생성 (미리보기용)
        const reader = new FileReader();
        reader.onload = () => {
          // Quill 에디터에 이미지 삽입
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          
          // 현재 커서 위치에 이미지 삽입
          quill.insertEmbed(range.index, 'image', reader.result);
          
          // 커서를 이미지 다음으로 이동
          quill.setSelection(range.index + 1);
          
          // 에디터 내용 상태 업데이트
          setContent(quillRef.current.getEditor().root.innerHTML);
        };
        reader.readAsDataURL(file);
      }
    };
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력하세요!");
      return;
    }

    if (isSubmitting) {
      return; // 중복 제출 방지
    }

    try {
      setIsSubmitting(true);
      
      // 공지사항 수정 데이터 준비
      const noticeData = {
        title,
        content,
        file,
        removeAttachment: removeExistingFile,
        removeImage: removeExistingImage
      };

      await updateNotice(id, noticeData);
      alert("공지사항이 성공적으로 수정되었습니다.");
      navigate(`/notices/${id}`);
    } catch (error) {
      console.error("공지사항 수정 중 오류:", error);
      alert("공지사항 수정 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ReactQuill 모듈 설정 - 에디터 내 이미지 삽입 기능 추가
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['link', 'image'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean']
      ],
      handlers: {
        image: handleImageUpload // 이미지 핸들러 연결
      }
    }
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
  ];

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!isAdmin) return null;

  // 이미지 미리보기 URL 결정
  const imageUrl = previewImage ? 
    previewImage : 
    (notice?.imagePath && !removeExistingImage ? 
      `http://localhost:8000/api/notice/image/${notice.imagePath}` : 
      null);

  return (
    <>
      <Header />
      <Container style={{ marginTop: "100px" }}>
        <Card className="p-4 shadow-lg">
          <h2 className="mb-3" style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
            📢 공지사항 수정
          </h2>

          <Form.Group className="mb-3">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="공지사항 제목을 입력하세요"
              required
            />
          </Form.Group>

          {/* 내용 입력 필드 */}
          <Form.Group className="mb-3">
            <Form.Label>내용</Form.Label>
            <ReactQuill 
              ref={quillRef} // Quill 에디터 참조 추가
              theme="snow" 
              value={content} 
              onChange={setContent} 
              modules={modules} 
              formats={formats}
              placeholder="공지사항 내용을 입력하세요"
              style={{ minHeight: "250px", marginBottom: "50px" }}
            />
            <p className="text-muted mt-2">
              <i className="fas fa-info-circle me-1"></i>
              툴바의 이미지 아이콘을 클릭하여 본문에 이미지를 삽입할 수 있습니다.
            </p>
          </Form.Group>

          {/* 파일 업로드 필드 */}
          <Form.Group className="mb-3">
            <Form.Label>파일 업로드 (이미지 또는 첨부파일)</Form.Label>
            <Form.Control 
              type="file" 
              onChange={handleFileChange} 
            />
            {file && (
              <div className="mt-2 text-muted">
                {fileType.startsWith('image/') 
                  ? `새로 선택된 이미지: ${file.name}` 
                  : `새로 선택된 파일: ${file.name}`}
              </div>
            )}
          </Form.Group>

          {/* 이미지 미리보기 (있는 경우) */}
          {imageUrl && (
            <Form.Group className="mb-3">
              <Form.Label>이미지 미리보기</Form.Label>
              <div>
                <img 
                  src={imageUrl}
                  alt="이미지 미리보기" 
                  style={{ maxWidth: "300px", maxHeight: "200px" }} 
                  className="border rounded"
                />
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  className="ml-2 d-block mt-2"
                  onClick={handleRemoveImage}
                >
                  이미지 제거
                </Button>
              </div>
            </Form.Group>
          )}

          {/* 기존 첨부파일 정보 표시 및 제거 버튼 */}
          {notice?.attachmentPath && !removeExistingFile && (
            <Form.Group className="mb-3">
              <Form.Label>현재 첨부파일</Form.Label>
              <div className="d-flex align-items-center">
                <a 
                  href={`http://localhost:8000/api/notice/attachment/${notice.noticeId}/${encodeURIComponent(notice.attachmentName)}`}
                  className="text-primary me-2" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {notice.attachmentName}
                </a>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={handleRemoveFile}
                >
                  첨부파일 제거
                </Button>
              </div>
              {removeExistingFile && (
                <div className="mt-2 text-danger">
                  첨부파일이 제거됩니다.
                </div>
              )}
            </Form.Group>
          )}

          {/* 버튼 그룹 */}
          <div className="d-flex justify-content-end mt-4">
            <Button 
              variant="secondary" 
              className="me-2" 
              onClick={() => navigate(`/notices/${id}`)}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSave}
              disabled={!title.trim() || !content.trim() || isSubmitting}
            >
              {isSubmitting ? "수정 중..." : "수정 완료"}
            </Button>
          </div>
        </Card>
      </Container>
    </>
  );
};

export default NoticeBoardEdit;