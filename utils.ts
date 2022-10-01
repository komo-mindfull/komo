export const getStoredToken = () => {
  return localStorage.getItem("token") as string;
};
