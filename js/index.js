console.log("Working");
const API_KEY="e45c9c447892436f8d279b4c331ac24d";
function fetchNews( searchTerm ){
    let url = `https://newsapi.org/v2/top-headlines?q=${searchTerm}&apiKey=${API_KEY}&pageSize=10`;
    let settings = {
        method: "GET"
    };

    fetch( url, settings )
        .then( (response) => {

            if( response.ok ){
                return response.json();
            }
            else{
                throw Error( "The server is down. Please try again later!" );
            }
        })
        .then( (data) => {
            console.log( data );
            
            let results = document.querySelector( '.results' );
            results.innerHTML = "";

            for( let i = 0; i < data.articles.length; i ++ ){
                results.innerHTML += `
                    <div class="topNew">
                        <h2>
                            ${data.articles[i].title}
                        </h2>
                        <div class="image">
                            <img src="${data.articles[i].urlToImage}" class="size"/>
                        </div>
                        <h4>
                           ${data.articles[i].author} 
                        </h4>
                        <p>
                            ${data.articles[i].description}
                        </p>
                    </div>
                `;
            }
        })
        .catch( (error) => {
            let results = document.querySelector( '.results' );
            results.innerHTML = error.message;

            console.log( error );
        });
}

async function fetchingInformation( searchTerm ){
    let url = `https://newsapi.org/v2/top-headlines?q=${searchTerm}&pageSize=10`;
    console.log( url );
    let settings = {
        method: "GET",
        headers: {
            "X-Api-Key" : API_KEY
        }
    };

    let response = await fetch( url, settings );
    let data = await response.json();

    console.log( data );
            
    let results = document.querySelector( '.results' );
    results.innerHTML = "";

    if( data.totalResults === 0 ){
        results.innerHTML = `No results found with that search term: '${searchTerm}'`;
    }
    else{
        for( let i = 0; i < data.articles.length; i ++ ){
            results.innerHTML += `
                <div class="topNew">
                    <h2>
                        ${data.articles[i].title}
                    </h2>
                    <div class="image">
                        <img src="${data.articles[i].urlToImage}" class="size"/>
                    </div>
                    <h4>
                        ${data.articles[i].author} 
                    </h4>
                    <p>
                        ${data.articles[i].description}
                    </p>
                </div>
            `;
        }
    }
}

function grabInfo( event ){
    event.preventDefault();

    let searchTerm = event.target.searchTerm.value;
    //let searchTerm2 = document.querySelector( "#searchTerm" ).value;
    
    fetchingInformation( searchTerm );
}

let newsForm = document.querySelector( '#newsForm' );

newsForm.addEventListener( "submit",  grabInfo );