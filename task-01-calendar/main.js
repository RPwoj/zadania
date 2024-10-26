const calendarGenerator = {

    init() {
        this.inputYear       = document.querySelector('.input-year'),
        this.inputMonth      = document.querySelector('.input-month'),
        this.generateBtn     = document.querySelector('.generate-btn'),

        this.monthNameHolder = document.querySelector('.month-holder'),
        this.yearHolder      = document.querySelector('.year-holder'),
        this.calendar        = document.querySelector('.calendar'),

        this.generateBtn.addEventListener('click', this.generateCard);

        calendarGenerator.generateCard();
    },

    generateCard() {
        let year          = calendarGenerator.inputYear.value;
        const month       = calendarGenerator.inputMonth;
        const monthNumber = calendarGenerator.inputMonth.value;
        const monthName   = month.options[month.selectedIndex].text;

        if (!year) {
            year = 2024;
            calendarGenerator.inputYear.value = year;
        }

        if (year && monthNumber) {
            calendarGenerator.monthNameHolder.innerText = '';
            calendarGenerator.yearHolder.innerText = '';

            calendarGenerator.monthNameHolder.innerText = monthName;
            calendarGenerator.yearHolder.innerText = year;

            calendarGenerator.generateDays(monthNumber);
        }
    },

    generateDays(monthNumber) {
        calendarGenerator.calendar.innerHTML = '';
        
        let daysCount;
        monthNumber = parseInt(monthNumber);

        if ([4,6,9,11].includes(monthNumber)) {
            daysCount = 30;
        } else if (monthNumber == 2) {
            daysCount = 28;
        } else {
            daysCount = 31;
        }

        let cardAllDays = (Math.ceil(daysCount / 7) * 7);
        let restDay = 1;

        for(let i = 1; i < cardAllDays + 1; i++) {
            const day = document.createElement('span');
            day.classList.add('day');

            if (i < daysCount + 1) {
                day.innerText = i;
            } else {
                day.innerText = restDay;
                day.classList.add('next-month-day');
                restDay++;
            }

            calendarGenerator.calendar.appendChild(day);
        }
    }
}

window.addEventListener('load', () => {
    calendarGenerator.init();
});