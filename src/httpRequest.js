export async function updateUserPlaces(places) {
  const respond = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places: places }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await respond.json();
  if (!resData) {
    throw new Error("Failed to update user places");
  }
  return resData.message;
}
export async function getUserPlaces() {
  const respond = await fetch("http://localhost:3000/user-places");
  const resData = await respond.json();
  if (!respond.ok) {
    throw new Error("Failed to get user places");
  }
  return resData.places;
}
