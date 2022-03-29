import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
//import { getRecipeName } from '../actions';
import { searchByName } from '../actions/index'
import styled from 'styled-components';

const Bar = styled.div`
  margin-top: -30px;
  input[type='search'] {
    background: transparent;
    border: 1px solid whitesmoke;
    letter-spacing: 1px;
    width: 15%;
    padding: 0.4rem;
    color: whitesmoke;
    //position: relative;
  }
  label {
    background: transparent;
    letter-spacing: 1px;
    color: crimson;
    font-size: larger;
    font-weight: bold;
    position: absolute;
    left: 480px;
    
  }
  button {
    color:whitesmoke;
    border: solid 2px #e74c3c;
    background: transparent;
    padding: 0.4rem 0.6rem;
    border-radius: 2px;
    font-size: 0.8rem;
    text-transform: uppercase;
    font-weight: 500;
    margin-left: 0.5rem;
    cursor: pointer;
    :hover {
      background: crimson;
    }
  }
`

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('')

  const handleInputChange = (e) => {
    e.preventDefault();
    document.getElementById('message').hidden = true;
    setName(e.target.value);
  }
  
  const handleSubmit = (e) => {
      e.preventDefault()
      if (name !== ''){
        //document.getElementById('message').hidden = true;
        //document.getElementById('message').value = ''
        dispatch(searchByName(name));
        setName('')
      } else {
        document.getElementById('message').hidden = false;
        document.getElementById('message').innerText = '¡Debe ingresar un nombre!'
        document.getElementById('inputName').focus();
      }
  }

  return (
    <Bar>
        <label id='message' hidden />
        <input id='inputName' type='search' onChange={handleInputChange} value={name}/>
        <button type='submit' onClick={handleSubmit}>Buscar</button>
    </Bar>
  )
}
