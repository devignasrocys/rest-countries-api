const BTN = document.getElementById("btn");
const BODY = document.getElementById("body");
const HEADER = document.getElementById("header-bg");
const INPUT = document.getElementById("search-input");
const SELECT = document.getElementById("select");
const COUNTRIES_LIST = document.getElementById("countries-list");
const COUNTRIES_CARD = document.querySelectorAll('article');

const toggleTheme = () => {
  BODY.classList.toggle("white-theme");
  HEADER.classList.toggle("white-theme");
  BTN.classList.toggle("white-theme");
  INPUT.classList.toggle("input-white-theme");
  SELECT.classList.toggle("white-theme");
  COUNTRIES_CARD.forEach(card => card.classList.toggle('white-theme'))
};

BTN.addEventListener("click", toggleTheme);

const fetchByRegion = (region) => {
  let promise = fetch(`https://restcountries.com/v3.1/region/${region}`).then(
    (data) => data.json()
  );
  return promise;
};

const populateUIwithCoutries = async (region = 'europe') => {
  let test = await fetchByRegion(region);
 
  COUNTRIES_LIST.innerHTML = '';
  test.forEach((data) => {
    console.log(data);
    let card = `<article>
    <div class="column">
        <img src=${data.flags.png} alt="countries flag">
    </div>
    <div class="column">
        <h4>${data.name.common}</h4>
        <p>Population: ${data.population}</p>
        <p>Region: ${data.region}</p>
        <p>Capital: ${data.name.common}</p>
    </div>
</article>`;

    COUNTRIES_LIST.insertAdjacentHTML("beforeend", card);
  });
};

populateUIwithCoutries();
SELECT.addEventListener('change', (e) => {
    populateUIwithCoutries(e.target.value)
} )