import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'

const Header = ({isTokenExpired}) => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    //둘 중에 하나라도 있다면 로그인을 한 사람이니까 -> 로그아웃 버튼을 보여줘
    if(accessToken || refreshToken){
      setIsLoggedIn(true)
    }else{
      //로그아웃버튼은 안보이게 처리하기
      setIsLoggedIn(false)
    }
  },[isTokenExpired]) //false-> true,  true -> false 새로 렌더링이 일어난다.
  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("check")
    localStorage.removeItem("username")
    localStorage.removeItem("email")
    localStorage.removeItem("role")
    localStorage.removeItem("id")
    //로그아웃을 처리하고 나면 헤더가 새로고침 처리 - 로그아웃버튼이 사라지게 해줘
    //둘 중 하나인 경우 - false -> false일 때는 재조정이 일어나지 않음
    setIsLoggedIn(false)
    navigate("/login")
  }//end of handleLogout
    //아래 부분이 화면 처리부분
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/login" className='nav-link'>로그인</Link>
            <Link to="/schedule" className='nav-link'>스케쥴</Link>
            <Link to="/notices" className='nav-link'>공지사항</Link>
          </Nav>
          {isLoggedIn && (
            <button type='button' onClick={handleLogout}>로그아웃</button>
          )}
        </Container>
      </Navbar>    
    </>
  )
}

export default Header
/*
    페이지 이동시 href를 사용하면 URL이 변한다. 
    - 기존에 요청은 끊어지고 새로운 요청이 일어난다.:기존페이지가 쥐고 있던 데이터는 잃어버린다.
*/