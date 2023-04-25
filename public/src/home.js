function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  let count = 0;
  let booksBorrowed = books.map(function (book) {
    return book.borrows;
  });

  for (let j = 0; j < booksBorrowed.length; j++) {
    for (let k = 0; k < booksBorrowed[j].length; k++) {
      if (booksBorrowed[j][k].returned === false) {
        count++;
      }
    }
  }
  return count;
}

function getMostCommonGenres(books) {
  /* - Probably need to use the sort or filter method at some 
        point.
     - Return a single array that contains five objects or less, so 
        possibly need to use a break point or something similar.
     - Each object has two keys. Values are the books genres, 
        and the counts of that genre.
     - So, we need to go through the books and count the genres, 
        then pair them up.
                            */
  let genres = {};

  for (let i = 0; i < books.length; i++) {
    if (books[i].genre in genres) {
      genres[books[i].genre].count += 1;
    }
    else {
      genres[books[i].genre] = {};
      genres[books[i].genre].count = 1;
    }
  }
  let arrGenres = [];

  for (key in genres) {
    arrGenres.push({name: key, count: genres[key].count});
  }
  arrGenres.sort((a,b) => {
    return b.count - a.count
  });
  final = arrGenres.slice(0, 5);
  return final;
}

function getMostPopularBooks(books) {
let arrBooks = [];
for (let i = 0; i < books.length; i++) {
  let book = books[i];
arrBooks.push({name: book.title, count: book.borrows.length});
}
arrBooks.sort((a,b) => {
  return b.count - a.count
});
final = arrBooks.slice(0, 5);
return final;
}

function getMostPopularAuthors(books, authors) {
  // need to check if the books[i].authorId === authors[j].id
  // if the book is by the author, then add it's borrowed.length
  // to the count: key.
let arrPopularAuthors = [];
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    for (let j = 0; j < authors.length; j++) {
      let author = authors[j]
      if (book.authorId === author.id) {
        arrPopularAuthors.push({name: author.name.first + " " + authors[j].name.last, count: books[i].borrows.length});
      }
    }
  }
  arrPopularAuthors.sort((a,b) => {
    return b.count - a.count
  });
  final = arrPopularAuthors.slice(0,5);
  return final;
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
