import { DropdownButton } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { pastCirculosApiGet } from '../service/circulo.services';

const YearMenu = () => {
    const [years, setYears] = useState([]);

    useEffect(() => {
        const fetchYears = async () => {
          try {
            const data = await pastCirculosApiGet();
            const years = data.map((pastCirculo) => pastCirculo.year);
            setYears(years);
          } catch (error) {
            console.error(error);
          }
        };
        fetchYears();
      }, []);
    
      const handleYearSelection = (year) => {
        alert(`Año seleccionado: ${year}`);
      };

      return (
        <DropdownButton title="Histórico" id="year-historic">
          {years.map((year) => (
            <button
              type="button"
              key={year}
              className="btn mx-1 my-1 year-btn"
              onClick={() => handleYearSelection(year)}
            >
              {year}
            </button>
          ))}
        </DropdownButton>
      );
    };
    
        export default YearMenu;
        