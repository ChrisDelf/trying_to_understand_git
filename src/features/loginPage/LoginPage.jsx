import React from 'react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "../homePage/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  //
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const userInfo = useSelector((state) => state.user);
    console.log("LoginPage", userInfo)
  const onNameChange = (e) => setName(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const onLoginClicked = () => {
    if (name && password) {
      // disptach goes here
        dispatch(setUser({name, email:"example@email.com"}))
        setName("")
        setPassword("")
    }
  };

  const canLogin = Boolean(name) && Boolean(password);

  return (
    <section>
      <h2>Login</h2>
      <label htmlFor="userName">User Name:</label>
      <input type="text" id="userName" value={name} onChange={onNameChange} />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={onPasswordChange}
      />
      <button type="button" onClick={onLoginClicked} disabled={!canLogin}>
        Login
      </button>
    </section>
  );
};



export default LoginPage
