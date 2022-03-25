import { GET_RECIPES, GET_DIETS, GET_RECIPE_NAME, GET_RECIPE_DETAIL, CLEAN_DETAIL_RECIPE, FILTER_BY_DIET, FILTER_BY_CREATED, ORDER } from "../actions";

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case CLEAN_DETAIL_RECIPE:
        return {
            ...state,
            detail: []
        }
                
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload   
            }
        case GET_RECIPE_NAME:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case 'POST_RECIPE':
            return {
                ...state
            }
                    
        case FILTER_BY_DIET:
            const allRecipes = state.allRecipes;
            console.log(allRecipes)
            const filteredDiet = allRecipes.filter(r => typeof r.diets[0] !== 'object' ? r.diets.includes(action.payload) : r.diets.some(d => d.name.includes(action.payload)));
            console.log(filteredDiet)
            return {
                ...state,
                recipes: filteredDiet.length > 0 ? filteredDiet : state.allRecipes
            }
        case FILTER_BY_CREATED:
            const allRecipes2 = state.allRecipes;
            const filteredCreate = action.payload === 'create' ? allRecipes2.filter(r => r.createInDb) : allRecipes2.filter(r => !r.createInDb);
            return {
                ...state,
                recipes: action.payload === 'all' ? state.allRecipes : filteredCreate
            }
        case ORDER:
            let sortedRecipes;
            if (action.payload === 'asc_title') {
                sortedRecipes = state.recipes.sort((a, b) => {
                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return 1;
                    }
                    if (b.title.toLowerCase() > a.title.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                })
            } 
            if (action.payload === 'desc_title') {
                sortedRecipes = state.recipes.sort((a, b) => {
                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return -1;
                    }
                    if (b.title.toLowerCase() > a.title.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                })
            }
            if (action.payload === 'asc_score') {
                sortedRecipes = state.recipes.sort((a, b) => {
                    if (a.score > b.score) {
                        return 1;
                    }
                    if (b.score > a.score) {
                        return -1;
                    }
                    return 0;
                })
            } 
            if (action.payload === 'desc_score') {
                sortedRecipes = state.recipes.sort((a, b) => {
                    if (a.score > b.score) {
                        return -1;
                    }
                    if (b.score > a.score) {
                        return 1;
                    }
                    return 0;
                })
            }
            return {
                ...state,
                recipes: sortedRecipes
            }

        default:
            return {
            ...state
            }
    }
}

export default rootReducer;