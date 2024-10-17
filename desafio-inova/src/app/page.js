'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {

  // Função para Buscar todos os personagens
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
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-1/3">
        <h1 className="text-center text-2xl font-bold mb-4">Star Wars Characters</h1>
        <input
          className="w-full p-2 border rounded mb-4"
          type="text"
          placeholder="Pesquise o nome do personagem..."
          value={search}
          onChange={handleSearch}
        />
        {loading ? (
          <p className="text-center">Carregando...</p>
        ) : (
          <ul className="list-disc pl-5">


            {/* Utilizando Filtro */}
            {filteredCharacters.map((character, index) => (
              <li key={index} className="mb-2">

                {/* Link Para acessar informações do personagem */}
                <Link to={`/character/${index}`} className="text-blue-500 hover:underline">
                  {character.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </Router>

  );
};

export default App;
