import { useEffect, useState } from 'react';
import SpecialtyItem from './SpecialtyItem';
import _ from 'lodash';

function SpecialtyList({ doctors, specialties, setSpecialties }) {
  const [numbers, setNumbers] = useState([]);
  useEffect(() => {
    const allSpecialties = doctors?.map((doctor) => doctor.specialty);
    // .flatMap((str) => str.split(' ')); // wäre sinnvoll wenn die strings aus mehr als einem wort bestehen

    const uniqueSpecialties = _.uniq(allSpecialties);
    // uniqueSpecialties.forEach((specialty) => {
    //   if (specialty === undefined || null) {
    //     uniqueSpecialties.delete(specialty);
    //   }
    // });
    setSpecialties(uniqueSpecialties);
    console.log({ uniqueSpecialties });
    setNumbers(_.countBy(allSpecialties));
    console.log({ numbers });
  }, [doctors]);

  console.log({ specialties });
  return (
    <section className='specialty-list'>
      <h2>Specialty 😷</h2>
      <div className='list'>
        {specialties?.map((specialty, index) => (
          <SpecialtyItem
            key={index}
            specialty={specialty}
            number={numbers[specialty]}
          />
        ))}
      </div>
    </section>
  );
}

export default SpecialtyList;
