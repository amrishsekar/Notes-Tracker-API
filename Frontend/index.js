const addCard = document.querySelector(".addnotes")

const modalContent = document.querySelector(".modal-overlay")

const inputform = document.querySelector(".inputform")

const closeBtn = document.querySelector("#close")

const add = document.querySelector(".add-btn")

const notecard = document.querySelector(".notecard")

const title = document.querySelector(".title")

const description = document.querySelector(".description")

const sun = document.querySelector(".sun-icon")

const moon = document.querySelector(".moon-icon")

let dateValue = new Date().toDateString().slice(4)
// console.log(edit)

moon.addEventListener("click",()=>{
    window.document.documentElement.classList.add('dark-theme');
    sun.style.display = "block"
    moon.style.display = "none"
})

sun.addEventListener("click",()=>{
    window.document.documentElement.classList.remove('dark-theme');
    sun.style.display = "none" 
    moon.style.display = "block"
})

addCard.addEventListener("click", () => {
    modalContent.classList.add("change")
})

closeBtn.addEventListener("click", () => {
    modalContent.classList.remove("change")
})

add.addEventListener("click",()=>{

    if(title.value !== "" && description.value !== ""){
        if(add.innerText === "Add Note"){

            if (window.document.documentElement.classList.contains('dark-theme')) {
                window.document.documentElement.classList.add('dark-theme')
                sun.style.display = "block"
                moon.style.display = "none"
            }
            else{
                window.document.documentElement.classList.remove('dark-theme')
                sun.style.display = "none"
                moon.style.display = "block"
            }

            fetch("http://localhost:3000/posts",{
                method: 'POST',
                body: JSON.stringify({
                    title: title.value,
                    description: description.value,
                    date: dateValue
                }),
                headers: {
                'Content-type': 'application/json',
                }

            }).then((respnse)=>respnse.json)
            .then((json)=>console.log(json)).catch((error) => console.log(error));

        }
    }

})

window.addEventListener("DOMContentLoaded",()=>{
    fetch("http://localhost:3000/posts")
    .then(responce => responce.json())
    .then(json =>{
        json.forEach(element => {
            let div = document.createElement("div")
            div.setAttribute("class","data")

            let title = document.createElement("h3")
            title.setAttribute("class","h3Text")
            title.innerText = element.title

            let horizontalLine1 = document.createElement("hr")
            horizontalLine1.setAttribute("class","horizontalLine1")

            let description = document.createElement("article")
            description.setAttribute("class","articleText")
            description.innerText = element.description

            let horizontalLine2 = document.createElement("hr")
            horizontalLine2.setAttribute("class","horizontalLine2")

            let footer = document.createElement("div")
            footer.setAttribute("class","footer-div")

            let date = document.createElement("span")
            date.setAttribute("class","date")
            date.innerHTML = dateValue

            let iconsDiv = document.createElement("div")
            iconsDiv.setAttribute("class","icons-div")

            let edit = document.createElement("button")
            edit.setAttribute("class","edit")
            edit.setAttribute("id",`${element.id}`)
            edit.innerHTML = '<i class="fa-solid fa-edit"></i>'

            let trash = document.createElement("button")
            trash.setAttribute("class","trash")
            trash.setAttribute("id",`${element.id}`)
            trash.innerHTML = '<i class="fa-solid fa-trash"></i>'

            

            notecard.appendChild(div)
            div.appendChild(title)
            div.appendChild(horizontalLine1)
            div.appendChild(description)
            div.appendChild(horizontalLine2)
            div.appendChild(footer)
            footer.appendChild(date)
            footer.appendChild(iconsDiv)
            iconsDiv.appendChild(edit)
            iconsDiv.appendChild(trash)
        });

        // Delete functionality
        const trash = document.querySelectorAll('.trash')
            for (let t = 0; t < trash.length; t++) {
            trash[t].addEventListener("click",(e)=>{
                fetch(`http://localhost:3000/posts/${e.target.parentElement.id}`,{
            
                method : "DELETE"

                })
                location.reload()
            })
        }

        // Edit functionality
        const edit = document.querySelectorAll(".edit")
        for (let u = 0; u < edit.length; u++) {

            edit[u].addEventListener("click", (e) => {

                let updateId=e.target.parentElement.id
                modalContent.classList.add("change")
                add.innerText = "Update";

                title.value = e.target.parentElement.parentElement.parentElement.parentElement.children[0].innerText
                description.value = e.target.parentElement.parentElement.parentElement.parentElement.children[2].innerText

                add.addEventListener("click",(e)=>{
                    if(title.value!=="" && description.value!==""){
                        if(add.innerText === "Update"){
                            e.preventDefault()
                            fetch(`http://localhost:3000/posts/${updateId}`,{
                                method: 'PUT',
                                body: JSON.stringify({
                                    title: title.value,
                                    description: description.value,
                                    date: dateValue,
                                    id: updateId
                                }),
                                headers: {
                                    'Content-type': 'application/json',
                                }
                            }).then(res=>res.json()).then(data=>console.log(data))

                        }
                    }
                })
                
            })
            
        }
    })
})