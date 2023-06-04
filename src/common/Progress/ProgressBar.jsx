import { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';

const Progress = ({ id, label }) => {
	const [progress, setProgress] = useState(0);
    
	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prevProgress) => {
				if (prevProgress === 100) {
					clearInterval(interval);
					return prevProgress;
				}
				return prevProgress + 2;
			});
		}, 30);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
    <div className="progress-wrapper">
    <ProgressBar
			id={id}
      animated
			className="custom-progress bg-c-blue text-center m-5" variant="custom"
			now={progress}
		/>
    <div className="progress-text">{`${label} ` + ` ${progress}%`}</div>
  </div>

		
	);
};

export default Progress;
