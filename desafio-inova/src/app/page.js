'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CharacterDetails from './components/CharacterDetails/page';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCharacter, setHoveredCharacter] = useState(null);

  // Fetch characters data from API
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const { data } = await axios.get('https://swapi.dev/api/people/');
        setCharacters(data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const characterImageIdMap = {
    'Luke Skywalker': 1,
    'C-3PO': 2,
    'R2-D2': 3,
    'Darth Vader': 4,
    'Leia Organa': 5,
    'Owen Lars': 6,
    'Beru Whitesun lars': 7,
    'R5-D4': 8,
    'Biggs Darklighter': 9,
    'Obi-Wan Kenobi': 10,
  };

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <header className="p-6">
          <h1 className="text-center text-3xl font-bold mb-6">Star Wars</h1>
          <div className="flex justify-center">
            <input
              className="w-full max-w-md p-2 border rounded"
              type="text"
              placeholder="Pesquisar por personagem..."
              value={searchTerm}
              onChange={handleSearchChange}/>
          </div>
        </header>
        <main className="flex-1 flex flex-col sm:flex-row group">
          {filteredCharacters.map((character, index) => {
            const characterId = characterImageIdMap[character.name] || 1;
            return (
              <div
                key={index}
                className={`flex-1 border-b sm:border-b-0 sm:border-r last:border-b-0 sm:last:border-r-0 border-gray-300 
                  flex flex-col items-center justify-center p-4
                  transition-all duration-300 ease-in-out
                  hover:flex-[3] ${hoveredCharacter !== null && hoveredCharacter !== index ? 'group-hover:opacity-50' : ''}
                  bg-white`}
                onMouseEnter={() => setHoveredCharacter(index)}
                onMouseLeave={() => setHoveredCharacter(null)}>
                <Link to={`/character/${index}`}>
                  <img
                    src={`https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`}
                    alt={character.name}
                    className={`w-full h-auto mb-3 transition-all duration-300 ease-in-out ${hoveredCharacter === index ? 'scale-100' : ''}`}/>
                </Link>
                <Link to={`/character/${index}`} className="text-blue-500 hover:underline text-xl font-semibold">
                  {character.name}
                </Link>
                <div className={`mt-2 text-sm text-gray-600 transition-all duration-300 ease-in-out ${hoveredCharacter === index ? 'opacity-100' : 'opacity-0'}`}>
                  <p><strong>Altura:</strong> {character.height} cm</p>
                  <p><strong>Peso:</strong> {character.mass} kg</p>
                  <p><strong>Data de Aniversario:</strong> {character.birth_year}</p>
                </div>
              </div>
            );
          })}
        </main>

        <Routes>
          <Route path="/character/:id" element={<CharacterDetails characters={characters}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
