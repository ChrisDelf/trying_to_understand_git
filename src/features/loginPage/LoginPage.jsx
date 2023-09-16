import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import mainTheme from "../../app/themes";
import { setUser } from "../homePage/userSlice";
import { ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { lime, purple } from '@mui/material/colors';

const LoginPage = () => {
  const dispatch = useDispatch();
  //
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const userInfo = useSelector((state) => state.user);
  const onNameChange = (e) => setName(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const onLoginClicked = () => {
    if (name && password) {
      // disptach goes here
      dispatch(setUser({ name, email: "example@email.com" }));
      setName("");
      setPassword("");
    }
  };


  const canLogin = Boolean(name) && Boolean(password);

  return ( 
    <ThemeProvider theme={mainTheme}>
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
        <Button variant="contained" color="primary" onClick={onLoginClicked} disabled={!canLogin}>
          Login
        </Button>
      </section>
    </ThemeProvider>
  );
};

export default LoginPage;
