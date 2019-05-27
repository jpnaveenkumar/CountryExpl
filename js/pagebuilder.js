//enum for the search_criteria
var searchEnum =
{
  FULLNAME : 1,
  NAME : 2,
  REGION : 3,
  CAPITAL : 4,
};

//store the search results
var countrylist = null;

//get the center tag
function getCenter()
{
  var center = document.createElement("center");
  return center;
}

//validating the user input only Alphabets and spaces allowed
function validateInput()
{
  var user_input = document.getElementById("user-input").value;
  var pattern = /[a-zA-Z ]+/ ;
  var patternresult = user_input.match(pattern);
  if( patternresult != null && user_input == patternresult.join(''))
  {
    return true;
  }
  return false;
}

//adding the onclick event listenser to the dynamically added Javascript card buttons
function registerEventListener(countries)
{
  for(var country in countries)
  {
    var element = document.getElementById(country);
    element.addEventListener("click",function(){
      var id = this.id;
      let country = countrylist[id];
      console.log(country);
      //storing the user clicked country in the localStorage
      localStorage.setItem("countryobj",JSON.stringify(country));
      window.location = "details.html";
    });
  }
}

//create a card using DOM for the list of country obtained from the api call
function createCard(countries)
{
  countrylist = countries;
  var content = document.getElementById("content");
  var cards = document.createElement("div");
  //creating each card and adding it to the display
  for(var country in countries)
  {
    var card = document.createElement("div");

    //setting card properties
    card.classList.add("col-l-5","col-m-4","col-s-12","z-depth-5");
    card.style.border = "3px solid black";
    card.style.marginRight = "3%";
    card.style.marginTop = "5%";
    card.style.borderRadius = "20px";
    card.style.textAlign = "center";
    card.style.height = "270px";
    card.style.boxShadow = "15px 15px 10px black";

    //setting card name properties
    var countryname = document.createElement("h3");
    countryname.innerText = countries[country].name;

    //setting card flag properties
    var countryflag = document.createElement("img");
    countryflag.src = countries[country].flag;
    countryflag.style.width = "50%";
    countryflag.style.height = "150px";

    //setting the card button properties
    var centerDetail  = getCenter();
    var detail = document.createElement("button");
    detail.innerHTML = "<i style='color:white' class='material-icons'>arrow_forward</i>";
    detail.style.backgroundColor = "black";
    detail.style.borderRadius = "25px";
    detail.style.display = "flex";
    detail.style.marginTop = "2%";
    detail.style.marginBottom = "2%";
    detail.id = country;
    centerDetail.appendChild(detail);

    //adding the above created element on the display
    card.appendChild(countryname);
    card.appendChild(countryflag);
    card.appendChild(centerDetail);
    cards.appendChild(card);
  }
  content.innerHTML = cards.outerHTML;
  //register event listener for above created buttons
  registerEventListener(countries)
}

//Actual api call is made here
function hitAPICall(url)
{
  fetch(url)
    .then(function(response){
      return response.json();
    })
    .catch(function(error){
      alert(error);
      console.error(error);
    })
    .then(function(data){
      if(data["status"])
      {
        //if api call is made with the invalid api data
        var content = document.getElementById("content");
        content.innerHTML = "<h3> <i class='material-icons moretopspace mediumicon'>search</i>  No Search Results Found </h3>";
      }
      else{
        //storing the results obtained from the api call in a Javascript object array
        var countries = new Array();
        for(var index = 0; index < data.length; index++)
        {
          var country = new Country();
          country.name = data[index]["name"];
          country.flag = data[index]["flag"];
          country.capital = data[index]["capital"];
          country.region = data[index]["region"];
          country.subregion = data[index]["subregion"];
          country.population = data[index]["population"];
          country.latlng = data[index]["latlng"];
          country.area = data[index]["area"];
          country.gini = data[index]["gini"];
          country.timezone = data[index]["timezones"][0];
          country.borders = data[index]["borders"];
          country.currency = data[index]["currencies"];
          country.language = data[index]["languages"];
          country.nickname = data[index]["altSpellings"];
          countries.push(country);
        }
        console.log(countries);
        createCard(countries);
      }
    });
}

//generating url for the fullname search
function fetchByFullname(parameter)
{
  // https://restcountries.eu/rest/v2/name/aruba?fullText=true
  var url = ("https://restcountries.eu/rest/v2/name/").concat(parameter).concat("?fullText=true");
  hitAPICall(url);
}
//generating the url for the partial name based search
function fetchByName(parameter)
{
  // https://restcountries.eu/rest/v2/name/eesti
  var url = ("https://restcountries.eu/rest/v2/name/").concat(parameter);
  hitAPICall(url);
}
//generating url for the region based search
function fetchByRegion(parameter)
{
  // https://restcountries.eu/rest/v2/region/europe
  var url = ("https://restcountries.eu/rest/v2/region/").concat(parameter);
  hitAPICall(url);
}
//search by the country capital
function fetchByCapital(parameter)
{
  // https://restcountries.eu/rest/v2/capital/tallinnhttps://restcountries.eu/rest/v2/capital/tallinn
  var url = ("https://restcountries.eu/rest/v2/capital/").concat(parameter);
  hitAPICall(url);
}
//to create and render the cards with data on the display
function displayCards()
{
    //setting the loading text on the screen
    var content = document.getElementById("content");
    content.innerHTML = "<h3> <i class='material-icons moretopspace mediumicon'>explore</i> Finding results ...... </h3>";
    //validating the user input
    var result = validateInput();
    console.log(result);
    //if input is valid then make api call based on the search criteria
    if(result)
    {
      var search_criteria = document.getElementById("search-criteria").value;
      var user_input = document.getElementById("user-input").value;
      if(searchEnum.FULLNAME == search_criteria)
      {
        fetchByFullname(user_input);
      }
      else if(searchEnum.NAME == search_criteria)
      {
        fetchByName(user_input);
      }
      else if(searchEnum.REGION == search_criteria)
      {
        fetchByRegion(user_input);
      }
      else if(searchEnum.CAPITAL == search_criteria)
      {
        fetchByCapital(user_input);
      }
    }
    //displaying the error results on the screen
    else{
      var content = document.getElementById("content");
      content.innerHTML = "<h3> <i class='material-icons moretopspace mediumicon'>error</i> Invalid search text </h3>";
    }
}
