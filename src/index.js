import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const form = {
    inputEl: document.querySelector('#search-box'),
    countriesInfo: document.querySelector('.country-info'),
    countriesList: document.querySelector('.country-list'),
  
};


form.inputEl.addEventListener('input', debounce(fetchByInput, DEBOUNCE_DELAY));


function fetchByInput() {
  const country = form.inputEl.value.trim();
  if (!country) {
    clearMarkup();
    return;
  }
  return fetchCountries(country).then(renderCountries).catch(showError);
}


function clearMarkup() {
  form.countriesList.innerHTML = '';
  form.countriesInfo.innerHTML = '';
}

function renderCountries(countriesName) {
  clearMarkup();

  if (countriesName.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countriesName.length >= 2 && countriesName.length <= 10) {
    renderCountryInfo(countriesName);
  } else {
    renderCountryInfo(countriesName);
    renderCountryData(countriesName);
  }
}

function renderCountryInfo(countriesName) {
  const markupCountry = countriesName
    .map(({ name, flags }) => {
      return `<li class = "country-list__item">
                <img src="${flags.svg}" alt="${name.official}" width="60" height="45">
                <span class = "country-list__preview">${name.official}</span>
              </li>`;
    })
    .join('');
  form.countriesList.innerHTML = markupCountry;
}

function renderCountryData(countriesName) {
  clearMarkup();

  const markupInfo = countriesName
    .map(({ name, flags, capital, population, languages }) => {
      return `
            <div class="country-list__item">
              <img src="${flags.svg}" alt="${name.official}" width="60" height="45">
              <span class = "country-list__name">${name.official}</span>
            </div>
              <p class = "country-info__data"><b>Capital:</b> ${capital}</p>
              <p class = "country-info__data"><b>Population:</b> ${population}</p>
              <p class = "country-info__data"><b>Languages:</b> ${Object.values(languages)}</p>`;
    })
    .join('');
  form.countriesInfo.innerHTML = markupInfo;
}

function showError() {
  clearMarkup();
  Notify.failure('Oops, there is no country with that name');
}