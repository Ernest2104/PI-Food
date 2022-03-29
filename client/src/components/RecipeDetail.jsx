import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getRecipeDetail } from '../actions';
import styled from 'styled-components';
import loading from '../Images/cartoon-eat.gif'

const Body = styled.div`
  background: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
  height: 99vh;
  img {
    position: relative;
    top: 20px;
    border: 2px solid black;
    height: 300px;
    border-radius: 5px;
    box-shadow: 10px 5px 5px black;
  }
  h1 {
    color: #e74c3c;
    text-transform: uppercase;
    font-size: 30px;
    margin-top: 5px;
  }
  h3 {
    color: #e74c3c;
    text-transform: uppercase;
    font-size: 1.1rem;
    padding: 0.1rem 0 0.1rem 0;
    margin-top: 2px;
  }
  button {
    margin: 0px 0 10px 0;
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
const Cont1 = styled.div`
  border: 4px inset lightgray;
  margin: 20px;
  h4 {
    margin: 15px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 1px;
    text-align: justify;
  }
`
const Cont2 = styled.div`
  display: inline-block;
  position: relative;
  top: -100px;
  right: -50px;
  text-align: left;
`
export default function RecipeDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const myRecipeDetail = useSelector(state => state.detail);

  useEffect(() => {
    dispatch(getRecipeDetail(id))
  }, [dispatch, id])
  
  return (
    <>
        {
            myRecipeDetail.length > 0 ?
            <Body>
                <img src={myRecipeDetail[0].image} alt='img not found' />
                <Cont2>
                  <h1>{myRecipeDetail[0].title}</h1>
                  <h3>{typeof myRecipeDetail[0].diets[0] === 'object' ? (myRecipeDetail[0].diets.map(d => d.name)).toString().replace(/,/g," - ") : (myRecipeDetail[0].diets.map(d => d)).toString().replace(/,/g," - ")}</h3>
                  {myRecipeDetail[0].dishtypes && <h3>Tipos de Plato: {myRecipeDetail[0].createInDb ? null : (myRecipeDetail[0].dishtypes.map(d => d)).toString().replace(/,/g," - ")}</h3>}
                </Cont2>
                <Cont1>
                  <h4><b><u>Resumen:</u></b> {myRecipeDetail[0].summary.replace(/<[^>]+>/g, '')}</h4>
                  <h4><b><u>Puntuación:</u></b> {myRecipeDetail[0].score}</h4>
                  <h4><b><u>Nivel de Comida Saludable:</u></b> {myRecipeDetail[0].healthscore}</h4>
                  <h4><b><u>Instrucciones:</u></b> {myRecipeDetail[0].createInDb ? myRecipeDetail[0].steps : myRecipeDetail[0].steps.map(s => <p>{s}</p>)}</h4>
                </Cont1>
                <Link to='/home'>
                  <button>Home</button>
                </Link>
            </Body> : <img src={loading} style={{height:300, position: 'relative', top: '200px'}} alt="loading..." />

        }
    </>
  )
}
