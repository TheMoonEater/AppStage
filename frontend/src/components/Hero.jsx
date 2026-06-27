function Hero() {

  const scrollToCatalogue = () => {

    document
      .getElementById("catalogue")
      ?.scrollIntoView({
        behavior: "smooth"
      });

  };

  return (

    <section className="hero">

      <h1>
        Financez vos projets
        avec Al Salam Bank
      </h1>

      <p>
        Voitures, motos et
        électroménager accessibles
        via nos solutions de financement.
      </p>

      <button
        className="btn-primary"
        onClick={scrollToCatalogue}
      >
        Découvrir le catalogue
      </button>

    </section>

  );
}

export default Hero;