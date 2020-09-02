const API_KEY = "PSAGR4VMTKQJBUN0CIDGUUIA0QA4NA1JH3BMRAANDRFFKGGE"
//for yelp
// Client ID =KV5xcCMw15aztax0s7REvQ
//API Key = O5zu0u-oz1WYnaeu2INxGAQrSR3kbaxiHCHyHT4H-aqt57J1OclzNEP7c7wDVXIH2f1Pj6HdGbJ1l2Jn3RsauY1UCG95jQmG0c-mcchWG3mCdvpL2-8wPp6xOctPX3Yx


//for foursquare
//Client Id= DVIVVUDWK4W2NALLKRFLU5U00BI2E12OLDLRJ5ODEHZPTZDG
//Client Secret =PSAGR4VMTKQJBUN0CIDGUUIA0QA4NA1JH3BMRAANDRFFKGGE
const API_URL = "https://api.edamam.com/search"

//6. this function
function formatQueryParams(params) {
//Object.keys(obj) – returns an array of keys.
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//encodeURIComponent converts strings to URL safe formats by escaping characters like spaces to %20
//The encodeURIComponent() function encodes a URI component.This function 
//encodes special characters. In addition, it encodes the following characters: , / ? : @ & = + $ #
//Return Value: 	A String, representing the encoded URI
    return queryItems.join('&');
}
//6.Taking a look at this function, it gets passed an arbitrary object of query parameters, 
//and iterates over the keys in the object. 
//It uses .map, to generate an array whose items are strings representing each key-value pair. 
//For each key, it uses the built-in JavaScript function encodeURIComponent, 
//which converts strings to URL safe formats by escaping characters like spaces to %20. 
//It does the same for each value, connecting the key and value with an = character.
// After mapping each of the key-value pairs, formatQueryParams finally returns a single 
//string generated by joining each array item with the "&" character.

//12.
function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('#results-list').empty();
    // iterate through the items array
    for (let i = 0; i < responseJson.data.length; i++){
        // for each object in the items
        //array, add a list item to the results
        //list with the video title, description,
        //and thumbnail
        $('#results-list').append(
            `<li>
                <h3>${responseJson.data[i].name}</h3>
                <img src='${responseJson.data[i].images[0].url}'>
                <p>${responseJson.data[i].description}</p>
                <a href="${responseJson.data[i].url}" target="_blank" >Website: ${responseJson.data[i].url}</a>
    
            </li>`
        )};
    //display the results section
    $('#results').removeClass('hidden');
    console.log(responseJson.data.description);
};


function getRecipes(query, limit=10){
//4.object called params, params has key-value pairs for each of the URL
//query parameters we need to provide 
    const params = {
    API_KEY : Key,
    stateCode: query,
        limit,
    };
//5. once we have the object(params above) we need to convert it to "foo=bar&bizz=bang" format
//this is where the function formatQueryParams comes in we run params through it
    const queryString = formatQueryParams(params)
//7. create the URL for the GET request to 
//by combining the base URL, "?" character, and our query parameters string
    const url = searchURL + '?' + queryString;

    console.log(url);
//8.call fetch pass url through it (line67)      
    fetch(url)
//9.confirm fetch was ok (.then block)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
//10.if not ok we throw an error
            throw new Error(response.statusText);
        })
//11.otherwise we call response.json and run it through displayResults
        .then(responseJson => displayResults(responseJson))

        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
//2.retrieve two values from the form js-search-states(line15) & js-max-results(line18) have
    //theses two values = another term
        const searchTerm = $('#js-recipe-search').val();
        const maxResults = $('#js-max-results').val();
//3. pass these two values from form (js-search-states(line15) & js-max-results(line18))through gerNpsResults 
        getRecipes(searchTerm, maxResults);
});
}

//1.when app loads run this function
watchForm();