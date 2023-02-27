import './styles/Notfound.scss';

const NotFound = () => {
	return (
		<div className='page-404'>
			<div className='outer'>
				<div className='middle'>
					<div className='inner'>
						<div className='inner-circle'>
							<i className='bi bi-exclamation-diamond-fill'></i>
							<span>404</span>
						</div>
						<span className='inner-status'>Ups! Estás perdido</span>
						<span className='inner-detail'>
							No podemos encontrar la página <br></br>
							<br></br>
							<a
								href='/'
								className='btn btn-info mtl'
							>
								<i className='bi bi-house'></i>&nbsp; Inicio
							</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
