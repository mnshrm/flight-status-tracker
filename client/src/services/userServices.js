const url = "http://127.0.0.1:5000/";

export const getFlightData = async () => {
  const response = await fetch(url + "user/flights");
  const resData = await response.json();
  if (!resData.status) return [];

  return resData.flights;
};

export const bookUserFlight = async (id) => {
  await fetch(url + "user/bookFlight", {
    method: "POST",
    body: JSON.stringify({
      id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
