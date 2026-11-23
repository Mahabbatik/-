class Library {
  constructor({ books, users, loans }) {
    this.books = books;
    this.users = users;
    this.loans = loans;
    this.currentUser = null;
  }

  find({ query = "", genre = "", sortKey = null, sortDir = 1 } = {}) {
    const q = query.trim().toLowerCase();

    let result = this.books.filter(book => {
      const matchesQuery =
        q === "" ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q);
      const matchesGenre = genre === "" || book.genre === genre;
      return matchesQuery && matchesGenre;
    });

    if (sortKey) {
      result = [...result].sort((a, b) => {
        if (typeof a[sortKey] === "string") {
          return a[sortKey].localeCompare(b[sortKey], "ru") * sortDir;
        }
        return (a[sortKey] - b[sortKey]) * sortDir;
      });
    }

    return result;
  }

  takeBook(bookId) {
    if (!this.currentUser) {
      throw new Error("Войдите, чтобы взять книгу");
    }
    const book = this.books.find(b => b.id === bookId);
    if (!book) {
      throw new Error("Книга не найдена");
    }
    if (!book.available) {
      throw new Error("Книга уже выдана");
    }

    const maxId = this.loans.length
      ? Math.max(...this.loans.map(l => l.id))
      : 0;

    const loan = {
      id: maxId + 1,
      userId: this.currentUser.id,
      bookId: book.id,
      takenAt: new Date().toISOString().slice(0, 10),
      returnedAt: null,
      rating: null
    };

    this.loans.push(loan);
    book.available = false;
    return loan;
  }

  getActiveLoans(userId) {
    return this.loans.filter(l => l.userId === userId && l.returnedAt === null);
  }
}