import axios from "axios";

export const getDataByCity = (cityId, date) => {
  return axios
    .get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${cityId}&date=${date}`
    )
    .then((response) => {
      return response.data.centers;
    });
};



export const getDataByPinCode = (pincode, date) => {
  return axios
    .get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${date}`
    )
    .then((response) => {
      return response.data.centers;
    });
};
