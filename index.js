// dom update waktu
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

const dataPermainan = [
    { nama: "John Doe", age: 25, jenisLomba: "balap karung" },
    { nama: "Jane Smith", age: 30, jenisLomba: "balap karung" },
    { nama: "Michael Johnson", age: 28, jenisLomba: "makan kerupuk" },
    { nama: "Emily Brown", age: 22, jenisLomba: "catur" },
    { nama: "Robert Lee", age: 27, jenisLomba: "pensil dalam botol" },
    { nama: "Sophia Miller", age: 24, jenisLomba: "enggrang" },
    { nama: "William Wilson", age: 26, jenisLomba: "balap karung" },
    { nama: "Olivia Taylor", age: 29, jenisLomba: "kelereng" },
    { nama: "James Anderson", age: 23, jenisLomba: "makan kerupuk" },
    { nama: "Ava Martinez", age: 31, jenisLomba: "catur" },
];

// dont delete this
const dummy = [
    { nama: "Michael Johnson", age: 28, jenisLomba: "makan kerupuk" },
    { nama: "Emily Brown", age: 22, jenisLomba: "balap karung" },
    { nama: "Robert Lee", age: 27, jenisLomba: "pensil dalam botol" }
];

function filter(params) {
    let array = params
    if (array.length == 0) {
        array = dummy
    }
    let totalPermainan = {};
    for (const arr of array) {
        let { nama, age, jenisLomba } = arr;
        if (!totalPermainan[jenisLomba]) {
            totalPermainan[jenisLomba] = 0;
        }
        totalPermainan[jenisLomba]++;
    }

    return totalPermainan;
}

function getTop3(data) {
    let max1 = 0;
    let max2 = 0;
    let max3 = 0;
    let top1, top2, top3;

    for (let jenisLomba in data) {
        const count = data[jenisLomba];

        if (count >= max1) {
            max3 = max2;
            max2 = max1;
            max1 = count;
            top3 = top2;
            top2 = top1;
            top1 = jenisLomba;
        } else if (count >= max2) {
            max3 = max2;
            max2 = count;
            top3 = top2;
            top2 = jenisLomba;
        } else if (count >= max3) {
            max3 = count;
            top3 = jenisLomba;
        }
    }

    return [
        { [top1]: max1 },
        { [top2]: max2 },
        { [top3]: max3 },
    ];
}

function domsorting(top3Results) {
    const top3Container = document.getElementById("sortingLomba");
    top3Results.forEach((item) => {
        const gameType = Object.keys(item)[0];
        const count = item[gameType];

        const colAutoDiv = document.createElement("div");
        colAutoDiv.className = "col-auto shadow";
        colAutoDiv.style.margin = "20px 10px";
        colAutoDiv.style.borderRadius = "20px 20px 0 0";

        const card = document.createElement("div");
        card.className = "card border-0";
        card.style.width = "18rem";
        card.style.paddingTop = "20px";

        const cardImg = document.createElement("img");

        cardImg.src = `/assets/${gameType}.png`;
        cardImg.className = "card-img-top";
        cardImg.alt = "Image";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.innerHTML = `<b class="text-danger">${gameType.toUpperCase()}</b><br>${count} partisipan`;

        cardBody.appendChild(cardText);
        card.appendChild(cardImg);
        card.appendChild(cardBody);

        colAutoDiv.appendChild(card);
        top3Container.appendChild(colAutoDiv);
    });
}

let res = filter(dataPermainan);
let top3Results = getTop3(res);
domsorting(top3Results);
