// export { fetchCountries };

// const BASE_URL = 'https://restcountries.com/v3.1';
// const FILTER_RESPONSE = '?fields=name,capital,population,flags,languages';

// function fetchCountries(name) {
//   return fetch(`${BASE_URL}/name/${name}${FILTER_RESPONSE}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     return response.json();
//   });
// }


export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status);
    }

    return resp.json();
  });
}