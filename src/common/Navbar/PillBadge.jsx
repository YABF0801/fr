import Badge from 'react-bootstrap/Badge';
import { usePropuestasContext } from '../../core/context/PopuestasContext';


// !Tipar la prop
// eslint-disable-next-line react/prop-types
function Pill({ id }) {

	const { queryPropuestas } = usePropuestasContext();

console.log(queryPropuestas.data)

  const count = queryPropuestas.data ? queryPropuestas.data.length : 0

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

export default Pill;