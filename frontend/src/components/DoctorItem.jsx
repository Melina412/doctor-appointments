function DoctorItem({ doctor }) {
  return (
    <div className='doctor-item'>
      <div className='avatar-container'>
        <img src={doctor.avatar} alt='avatar image' />
      </div>
      <h1>{doctor.name}</h1>
      <h2>{doctor.specialty}</h2>
      <p>
        ⭐️ <span className='rating'>rating</span> (reviews)
      </p>
    </div>
  );
}

export default DoctorItem;
