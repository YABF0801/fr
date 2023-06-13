import { DropdownButton } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useCirculoContext } from '../context/CirculoContext';

const YearMenu = () => {
    const { queryPastCirculos } = useCirculoContext();

    const pastCirculos = queryPastCirculos.data ? queryPastCirculos.data : [];
    
    const [years, setYears] = useState([]);

    useEffect(() => {
        const fetchYears = async () => {
          try {
            const years = pastCirculos.map((pastCirculo) => pastCirculo.year);
            setYears(years);
          } catch (error) {
            console.error(error);
          }
        };
        fetchYears();
      }, [pastCirculos]);

       
       console.log(years)
       
      const handleYearSelection = (year) => {
        alert(`Año seleccionado: ${year}`);
      };

      return (
        <DropdownButton title="Histórico" id="year-historic">
          {years.length > 0 ? (
        years.map((year) => (
          <button
            type="button"
            key={year}
            className="btn mx-1 my-1 year-btn"
            onClick={() => handleYearSelection(year)}
          >
            {year}
          </button>
        ))
      ) : (
        <p className='text-center text-secondary'>No hay datos disponibles</p>
      )}
        </DropdownButton>
      );
    };
    
        export default YearMenu;
        