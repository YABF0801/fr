import Dropdown from 'react-bootstrap/Dropdown';
import ModalBase from '../../../../common/Modal/Modal';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

// import { DateRangePicker } from "@tremor/react";

const DateRangePicker = () => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const handleDateChange = (dates) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
	};

	return (
		<div className='date-range-picker'>
			<DatePicker
				id='datePicker-export'
				selected={startDate}
				onChange={handleDateChange}
                startDate={startDate}
				endDate={endDate}
				dateFormat='dd/MM/yyyy'
				className='form-control '
				placeholderText='Seleccione fecha '
                selectsRange
                inline 
			/>


		</div>
	);
};

function ExportBtn({ handleExport }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	return (
		<>
			<Dropdown>
				<Dropdown.Toggle className='btn export-btn' id='dropdown-export' drop='down-centered'>
					Exportar
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item onClick={openModal}>Fecha</Dropdown.Item>
					<Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item onClick={handleExport}>Todo</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>

			<ModalBase
				show={isModalOpen}
				className='text-center '
				ModalBody={
					<>
						<div className='m-5'>
							<DateRangePicker />
						</div>
					
                        {/* <DateRangePicker className="max-w-sm mx-auto" /> */}

						<a className='btn export-btn m-3'>Exportar</a>
					</>
				}
				onHide={() => setIsModalOpen(false)}
			/>
		</>
	);
}

export default ExportBtn;
