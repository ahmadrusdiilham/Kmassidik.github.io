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
    document.getElementById("day").innerText = days;
    document.getElementById("hour").innerText = hours;
    document.getElementById("minute").innerText = minutes;
    document.getElementById("second").innerText = seconds;
  } else {
    document.getElementById("countdown").innerText = "It's here!";
  }
}
setInterval(updateCountdown, 1000);

const dataPermainan = [
  // { nama: "John Doe", age: 25, jenisLomba: "balap karung" },
  // { nama: "Jane Smith", age: 30, jenisLomba: "balap karung" },
  // { nama: "Michael Johnson", age: 28, jenisLomba: "makan kerupuk" },
  // { nama: "Emily Brown", age: 22, jenisLomba: "catur" },
  // { nama: "Robert Lee", age: 27, jenisLomba: "pensil dalam botol" },
  // { nama: "Sophia Miller", age: 24, jenisLomba: "enggrang" },
  // { nama: "William Wilson", age: 26, jenisLomba: "balap karung" },
  // { nama: "Olivia Taylor", age: 29, jenisLomba: "kelereng" },
  // { nama: "James Anderson", age: 23, jenisLomba: "makan kerupuk" },
  // { nama: "Ava Martinez", age: 31, jenisLomba: "catur" },
];

// dont delete this
const dummy = [
  { nama: "Michael Johnson", age: 28, jenisLomba: "makan kerupuk" },
  { nama: "Emily Brown", age: 22, jenisLomba: "balap karung" },
  { nama: "Robert Lee", age: 27, jenisLomba: "pensil dalam botol" },
];

function filter(params) {
  let array = params;
  if (array.length == 0) {
    array = dummy;
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

  return [{ [top1]: max1 }, { [top2]: max2 }, { [top3]: max3 }];
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

// CRUD PESERTA
const lomba = ["balap karung", "kelereng", "makan kerupuk", "catur", "pensil dalam botol", "egrang"];

let masterData = [
  { id: 1, nama: "Eren", umur: 12, lomba: "kelereng" },
  { id: 2, nama: "Jaeger", umur: 14, lomba: "balap karung" },
  { id: 3, nama: "ccc", umur: 16, lomba: "catur" },
];

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
    masterData.push({ id, nama: namaPeserta, umur: umurPeserta, lomba: pilihanLomba });
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
    let editedData = { id: masterData[find].id, nama: namaPeserta, umur: umurPeserta, lomba: pilihanLomba };
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
    let newCol5 = document.createElement("button");
    newCol5.innerText = "Delete";
    let newCol6 = document.createElement("button");
    newCol6.innerText = "Edit";
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
    newRow.appendChild(newCol5);
    newRow.appendChild(newCol6);
    dataPeserta.appendChild(newRow);
  }
}
render();
console.log(masterData);
