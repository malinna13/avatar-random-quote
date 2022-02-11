let lang = "en";

const languageToggler = document.querySelector(".toggle");

languageToggler.addEventListener("click", (e) => {
  //depending on textcontent invoke translator
  if (e.target.textContent.trim() === "en") {
    getData();
    lang = "en";
  } else if (e.target.textContent.trim() === "ru") {
    getQuotes();
    lang = "ru";
  }
  changeClassActive("toggle-link", e);
});
function changeClassActive(targetClass, event) {
  // Найти все кнопки используя метод querySelectorAll()
  const buttonItems = document.querySelectorAll(`.${targetClass}`);

  // Убрать у всех кнопок класс active
  buttonItems.forEach((item) => item.classList.remove("active"));

  // Кнопке, на которой произошёл клик - event.target - добавить класс active
  if (event.target.className === targetClass) {
    event.target.classList.add("active");
  }
}
///Сохранение языка в локал стор

function setLocalStorage() {
  localStorage.setItem("lang", lang);
}
window.addEventListener("beforeunload", setLocalStorage);

// извлечение из локал стор

function getLocalStorage() {
  if (localStorage.getItem("lang")) {
    lang = localStorage.getItem("lang");

    activeLangOnLoad(lang);
  } else {
    activeLangOnLoad(lang);
  }
}
window.addEventListener("load", getLocalStorage);
//active lang on load
function activeLangOnLoad(lang) {
  // Найти все кнопки используя метод querySelectorAll()
  const buttonItems = document.querySelectorAll(".toggle-link");

  // Убрать у всех кнопок класс active
  buttonItems.forEach((item) => item.classList.remove("active"));

  buttonItems.forEach((item) => {
    if (item.textContent.trim() === lang) {
      item.classList.add("active");
    }
  });
}
const quoteText = document.querySelector(".quote");
const quoteAuthor = document.querySelector(".quote-author");
const button = document.querySelector(".button");
const image = document.querySelector("img");

async function getData() {
  const url = "https://type.fit/api/quotes";
  const response = await fetch(url);
  const data = await response.json();

  let randomQuoteIndex = Math.floor(Math.random() * data.length);

  const randomQuoteText = data[randomQuoteIndex].text;
  const randomQuoteAuthor = data[randomQuoteIndex].author;

  quoteText.textContent = randomQuoteText;
  quoteAuthor.textContent = randomQuoteAuthor;
  image.src = `https://robohash.org/${avatarName}${type}&size=200x200`;
}

/// From json

async function getQuotes() {
  const quotes = "quotes.json";
  const response = await fetch(quotes);
  const data = await response.json();
  let randomQuoteIndex = Math.floor(Math.random() * data.length);

  const randomQuoteText = data[randomQuoteIndex].text;
  const randomQuoteAuthor = data[randomQuoteIndex].author;

  quoteText.textContent = randomQuoteText;
  quoteAuthor.textContent = randomQuoteAuthor;
  image.src = `https://robohash.org/${avatarName}${type}&size=200x200`;
}

/// submit form
const robotRadio = document.querySelector("#robot");
window.addEventListener("load", () => {
  hint.classList.add("hidden");
});

const nameEl = document.querySelector("#name");
const typeEl = document.querySelectorAll(".check");
const greeting = document.querySelector(".greeting");
const content = document.querySelector(".flex");
const hint = document.querySelector("span");

let avatarName, type;
button.addEventListener("click", (e) => {
  e.preventDefault();
  if (nameEl.value.length !== 0) {
    avatarName = nameEl.value;
    typeEl.forEach((el) => {
      if (el.checked) {
        type = el.value;
      }
    });
    greeting.textContent = `Hi, I'm ${avatarName}! Some quote for you:`;
    if (lang === "en") {
      getData();
    } else {
      getQuotes();
    }
    content.classList.remove("hidden");
    greeting.classList.remove("hidden");
    hint.classList.add("hidden");
  } else {
    content.classList.add("hidden");
    greeting.classList.add("hidden");
    hint.classList.remove("hidden");
  }
});
