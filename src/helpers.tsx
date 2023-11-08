import {
  BsFillSunFill,
  BsFillCloudsFill,
  BsFillCloudSnowFill,
  BsFillCloudSunFill,
  BsFillCloudFogFill,
  BsFillCloudFog2Fill,
  BsFillCloudDrizzleFill,
  BsFillCloudRainFill,
} from "react-icons/bs";
import { MdCloudySnowing } from "react-icons/md";
import { FaCloudShowersHeavy } from "react-icons/fa";
import { IoThunderstormSharp } from "react-icons/io5";

export const conditions = (condition: any) => {
  switch (condition) {
    case 0:
      return <BsFillSunFill size="50" />;
    case 1:
    case 2:
      return <BsFillCloudSunFill size="50" />;
    case 3:
      return <BsFillCloudsFill size="50" />;
    case 45:
      return <BsFillCloudFog2Fill size="50" />;
    case 48:
      return <BsFillCloudFogFill size="50" />;
    case 51:
    case 53:
    case 55:
      return <BsFillCloudDrizzleFill size="50" />;
    case 56:
    case 57:
      return <MdCloudySnowing size="50" />;
    case 61:
    case 63:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return <BsFillCloudRainFill size="50" />;
    case 65:
      return <FaCloudShowersHeavy size="50" />;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return <BsFillCloudSnowFill size="50" />;
    case 95:
    case 96:
    case 99:
      return <IoThunderstormSharp size="50" />;
    default:
      return "Error";
  }
};

export const fullDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  let day = "";
  let month = "";
  let hours = "";
  if (date.getDate() < 10) {
    day = "0" + String(date.getDate());
  } else {
    day = String(date.getDate());
  }

  if (date.getMonth() < 10) {
    month = "0" + String(date.getMonth() + 1);
  } else {
    month = String(date.getMonth() + 1);
  }

  if (date.getHours() < 10) {
    hours = "0" + String(date.getHours());
  } else {
    hours = String(date.getHours());
  }

  return (
    String(year) +
    "-" +
    String(month) +
    "-" +
    String(day) +
    "T" +
    String(hours) +
    ":00"
  );
};

export const dayRn = (day: any) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(day);
  const dayOfWeek = date.getDay();

  return daysOfWeek[dayOfWeek];
};

export const monthRn = (month: any) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(month);
  const monthOfYear = date.getMonth();
  return months[monthOfYear];
};

export const setCookie = (name: any, value: any, daysToExpire: any) => {
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);
  var cookieValue =
    encodeURIComponent(name) +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expirationDate.toUTCString() +
    "; path=/";
  document.cookie = cookieValue;
};

// export const geolocation = () => {

  // if ("geolocation" in navigator) {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       const latitude = position.coords.latitude;
  //       const longitude = position.coords.longitude;
  //       const latLon = {latitude, longitude};
  //       console.log(latLon)
  //       localStorage.setItem("geolocation", JSON.stringify(latLon));
  //       return latLon;
  //     },
  //     (error) => {
  //       // Error callback function
  //       if(error.PERMISSION_DENIED){
  //         console.log("User denied the request for Geolocation.");
  //         return null;
  //       }else if(error.POSITION_UNAVAILABLE){
  //         console.log("Location information is unavailable.");
  //         return null;
  //       }else if(error.TIMEOUT){
  //         console.log("The request to get user location timed out.");
  //         return null;
  //       }else{
  //         console.log("An unknown error occurred.");
  //         return null;
  //       }
  //     }
  //   );
  // }else{
  //   return null;
  // }
// };

export const geolocation = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const latLon = { latitude, longitude };
          localStorage.setItem("geolocation", JSON.stringify(latLon));
          resolve(latLon);
        },
        (error) => {
          // Error callback function
          if (error.PERMISSION_DENIED) {
            console.log("User denied the request for Geolocation.");
            reject(new Error("User denied geolocation request."));
          } else if (error.POSITION_UNAVAILABLE) {
            console.log("Location information is unavailable.");
            reject(new Error("Location information is unavailable."));
          } else if (error.TIMEOUT) {
            console.log("The request to get user location timed out.");
            reject(new Error("Geolocation request timed out."));
          } else {
            console.log("An unknown error occurred.");
            reject(new Error("Unknown geolocation error."));
          }
        }
      );
    } else {
      reject(new Error("Geolocation is not supported."));
    }
  });
};

