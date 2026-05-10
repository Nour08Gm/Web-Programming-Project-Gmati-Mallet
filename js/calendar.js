document.addEventListener('DOMContentLoaded', () => {
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Simple events list with year support
    const events = [
        /* october 2025 */
        { day: 18, month: 10, year: 2025, title: 'DE : Introduction to Linux' },
        /* december 2025 */
        { day: 13, month: 12, year: 2025, title: 'DE : Data Structure and Programming 2' },
        { day: 18, month: 12, year: 2025, title: 'DE : Networks 1 : Basic Concepts' },
        /* february 2026 */
        { day: 7, month: 3, year: 2026, title: 'CE : Databases 1: Basic Concepts' },
        { day: 21, month: 3, year: 2026, title: 'DE : Databases 1: Basic Concepts' },
        /* march 2026 */
        { day: 18, month: 4, year: 2026, title: 'CE : Web Programming 1 : HTML, CSS, JS' },
        /* april 2026 */
        { day: 10, month: 5, year: 2026, title: 'Project Deadline : Web Programming 1 : HTML, CSS, JS' },
        { day: 13, month: 5, year: 2026, title: 'TP : Java 1: Fundamentals of OOP' },
        { day: 16, month: 5, year: 2026, title: 'DE : Web Programming 1 : HTML, CSS, JS' },
        { day: 20, month: 5, year: 2026, title: 'CE : Java 1: Fundamentals of OOP' },
        /* may 2026 */
        { day: 3, month: 6, year: 2026, title: 'DE : Java 1: Fundamentals of OOP' }
    ];

    function renderCalendar() {
        document.getElementById('month-year').innerText = monthNames[currentMonth] + " " + currentYear;
        const grid = document.getElementById('calendar-grid');
        grid.innerHTML = ""; // Clear the grid

        // Find out what day of the week the 1st of the month is (1 = Monday, 7 = Sunday)
        let firstDay = new Date(currentYear, currentMonth, 1).getDay();
        if (firstDay === 0) firstDay = 7;

        // Find total days in the month
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Add empty boxes for the days before the 1st
        for (let i = 1; i < firstDay; i++) {
            grid.innerHTML += `<div class="calendar-day empty"></div>`;
        }

        // Add the actual days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            let eventHtml = "";

            // Check if there is an event on this day, month, AND year. 
            // Note: currentMonth is 0-11, so we add 1 to match the 1-12 human format in the events list!
            for (let e of events) {
                if (e.day === i && e.month === (currentMonth + 1) && e.year === currentYear) {
                    eventHtml += `<div class="calendar-event">${e.title}</div>`;
                }
            }

            // Create the HTML for the day box
            grid.innerHTML += `
                <div class="calendar-day">
                    <div class="calendar-day-number">${i}</div>
                    ${eventHtml}
                </div>
            `;
        }
    }

    // Previous month button
    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    // Next month button
    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    // Run the function when the page loads
    renderCalendar();
});
