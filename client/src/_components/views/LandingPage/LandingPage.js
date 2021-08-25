import React, {useEffect} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function LandingPage(props) {
  useEffect(() => {
    axios.get('/api/hello')
    .then(res=>console.log(res.data));
  }, [])

  const registerHandler=()=>{
    props.history.push("/register");
  }
  const loginHandler=()=>{
    axios.get('/api/users/auth')
    .then(res=>{
      console.log(res);
      if(res.data.isAuth){
        alert('이미 로그인 상태입니다.');
      }
      else{
        props.history.push("/login");
      }
    })
  }
  const logoutHandler=()=>{
    axios.get('/api/users/logout')
    .then(res=>{
      console.log(res);
      if(res.data.success){
        alert('로그아웃하였습니다.');
      }
      else{
        alert('로그아웃에 실패했습니다.');
      }
    });
  }

  return (
    <div style={{
      display:'flex', justifyContent:'center', alignItems:'center',
      width:'100%', 'height':'100vh', backgroundColor:'#777799'
    }}>
      <h2>시작 페이지</h2>
      <button onClick={registerHandler}>
        회원가입
      </button>
      <button onClick={loginHandler}>
        로그인
      </button>
      <button onClick={logoutHandler}>
        로그아웃
      </button>
    </div>
  )
}

export default withRouter(LandingPage);