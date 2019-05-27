var countrydata = null;
var latitude = null;
var longitude = null;
//set value for html element based on ID
function setData(id,value)
{
  var field = document.getElementById(id);
  field.innerHTML = value;
}
//redirecting to the Index page
function rebase()
{
  window.location = "index.html";
}
//google map callback function which renders the map in the display
function initMap() {
  var mark = window.setInterval(function(){
    if(latitude!=null){
      var flag = document.getElementById('map');
      flag.style.height = "44%";
      var geocode = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
      var map = new google.maps.Map(
      flag, {zoom: 4, center: geocode});
      var marker = new google.maps.Marker({position: geocode, map: map});
      clearInterval(mark);
    }
  },1000);
}

//generating the data in the cards for jsonObject
function populateTableV1(data,id,header)
{
  var table = document.createElement("table");
  table.classList.add("morebottomspace");
  var head = document.createElement("th");
  head.innerHTML = header;
  head.classList.add("underline");
  table.appendChild(head);
  if(data.length == 0){
    var cell = document.createElement("tr");
    cell.innerHTML = "No Data Found!!";
    cell.classList.add("moretopspace")
    table.appendChild(cell);
  }else{
    for(var index=0 ; index < data.length ; index++)
    {
      var cell = document.createElement("tr");
      cell.innerHTML = data[index]["name"];
      table.appendChild(cell);
    }
  }
  id.appendChild(table);
}

//generating the data in the cards for jsonarray
function populateTableV2(data,id,header)
{
  var table = document.createElement("table");
  table.classList.add("morebottomspace");
  var head = document.createElement("th");
  head.classList.add("underline");
  head.innerHTML = header;
  table.appendChild(head);
  if(data.length == 0){
    var cell = document.createElement("tr");
    cell.innerHTML = "No Data Found!!";
    cell.classList.add("moretopspace")
    table.appendChild(cell);
  }else{
    for(var index=0 ; index < data.length ; index++)
    {
      var cell = document.createElement("tr");
      cell.innerHTML = data[index];
      table.appendChild(cell);
    }
  }
  id.appendChild(table);
}

//Executed when then page loads
document.addEventListener('DOMContentLoaded', function () {

  //fetching the data of country that needs to be populated on the page
  countrydata = JSON.parse(localStorage.getItem("countryobj"));
  console.log(countrydata);

  //redering the country flag
  var flag = document.getElementById('flag');
  flag.src = countrydata.flag;
  flag.style.height = "150px";
  latitude = countrydata.latlng[0];
  longitude = countrydata.latlng[1];

  // Loading the data if present else load NA

  //loading the country name
  if(countrydata.name != null){
    setData('countryname',countrydata.name);
    setData('name',countrydata.name);
  }else{
    setData('countryname',"NA");
    setData('name',"NA");
  }

  //loading the capital
  if(countrydata.capital != null){
    setData('capital',countrydata.capital);
  }else{
    setData('capital',"NA");
  }

  //loading the region data
  if(countrydata.region != null){
    setData('region',countrydata.region);
  }else{
    setData('region',"NA");
  }

  //loading the subregion
  if(countrydata.subregion != null){
    setData('subregion',countrydata.subregion);
  }else{
    setData('subregion',"NA");
  }

  //loading the population
  if(countrydata.population != null){
    setData('population',countrydata.population);
  }else{
    setData('population',"NA");
  }

  //loading the area
  if(countrydata.area != null){
    setData('area',countrydata.area);
  }else{
    setData('area',"NA");
  }

  //Loading the gini
  if(countrydata.gini != null){
    setData('gini',countrydata.gini);
  }else{
    setData('gini',"NA");
  }

  //loading the timezone data
  if(countrydata.timezone != null){
    setData('timezone',countrydata.timezone);
  }else{
    setData('timezone',"NA");
  }

  //loading the Languages card
  var languages = countrydata.language;
  var languageTable  = document.getElementById("languages");
  populateTableV1(languages,languageTable,"Languages");

  //Loading the currency card
  var currency = countrydata.currency;
  var currencyTable  = document.getElementById("currency");
  populateTableV1(currency,currencyTable,"Currency");

  //loading the borders card
  var borders = countrydata.borders;
  var borderTable  = document.getElementById("borders");
  populateTableV2(borders,borderTable,"Borders");

  //loading the nickname card
  var nickname = countrydata.nickname;
  var nicknameTable  = document.getElementById("nickname");
  populateTableV2(nickname,nicknameTable,"NickNames");
});
