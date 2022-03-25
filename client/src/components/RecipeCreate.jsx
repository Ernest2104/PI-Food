import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipes, postRecipe, getDiets  } from '../actions';

export default function RecipeCreate() {
  const dispatch = useDispatch();
  //const recipes = useSelector(state => state.recipes);
  const diets = useSelector(state => state.diets);
  const [errors, setErrors] = useState('');
  const [input, setInput] = useState({
      title: "",
      summary: "",
      image: "",
      score: "",
      healthscore: "",
      steps: "",
      diets: []
  });

  useEffect(() => {
      dispatch(getRecipes());
  }, [dispatch])

  useEffect(() => {
      dispatch(getDiets());
  }, [dispatch])

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
  }

//   const handleSelect = (e) => {
//     e.preventDefault();
//     setInput({
//         ...input,
//         diets: [...input.diets, e.target.value]
//     })
//   }

//   const handleDeleteDiet = (dieta) => {
//     setInput({
//         ...input,
//         diets: input.diets.filter(d => d !== dieta)
//     })
//   }

  const handleCheck = (e) => {
        if (e.target.checked) {
            setInput({
            ...input,
            diets: [...input.diets, e.target.value]
            })
        } else if (!e.target.checked) {
            setInput({
                ...input,
                diets: input.diets.filter(d => d !== e.target.value)
            })
        }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postRecipe(input));
    alert('Receta creada con éxito');
    setInput({
        title: "",
        summary: "",
        image: "",
        score: "",
        healthscore: "",
        steps: "",
        diets: []
    })
  }

  return (
    <div>
        <h1>Creación de Receta</h1>
        <form onSubmit={e => handleSubmit(e)}>
        <p><label>Nombre: </label>
            <input type="text" value={input.title} name="title" onChange={handleChange} id="inputTitle"/></p>
        <p><label>Resumen: </label>
            <input type="text" value={input.summary} name="summary" onChange={handleChange}/></p>
        <p><label>Imagen: </label>
            <input type="text" value={input.image} name="image" onChange={handleChange}/></p>
        <p><label>Puntaje: </label>
            <input type="number" value={input.score} name="score" onChange={handleChange}/></p>
        <p><label>Puntos de Salud: </label>
            <input type="number" value={input.healthscore} name="healthscore" onChange={handleChange}/></p>

        <p><label>Paso a Paso: </label>
            <input type="text" value={input.steps} name="steps" onChange={handleChange}/></p>
        <p><label>Dietas: </label>
            {/*<select name="diet" onChange={e => handleSelect(e)}>*/}
                <ul>
                    {diets.map(d => {
                        return (
                        <li>
                       {/*} <option value={d.name}>{d.name}</option>*/}
                        <input type='checkbox' name={d.name} value={d.name} onChange={e => handleCheck(e)}></input>
                        <label>{d.name}</label>
                        </li>
                        )
                    })}
                </ul>
            {/*</select>*/}</p>
            {/*{input.diets.map(d => 
                            <li>
                                {d}<button type='button' onClick={() => handleDeleteDiet(d)}>x</button>
                            </li>
            )}*/}
            <Link to='/home'><button>Volver al Home</button></Link>
            <button>Crear Receta</button>
        </form>
    </div>
  )
}
