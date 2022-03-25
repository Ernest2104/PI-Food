import React from 'react';
import styled from 'styled-components';

const Body = styled.body`
    margin: 5px 15px;
    padding: 0px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    display: inline-block;
    img {
      width: 250px;
      margin-bottom: 0px;
    }
`    
const RecipeBox = styled.div`
  width: 250px;
  height: 300px;
  border: 2px solid lightgray;
  padding: 2px;
  background: beige;
  padding-bottom: 2rem;
  border-radius: 5px;
  box-shadow: -1px 2px 34px -13px rgba(0,0,0,1);
  text-align: left;
  overflow: hidden;
  h4 {
    color: #e74c3c;
    text-transform: uppercase;
    font-size: 1rem;
    margin-top: 0px;
  }
  h5 {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 0.77rem;
    letter-spacing: 1px;
    
  }
`
export default function RecipeCard({ image, title, diets, score }) {
  return (
    <Body>
        <RecipeBox>
          <span>
          <img src={image} alt='img'/>
          <h4>{title}</h4>
          <h5>Dietas: {diets}</h5>
          <h5>Score: {score}</h5>
          </span>
        </RecipeBox>
    </Body>
  )
}
