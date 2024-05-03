export const setUserDetailsInfo = (userInfo) => {
  localStorage.setItem("userDetailsInfo", JSON.stringify(userInfo));
  return true;
};

export const getUserDetailsInfo = () => {
  return localStorage.hasOwnProperty("userDetailsInfo")
    ? JSON.parse(localStorage.getItem("userDetailsInfo"))
    : false;
};

export const removeUserDetailsInfo = () => {
  return localStorage.hasOwnProperty("userDetailsInfo")
    ? localStorage.removeItem("userDetailsInfo")
    : false;
};
