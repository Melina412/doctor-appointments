import SpecialtyItem from './SpecialtyItem';

function SpecialtyList({ specialties }) {
  return (
    <section>
      <p>specialty list</p>

      {specialties?.map((specialty, index) => (
        <SpecialtyItem key={index} specialty={specialty} />
      ))}
    </section>
  );
}

export default SpecialtyList;
