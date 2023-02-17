let list = []
let allNotes = []
let all = false
let totalNumber;
let activeNotes = []
let activeList = []
let active = false
let activeNumber;
let completedNotes = []
let completedList = []
let completed = false
let completedNumber;
let num = 0;

let root = document.documentElement;
let banner = document.getElementById("banner")
let image = document.getElementById("image");
let inputField = document.getElementById("text")
let check = document.getElementById("check")

let webNotes = document.getElementById("notes")

image.addEventListener('click', changeMode)

document.querySelector('#text').addEventListener('keypress', function(event) {
    if(event.key === 'Enter'){
        text = inputField.value
        num += 1
        let note = 
                `<div id="${num}" class="noteItem" draggable="true" ondrag="drag(event)" ondrop="rearrange(event)"  ondragover="allowDrop(event)" onmouseover="show(event)" onmouseout="hide(event)">
                    <div class="check" onclick="mark(event)"><img class="img" src=""></img></div>
                    <p class="text">${text}</p>
                    <div class="cross" onclick="destroy(event)"></div>
                </div>` 
        if(!text.trim() == '' && !activeList.includes(text)){
            list.push(note)
            activeNotes.push(note)
            activeList.push(text)
            inputField.value = ''
            active = true
            all = false
            completed = false
            document.querySelector('#active').style.color = 'skyblue'
            document.querySelector('#all').style.color = '#7a7e7e'
            document.querySelector('#completed').style.color = '#7a7e7e'
            printactive();
        }else{
            alert('Empty string or Similar item found')
            inputField.value = ''
        }
    }
})

// function show(event){
//     let element = (event.target).id
//     element -= 1
//     document.getElementsByClassName('cross')[element].style.display = 'block'
// }
// function hide(event){
//     let element = (event.target).id
//     element -= 1
//     document.getElementsByClassName('cross')[element].style.display = 'none'
// }

function printall(){
    webNotes.innerHTML = ''

    allNotes = completedNotes.concat(activeNotes)
    if (allNotes.length == 0){
        document.querySelector("#count").innerHTML = `0 items`
    }
    for (i = 0; i < allNotes.length; i++){
        webNotes.innerHTML += allNotes[i]
        totalNumber = allNotes.length
        document.querySelector("#count").innerHTML = `${totalNumber} total items`

        if (completedNotes.includes(allNotes[i])){
            document.getElementsByClassName('check')[i].style.setProperty('background', 'linear-gradient(120deg, rgba(11, 208, 243, 0.781)10%, rgba(200, 16, 236, 0.76)70%)')
            document.getElementsByClassName('check')[i].style.setProperty('border', 'none')
            document.getElementsByClassName('img')[i].src = './images/icon-check.svg'
        }else if(activeNotes.includes(allNotes[i])){
            document.getElementsByClassName('check')[i].style.setProperty('background', 'transparent')
            document.getElementsByClassName('check')[i].style.setProperty('border', '1px solid #7e7a7a')
            document.getElementsByClassName('img')[i].src = ''
        }
    }
}

function printactive(){
    webNotes.innerHTML = ''

    if (activeNotes.length == 0){
        document.querySelector("#count").innerHTML = `0 items left`
    }
    for (i = 0; i < activeNotes.length; i++){
        webNotes.innerHTML += activeNotes[i]
        activeNumber = activeNotes.length
        document.querySelector("#count").innerHTML = `${activeNumber} items left`

        document.getElementsByClassName('check')[i].style.setProperty('background', 'transparent')
        document.getElementsByClassName('check')[i].style.setProperty('border', '1px solid #7e7a7a')
        document.getElementsByClassName('img')[i].src = ''

    }
}

function printcompleted(){
    webNotes.innerHTML = ''

    if (completedNotes.length == 0){
        document.querySelector("#count").innerHTML = '0 items done'
    }
    for (i = 0; i < completedNotes.length; i++){
        webNotes.innerHTML += completedNotes[i]
        completedNumber = completedNotes.length
        document.querySelector("#count").innerHTML = `${completedNumber} items done`
        
        document.getElementsByClassName('check')[i].style.setProperty('background', 'linear-gradient(120deg, rgba(11, 208, 243, 0.781)10%, rgba(200, 16, 236, 0.76)70%)')
        document.getElementsByClassName('check')[i].style.setProperty('border', 'none')
        document.getElementsByClassName('img')[i].src = './images/icon-check.svg'
        
    }
}

// mark notes as completed
function mark(event){
    let index;
    let element = (event.target).parentNode
    let container = document.createElement('div')
    container.appendChild(element)
    let data = container.innerHTML
    let text = element.getElementsByClassName('text')[0].innerHTML
    
    if(activeList.includes(text) && !completedList.includes(text)){
        index = activeList.indexOf(text)
        activeNotes.splice(index, 1)
        activeList.splice(index, 1)
        
        completedNotes.push(data)
        completedList.push(text)
    }else if (completedList.includes(text) && !activeList.includes(text)){
        index = completedList.indexOf(text)
        completedNotes.splice(index, 1)
        completedList.splice(index, 1)

        activeNotes.push(data)
        activeList.push(text)
    }    
    if(activeList.includes(text) && completedList.includes(text)){
        alert('Similar item active and completed')
    }


    if(document.querySelector('#all').style.color == 'skyblue'){
        printall()
    }else if(document.querySelector('#active').style.color == 'skyblue'){
        printactive()
    }else if(document.querySelector('#completed').style.color == 'skyblue'){
        printcompleted()
    }
}

// cancel notes or delete notes
function destroy(event){
    let index;
    let element = (event.target).parentNode  //get call object
    element.remove()
    let container = document.createElement('div')
    container.appendChild(element)
    let text = element.getElementsByClassName('text')[0].innerHTML

    if(activeList.includes(text)){
        index = activeList.indexOf(text)
        activeNotes.splice(index, 1)
        activeList.splice(index, 1)
    }
    if(completedList.includes(text)){
        index = completedList.indexOf(text)
        completedNotes.splice(index, 1)
        completedList.splice(index, 1)
    }

    activeNumber -= 1;
    if (activeNumber == 0){
        document.querySelector("#count").innerHTML = `0 items left`
    }else{
        document.querySelector("#count").innerHTML = `${activeNumber} items left`
    }
    if(all){
        printall()
    }else if(active){
        printactive()
    }else if(completed){
        printcompleted()
    }
}

// clear or delete all completed task
function clearcompleted (){
    completedNotes = []
    if(completed){
        printcompleted()
    }
    if(all){
        printall()
    }
};

document.querySelector('#all').addEventListener('click', e => {
    all = true
    active = false
    completed = false
    document.querySelector('#all').style.color = 'skyblue'
    document.querySelector('#active').style.color = '#7e7a7a'
    document.querySelector('#completed').style.color = '#7e7a7a'
})
document.querySelector('#all').addEventListener('mouseover', e => {
    if (!all){
        document.querySelector('#all').style.color = 'var(--textcolor)'
    }
})
document.querySelector('#all').addEventListener('mouseout', e => {
    if (!all){
        document.querySelector('#all').style.color = '#7a7e7e'
    }
})
document.querySelector('#active').addEventListener('click', e => {
    active = true
    all = false
    completed = false
    document.querySelector('#active').style.color = 'skyblue'
    document.querySelector('#all').style.color = '#7a7e7e'
    document.querySelector('#completed').style.color = '#7a7e7e'
})
document.querySelector('#active').addEventListener('mouseover', e => {
    if (!active){
        document.querySelector('#active').style.color = 'var(--textcolor)'
    }
})
document.querySelector('#active').addEventListener('mouseout', e => {
    if (!active){
        document.querySelector('#active').style.color = '#7a7e7e'
    }
})
document.querySelector('#completed').addEventListener('click', e => {
    completed = true
    all = false
    active = false
    document.querySelector('#completed').style.color = 'skyblue'
    document.querySelector('#all').style.color = '#7a7e7e'
    document.querySelector('#active').style.color = '#7a7e7e'
})
document.querySelector('#completed').addEventListener('mouseover', e => {
    if (!completed){
        document.querySelector('#completed').style.color = 'var(--textcolor)'
    }
})
document.querySelector('#completed').addEventListener('mouseout', e => {
    if (!completed){
        document.querySelector('#completed').style.color = '#7a7e7e'
    }
})

function changeMode(){
    if (image.getAttribute('src') == './images/icon-sun.svg'){
        // lightmode
        image.src = './images/icon-moon.svg'
        banner.src = './images/bg-desktop-light.jpg'
        root.style.setProperty('--color', '#fafafa')
        root.style.setProperty('--textcolor', '#111')
        root.style.setProperty('--backgroundColor', '#fff')
        root.style.setProperty('--shadow', '#ccc')
    }else{
        // darkmode
        image.src = './images/icon-sun.svg'
        banner.src = './images/bg-desktop-dark.jpg'
        root.style.setProperty('--color', '#222232')
        root.style.setProperty('--textcolor', '#fff')
        root.style.setProperty('--backgroundColor', '#333348')
        root.style.setProperty('--shadow', '#222225')   
    }
}

function allowDrop(event) {
    event.preventDefault()
}

let dragged;
let draggedData;
let draggedText;

function drag(event){
    let element = (event.target)
    let container = document.createElement('div')
    container.appendChild(element)
    let data = container.innerHTML
    let text = element.getElementsByClassName('text')[0].innerHTML
    
    if(activeList.includes(text)){
        draggedData = data
        draggedText = text
        dragged = activeList.indexOf(text)
    }
}

function rearrange(event){
    event.preventDefault()
    let element = (event.target)
    let text = element.getElementsByClassName('text')[0].innerHTML
    let index = activeList.indexOf(text)
    
    activeNotes.splice(dragged, 1)
    activeList.splice(dragged, 1)

    activeNotes.splice(index, 0, draggedData)
    activeList.splice(index, 0, draggedText)

    if(active){
        printactive()
    }
    if(all){
        printall()
    }    
}
document.querySelector('#noteItem').addEventListener('dragend', e => {
    if(active){
        printactive()
    }
    if(all){
        printall()
    }
})