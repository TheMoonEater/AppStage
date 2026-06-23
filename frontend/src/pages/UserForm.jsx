import { useState } from "react";
import api from "../services/api";

function UserForm({ onSuccess }) {

  const [form, setForm] = useState({

    username: "",

    email: "",

    phone: "",

    role: "CLIENT"

  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await api.post(
      "users/",
      form
    );

    alert("Utilisateur ajouté");

    onSuccess();

  };

  return (

    <form
      className="user-form"
      onSubmit={handleSubmit}
    >

      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Téléphone"
        onChange={handleChange}
      />

      <select
        name="role"
        onChange={handleChange}
      >

        <option value="CLIENT">
          Client
        </option>

        <option value="EMPLOYE">
          Employé
        </option>

        <option value="RETAIL">
          Retail
        </option>

        <option value="COMITE">
          Comité
        </option>

        <option value="ADMIN">
          Admin
        </option>

      </select>

      <button
        className="btn-primary"
        type="submit"
      >
        Ajouter
      </button>

    </form>

  );

}

export default UserForm;