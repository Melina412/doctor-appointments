import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// nach der registrierung soll eine mail mit 6 digit code zur auth des users gesendet werden, erst dann kann man das profil erstellen (nicht fertig)

function Login({ setLogin, getLoginData }) {
  const userRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function userLogin() {
    const user = {
      email: userRef.current.value,
      password: passwordRef.current.value,
    };

    // console.log({ user });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(user),
          credentials: 'include',
        }
      );

      const response = await res.json();
      // console.log(response);

      if (res.ok) {
        setLogin(true);
        getLoginData();
        navigate('/dashboard');
      } else if (res.status === 401) {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogin = () => {
    userLogin();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  };

  return (
    <section className='login'>
      <h1>Login</h1>

      <div>
        <div>
          <label htmlFor='email'>User</label>
          <input
            type='email'
            name='email'
            placeholder='your email'
            ref={userRef}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='password'
            ref={passwordRef}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button onClick={handleLogin}>Login</button>
        <p>No account yet?</p>
        <Link to={'/register'}>Register now!</Link>
      </div>

      {/* {register ? (
        <p style={{ fontSize: '2rem' }}>register successful. please log in!</p>
      ) : (
        <div>
          <p>
            new user? enter your email & password above then click here to
            register:
          </p>
          <button onClick={handleRegister}>Sign up</button>
        </div>
      )} */}
    </section>
  );
}

export default Login;
