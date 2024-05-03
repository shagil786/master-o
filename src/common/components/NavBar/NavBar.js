import React, { useState } from "react";
import { Button, TextField, makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Dashboard, SportsEsports, Info } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    bottom: 0,
    width: "100%",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0px",
    position: "fixed",
    backgroundColor: "#E30702",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 3,
  },
  container: {
    width: "100%",
    padding: "0px 10px",
    display: "flex",
    flexDirection: "column",
    color: "#fff",
    gap: 4,
    alignItems: "center",
  },
}));

const NavBar = () => {
  const bar = [
    { name: "Dashboard", icon: <Dashboard /> },
    { name: "Game Zone", icon: <SportsEsports /> },
    { name: "About", icon: <Info /> },
  ];
  const [formData, setFormData] = useState();
  const classes = useStyles();

  return (
    <div className={classes?.root}>
      {bar?.map((each, index) => (
        <div
          className={classes.container}
          key={index}
          style={{
            color: each?.name === "Dashboard" ? "black" : "",
          }}
        >
          {each?.icon}
          <p>{each?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default NavBar;
