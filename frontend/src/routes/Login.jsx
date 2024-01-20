import { useEffect, useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { LoginContext } from '../context/LoginContext';

function Login({ setLogin, getLoginData }) {
  const userRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  // const { loginData, setLoginData } = useContext(LoginContext);

  const [register, setRegister] = useState(false);

  const handleLogin = () => {
    userLogin();
  };
  const handleRegister = () => {
    userRegister();
  };

  async function userLogin() {
    const user = {
      email: userRef.current.value,
      password: passwordRef.current.value,
    };

    console.log({ user });

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
      console.log(response);

      if (res.ok) {
        localStorage.setItem('doctor-login', true);
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

    console.log({ newUser });

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
      console.log(response);

      if (res.ok) {
        userRef.current.value = '';
        passwordRef.current.value = '';
        setRegister(true);
        console.log(response.message);
      } else if (res.status === 400) {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

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
          />
        </div>

        <button onClick={handleLogin}>Login</button>
      </div>
      {register ? (
        <p>register successful. please log in!</p>
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
