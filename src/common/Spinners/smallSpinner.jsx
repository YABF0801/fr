
import "./Spinners.scss";
import FadeLoader from "react-spinners/FadeLoader";

const SmallSpinner = ({color, className}) => {
    return (
      <>
        <FadeLoader
        className={className}
        color={color || 'white'}
        height={5}
        width={5}
        radius={2}
        speedMultiplier={1} />

        <h6 className='text-center'>Buscando datos...</h6>
      </>
// "#34848f"
)
}
export default SmallSpinner


