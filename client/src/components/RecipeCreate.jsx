import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipes, postRecipe, getDiets  } from '../actions';
import styled from 'styled-components';
import receta from '../Images/receta-de-cocina.png';
import ingredientes from '../Images/food-ingredient.png';

const Body = styled.div`
  background: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
  height: 96vh;
  margin: 0;
  padding: 5px;
  border: 10px solid salmon;
  border-radius: 5px;
  h1 {
    font-family: 'Dancing Script', cursive; 
    font-style: italic;
    font-size: 70px;
    margin: 10px
  }
  button {
    margin: 0px 10px 10px 0;
    background-image: linear-gradient(135deg, #f34079 40%, #fc894d);
    border: 0;
    border-radius: 15px;
    color: #fff;
    cursor: pointer;
    font-family: "Codec cold",sans-serif;
    font-size: 14px;
    font-weight: 700;
    height: 45px;
    width: 150px;
    text-transform: uppercase;
    :hover {
      transform: scale(1.1);
      opacity: .75;
    }
  }
`
const Image1 = styled.img`
    position: absolute;
    top: 180px;
    left: 250px;
    width: 400px;
`
const Error = styled.p`
    font-size: 13px;
    font-weight: bold;
    color: red;
`
const Image2 = styled.img`
    position: absolute;
    top: 150px;
    right: 250px;
    width: 400px;
`
const Cont1 = styled.div`
    margin-left: auto;
    margin-right: auto;
    padding: 15px 20px;
    background-color: transparent;
    text-align: left;
    display: inline-table;
    border: 1px solid lightgray;
    border-radius: 10px;
    width: 500px;
    div{
        padding: 10px;
        }
    label {
        border: solid 2px salmon;
        background: transparent;
        padding: 0.2rem 0.6rem;
        font-size: 14px;
        text-align: left;
        width: auto;
        float: left;
        margin: .1em .7em 0 0;
        border-radius: 3px;
        font-size: 0.8rem;
        text-transform: uppercase;
        font-weight: 500;
    }
    input[type='text'], input[type='number'], textarea {
        background: transparent;
        border: 1.5px solid whitesmoke;
        padding: 0.4rem;
        width: 65%;
        resize: none;
        letter-spacing: 1px;
        color: black;
    }
`
const Cont2 = styled.div`
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    padding: 5px 20px;
    background-color: transparent;
    border: 3px outset lightgray;
    border-radius: 10px;
    width: 500px;
    height: 150px;
    text-align: center;
    label {
        border: solid 2px salmon;
        background: transparent;
        padding: 0.4rem 0.6rem;
        border-radius: 2px;
        font-size: 0.8rem;
        text-transform: uppercase;
        font-weight: 500;
    }
    ul {
        list-style-type: none;
        margin: 10px;
        padding: 5px;
        overflow: hidden;
        li {
            float: left;
            //display:inline-block;
            padding-left:3px;
            padding-right:3px;
            margin: 5px;
        span {
            font-size: 0.8rem;
            text-transform: uppercase;
            font-weight: 500;
        }
    }
}
`
const validateInput = (input) => {
    let errors = {};
    if (!input.title) {
        errors.title = '¡Se requiere nombre!';
    } 
    else if (/^([0-9])*$/.test(input.title)){
        errors.title = '¡Solo caracteres!'
    }
    
    if (!input.summary) {
        errors.summary = '¡Se debe ingresar resumen!'
    }
    
    if (!input.score) {
        errors.score = '¡Se debe ingresar el puntaje!'
    }
    else if (!/^[0-9]+([.])?([0-9]+)?$/.test(input.score)){
        errors.score = '¡Solo números!'
    }
    else if(input.score < 0 || input.score > 100){
        errors.score = '¡El máximo puntaje es 100!'
    }

    if (!input.healthscore) {
        errors.healthscore = '¡Se debe ingresar el puntaje de salud!'
    }
    else if (!/^[0-9]+([.])?([0-9]+)?$/.test(input.healthscore)){
        errors.healthscore = '¡Solo números!'
    }
    else if(input.healthscore < 0 || input.healthscore > 100){
        errors.healthscore = '¡El máximo puntaje es 100!'
    }
  
    return errors;
}

export default function RecipeCreate() {
  const dispatch = useDispatch();
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
    setErrors(validateInput({
        ...input,
        [e.target.name]: e.target.value
    }))
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

  const checkedFalse = () => {
    const inputs = document.getElementsByTagName('input'); //Rescatamos controles tipo Input
    for (let i=0; i < inputs.length; i++) {//Ejecutamos y recorremos los controles
        if (inputs[i].type === "checkbox") inputs[i].checked = false; // Si el input es CheckBox se aplica la funcion ActivarCasilla
    }
  }

  document.addEventListener('keypress', event => {
    // Si el evento NO es una tecla Enter
    if (event.key !== 'Enter') return;
    const element = event.target;
    // Si el evento NO fue lanzado por un elemento con class "focusNext"
    if (!element.classList.contains('focusNext')) return;
    // Encontrar el siguiente
    const tabIndex = element.tabIndex + 1;
    const next = document.querySelector('[tabindex="'+tabIndex+'"]');
    // Si encontramos un elemento
    if (next) next.focus();
      //event.preventDefault();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postRecipe(input));
    checkedFalse();
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
    <Body>
        <h1>Creación de Receta</h1>
        <form onSubmit={e => handleSubmit(e)}>
            <Image1 src={receta} alt='img' />
            <Image2 src={ingredientes} alt='img' />
            <Cont1>
            <div><label>Nombre: </label>
                <input autoFocus type="text" id="inputTitle" value={input.title} name="title" onChange={handleChange} class="focusNext" tabIndex='1'/></div>
                {errors.title && <Error>{errors.title}</Error>}
            <div><label>Resumen: </label>
                <textarea id="inputSummary" value={input.summary} name="summary" onChange={handleChange} cols='40' rows='3' class="focusNext" tabIndex='2'/></div>
                {errors.summary && <Error>{errors.summary}</Error>}
            <div><label>Imagen: </label>
                <input type="text" value={input.image} name="image" onChange={handleChange} class="focusNext" tabIndex='3' /></div>
            <div><label>Puntaje: </label>
                <input type="number" value={input.score} name="score" onChange={handleChange} class="focusNext" tabIndex='4'/></div>
                {errors.score && <Error>{errors.score}</Error>}
            <div><label>Puntos de Salud: </label>
                <input type="number" value={input.healthscore} name="healthscore" onChange={handleChange} class="focusNext" tabIndex='5'/></div>
                {errors.healthscore && <Error>{errors.healthscore}</Error>}
            <div><label>Paso a Paso: </label>
                <textarea type="text" value={input.steps} name="steps" onChange={handleChange} cols='40' rows='4' class="focusNext" tabIndex='6'/></div>
            </Cont1>
            <Cont2>
            <p><label>Dietas: </label>
                <ul>
                    {diets.map(d => {
                        return (
                        d.name !== 'All' &&
                        <li>
                            <input id='types' type='checkbox' name={d.name} value={d.name} onChange={e => handleCheck(e)}></input>
                            <span>{d.name}</span>
                        </li>
                        )
                    })}
                </ul></p>
            </Cont2>
            <button
                type="submit"
                disabled={
                    !input.title || !input.summary || !input.score || !input.healthscore || !input.diets.length ? true : false
                }>Crear Receta!
            </button>
            <Link to='/home'><button>Volver al Home</button></Link>
        </form>
    </Body>
  )
}
