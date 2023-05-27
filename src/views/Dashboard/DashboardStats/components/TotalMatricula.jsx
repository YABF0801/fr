import SmallSpinner from '../../../../common/Spinners/smallSpinner'
import useTotalMatricula from '../hooks/useTotalMatricula'

const TotalMatricula = () => {

  const { queryCapacityAndMatricula, queryTotalBoysAndGirls } = useTotalMatricula()

  return (
    <>
      <div className='row  justify-content-evenly'>
        <div className='col-md-3 col-xl-3'>
          <div className='card bg-c-yellow order-card'>
            <div className='card-block'>
              <h5 className='m-b-10'>Total de Matriculados</h5>
              <h1 className='text-center display-1'>
                <span>
                  { !queryCapacityAndMatricula.isLoading ?
                    (
                      queryCapacityAndMatricula.data.Matricula
                    ) : (
                      <SmallSpinner color={'white'}/>
                    )
                  }
                </span>
              </h1>
            </div>
          </div>
        </div>

        <div className='col-md-3 col-xl-3'>
          <div className='card bg-c-pink order-card'>
            <div className='card-block'>
              <h5 className='m-b-10'>Total de Capacidades</h5>
              <h1 className='text-center display-1'>
                <span>

                  { !queryCapacityAndMatricula.isLoading ?
                    (
                      queryCapacityAndMatricula.data.NormedCapacity
                    ) : (
                      <SmallSpinner color={'white'}/>
                    )
                  }
                </span>
              </h1>
            </div>
          </div>
        </div>

        <div className='col-md-3 col-xl-3'>
          <div className='card bg-c-green order-card'>
            <div className='card-block'>
              <h5 className='m-b-10'>Total de Niñas</h5>
              <h1 className='text-center display-1'>
                <span>{
                  queryTotalBoysAndGirls.isLoading ?
                    (
                      <SmallSpinner color={'white'}/>
                    ) :
                    (
                      queryTotalBoysAndGirls.data.totalGirls
                    )
                }</span>
              </h1>
            </div>
          </div>
        </div>

        <div className='col-md-3 col-xl-3'>
          <div className='card bg-c-blue order-card'>
            <div className='card-block'>
              <h5 className='m-b-10'>Total de Niños</h5>
              <h1 className='text-center display-1'>
                <span >{
                  queryTotalBoysAndGirls.isLoading ?
                    (
                      <SmallSpinner color={'white'}/>
                    ) :
                    (
                      queryTotalBoysAndGirls.data.totalBoys
                    )
                }</span>
              </h1>
            </div>
          </div>
        </div>

      </div >
    </>

  )
}

export default TotalMatricula