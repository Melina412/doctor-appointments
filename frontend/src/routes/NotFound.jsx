import { Link } from 'react-router-dom';
function NotFound() {
  return (
    <section>
      <div className='not-found'>
        <h1>404</h1>
        <p>Page not found</p>
        <Link to='/'>Home</Link>
      </div>
    </section>
  );
}

export default NotFound;
