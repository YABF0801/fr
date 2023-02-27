import { SubmisionProvider } from "../GeneralList/context/SumisionContext";
import SubmisionWizardForm from "./components/SubmisionWizard";

const NewSubmision = () => {
	return (
		<div className='submision-form'>
			<SubmisionProvider>
				<SubmisionWizardForm />
			</SubmisionProvider>
		</div>
	);
};

export default NewSubmision;