import { useState } from "react";

function Login() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/api/auth/login/",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username,
          password
        })
      }
    );

    const data = await response.json();

    localStorage.setItem(
      "token",
      data.access
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Connexion</h2>

      <input
        placeholder="Username"
        onChange={(e)=>setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button>
        Se connecter
      </button>

    </form>
  );
}

export default Login;