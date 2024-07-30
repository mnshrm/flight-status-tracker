const url = "http://127.0.0.1:5000/";

export const updateFlightStatus = async (id, status) => {
  await fetch(url + "admin/updateFlight", {
    method: "POST",
    body: JSON.stringify({
      id: id,
      status: status,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
