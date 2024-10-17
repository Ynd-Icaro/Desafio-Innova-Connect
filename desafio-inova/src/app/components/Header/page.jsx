import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-blue-600 text-white py-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Desafio Tecnico Innova Connect</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-gray-300">Inicio</a></li>
            <li><a href="/About" className="hover:text-gray-300">Sobre</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
