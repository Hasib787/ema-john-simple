import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';


function Login() {
  const [newUser, setNewUser] = useState(false)

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const fbSignIn = () =>{
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true);
    })
  } 


  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false);
    })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }

  const handleBlur = (event) => {
    let isFromValid = true;
    if (event.target.name === 'email') {
      isFromValid = /^\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const isPasswordNumber = /\d{1}/.test(event.target.value);
      isFromValid = isPasswordValid && isPasswordNumber;
    }
    if (isFromValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res =>{
        handleResponse(res, true);

      })
    }

    if (!newUser && user.email && user.password) {
        signInWithEmailAndPassword(user.email, user.password)
        .then(res =>{
          handleResponse(res, true);
        })
    }
    event.preventDefault();
  }



  return (
    <div style={{ textAlign: 'center' }}>

      <h1>Firebase Auth</h1>

      {
        user.isSignedIn ? <button onClick={signOut}>Sign out</button>
          : <button onClick={googleSignIn}>Sign in</button>
      }
      <br />
      <button onClick={fbSignIn}>Sing in using Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your Email {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h2>Our own Authentication</h2>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your name" />}
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Enter Your Email" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password" required />
        <br />
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>}

    </div>
  );
}

export default Login;
