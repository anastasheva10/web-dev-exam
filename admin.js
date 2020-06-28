window.onload = function () {
    loadAll();
};

let allPrice = 0;
let restor;
let allRestor;
let curretPage = 0;

function addNewRest() {
    let new_obj = {};

    new_obj["name"] = document.getElementById('modal_name_4').value;
    new_obj["operatingCompany"] = document.getElementById('modal_operatingCompany_4').value;
    new_obj["socialDiscount"] = document.getElementById('modal_socialDiscount_4').value;
    new_obj["seatsCount"] = Number(document.getElementById('modal_seatsCount_4').value);
    new_obj["publicPhone"] = document.getElementById('modal_publicPhone_4').value;
    new_obj["address"] = document.getElementById('modal_address_4').value;
    new_obj["rate"] = Number(document.getElementById('modal_rate_4').value);
    new_obj["admArea"] = document.getElementById('modal_admArea_4').value;
    new_obj["district"] = document.getElementById('modal_district_4').value;
    new_obj["typeObject"] = document.getElementById('modal_typeObject_4').value;

    getRadio2('input[name="inlineRadioOptions4_1"]', 'isNetObject');
    getRadio2('input[name="inlineRadioOptions4_2"]', 'socialPrivileges');


    function getRadio2(inputRadioName, keyName) {
        let radio = document.querySelectorAll(inputRadioName);
        for (let i = 0; i < radio.length; i++) {
            if (radio[i].checked) {

                console.log(radio[i].value);
                if (radio[i].value == "option1")
                    new_obj[keyName] = 1;
                else if (radio[i].value == "option2") {
                    new_obj[keyName] = 0;
                }
            } else {
                new_obj[keyName] = null;
            }
        }
    }

    fetch(`http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1`, {
        method: 'POST',
        body: JSON.stringify(new_obj),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => console.log(json))


}

function loadAll() {
    let url = new URL('http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1');

    fetch(url, {
        method: 'get',
    }).then(response => response.json())
        .then(result => {
            curretPage = 0;
            allRestor = chunkArray(result.sort((a, b) => b.rate - a.rate), 18);
            // loadOptions(result);
            createAdminCards(allRestor[curretPage], 'allRest')
            createAdminNavigation();
        });
}

function loadAdminOptions(data) {
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

function createAdminCards(data, insertEl) {
    let allRest = document.getElementById(insertEl);
    removeAllElementsInParentElement(allRest);

    data.forEach(data => {
        let col = document.createElement('div');
        col.className = 'col-md-2 card-group'

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


        let cardInfoBtn = document.createElement('a');
        cardInfoBtn.innerHTML = `<span class="glyphicon glyphicon-trash" aria-hidden="true"></span>`
        cardInfoBtn.className = 'btn btn-outline-info';
        cardFooter.append(cardInfoBtn);
        cardInfoBtn.onclick = function (event) {

        };

        let cardEditBtn = document.createElement('a');
        cardEditBtn.innerText = 'Изменить';
        cardEditBtn.className = 'btn btn-outline-success';
        cardFooter.append(cardEditBtn);
        cardEditBtn.onclick = function (event) {

        };

        let cardRemoveBtn = document.createElement('a');
        cardRemoveBtn.innerText = 'Удалить';
        cardRemoveBtn.className = 'btn btn-outline-warning';
        cardFooter.append(cardRemoveBtn);
        cardRemoveBtn.onclick = function (event) {

            let url = new URL('http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1/' + data.id);

            fetch(url, {
                method: 'delete',
            })
                .then(response => response.json())
                .then(result =>
                    console.log(result)
                );
        };


        card.append(cardTitle);
        card.append(cardBody);
        card.append(cardFooter);
        col.append(card)
        allRest.append(col);
    });
}

function remove(id) {

}

function createAdminNavigation() {
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
            createAdminCards(allRestor[curretPage], 'allRest');
            createAdminNavigation();
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
            createAdminCards(allRestor[curretPage], 'allRest');
            createAdminNavigation();
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
        createAdminCards(allRestor[id], 'allRest')
        createAdminNavigation();
    };
    itemPage.appendChild(itemLink);

    return itemPage;
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

function chunkArray(arr, chunk) {
    let i, j, tmp = [];
    for (i = 0, j = arr.length; i < j; i += chunk) {
        tmp.push(arr.slice(i, i + chunk));
    }
    return tmp;
}

function removeAllElementsInParentElement(element) {
    while (element.firstChild)
        element.removeChild(element.firstChild);
}


