import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function printPokemonNameWithExclamation(pokemon) {
  console.log(pokemon.name + "!");
}
function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const pokemonUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";

  useEffect(() => {
    axios(pokemonUrl).then(async (result) => {
      const listOfPokemonNames = result.data.results;
      const listOfPokemonWithData = await getAllPokemonData(listOfPokemonNames);
      setAllPokemon(listOfPokemonWithData);
    });
  }, []);

  console.log("allPokemon", allPokemon);

  return (
    <div className="App">
      <div className="cardsContainer">
        {allPokemon.map((pokemon) => (
          <PokemonCard pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
const getAllPokemonData = async (listOfPokemonNames) => {
  const listOfPokemonWithData = [];
  for (let i = 0; i < listOfPokemonNames.length; i++) {
    const result = await axios(listOfPokemonNames[i].url);
    listOfPokemonWithData.push(result.data);
  }
  return listOfPokemonWithData;
};

const PokemonCard = (props) => {
  const [statsPokemon, setStatsPokemon] = useState(false);
  console.log(props.pokemon);

  const type = props.pokemon.types[0].type.name + "Type";
  var twoType;

  if (props.pokemon.types.length == 2) {
    twoType = props.pokemon.types[1].type.name + "Type";
  } else {
    twoType = props.pokemon.types[0].type.name + "Type";
  }

  if (statsPokemon == false) {
    return (
      <div
        className="pokemonCard"
        onClick={() => {
          setStatsPokemon(true);
        }}
      >
        <div>
          <strong>{props.pokemon.name}</strong>
        </div>
        <img src={props.pokemon.sprites.front_default} />
      </div>
    );
  } else {
    return (
      <div
        className={"pokemonCard " + type}
        onClick={() => {
          setStatsPokemon(false);
        }}
      >
        <div className={"topHalf " + type}></div>
        <div className={"bottomHalf " + twoType}></div>
        {props.pokemon.stats.map((pokemonStats) => (
          <div>
            {pokemonStats.stat.name} : {pokemonStats.base_stat}
          </div>
        ))}
      </div>
    );
  }
};

export default App;
