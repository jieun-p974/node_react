import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/User_action';
import { useNavigate } from 'react-router-dom';
// import { Axios } from "axios";

function RegisterPage(props) {
    let navigate = useNavigate();

    const dispatch = useDispatch()
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    // 입력이 가능하게 하는 코드
    const onEmailHandler = (event)=>{
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event)=>{
        setName(event.currentTarget.value)
    }
    const onPasswordHandler = (event)=>{
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event)=>{
        setConfirmPassword(event.currentTarget.value)
    }
    
    const onSubmitHandler = (event)=>{
        event.preventDefault();
        // 비밀번호와 비밀번호 확인이 같은지 확인
        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인이 같아야 합니다.')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }
        // 회원가입 버튼 실행(Axios 사용시)
        // Axios.post('/api/users/register',body)

        dispatch(registerUser(body))
            .then(response=>{
                if(response.payload.success){
                    navigate('/login')
                }else{
                    alert('Failed to sign up')
                }
            })
    }

    return (
        <div style={{
            display: "flex", justifyContent:"center", alignItems:"center",
            width:"100%", height:"100vh"
        }}>
            <form 
                style={{display:"flex", flexDirection:"column"}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}/>
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                
                <br/>
                <button type="submit">
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default RegisterPage