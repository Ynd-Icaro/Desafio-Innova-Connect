import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CharacterDetails = ({ characters }) => {
  const { id } = useParams(); // Pega o ID da URL
  const character = characters[id]; // Acessa o personagem pelo ID
  const [films, setFilms] = useState([]);

  useEffect(() => {
    // Busca os filmes que esse personagem está presente
    const fetchFilms = async () => {
      if (character) {
        const filmRequests = character.films.map((filmUrl) => axios.get(filmUrl));
        const filmResponses = await Promise.all(filmRequests);
        setFilms(filmResponses.map((res) => res.data));
      }
    };

    fetchFilms();
  }, [character]);

  if (!character) return <p>Personagem não encontrado</p>;

  return (
    <div>
      <h2>{character.name}</h2>
      <p><strong>Birth Year:</strong> {character.birth_year}</p>
      <p><strong>Gender:</strong> {character.gender}</p>
      <p><strong>Eye Color:</strong> {character.eye_color}</p>
      <h3>Films</h3>
      <ul>
        {films.map((film) => (
          <li key={film.title}>
            <strong>{film.title}</strong> - Release Date: {film.release_date}
          </li>
        ))}
      </ul>

      <button onClick={() => window.history.back()}>Voltar</button>
    </div>
  );
};

export default CharacterDetails;
