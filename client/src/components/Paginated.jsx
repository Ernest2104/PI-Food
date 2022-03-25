import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
    text-align: right;
    margin-right: 100px;
`
const Paginado = styled.ul`
    //display: inline-block;
    padding: 0;
    margin-top: -10px;
    cursor: pointer;
    font-weight: lighter;
    li {
        display: inline-block;
        border: 1.5px solid black;
	      padding: 7px 15px;
	      color: black;
	      background: antiquewhite;
      }
       li:active {
        background:black;
	      font-weight:bold;
      }
      li:hover {
        background:salmon;
      }
`
const Paginated = ({ recipesPerPage, totalRecipes, pageNumber }) => {

  const pageNumbers = [];
  
  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);  
  }

  return (
    <Nav>
        <Paginado>
            {pageNumber && pageNumbers.map(number => {
                return (
                    <li key={number} onClick={() => pageNumber(number)}>{number}</li>
                )
            })
            }
        </Paginado>
    </Nav>
  )
};

export default Paginated;
