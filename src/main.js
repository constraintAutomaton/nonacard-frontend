import _ from "lodash";
import "./component/AnimeCard.js";
import "./component/CardForm.js";
import { save, load } from "./util/util.js";

const form = document.createElement("card-form");
form.id = "controller";

const cardsElement = Array.from(document.querySelectorAll(".card"));
cardsElement.forEach((card, i) => {
  const animeCard = document.createElement("anime-card");
  animeCard.id = `card-${i}`;
  animeCard.controllerId = form.id;
  card.appendChild(animeCard);
});

document.querySelector(".core").appendChild(form);
document.querySelector("#save").onclick = save;
document.querySelector("#load").onclick = load;

load();
