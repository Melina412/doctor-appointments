import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// nach der registrierung soll eine mail mit 6 digit code zur auth des users gesendet werden, erst dann kann man das profil erstellen (nicht fertig)

function Login({ setLogin, getLoginData }) {
  const userRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [register, setRegister] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);

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
        // localStorage.setItem('doctor-login', true);
        getLoginData();
        navigate('/dashboard');
      } else if (res.status === 401) {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function userRegister() {
    const newUser = {
      email: userRef.current.value,
      password: passwordRef.current.value,
    };

    // console.log({ newUser });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/auth/register`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(newUser),
        }
      );

      const response = await res.json();
      // console.log(response);

      if (res.ok) {
        userRef.current.value = '';
        passwordRef.current.value = '';
        setRegister(true);
        setLogin(true);
        // console.log(response.message);
      } else if (res.status === 400) {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogin = () => {
    userLogin();
  };

  const handleRegister = () => {
    userRegister();
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
        <p>(Login only for already registered users for now)</p>
      </div>

      {register ? (
        <p style={{ fontSize: '2rem' }}>register successful. please log in!</p>
      ) : (
        <div>
          <p>
            new user? enter your email & password above then click here to
            register:
          </p>
          <button onClick={handleRegister}>Sign up</button>
        </div>
      )}
    </section>
  );
}

export default Login;
