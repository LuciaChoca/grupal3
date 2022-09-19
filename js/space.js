const EXT_URL = "http://images-api.nasa.gov/search?q=";
let btnSearch = document.getElementById("btnBuscar");
let varSearch = document.getElementById("inputBuscar");

btnSearch.addEventListener("click", e => {
    if (varSearch.value.length > 0) {
        fetchData();
    }
});

const fetchData = async () => {
    const response = await fetch(EXT_URL + varSearch.value);
    const dataSearch = await response.json();
    const { collection: { items }, } = dataSearch;
    for (let item of items) {
        console.log(item);
        if (item.data && item.links) {
            const {
                data: [searchData],
                links: [imgObj],
            } = item;
            const { description, title, date_created } = searchData;
            const { href } = imgObj;
            showElemnts(description, title, date_created, href);
        }
    }
}

function showElemnts(description, title, date_created, href) {
let htmlContentToAppend = "";
htmlContentToAppend += ` 
<div class="list-group-item list-group-item-action">
<div class="d-flex w-100 justify-content-between">
<div class="mb-2">  
    <img src="` + href + `" alt="product images" class="card-img-top" width="50px">
    <figcaption class="figure-caption">${date_created}</figcaption>
        </div>
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>

        </div>
    </div>
`
document.getElementById("contenedor").innerHTML += htmlContentToAppend;
}
