// 1.1.A1
console.log("Адрес страницы:", location.href);
console.log("Имя файла:", location.pathname.split("/").pop());
console.log("Язык браузера:", navigator.language);
console.log("Ширина окна:", window.innerWidth);
console.log("Высота окна:", window.innerHeight);
console.log("Онлайн:", navigator.onLine);

// 1.1.A2
const userName = prompt("Как вас зовут?");
console.log(userName === null ? "Аноним" : userName);

// 1.1.A3
setTimeout(() => { location.hash = "#my"; }, 3000);
setTimeout(() => { location.hash = "#catalog"; }, 6000);

// 1.1.B
let seconds = 0;
const timerId = setInterval(() => {
  seconds++;
  console.log(`Вы на странице ${seconds} с`);
  if (seconds === 10) {
    clearInterval(timerId);
  }
}, 1000);

// 1.2.A1
const nav = document.querySelector("nav");
console.log("nav.childNodes:", nav.childNodes.length);
console.log("nav.children:", nav.children.length);

// 1.2.A2
// childNodes включает все дочерние узлы: элементы и текстовые узлы
// children включает только дочерние элементы. Поэтому childNodes всегда больше или равен children, а если
// между тегами есть переносы строк то числа разные.
for (const id of ["#my-list", "#my", "main"]) {
  const el = document.querySelector(id);
  console.log(id, "childNodes:", el.childNodes.length, "children:", el.children.length);
}

// 1.2.A3
const myList = document.getElementById("my-list");
console.log("nodeType первого узла #my-list:", myList.firstChild.nodeType);
console.log("nodeType последнего узла #my-list:", myList.lastChild.nodeType);

// 1.2.B
function countNodes(node) {
  const result = { 1: 0, 3: 0 };
  result[node.nodeType] = (result[node.nodeType] || 0) + 1;
  for (const child of node.childNodes) {
    const sub = countNodes(child);
    for (const type in sub) {
      result[type] = (result[type] || 0) + sub[type];
    }
  }
  return result;
}
console.log("countNodes(document.body):", countNodes(document.body));

// 1.3
const table = document.getElementById("books");

// 1.3.A1
const columns = Array.from(table.tHead.rows[0].cells).map(cell => cell.textContent);
console.log("Колонки:", columns);

// 1.3.A2
const tbody = table.tBodies[0];
console.log("Автор третьей книги:", tbody.rows[2].cells[1].textContent);

// 1.3.A3
for (const row of tbody.rows) {
  console.log(`${row.cells[0].textContent} — ${row.cells[1].textContent}`);
}

// 1.3.A4
const lastRow = tbody.lastElementChild;
console.log("Последняя книга:", lastRow.cells[0].textContent);

// 1.3.A5
let row = tbody.firstElementChild;
while (row) {
  console.log("data-id строки:", row.dataset.id);
  row = row.nextElementSibling;
}

// 1.3.B
let minRow = tbody.rows[0];
for (const r of tbody.rows) {
  if (Number(r.cells[2].textContent) < Number(minRow.cells[2].textContent)) {
    minRow = r;
  }
}
console.log(`Минимальный год: ${minRow.cells[0].textContent} (${minRow.cells[2].textContent})`);

// 1.4.1
const allTitles = Array.from(document.querySelectorAll("#books .title"))
  .map(td => td.textContent);
console.log("1. Названия:", allTitles);

// 1.4.2
const availableCount = document.querySelectorAll('#books tr[data-available="true"]').length;
console.log("2. Доступно книг:", availableCount);

// 1.4.3
const takenTitles = Array.from(document.querySelectorAll('#books tr[data-available="false"] .title'))
  .map(td => td.textContent);
console.log("3. Выданы:", takenTitles);

// 1.4.4
const fantasyBooks = document.querySelectorAll('#books tr[data-genre="Фантастика"]');
console.log("4. Фантастика, строк:", fantasyBooks.length);

// 1.4.5
const bulgakov = Array.from(document.querySelectorAll("#books .author"))
  .filter(td => td.textContent.includes("Булгаков"))
  .map(td => td.parentElement.cells[0].textContent);
console.log("5. Булгаков:", bulgakov);

// 1.4.6
console.log("6. Последняя строка:", document.querySelector("#books tbody tr:last-child"));

// 1.4.7
console.log("7. Чётные строки:", document.querySelectorAll("#books tbody tr:nth-child(even)"));

// 1.4.8
console.log("8. Сортируемые th:", document.querySelectorAll("#books th[data-sort]"));

// 1.4.9
console.log("9. Якорные ссылки:", document.querySelectorAll('a[href^="#"]'));

// 1.4.10
console.log("10. Обязательные поля:", document.querySelectorAll("#add-form [required]"));

// 1.4.B
function titlesByGenre(genre) {
  return Array.from(document.querySelectorAll(`#books tr[data-genre="${genre}"] .title`))
    .map(td => td.textContent);
}
console.log("Романы:", titlesByGenre("Роман"));
console.log("Фантастика:", titlesByGenre("Фантастика"));
console.log("Повести:", titlesByGenre("Повесть"));

// 1.5
for (const r of Array.from(tbody.rows)) {
  r.remove();
}
console.log("Строк .book осталось:", document.getElementsByClassName("book").length);