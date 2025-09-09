import React from "react";

const Login = () => {
  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>
      <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
        <input type="email" placeholder="Email" style={{ marginBottom: "10px", padding: "8px" }} />
        <input type="password" placeholder="Password" style={{ marginBottom: "10px", padding: "8px" }} />
        <button style={{ padding: "10px", background: "#007bff", color: "white", border: "none" }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
