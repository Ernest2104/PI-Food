const { Router } = require('express');
const { Diet } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;
const json = require('./recipes.json')

const router = Router();

router.get('/', async (req, res) => {
    await Diet.findOrCreate({where: { name: 'All' }});
    //const dietsApi = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&offset=0&number=100`);
    //const diets = await dietsApi.data.results.map(d => d.diets)
    const diets = json.results.map(r => r.diets)
    const arrayDiets = diets.join().split(',');
    const filteredDiets = [...new Set(arrayDiets)]
    //const filteredDiets = arrayDiets.filter((d,p) => arrayDiets.indexOf(d) == p)
    //console.log(filteredDiets)
    
    filteredDiets.forEach(d => {
        if(d !== ""){
            Diet.findOrCreate({
                where: { name: d.replace(/\b\w/g, l => l.toUpperCase()) }
            })
        }
    })
    const allDiets = await Diet.findAll();
    res.send(allDiets);
});

// router.get('/', async (req,res) => {
//     const diets = ['All', 'Gluten Free', 'Ketogenic','Vegetarian','Lacto Vegetarian','Lacto Ovo Vegetarian',
//     'Vegan', 'Pescatarian', 'Paleolithic', 'Primal', 'Whole 30'];
//         diets.forEach(d => {
//             Diet.findOrCreate({
//                 where: { name: d }
//             })
//         })
//         const allDiets = await Diet.findAll();
//         res.send(allDiets);
// });

//---------------------------------------------------------
router.post('/', async (req, res) => {
    const { name } = req.body
    try {
        const diet = await Diet.create({
            name
        })
        res.status(200).send("Dieta creada con éxito");
    }catch(error) {
        res.status(500).send(error);
    }
})

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const { name } = req.body;
    try {
        await Diet.update({
            name: name },{
            where: { id: id }
        })
        res.send('Dieta actualizada!');
    } catch(error) {
        res.status(500).send(error);
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const dietFound = await Diet.findOne({
            where: { id: id }
        })
        console.log(dietFound)
        if (dietFound) {
            Diet.destroy({
                where: { id: id }
            })
            res.send('Dieta eliminada!')
        } else res.status(200).send('No existe la dieta');
    } catch(error) {
        res.status(500).send(error);
    }
})

module.exports = router;
