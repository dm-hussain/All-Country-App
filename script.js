const loader = document.querySelector('.pre-loader');

window.addEventListener('load', () => {
  loader.classList.remove(
    'w-[100%]',
    'h-[100vh]',
    'bg-[#1B1941]',
    'relative',
    'z-50',
    "bg-[url('./preloader.gif')]",
    'bg-[length:200px]',
    'bg-no-repeat',
    'bg-center'
  );
});

const countrySection = document.querySelector('.country-section');

fetch('https://restcountries.com/v3.1/all')
  .then((res) => {
    return res.json();
  })
  .then((allCountryData) => {
    allCountryData.forEach((country) => {
      const countryCard = document.createElement('a');

      countryCard.href = `/country.html?${country.name.common}`;
      countryCard.classList.add(
        'country-card',
        'w-80',
        'shadow-md',
        'rounded-md',
        'm-4',
        'overflow-hidden',
        'bg-inherit',
        'hover:scale-105',
        'transition-transform',
        'duration-300',
        'ease-in-out',
        'hover:shadow-lg'
      );

      const cardHtml = `
        <img src=${country.flags.svg} alt="flag" />
          <div class="p-6">
          <p class="font-bold text-xl  mb-6">${country.name.common}</p>
          <p class="font-bold mb-2">Population:  <span class="font-normal">${country?.population.toLocaleString(
            'en-IN'
          )}</span></p>
          <p class="font-bold mb-2">Region:  <span class="font-normal">${
            country?.region
          }</span></p>
          <p class="font-bold mb-2">Capital:  <span class="font-normal">${
            country?.capital || 'No Capital Available'
          }</span></p>
          </div>


       
`;

      countryCard.innerHTML = cardHtml;
      countrySection.append(countryCard);
    });
  });

// Dark mode and Light mode feature...............................

const darkBtn = document.querySelector('.dark-mode');
const body = document.querySelector('body');
const allCountryCard = document.querySelectorAll('.country-card');
// debugger
let isLightMode = localStorage.getItem('lightModeLocal') || 'ON';

localStorage.setItem('lightModeLocal', isLightMode);
// debugger
previousMode();
function previousMode() {
  if (isLightMode === 'ON') {
    body.classList.remove('bg-gray-600', 'text-gray-100'); // Remove dark mode classes
    body.classList.add('bg-white', 'text-black'); // Add light mode classes
  } else {
    body.classList.remove('bg-white', 'text-black'); // Remove light mode classes
    body.classList.add('bg-gray-600', 'text-gray-100'); // Add dark mode classes
  }
}

darkBtn.addEventListener('click', () => {
  // debugger
  if (isLightMode === 'ON') {
    body.classList.remove('bg-white', 'text-black'); // Remove light mode classes
    body.classList.add('bg-gray-600', 'text-gray-100'); // Add dark mode classes
    isLightMode = 'OFF';
    localStorage.setItem('lightModeLocal', isLightMode);
  } else {
    body.classList.remove('bg-gray-600', 'text-gray-100'); // Remove dark mode classes
    body.classList.add('bg-white', 'text-black'); // Add light mode classes
    isLightMode = 'ON';
    localStorage.setItem('lightModeLocal', isLightMode);
  }
});

// search box section................

const userInpEl = document.querySelector('#user-input');
const countryCardAll = document.querySelectorAll('.country-card');

userInpEl.addEventListener('input', (e) => {
  let userInpValue = e.target.value;
  countrySection.innerHTML = '';

  fetch(`https://restcountries.com/v3.1/name/${e.target.value}`)
    .then((res) => {
      return res.json();
    })
    .then((allCountryData) => {
      allCountryData.forEach((country) => {
        const countryCard = document.createElement('a');

        countryCard.href = `/country.html?${country.name.common}`;
        countryCard.classList.add(
          'country-card',
          'w-80',
          'shadow-md',
          'rounded-md',
          'm-4',
          'overflow-hidden',
          'bg-inherit',
          'hover:scale-105',
          'transition-transform',
          'duration-300',
          'ease-in-out',
          'hover:shadow-lg'
        );

        const cardHtml = `
        <img src=${country.flags.svg} alt="flag" />
          <div class="p-6">
          <p class="font-bold text-xl  mb-6">${country.name.common}</p>
          <p class="font-bold mb-2">Population:  <span class="font-normal">${country?.population.toLocaleString(
            'en-IN'
          )}</span></p>
          <p class="font-bold mb-2">Region:  <span class="font-normal">${
            country?.region
          }</span></p>
          <p class="font-bold mb-2">Capital:  <span class="font-normal">${
            country?.capital || 'No Capital Available'
          }</span></p>
          </div>


       
`;

        countryCard.innerHTML = cardHtml;
        countrySection.append(countryCard);
      });
    });
});

userInpEl.addEventListener('change', () => {
  userInpEl.value = '';
});

// Filter By region Section.................

const filterByReg = document.querySelector('#dropdown');

filterByReg.addEventListener('change', (e) => {
  console.log(e.target.value);
  countrySection.innerHTML = '';

  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => {
      return res.json();
    })
    .then((allCountryData) => {
      allCountryData.forEach((country) => {
        const countryCard = document.createElement('a');

        countryCard.href = `/country.html?${country.name.common}`;
        countryCard.classList.add(
          'country-card',
          'w-80',
          'shadow-md',
          'rounded-md',
          'm-4',
          'overflow-hidden',
          'bg-inherit',
          'hover:scale-105',
          'transition-transform',
          'duration-300',
          'ease-in-out',
          'hover:shadow-lg'
        );

        const cardHtml = `
        <img src=${country.flags.svg} alt="flag" />
          <div class="p-6">
          <p class="font-bold text-xl  mb-6">${country.name.common}</p>
          <p class="font-bold mb-2">Population:  <span class="font-normal">${country?.population.toLocaleString(
            'en-IN'
          )}</span></p>
          <p class="font-bold mb-2">Region:  <span class="font-normal">${
            country?.region
          }</span></p>
          <p class="font-bold mb-2">Capital:  <span class="font-normal">${
            country?.capital || 'No Capital Available'
          }</span></p>
          </div>


       
`;

        countryCard.innerHTML = cardHtml;
        countrySection.append(countryCard);
      });
    });
});
