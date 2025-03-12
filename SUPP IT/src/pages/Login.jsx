import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.data.token);
      alert("로그인 성공!");
      navigate("/products"); // 로그인 후 제품 리스트 페이지로 이동
    } catch (error) {
      alert("로그인 실패: " + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="이메일" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;
