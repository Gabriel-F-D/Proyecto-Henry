import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../LosDoggos/LosDoggos.module.css'


function LosDoggos({ data }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [saveData, setSaveData] = useState([]);
    // const [fltrTemp, setFltrTemp] = useState('');
    const [filtros, setFiltros] = useState({
        temperamento: '',
        creator: '',
        search: ''
    });


    useEffect(() => {
        if (typeof (data === 'object')) {
            setSaveData(data);
        }
        if (filtros.temperamento || filtros.creator || filtros.search) {
            filtered()
        }

    }, [data, filtros])


    // export function sortCreate(state, creator){
    //     if(creator === "Api"){
    //       return state.filter(p => !(isNaN(p.id)))
    //     } else if(creator === "Own"){                    //para el sort de api y db
    //       return state.filter(p => isNaN(p.id))
    //     } else {
    //       return state
    //     }
    //   }

    // arrData = arrData.filter(sDtaF => sDtaF.temperamentos?.includes(filtros.temperamento))


    // if (filtros.temperamento) {                  //solo sirve para el filtro de DB
    //     if (filtros.creator === 'DB') {
    //         Array.isArray(arrData.temperamentos) ? arrData = arrData.temperamentos.filter(dbT => dbT.Nombre.includes(filtros.temperamento))
    //         : arrData = arrData.filter(sDtaF => sDtaF.temperamentos?.includes(filtros.temperamento))
    //     }
    // }


    const filtered = () => {
        let arrData = [...data]
        if (filtros.temperamento) {
            arrData = arrData.filter(sDtaF => {
                if (Array.isArray(sDtaF.temperamentos)) {
                    let include = false;
                    sDtaF.temperamentos.forEach(temp => {
                        if (temp.Nombre === filtros.temperamento) include = true;
                    })
                    return include;
                } else {
                    return sDtaF.temperamentos?.includes(filtros.temperamento)
                }
            })
        }


        // if (filtros.temperamento) {
        //     Array.isArray(arrData.temperamentos) ? arrData = arrData.temperamentos.filter(dbT => dbT.Nombre.includes(filtros.temperamento))
        //     : arrData = arrData.filter(sDtaF => sDtaF.temperamentos?.includes(filtros.temperamento))
        // }
        if (filtros.creator) {
            arrData = filtros.creator === 'api' ?
                arrData.filter(sDtaF => !isNaN(sDtaF.id))
                : arrData.filter(sDtaF => isNaN(sDtaF.id))
        }
        if (filtros.search) {
            arrData = arrData.filter(sDtaF => sDtaF.nombre.toLowerCase().includes(filtros.search.toLowerCase()))
        }

        setSaveData(arrData)
    }

    const doggosPerPage = () => {
        return saveData.slice(currentPage, currentPage + 8)
    }

    const nextPage = () => {
        if (doggosPerPage().length) {
            setCurrentPage(currentPage + 8)
        }
    }

    const prevPage = () => {
        if (doggosPerPage().length) {
            setCurrentPage(currentPage - 8)
        }
    }

    const menorMayor = () => {
        setCurrentPage(0)
        let arrSort = saveData.sort(function (a, b) {
            if (a.nombre > b.nombre) {
                return 1;
            }
            if (a.nombre < b.nombre) {
                return -1;
            }

            return 0;
        })
        setSaveData([...arrSort])
    }

    const mayorMenor = () => {
        setCurrentPage(0)
        let arr = saveData.sort(function (a, b) {
            if (a.nombre > b.nombre) {
                return -1;
            }
            if (a.nombre < b.nombre) {
                return 1;
            }

            return 0;
        })
        setSaveData([...arr])
    }

    const weightAsc = () => {
        setCurrentPage(0)
        let sortedW = saveData.sort(function (a, b) {
            if (a.peso[0] > b.peso[0]) {
                return 1;
            }
            if (a.peso[0] < b.peso[0]) {
                return -1;
            }

            return 0;
        })
        setSaveData([...sortedW])
    }

    const weightDesc = () => {
        setCurrentPage(0)
        let sortedW2 = saveData.sort(function (a, b) {
            if (a.peso[0] > b.peso[0]) {
                return -1;
            }
            if (a.peso[0] < b.peso[0]) {
                return 1;
            }

            return 0;
        })
        setSaveData([...sortedW2])
    }

    const onSearchChange = ({ target }) => {
        setCurrentPage(0);
        setFiltros({
            ...filtros,
            search: target.value
        });
    }

    const onSelectChange = (event) => {
        setCurrentPage(0)
        setFiltros({
            ...filtros,
            temperamento: event.target.value
        })
    }

    const onSortChange = (event) => {
        setCurrentPage(0)
        setFiltros({
            ...filtros,
            creator: event.target.value
        })
    }

    //boton filtro api/db
    //traer perros despues de crear 
    //

    return (

        <div className={styles.content}>


            <div className={styles.navBar}>

                <div className={styles.search}>
                    <Link to='/'>

                    <img src='../img/dog.png' className={styles.logito} />
                    </Link>
                    <input
                        className={styles.inputStilito}
                        type="text"
                        placeholder="Search Doggo"
                        value={filtros.search}
                        onChange={onSearchChange}
                    />
                    <Link to='/createDoggo' style={{ textDecoration: 'none' }} className={styles.createSt}>
                        Create your doggo
                    </Link>

                </div>


                <div className={styles.paginitas}>

                    <button onClick={prevPage}
                        disabled={currentPage === 0}
                        style ={currentPage === 0 ? {display: 'none'} : {}}
                        className={styles.botones}
                    > Prev
                    </button>
                    <button onClick={nextPage}
                        className={styles.botones}
                    >Next</button>

                </div>


                <div className={styles.btnFiltros}>

                    <div>

                        <button onClick={menorMayor} className={styles.botones}>a-z</button>
                        <button onClick={mayorMenor} className={styles.botones}>z-a</button>

                    </div>

                    <div>

                        <button onClick={weightDesc} className={styles.botones}>Weight(asc)</button>
                        <button onClick={weightAsc} className={styles.botones}>Weight(desc)</button>


                    </div>

                </div>


            </div>

            <label for="moods" style={{color: 'white'}}>Filter by Moods:</label>
            <select onChange={onSelectChange}
                name='moods'>
                <option value='' checked> </option>
                <option value='Playful'>Playful</option>
                <option value='Active'>Active</option>
                <option value='Wild'>Wild</option>
                <option value='Loyal'>Loyal</option>
                <option value='Brave'>Brave</option>
                <option value='Gentle'>Gentle</option>

            </select>


            <label for="origin" style={{color: 'white'}}>Filter by origin:</label>
            <select onChange={onSortChange}
                value={filtros.creator}
                name='origin'>
                <option value='' checked> </option>
                <option value='api'>Api</option>
                <option value='dataB'>DB</option>

            </select>


            <div className={styles.containerFlex}>
                {
                    doggosPerPage().length? (

                        doggosPerPage().map(dogo =>
                            <div className={styles.doggoContainer}>
                                <h2 className={styles.doggoName}>Breed: {dogo.nombre}</h2>
                                <div className={styles.doggoImg} > <img src={dogo.img ?
                                    dogo.img : "https://www.pngitem.com/pimgs/m/95-952226_imagenes-de-snoopy-png-transparent-png.png"} /> </div>
                                <h5>Moods:</h5>
                                <span>{Array.isArray(dogo.temperamentos) ? dogo.temperamentos.map(t => t.Nombre).join(', ') : dogo.temperamentos}</span>
                                <Link to={`/doggoDetail/${dogo.id}`} style={{ textDecoration: 'none' }} >
                                    <div className={styles.doggoDetail}><button className={styles.buttonDetail}>Doggo details</button></div>
                                </Link>
                            </div>
                        )


                    ) : (
                        <h1 style={{color: 'white'}}>Doggo lost for ever</h1>
                    )
                }

            </div>
        </div>
    )
}

export default LosDoggos;