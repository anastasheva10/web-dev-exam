window.onload = function () {
    document.getElementsByName('exampleCheckboxes').forEach(el => el.onclick = (e => {
        checkboxClick(el);
    }));
    getAll();
};


let allPrice = 0;
let restor;
let allRestor;
let curretPage = 0;
let dishesList = {
    1: {
        'img': 'м1.jpg',
        'title': 'Курица запечённая с апельсинами',
        'text': 'Курица в апельсиново-медовом маринаде, запечённая в духовке',
        'price': 0,
    },
    2: {
        'img': 'm2.jpg',
        'title': 'Салат "Цезарь"',
        'text': 'С куриной грудкой обжаренной на гриле',
        'price': 0,
    },
    3: {
        'img': 'm3.jpg',
        'title': 'Хинкали',
        'text': 'Хинкали с фаршем из свиньи и говядины, с добавлением зелени и специй',
        'price': 0,
    },
    4: {
        'img': 'm4.jpg',
        'title': 'Сырники творожные',
        'text': 'Подаются со свежими ягодами, клубничным муссом и сметаной.',
        'price': 0,
    },
    5: {
        'img': 'm5.jpg',
        'title': 'Фунчоза с овощами и курицей',
        'text': 'Обжаренные кусочки курицы с китайской лапшой, овощами и шампиньонами с добавлением восточных специй.',
        'price': 0,
    },
    6: {
        'img': 'm6.jpg',
        'title': 'Овощи на гриле',
        'text': 'Обжаренные овощи, с добавлением специй.',
        'price': 0,
    },
    7: {
        'img': 'm7.jpg',
        'title': 'Морское ассорти',
        'text': 'Подается с имбирным соусом, тигровыми креветками, мидиями, грешками, кальмаром и семгой.',
        'price': 0,
    },
    8: {
        'img': 'm8.jpg',
        'title': 'Омлет с томатами',
        'text': 'Воздушный омлет на сливках, подается с тостовым хлебом.',
        'price': 0,
    },
    9: {
        'img': 'm9.jpg',
        'title': 'Борщ с телятиной',
        'text': 'Подается с чипсами из бородинского хлеба,перцем чили и сметаной.',
        'price': 0,
    },
}

function checkboxClick(element) {
    let checkCount = 0;
    document.getElementsByName('exampleCheckboxes').forEach(el => {
        if (el.checked)
            checkCount++;
    });

    if (checkCount > 2) {
        element.checked = false;
        alert('Можно выбрать не более двух пунктов!');
    }
}

function modalClick() {
    if (restor !== undefined) {
        let choosed = document.getElementById('choosed');
        clearPrice();
        let isUpdated = false;
        let resp = '';

        if (document.getElementById('exCheck').checked) {
            //скидка
            isUpdated = true;
            updatePrice();
            allPrice *= (100 - restor.socialDiscount) / 100;
            resp = resp + `<li>${document.getElementById('ex').textContent}</li>`;
        }
        if (document.getElementById('exCheck1').checked) {
            //Цена увеличивается на 20%
            isUpdated = true;
            updatePrice();
            allPrice *= 1.2;
            resp = resp + `<li>${document.getElementById('ex1').textContent}</li>`;
        }
        if (document.getElementById('exCheck2').checked) {
            // Бесконтактная доставка
            resp = resp + `<li>${document.getElementById('ex2').textContent}</li>`;
        }
        if (document.getElementById('exCheck3').checked) {
            //В заказ добавляется случайный сет.
            isUpdated = true;
            let element = document.getElementById('dishCount' + randomInteger(1, 9));
            element.value = parseInt(element.value) + 1;
            updatePrice();
            resp = resp + `<li>${document.getElementById('ex3').textContent}</li>`;
        }
        if (document.getElementById('exCheck4').checked) {
            //Количество всех заказанных сетов увеличивается в 2 раза. Цена увеличивается на 60%
            for (let item in dishesList) {
                let element = document.getElementById('dishCount' + item);
                let number = parseInt(element.value);
                element.value = number * 2;
            }
            isUpdated = true;
            notUpdatePrice(1.6);
            resp = resp + `<li>${document.getElementById('ex4').textContent}</li>`;
        }
        if (document.getElementById('exCheck5').checked) {
            // Количество всех заказанных сетов увеличивается в 5 раз. Цена увеличивается в в 2.5 раза.
            for (let item in dishesList) {
                let element = document.getElementById('dishCount' + item);
                let number = parseInt(element.value);
                element.value = number * 5;
            }
            isUpdated = true;
            notUpdatePrice(2.5);
            resp = resp + `<li>${document.getElementById('ex5').textContent}</li>`;
        }
        if (document.getElementById('exCheck6').checked) {
            // Если заказ будет холодным, то цена снизится на 30% от финальной цены с учетом других опций с указанием цены со скидкой
            resp = resp + `<li>${document.getElementById('ex6').textContent}</li>`;
        }
        choosed.innerHTML = resp;
        if (!isUpdated) {
            updatePrice();
        }
        let itog = document.getElementById('itog');
        itog.innerHTML = `<h2>Итого к оплате: <span class="badge badge-success">${allPrice + 300} Руб.</span></h2>`
    } else {
        alert('Заведение не выбрано!')
    }
}

//
// $('#myModal').on('shown.bs.modal', function () {
//     $('#myInput').trigger('focus')
// });


function getAll() {
    let url = new URL('http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1');

    fetch(url, {
        method: 'get',
    }).then(response => response.json())
        .then(result => {
            curretPage = 0;
            allRestor = chunkArray(result.sort((a, b) => b.rate - a.rate), 12);
            loadOptions(result);
            createCards(allRestor[curretPage], 'allRest')
            createNavigation(allRestor);
        });
}


function getById(id) {
    let url = new URL('http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1/' + id);

    fetch(url, {
        method: 'get',
    })
        .then(response => response.json())
        .then(result =>
            console.log(result)
        );
}

function remove(id) {
    let url = new URL('http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1/' + id);

    fetch(url, {
        method: 'delete',
    })
        .then(response => response.json())
        .then(result =>
            console.log(result)
        );
}

function add() {
    let url = new URL('http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1/');

    fetch(url, {
        method: 'put',
        body: {
            "name": "Попкорн Бар",
            "rate": 13,
            "isNetObject": 0,
            "operatingCompany": "-",
            "typeObject": "s1",
            "admArea": "s1",
            "district": "s1",
            "address": "город Москва, улица Бахрушина, дом 25",
            "publicPhone": "(495) 916-92-20",
            "seatsCount": 12,
            "socialPrivileges": 0,
            "socialDiscount": 47,
            "created_at": null,
            "updated_at": "2020-06-22T09:34:37.000000Z",
            "set_1": 953,
            "set_2": 290,
            "set_3": 449,
            "set_4": 776,
            "set_5": 749,
            "set_6": 623,
            "set_7": 392,
            "set_8": 773,
            "set_9": 239,
            "set_10": 649
        }
    })
        .then(response => response.json())
        .then(result =>
            console.log(result)
        );
}

function loadOptions(data) {
    Array.from(new Set(data.map(area => area.admArea))).forEach(element => {
            let districtOption = document.createElement('option');
            districtOption.innerHTML = `${String(element)}`;
            document.getElementById('inputAdm').append(districtOption);
        }
    );
    Array.from(new Set(data.map(area => area.district))).forEach(element => {
            let districtOption = document.createElement('option');
            districtOption.innerHTML = `${String(element)}`;
            document.getElementById('inputDistrict').append(districtOption);
        }
    );
    Array.from(new Set(data.map(area => area.typeObject))).forEach(element => {
            let districtOption = document.createElement('option');
            districtOption.innerHTML = `${String(element)}`;
            document.getElementById('inputTypeObject').append(districtOption);
        }
    );
}

function createCards(data, insertEl) {
    let allRest = document.getElementById(insertEl);
    removeAllElementsInParentElement(allRest);

    data.forEach(data => {
        let col = document.createElement('div');
        col.className = 'col-md-3 card-group'

        let card = document.createElement('div');
        card.className = 'card text-center m-2 bg-light shadow-sm';
        // card.style = 'width: 17rem;';
        // let img = document.createElement('img');
        // img.style = 'width=100%; heidth=100%';
        // card.appendChild(img);

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body pt-0 pb-2';

        let cardTitle = document.createElement('div');
        cardTitle.className = 'card-header bg-transparent border-dark p-1 mb-1';
        cardTitle.innerHTML = `<h5>${data.name}</h5>`;


        let cardType = document.createElement('h6');
        cardType.className = 'card-subtitle mb-2 text-muted';
        cardType.innerText = data.typeObject;
        cardBody.append(cardType);

        let cardAdress = document.createElement('p');
        cardAdress.innerText = data.address;
        cardBody.append(cardAdress);


        let cardFooter = document.createElement('div');
        cardFooter.className = 'd-flex justify-content-between align-items-center card-footer';


        let cardButton = document.createElement('a');
        cardButton.innerText = 'Выбрать';
        cardButton.className = 'btn btn-outline-success';
        cardFooter.append(cardButton);
        cardButton.onclick = function (event) {
            // console.log(data);
            document.getElementById('modal_name').innerText = data.name;
            document.getElementById('modal_admArea').innerText = data.admArea;
            document.getElementById('modal_district').innerText = data.district;
            document.getElementById('modal_address').innerText = data.address;
            document.getElementById('modal_rate').innerText = data.rate;
            restor = data;
            fillDishes(data);
        };


        let cardRate = document.createElement('span');
        let tmpStr = 'badge badge-pill'
        if (data.rate < 30) {
            tmpStr = 'badge badge-pill badge-danger';
        }
        if (data.rate >= 30) {
            tmpStr = 'badge badge-pill badge-warning';
        }
        if (data.rate >= 70) {
            tmpStr = 'badge badge-pill badge-success';
        }
        cardRate.className = 'badge badge-pill';
        cardRate.innerText = `Рейтинг: ${data.rate}`;
        cardRate.className = tmpStr;
        cardFooter.append(cardRate);

        card.append(cardTitle);
        card.append(cardBody);
        card.append(cardFooter);
        col.append(card)
        allRest.append(col);
    });
}


function findByFilter() {
    let adm = document.getElementById('inputAdm').value;
    let dist = document.getElementById('inputDistrict').value;
    let type = document.getElementById('inputTypeObject').value;
    let soc = document.getElementById('isSocial').checked;
    let url = new URL('http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1');
    fetch(url, {
        method: 'get',
    }).then(response => response.json())
        .then(result => {
            let filterRes = result.sort((a, b) => b.rate - a.rate);
            if (adm !== 'любой') {
                filterRes = filterRes.filter(r => r.admArea === adm);
            }
            if (dist !== 'любой') {
                filterRes = filterRes.filter(r => r.district === dist);
            }
            if (type !== 'любой') {
                filterRes = filterRes.filter(r => r.typeObject === type);
            }
            if (soc) {
                filterRes = filterRes.filter(r => r.socialPrivileges === 1);
            }
            console.log(filterRes);
            curretPage = 0;
            allRestor = chunkArray(filterRes, 12);
            loadOptions(result);
            createCards(allRestor[curretPage], 'allRest')
            createNavigation(allRestor);
        });
}

function fillDishes(rest) {
    let allDishes = document.getElementById('dishes')
    removeAllElementsInParentElement(allDishes);

    for (let item in dishesList) {
        let base = document.createElement('div');
        base.className = 'col-md-4 card-group';
        allDishes.appendChild(base);

        let card = document.createElement('div');
        card.className = 'card mb-4 shadow-sm';
        base.appendChild(card);

        let img = document.createElement('img');
        img.src = dishesList[item].img;
        img.className = 'bd-placeholder-img card-img-top';
        img.style = 'width = 100%; height = 100%';
        card.appendChild(img);


        let cardTitle = document.createElement('div');
        cardTitle.className = 'card-header'
        cardTitle.innerText = dishesList[item].title;
        card.appendChild(cardTitle);

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        card.appendChild(cardBody);

        let text = document.createElement('p');
        text.className = 'card-text';
        text.innerText = dishesList[item].text;
        cardBody.appendChild(text);


        let cardFooter = document.createElement('div');
        cardFooter.className = 'd-flex justify-content-between align-items-center card-footer'
        card.appendChild(cardFooter);

        let cardInputGroup = document.createElement('div');
        cardInputGroup.className = 'input-group input-group-sm';
        cardFooter.appendChild(cardInputGroup);

        let cardInputGroup1 = document.createElement('div');
        cardInputGroup1.className = 'input-group-prepend';
        cardInputGroup.appendChild(cardInputGroup1);

        let cardButtonMinus = document.createElement('button');
        cardButtonMinus.className = 'decrease btn btn-sm btn-outline-secondary';
        cardButtonMinus.innerText = '-'
        cardButtonMinus.onclick = ev => {
            let elem = document.getElementById('dishCount' + item);
            let number = parseInt(elem.value);
            if (number > 0)
                elem.value = number - 1;
            updatePrice();
        };
        cardInputGroup1.appendChild(cardButtonMinus);

        let inputCount = document.createElement('input');
        inputCount.id = 'dishCount' + item;
        inputCount.className = 'form-control dish-count-input';
        inputCount.style = "background: white; border: 1px solid #6b6a6a;";
        inputCount.size = 2;
        inputCount.value = '0';
        inputCount.readOnly = true;
        // inputCount.aria-label = 'Small';
        cardInputGroup.appendChild(inputCount);

        let cardInputGroup2 = document.createElement('div');
        cardInputGroup2.className = 'input-group-append';
        cardInputGroup.appendChild(cardInputGroup2);

        let cardButtonPlus = document.createElement('button',);
        cardButtonPlus.className = 'increase btn btn-sm btn-outline-secondary';
        cardButtonPlus.innerText = '+'
        cardButtonPlus.onclick = ev => {
            let elem = document.getElementById('dishCount' + item);
            elem.value = parseInt(elem.value) + 1;
            updatePrice();
        };
        cardInputGroup2.appendChild(cardButtonPlus);

        let price = document.createElement('p');
        price.className = 'm-0 p-0 w-75';
        let priceItem = rest['set_' + item];
        dishesList[item].price = priceItem;

        if (priceItem === undefined) {
            priceItem = 'Недоступно';
            cardButtonMinus.disabled = true;
            cardButtonPlus.disabled = true;
            // card.classList.add('bg-secondary');

        } else {
            priceItem += ' Руб.'
        }
        price.innerHTML = priceItem;
        cardFooter.appendChild(price);


    }
}

function removeAllElementsInParentElement(element) {
    while (element.firstChild)
        element.removeChild(element.firstChild);
}

function updatePrice() {
    allPrice = 0;
    let positionTable = document.getElementById('modal_positions');
    removeAllElementsInParentElement(positionTable);
    let countItems = 1;
    let countDish = 0;
    for (let item in dishesList) {
        let element = document.getElementById('dishCount' + item);
        let number = parseInt(element.value);
        let price = 0;
        if (number !== 0) {
            price = dishesList[item].price * number;
            allPrice += price;
            countDish = countDish + number;
            let row = document.createElement('tr');
            let idCol = document.createElement('th');
            idCol.innerText = countItems;
            countItems++;
            row.appendChild(idCol);
            let name = document.createElement('th');
            name.innerText = dishesList[item].title;
            row.appendChild(name);
            let tprice = document.createElement('th');
            tprice.innerText = dishesList[item].price;
            row.appendChild(tprice);
            let count = document.createElement('th');
            count.innerText = number;
            row.appendChild(count);
            let summ = document.createElement('th');
            summ.innerText = price;
            row.appendChild(summ);
            positionTable.appendChild(row);

        }
    }
    let row = document.createElement('tr');
    row.className = 'table-success';
    let blank = document.createElement('th');
    blank.colSpan = 3;
    blank.innerText = 'Итого';
    row.appendChild(blank);
    let countEl = document.createElement('th');
    countEl.innerText = countDish;
    row.appendChild(countEl);
    let summ = document.createElement('th');
    summ.innerText = allPrice;
    row.appendChild(summ);
    positionTable.appendChild(row);


    let priceElem = document.getElementById('allPrice');
    priceElem.innerHTML = `<h1>Итого к оплате: <span class="badge badge-success">${allPrice} Руб.</span></h1>`;

}

function notUpdatePrice(multiplicater) {
    let notDiscount = 0;
    let positionTable = document.getElementById('modal_positions');
    removeAllElementsInParentElement(positionTable);
    let countItems = 1;
    let countDish = 0;
    for (let item in dishesList) {
        let element = document.getElementById('dishCount' + item);
        let number = parseInt(element.value);
        let price = 0;
        if (number !== 0) {
            price = dishesList[item].price * number;
            notDiscount += price;
            countDish = countDish + number;
            let row = document.createElement('tr');
            let idCol = document.createElement('th');
            idCol.innerText = countItems;
            countItems++;
            row.appendChild(idCol);
            let name = document.createElement('th');
            name.innerText = dishesList[item].title;
            row.appendChild(name);
            let tprice = document.createElement('th');
            tprice.innerText = dishesList[item].price;
            row.appendChild(tprice);
            let count = document.createElement('th');
            count.innerText = number;
            row.appendChild(count);
            let summ = document.createElement('th');
            summ.innerText = price;
            row.appendChild(summ);
            positionTable.appendChild(row);

        }
    }
    allPrice *= multiplicater;
    let row = document.createElement('tr');
    row.className = 'table-success';
    let blank = document.createElement('th');
    blank.colSpan = 3;
    blank.innerText = 'Итого';
    row.appendChild(blank);
    let countEl = document.createElement('th');
    countEl.innerText = countDish;
    row.appendChild(countEl);
    let summ = document.createElement('th');
    summ.innerHTML = `<del>${notDiscount}</del> ${allPrice}`;
    row.appendChild(summ);
    positionTable.appendChild(row);
}

function clearPrice() {
    for (let item in dishesList) {
        dishesList[item].price = restor['set_' + item];
    }
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function createNavigation() {
    let element = document.getElementById('navigation');
    removeAllElementsInParentElement(element);
    let prevPage = document.createElement('li');
    prevPage.className = 'page-item' // disabled
    if (0 === curretPage) {
        prevPage.classList.add('disabled')
        prevPage.classList.add('active')
    }
    let pageLink = document.createElement('a');
    pageLink.className = 'page-link';
    // pageLink.tabIndex = -1;
    // pageLink.ariaDisabled = true;
    pageLink.innerText = 'Previous';
    pageLink.onclick = ev => {
        if (curretPage > 0) {
            curretPage--;
            createCards(allRestor[curretPage], 'allRest');
            createNavigation();
        }
    }
    prevPage.appendChild(pageLink);
    element.appendChild(prevPage);

    if (allRestor.length < 15) {
        for (let i = 0; i < allRestor.length; i++) {
            element.appendChild(createPageLink(i));
        }
    } else {
        if (curretPage < 4) {
            for (let i = 0; i < 7; i++) {
                element.appendChild(createPageLink(i));
            }
        } else if (curretPage > allRestor.length - 4) {
            for (let i = allRestor.length - 7; i < allRestor.length; i++) {
                element.appendChild(createPageLink(i));
            }
        } else {
            for (let i = curretPage - 3; i < curretPage + 4; i++) {
                element.appendChild(createPageLink(i));
            }
        }

    }
    let nextPage = document.createElement('li');
    nextPage.className = 'page-item'
    let nextLink = document.createElement('a');
    nextLink.innerText = 'Next';
    nextLink.className = 'page-link'
    nextLink.onclick = ev => {
        if (curretPage < allRestor.length - 1) {
            curretPage++;
            createCards(allRestor[curretPage], 'allRest');
            createNavigation();
        }
    }
    if (curretPage === allRestor.length - 1) {
        nextPage.classList.add('disabled')
        nextPage.classList.add('active')
    }
    nextPage.appendChild(nextLink);

    element.appendChild(nextPage);
}

function createPageLink(id) {
    let itemPage = document.createElement('li');
    itemPage.className = 'page-item'
    if (id === curretPage) {
        itemPage.classList.add('disabled')
        itemPage.classList.add('active')
    }

    let itemLink = document.createElement('a');
    itemLink.innerText = id;
    itemLink.classList.add('page-link')
    itemLink.onclick = ev => {
        curretPage = id;
        createCards(allRestor[id], 'allRest')
        createNavigation();
    };
    itemPage.appendChild(itemLink);

    return itemPage;
}

function chunkArray(arr, chunk) {
    let i, j, tmp = [];
    for (i = 0, j = arr.length; i < j; i += chunk) {
        tmp.push(arr.slice(i, i + chunk));
    }
    return tmp;
}

