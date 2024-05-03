import React, { useEffect, useState } from "react";
import { Button, TextField, makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import diceImage from "../../assets/images/dice.svg";
import { useNavigate } from "react-router-dom";
import { getUserDetailsInfo } from "../../utils/userDetailsInfo";
import { getPoints } from "../../utils/api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: 20,
    position: "relative",
    top: "15vmin",
    gap: 20,
    flexDirection: "row",
    backgroundColor: "#000",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  bonus: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
    backgroundColor: "#E30702",
    padding: 20,
    borderRadius: 20,
  },
  coins: {
    fontSize: 18,
    fontWeight: 800,
  },
  claim: {
    padding: 4,
    borderRadius: 6,
    border: "1px solid #777",
    backgroundColor: "#000",
    color: "#fff",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#fff",
    backgroundColor: "#E30702",
    borderRadius: 20,
    fontSize: 18,
    padding: 20,
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  bidButton: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #777",
    backgroundColor: "#000",
    color: "#fff",
  },
  imageWrapper: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 20,
  },
  imageStyle: {
    width: "20vmin",
  },
  topPlayers: {
    display: "flex",
    flexDirection: "column",
    color: "#fff",
    gap: 10,
    backgroundColor: "#E30702",
    overflow: "auto",
    maxHeight: "calc(100vh - 50vh)",
    padding: 20,
    borderRadius: 20,
  },
  topPlayersConatiner: {
    backgroundColor: "#000",
    padding: 10,
  },
  eachPlayer: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Dashboard = () => {
  const [bonus, setBonus] = useState();
  const username = getUserDetailsInfo()?.name;
  const classes = useStyles();
  const navigate = useNavigate();
  const [topPlayers, setTopPlayers] = useState({
    name: "Md Shagil",
    coins: 5000,
  });

  useEffect(() => {
    getPoints()
      .then((res) => {
        setBonus(res);
        setTopPlayers((prevTopPlayers) => ({
          ...prevTopPlayers,
          coins: res?.userPoints,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.stopPropagation();
    navigate("/app/game-center");
  };

  return (
    <div className={classes?.root}>
      {bonus?.userPoints ? (
        <div className={classes.bonus}>
          <button className={classes.claim}>Your Bonus</button>
          <p className={classes.coins}>{bonus?.userPoints} coins</p>
        </div>
      ) : null}
      <div className={classes?.header}>
        <div className={classes.wrapper}>
          <p>Hey {username}!</p>
          <button className={classes.bidButton} onClick={handleSubmit}>
            Bid Here
          </button>
        </div>
        <div className={classes.imageWrapper}>
          <img
            src={diceImage}
            alt="dice Image"
            className={classes.imageStyle}
          />
        </div>
      </div>
      <div className={classes.topPlayers}>
        <p>Top Players</p>
        <div className={classes.topPlayersConatiner}>
          <div className={classes.eachPlayer}>
            <span>{topPlayers?.name}</span>
            <span>{topPlayers?.coins}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
