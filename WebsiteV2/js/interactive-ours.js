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
  var currentRoot = photosByCont;
  var naStates = [];
  var saStates = [];
  var africaStates = [];
  var europeStates = [];
  var oceaniaStates = [];
  var asiaStates = [];

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



  d3.text('Resources/updatedJSONV3.json', function(err, content) {
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
        return d.continent;
      }
    }

    function fontSize(d) {
      if (!d.isRoot) {
        if (d.isActive) {
          return '24pt';
        }
        return '15pt';
      }
    }

    function mouseEnter(d) {
      if (!d.isRoot) {
        // when the user hovers over a node, we mark it as isActive
        d.isActive = true;
        div.transition()        
                .duration(200)      
                .style("opacity", .9);      
            div .html(d.title + "<br/>" + d.user.nickname + "<br/>" + d.dateTaken + "<br/>"  + d.description)  
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

    function worldButton(){
      root = {
      isRoot: true,
      children: [northAmericaPhotos[0], southAmericaPhotos[0], asiaPhotos[0], africaPhotos[0], europePhotos[0], oceaniaPhotos[0]],
      };
      update();
    }

    var increment = 1;
    function click(d) {
      increment = increment + 1; 
      switch(d.continent){
        case "Asia":
          setRoot(asiaPhotos.slice(1 * increment,10 * increment));
          currentRoot = asia;
          update();
          break;

        case "North America":
          setRoot(northAmericaPhotos.slice(1 * increment,10 * increment));
          currentRoot = na;
          update();
          break;

        case "Europe":
          setRoot(europePhotos.slice(1 * increment,10 * increment));
          currentRoot = europe;
          update();
          break;

        case "Oceania":
          setRoot(oceaniaPhotos.slice(1 * increment,10 * increment));
          currentRoot = oceania;
          update();
          break;

        case "Africa":
          setRoot(africaPhotos.slice(1 * increment,10 * increment));
          currentRoot = africa;
          update();
          break;

        case "South America":
          setRoot(southAmericaPhotos.slice(1 * increment,10 * increment));
          currentRoot = sa;
          update();
          break;
      }
    }

   function searchKey(photoset,value){
      increment = 1;
      value = value.toLowerCase();
       for (var i in photoset) {  
        if (photoset[i].userTags.length != 0){
         for (j in photoset[i].userTags){
            temp = photoset[i].userTags[j];
            if(temp.toLowerCase() == value){
              return photoset[i];
            }
          }
        }
       }
     
       return false; //if there is no photo for that key
   }


  function setRoot(fav){
    root.children = fav;
   }


   function searchSets(value){
      newPhotoSets = [];
      for (var i in currentRoot){
        topPhoto = searchKey(currentRoot[i],value);
        if(topPhoto != false){ //so only countrys that have a photo are returned
         newPhotoSets.push(topPhoto);
        }
      }
      console.log(newPhotoSets);
      return newPhotoSets;
   }

   //function searchDate()
   //function searchKey()

  

  //testing search function
    function getObjects(obj, key, val) {
        var objects = [];
        for (var i in obj) {  
          //  console.log("LENGTH" + obj.length);
       
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(getObjects(obj[i], key, val));
                // console.log("SUCCESS");
            } else if (i == key && obj[key] == val) {
                objects.push(obj);
            }
        }
    
        return objects;
    }

 // document.getElementById("nicknameButton").addEventListener("click", search);



  d3.select('#tagButton').on('click', function () {
     var val = document.getElementById("tagSearch").value;

     //new photos to populate the screen

       newNodes = searchSets(val);
       setRoot(newNodes);
       update();


     
    });

  d3.select('#worldButton').on('click', function () {
     var val = document.getElementById("tagSearch").value;

     //new photos to populate the screen

       newNodes = searchSets(val);
       setRoot(newNodes);


    });




//CONTINENT SEARCH : puts the json into arrays by contienent ------------------------------------------------> 

        var northAmericaPhotos = photos.filter(function (row) {
          if(row.continent == 'North America') {
            naStates.push(row);
            return true;
          } else {
            return false;
          }
        });
        /*northAmericaPhotos.sort(function(a, b) {
          return (b.favorites) - (a.favorites);
        });*/
        na.push(naStates);
        photosByCont.push(northAmericaPhotos);

        var southAmericaPhotos = photos.filter(function (row) {
          if(row.continent == 'South America') {
            saStates.push(row);
            return true;
          } else {
            return false;
          }
        });
       /*  southAmericaPhotos.sort(function(a, b) {
          return (b.favorites) - (a.favorites);
        });*/
        sa.push(saStates);
        photosByCont.push(southAmericaPhotos);

        var europePhotos = photos.filter(function (row) {
          if(row.continent == 'Europe') {
            europeStates.push(row);
            return true;
          } else {
            return false;
          }
        });
   /*       europePhotos.sort(function(a, b) {
          return (b.favorites) - (a.favorites);
        }); */
          europe.push(europeStates);
          photosByCont.push(europePhotos);

        var asiaPhotos = photos.filter(function (row) {
          if(row.continent == 'Asia') {
            asiaStates.push(row);
            return true;
          } else {
            return false;
          }
        });
     /*   asiaPhotos.sort(function(a, b) {
          return (b.favorites) - (a.favorites);
        }); */
        asia.push(asiaStates);
        photosByCont.push(asiaPhotos);

        var africaPhotos = photos.filter(function (row) {
          if(row.continent == 'Africa') {
            africaStates.push(row);
            return true;
          } else {
            return false;
          }
        });
   /*        africaPhotos.sort(function(a, b) {
           return (b.favorites) - (a.favorites);
        }); */
          photosByCont.push(africaPhotos);

        var oceaniaPhotos = photos.filter(function (row) {
          if(row.continent == 'Oceania') {
            oceaniaStates.push(row);
            return true;
          } else {
            return false;
          }
        });
   /*     oceaniaPhotos.sort(function(a, b) {
          return (b.favorites) - (a.favorites);
        });*/
        oceania.push(oceaniaStates);
        photosByCont.push(oceaniaPhotos);

    var root = {
      isRoot: true,
      children: [northAmericaPhotos[0], southAmericaPhotos[0], asiaPhotos[0], africaPhotos[0], europePhotos[0], oceaniaPhotos[0]],
    }; 
//-------------------------------------->
  


    var palette = d3.scale.category20();

    var bubbleLayout = d3.layout.pack().size([800, 800]).sort(null).padding(5);
    bubbleLayout.value(function(photo) {
      if (photo.isActive) {
        // when the data record is active (hovered over), we return a value
        // triple its actual value, to make it larger.
        //
        // **we change the value instead of just scaling the <circle> element
        // because we want D3 to recompute the layout.**
        return ((Number(photo.favorites)+1) * 3);
      } else {
        return (Number(photo.favorites)+1);
      }
    });



     var div = d3.select("body").append("div")   
          .attr("class", "tooltip")               
          .style("opacity", 0);

    function update() {
      // everytime update() is called, we (re)compute the layout, using the
      // previously provided value function

 
    
      var laidOut = bubbleLayout.nodes(root);
      var node = svg.selectAll('.node').data(laidOut);

      // deal with newly created nodes:
      var g = node.enter().append('g').classed('node', true); // note 'enter()'


      g.attr('transform', translate);

//~~~~~~~~~~~~~~~~~~
     // var defs = g.append('defs')

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
      //circle.classed('node', true)
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
      text.attr('text-anchor', 'middle');
      text.attr('dominant-baseline', 'middle');


      // deal with existing nodes:

      var transition = node.transition().duration(1000); // operate on all nodes
      transition.attr('transform', translate);
      transition.select('circle').attr('r', function(d) { return d.r; });
      node.select('pattern').attr("id",  function(d) { return (d.id+"-icon");} ); //update photo id
      node.select('image').attr("xlink:href",  function(d) { return d.downloadUrl; } ); //update photo url
      node.select('circle').style('fill', fill); //update background
      transition.select('text').attr('font-size', fontSize).text(nodeText);
;


      // if some nodes are removed, you can use node.exit() to get a placeholder
      // to operate on them
        node.exit().remove();


    }

    update(); // on initial page loading, use update() to show the visualization
  });
}

main();
