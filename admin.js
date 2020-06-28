window.onload = function () {
    loadAll();
};

let allRestor;
let curretPage = 0;

function loadAll() {
    let url = new URL('http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1');

    fetch(url, {
        method: 'get',
    }).then(response => response.json())
        .then(result => {
            curretPage = 0;
            allRestor = chunkArray(result.sort((a, b) => b.rate - a.rate), 18);
            loadAdminOptions(result);
            createAdminCards(allRestor[curretPage], 'allRest')
            createAdminNavigation();
        });
}

function loadAdminOptions(data) {
    Array.from(new Set(data.map(area => area.admArea))).forEach(element => {
            let districtOption = document.createElement('option');
            districtOption.innerHTML = `${String(element)}`;
            document.getElementById('inputadmArea').append(districtOption);
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
        col.className = 'col-lg-3 col-md-4 col-sm-6 card-group'

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
        cardInfoBtn.innerHTML = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>`;
        cardInfoBtn.className = 'btn btn-outline-info';
        cardFooter.append(cardInfoBtn);
        cardInfoBtn.onclick = function (event) {

        };

        let cardEditBtn = document.createElement('a');
        cardEditBtn.innerHTML = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
  <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
</svg>`;
        cardEditBtn.className = 'btn btn-outline-success';
        cardFooter.append(cardEditBtn);
        cardEditBtn.onclick = function (event) {

        };

        let cardRemoveBtn = document.createElement('a');
        cardRemoveBtn.innerHTML = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>`;
        cardRemoveBtn.className = 'btn btn-outline-warning';
        cardFooter.append(cardRemoveBtn);
        cardRemoveBtn.onclick = function (event) {
            let isRemove = confirm("Вы уверены?");
            if (isRemove) {
                let url = new URL('http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1/' + data.id);

                fetch(url, {
                    method: 'delete',
                })
                    .then(response => response.json())
                    .then(result => {
                        loadAll();
                        alert("удалено");
                    });
            }
        };


        card.append(cardTitle);
        card.append(cardBody);
        card.append(cardFooter);
        col.append(card)
        allRest.append(col);
    });
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
    let name = document.getElementById('inputName').value;
    let adm = document.getElementById('inputadmArea').value;

    let seatsCountFrom = document.getElementById('inputSeatsCountFrom').value;
    let seatsCountTo = document.getElementById('inputSeatsCountTo').value;

    let inputCreatedAtFrom = document.getElementById('inputCreatedAtFrom').value;
    let inputCreatedAtTo = document.getElementById('inputCreatedAtTo').value;
    // document.getElementById('inputCreatedAtFrom').value===''
    let isNetObj = document.getElementById('inputIsNetObj').value;

    let dist = document.getElementById('inputDistrict').value;
    let type = document.getElementById('inputTypeObject').value;
    let soc = document.getElementById('inputSocialPrivileges').value;

    let url = new URL('http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1');
    fetch(url, {
        method: 'get',
    }).then(response => response.json())
        .then(result => {
            let filterRes = result.sort((a, b) => b.rate - a.rate);
            if (name !== '') {
                console.log(name);
                console.log(filterRes);
                filterRes = filterRes.filter(r => r.name.includes(name));
            }
            console.log('filterRes');
            console.log(filterRes);
            if (adm !== 'любой') {
                filterRes = filterRes.filter(r => r.admArea === adm);
            }

            if (seatsCountFrom !== '') {
                console.log('seatsCountFrom');
                filterRes = filterRes.filter(r => r.seatsCount <= seatsCountFrom);
            }
            if (seatsCountTo !== '') {
                console.log('seatsCountTo');
                filterRes = filterRes.filter(r => r.seatsCount >= seatsCountTo);
            }

            if (inputCreatedAtFrom !== '') {
                console.log('inputCreatedAtFrom');
                filterRes = filterRes.filter(r => r.created_at <= inputCreatedAtFrom);
            }
            if (inputCreatedAtTo !== '') {
                console.log('inputCreatedAtTo');
                filterRes = filterRes.filter(r => r.created_at >= inputCreatedAtTo);
            }


            if (dist !== 'любой') {
                console.log('dist');
                filterRes = filterRes.filter(r => r.district === dist);
            }
            if (type !== 'любой') {
                console.log('type');
                filterRes = filterRes.filter(r => r.typeObject === type);
            }

            if (soc !== 'любой') {
                console.log('soc');
                if (soc === 'Да') {
                    filterRes = filterRes.filter(r => r.socialPrivileges === 1);
                } else {
                    filterRes = filterRes.filter(r => r.socialPrivileges === 0);
                }
            }

            if (isNetObj !== 'любой') {
                console.log('isNetObj');
                if (isNetObj === 'Да') {
                    filterRes = filterRes.filter(r => r.isNetObject === 1);
                } else {
                    filterRes = filterRes.filter(r => r.isNetObject === 0);
                }
            }
            console.log(filterRes);
            curretPage = 0;
            allRestor = chunkArray(filterRes, 12);
            loadAdminOptions(result);
            createAdminCards(allRestor[curretPage], 'allRest')
            createAdminNavigation(allRestor);
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



