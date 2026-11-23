//3.4
const library = new Library({ books, users, loans });

const state = { query: "", genre: "", sortKey: null, sortDir: 1 };

const tbody = document.querySelector("#books tbody");

function createRow(book) {
  const tr = document.createElement("tr");
  tr.className = "book";
  tr.dataset.id = book.id;
  tr.dataset.genre = book.genre;
  tr.dataset.available = book.available;

  tr.innerHTML = `
    <td class="title"></td>
    <td class="author"></td>
    <td class="year"></td>
    <td class="genre"></td>
    <td class="rating"></td>
  `;
  tr.querySelector(".title").textContent = book.title;
  tr.querySelector(".author").textContent = book.author;
  tr.querySelector(".year").textContent = book.year;
  tr.querySelector(".genre").textContent = book.genre;
  tr.querySelector(".rating").textContent = book.rating;

  const td = document.createElement("td");
  const btn = document.createElement("button");
  btn.className = "take";
  btn.type = "button";
  if (book.available) {
    btn.textContent = "Взять";
    btn.addEventListener("click", () => take(book.id));
  } else {
    btn.textContent = "Выдана";
    btn.disabled = true;
  }
  td.append(btn);
  tr.append(td);

  return tr;
}

function renderCatalog(list) {
  tbody.replaceChildren(...list.map(createRow));
}

function refresh() {
  renderCatalog(library.find(state));
  renderMyBooks();
}


document.querySelector('#search-form input[name="q"]').addEventListener("input", e => {
  state.query = e.target.value;
  refresh();
});


document.querySelector('#search-form select[name="genre"]').addEventListener("change", e => {
  state.genre = e.target.value;
  refresh();
});


document.querySelector("#search-form").addEventListener("submit", e => {
  e.preventDefault();
  refresh();
});


document.querySelectorAll("th[data-sort]").forEach(th => {
  th.addEventListener("click", () => {
    const key = th.dataset.sort;
    if (state.sortKey === key) {
      state.sortDir = -state.sortDir;
    } else {
      state.sortKey = key;
      state.sortDir = 1;
    }
    refresh();
  });
});

//3.5
function take(bookId) {
  try {
    library.takeBook(bookId);
    refresh();
  } catch (e) {
    alert(e.message);
  }
}

function renderMyBooks() {
  const ul = document.querySelector("#my-list");
  ul.replaceChildren();

  if (!library.currentUser) return;

  const active = library.getActiveLoans(library.currentUser.id);
  const template = document.createElement("template");
  for (const loan of active) {
    const book = library.books.find(b => b.id === loan.bookId);
    if (!book) continue;
    const li = document.createElement("li");
    li.dataset.bookId = book.id;
    li.textContent = book.title;
    ul.append(li);
  }
}

library.currentUser = null;

refresh();