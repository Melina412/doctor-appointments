import DoctorItem from './DoctorItem';

function DoctorsList({ doctors }) {
  return (
    <section className='doctors-list'>
      {doctors?.map((doctor, index) => (
        <DoctorItem key={index} doctor={doctor} />
      ))}
    </section>
  );
}

export default DoctorsList;
