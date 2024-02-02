import './App.css';
import pokemon from "./pokemon.json";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr key={pokemon.id}>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(', ')}</td>
    <td>
      <button onClick={() => onSelect(pokemon)}>Select</button>
    </td>
  </tr>
);

PokemonRow.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  onSelect: PropTypes.func,
};

const PokemonInfo = ({ name, type, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      <tbody>
        <tr key={type}>
          <td>Type: {type.join(', ')}</td>
        </tr>
        {Object.keys(base).map((key) => (
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td>
          </tr>
        )
        )}
      </tbody>
    </table>
  </div>
);

PokemonInfo.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
    japanese: PropTypes.string.isRequired,
    chinese: PropTypes.string.isRequired,
    french: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,

  })
}

function App() {
  const [filter, filterSet] = useState("");
  const [selectedItem, selectedItemSet] = useState(null);

  return (
    <div
      style={{
        margin: "auto",
        width: 800,
        paddingTop: "1rem",
      }}
    >
      <h1 className="title">Pokemon Search</h1>
      <input 
        value={filter}
        onChange={(evt) => filterSet(evt.target.value)}
      />
      <div className="pokemon-table">
        <table width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {pokemon
            .filter((pokemon) =>
              pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
            .slice(0,20)
            .map(pokemon => (
              <PokemonRow 
                pokemon={pokemon}
                key={pokemon.id}
                onSelect={(pokemon) => selectedItemSet(pokemon)} 
              />
            ))}
          </tbody>
        </table>
        {selectedItem && ( <PokemonInfo {...selectedItem} /> )}
      </div>
    </div>
  );
} 

export default App;
