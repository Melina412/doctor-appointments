import { Link } from 'react-router-dom';

function DoctorItem({ doctor }) {
  // console.log(doctor._id)
  return (
    <div className='doctor-item'>
      <Link to={`/doctor/details/${doctor._id}`}>
        <div className='avatar-container'>
          <img src={doctor.avatar} alt='avatar image' />
        </div>
        <h1>{doctor.name}</h1>
        <h2>{doctor.specialty}</h2>
        <p>
          ⭐️ <span className='rating'>rating</span> (reviews)
        </p>
      </Link>
    </div>
  );
}

export default DoctorItem;
