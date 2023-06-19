import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import { usePropuestasContext } from '../../core/context/PopuestasContext';

function Pill({ id }) {
  const [count, setCount] = useState(false);
	const { queryPropuestas } = usePropuestasContext();

	useEffect(() => {
    if (queryPropuestas.data && queryPropuestas.data.length) {
      setCount(queryPropuestas.data.length);
    }
	}, [queryPropuestas.data], );


  return (
    <div>
      <Badge
        pill
        id={ id }
        bg="danger"
        className='badge-notification translate-middle-y '>
       {count}
      </Badge>
    </div>
  );
}

Pill.propTypes = {
  id: PropTypes.string,
};

export default Pill;