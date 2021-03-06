// Code for an interactive bubble visualization in D3.js

//Area constants
  var australia = [ "Australia", "New Zealand", "Norfolk Island" ];
  var caribbean = ["Anguilla", "Antigua and Barbuda","Aruba","Bahamas","Barbados","British Virgin Islands","Cayman Islands","Cuba","Dominica","Dominican Republic","Grenada","Guadeloupe","Haiti","Jamaica","Martinique","Montserrat","Netherlands Antilles","Puerto Rico","Saint Barthélemy","Saint Kitts and Nevis", "Saint Lucia", "Saint Martin","Saint Vincent and the Grenadines","Trinidad and Tobago","Turks and Caicos Islands","U.S. Virgin Islands"];
  var centralAmerica = ["Belize","Costa Rica","El Salvador","Guatemala","Honduras","Mexico","Nicaragua","Panama"];
  var centralAsia = ["Kazakhstan","Kyrgyzstan","Tajikistan","Turkmenistan", "Uzbekistan"];
  var channelIslands  = ["Guernsey", "Jersey"];
  var commonwealthIndStates = ["Armenia","Azerbaijan","Belarus", "Georgia","Kazakhstan", "Kyrgyzstan","Moldova","Russia", "Tajikistan","Turkmenistan","Ukraine", "Uzbekistan"];
  var easternAfrica = ["Burundi","Comoros","Djibouti", "Eritrea", "Ethiopia", "Kenya","Madagascar", "Malawi", "Mauritius", "Mayotte", "Mozambique", "Rwanda",  "Réunion",  "Seychelles", "Somalia","Tanzania", "Uganda", "Zambia", "Zimbabwe"];  
  var easternAsia  =["China","Hong Kong SAR China", "Japan","Macau SAR China", "Mongolia", "North Korea", "South Korea","Taiwan"];
  var easternEurope = ["Belarus","Bulgaria", "Czech Republic", "Hungary", "Moldova", "Poland", "Romania", "Russia","Slovakia",  "Ukraine", "Union of Soviet Socialist Republics"];
  var melanesia = [ "Fiji", "New Caledonia", "Papua New Guinea", "Solomon Islands", "Vanuatu"];
  var micronesianRegion = ["Guam", "Kiribati", "Marshall Islands", "Micronesia","Nauru", "Northern Mariana Islands", "Palau",];
  var middleAfrica = ["Angola", "Cameroon", "Central African Republic", "Chad",  "Congo - Brazzaville",  "Congo - Kinshasa","Equatorial Guinea","Gabon","São Tomé and Príncipe"];
  var northernAfrica = ["Algeria", "Egypt","Libya","Morocco","Sudan","Tunisia", "Western Sahara"];
  var northernAmerica = ["Bermuda","Canada","Greenland", "Saint Pierre and Miquelon","United States"];
  var northernEurope = [ "Denmark",  "Estonia",  "Faroe Islands",  "Finland",  "Guernsey", "Iceland", "Ireland",  "Isle of Man", "Jersey","Latvia", "Lithuania",  "Norway",  "Svalbard and Jan Mayen",  "Sweden", "United Kingdom", "Åland Islands"];
  var Polynesia = [ "American Samoa","Cook Islands", "French Polynesia","Niue", "Pitcairn Islands", "Samoa","Tokelau", "Tonga", "Tuvalu", "Wallis and Futuna",];
  var southAmerica = [ "Argentina", "Bolivia",  "Brazil", "Chile", "Colombia",  "Ecuador",  "Falkland Islands",  "French Guiana", "Guyana",  "Paraguay", "Peru", "Suriname",  "Uruguay", "Venezuela"];
  var southEasternAsia = ["Brunei","Cambodia", "Indonesia", "Laos","Malaysia","Burma","Philippines", "Singapore", "Thailand","Timor-Leste", "Vietnam"];
  var southernAfrica = [  "Botswana",  "Lesotho","Namibia","South Africa", "Swaziland"];
  var southernAsia = [ "Afghanistan", "Bangladesh", "Bhutan", "India", "Iran", "Maldives", "Nepal",  "Pakistan", "Sri Lanka"];
  var southernEurope = [ "Albania", "Andorra","Bosnia",  "Croatia", "Gibraltar", "Greece", "Italy","Macedonia", "Malta", "Montenegro", "Portugal", "San Marino", "Serbia",  "Serbia and Montenegro", "Slovenia",  "Spain", "Vatican City"];
  var westernAfrica = ["Benin","Burkina Faso", "Cape Verde", "Côte d’Ivoire", "Gambia", "Ghana", "Guinea","Guinea-Bissau", "Liberia", "Mali", "Mauritania",  "Niger",  "Nigeria", "Saint Helena", "Senegal",  "Sierra Leone", "Togo"];
  var westernAsia = [ "Armenia", "Azerbaijan","Bahrain", "Cyprus","Georgia", "Iraq", "Israel", "Jordan",  "Kuwait", "Lebanon","Neutral Zone", "Oman", "Palestinian Territories",  "Yemen", "Qatar", "Saudi Arabia",  "Syria", "Turkey", "United Arab Emirates", "Yemen"];
  var westernEurope = ["Austria", "Belgium","East Germany","France","Germany", "Liechtenstein",  "Luxembourg", "Metropolitan France", "Monaco",  "Netherlands", "Switzerland",];

  var naList = (northernAmerica, centralAmerica, caribbean);
  var saList = (southAmerica);
  var europeList = (channelIslands, commonwealthIndStates, easternEurope, northernEurope, southernEurope, westernEurope);
  var asiaList = (centralAsia, easternAsia, southernAsia, southEasternAsia, westernAsia);
  var africaList = (easternAfrica, middleAfrica, southernAfrica, northernAfrica, westernAfrica);
  var oceaniaList = (australia, melanesia, micronesianRegion, Polynesia);

  var photosByCont = [];
  var naCountries = [];
  var saCountries = [];
  var africaCountries = [];
  var europeCountries = [];
  var oceaniaCountries = [];
  var asiaCountries = [];

  var na = [];
  var sa = [];
  var africa = [];
  var asia = [];
  var oceania = [];
  var europe = [];

function main() {
  var svg = d3.select('#visualization').append('svg');
  svg.attr('width', 800);
  svg.attr('height', 800);



  d3.text('Resources/updatedJSONV4.json', function(err, content) {
    if (err) {
      console.error(err);
      return;
    }

    var lines = content.trim().split('\n');
    var photos = lines.map(function(line) {
      try {
        var temp = JSON.parse(line);
        return JSON.parse(line);
      } catch (error) {
        console.warn("Cannot parse line: " + line);
      }


    });
  
    // a bunch of helper functions that are used by D3 to compute attribute
    // values, or to call back when events happen

    function translate(d) {
      return 'translate(' + d.x + ',' + d.y + ')';
    }

    function fill(d, i) {
      if (d.isRoot) {
        return '#01A2A6';
      } else {
        //return '#bdf271';
        return 'url(#'+d.id+"-icon"+')';
      }
    }

    function nodeText(d) {
      if (!d.isRoot) {
        if (d.isActive) {
          return d.title;
        }
        if(workingSet.country){
          return d.country;
        }
        if(workingSet.onlyCountry){
          return "Favorites: " + d.favorites;
        }
        return d.continent;
      }
    }

    function fontSize(d) {
      if (!d.isRoot) {
        if (d.isActive) {
          return '24pt';
        }
        return '12pt';
      }
    }

    function mouseEnter(d) {
      if (!d.isRoot) {
        // when the user hovers over a node, we mark it as isActive
        d.isActive = true;
        div.transition()        
                .duration(200)      
                .style("opacity", .9);      
            div .html("<b>Title:</b> " + d.title + "<br/>" + "<b>User:</b> " + d.user.nickname + "<br/>" + "<b>Date:</b> " + d.dateTaken + "<br/>"  + "<b>Description:</b> " + d.description)  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");   
        update();
      }
    }

    function mouseLeave(d) {
      if (!d.isRoot) {
        d.isActive = false;
          div.transition()        
                .duration(500)      
                .style("opacity", 0);   
        update();
      }
    }

    function sortContinents(continent){
      var orderedCountryByContinent = new Array([]);
      orderedCountryByContinent[0][0] = continent[0];
      var newCountry = true;

      for (var i = 1; i < continent.length; i++){
         newCountry = true;
        for (var j = 0; j < orderedCountryByContinent.length; j++){
            if (orderedCountryByContinent[j][0].country == continent[i].country){
                orderedCountryByContinent[j].push(continent[i]);
                j = orderedCountryByContinent.length;
                newCountry = false;
            }
        } 
        if (newCountry){
          var temp = new Array(continent[i]);
          orderedCountryByContinent.push(temp);
        }

      }

      return orderedCountryByContinent;
    }

    function createCountrySet(country){
      var countryList = workingSet.currentRoot;
      var countryPreArray;
      for (var i in countryList){
        if (countryList[i][0].country == country){
          countryPreArray = countryList[i];
        }
      }
      // var countryArray = new Array([]);
      // for (var i in countryPreArray){
      //   var temp = new Array(countryPreArray[i]);
      //   countryArray.push(temp); 
      // }
      return countryPreArray;
    }



    function click(d) {
     if (workingSet.onlyCountry == true){
       window.open(d.downloadUrl);
       return;
     }
     if(workingSet.country) {
        workingSet.onlyCountry = true;
        workingSet.country = false;
        changeSet(createCountrySet(d.country));
        update();
        return;
     }
        switch(d.continent){
        case "Asia":
          changeSet(asiaCountries);
          workingSet.country = true;
          update();

          break;

        case "North America":
          changeSet(northAmericanCountries);
          workingSet.country = true;
          update();
          break;

        case "Europe":
          changeSet(europeCountries);
          workingSet.country = true;
          update();
          break;

        case "Oceania":
          changeSet(oceaniaCountries);
          workingSet.country = true;
          update();
          break;

        case "Africa":
          changeSet(africaCountries);
          workingSet.country = true;
          update();
          break;

        case "South America":
          changeSet(southAmericanCountries);
          workingSet.country = true;
          update();
          break;
      
      }
    }

    function getTop(){
     newPhotoSets = [];
      for (var i in workingSet.currentRoot){
        var topPhoto = workingSet.currentRoot[i];
        newPhotoSets.push(topPhoto[0]);
      }
      return newPhotoSets;
    }

   function searchKey(photoset,value){
      value = value.toLowerCase();
       for (var i in photoset) {  
        if (photoset[i].userTags.length != 0){
         for (j in photoset[i].userTags){
            temp = photoset[i].userTags[j];
            if(temp.toLowerCase() == value){
              return photoset[i];
            }
          }
          for (var j = 0; j < photoset[i].machineTags.length ; j++){
            temp = photoset[i].machineTags[j].tag;
            if(temp.toLowerCase() == value && photoset[i].machineTags[j].confidence > .8){
              return photoset[i];
            }
          }
        }
       }
     
       return false; //if there is no photo for that key
   }

   function searchDate(photoset, date){
       for (var i in photoset) {  
            temp = photoset[i].dateTaken;
            if(temp == String(date)){
              return photoset[i];
            }
    
        
       }
     
       return false;
   }
   function searchBoth(photoset, value, date){
     value = value.toLowerCase();
       for (var i in photoset) {  
        if (photoset[i].userTags.length != 0){
         for (j in photoset[i].userTags){
            temp = photoset[i].userTags[j];
            if(temp.toLowerCase() == value && photoset[i].dateTaken == String(date)){
              return photoset[i];
            }
          }
          for (var j = 0; j < photoset[i].machineTags.length ; j++){
            temp = photoset[i].machineTags[j].tag;
            if(temp.toLowerCase() == value && photoset[i].machineTags[j].confidence > .8 && photoset[i].dateTaken == String(date)){
              return photoset[i];
            }
          }
        }
       }
     
       return false; //if there is no photo for that key
   }

   function searchTagCountry(photoset, value){
     value = value.toLowerCase();
     var topTags = [];
       for (var i = 0; i < photoset.length; i++) {  
          if (topTags.length > 5){
            return topTags;
          }


         for (var j = 0; j < photoset[i].userTags.length ; j++){
            temp = photoset[i].userTags[j];
            if(temp.toLowerCase() == value){
              topTags.push(photoset[i]);
              j = photoset[i].userTags.length;
            }
          }

          for (var j = 0; j < photoset[i].machineTags.length ; j++){
            temp = photoset[i].machineTags[j].tag;
            if(temp.toLowerCase() == value && photoset[i].machineTags[j].confidence > .8){
               topTags.push(photoset[i]);
               j = photoset[i].machineTags.length;

            }
          }
       
     }
     if(topTags.length !=0 ){
       return topTags;
     }else {
       return false; //if there is no photo for that key
     }
    }

   function searchDateCountry(photoset, date){
       var dates = [];
       for (var i in photoset) {  
         temp = photoset[i].dateTaken;
         if(temp == String(date)){
              dates.push(photoset[i]);
          }      
       }   
       if (dates.length !=0){
          return dates;
       } else {
       return false;
        }
   }

   function searchBothCountry(photoset, value, date){
     value = value.toLowerCase();
     var topTags = [];
       for (var i in photoset) {  
         if (topTags.length > 5){
            return topTags;
         }
         for (var j = 0; j < photoset[i].userTags.length ; j++){
            temp = photoset[i].userTags[j];
            if(temp.toLowerCase() == value && temp.dateTaken == String(date) ){
              topTags.push(photoset[i]);
              j = photoset[i].userTags.length;
            }
          }
          for (var j = 0; j < photoset[i].machineTags.length ; j++){
            temp = photoset[i].machineTags[j].tag;
            if(temp.toLowerCase() == value && photoset[i].machineTags[j].confidence > .8  && temp.dateTaken == String(date) ){
               topTags.push(photoset[i]);
               j = photoset[i].machineTags.length;
            }
          }
        
       }
     if(topTags.length !=0 ){
       return topTags;
     }else {
       return false; //if there is no photo for that key
     }
    }

    function getTopCountry(){
      var i = 0;
      var topCountries = [];
      while (i < 10 && i < workingSet.currentRoot.length){
        topCountries.push(workingSet.currentRoot[i]);
        i++;
      }
      return topCountries;
    }

   function setRoot(fav){
    root.children = fav;
   }


   function changeSet(set){
      workingSet.currentRoot = set;
      if (workingSet.onlyCountry){
          if (workingSet.tag && !workingSet.date){
            setRoot(searchTagCountry(set, workingSet.currentTag));
          } else if (!workingSet.tag && workingSet.date){
            setRoot(searchDateCountry(set,workingSet.currentDate));
          } else if (workingSet.tag && workingSet.date){
            setRoot(searchBothCountry(set, workingSet.currentTag, workingSet.currentDate));
          } else {
            setRoot(getTopCountry() );
          }
       } else {
          if (workingSet.tag && !workingSet.date){
            setRoot(searchSets(workingSet.currentTag, ""));
          } else if (!workingSet.tag && workingSet.date){
             setRoot(searchSets("",workingSet.currentDate));
          } else if (workingSet.tag && workingSet.date){
             setRoot(searchSets(workingSet.currentTag, workingSet.currentDate));
          }else {
            setRoot(getTop());
          }
       }
    }

   function searchSets(val, date){
      newPhotoSets = [];
      for (var i in workingSet.currentRoot){
        if (workingSet.tag && !workingSet.date){
          topPhoto = searchKey(workingSet.currentRoot[i],val);
        } else if (!workingSet.tag && workingSet.date){
          topPhoto = searchDate(workingSet.currentRoot[i],date);
        } else if (workingSet.tag && workingSet.date){
          topPhoto = searchBoth(workingSet.currentRoot[i],val, date);
        } else {
          return getTop();
        }
        //console.log(topPhoto);
        if(topPhoto != false){ //so only countrys that have a photo are returned
         newPhotoSets.push(topPhoto);
        }
      }
      return newPhotoSets;
   }




 //seach function
  d3.select('#tagButton').on('click', function () {
     var val = document.getElementById("tagSearch").value;
     var date = document.getElementById('searchdate').value;


     //new photos to populate the screen
     if (val != ""){
        workingSet.tag = true;
        workingSet.currentTag = val;

     }else{
        workingSet.tag = false;
        workingSet.currentTag = "";
     }
     if (date != ""){
        workingSet.date = true;
        workingSet.currentDate = date;

     }else {
        workingSet.date = false;
        workingSet.currentDate = "";
     }

     if(workingSet.onlyCountry){
          if (workingSet.tag && !workingSet.date){
            newNodes = searchTagCountry(workingSet.currentRoot, workingSet.currentTag);
          } else if (!workingSet.tag && workingSet.date){
            newNodes = searchDateCountry(workingSet.currentRoot,workingSet.currentDate);
          } else if (workingSet.tag && workingSet.date){
            newNodes = searchBothCountry(workingSet.currentRoot, workingSet.currentTag, workingSet.currentDate);
          } else {
            newNodes = getTopCountry();
          }
     } else {
          newNodes = searchSets(val, date);
     }

       setRoot(newNodes);
       update();
     
    });



  d3.select('#worldButton').on('click', function () {
      workingSet.country = false;
      workingSet.onlyCountry = false;
      changeSet(photosByCont);


      update();
    });

  d3.select('#naButton').on('click', function () {
      workingSet.onlyCountry = false;
      changeSet(northAmericanCountries);     
      workingSet.country = true;

      update();


    });

  d3.select('#saButton').on('click', function () {
      workingSet.onlyCountry = false;
      changeSet(southAmericanCountries);
      workingSet.country = true;

      update();

    });

  d3.select('#euroButton').on('click', function () {
      workingSet.onlyCountry = false;
      changeSet(europeCountries);
      workingSet.country = true;

      update();


    });

  d3.select('#asiaButton').on('click', function () {
      workingSet.onlyCountry = false;
      changeSet(asiaCountries);
      workingSet.country = true;

      update();


    });

  d3.select('#africaButton').on('click', function () {
      workingSet.onlyCountry = false;
      changeSet(africaCountries);
      workingSet.country = true;

      update();


    });

  d3.select('#oceaniaButton').on('click', function () {
      workingSet.onlyCountry = false;
      changeSet(oceaniaCountries);
      workingSet.country = true;
      update();


    });




//CONTINENT SEARCH : puts the json into arrays by contienent ------------------------------------------------> 

        var northAmericaPhotos = photos.filter(function (row) {
          if(row.continent == 'North America') {
            return true;
          } else {
            return false;
          }
        });
        //sorted countries of north America
        var northAmericanCountries = sortContinents(northAmericaPhotos);
        photosByCont.push(northAmericaPhotos);

        var southAmericaPhotos = photos.filter(function (row) {
          if(row.continent == 'South America') {
            return true;
          } else {
            return false;
          }
        });
        //sorted countries of South America
        var southAmericanCountries = sortContinents(southAmericaPhotos);
        photosByCont.push(southAmericaPhotos);

        var europePhotos = photos.filter(function (row) {
          if(row.continent == 'Europe') {
            return true;
          } else {
            return false;
          }
        });
        //sorted countries of Europe
        europeCountries = sortContinents(europePhotos);
          photosByCont.push(europePhotos);

        var asiaPhotos = photos.filter(function (row) {
          if(row.continent == 'Asia') {
            return true;
          } else {
            return false;
          }
        });
        //sorted countries of Asia
        var asiaCountries = sortContinents(asiaPhotos);
        photosByCont.push(asiaPhotos);

        var africaPhotos = photos.filter(function (row) {
          if(row.continent == 'Africa') {
            return true;
          } else {
            return false;
          }
        });
          //sorted countries of Africa
          var africaCountries = sortContinents(africaPhotos);
          photosByCont.push(africaPhotos);

        var oceaniaPhotos = photos.filter(function (row) {
          if(row.continent == 'Oceania') {
            return true;
          } else {
            return false;
          }
        });
   //sorted countries of Oceania
        var oceaniaCountries = sortContinents(oceaniaPhotos);
        photosByCont.push(oceaniaPhotos);

    var root = {
      isRoot: true,
      children: [northAmericaPhotos[0], southAmericaPhotos[0], asiaPhotos[0], africaPhotos[0], europePhotos[0], oceaniaPhotos[0]],
    }; 


    var workingSet = {
      tag: false,
      date: false,
      country: false,
      onlyCountry: false,
      currentTag: "",
      currentDate: "",
      currentRoot: photosByCont,
    };

//-------------------------------------->
      //TESTING FUNCTIONS above functions





    var palette = d3.scale.category20();

    var bubbleLayout = d3.layout.pack().size([800, 800]).sort(null).padding(5);
    bubbleLayout.value(function(photo) {
      if (photo.isActive) {
        // when the data record is active (hovered over), we return a value
        // triple its actual value, to make it larger.
        //
        // **we change the value instead of just scaling the <circle> element
        // because we want D3 to recompute the layout.**
        return ((Number(photo.favorites)+2) * 3);
      } else {
        return (Number(photo.favorites)+1);
      }
    });


    function updateTitle(){
      if(!workingSet.country) {
         document.getElementById("main-title").innerHTML = "World" + " " + workingSet.currentTag + " " + workingSet.currentDate ;
      }
      if (workingSet.country) {
        document.getElementById("main-title").innerHTML = workingSet.currentRoot[0][0].continent + " " + workingSet.currentTag + " " + workingSet.currentDate ;
      }
      if (workingSet.onlyCountry) {
        document.getElementById("main-title").innerHTML = "Top " + workingSet.currentRoot[0].country + " " + workingSet.currentTag + " " + workingSet.currentDate ;
      }
    }

     var div = d3.select("body").append("div")   
          .attr("class", "tooltip")               
          .style("opacity", 0);


    function update() {
      // everytime update() is called, we (re)compute the layout, using the
      // previously provided value function
      updateTitle();
      
      var laidOut = bubbleLayout.nodes(root);
      var node = svg.selectAll('.node').data(laidOut);

      // deal with newly created nodes:
      var g = node.enter().append('g').classed('node', true); // note 'enter()'


      g.attr('transform', translate);

//~~~~~~~~~~~~~~~~~~

      var pattern = g.append('pattern')
                              pattern.attr("id",  function(d) { return (d.id+"-icon");});
                              pattern.attr("height", 1);
                              pattern.attr("width", 1);
                              pattern.attr('patternContentUnits', 'objectBoundingBox');
      var bg = pattern.append('image');
           bg.attr("xlink:href",  function(d) { return d.downloadUrl; });
           bg.attr("x", 0);
           bg.attr("y", 0);
           bg.attr("height", 1);
           bg.attr("width", 1);
           bg.attr("preserveAspectRatio", "xMinYMin slice");



//~~~~~~~~~~~
      
      var circle = g.append('svg:circle');
      circle.attr('r', function(d) { return d.r; });
      circle.style('fill', fill);


      g.on('mouseenter', mouseEnter);
      g.on('mouseleave', mouseLeave);
      g.on('click', click);

    //  var image = g.append('image');
    //  image.attr("xlink:href", function(d,i){  return d.downloadUrl; })

      var text = g.append('text');
      text.text(nodeText);
      text.attr('font-family', 'Helvetica');
      text.attr('font-size', fontSize);
      text.attr('fill', 'white');
      text.attr('text-anchor', 'middle');
      text.attr('dominant-baseline', 'middle');

       
   


      // deal with existing nodes:
      var transition = node.transition().duration(1000); // operate on all nodes
      transition.attr('transform', translate);
      transition.select('circle').attr('r', function(d) { return d.r; });
      node.select('pattern').attr("id",  function(d) { return (d.id+"-icon");} )
                            .attr('patternContentUnits', 'objectBoundingBox') ; //update photo id
      node.select('image').attr("xlink:href",  function(d) { return d.downloadUrl; } )
                             .attr("preserveAspectRatio", "xMinYMin slice") ; //update photo url
      node.select('circle').style('fill', fill); //update background
      transition.select('text').attr('font-size', fontSize).text(nodeText);



      // if some nodes are removed, you can use node.exit() to get a placeholder
      // to operate on them
        node.exit().remove();
 
    }


    update(); // on initial page loading, use update() to show the visualization
  });
}

main();
