
import "./Spinners.scss";
import FadeLoader from "react-spinners/FadeLoader";

const SmallSpinner = ({color}) => {
    return (
      <FadeLoader
      color={color}
      height={5}
      width={5}
      radius={2}
      speedMultiplier={1}
      
    />
// "#34848f"
)
}
export default SmallSpinner


