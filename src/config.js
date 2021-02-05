export const config = {
  SERVER:
    process.env.REACT_APP_SERVER_LOCATION === "local"
      ? process.env.REACT_APP_LOCAL_SERVER
      : process.env.REACT_APP_SERVER,
};
