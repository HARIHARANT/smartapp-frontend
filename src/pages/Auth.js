import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useNavigate
  } from "react-router-dom";
import HttpService from '../util/HttpService';


function Auth(){
  import('../auth.css');
    
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [emailError, setemailError] = useState("");
  const navigate = useNavigate();
  
  const handleValidation = (event) => {
    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setemailError("Email Not Valid");
      return false;
    } else {
      setemailError("");
      formIsValid = true;
    }

    if (!password.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    let validateSts = handleValidation();
    console.log(`sts: ${validateSts}`);
    if (validateSts) {

      console.log(`email:${email} password:${password}`);
      let usersCreate = await HttpService(`login`, 'POST', {
        "password": password,
        "email": email
      },"Live");
      console.log(usersCreate)
      if(usersCreate.status == 200){
        console.log(usersCreate.data.data.token);
        localStorage.setItem('_token', usersCreate.data.data.token);
        localStorage.setItem('email', usersCreate.data.data.email);
        localStorage.setItem('userId', usersCreate.data.data.userId);
        navigate('/');
        
      }
    }
  };
  
  const [signUpUserName, setSignUpUserName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpUserNameError, setSignUpUserNameError] = useState("");
  const [signUpPasswordError, setSignUppasswordError] = useState("");
  const [signUpEmailError, setSignUpEmailError] = useState("");

  const handleValidationSignUp = (event) => {
    let formIsValid = true;
    console.log("signUpUserName:: "+signUpUserName);
    debugger;
    if(!signUpUserName){
        formIsValid = false;
        setSignUpUserNameError("Username is Empty");
        return false;
    }else{
        formIsValid = true;
        setSignUpUserNameError("");
    }

    if (!signUpEmail.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      setSignUpEmailError("Email Not Valid");
      return false;
    } else {
        setSignUpEmailError("");
      formIsValid = true;
    }

    if (!signUpPassword.match(/^[a-zA-Z]{8,22}$/)) {
      formIsValid = false;
      setSignUppasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
        setSignUppasswordError("");
      formIsValid = true;
    }

    return formIsValid;
  };

  const signUpSubmit = async (e) => {
    e.preventDefault();
    let validateSts = handleValidationSignUp();
    console.log(`sts: ${validateSts}`);
    if (validateSts) {

      console.log(`username: ${signUpUserName} email:${signUpEmail} password:${signUpPassword}`);
      let usersCreate = await HttpService(`signup`, 'POST', {
        "password": signUpPassword,
        "email": signUpEmail,
        "name":signUpUserName
      },"Live");

      if(usersCreate.status === 201){
        var btnSts = confirm("User created successfully!");
        if(btnSts){
            setSignUpPassword("");
            setSignUpEmail("");
            setSignUpUserName("");
        }
      }else if(usersCreate.data.errorCode == "USER_EXISTS"){
        confirm(usersCreate.data.message);
      }else{
        confirm("Technical error occurred");
      }
      console.log(usersCreate)
    }
  };

  return (
        <div className="main">  	
		    <input type="checkbox" id="chk" aria-hidden="true"/>
            <div className="signup">
				<form onSubmit={signUpSubmit}>
					<label htmlFor="chk" aria-hidden="true">Sign up</label>
					<input type="text" name="txt" placeholder="User name" required=""
                    value={signUpUserName}
                    onChange={(event) => setSignUpUserName(event.target.value)}
                    />
                    <small id="emailHelp" className="text-danger form-text">
                        {signUpUserNameError}
                    </small>
					<input type="email" name="email" placeholder="Email" required=""
                    value={setSignUpEmail}
                    onChange={(event) => setSignUpEmail(event.target.value)}
                    />
                    <small id="emailHelp" className="text-danger form-text">
                        {signUpEmailError}
                    </small>
					<input type="password" name="pswd" placeholder="Password" required=""
                    value={signUpPassword}
                    onChange={(event) => setSignUpPassword(event.target.value)}
                    />
                    <small id="emailHelp" className="text-danger form-text">
                        {signUpPasswordError}
                    </small>
					<button>Sign up</button>
				</form>
			</div>
            <div className="login">
                <form onSubmit={loginSubmit}>
                    <label htmlFor="chk" aria-hidden="true">Login</label>
                    <input type="email" name="email" placeholder="Email" required="" 
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}/>
                    <small id="emailHelp" className="text-danger form-text">
                        {emailError}
                    </small>
					<input type="password" name="pswd" placeholder="Password" required=""
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />
                    <small id="passworderror" className="text-danger form-text">
                        {passwordError}
                    </small>
					<button>Login</button>                    
                </form>
            </div>
        </div>        
      );
}

export default Auth;