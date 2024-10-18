import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Sobre o Projeto</h1>
        <p className="text-lg mb-4 text-gray-800">
          Este projeto foi desenvolvido como parte de um processo seletivo para a vaga de desenvolvedor Front-End na empresa <strong>Innova Connect</strong>. O objetivo principal foi criar uma aplicação web para listagem de personagens do universo Star Wars, utilizando a API pública <a href="https://swapi.dev/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">SWAPI</a>.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Funcionalidades do Projeto</h2>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          <li>Listagem de personagens do universo Star Wars.</li>
          <li>Sistema de busca por nome de personagem.</li>
          <li>Visualização detalhada de cada personagem, exibindo informações como nome, ano de aniversário, gênero, cor dos olhos e filmes em que apareceu (incluindo título e data de lançamento).</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Requisitos Técnicos</h2>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          <li>As telas foram previamente desenhadas no Figma e replicadas fielmente no código.</li>
          <li>Desenvolvimento realizado utilizando <strong>ReactJS</strong>.</li>
          <li>Código publicado no GitHub, com foco em ser considerado um projeto pronto para produção.</li>
          <li>O sistema foi desenvolvido com atenção à eliminação de erros e bugs no código, considerando critérios de avaliação.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tecnologias Utilizadas</h2>
        <ul className="list-disc pl-5 mb-4 text-gray-700">
          <li><strong>Next.Js</strong> para a construção da interface de usuário.</li>
          <li><strong>Tailwind CSS</strong> para estilização e responsividade.</li>
          <li><strong>Axios</strong> para requisições HTTP e consumo da API SWAPI.</li>
          <li><strong>Figma</strong> para o design das telas.</li>
          <li><strong>GitHub</strong> para versionamento e publicação do código.</li>
        </ul>

        <div className="text-center mt-6">
          <a
            href="https://github.com/Ynd-Icaro/Desafio-Innova-Connect/" // Coloque aqui o link do seu repositório GitHub
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
            Ver Projeto no GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
