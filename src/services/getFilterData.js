import axios from "axios";

export const getStates = () => {
  return axios
    .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
    .then((resp) => {
      return resp.data.states;
    });
};

/// @param string stateId
export const getCities = (stateId) => {
  return axios
    .get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`)
    .then((response) => {
      return response.data.districts;
    });
};
