const URL = `https://api.thedogapi.com/v1/breeds`
const fetch = require("node-fetch");
const { Temperamento } = require("./src/db")

async function tempDb () {
    const response = await fetch(URL);
    const tempApi = await response.json();
    const temperamentos = []
    tempApi.forEach((ta) => {
        if (ta.temperament) {
            const palabra = ta.temperament.split(', ')
            temperamentos.push(...palabra)
        }
    });
    const tempClean = new Set(temperamentos) 
    tempClean.forEach(temperamentos => {
        Temperamento.create({Nombre: temperamentos})
    }) 
}
module.exports = tempDb;