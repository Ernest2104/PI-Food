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
    span {
      position: relative;
      left: -200px;
      padding: 7px;
      border: 2px solid salmon;
      font-weight: bold;
    }
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
const Paginated = ({ recipesPerPage, totalRecipes, pageNumber, handlePrevBtn, handleNextBtn, currentPage }) => {

  const pageNumbers = [];
  
  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);  
  }

  return (
    <Nav>
        <Paginado>
            <span>Página: {currentPage} de {pageNumbers.length}</span>
          	<li onClick={handlePrevBtn}>Ant</li>
            {pageNumber && pageNumbers.map(number => {
                return (
                    <li key={number} onClick={() => pageNumber(number)}>{number}</li>
                )
            })
            }
            <li onClick={handleNextBtn}>Sig</li>
        </Paginado>
    </Nav>
  )
};

export default Paginated;
