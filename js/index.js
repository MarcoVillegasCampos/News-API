console.log("Working");
const API_KEY="e45c9c447892436f8d279b4c331ac24d";
function fetchNews (searchTerm){


    let url=`https://newsapi.org/v2/top-headlines?q=${searchTerm}&apiKey=${API_KEY}&pageSize=10`
    let settings={
        method:"GET",
        //not showing api Key in the url//
        headers: {
            "X-Api-Key" :API_KEY
        }
        
    };

    fetch( url, settings )
    .then ( (response) =>{
        return response.json();
    })
    .then ( (data) => {
        console.log(data);

        let results= document.querySelector('.results');
        results.innerHTML=""

        for(let i=0; i < data.articles.length; i++){
            results.innerHTML += `
            <div class="topNew">
            <h2>
                ${data.articles[i].title}
            </h2>
           
            <div class="image">
                <img src="${data.articles[i].urlToImage}">
           </div>
           <h4>
                ${data.articles[i].author}
            </h4>
            <p>
                ${data.articles[i].description}
            </p>    

           
           
           
           
           `;
        }
    })
  
}

    








function grabInfo(event){
    event.preventDefault();
    let searchTerm= event.target.searchTerm.value;
    //let searchTerm= document.querySelector("#searchTerm";)//
    fetchNews(searchTerm);
}


let newsForm= document.querySelector('#newsForm');

newsForm.addEventListener("submit", grabInfo);

