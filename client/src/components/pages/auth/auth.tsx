import React, { useState } from "react";

const Authorization: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  async function handleSubmit(event: any) {
    event.preventDefault();
    console.log(" email", email);
    console.log(" password", password);

    const data = { email, password };
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input
          type="text"
          name="email"
          required
          value={email}
          onChange={handleChangeEmail}
        />

        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          required
          value={password}
          onChange={handleChangePassword}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Authorization;
