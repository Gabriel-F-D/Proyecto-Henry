import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AddDoggo.module.css';

function AddDoggo() {
    const fetch = require('node-fetch')
    const [nuevoPerro, setNuevoPerro] = useState({
        nombre: "",
        alturaMin: "",
        alturaMax: "",
        pesoMin: "",
        pesoMax: "",
        años: "",
        humores: [],
    })

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: nuevoPerro.nombre,
                altura: `${nuevoPerro.alturaMin} - ${nuevoPerro.alturaMax}`,
                peso: `${nuevoPerro.pesoMin} - ${nuevoPerro.pesoMax}`,
                humores: nuevoPerro.humores
            })
        })
        const data = await response.json()
        console.log(data)
        alert('Doggo created')
        setNuevoPerro({
            nombre: "",
            alturaMin: "",
            alturaMax: "",
            pesoMin: "",
            pesoMax: "",
            años: "",
            humores: [],
        })
    }

    const handleChange = (e) => {

        setNuevoPerro({
            ...nuevoPerro,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeTemp = (e) => {
        if (nuevoPerro.humores.includes(e.target.value)) {
            setNuevoPerro({
                ...nuevoPerro,
                humores: nuevoPerro.humores.filter(humor => humor !== e.target.value)
            })
        }
        else {
            setNuevoPerro({
                ...nuevoPerro,
                humores: [...nuevoPerro.humores, e.target.value]
            })
        }
    }

    return (
        <div className={styles.cajita}>

            <Link to='/home' className={styles.a}>
                <button onClick="window.location.reload()">Return</button>
            </Link>



            <form onSubmit={handleSubmit} className={styles.form}>

                <div className={styles.cajaLabels}>

                <label>
                    Nombre
                    <input className={styles.input} type="text" name="nombre" onChange={(e) => handleChange(e)} value={nuevoPerro.nombre} required />
                </label>

                <label>
                    Altura (cm)
                    <input className={styles.input} type="number" id={styles.alturaMin} name="alturaMin" placeholder='min' onChange={(e) => handleChange(e)} value={nuevoPerro.alturaMin} required />
                    <input className={styles.input} type="number" id={styles.alturaMax} name="alturaMax" placeholder='max' onChange={(e) => handleChange(e)} value={nuevoPerro.alturaMax} required />
                </label>

                <label>
                    Peso (kg)
                    <input className={styles.input} type="number" id={styles.alturaMin} name="pesoMin" placeholder='min' onChange={(e) => handleChange(e)} value={nuevoPerro.pesoMin} required />
                    <input className={styles.input} type="number" id={styles.alturaMax} name="pesoMax" placeholder='max' onChange={(e) => handleChange(e)} value={nuevoPerro.pesoMax} required />
                </label>

                <label>
                    Años
                    <input className={styles.input} type="number" name="años" placeholder='years expected' onChange={(e) => handleChange(e)} value={nuevoPerro.años} />
                </label>

                <div className={styles.check}>

                    <input type='checkbox' onChange={handleChangeTemp} name='Happy' value='Happy' />Happy
                    <input type='checkbox' onChange={handleChangeTemp} name='Friendly' value='Friendly' />Friendly
                    <input type='checkbox' onChange={handleChangeTemp} name='Wild' value='Wild' />Wild
                    <input type='checkbox' onChange={handleChangeTemp} name='Loyal' value='Loyal' />Loyal
                    <input type='checkbox' onChange={handleChangeTemp} name='Brave' value='Brave' />Brave
                    <input type='checkbox' onChange={handleChangeTemp} name='Gentle' value='Gentle' />Gentle


                </div>

                </div>

                <button className={styles.button} type="submit">Add Doggo</button>

            </form>


        </div>
    )
}

export default AddDoggo
