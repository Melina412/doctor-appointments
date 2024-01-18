import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setLoginData }) {
  const userRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  // const [loginData, setLoginData] = useState(null);

  const handleLogin = () => {
    userLogin();
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
        setLoginData(response.data);
        console.log('user data', response.data);
        // navigate('/dashboard');
      } else if (res.status === 401) {
        console.error(response.message);
      }
    } catch (error) {
      console.error(response.message, error);
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
    </section>
  );
}

export default Login;
