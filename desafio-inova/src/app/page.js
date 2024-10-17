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
    // Função para buscar todos os personagens
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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
              {/* Utilizando o filtro para a pesquisa */}
              {filteredCharacters.map((character, index) => (
                <li key={index} className="mb-2">
                  {/* Link para acessar as informações do personagem */}
                  <Link to={`/character/${index}`} className="text-blue-500 hover:underline">
                    {character.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Rotas - exibindo o modal de detalhes do personagem */}
          <Routes>
            <Route path="/character/:id" element={<CharacterDetails characters={characters} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
