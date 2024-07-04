import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../../scss/LoginRegister.scss';

// nach der registrierung soll eine mail mit 6 digit code zur auth des users gesendet werden, erst dann kann man das profil erstellen (nicht fertig)

function Login({ setLogin, getLoginData }) {
  const userRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  console.log({ location });
  console.log({ state });

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
    <section className='login-register'>
      <h1>Dashboard Login</h1>
      {state && <p className='feedback'>{state.feedback}</p>}

      <article>
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
            placeholder='your password'
            ref={passwordRef}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <button onClick={handleLogin}>Login</button>
        </div>

        <div className='method'>
          <p>
            No account yet? <Link to={'/register'}>Register now!</Link>
          </p>
        </div>
      </article>
    </section>
  );
}

export default Login;
