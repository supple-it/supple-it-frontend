// src/pages/Auth/ChangePassword.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { changePassword } from '../../services/api';
import Header from '../../components/include/Header';
import Footer from '../../components/include/Footer';

const ChangePassword = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 로그인 상태 확인
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login');
      return;
    }
    setIsAuthenticated(true);
  }, [navigate]);

  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    // 최소 8자, 숫자와 특수문자 포함 필수
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    // 입력값 검증
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }
    
    if (!validatePassword(newPassword)) {
      setError('비밀번호는 8자 이상이며, 숫자와 특수문자를 포함해야 합니다.');
      return;
    }
    
    try {
      setLoading(true);
      
      // 백엔드 API 호출 - 비밀번호 변경
      const response = await changePassword(oldPassword, newPassword);
      
      if (response.data.success) {
        setSuccess(true);
        // 필드 초기화
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        
        // 3초 후 마이페이지로 이동
        setTimeout(() => {
          navigate('/mypage');
        }, 3000);
      } else {
        setError(response.data.message || '비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
      setError(error.response?.data?.message || '서버와의 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // 인증되지 않은 경우 렌더링하지 않음
  }

  return (
    <>
      <Header />
      <Container style={{ marginTop: '100px', maxWidth: '600px' }}>
        <Card className="p-4 shadow-lg">
          <Card.Body>
            <h2 className="text-center mb-4" style={{ color: '#2A9D8F', fontWeight: 'bold' }}>
              비밀번호 변경
            </h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
              <Alert variant="success">
                비밀번호가 성공적으로 변경되었습니다. 잠시 후 마이페이지로 이동합니다.
              </Alert>
            )}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>현재 비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="현재 비밀번호를 입력하세요"
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>새 비밀번호</Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="새 비밀번호를 입력하세요"
                  required
                />
                <Form.Text className="text-muted">
                  비밀번호는 8자 이상, 숫자와 특수문자를 포함해야 합니다.
                </Form.Text>
              </Form.Group>
              
              <Form.Group className="mb-4">
                <Form.Label>새 비밀번호 확인</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="새 비밀번호를 다시 입력하세요"
                  required
                />
              </Form.Group>
              
              <div className="d-flex justify-content-between">
                <Button
                  variant="secondary"
                  onClick={() => navigate('/mypage')}
                  disabled={loading}
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  style={{ backgroundColor: '#2A9D8F', border: 'none' }}
                  disabled={loading}
                >
                  {loading ? '처리 중...' : '비밀번호 변경'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default ChangePassword;