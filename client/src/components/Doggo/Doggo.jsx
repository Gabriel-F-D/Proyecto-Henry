import React from 'react'
import { useParams } from 'react-router-dom'
import useDogosApi from '../../hooks/useDogosApi'
import { Link } from 'react-router-dom'
import styles from '../Doggo/Doggo.module.css'

const Doggo = () => {
  const { id } = useParams();
  const { data, isLoading } = useDogosApi(`/dogs/${id}`, true);
  console.log(data)
  if (isLoading) {
    return (
      <h1>Loading</h1>
    )
  }

  return (
    <div className={styles.detailImg}>

      <div className={styles.containerFlex}>

        <img src={data.imagen ?
          data.imagen : "https://www.pngitem.com/pimgs/m/95-952226_imagenes-de-snoopy-png-transparent-png.png"
        } className={styles.dogImg}  width='300' height='300' alt={data.nombre} />

        <div className={styles.dogName}><h4>Breed/Name: {data.nombre}</h4></div>
        <div className={styles.dogHeight}><h6>Heigth: {data.altura}</h6></div> 
        <div className={styles.dogWeight}><h6>Weight: {data.peso}</h6></div>
        <div className={styles.dogLifespan}><h6>Lifespan: {data.años}</h6></div>
        <h6>Moods:</h6>
        
          {/* // Array.isArray(data.temperamentos) ? data.temperamentos.map(t => <span>{t.Nombre}</span>) : <span>{data.temperamentos}</span> */}
          <span>{Array.isArray(data.temperamentos) ? data.temperamentos.map(t => t.Nombre).join(', ') : data.temperamentos}</span>
        


      </div>

      <Link to='/home'>
        <button>HomePage</button>
      </Link>


    </div>
  )
}

export default Doggo
