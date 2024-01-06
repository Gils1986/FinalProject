const Footer = () => {
    return (
      <footer className="border-top pt-3 py-2 text-center navbar-dark bg-dark">
        <img className="mb-1" style={{height: "18px"}} src={"/favicon.ico"} alt={"gift"} />
        <span className="text-light ms-1">The Perfect Gift</span>
        <span className="text-light mx-2">&copy;</span>
        <span className="text-light">{new Date().getFullYear()}</span>
      </footer>
    );
  };
  
  export default Footer;
  