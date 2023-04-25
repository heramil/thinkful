function findAuthorById(authors, id) {
  let final = authors.find((author) => author.id === id);
  return final;
}

function findBookById(books, id) {
  let final = books.find((book) => book.id === id);
  return final;
}


// try these other two tomorrow night
function partitionBooksByBorrowedStatus(books) {
  let fullAnswer = [];
  let returned = books.filter((book) => book.borrows[0].returned === true);
  let notReturned = books.filter((book) => book.borrows[0].returned === false);
    fullAnswer.push(notReturned);
    fullAnswer.push(returned);
    return fullAnswer;
  }

function getBorrowersForBook(book, accounts) {
  let final = [];
  for (let i = 0; i < book.borrows.length; i++) {
    for (let k = 0; k < accounts.length; k++) {
      if (book.borrows[i].id === accounts[k].id) {
       let merge = {...book.borrows[i], ...accounts[k]};
       final.push(merge);
      }
    }
  }
  borrowersForBookFirstTen = final.slice(0, 10);
  return borrowersForBookFirstTen;
  }
  /*
It should return an array of all the transactions from the
book's `borrows` key. However, each transaction should include 
the related account information and the `returned` key.

  - needs to have the following information all within one object.
    - id of the account that checked it out, the return status from
      said account.
    - all related information of the account.
  - seems like you have to go through each object in the borrows
    array, and provide the account information for the account
    that is given by the id AFTER the original account.id and return
    status.
    - so I need to find a way to append that account information into
    one object, but do that for each object in the borrows array.
  
  */

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
