import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipes, getDiets, cleanDetailRecipe, filterByDiet, filterByCreated, order } from '../actions';
import RecipeCard from '../components/RecipeCard';
import SearchBar from './SearchBar';
import Paginated from './Paginated';
import styled from 'styled-components';
import loading from '../Images/cartoon-eat.gif'

const Body = styled.div`
  background: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
  height: 100vh;
`
const Menu = styled.div`
  float: left;
  //position: fixed;
  margin-top: 15px;
  margin-left: 5px;
  min-height: 75vh;
  padding-top: 5px;
  background: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
  border: 1px solid black;
  border-radius: 5px;
`
const Title = styled.div`
  top: 0;
  position: sticky;
  background-color: #2c3e50;
  height: 80px;
  padding: 40px;
  margin-bottom: 1rem;
  h1 {
    margin-top: -30px;
    color: white;
    font-family: 'Dancing Script', cursive; 
    font-style: italic;
    font-size: 70px;
  }
`
const MenuButton = styled.div`
  font-size: 14px;
  font-style: normal;
  border-radius: 5px;
  border: 3px outset lightgray;
  height: 220px;
  margin: 10px;
  padding: 10px;
  button {
    margin: 10px 0 10px 0;
    background-image: linear-gradient(135deg, #f34079 40%, #fc894d);
    border: 0;
    border-radius: 15px;
    color: #fff;
    cursor: pointer;
    font-family: "Codec cold",sans-serif;
    font-size: 14px;
    font-weight: 700;
    height: 54px;
    width: 200px;
    justify-content: center;
    padding: 0 20px 0 20px;
    text-transform: uppercase;
    :hover {
      transform: scale(1.1);
      opacity: .75;
    }
  }
`
const Order = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    font-style: italic;
    border: 3px outset lightgray;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    top: 250px;
    fieldset {
        font-size: 14px;
        font-style: normal;
        border-radius: 5px;
        border-color: lightgoldenrodyellow;
        height: 70px;
        display: grid;
        margin: 10px 0 10px 0;
    }
    legend {
        font-size: 14px;
        font-weight: bold;
    }
`
const Filter = styled.div`
    border: 3px outset lightgray;
    border-radius: 5px;
    //position: static;
    padding: 10px;
    margin: 10px;
    font-family: Arial, Helvetica, sans-serif;
    font-style: italic;
    border-radius: 10px;
    p {
        font-size: 17px;
    }
    fieldset {
        border-radius: 5px;
        border-color: lightgoldenrodyellow;
        margin: 5px 10px 5px 10px;
    }
    legend {
        font-size: 14px;
        font-style: normal;
        font-weight: bold;
    }
    select {
        background: beige;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-weight: bold;
        height: 29px;
        overflow: hidden;
        width: 200px;
    }
`
export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector(state => state.recipes);
  const allDiets = useSelector(state => state.diets);
  const [orden, setOrden] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, SetRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  
  const pages = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getRecipes());
    return () => {
      dispatch(cleanDetailRecipe())
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDiets())  
  }, [dispatch]);
  
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getRecipes());
    setCurrentPage(1);
  }

  const handlePrevBtn = () => {
    if (currentPage !== 1)
    setCurrentPage(currentPage - 1)
  }

  const handleNextBtn = () => {
    if (currentPage !== Math.ceil(allRecipes.length / recipesPerPage)) {
        setCurrentPage(currentPage + 1)
    }
  }

  const filterDiet = (e) => {
    e.preventDefault();
    dispatch(filterByDiet(e.target.value));
    setCurrentPage(1);
  }

  const filterCreate = (e) => {
    e.preventDefault();
    dispatch(filterByCreated(e.target.value));
    setCurrentPage(1);
  }

  const reset = () => {
    document.getElementById('asc_title').checked = false
    document.getElementById('desc_title').checked = false
    document.getElementById('asc_score').checked = false
    document.getElementById('desc_score').checked = false
    document.getElementById('selectCreated').value = 'all'
    document.getElementById('selectDiets').value = 'All'
  }
  
  const resetOrderingsFilters = () => {
    reset();
    dispatch(getRecipes());
  }

  const handleSort = (e) => {
    dispatch(order(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
    setCurrentPage(1);
  }

  return (
    <Body>
        <Title>
          <h1>The Food SPA</h1>
          <SearchBar />
        </Title>
        <Menu>
        <Filter>
        <fieldset>
        <legend>Origen:</legend>
          <select id='selectCreated' onChange={e => filterCreate(e)}>
            <option value='all'>Todos</option>
            <option value='api'>Api</option>
            <option value='created'>Base de Datos</option>
          </select>
        </fieldset>

        <fieldset>
        <legend>Dietas:</legend>
          <select id='selectDiets' onChange={e => filterDiet(e)}>
            {
              allDiets && allDiets.map(d => {
                return (
                  <>
                    <option value={d.name}>{d.name}</option>
                  </>
                )
              })
            }
          </select>
        </fieldset>
        </Filter>
        <Order>
        <fieldset onChange={(e) => handleSort(e)}>
            <legend>Nombre</legend>
            <label>
                <input id='asc_title' type='radio' value='asc_title' name='order'/>A-Z
            </label>
            <label>
                <input id='desc_title' type='radio' value='desc_title' name='order'/>Z-A
            </label>
        </fieldset>
        <fieldset onChange={(e) => handleSort(e)}>
            <legend>Puntaje</legend>
            <label>
                <input id='asc_score' type='radio' value='asc_score' name='order'/>Menor a Mayor
            </label>
            <label>
                <input id='desc_score' type='radio' value='desc_score' name='order'/>Mayor a Menor
            </label>
        </fieldset>
        </Order>
      
        <MenuButton>
          <Link to='/recipes'><button>Crear Receta</button></Link><br/>
          <button onClick={e => handleClick(e)}>Cargar Todas</button><br/>
          <button onClick={resetOrderingsFilters}>Limpiar Filtros</button>
        </MenuButton>

        </Menu>
        
        <Paginated recipesPerPage={recipesPerPage} totalRecipes={allRecipes.length} pageNumber={pages} handlePrevBtn={handlePrevBtn} handleNextBtn={handleNextBtn} currentPage={currentPage}/>
        <>
        {
          currentRecipes.length > 0 ? currentRecipes.map(r => {
            return (
              <>
                <Link to={'/home/'+ r.id} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                  <RecipeCard 
                    image={r.image}
                    title={r.title}
                    score={r.score}
                    diets={ typeof r.diets[0] === 'object' ? (r.diets.map(d => d.name)).toString().replace(/,/g," - ") : (r.diets.map(d => d)).toString().replace(/,/g," - ")} >
                  </RecipeCard>
                </Link>
              </>
            )
          }) : <img src={loading} style={{height:300, position: 'relative', top: '200px'}} alt="loading..." />
        }
        </>
    </Body>
  )
}
