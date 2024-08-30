// src/api/api.js

const seededRandom = function (seed) {
    var m = 2 ** 35 - 31;
    var a = 185852;
    var s = seed % m;
    return function () {
      return (s = (s * a) % m) / m;
    };
  };
  
  export function fetchAPI(date) {
    let result = [];
    let random = seededRandom(date.getDate());
  
    for (let i = 17; i <= 23; i++) {
      if (random() < 0.5) {
        result.push(i + ":00");
      }
      if (random() < 0.5) {
        result.push(i + ":30");
      }
    }
    return result;
  }
  
// src/api/api.js
export const submitAPI = (formData) => {
    // Simulate an API call; replace this with actual API logic
    console.log('Submitting form data:', formData);
    return true; // Simulate successful submission
  };
  