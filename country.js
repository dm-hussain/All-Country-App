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



const countryName = decodeURIComponent(window.location.search.substring(1));

const backBtn = document.querySelector('.back-button');
backBtn.addEventListener('click', () => {
  window.history.back();
});

const detailsContainer = document.querySelector('.details-container');

fetch(`https://restcountries.com/v3.1/name/${countryName}`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const countryDetails = document.createElement('div');
    countryDetails.classList.add(
      'country-details',
      'absolute',
      'top-52',
      'md:top-80',
      'flex',
      'flex-col',
      'md:flex-row',
      'md:gap-8'
    );

    countryDetails.innerHTML = `

     <div>
                <img src=${data[0].flags.svg} class="md:max-w-[30vw] px-4 " alt="flag">
            </div>

            <div class="md:max-w-[50vw] px-4 py-4  ">     
                <h2 class="text-2xl font-bold my-6">${data[0].name.common}</h2>

                <div class="country-all-details md:flex md:justify-between ">
                   <div >                   
                    <p class="font-semibold mb-2">Native Name:  <span class="font-normal">${
                      Object.values(data[0].name.nativeName)[0]?.common
                    }</span></p>
                    <p class="font-semibold mb-2">Population:  <span class="font-normal">${data[0].population.toLocaleString(
                      'en-IN'
                    )}</span></p>
                    <p class="font-semibold mb-2">Region:  <span class="font-normal">${
                      data[0].region
                    }</span></p>
                    <p class="font-semibold mb-2">Sub Region:  <span class="font-normal">${
                      data[0].subregion
                    }</span></p>
                    <p class="font-semibold mb-2">Capital:  <span class="font-normal">${
                      data[0].capital
                    }</span></p>
                   </div>
                    <div>
                        <p class="font-semibold mb-2">Top Level Domain:  <span class="font-normal">${data[0].tld.join(
                          ', '
                        )}</span></p>
                        <p class="font-semibold mb-2">Currencies:  <span class="font-normal">${
                          Object.values(data[0].currencies)[0].name
                        }</span></p>
                        <p class="font-semibold mb-2">Languages:  <span class="font-normal">${Object.values(
                          data[0].languages
                        )}</span></p>
                    </div>
              </div>

               <div class="mt-6">
            <p class="font-bold mb-2 flex items-center   ">Border Countries: &nbsp 
            <div class="all-border-anchor-tag  flex flex-wrap justify-center"> </div>
                
             </p>
        </div> 

               
                

`;

    detailsContainer.append(countryDetails);

    if (data[0].borders) {
      //   console.log(data[0].borders);

      data[0].borders.forEach((border) => {
        // console.log(border);

        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => {
            return res.json();
          })
          .then(([bCountry]) => {
            const borderCountry = document.createElement('a');
            borderCountry.classList.add(
              'inline-block',
              'font-normal',
              'hover:cursor-pointer',
              'bg-inherit',
              'border-2',
              'rounded-md',
              'px-4',
              'py-1',
              'shadow-sm',
              'm-1'
            );

            borderCountry.innerHTML = ` ${bCountry.name.common} `;
            borderCountry.href = `/country.html?${bCountry.name.common}`;
            document.querySelector("body > main > div > div > div.md\\:max-w-\\[50vw\\].px-4.py-4 > div.mt-6 > div").append(borderCountry);
          });
      });
    }
  });



const darkBtn = document.querySelector('.dark-mode');
const body = document.querySelector('body');
const allCountryCard = document.querySelectorAll('.country-card');
// debugger
let isLightMode = (localStorage.getItem('lightModeLocal')) || 'ON';

localStorage.setItem('lightModeLocal', isLightMode);
// debugger
previousMode();
function previousMode() {
  if (isLightMode==='ON') {
    body.classList.remove('bg-gray-600', 'text-gray-100'); // Remove dark mode classes
    body.classList.add('bg-white', 'text-black'); // Add light mode classes
   
  } else {
    body.classList.remove('bg-white', 'text-black'); // Remove light mode classes
    body.classList.add('bg-gray-600', 'text-gray-100'); // Add dark mode classes
   
  }
}

darkBtn.addEventListener('click', () => {
    // debugger
  if (isLightMode==='ON') {
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



