function updateCountdown() {
    const targetDate = new Date("August 17, 2023 00:00:00").getTime();
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;

    if (timeRemaining > 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // const countdownString = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
        document.getElementById('day').innerText = days;
        document.getElementById('hour').innerText = hours;
        document.getElementById('minute').innerText = minutes;
        document.getElementById('second').innerText = seconds;
    } else {
        document.getElementById('countdown').innerText = "It's here!";
    }
}
setInterval(updateCountdown, 1000);