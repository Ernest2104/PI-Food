import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import background from '../Images/food.jpg'

const Body = styled.body`
  background: url(${background});
  height: 96vh;
  border: 15px solid orange;
  border-radius: 5px;
    
  h1 {
    color: black; 
    font-family: 'Dancing Script', cursive; 
    font-style: italic;
    text-shadow: black 0.1em 0.1em 0.2em;
    font-size: 100px; 
    font-weight: bold; 
    letter-spacing: 1px; 
    padding-top: 50px;
    position: relative;
    top: 30px;
  }

  button {
    margin-top: 60px;
    /* align-items: center; */
    /* appearance: none; */
    background-image: radial-gradient(100% 100% at 100% 0, #ff7e5f, #feb47b 100%);
    border: 0;
    border-radius: 6px;
    box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
    box-sizing: content-box;
    color: #000;
    cursor: pointer;
    font-family: 'Dancing Script', cursive;
    font-weight: bold;
    height: 65px;
    width: 150px;
    /* justify-content: center; */
    /* line-height: 1; */
    /* list-style: none; */
    /* overflow: hidden; */
    /* padding-left: 16px;
    padding-right: 16px; */
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: box-shadow .15s,transform .15s;
    /* user-select: none; */
    /* touch-action: manipulation; */
    /* white-space: nowrap; */
    /* will-change: box-shadow,transform; */
    font-size: 30px;
      :hover {
        box-shadow: #feb47b 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #ff7e5f 0 -3px 0 inset;
        transform: translateY(-2px);
      }
  }
`
export default function LandingPage() {
  return (
    <Body>
        <h1>Bienvenidos a mi Página de Recetas</h1>
        <Link to="/home" >
          <button>Ingresar</button>
        </Link>
    </Body>
  )
}
