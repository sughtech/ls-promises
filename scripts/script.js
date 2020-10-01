if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(registration => {
        console.log("SW Registered!");
        console.log(registration);
    }).catch(
        (err) => {
            console.log("Failed to register Service Worker:\n" + err);
        }
    );
}


function setDiv(value) {
    let divElement = document.getElementById('data');
    divElement.innerHTML = value;
}

function createColumn(obj) {
    return `
    <div class="card shadow-lg text-center">
        <div class="card-body">
            <div class="card-text my-2">
                <h5>${obj.name}</h5>
                <div> ${obj.description}</div>
                <div class="text-muted my-2"><span>category: </span> ${obj.category}</div>
                <a href="${obj.url}" target="_blank" rel="noopener noreferrer">Visit Site</a>
            </div>
        </div>
    </div>
    <br>
    `;
}

function loader() {
    return `
    <div class="container">
    <div class="row">
        <div class="col-md-3 col-sm-6">
            <div class="progress blue">
                <span class="progress-left">
                    <span class="progress-bar"></span>
                </span>
                <span class="progress-right">
                    <span class="progress-bar"></span>
                </span>
                <div class="progress-value">Loading</div>
            </div>
        </div>
    </div>
    </div>
    `;
}

function getDataArray() {
    let mockData;
    let promise = fetch('https://5f72e49e6833480016a9c1c9.mockapi.io/mypromise/ls-api');

    return promise.then((response) => {
        if (response.ok) {
            console.log(response);
            return (response.json());
        }
        console.log('Connection was not successful: ' + response.status.toString())
    }).then((value) => {
        localStorage.sources = JSON.stringify(value);
        console.log(value);
        return value;
    });
}

function postsPerPage() {
    let inputValue = document.getElementById('inputField').value;
    if (isNaN(inputValue) || inputValue === '') {
        setDiv('<div class="bg-danger text-white">Input Not Valid</div>')
    }else{
        accessData(inputValue);
    }
}

function onClear(){
    setDiv('No posts to display');
    localStorage.clear();
}

function accessData(value) {
    let arrayHandler = (arrayData) => {
        let finaldata = "";
        let extent;
        if (value > arrayData.length) {
            extent = arrayData.length;
        }else{
            extent = value;
        }
        for (let index = 0; index < extent; index++) {
            const value = arrayData[index];
            finaldata += createColumn(value);
        };
        setDiv(finaldata);
    };

    if (localStorage.sources !== "undefined" && !!localStorage.sources) {
        arrayHandler(JSON.parse(localStorage.sources));
    } else {
        setDiv(loader());
        getDataArray().then(arrayHandler);
    }
}

function start() {
    if (localStorage.sources !== "undefined") {
        accessData(3);
    } else {
        setDiv('<div class="bg-primary text-white">Nothing to Display<br>Input a value in the text field to begin.</div>')
    }
}

start();
