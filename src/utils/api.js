import axios from "axios";

let baseUrl = "https://master-o-backend-1.onrender.com/api";

export const getPoints = () =>
  axios.get(`${baseUrl}/user-points`).then(({ data }) => data);

export const getDice = () =>
  axios.get(`${baseUrl}/generate-numbers`).then(({ data }) => data);

export const getResult = (sum, betAmount) =>
  axios
    .post(`${baseUrl}/calculate-winnings`, {
      selectedNumber: sum,
      betAmount: betAmount,
    })
    .then(({ data }) => data);

export const onLoss = (bidAmount) =>
  axios
    .post(`${baseUrl}/update-points-on-loss`, {
      lostAmount: bidAmount,
    })
    .then(({ data }) => data);
