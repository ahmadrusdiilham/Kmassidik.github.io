let masterData = [
    { id: 1, nama: "Eren", umur: 12, lomba: "kelereng" },
    { id: 2, nama: "Jaeger", umur: 14, lomba: "balap karung" },
    { id: 3, nama: "ccc", umur: 16, lomba: "catur" },
];

let masterDataPanitia = [
    { id: 1, nama: "bani", umur: 23, lomba: "balap karung" },
    { id: 2, nama: "dimas", umur: 22, lomba: "balap karung" },
    { id: 3, nama: "caca", umur: 13, lomba: "kelereng" },
];

// dom update waktu
function updateCountdown() {
    const targetDate = new Date("August 17, 2023 00:00:00").getTime();
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;

    if (timeRemaining > 0) {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
            (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // const countdownString = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
        document.getElementById("day").innerText = days;
        document.getElementById("hour").innerText = hours;
        document.getElementById("minute").innerText = minutes;
        document.getElementById("second").innerText = seconds;
    } else {
        document.getElementById("countdown").innerText = "It's here!";
    }
}
setInterval(updateCountdown, 1000);

function showMostPopularLomba() {
    let lombaCounts = {};

    for (const data of masterData) {
        const lomba = data.lomba;
        if (!lombaCounts[lomba]) {
            lombaCounts[lomba] = 0;
        }
        lombaCounts[lomba]++;
    }

    let top3Results = [];
    for (const lomba in lombaCounts) {
        top3Results.push({ [lomba]: lombaCounts[lomba] });
    }

    top3Results.sort((a, b) => {
        const countA = Object.values(a)[0];
        const countB = Object.values(b)[0];
        return countB - countA;
    });

    const top3Container = document.getElementById("sortingLomba");
    top3Container.innerHTML = "";

    top3Results.slice(0, 3).forEach((item) => {
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
        cardText.innerHTML = `<b class="text-danger">${gameType.toUpperCase()}</b><br>${count} participants`;

        cardBody.appendChild(cardText);
        card.appendChild(cardImg);
        card.appendChild(cardBody);

        colAutoDiv.appendChild(card);
        top3Container.appendChild(colAutoDiv);
    });
}

// Call the function to show the most popular "lomba" and the top 3 most popular data on page load
showMostPopularLomba();


// CRUD PESERTA
let dataPeserta = document.getElementById("data-peserta");
let onEdit = false;
let targetEdit = "";

function createNewData(e) {
    e.preventDefault();
    let namaPeserta = document.getElementById("nama-peserta").value;
    let umurPeserta = document.getElementById("umur-peserta").value;
    let pilihanLomba = document.getElementById("pilihan-lomba").value;
    console.log(pilihanLomba, "ini pilihan lomba");

    if (onEdit == false) {
        let id = masterData[masterData.length - 1].id + 1;
        masterData.push({
            id,
            nama: namaPeserta,
            umur: umurPeserta,
            lomba: pilihanLomba,
        });
        console.log(masterData);
    } else {
        let find = "";
        for (let i = 0; i < masterData.length; i++) {
            const element = masterData[i];
            if (element.id === targetEdit) {
                find = i;
            }
        }
        // console.log(find);
        let editedData = {
            id: masterData[find].id,
            nama: namaPeserta,
            umur: umurPeserta,
            lomba: pilihanLomba,
        };
        masterData[find] = editedData;
        onEdit = false;
        targetEdit = "";
    }

    // console.log(`${namaPeserta} ${umurPeserta} ${pilihanLomba}`);
    document.getElementById("nama-peserta").value = "";
    document.getElementById("umur-peserta").value = "";
    document.getElementById("pilihan-lomba").value = "";
    document.getElementById("data-peserta").innerHTML = "";

    render();
    showMostPopularLomba();
    console.log(masterData);
}

function render() {
    let nomer = 0;
    for (const perData of masterData) {
        nomer++;
        let { id, nama, umur, lomba } = perData;

        let newRow = document.createElement("tr");
        let newCol1 = document.createElement("td");
        newCol1.innerHTML = nomer;
        let newCol2 = document.createElement("td");
        newCol2.innerHTML = nama;
        let newCol3 = document.createElement("td");
        newCol3.innerHTML = umur;
        let newCol4 = document.createElement("td");
        newCol4.innerHTML = lomba;

        let deleteButton = document.createElement("button");
        deleteButton.type = "button"
        deleteButton.className = "btn btn-danger"
        deleteButton.innerText = "Delete";
        let newCol5 = document.createElement("td");
        newCol5.style.width = "auto"
        newCol5.appendChild(deleteButton);

        let editButton = document.createElement("button");
        editButton.type = "button"
        editButton.className = "btn btn-secondary"
        editButton.innerText = "Edit";
        let newCol6 = document.createElement("td");
        newCol6.style.width = "auto"
        newCol6.appendChild(editButton);


        newCol5.onclick = function hapus() {
            let tag = Number(newCol1.innerHTML);
            let temp = [];
            for (let i = 0; i < masterData.length; i++) {
                let element = masterData[i];
                if (i !== tag - 1) {
                    temp.push(element);
                }
            }
            masterData = temp;
            document.getElementById("data-peserta").innerHTML = "";
            render();
            console.log(masterData);
        };
        newCol6.onclick = function edit() {
            onEdit = true;
            targetEdit = id;
            document.getElementById("nama-peserta").value = newCol2.innerHTML;
            document.getElementById("umur-peserta").value = newCol3.innerHTML;
            document.getElementById("pilihan-lomba").value = newCol4.innerHTML;
        };
        newRow.appendChild(newCol1);
        newRow.appendChild(newCol2);
        newRow.appendChild(newCol3);
        newRow.appendChild(newCol4);
        newRow.appendChild(newCol6);
        newRow.appendChild(newCol5);
        dataPeserta.appendChild(newRow);
    }
}
render();
console.log(masterData);

// CRUD PANITIA
// BAGIAN PENDAFTARAN PANITIA
let dataPanitia = document.getElementById("data-panitia");
let onEditPanitia = false;
let targetEditPanitia = "";

function dataBaru(e) {
    e.preventDefault();
    let namaPanitia = document.getElementById("nama-panitia").value;
    let umurPanitia = document.getElementById("umur-panitia").value;
    let pilihanLomba = document.getElementById("pilihan-lomba-panitia").value;

    if (onEditPanitia == false) {
        let id = masterDataPanitia[masterDataPanitia.length - 1].id + 1;
        masterDataPanitia.push({
            id,
            nama: namaPanitia,
            umur: umurPanitia,
            lomba: pilihanLomba,
        });
        console.log(masterDataPanitia);
    } else {
        let find = "";
        for (let i = 0; i < masterDataPanitia.length; i++) {
            const element = masterDataPanitia[i];
            if (element.id === targetEditPanitia) {
                find = i;
            }
        }
        // console.log(find);
        let editedDataPanitia = {
            id: masterDataPanitia[find].id,
            nama: namaPanitia,
            umur: umurPanitia,
            lomba: pilihanLomba,
        };
        masterDataPanitia[find] = editedDataPanitia;
        onEditPanitia = false;
        targetEditPanitia = "";
    }

    // console.log(`${namaPeserta} ${umurPeserta} ${pilihanLomba}`);
    document.getElementById("nama-panitia").value = "";
    document.getElementById("umur-panitia").value = "";
    document.getElementById("pilihan-lomba-panitia").value = "";
    document.getElementById("data-panitia").innerHTML = "";

    renderPanitia();
    console.log(masterDataPanitia);
}

function renderPanitia() {
    let nomer = 0;
    for (const perData of masterDataPanitia) {
        nomer++;
        let { id, nama, umur, lomba } = perData;
        let newRow = document.createElement("tr");
        let newCol1 = document.createElement("td");
        newCol1.innerHTML = nomer;
        let newCol2 = document.createElement("td");
        newCol2.innerHTML = nama;
        let newCol3 = document.createElement("td");
        newCol3.innerHTML = umur;
        let newCol4 = document.createElement("td");
        newCol4.innerHTML = lomba;

        let deleteButton = document.createElement("button");
        deleteButton.type = "button"
        deleteButton.className = "btn btn-danger"
        deleteButton.innerText = "Delete";
        let newCol5 = document.createElement("td");
        newCol5.style.width = "auto"
        newCol5.appendChild(deleteButton);

        let editButton = document.createElement("button");
        editButton.type = "button"
        editButton.className = "btn btn-secondary"
        editButton.innerText = "Edit";
        let newCol6 = document.createElement("td");
        newCol6.style.width = "auto"
        newCol6.appendChild(editButton);

        newCol5.onclick = function hapusData() {
            let tag = Number(newCol1.innerHTML);
            let temp = [];
            for (let i = 0; i < masterDataPanitia.length; i++) {
                let element = masterDataPanitia[i];
                if (i !== tag - 1) {
                    temp.push(element);
                }
            }
            masterDataPanitia = temp;
            document.getElementById("data-panitia").innerHTML = "";
            renderPanitia();
            console.log(masterDataPanitia);
        };
        newCol6.onclick = function ubah() {
            onEditPanitia = true;
            targetEditPanitia = id;
            document.getElementById("nama-panitia").value = newCol2.innerHTML;
            document.getElementById("umur-panitia").value = newCol3.innerHTML;
            document.getElementById("pilihan-lomba-panitia").value =
                newCol4.innerHTML;
        };
        newRow.appendChild(newCol1);
        newRow.appendChild(newCol2);
        newRow.appendChild(newCol3);
        newRow.appendChild(newCol4);
        newRow.appendChild(newCol6);
        newRow.appendChild(newCol5);
        dataPanitia.appendChild(newRow);
    }
}
renderPanitia();
console.log(masterDataPanitia);
