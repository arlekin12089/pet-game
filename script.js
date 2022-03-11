class Pet {
  constructor(name, animalType, tiredness = 50, hunger = 50, loneliness = 50, happiness = 50) {
    this.name = name;
    this.animalType = animalType;
    this.tiredness = tiredness;
    this.hunger = hunger;
    this.loneliness = loneliness;
    this.happiness = happiness;
  }
  nap() {
    this.tiredness = this.coerce(this.tiredness - 50);
    this.happiness = this.coerce(this.happiness - 20);
    this.hunger = this.coerce(this.hunger + 20);
    this.loneliness = this.coerce(this.loneliness + 20);
  }

  play() {
    if (this.tiredness < 70) {
      this.happiness = this.coerce(this.happiness + 30);
      this.hunger = this.coerce(this.hunger + 20);
      this.tiredness = this.coerce(this.tiredness + 20);
      this.loneliness = this.coerce(this.loneliness - 10);
    }
  }

  eat() {
    this.hunger = this.coerce(this.hunger - 60);
    this.tiredness = this.coerce(this.tiredness + 10);
  }
  coerce(num) {
    let minValue = 0;
    let maxValue = 100;
    if (num < minValue) {
      return minValue;
    } else if (num > maxValue) {
      return maxValue;
    } else {
      return num;
    }
  }
}

let selectAnimalBtn = document.querySelector(".select-animal");
let petNameInput = document.getElementById("pet-name");
let animalsSelect = document.getElementById("animals");
let petContainer = document.querySelector(".pet-container");
let message = document.querySelector(".message");

let petImages = {
  dog: "https://i.pinimg.com/originals/57/f6/0f/57f60f6b0ce8e090d5cab00fde17132f.jpg",
  cat: "https://cdn.mos.cms.futurecdn.net/VSy6kJDNq2pSXsCzb6cvYF-1200-80.jpg",
  parrot: "https://image.posterlounge.se/images/big/1873562.jpg",
};

function showImage(pet) {
  if (pet.animalType === "dog") {
    return petImages.dog;
  } else if (pet.animalType === "cat") {
    return petImages.cat;
  } else {
    return petImages.parrot;
  }
}

function drawPet(pet) {
  let elem = document.createElement("div");
  elem.classList.add("pet");
  elem.innerHTML = `
  <h2 class="title"> ${pet.name}</h2>
  <div class="pet-img" style = "background-image: url(${showImage(pet)})"></div>
  <p class="type">Type: ${pet.animalType}</p>
  <ul>
    <li>
		<label for="tiredness">Tiredness</label>
      <progress id="tiredness" value=${pet.tiredness} max="100" class="tiredness"></progress>
    </li>
    <li>
	<label for="tiredness">Hunger</label>
      <progress id="hunger" value=${pet.hunger} max="100" class="hunger"></progress>
    </li>
    <li>    
	<label for="tiredness">Loneliness</label>
    <progress id="loneliness" value=${pet.loneliness} max="100" class="loneliness"></progress>
    </li>
    <li>
	<label for="tiredness">Happiness</label>
      <progress id="happiness" value=${pet.happiness} max="100" class="happiness"></progress>
    </li>
  </ul>
  <div class="actions-btn">
    <button class="nap btn btn--red">Nap</button>
    <button class="play btn btn--green">Play</button>
    <button class="eat  btn btn--yellow">Eat</button
  </div>
`;

  petContainer.appendChild(elem);
  let tirednessElem = elem.getElementsByClassName("tiredness")[0];
  let hungerElem = elem.getElementsByClassName("hunger")[0];
  let lonelinessElem = elem.getElementsByClassName("loneliness")[0];
  let happinessElem = elem.getElementsByClassName("happiness")[0];
  elem.getElementsByClassName("nap")[0].addEventListener("click", () => {
    pet.nap();
    tiredness.value = pet.tiredness;
    hunger.value = pet.hunger;
    loneliness.value = pet.loneliness;
    happiness.value = pet.happiness;
    message.innerHTML = `You take a nap <b>${pet.name}</b>!`;
	console.log(`You take a nap ${pet.name}!`);
  });

  elem.getElementsByClassName("play")[0].addEventListener("click", () => {
    pet.play();
    tirednessElem.value = pet.tiredness;
    hungerElem.value = pet.hunger;
    lonelinessElem.value = pet.loneliness;
    happinessElem.value = pet.happiness;
	message.innerHTML = `You play with <b>${pet.name}</b>!`;
    console.log(`You play with ${pet.name}!`);
  });

  elem.getElementsByClassName("eat")[0].addEventListener("click", () => {
    pet.eat();
    tirednessElem.value = pet.tiredness;
    hungerElem.value = pet.hunger;
    lonelinessElem.value = pet.loneliness;
    happinessElem.value = pet.happiness;
	message.innerHTML = `You eat with <b>${pet.name}</b>!`;
    console.log(`You eat with ${pet.name}!`);
  });
}

selectAnimalBtn.addEventListener("click", () => {
  let petNameInputValue = petNameInput.value;
  let animalsSelectValue = animalsSelect.value;
  let pet = new Pet(petNameInputValue, animalsSelectValue);
  drawPet(pet);
});
