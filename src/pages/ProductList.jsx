import React, { useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRecommendations = async (keyword) => {
        setLoading(true);
        setError(null);
        try {
            // Spring Boot 서버로 직접 요청 (포트 8000 사용)
            const response = await axios.get(`http://localhost:8000/api/recommend?keyword=${keyword}`);
            setProducts(response.data);
            console.log("받은 데이터:", response.data);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(`에러 코드: ${error.response.status}, 메시지: ${error.response.data}`);
            } else {
                setError('추천 제품을 가져오는 중 오류가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleButtonClick = (value) => {
        setKeyword(value);
        fetchRecommendations(value);
    };

    return (
        <div>
            <h1>제품 목록</h1>
            <button onClick={() => handleButtonClick("비타민C")}>비타민C</button>
            <button onClick={() => handleButtonClick("비타민K")}>비타민K</button>
            <button onClick={() => handleButtonClick("비타민D")}>비타민D</button>

            {loading && <p>로딩 중...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                {products.length > 0 ? (
                    <ul>
                        {products.map((product, index) => (
                            <li key={index}>
                                <img src={product.image} alt={product.title} style={{ maxWidth: '100px' }} />
                                <h2>{product.title}</h2>
                                <p>가격: {product.lprice || "가격 정보 없음"}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && !error && <p>추천 제품이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;