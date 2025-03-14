import React, { useState, useEffect } from 'react';
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
            const response = await axios.get(`http://localhost:5000/recommend?keyword=${keyword}`);
          setProducts(response.data); // Spring Boot API 응답 데이터 설정
          console.log(response.data);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            setError('추천 제품을 가져오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleButtonClick = (value) => {
        setKeyword(value);
        fetchRecommendations(value);
    };

    useEffect(() => {
        if (keyword) {
            fetchRecommendations(keyword);
        }
    }, [keyword]);

    return (
        <div>
            <h1>제품 목록</h1>
            <button onClick={() => handleButtonClick("비타민C")}>비타민C</button>
            <button onClick={() => handleButtonClick("오메가3")}>오메가3</button>
            <button onClick={() => handleButtonClick("프로바이오틱스")}>프로바이오틱스</button>
            {loading && <p>로딩 중...</p>}
            {error && <p>{error}</p>}
            <div>
                {products.length > 0 ? (
                    <ul>
                        {products.map((product, index) => (
                            <li key={index}>
                                <img src={product.image} alt={product.title} style={{ maxWidth: '100px' }} />
                                <h2>{product.title}</h2>
                                <p>가격: {product.price}</p>
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