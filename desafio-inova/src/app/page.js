'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CharacterDetails from './components/CharacterDetails/page';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await axios.get('https://swapi.dev/api/people/');
      setCharacters(response.data.results);
      setLoading(false);  
    };

    fetchCharacters();
  }, []);

  // Filtro de pesquisa
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Router>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-center text-3xl font-bold mb-6">Star Wars Characters</h1>
        
        {/* Barra de pesquisa */}
        <input
          className="w-1/3 p-2 border rounded mb-6"
          type="text"
          placeholder="Search for a character..."
          value={search}
          onChange={handleSearch}/>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Utilizando o filtro para a pesquisa */}
            {filteredCharacters.map((character, index) => (
              <div
                key={index}
                className="relative p-4 border rounded-lg shadow-md bg-white text-center hover:bg-gray-200 transition">
                <Link to={`/character/${index}`} className="text-blue-500 hover:underline text-xl font-semibold">
                  {character.name}
                </Link>
                <div className="mt-4">
                  <img
                    src={`https://starwars-visualguide.com/assets/img/characters/${characters.findIndex(char => char.name === character.name) + 1}.jpg`}
                    alt={character.name}
                    className={`w-24 h-24 object-cover rounded-full mx-auto transition-transform duration-300 ease-in-out`}/>
                </div>
              </div>
            ))}
          </div>
        )}
        <Routes>
          <Route path="/character/:id" element={<CharacterDetails characters={characters} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
