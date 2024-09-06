import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <p>© {new Date().getFullYear()}</p>
      <nav>
        <a href="/cookies">Cookies</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms and Uses</a>
      </nav>
    </footer>
  );
};

export default Footer;