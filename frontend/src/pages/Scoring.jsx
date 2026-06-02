function Scoring(){

  return(

    <form>

      <h2>Scoring Client</h2>

      <label>
        Situation familiale
      </label>

      <select>
        <option>Célibataire</option>
        <option>Marié</option>
      </select>

      <label>
        Revenus mensuels
      </label>

      <input type="number"/>

      <label>
        Ancienneté emploi
      </label>

      <input type="number"/>

      <label>
        Nombre d'enfants
      </label>

      <input type="number"/>

      <button>
        Calculer le score
      </button>

    </form>

  );
}

export default Scoring;