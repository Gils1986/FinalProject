const Footer = () => {
    return (
      <footer className="border-top pt-3 py-2 text-center navbar-dark bg-dark">
        <span className="text-light">The Perfect Gift</span>
        <span className="text-light mx-2">&copy;</span>
        <span className="text-light">{new Date().getFullYear()}</span>
      </footer>
    );
  };
  
  export default Footer;
  