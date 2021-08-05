import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
    const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName]=useState("");
  const [ConfirmPassword, setConfirmPassword]=useState("");

  const onEmailHandler=(e)=>{
    setEmail(e.currentTarget.value);
  }
  const onPasswordHandler=(e)=>{
    setPassword(e.currentTarget.value);
  }
  const onNameHandler=(e)=>{
    setName(e.currentTarget.value);
  }
  const onConfirmPasswordHandler=(e)=>{
    setConfirmPassword(e.currentTarget.value);
  }

  const onSubmitHandler=(e)=>{
    e.preventDefault();
    console.log('Email: ', Email);
    console.log('Name: ', Name);
    console.log('Password: ', Password);
    console.log('ConfirmPassword: ', ConfirmPassword);

    if(Password!==ConfirmPassword){
        return alert('Please check your password!');
    }

    let body={
      email: Email,
      password: Password,
      name: Name
    }

    dispatch(registerUser(body))
    .then(response => {
        console.log(response.payload.success);
        console.log(response.payload.register);
      if(response.payload.success){
        props.history.push('/');
      } else{
        alert('Fail to Register OR Error');
      }
    }) 
  }
    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center',
            width:'100%', 'height':'100vh', backgroundColor:'#777799'
          }}>
            <form style={{
              display:'flex', flexDirection:'column'
            }}
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
                           
            <br />
            <button type="submit">
              Register
            </button>
            </form>
          </div>
    )
}

export default withRouter(RegisterPage);
