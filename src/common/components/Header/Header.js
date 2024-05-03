import React, { useState } from "react";
import { Button, makeStyles, Modal } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import profileImg from "../../../assets/images/profile.jpeg";
import {
  getUserDetailsInfo,
  removeUserDetailsInfo,
} from "../../../utils/userDetailsInfo";
import { removeAuthCookies } from "../../../utils/cookie-utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0px",
    position: "fixed",
    backgroundColor: "#E30702",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 3,
  },
  text: {
    color: "#fff",
    marginLeft: 20,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    marginRight: 20,
    objectFit: "cover",
  },
  modal: {
    inset: "64px 10px auto auto !important",
    backgroundColor: "#E30702 !important",
    borderRadius: 10,
  },
  modalStyle: {
    width: "fit-content",
    display: "flex",
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
    color: "#fff",
    padding: 10,
  },
  border: {
    width: "100%",
  },
}));

const Header = () => {
  const classes = useStyles();
  const username = getUserDetailsInfo().name;
  const [show, setShow] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setShow((prev) => !prev);
  };

  const handleLogout = () => {
    removeAuthCookies();
    removeUserDetailsInfo();
    window.location.reload();
  };

  return (
    <div className={classes?.root}>
      <Typography className={classes?.text}>Welcome to 7UP & 7DOWN!</Typography>
      <img
        src={profileImg}
        alt="profileImg"
        className={classes?.profile}
        onClick={handleClick}
      />
      <Modal
        open={show}
        onClose={handleClick}
        className={classes.modal}
        closeAfterTransition
      >
        <div className={classes?.modalStyle}>
          <p>Profile</p>
          <hr className={classes.border} />
          <p onClick={handleLogout}>Logout</p>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
