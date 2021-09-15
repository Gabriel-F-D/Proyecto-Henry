const { Router } = require('express');
const fetch = require("node-fetch");
// const axios = require('axios');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Raza } = require('../db.js')
const { Temperamento } = require('../db.js')

const router = Router();
const key = 'efea8f29-cdb2-4070-879e-e01670f96ae6';
const URL = `https://api.thedogapi.com/v1/breeds`;

router.post('/', async (req, res) => {
    const { nombre, altura, peso, humores } = req.body;
 
    const response = await Raza.create({
        nombre,
        altura,
        peso,
    })
    humores.forEach (async humor => {
       const humorFinded = await Temperamento.findOne({ //instancia de temperamentos
            where: {
                Nombre : humor
            }
            
        })
        response.addTemperamento(humorFinded)
    });
     // aca va el modelo del temperamento a añadir
    res.json(response);
})


router.get('/dogs', async (req, res) => {
    // Obtener un listado de las razas de perros
    // Tiene que devolver solo los datos necesarios para la ruta principal
    //pasar el query a lowerCase anted del if 
    if (req.query.name) {
        const perro = await Raza.findAll({
            where: {
                nombre: req.query.name
            },
            include: Temperamento
        })
        // console.log('entro query')
        if (perro.length > 0) {
            res.json(perro);
        } else if (perro.length === 0) {
            const responseApi = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${req.query.name}`);
            const dogo = await responseApi.json()
            if (dogo.length > 0) {
                res.json(dogo)
            } else {
                res.status(404).json({ msg: 'no lo cuidaste,se perdio' })
            }
        } else {
            res.status(404).json({ msg: 'no lo cuidaste,se perdio' })
        }
    } else {
        let todos =[]
        const dogosDb = await Raza.findAll({
            include: Temperamento
        })
        const response = await fetch(URL + `?api_key=${key}`);
        const data = await response.json();
        const doggos = data.map((l) => {
            const doggo = {
                id: l.id,
                img: l.image.url,
                nombre: l.name,
                temperamentos: l.temperament,
                peso: l.weight.metric,
            }
            return doggo;
        })
        todos = dogosDb.concat(doggos)
        res.json(todos)
    }
})



//:idRaza
router.get('/dogs/:idRaza', async (req, res) => {
    /* [ ] Los campos mostrados en la ruta principal para esta raza (imagen, nombre y temperamento)
     [ ] Altura
     [ ] Peso
     [ ] Años de vida
     */
    const { idRaza } = req.params
    
    if (isNaN(idRaza)) {
       const dogosByIdR = await Raza.findOne({ 
           where: { id: idRaza},
           include: Temperamento
       })
       res.json(dogosByIdR)
    }

    else  {
        const response = await fetch(`https://api.thedogapi.com/v1/breeds/${idRaza}`);
        const data = await response.json();
        if (data.length === 0) return res.json({msg:'dogo muerto'})
        const perro = {
            nombre: data.name,
            altura: data.height.metric,
            peso: data.weight.metric,
            años: data.life_span,
            temperamentos: data.temperament,
            refImg: data.reference_image_id,
        }
        const imgRef = await fetch(`https://api.thedogapi.com/v1/images/${perro.refImg}?api_key=${key}`)
        const {url} = await imgRef.json()
        console.log(url)
        perro.imagen = url;
        return res.json(perro)
    } 
    // return res.json(dogosByIdR)
})

router.get('/temperament', async (req, res) => {
    const tempDg = await Temperamento.findAll()
    res.json(tempDg)
})


module.exports = router;
