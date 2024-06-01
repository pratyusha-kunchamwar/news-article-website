const API_KEY = "7a19d44c296948e89e63df45a20cb461";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener('load', () => fetchNews("India"));
function reload(){
    window.location.reload();
}
async function fetchNews(query) {
    // fetch library return the promis to fetch from server
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    // each time only particular amount of data should go.elae each time it will increses
    cardsContainer.innerHTML = "";
    articles.forEach((article) => {
        // no img then dont take it
        if (!article.urlToImage) return;
        // clone to append to cards container .
        // meaning .content all elements in templet should become clone.recursively
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataIncard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
//card clone enter data
function fillDataIncard(cardclone, article) {
    const newsImg = cardclone.querySelector('#news-img');
    const newsTitle = cardclone.querySelector('#news-titile');
    const newsSourse = cardclone.querySelector('#news-sourse');
    const newsDesc = cardclone.querySelector('#news-decs');
    // news img source
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-india", {
        timeZone: "Asia/JaKarta"
    }
    );
    newsSourse.innerHTML = `${article.source.name} . ${date}`;
    // move  to particular website when the user was clicked
    cardclone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}
// for serch and navigation
let curselnav = null;
function onNavitemclick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    // for serch bar active postion
    curselnav?.classList.remove('active');
    curselnav.classList.add('active');
}
const serchbuttion=document.getElementById("serch-buttion");
const serchText=document.getElementById("serch-text");
serchbuttion.addEventListener('click',()=>{
    const query=serchText.value;
    if(!query)return;
    fetchNews(query);
    // serch and select not get axis at a time
    curselnav?.classList.remove('active');
    curselnav=null;
})