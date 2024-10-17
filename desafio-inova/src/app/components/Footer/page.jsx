import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Star Wars Innova. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
