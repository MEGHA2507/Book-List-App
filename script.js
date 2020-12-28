//Book Constructor
 function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
 }

 //Ui constructor
 function UI(){}

 UI.prototype.addBookToList = function(book){
     const list = document.querySelector('#book-list');

     const row = document.createElement('tr');
     row.innerHTML = `
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.isbn}</td>
     <td><a href="#" class="deleted">X</a></td>
     `;

     list.appendChild(row);
 }

 UI.prototype.clearFields = function(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
 }

 UI.prototype.showAlert = function(message, className){

    const alert = document.createElement('div');
    alert.classList = `alert ${className}`;

    alert.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(alert, form);

    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);

 }

 UI.prototype.deleteBook = function(target){
     if(target.className === 'delete'){
         target.parentElement.parentElement.remove();
     }
 }

 // Event Listeners
 document.querySelector('#book-form').addEventListener('submit', 
 function(e){
     // getting form data
     const title = document.querySelector('#title').value;
     const author = document.querySelector('#author').value;
     const isbn = document.querySelector('#isbn').value;

     // instantiate book
     const book = new Book(title, author, isbn);

     // instantiate ui
     const ui = new UI();

     //Validations
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please enter all the fields', 'error');
    }else{
        // add book to list 
     ui.addBookToList(book);

     ui.showAlert('Book Added!', 'success');

     ui.clearFields();
    }

    e.preventDefault();
 })

 // event listener for delete
 document.getElementById('book-list').addEventListener('click', function(e){

    console.log('deleted clicked');

    const ui = new UI();
    ui.deleteBook(e.target);

    ui.showAlert('Book Removed!!', 'success');

    e.preventDefault();
 })

 