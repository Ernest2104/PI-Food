import { GET_RECIPES, GET_DIETS, GET_RECIPE_NAME, GET_RECIPE_DETAIL, CLEAN_DETAIL_RECIPE, FILTER_BY_DIET, FILTER_BY_CREATED, ORDER, SEARCH_BY_NAME } from "../actions";

const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: [],
    message: ''
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
        //--------------------------------------
        case SEARCH_BY_NAME:
            const allRecipes3 = state.allRecipes;
            const searchName = allRecipes3.filter(r => r.title.toLowerCase().includes(action.payload.toLowerCase()));
            return {
                ...state,
                message: searchName.length === 0 && alert('¡No existe receta!'),
                recipes: searchName.length > 0 ? searchName : state.allRecipes
            }
        //--------------------------------------            
        case FILTER_BY_DIET:
            const allRecipes = state.allRecipes;
            const filteredDiet = action.payload === 'All' ? state.allRecipes : allRecipes.filter(r => typeof r.diets[0] !== 'object' ? r.diets.includes(action.payload) : r.diets.some(d => d.name.includes(action.payload)));
            const messageNoDiets = () => {
                document.getElementById('selectDiets').value = 'All'
                alert('¡No existen recetas para esa dieta!');
            }
            return {
                ...state,
                message: filteredDiet.length === 0 && messageNoDiets(),
                recipes: filteredDiet.length > 0 ? filteredDiet : state.allRecipes
            }

        case FILTER_BY_CREATED:
            const allRecipes2 = state.allRecipes;
            let createFiltered = [];
            if (action.payload === 'all') {
                createFiltered = state.allRecipes;
            } else if (action.payload === 'created') {
                createFiltered = allRecipes2.filter(r => r.createInDb)
            } else createFiltered = allRecipes2.filter(r => !r.createInDb);
            const returnMessageCreated = () => {
                document.getElementById('selectCreated').value = 'all';
                alert('¡No existes recetas en la base de datos!');
            }
            return {
                ...state,
                message: createFiltered.length === 0 && returnMessageCreated(),
                recipes: createFiltered.length > 0 ? createFiltered : state.allRecipes
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