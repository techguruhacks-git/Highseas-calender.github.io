const calendar = document.getElementById('calendar');
const dates = document.getElementById('dates');
const monthYear = document.getElementById('month-year');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const eventModal = document.getElementById('event');
const close = document.getElementById('close');
const eventDate = document.getElementById('event-date');
const eventName = document.getElementById('event-name');
const saveEvent = document.getElementById('save-event');
const eventList = document.getElementById('event-list');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let events = {};
let currentMarker = 'star';

function CalendarLoad(month, year) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  dates.innerHTML = "";
  monthYear.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

  for (let i = 0; i < firstDay; i++) {
    dates.innerHTML += `<div></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${month + 1}-${day}`;
    const event = events[dateKey];
    const marker = event ? (event.marker === 'heart' ? '❤️' : '⭐') : '';
    dates.innerHTML += `<div data-date="${dateKey}">${day} ${marker}</div>`;
  }

  document.querySelectorAll('#dates div[data-date]').forEach((dateDiv) => {
    dateDiv.addEventListener("click", () => {
      const selectedDate = dateDiv.getAttribute('data-date');
      eventDate.value = selectedDate;
      eventModal.style.display = 'flex';
    });
  });
}

document.querySelectorAll('.marker-btn').forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll('.marker-btn').forEach((b) => b.classList.remove('active'));
    currentMarker = btn.getAttribute('data-marker');
    btn.classList.add('active');
  });
});

saveEvent.addEventListener('click', () => {
  const dateKey = eventDate.value;
  const name = eventName.value.trim();
  if (name) {
    events[dateKey] = { name, marker: currentMarker };
    CalendarLoad(currentMonth, currentYear);
    displayEvents();
    eventModal.style.display = 'none';
    eventName.value = '';
  }
});

function displayEvents() {
  eventList.innerHTML = '<h3>Events</h3>';
  Object.keys(events).forEach((date) => {
    const { name, marker } = events[date];
    const markerSymbol = marker === 'heart' ? '❤️' : '⭐';
    eventList.innerHTML += `<p>${date}: ${markerSymbol} ${name}</p>`;
  });
}

prev.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  CalendarLoad(currentMonth, currentYear);
});

next.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  CalendarLoad(currentMonth, currentYear);
});

close.addEventListener('click', () => {
  eventModal.style.display = 'none';
});

CalendarLoad(currentMonth, currentYear);


