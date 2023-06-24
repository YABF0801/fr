import PropTypes from 'prop-types';
import { Step, Stepper } from "react-form-stepper";

export function CustomStepper({activeStep, steps}) {
    return (
        <Stepper
        activeStep={activeStep}
        steps={steps.map((step) => (
            <Step
                key={step.label}
                label={step.label}
                style={{ height: '2.5em', width: '2.5em' }}
                // data-tooltip-id='tooltip'
				// data-tooltip-content={step.tooltip}
            ></Step>
        ))}
            
        connectorStateColors={true}
        connectorStyleConfig={{
            completedColor: '#589aac',
            activeColor: '#589aac',
            disabledColor: '#eee',
        }}
        styleConfig={{
            activeBgColor: '#a08a41ea',
            completedBgColor: '#589aac',
            inactiveBgColor: '#eee',
            activeTextColor: '#f3f3f3',
            completedTextColor: '#f3f3f3',
            inactiveTextColor: '#444',
        }}
    />
    );
  }

  CustomStepper.propTypes = {
    activeStep: PropTypes.number,
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,}))
  };