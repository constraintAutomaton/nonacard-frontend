import ApiInterface from "./../util/ApiInterface.js";
export default class CardForm extends HTMLElement {
  static get observedAttributes() {
    return ["card"];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "static/css/cardForm.css");

    this.apiEngine = new ApiInterface();
    this.container = document.createElement("div");
    this.setContainer();

    shadow.appendChild(linkElem);
    shadow.appendChild(this.container);
  }
  connectedCallback() {
    this.container.style.opacity = "0";
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "card": {
        this.unSelectAllCard();
        if (oldValue === newValue || newValue === "null") {
          if (newValue !== "null") {
            this.exitForm();
          }
        } else {
          this.container.style.opacity = "1";
          this.emptyResult();
          this.container.querySelector("input").focus();
        }
        break;
      }
    }
  }
  async showSearchResult() {
    const query = this.container.querySelector("input").value;
    const resultSection = this.container.querySelector(".results");
    resultSection.innerHTML = "";
    if (query != "") {
      const data = await this.apiEngine.searchAnime(query);
      data.forEach(el => {
        const resultLine = this.createResultLine(el);
        resultLine.querySelector(
          ".result"
        ).onclick = this.changeDataOfCurrentCard.bind(this,el);
        resultSection.appendChild(resultLine);
      });
    } else {
      this.emptyResult();
    }
  }
  createResultLine(data) {
    const result = document.createElement("div");
    const title =
      data.title.english != null ? data.title.english : data.title.romaji;
    result.innerHTML = `<span class="result">${title}<span>`;
    return result;
  }
  changeDataOfCurrentCard(data) {
    const card = document.querySelector(`#${this.getAttribute("card")}`);
    data["card"] = this.getAttribute("card");
    card.setAttribute("data", JSON.stringify(data));
  }
  emptyResult() {
    const resultSection = this.container.querySelector(".results");
    resultSection.innerHTML = "";
    this.container.querySelector("input").value = "";
  }
  exitForm() {
    this.container.style.opacity = "0";
    const card = document.getElementById(this.getAttribute("card"));
    card.setAttribute("selected", "false");
    this.setAttribute("card", null);
  }
  unSelectAllCard() {
    const cards = Array.from(document.querySelectorAll("anime-card"));
    cards.forEach(card => {
      if (card.id != this.id) {
        card.setAttribute("selected", "false");
      }
    });
  }
  setContainer() {
    this.container.classList.add("container");
    this.container.innerHTML = `
    <div class="form">
      <input>
      <button>Exit</button>
    </div>
    <div class="results"></div>
    `;
    this.container.querySelector("button").onclick = this.exitForm.bind(this);
    this.container.querySelector("input").oninput = this.showSearchResult.bind(
      this
    );
  }
}

customElements.define("card-form", CardForm);
