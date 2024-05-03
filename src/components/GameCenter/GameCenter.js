import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, TextField, makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Dice from "react-dice-roll";
import NumberInput from "../../common/components/NumberInput/NumberInput";
import { Dropdown } from "@mui/base";
import Select from "../../common/components/Selector/Select";
import { getDice, getResult, onLoss } from "../../utils/api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#000",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  header: {
    position: "relative",
    top: "16vmin",
    display: "flex",
    justifyContent: "center",
    padding: 20,
  },
  bottom: {
    position: "relative",
    bottom: "18vmin",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
    padding: 20,
  },
  bidButton: {
    backgroundColor: "#E30702",
    color: "#fff",
    padding: "16px 24px",
    borderRadius: 10,
    "&.MuiButton-root.Mui-disabled": {
      backgroundColor: "#777",
    },
    "&.MuiButton-root:hover": {
      backgroundColor: "#E30702",
    },
  },
  bidWrapper: {
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    gap: 20,
  },
  modalContainer: {
    right: 0,
    left: 0,
    bottom: 0,
    top: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    color: "#fff",
    justifyContent: "center",
    flexDirection: "column",
    gap: 20,
  },
  buttonContainer: {
    display: "flex",
    gap: 20,
  },
}));

const GameCenter = () => {
  const [diceValue, setDiceValue] = useState();
  const [result, setResult] = useState({ message: "won" });
  const [bidValue, setBidValue] = useState(null);
  const [show, setShow] = useState();
  const [bidAmount, setBidAmount] = useState(100);
  const options = [
    { value: 100, label: 100 },
    { value: 200, label: 200 },
    { value: 500, label: 500 },
  ];
  const classes = useStyles();
  const navigate = useNavigate();
  const oneRef = useRef(null);
  const twoRef = useRef(null);

  const handleSubmit = (e) => {
    e.stopPropagation();

    getDice()
      .then((res) => {
        setDiceValue(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(diceValue, bidValue);
    oneRef.current.rollDice();
    twoRef.current.rollDice();
    if (diceValue != undefined) {
      if (diceValue?.sum === bidValue) {
        getResult(diceValue?.sum, bidAmount)
          .then((res) => {
            setTimeout(() => {
              setResult({ message: "won" });
              setShow(true);
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        onLoss(bidAmount).then((res) => {
          setTimeout(() => {
            setShow(true);
            setResult({ message: "lost" });
          }, 1000);
        });
      }
    }
  }, [diceValue]);

  const handleClick = () => {
    navigate("/app/dashboard");
  };

  return (
    <div className={classes?.root}>
      <div className={classes?.header}>
        <Dice size={100} cheatValue={diceValue?.dice1} ref={oneRef} />
        <Dice size={100} cheatValue={diceValue?.dice2} ref={twoRef} />
      </div>
      <div className={classes.bottom}>
        <div className={classes.bidWrapper}>
          <NumberInput
            aria-label="Quantity Input"
            min={1}
            max={12}
            onChange={(_, newValue) => setBidValue(newValue)}
          />
          <Select
            defaultValue={100}
            options={options}
            className={classes.selectorStyle}
            value={bidAmount}
            setValue={setBidAmount}
          />
        </div>
        <Button
          className={classes.bidButton}
          onClick={handleSubmit}
          disabled={!bidValue}
        >
          Bid
        </Button>
      </div>
      <Modal open={show} className={classes.modal} closeAfterTransition>
        <div className={classes.modalContainer}>
          <p>You {result.message}!</p>
          <div className={classes.buttonContainer}>
            <Button
              className={classes.bidButton}
              onClick={() => setShow((prev) => !prev)}
              disabled={!bidValue}
            >
              Play Again
            </Button>
            <Button
              className={classes.bidButton}
              onClick={handleClick}
              disabled={!bidValue}
            >
              Home
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GameCenter;
