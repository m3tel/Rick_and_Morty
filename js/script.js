const data = await sendRequest();
const grid = document.querySelector(".grid");
const selectSorti = document.querySelector("#species");
const input = document.querySelector("#input");

async function sendRequest() {
  let url = "https://rickandmortyapi.com/api/character";
  const api = await fetch(url);
  const data = await api.json();
  return data.results;
}

function createCard(obj) {
  const card = document.createElement("div");
  const cardPicture = document.createElement("div");
  const cardImg = document.createElement("img");
  const biography = document.createElement("div");
  const biographyTitle = document.createElement("h2");
  const biographyStatus = document.createElement("p");
  const biographySpecies = document.createElement("p");
  const biographyGenger = document.createElement("p");

  card.className = "card";
  cardPicture.className = "card__picture";
  cardImg.className = "card__img";
  biography.className = "biography";
  biographyTitle.className = "biography__title";

  cardImg.src = obj.image;
  biographyTitle.textContent = obj.name;
  biographyStatus.textContent = "Status: " + obj.status;
  biographySpecies.textContent = "Species: " + obj.species;
  biographyGenger.textContent = "Gender: " + obj.gender;

  card.append(cardPicture);
  card.append(cardImg);
  card.append(biography);
  biography.append(biographyTitle);
  biography.append(biographyStatus);
  biography.append(biographySpecies);
  biography.append(biographyGenger);

  return card;
}

function createCards(data) {
  data.forEach((card) => grid.append(createCard(card)));
}
createCard(data);
createCards(data);

function selectSort() {
  const newData = data.filter((card) =>
    card.species.includes(selectSorti.value)
  );
  grid.innerHTML = "";
  newData.forEach((card) => grid.append(createCard(card)));
}
selectSorti.addEventListener("change", selectSort);

function nameSearch() {
  const newData = data
    .filter((card) =>
      card.name.toLowerCase().includes(input.value.toLowerCase().trim())
    )
    .filter((card) => card.species.includes(selectSorti.value));
  grid.innerHTML = "";
  newData.forEach((card) => grid.append(createCard(card)));
}
input.addEventListener("input", nameSearch);
