'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     console.log(data);

//     const html = `
//   <article class="country">
//           <img class="country__img" src="${data.flags.png}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name.common}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(
//               +data.population / 1000000
//             ).toFixed(1)} people</p>
//             <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
//             <p class="country__row"><span>💰</span>${data.currencies.name}</p>
//           </div>
//         </article>
//   `;

//     countriesContainer.insertAdjacentHTML('beforeEnd', html);
//     countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('new zealand');
// getCountryData('nigeria');

////////////////////////////////////////////////////

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
              <h3 class="country__name">${data.name.common}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)} people</p>
              <p class="country__row"><span>🗣️</span>${data.languages.eng}</p>
              <p class="country__row"><span>💰</span>${data.currencies.name}</p>
            </div>
          </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeEnd', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  //JAX call country one
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    console.log(data);

    //render country1
    renderCountry(data);

    //get neighbour country2
    const [neighbour] = data.borders;
    if (!neighbour) return;

    //JAX call country two
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('nigeria');
