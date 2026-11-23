
// 2.1

// 2.1 A1
document.querySelector("h1").textContent = "Библиотека колледжа";

// 2.1 A2
document.getElementById("year").textContent = new Date().getFullYear();

// 2.1 A3и»
{
  const auth = document.getElementById("auth");
  auth.textContent = "Здравствуйте, Анна!"; 
  auth.insertAdjacentHTML("beforeend", ' <a href="#">Выйти</a>');
}

// 2.1 A4
{
  const auth = document.getElementById("auth");

  // Вариант 1: textContent
  auth.textContent = "Здравствуйте, <b>Анна</b>!";
  auth.insertAdjacentHTML("beforeend", ' <a href="#">Выйти</a>');
  // На странице буквально написано «Здравствуйте, <b>Анна</b>!».
  // textContent записывает строку как обычный текст и теги не разбирает,
  // поэтому он безопасен для любых данных

  // Вариант 2: innerHTML
  auth.innerHTML = "Здравствуйте, <b>Анна</b>!";
  auth.insertAdjacentHTML("beforeend", ' <a href="#">Выйти</a>');
  // Слово «Анна» выделено жирным, потому что innerHTML разбирает строку как разметку
}

// 2.2
// 2.2 A1.
document.querySelectorAll("th").forEach(th => {
  if (th.hasAttribute("data-sort")) {
    console.log(th.dataset.sort); 
  }
});

// 2.2 A2.
document.querySelectorAll(".take").forEach(btn => {
  btn.setAttribute("title", btn.disabled ? "Книга выдана" : "Взять книгу");
});

// 2.2 A3.
{
  const row6 = document.querySelector('tr.book[data-id="6"]');
  row6.dataset.available = "true";           
  const btn6 = row6.querySelector(".take");
  btn6.disabled = false;                     
  btn6.textContent = "Взять";
  btn6.setAttribute("title", "Взять книгу"); 
  console.log(row6.dataset.available, typeof row6.dataset.available); 
}

// 2.2 B
function parseDataset(ds) {
  const result = {};
  for (const [key, value] of Object.entries(ds)) {
    if (value === "true") result[key] = true;
    else if (value === "false") result[key] = false;
    else if (value.trim() !== "" && !Number.isNaN(Number(value))) result[key] = Number(value);
    else result[key] = value;
  }
  return result;
}
{
  const row = document.querySelector("tr.book");
  const raw = { ...row.dataset };
  console.log(raw);              
  console.log(parseDataset(raw)); 
}


// 2.3


// 2.3 A1
document.querySelectorAll("tr.book").forEach(row => {
  const rating = parseFloat(row.querySelector(".rating").textContent);
  if (rating >= 4.5) row.classList.add("highlight");
});

// 2.3 A2
{
  const login = document.getElementById("login");
  login.classList.remove("hidden");
  console.log("форма видна:", !login.classList.contains("hidden"));
  login.classList.add("hidden");
  console.log("форма скрыта:", login.classList.contains("hidden"));
}

// 2.3 A3
{
  const first = document.querySelector("tr.book");
  console.log(first.classList.contains("highlight")); 
  console.log(first.className);                      
}

// 2.3 A4

{
  const unavailable = document.querySelectorAll('tr.book[data-available="false"]');
  unavailable.forEach(row => { row.style.opacity = "0.5"; });
  console.log(unavailable[0].getAttribute("style"));
  unavailable.forEach(row => { row.style.removeProperty("opacity"); });
}

// 2.3 B
{
  document.querySelectorAll("tr.book").forEach((row, i) => {
    if ((i + 1) % 2 === 1) row.classList.add("odd");
  });
  const style = document.createElement("style");
  style.textContent = ".odd { background: #f4f4f4 }";
  document.head.append(style);
}
// 2.4
function makeLi(text) {
  const li = document.createElement("li");
  li.textContent = text;
  return li;
}

{
  const myList = document.getElementById("my-list");

  // 2.4 A1
  myList.append(makeLi("Гиперион"));

  // 2.4 A2
  myList.prepend(makeLi("Война и мир"));

  // 2.4 A3
  myList.querySelector("li").after(makeLi("Собачье сердце"));

  // 2.4 A4
  myList.lastElementChild.remove();

  // 2.4 A5
  myList.querySelectorAll("li")[1].replaceWith(makeLi("Солярис"));

  console.log([...myList.children].map(li => li.textContent));

  // 2.4 A6
  const tbody = document.querySelector("#books tbody");
  const copy = tbody.querySelector("tr").cloneNode(true);
  copy.dataset.id = "7";
  copy.querySelector(".title").textContent = "Копия";
  tbody.append(copy);
}

// 2.4 B
{
  const myList = document.getElementById("my-list");
  myList.insertAdjacentHTML("beforebegin", '<p class="note">beforebegin: перед списком</p>');
  myList.insertAdjacentHTML("afterbegin", "<li>afterbegin: первый элемент</li>");
  myList.insertAdjacentHTML("beforeend", "<li>beforeend: последний элемент</li>");
  myList.insertAdjacentHTML("afterend", '<p class="note">afterend: после списка</p>');
}


// 2.5


// 2.5 A
function createRow(book) {
  const tr = document.createElement("tr");
  tr.className = "book";
  tr.dataset.id = book.id;
  tr.dataset.genre = book.genre;
  tr.dataset.available = book.available;

  ["title", "author", "year", "genre", "rating"].forEach(field => {
    const td = document.createElement("td");
    td.className = field;
    td.textContent = book[field]; 
    tr.append(td);
  });

  const actionTd = document.createElement("td");
  const btn = document.createElement("button");
  btn.className = "take";
  btn.type = "button";
  btn.disabled = !book.available;
  btn.textContent = book.available ? "Взять" : "Выдана";
  btn.title = book.available ? "Взять книгу" : "Книга выдана";
  actionTd.append(btn);
  tr.append(actionTd);

  return tr;
}

function renderCatalog(list, rowFactory = createRow) {
  const tbody = document.querySelector("#books tbody");
  if (list.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 6;
    td.textContent = "Ничего не найдено";
    tr.append(td);
    tbody.replaceChildren(tr);
    return;
  }
  tbody.replaceChildren(...list.map(book => rowFactory(book)));
}

renderCatalog(books);
console.log("все:", document.querySelectorAll("#books tbody tr").length); 

renderCatalog(books.filter(b => b.available));
console.log("доступные:", document.querySelectorAll("#books tbody tr").length); 

renderCatalog(books.filter(b => b.genre === "Роман"));
console.log("романы:", document.querySelectorAll("#books tbody tr").length);

renderCatalog([...books].sort((a, b) => b.year - a.year));
console.log("по году (убывание):",
  [...document.querySelectorAll("#books tbody .year")].map(td => td.textContent)); 

renderCatalog([]);
console.log("пустой список:", document.querySelector("#books tbody").textContent); 

renderCatalog([{ id: 99, title: "<i>Тест</i>", author: "Автор", year: 2026, genre: "Роман", available: true, rating: 4 }]);


// 2.5 B
function stars(n) {
  const k = Math.round(n);
  return "★".repeat(k) + "☆".repeat(5 - k);
}

function createRowWithStars(book) {
  const tr = createRow(book);
  const td = tr.querySelector(".rating");
  td.dataset.value = book.rating;
  td.textContent = stars(book.rating);
  if (book.rating >= 4.7) td.classList.add("top");
  return tr;
}

renderCatalog(books, createRowWithStars); 



// 2.6


// 2.6 A
function renderMyBooks(userId) {
  const myList = document.getElementById("my-list");
  const items = loans
    .filter(loan => loan.userId === userId && loan.returnedAt === null)
    .map(loan => {
      const book = books.find(b => b.id === loan.bookId);
      if (!book) return null;
      const li = document.createElement("li");
      li.dataset.bookId = book.id;
      li.textContent = `${book.title} — взята ${loan.takenAt}`;
      return li;
    })
    .filter(li => li !== null);

  if (items.length === 0) {
    myList.replaceChildren(makeLi("Нет книг на руках"));
    return;
  }
  myList.replaceChildren(...items);
}

renderMyBooks(1);  
renderMyBooks(2);  
renderMyBooks(99); 

// 2.6 B
function renderHistory(userId) {
  const myList = document.getElementById("my-list");
  let ul = document.getElementById("history");

  if (!ul) { 
    const h3 = document.createElement("h3");
    h3.textContent = "История";
    ul = document.createElement("ul");
    ul.id = "history";
    myList.after(h3, ul);
  }

  const items = loans
    .filter(loan => loan.userId === userId && loan.returnedAt !== null)
    .map(loan => {
      const book = books.find(b => b.id === loan.bookId);
      if (!book) return null;
      const rate = loan.rating === null ? "без оценки" : stars(loan.rating);
      return makeLi(`${book.title} — ${rate}`);
    })
    .filter(li => li !== null);

  ul.replaceChildren(...items);
}

renderMyBooks(1);
renderHistory(1);