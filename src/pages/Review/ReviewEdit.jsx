import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Header from "../../components/include/Header";
import { getReviewById, updateReview, searchProducts } from "../../services/api";


const ReviewEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [prdId, setPrdId] = useState("");
  const [productName, setProductName] = useState("");
  const [productInput, setProductInput] = useState(""); 
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
      const fetchReview = async () => {
        try {
          const res = await getReviewById(id);
          setReview(res.data);
          setTitle(res.data.title);
          setContent(res.data.content);
          setProductName(res.data.productName);
          setProductInput(res.data.productName); 
          setPrdId(res.data.prdId);
        } catch (error) {
          console.error("리뷰 불러오기 오류:", error);
          alert("리뷰 정보를 불러오는 중 오류가 발생했습니다.");
        }
      };
      fetchReview();
    }, [id]);

    // 제품 검색 함수
    const findProducts = async (query) => {
      setSearchTerm(query);
      if (query.length < 1) {
        setSearchResults([]);
        return;
      }
      try {
        const res = await searchProducts(query); // 제품 검색 API 호출
        setSearchResults(res.data);
      } catch (error) {
        console.error("제품 검색 오류:", error);
      }
    };

    // 제품 선택 시 제품명 변경
    const selectProduct = (product) => {
      setPrdId(product.prdId);
      setProductName(product.productName);
      setProductInput(product.productName); 
      setSearchTerm("");
      setSearchResults([]);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("리뷰 내용을 입력하세요!");
      return;
    }
    if (!productName.trim()) {
      alert("제품을 선택하세요!");
      return;
    }
    try {
      const updatedReview = { 
        title, 
        content, 
        productName, 
        prdId: prdId 
      };
      await updateReview(id, updatedReview);

      alert("리뷰가 성공적으로 수정되었습니다!");
      navigate(`/reviews/${id}`);
    } catch (error) {
      console.error("리뷰 수정 오류:", error);
      alert("리뷰 수정 중 오류가 발생했습니다.");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  if (!review) return <p>로딩 중...</p>;

  return (
    <>
      <Header />
      <div style={{ backgroundColor: "#c0ebe5", padding: "20px", minHeight: "100vh" }}>
        <Container style={{ marginTop: "50px" }}>
          <Card className="p-4 shadow-lg">
            <h2 className="mb-3 text-center" style={{ fontSize: "24px", fontWeight: "bold" }}>리뷰 수정</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>제목</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>제품 검색</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="제품 이름을 검색하세요"
                  value={productName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setProductInput(value);
                    setProductName(value);
                    if (value.trim() === "") {
                      return; // 비어 있으면 productName 변경 안 함
                    }
                    findProducts(value);
                  }}
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

              <Form.Group className="mb-3">
                <Form.Label>리뷰 내용</Form.Label>
                <div style={{ border: "none", borderRadius: "5px", padding: "5px", minHeight: "300px" }}>
                  <ReactQuill theme="snow" value={content} modules={modules} onChange={setContent} style={{ height: "250px" }} />
                </div>
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button variant="secondary" className="me-2" onClick={() => navigate(`/reviews/${id}`)}>
                  취소
                </Button>
                <Button style={{ backgroundColor: "#2A9D8F", color: "white", border: "none" }} type="submit">
                  수정 완료
                </Button>
              </div>
            </Form>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default ReviewEdit;