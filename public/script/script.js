const hamburgerButton = document.querySelector(".nav-toggler");
const navigation = document.querySelector("nav");

hamburgerButton.addEventListener("click", toggleNav);


function toggleNav() {
  hamburgerButton.classList.toggle("active");
  navigation.classList.toggle("active");
}


const slider = document.querySelector(".slider");

const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
const indicatorParents = document.querySelector('.slider-controls ul');
let sectionIndex = 0;
let numberOfSlide = 10;


document.querySelectorAll('.slider-controls li').forEach(function (indicator, ind) {
    indicator.addEventListener('click', function () {
        sectionIndex = ind;
        document.querySelector('.slider-controls .selected').classList.remove('selected');
        indicator.classList.add('selected');
        slider.style.transform = 'translate(' + (sectionIndex) * -100/numberOfSlide +'%)';
    });
});

rightArrow.addEventListener('click', function () {
    sectionIndex = (sectionIndex < numberOfSlide-1) ? sectionIndex + 1 : numberOfSlide-1;
    document.querySelector('.slider-controls .selected').classList.remove('selected');
    indicatorParents.children[sectionIndex].classList.add('selected');
    slider.style.transform = 'translate(' + (sectionIndex) * -100/numberOfSlide +'%)';
});

leftArrow.addEventListener('click', function () {
    sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0;
    document.querySelector('.slider-controls .selected').classList.remove('selected');
    indicatorParents.children[sectionIndex].classList.add('selected');
    slider.style.transform = 'translate(' + (sectionIndex) * -100/numberOfSlide +'%)';
});

let nav = 0
let clicked = null
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []

const calendar = document.getElementById('calendar')
const newEventModal = document.getElementById('newEventModal')
const deleteEventModal = document.getElementById('deleteEventModal')
const backDrop = document.getElementById('modalBackDrop')
const eventTitleInput = document.getElementById('eventTitleInput')
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const nameOfBooker = document.getElementById('nameInput')
const emailOfBooker = document.getElementById('emailInput')
const dateReservation = document.getElementsByClassName('dateReservation')
let firstDate = document.getElementById('firstDate')
let secondDate = document.getElementById('secondDate')
const dt = new Date()
const day = dt.getDate()
const month = dt.getMonth()
const year = dt.getFullYear()

 function formatDate(date) {
            var year = date.getFullYear();
            var month = String(date.getMonth() + 1).padStart(2, '0');
            var day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
}
        
function parseDate(dateString) {
    const dateParts = dateString.split('-');
    const day = parseInt(dateParts[2]);
    const month = parseInt(dateParts[1]) - 1; // Les mois dans l'objet Date commencent à 0
    const year = parseInt(dateParts[0]);
    
    return new Date(year, month, day);
}


function openModal(date) {
    clicked = date

    const eventForDay = events.find(e => e.date == clicked)

    if (eventForDay) {
        document.getElementById('eventText').innerText = eventForDay.title
        deleteEventModal.style.display = 'block'
    } else {
        visitorModal.style.display = 'block'
        const dateParts = clicked.split('/')
        const isoDateString = dateParts[2] + '-' + (dateParts[1].length === 1 ? '0' : '') + dateParts[1] + '-' + (dateParts[0].length === 1 ? '0' : '') + dateParts[0]
        const currentDayString = `${year}-0${month + 1}-${day}`

        const dateSecondString = isoDateString
        const startDate = parseDate(dateSecondString)
        const endDate = new Date(startDate.getTime() + 8 * 24 * 60 * 60 * 1000)
        const newIsoDateString = endDate.toISOString().split('T')[0];

        secondDate.setAttribute('value', newIsoDateString)
        secondDate.setAttribute('min', newIsoDateString)
        firstDate.setAttribute('value', isoDateString)  
        firstDate.setAttribute('min', currentDayString)
        firstDate.addEventListener("change", function() {
            let selectedDate = new Date(firstDate.value)
            if (!isNaN(selectedDate)) {
                let checkOutDate = new Date(selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000)
                let formattedCheckOutDate = formatDate(checkOutDate)
                secondDate.value = formattedCheckOutDate
                secondDate.min = formattedCheckOutDate
            }
        })
    }
    backDrop.style.display = 'flex'
}

function load() {
    const dt = new Date()

    if(nav !== 0){
        dt.setMonth(new Date().getMonth() + nav)
    }

    const day = dt.getDate()
    const month = dt.getMonth()
    const year = dt.getFullYear()

    const fisrtDayOfMonth = new Date(year, month, 1)
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const dateString = fisrtDayOfMonth.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    })
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0])

    document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`
    
    calendar.innerHTML = ''

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div')
        daySquare.classList.add('day')
        const dayString = `${i - paddingDays}/${month + 1}/${year}`
        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays
            const eventForDay = events.find(e => e.date === dayString)
            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay'
            }

            if (eventForDay) {
                const eventDiv = document.createElement('div')
                eventDiv.classList.add('event')
                eventDiv.innerText = eventForDay.title
                daySquare.classList.replace('day', 'bookDay')
                daySquare.appendChild(eventDiv)        
            }

            daySquare.addEventListener('click', () => openModal(dayString))
        } else {
            daySquare.classList.add('padding')
        }
    calendar.appendChild(daySquare)
    }
}

const passwordAdmin = document.getElementById('pass')
const usernameAdmin = document.getElementById('username')

function closeModal() {
    eventTitleInput.classList.remove('error')
    visitorModal.style.display = 'none'
    adminZone.style.display='none'
    deleteEventModal.style.display = 'none'
    backDrop.style.display = 'none'
    passwordAdmin.value = ''
    usernameAdmin.value = ''
    eventTitleInput.value = ''
    nameOfBooker.value = ''
    emailOfBooker.value = ''
    clicked = null
    load()
}
// function saveEvent() {
//     if (eventTitleInput.value) {
//         eventTitleInput.classList.remove('error')

//         events.push({
//             date: clicked,
//             title: eventTitleInput.value
//         })

//         localStorage.setItem('events', JSON.stringify(events))
//         closeModal()
//     } else {
//         eventTitleInput.classList.add('error')
//     }
// }
// function deleteEvent() {
//     events = events.filter(e => e.date !== clicked)
//     localStorage.setItem('events', JSON.stringify(events))
//     closeModal()
// }
const adminZone = document.getElementById('adminZone')
function openAdminModal() {
    closeModal()
    adminZone.style.display = 'block'
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++
        load()
    })
    document.getElementById('backButton').addEventListener('click', () => {
        nav--
        load()
    })
   
    document.getElementById('submitButton').addEventListener('click', postForms)
    document.getElementById('cancelVisitorZone').addEventListener('click', closeModal)

    document.getElementById('adminButton').addEventListener('click', openAdminModal)

    // document.getElementById('sign-inAdminButton').addEventListener('click', verifAuthentification)
    document.getElementById('cancelAuthentificationButton').addEventListener('click',closeModal)
//     document.getElementById('deleteButton').addEventListener('click', deleteEvent)
//     document.getElementById('closeButton').addEventListener('click', closeModal)
//  document.getElementById('saveButton').addEventListener('click', saveEvent)

}



function postForms() {
const reservationForm = document.querySelector('#reservationForm')
let nom = document.getElementById('nameInput')
let email = document.getElementById('emailInput')
let date1 = document.getElementById('firstDate')
let date2 = document.getElementById('secondDate')
let textarea = document.getElementById('textAreaInput')
        
    reservationForm.addEventListener("submit", (e) => {
        e.preventDefault()

    let formData = {
        nom: nom.value,
        email: email.value,
        date1: date1.value,
        date2: date2.value,
        textarea: textarea.value
        }
    
    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/')
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.onload = function () {
        console.log(xhr.responseText)
        if (xhr.responseText == 'success') {
            alert('Email Sent')
            nom.value = ''
            email.value = ''
            date1.value = ''
            date2.value = ''
            textarea.value = ''
        } else {
            alert('Something went wrong')
        }
    }

    xhr.send(JSON.stringify(formData))

})   
}


initButtons()
load()
