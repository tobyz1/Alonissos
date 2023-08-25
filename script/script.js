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
const backDrop = document.getElementById('modalBackDrop')
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function openModal(date) {
    clicked = date

    const eventForDay = events.find(e => e.date == clicked)

    if (eventForDay) {
        console.log('Event already exists')
    } else {
        newEventModal.style.display = 'block'
    }
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

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays

            daySquare.addEventListener('click', () => console.log('click'))
        } else {
            daySquare.classList.add('padding')
        }
    calendar.appendChild(daySquare)
    }
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
}




initButtons()
load()