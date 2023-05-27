
import "./Spinners.scss";
import FadeLoader from "react-spinners/FadeLoader";

const SmallSpinner = ({color}) => {
    return (
      <div className="m-3 p-3">
      <FadeLoader
      color={color}
      height={5}
      width={5}
      radius={2}
      speedMultiplier={1}
      
    />
   </div>
// "#34848f"
)
}
export default SmallSpinner


