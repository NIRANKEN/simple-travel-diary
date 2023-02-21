export const fetchFromApi = (path: string) =>
  fetch(`${process.env.REACT_APP_API_ENDPOINT}/v1/${path}`, {
    mode: "cors",
    credentials: "include",
  });
