'use strict';
import _ from "lodash";
import "./component/AnimeCard.js";
import "./component/CardForm.js";
import { save, load } from "./util/util.js";

const form = document.createElement("card-form");
form.id = "controller";

const cardsElement = Array.from(document.querySelectorAll(".card"));
const animeCardList = [];
cardsElement.forEach((card, i) => {
  const animeCard = document.createElement("anime-card");
  animeCard.id = `card-${i}`;
  animeCard.controllerId = form.id;
  card.appendChild(animeCard);
  animeCardList.push(animeCard);
});

const userNameElement = document.getElementById("3x3-name");
const name3x3Element = document.getElementById("user");
const storage = localStorage;

document.querySelector(".core").appendChild(form);
document.querySelector("#save").onclick = () => {
  save(animeCardList, name3x3Element.value, userNameElement.value, storage);
};
document.querySelector("#load").onclick = () => {
  load(animeCardList, name3x3Element, userNameElement, storage);
};
load(animeCardList, name3x3Element, userNameElement, storage);