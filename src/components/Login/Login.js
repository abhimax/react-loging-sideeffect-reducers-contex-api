import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const reducerEmail = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.vale, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const reducerPassword = (state, action) => {
  if (action.type === "PWD_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "PWD_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [stateEmail, dispatchEmail] = useReducer(reducerEmail, {
    value: "",
    isValid: null,
  });

  const [statePassword, dispatchPassword] = useReducer(reducerPassword, {
    value: "",
    isValid: null,
  });

  // to avoid validate after validate inputs
  const { isValid: emailIsValid } = stateEmail;
  const { isValid: passwordIsValid } = statePassword;
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Check form validity!");
      setFormIsValid(stateEmail.isValid && statePassword.isValid);
    }, 500);
    // this allow user to take time for typing. after that we can handle requests
    return () => {
      clearTimeout(identifier);
      console.log("Cleanup!");
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    //setFormIsValid(stateEmail.value.includes("@") && statePassword.isValid);
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPassword({ type: "PWD_INPUT", val: event.target.value });
    //setFormIsValid(event.target.value.trim().length > 6 && stateEmail.isValid);
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(stateEmail.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(statePassword.value.trim().length > 6);
    dispatchPassword({ type: "PWD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(stateEmail.value, statePassword.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            stateEmail.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={stateEmail.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            statePassword.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={statePassword.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
