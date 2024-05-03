import React, { useState } from "react";
import { Button, TextField, makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import diceImage from "../../assets/images/dice.svg";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#000",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  header: {
    padding: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E30702",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  diceContainer: {
    width: "fit-content",
    padding: 20,
    backgroundColor: "#000",
    borderRadius: 20,
  },
  textColor: {
    marginTop: 10,
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: 600,
  },
  textColor1: {
    color: "#fff",
    fontSize: 15,
  },
  imageStyle: {
    width: "30vmin",
  },
  formWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  formContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    paddingTop: 40,
  },
  outlined: {
    width: "90%",
    backgroundColor: "#393939",
    borderRadius: 20,
    color: "#fff",
  },
  buttonStyle: {
    width: "90%",
    position: "absolute",
    bottom: 20,
    margin: "auto",
    right: 0,
    left: 0,
    backgroundColor: "#E30702",
    padding: 12,
    fontWeight: 600,
    borderRadius: 20,
    color: "#fff",
    "&.MuiButton-root.Mui-disabled": {
      backgroundColor: "#777",
    },
    "&.MuiButton-root:hover": {
      backgroundColor: "#E30702",
    },
  },
}));

const Login = () => {
  const inputFields = ["name", "password", "email"];
  const [formData, setFormData] = useState();
  const classes = useStyles();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!formData) setFormData({ [name]: value });
    else {
      setFormData((prevState) => {
        const updatedData = { ...prevState };
        if (value === "") {
          delete updatedData[name];
        } else {
          updatedData[name] = value;
        }
        return updatedData;
      });
    }
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    navigate("/app/dashboard");
  };

  return (
    <div className={classes?.root}>
      <div className={classes?.header}>
        <div className={classes?.diceContainer}>
          <img
            src={diceImage}
            alt="dice Image"
            className={classes.imageStyle}
          />
        </div>
        <Typography className={classes.textColor}>7 up & 7 down</Typography>
        <Typography className={classes.textColor1}>
          Play and win big!
        </Typography>
      </div>
      <div className={classes.formWrapper}>
        <div className={classes?.formContainer}>
          {inputFields?.map((each, index) => (
            <TextField
              id="outlined-basic"
              label={each}
              variant="outlined"
              key={index}
              name={each}
              className={classes?.outlined}
              InputLabelProps={{
                style: { color: "#fff", textTransform: "capitalize" },
              }}
              inputProps={{
                style: { color: "#fff" },
              }}
              onChange={handleChange}
              required={true}
            />
          ))}
        </div>
        <Button
          className={classes.buttonStyle}
          disabled={
            formData
              ? Object.keys(formData)?.length !== inputFields.length
              : true
          }
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Login;
