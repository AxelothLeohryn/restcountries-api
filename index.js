const cardTemplate = function (imgUrl, countryName) {
  return `<div class="card">
              <img id="flag-image" src="${imgUrl}" alt="flag" />
              <h2 class="center">${countryName}</h2>
            </div>`;
};

const countriesNode = document.getElementById("countries");

function fetchCountries(regions) {
  fetch("https://restcountries.com/v3.1/all?fields=name,flags,region")
    .then((res) => res.json())
    //Ordeno la lista de countries alfabeticamente antes de seguir
    .then((countries) =>
      countries.sort((a, b) => a.name.common.localeCompare(b.name.common))
    )
    .then((countries) => {
      if (regions) {
        countries = countries.filter((country) =>
          regions.includes(country.region)
        );
        for (let i = 0; i < countries.length; i++) {
          countriesNode.innerHTML += cardTemplate(
            countries[i].flags.png,
            countries[i].name.common
          );
        }
      } else {
        for (let i = 0; i < countries.length; i++) {
          countriesNode.innerHTML += cardTemplate(
            countries[i].flags.png,
            countries[i].name.common
          );
        }
      }
    });
}
fetchCountries();

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  countriesNode.innerHTML = "";
  // console.log(event);

  let regions = [];
  for (let i = 0; i < event.target.length; i++) {
    if (event.target[i].checked === true) regions.push(event.target[i].value);
  }
  // console.log(regions);

  //Si no hay ningun checkbox seleccionado, que aparezcan todos los paises
  regions.length > 0 ? fetchCountries(regions) : fetchCountries();
});
