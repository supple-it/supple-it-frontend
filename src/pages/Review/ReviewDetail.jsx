import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { getReviewById, deleteReview, increaseReviewView } from "../../services/api"; // 리뷰 관련 API 호출
import Header from "../../components/include/Header";

const ReviewDetail = () => {
  const { id } = useParams(); // URL 파라미터로 리뷰 ID 받기
  const navigate = useNavigate();
  const [review, setReview] = useState(null); // 리뷰 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [canEdit, setCanEdit] = useState(false); // 수정 가능 여부
  const [canDelete, setCanDelete] = useState(false); // 삭제 가능 여부

  useEffect(() => {
    const fetchReview = async () => {
      try {
          await increaseReviewView(id);
        const response = await getReviewById(id);

        setReview(response.data); // 리뷰 데이터 저장
        setLoading(false); 

        const currentUserEmail = localStorage.getItem("email")?.trim();
        const reviewAuthorEmail = response.data.authorEmail?.trim();

        console.log("현재 로그인 이메일:", currentUserEmail);
        console.log("리뷰 작성자 이메일:", reviewAuthorEmail);

        if (reviewAuthorEmail?.toLowerCase() === currentUserEmail?.toLowerCase()) {
          setCanEdit(true);
          setCanDelete(true);
          console.log("수정/삭제 가능!");
        } else {
          console.log("수정/삭제 불가!");
        }
      } catch (error) {
        console.error("리뷰를 불러오는 중 오류 발생:", error);
        setError("리뷰를 불러오는 중 문제가 발생했습니다."); // 에러 상태 업데이트
        setLoading(false);
      }
    };

    if (id) {
      fetchReview();
    } else {
      setError("리뷰 ID가 없습니다.");
      setLoading(false);
    }
  }, [id]);


  // 리뷰 삭제 처리
  const handleDelete = async () => {
    if (window.confirm("정말로 이 리뷰를 삭제하시겠습니까?")) {
      try {
        await deleteReview(id);
        alert("리뷰가 성공적으로 삭제되었습니다.");
        navigate("/reviews"); // 리뷰 목록 페이지로 이동
      } catch (error) {
        alert("리뷰 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!review) return <div>리뷰를 찾을 수 없습니다.</div>;

  return (
    <>
      <Header />
      <Container style={{ marginTop: "100px", maxWidth: "1100px" }}>
        <Card className="p-5 shadow-lg d-flex flex-column" style={{ height: "auto" }}>
          <h2 className="mb-2" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{review.title}</h2>
         <div className="alert alert-info d-inline-block px-3 py-2">
           <strong>상품 : </strong> {review.productName || "상품 정보 없음"}
         </div>

          <p className="text-muted">
            <strong>작성자:</strong> {review.authorEmail || "알 수 없음"} |
            <strong> 작성일:</strong> {
              review.createdAt
                ? new Date(review.createdAt).toLocaleDateString()
                : new Date().toLocaleDateString()
            }
          </p>
          <hr />

          <div
            className="flex-grow-1 mb-4 fs-5"
            style={{ overflowY: "auto", maxHeight: "450px" }}
            dangerouslySetInnerHTML={{ __html: review.content }}
          />

          <Row className="mt-4">
            <Col>
              <Button variant="secondary" onClick={() => navigate("/reviews")}>
                목록으로 돌아가기
              </Button>
            </Col>
            {canEdit && (
              <Col className="text-end">
                <Button variant="primary" className="me-2" onClick={() => navigate(`/reviews/edit/${id}`)}>
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

export default ReviewDetail;
