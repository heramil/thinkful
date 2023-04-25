function findAccountById(accounts, id) {
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].id === id) {
      return accounts[i];
    }
  }
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1 : -1));
  return accounts;
}

function numberOfBorrows(account, books) {
  let result = books.reduce((acc, book) => {
    for(let i = 0; i < book.borrows.length; i++) {
      if(book.borrows[i].id === account.id) {
        acc++
      }}
      return acc
    },0)
    return result
  }
function getBooksPossessedByAccount(account, books, authors) {
  // returns all of the books taken out by an account with the
  // author embedded.
let booksAndAuthors = [];
// for loop through each book
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    // for loop through each borrows
    for (let j = 0; j < book.borrows.length; j++) {
      for (let k = 0; k < authors.length; k++) {
      // check if borrows id is equal to account id & return is false.
    if (book.borrows[j].id === account.id && book.borrows[j].returned === false && authors[k].id === book.authorId) {
      booksAndAuthors.push({id : book.id, 
                            title: book.title, 
                            genre: book.genre, 
                            authorId: book.authorId, 
                            author: authors[k], 
                            borrows: book.borrows[j]});
      // for loop through booksAndAuthors and match author id with authors.id
    }
  }
}
}
return booksAndAuthors;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
