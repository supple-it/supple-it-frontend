import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Header from "../../components/include/Header";
import { createReview, searchProducts } from "../../services/api";

const ReviewForm = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // 제품 검색어
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 목록
  const [selectedProduct, setSelectedProduct] = useState(null); // 선택한 제품
  const [title, setTitle] = useState(""); // 제목
  const [content, setContent] = useState(""); // 리뷰 내용
  const memberId = localStorage.getItem('memberId')

  const findProducts = async (keyword) => {
    setSearchTerm(keyword);

    if (keyword.length < 1) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await searchProducts(keyword);
      console.log("검색 결과:", res.data); // 응답 데이터 확인

      if (res.data && Array.isArray(res.data)) {
        setSearchResults(res.data);
      } else {
        setSearchResults([]); // 데이터 형식이 다르면 초기화
      }
    } catch (error) {
      console.error("제품 검색 오류:", error);
      setSearchResults([]);
    }
  };


  // 제품 선택 시 처리
  const selectProduct = (product) => {
    if (!product || !product.productName) {
      console.error("선택한 제품 데이터가 없음:", product);
      return;
    }

    console.log("선택한 제품:", product);
    setSearchTerm(product.productName); // 입력창에 선택한 제품 이름 표시
    setSelectedProduct(product); // 선택한 제품을 상태에 저장
    setSearchResults([]); // 검색 결과 리스트 초기화
  };

  // 리뷰 등록 API 호출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      alert("리뷰할 제품을 선택하세요!");
      return;
    }

    if (!content.trim()) {
      alert("리뷰 내용을 입력하세요!");
      return;
    }

    try {
      const reviewData = {
        title: title,
        memberId: memberId,
        prdId: selectedProduct.prdId,
        productName: selectedProduct.productName,
        content
      };

    await createReview(reviewData); // JSON 전송 모드

      alert("리뷰가 성공적으로 등록되었습니다!");
      navigate("/reviews");
    } catch (error) {
      console.error("리뷰 등록 오류:", error);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  };


  // ReactQuill 에디터
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      ["link", "image"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  return (
    <>
      <Header />
      <div style={{ backgroundColor: "#c0ebe5", padding: "20px", minHeight: "100vh" }}>
        <Container style={{ marginTop: "50px" }}>
          <Card className="p-4 shadow-lg">
            <h2 className="mb-3 text-center" style={{ fontSize: "24px", fontWeight: "bold" }}>리뷰 작성</h2>
            <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3">
                            <Form.Label>제목</Form.Label>
                            <Form.Control
                            type="text"
                              placeholder="리뷰 제목을 입력하세요"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </Form.Group>

              {/* 제품 검색창 */}
              <Form.Group className="mb-3">
                <Form.Label>제품 검색</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="제품 이름을 검색하세요"
                  value={searchTerm || ""}  // undefined 방지
                  onChange={(e) => findProducts(e.target.value)}
                />
                {/* 검색 결과 */}
                {searchResults.length > 0 && (
                  <ul className="list-group mt-2">
                    {searchResults.map((product) => (
                      <li
                        key={product.prdId}
                        className="list-group-item list-group-item-action"
                        onClick={() => selectProduct(product)}
                        style={{ cursor: "pointer" }}
                      >
                        {product.productName} ({product.companyName})
                      </li>
                    ))}
                  </ul>
                )}
              </Form.Group>

              {/* 선택된 제품 표시 */}
              {selectedProduct && (
                <div className="alert alert-info">
                  선택된 제품: <strong>{selectedProduct.productName} ({selectedProduct.companyName})</strong>
                </div>
              )}

              {/* 리뷰 작성 (ReactQuill) */}
              <Form.Group className="mb-3">
                <Form.Label>리뷰 내용</Form.Label>
                <div style={{ border: "none", borderRadius: "5px", padding: "5px", minHeight: "300px" }}>
                  <ReactQuill
                    theme="snow"
                    value={content}
                    modules={modules}
                    onChange={setContent}
                    style={{ height: "250px" }}
                  />
                </div>
              </Form.Group>

              {/* 버튼 영역 */}
              <div className="d-flex justify-content-end">
                <Button variant="secondary" className="me-2" onClick={() => navigate("/reviews")}>
                  취소
                </Button>
                <Button style={{ backgroundColor: "#2A9D8F", color: "white", border: "none" }} type="submit">
                  등록
                </Button>
              </div>

            </Form>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default ReviewForm;
