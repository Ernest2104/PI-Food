const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const axios = require('axios');
const { API_KEY } = process.env;
const json = require('./recipes.json')

const router = Router();

const getApiRecipesInfo = /*async*/ () => {
    //const apiRecipesURL = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=d9b037550d6d40d08dee7ee760e1ab12&addRecipeInformation=true&offset=0&number=100');
    //const apiRecipesURL = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&offset=0&number=100`);
    //const apiRecipesInfo = await apiRecipesURL.data.results.map(r => {
    const apiRecipesInfo = json.results.map(r => {
        return {
            id: r.id,
            title: r.title,
            image: r.image,
            score: r.spoonacularScore,
            healthscore: r.healthScore,
            dishtypes: r.dishTypes.map(dt => dt.replace(/\b\w/g, l => l.toUpperCase())),
            diets: r.diets.map(d => d.replace(/\b\w/g, l => l.toUpperCase())),
            summary: r.summary,
            steps: r.analyzedInstructions.flatMap(i => i.steps).map(s => ` ${s.number} - ${s.step}`)
        }
    })
    return apiRecipesInfo;
};

const getBdRecipesInfo = async () => {
    return (
        await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        })
    )
};

getAllRecipes = async () => {
    const apiInfo = await getApiRecipesInfo();
    const dbInfo = await getBdRecipesInfo();
    const infoTotal = [...apiInfo, ...dbInfo];
    return infoTotal;
}

router.get('/', async (req, res) => {
    const { name } = req.query;
    try{
        const recipes = await getAllRecipes();
        if (name) {
            const recipeName = recipes.filter(r => r.title.toLowerCase().includes(name.toLowerCase()));
            recipeName.length ? res.status(200).send(recipeName) : res.status(404).send('No se encontró receta');
        }
        else res.status(200).send(recipes);
    } catch(error){
        res.status(500).send(error);
    }
})

router.post('/', async (req, res) => {
    const { title, summary, image, score, healthscore, diets, steps, createInBd } = req.body
    try {
        const recipeCreated = await Recipe.create({
            title,
            summary,
            image,
            score,
            healthscore,
            steps,
            createInBd
        })
        const dietsBd = await Diet.findAll({
            where: { name: diets }
        })
        recipeCreated.addDiet(dietsBd);
        res.status(200).send('Receta creada con exito!!');
    }catch(error){
        res.status(500).send(error);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try{
        const recipes = await getAllRecipes();
        if (id) {
            const recipeId = recipes.filter(r => r.id == id);
            recipeId.length ? res.status(200).send(recipeId) : res.send('No se encontró receta');
        }
    }catch(error){
        res.status(500).send(error);
    }
});

module.exports = router;