const searchInput = document.getElementById("search");
const resultBoard = document.getElementById("results");
const filterSelect = document.getElementById("char");

let filters = {
  name: "",
  temperament: "",
};

//create cards function
const createCard = (dogName, breedFor, breedGroup, lifeSpan, imageUrl) => {
  //create card
  let card = document.createElement("div");
  card.className = "card";

  //image
  let cardImage = document.createElement("div");
  cardImage.className = "card__image";
  cardImage.style.backgroundImage = `url(${imageUrl})`;

  //content
  let cardContent = document.createElement("div");
  cardContent.className = "card__content";
  //h2
  let h2 = document.createElement("h2");
  h2.innerText = dogName;
  //p
  let p = document.createElement("p");
  p.innerHTML = `${breedFor} <br> ${breedGroup} <br> ${lifeSpan}`;

  //add elements to content
  cardContent.appendChild(h2);
  cardContent.appendChild(p);

  //add elements to card
  card.appendChild(cardImage);
  card.appendChild(cardContent);

  return card;
};

//print cards function
const printCards = (arr) => {
  arr.forEach((el) => {
    resultBoard.appendChild(
      createCard(
        el.breeds[0].name,
        el.breeds[0].bred_for,
        el.breeds[0].breed_group,
        el.breeds[0].life_span,
        el.url
      )
    );
  });
};

//print all cards initially
printCards(data);

//debounce
const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

//filter data by filters
const filterData = () => {
  //clear results board
  resultBoard.innerHTML = "";
  //by name from search
  let searchResults = data.filter((el) => {
    return (
      el.breeds[0].name.toLowerCase().includes(filters.name.toLowerCase()) &&
      el.breeds[0].temperament
        .toLowerCase()
        .includes(filters.temperament.toLowerCase())
    );
  });

  if (searchResults.length > 0) {
    //print search results
    printCards(searchResults);
  } else {
    let h3 = document.createElement("h3");
    h3.className = "container__text";
    h3.innerText = "No dogs";
    resultBoard.appendChild(h3);
  }
};

//handle input search
const handleSearch = debounce(() => {
  filters.name = searchInput.value;

  //filter data
  filterData();
}, 250);

searchInput.addEventListener("keyup", handleSearch);
filterSelect.addEventListener("change", (e) => {
  filters.temperament = e.target.value;

  //filter data
  filterData();
});
