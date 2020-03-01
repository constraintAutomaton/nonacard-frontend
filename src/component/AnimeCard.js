import "./CardForm.js";
/**
 * AnimeCard
 * Html tag that show anime card
 */
export default class AnimeCard extends HTMLElement {
  static get observedAttributes() {
    return ["data", "selected"];
  }
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "static/css/animeCard.css");
    this._setContainer.bind(this);

    if (this.hasAttribute("controllerId")) {
      this.controllerId = this.getAttribute("controllerId");
    } else {
      this.controllerId = null;
    }

    shadow.appendChild(linkElem);
    shadow.appendChild(this.container);

    this._setDragAndDrop.bind(this);
  }
  connectedCallback() {
    this.setAttribute("data", JSON.stringify({ card: this.id }));
  }
  selectCard() {
    this.container.classList.add("card-selected");
    this.setAttribute("selected", "true");
    this._noticeControllerCardSelected();
  }
  _noticeControllerCardSelected() {
    const controller = document.getElementById(this.controllerId);
    controller.setAttribute("card", this.id);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "data": {
        if (newValue !== "{}") {
          this.applyChangesAttribute();
        }
        break;
      }
      case "selected": {
        if (newValue === "false") {
          this.container.classList.remove("card-selected");
        }
        break;
      }
    }
  }
  applyChangesAttribute() {
    const data = JSON.parse(this.getAttribute("data"));
    if ("coverImage" in data) {
      this._addImage();
    } else {
      emptyImage();
    }
  }
  _addImage() {
    const image = data["coverImage"]["large"];
    const container = this.container;
    container.style.backgroundImage = `url(${image})`;
    container.style.boxShadow = `2px 2px 2px ${data["coverImage"]["color"]}`;
  }
  emptyImage() {
    const container = this.container;
    container.style.backgroundImage = "";
    container.style.boxShadow = "2px 2px 2px black";
  }
  dragstart_handler(ev) {
    //ev.preventDefault();
    const data = this.getAttribute("data");
    ev.dataTransfer.setData("text/plain", data);
    ev.dataTransfer.dropEffect = "move";
    this.style.opacity = "0";
  }
  dragover_handler(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  }
  // switch card
  drop_handler(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text/plain");
    const jsonData = JSON.parse(data);
    const prevData = this.getAttribute("data");
    const prevJson = JSON.parse(prevData);

    const cardAttribute = jsonData["card"];
    jsonData["card"] = prevJson["card"];
    prevJson["card"] = cardAttribute;

    this.setAttribute("data", JSON.stringify(jsonData));
    document
      .querySelector(`#${prevJson["card"]}`)
      .setAttribute("data", JSON.stringify(prevJson));
  }
  dragend_handler() {
    this.style.opacity = "1";
  }
  _setDragAndDrop() {
    this.ondragstart = this.dragstart_handler;
    this.ondrop = this.drop_handler;
    this.ondragover = this.dragover_handler;
    this.ondragend = this.dragend_handler;
  }
  _setContainer() {
    this.container = document.createElement("div");
    this.container.classList.add("container");
    this.container.draggable = true;
    this.container.innerHTML = `
    <div id="info">
      <img class="option-card" alt="opt   ions" src="static/images/gear.svg"/>
    <div>
    `;
    this.container.querySelector("#info").onclick = this.selectCard.bind(this);
  }
}
customElements.define("anime-card", AnimeCard);
