const BASE_URL = process.env.REACT_APP_URL;

export const getWorkEventsInRange = async (from, to) => {
  try {
    let queryParams = "";
    if (from !== undefined && to !== undefined)
      queryParams = `?from=${from}&to${to}`;

    const res = await fetch(BASE_URL + "workevent" + queryParams);
    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
