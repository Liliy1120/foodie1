const API_KEY = "AIzaSyBdeEMD8FXQ-BwLp1eCbB3IN95zDdnhS7k" //PSAGR4VMTKQJBUN0CIDGUUIA0QA4NA1JH3BMRAANDRFFKGGE" foursquare
//for google api = 'AIzaSyD3XTQjMngN4V8BsFlm6_eHDQ_zEoyLvYc'


//for foursquare
//Client Id= DVIVVUDWK4W2NALLKRFLU5U00BI2E12OLDLRJ5ODEHZPTZDG
//Client Secret =PSAGR4VMTKQJBUN0CIDGUUIA0QA4NA1JH3BMRAANDRFFKGGE
const searchURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

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
    $('.search-results').empty();
    // iterate through the items array
    for (let i = 0; i < responseJson.data.length; i++){
        // for each object in the items
        //array, add a list item to the results
        //list with the video title, description,
        //and thumbnail
        $('.search-results').append(
            `<li>
                <h3>${responseJson.data[i].name}</h3>
                <img src='${responseJson.data[i].images[0].url}'>
                <p>${responseJson.data[i].description}</p>
                <a href="${responseJson.data[i].url}" target="_blank" >Website: ${responseJson.data[i].url}</a>
    
            </li>`
        )};
    //display the results section
    $('.results').removeClass('hidden');
    console.log(responseJson.data.description);
};


function getRestaurants(query){
//4.object called params, params has key-value pairs for each of the URL
//query parameters we need to provide 
    const params = {
        key : API_Key,
        location: latLong,
        radius: 32500, 
        keyword: query,
        };
//5. once we have the object(params above) we need to convert it to "foo=bar&bizz=bang" format
    //this is where the function formatQueryParams comes in we run params through it
    const queryString = formatQueryParams(params)
//7. create the URL for the GET request to 
    //by combining the base URL, "?" character, and our query parameters string
    const url = searchURL + '?' + queryString;
    console.log(url);
}

var myHeaders = new Headers();
myHeaders.append("Authorization", "bearer O5zu0u-oz1WYnaeu2INxGAQrSR3kbaxiHCHyHT4H-aqt57J1OclzNEP7c7wDVXIH2f1Pj6HdGbJ1l2Jn3RsauY1UCG95jQmG0c-mcchWG3mCdvpL2-8wPp6xOctPX3Yx");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(url, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
//8.call fetch pass url through it (line67)      
//9.confirm fetch was ok (.then block)
//10.if not ok we throw an error
//11.otherwise we call response.json and run it through displayResults

function watchForm() {
    $('form').submit("click", event => {
        event.preventDefault();
//2.retrieve two values from the form have
    //theses two values = another term
    console.log($('.venue-type').val())
        const searchTerm = $('.venue-type').val();
//3. pass value from form 
        getRestaurants(searchTerm);
});
}

//start of accordian faq 
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
} 
// end of accordian faq

//get current location


$(document).ready(function(){
    $(".submit").click(function(){
        getLocation();
        event.preventDefault();
    });
  });

var x = document.getElementById("demo");
console.log(x);

function getLocation() {
    event.preventDefault();
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    let latLong = position.coords.latitude + "," + position.coords.longitude;
    console.log(latLong);
    console.log($('.venue-type').val());
    //take .log off later
}



//1.when app loads run this function
watchForm();