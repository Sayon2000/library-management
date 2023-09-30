document.getElementById('addbook').addEventListener('submit',addBook)

const books = document.querySelector('#display')
const returned = document.querySelector('#returned ul')


const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/library'
  });
  
window.addEventListener('load' , async()=>{
    try{
        const data =await axiosInstance.get()
        console.log(data)
        data.data.forEach(book =>{
            if(book.returned)
                returnedBooksDisplay(book)
            else
                display(book)
        })
    }catch(e){
        console.log(e)
    }
}
)

async function addBook(e){
    e.preventDefault();
try{
    const data = {
        name : e.target.name.value
    }

    const res = await axiosInstance.post('/add' ,data)
    display(res.data)
    console.log(res.data)
    e.target.name.value =""
}catch(e){
    console.log(e)
}
}


function display(data){
const li = document.createElement('div')
li.classList.add("items")
const date1 = new Date(data.updatedAt);

const formattedDate = date1.toLocaleDateString();

const formattedTime = date1.toLocaleTimeString(undefined, {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
});

const p = document.createElement('p')
p.textContent = `Book Name : ${data.bookName}`
const p2 = document.createElement('p')
p2.textContent = `Book taken on  :  ${formattedDate} , ${formattedTime}`
date1.setHours(date1.getHours() + 1)
const formattedTime1 = date1.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });
  
const p3 = document.createElement('p')
p3.textContent = `Book return date :  ${date1.toLocaleDateString()} , ${formattedTime1}`
const p4 = document.createElement('p')
const hours = Math.floor((new Date() - new Date(data.createdAt)) / (1000  * 60 *60))
const fine = hours *10;

p4.textContent = `current fine : ${fine}`
li.appendChild(p)
li.appendChild(p2)
li.appendChild(p3)
li.appendChild(p4)

const returnBook = document.createElement('button')
returnBook.textContent = "Return book"
li.appendChild(returnBook)
returnBook.onclick = ()=>{
    li.innerHTML = ``
    const input = document.createElement('input')
    const hours = Math.floor((new Date() - new Date(data.createdAt)) / (1000  * 60 *60))
    if(hours == 0){
        axiosInstance.post('/return' ,{id : data.id , value : 0})
        .then((data)=>{
            console.log(data)
            books.removeChild(li)
            returnedBooksDisplay(data.data.book)
        }).catch(e => console.log(e))
    }else{

    
    const fine = hours * 10
    input.value = fine
    input.readOnly = true
    input.disabled =  true;
    input.className = "show-fine"
    const button = document.createElement('button')
    button.classList.add("pay-fine")
    button.textContent = "pay"
    li.appendChild(input)
    li.appendChild(button)
    button.onclick = ()=>{
        axiosInstance.post('/return' ,{id : data.id , value : fine})
        .then((data)=>{
            console.log(data)
            books.removeChild(li)
            returnedBooksDisplay(data.data.book)
        }).catch(e => console.log(e))
    }
}
    }

books.appendChild(li)

}

function returnedBooksDisplay(data){
    const li = document.createElement('li')
    console.log(data)
    const p = document.createElement('p')
    p.textContent = `Book Name : ${data.bookName}`
    const p1 = document.createElement('p')
    p1.textContent = `fine : ${data.fine}`
    const p2 = document.createElement('p')
    const date1 = new Date(data.updatedAt);

const formattedDate = date1.toLocaleDateString();

const formattedTime = date1.toLocaleTimeString(undefined, {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
});
p2.textContent = `returned on : ${formattedDate} , ${formattedTime}`
li.appendChild(p)
li.appendChild(p1)
li.appendChild(p2)

    returned.appendChild(li)
}