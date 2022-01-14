import React,{useEffect} from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../../../_actions/User_action';
import { useDispatch } from 'react-redux';

function LandingPage() {
    // 로그아웃 버튼
    //useDispatch를 사용해서 로그아웃 액션을 실행한다
    //useDispatch와 logout 액션이 두가지 필요하다
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const onClickHandler = ()=>{
        dispatch(logoutUser())
            .then((response)=>{
                console.log(response);
                if(response.payload.success){
                    navigate('/login')
                }else{
                    alert('Failed to logout')
                }
            }).catch((err)=>console.log(err));
    }    

    return (
        <div style={{
            display: "flex", justifyContent:"center", alignItems:"center",
            width:"100%", height:"100vh"
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage