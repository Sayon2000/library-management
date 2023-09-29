document.getElementById('addbook').addEventListener('submit',addBook)

const books = document.querySelector('#display ul')
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
const li = document.createElement('li')
const time = new Date(data.createdAt)
time.setHours(time.getHours() + 5)
time.setMinutes(time.getMinutes() + 30)

const p = document.createElement('p')
p.textContent = `Book Name : ${data.bookName}`
const p2 = document.createElement('p')
p2.textContent = `Book taken on  : ${time.toLocaleString()}`
time.setHours(time.getHours() + 1)
const p3 = document.createElement('p')
p3.textContent = `Book return date : ${time.toLocaleString()}`
const p4 = document.createElement('p')
const fine = Math.floor((new Date() - new Date(data.createdAt)) / (1000  * 60 *60))

p4.textContent = `current fine : ${fine}`
li.appendChild(p)
li.appendChild(p2)
li.appendChild(p3)
li.appendChild(p4)

const returnBook = document.createElement('button')
returnBook.textContent = "return book"
li.appendChild(returnBook)
returnBook.onclick = ()=>{
    li.innerHTML = ``
    const input = document.createElement('input')
    const fine = Math.floor((new Date() - new Date(data.createdAt)) / (1000  * 60 *60))
    input.value = fine
    input.readOnly = true
    const button = document.createElement('button')
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

books.appendChild(li)

}

function returnedBooksDisplay(data){
    const li = document.createElement('li')

    const p = document.createElement('p')
    p.textContent = `Book Name : ${data.bookName}`
    const p1 = document.createElement('p')
p1.textContent = `fine : ${data.fine}`
li.appendChild(p)
li.appendChild(p1)

    returned.appendChild(li)
}