//show a darker color on the page which is currently open
showColors();
function showColors(){
    let list=document.getElementsByClassName('list')[1];
    list.style.backgroundColor='orangered';
}
//show list on loading the website
showBooks();
//an alert that appears when form data not saved by using reset
let reset = document.getElementById('reset');
reset.addEventListener('click', () => {
    let div = document.getElementById('message');
    let html = `<div class="failure" id="alert">
              The Book was not added to your list!
                  </div>`
    div.innerHTML = html;
    setTimeout(() => {
        div.innerHTML = '';
    }, 3000);
});
//adding an event listener to submit button to collect the data of the form and add it to the local storage
let submit = document.getElementById('submit');
submit.addEventListener('click', storeData);
function storeData() {
    let books = localStorage.getItem('books');
    //to check for the key in the local storage
    if (books == null) {
        bookObjects = [];
    }
    else {
        bookObjects = JSON.parse(books);
    }
    let input1 = document.getElementById('input1').value;
    let input2 = document.getElementById('input2').value;
    let type;
    let radio1 = document.getElementById('radio1');
    let radio2 = document.getElementById('radio2');
    let radio3 = document.getElementById('radio3');
    //to define a type based on the checked value
    if (radio1.checked) {
        type = radio1.value;
    }
    else if (radio2.checked) {
        type = radio2.value;
    }
    else if (radio3.checked) {
        type = radio3.value;
    }
    //to validate the inputs
    if (input1 === '' || input2 === '') {
        let div = document.getElementById('message');
        let html1 = `<div class="failure" id="alert">
                        Input Fields cannot be empty, please fill them and try again!
                   </div>`;
        div.innerHTML = html1;
        setTimeout(() => {
            div.innerHTML = '';
        }, 5000);
    }
    else if(radio1.checked==false&&radio2.checked==false&&radio3.checked==false){
        let div = document.getElementById('message');
        let html2 = `<div class="failure" id="alert">
                        Please select the type of book and try again!
                </div>`;
        div.innerHTML = html2;
        setTimeout(() => {
            div.innerHTML = '';
        }, 5000);
    }
    //to add the data in the local storage
    else {
        let book = new Book(input1, input2, type);
        bookObjects.push(book);
        localStorage.setItem('books', JSON.stringify(bookObjects));
        input1='';
        input2='';
        let div = document.getElementById('message');
        let html3 = `<div class="success" id="alert">
                        The Book was successfully added to your custom Book-list!
                   </div>`;
        div.innerHTML = html3;
        setTimeout(() => {
            div.innerHTML = '';
        }, 5000);
        showBooks();
    }
}
//making a class to create objects which will contain information about the book
class Book {
    constructor(bookName, authorName, type) {
        this.bookname = bookName;
        this.authorname = authorName;
        this.type = type;
    }
}
//function to show the list in the form of a table
function showBooks(){
    //to check for the key in the local storage
    let books=localStorage.getItem('books');
    if (books == null) {
        bookObjects = [];
    }
    else {
        bookObjects = JSON.parse(books);
    }
    let html4='';
    bookObjects.forEach((element,index) => {
        html4+=`<tr id="${index}row">
                    <td>${element.bookname}</td>
                    <td>${element.authorname}</td>
                    <td>${element.type}</td>
                    <td><button id="${index}" onclick="deleteIt(this.id)" class="btn">Delete</button></td>
                </tr>`;
        let tabody=document.getElementsByTagName('tbody')[0];
        tabody.innerHTML=html4;        
    });
}
//function to delete a particular entry of the list
function deleteIt(index){
    //to check for the key in the local storage
    let books=localStorage.getItem('books');
    let tempRow=document.getElementById(`${index}row`);
    if (books == null) {
        bookObjects = [];
    }
    else {
        bookObjects = JSON.parse(books);
    }
    let tempName=bookObjects[index];
    let div = document.getElementById('message');
    let html3 = `<div class="failure" id="alert">
                    The ${tempName.bookname} Book was removed from your custom Book-list
                </div>`;
    div.innerHTML = html3;
    setTimeout(() => {
        div.innerHTML = '';
    }, 7000);
    bookObjects.splice(index,1);
    localStorage.setItem('books',JSON.stringify(bookObjects));
    tempRow.style.display='none';
    showBooks();
}
