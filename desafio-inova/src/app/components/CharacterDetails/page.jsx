  import React, { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import axios from 'axios';

  const CharacterDetails = ({ characters }) => {
    const { id } = useParams(); 
    const character = characters[id]; 
    const [films, setFilms] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [starships, setStarships] = useState([]);
    const [species, setSpecies] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
      const fetchData = async () => {
        try {
          if (character) {
            const filmRequests = character.films.map(axios.get);
            const vehicleRequests = character.vehicles.map(axios.get);
            const starshipRequests = character.starships.map(axios.get);
            const speciesRequests = character.species.map(axios.get);

            const [filmResponses, vehicleResponses, starshipResponses, speciesResponses] = await Promise.all([
              Promise.all(filmRequests),
              Promise.all(vehicleRequests),
              Promise.all(starshipRequests),
              Promise.all(speciesRequests),
            ]);

            setFilms(filmResponses.map((res) => res.data));
            setVehicles(vehicleResponses.map((res) => res.data));
            setStarships(starshipResponses.map((res) => res.data));
            setSpecies(speciesResponses.map((res) => res.data));
          };
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        } finally {
          setLoading(false); 
        };
      };

      fetchData();
    }, [character]);

    if (!character) return <p className="text-center text-red-500">Personagem não encontrado</p>;

    if (loading) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white text-2xl">Carregando...</div>
        </div>
      );
    };

    const filmImages = {
      'https://swapi.dev/api/films/1/': 'https://starwars-visualguide.com/assets/img/films/1.jpg',
      'https://swapi.dev/api/films/2/': 'https://starwars-visualguide.com/assets/img/films/2.jpg',
      'https://swapi.dev/api/films/3/': 'https://starwars-visualguide.com/assets/img/films/3.jpg',
      'https://swapi.dev/api/films/4/': 'https://starwars-visualguide.com/assets/img/films/4.jpg',
      'https://swapi.dev/api/films/5/': 'https://starwars-visualguide.com/assets/img/films/5.jpg',
      'https://swapi.dev/api/films/6/': 'https://starwars-visualguide.com/assets/img/films/6.jpg',
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-md w-1/6 md:w-1/6 lg:w-1/3 relative">
          <button 
            className=" w-full top-10 right-3 text-gray-600 hover:text-gray-800" 
            onClick={() => window.history.back()}>
          </button>
          <div 
            className="overflow-y-auto max-h-[75vh]"> 
            <h2 className="text-3xl font-bold text-center mb-4">{character.name}</h2>
            <div className="flex justify-center mb-4">
              <img
                src={`https://starwars-visualguide.com/assets/img/characters/${parseInt(id) + 1}.jpg`}
                alt={character.name}
                className="w-48 h-48 object-cover rounded-full"/>
            </div>
            <div className="mb-4">
              <p className="text-lg"><strong>Ano de Nascimento:</strong> {character.birth_year}</p>
              <p className="text-lg"><strong>Gênero:</strong> {character.gender}</p>
              <p className="text-lg"><strong>Cor dos Olhos:</strong> {character.eye_color}</p>
            </div>
            <h3 className="text-2xl font-semibold mb-3">Filmes</h3>
            <ul className="list-disc pl-5">
              {films.length > 0 ? (
                films.map((film) => (
                  <li key={film.title} className="mb-2 flex items-center">
                    <img
                      src={filmImages[film.url]}
                      alt={film.title}
                      className="w-16 h-24 object-cover rounded-lg mr-3"/>
                    <div>
                      <strong>{film.title}</strong> - <span className="text-gray-600">Lançamento: {film.release_date}</span>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">Nenhum filme encontrado.</p>
              )}
            </ul>

            <h3 className="text-2xl font-semibold mb-3">Veículos</h3>
            <ul className="list-disc pl-5">
              {vehicles.length > 0 ? (
                vehicles.map((vehicle) => (
                  <li key={vehicle.name} className="mb-2">
                    <strong>{vehicle.name}</strong> - Modelo: {vehicle.model}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">Nenhum veículo encontrado.</p>
              )}
            </ul>
            <h3 className="text-2xl font-semibold mb-3">Naves</h3>
            <ul className="list-disc pl-5">
              {starships.length > 0 ? (
                starships.map((starship) => (
                  <li key={starship.name} className="mb-2">
                    <strong>{starship.name}</strong> - Modelo: {starship.model}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">Nenhuma nave encontrada.</p>
              )}
            </ul>
            <h3 className="text-2xl font-semibold mb-3">Espécies</h3>
            <ul className="list-disc pl-5">
              {species.length > 0 ? (
                species.map((specie) => (
                  <li key={specie.name} className="mb-2">
                    <strong>{specie.name}</strong> - Classificação: {specie.classification}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">Nenhuma espécie encontrada.</p>
              )}
            </ul>
          </div>
          <div className="text-center mt-6">
            <button
              onClick={() => window.history.back()}
              className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800 transition duration-300">
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default CharacterDetails;
