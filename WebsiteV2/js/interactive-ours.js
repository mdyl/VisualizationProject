// Code for an interactive bubble visualization in D3.js

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
        return Number(d.favorites);
      }
    }

    function fontSize(d) {
      if (!d.isRoot) {
        if (d.isActive) {
          return '18pt';
        }
        return '9pt';
      }
    }

    function mouseEnter(d) {
      if (!d.isRoot) {
        // when the user hovers over a node, we mark it as isActive
        d.isActive = true;
        update();
      }
    }

    function mouseLeave(d) {
      if (!d.isRoot) {
        d.isActive = false;
        update();
      }
    }

    var increment = 1;

    function click(d) {
      increment = increment + 1; 
      switch(d.continent){
        case "Asia":
          setRoot(asiaPhotos.slice(1 * increment,10 * increment));
          update();
          break;

        case "North America":
          setRoot(northAmericaPhotos.slice(1 * increment,10 * increment));
          update();
          break;

        case "Europe":
          setRoot(europePhotos.slice(1 * increment,10 * increment));
          update();
          break;

        case "Oceania":
          setRoot(oceaniaPhotos.slice(1 * increment,10 * increment));
          update();
          break;

        case "Africa":
          setRoot(africaPhotos.slice(1 * increment,10 * increment));
          update();
          break;

        case "South America":
          setRoot(southAmericaPhotos.slice(1 * increment,10 * increment));
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
      for (var i in photosByCont){
        topPhoto = searchKey(photosByCont[i],value);
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

       newNodes = searchSets("dog");
       setRoot(newNodes);

     
    });




//CONTINENT SEARCH : puts the json into arrays by contienent ------------------------------------------------> 
        var photosByCont = [];
        var northAmericaPhotos = photos.filter(function (row) {
          if(row.continent == 'North America') {
            return true;
          } else {
            return false;
          }
        });
        /*northAmericaPhotos.sort(function(a, b) {
          return (b.favorites) - (a.favorites);
        });*/
        photosByCont.push(northAmericaPhotos);

        var southAmericaPhotos = photos.filter(function (row) {
          if(row.continent == 'South America') {
            return true;
          } else {
            return false;
          }
        });
       /*  southAmericaPhotos.sort(function(a, b) {
          return (b.favorites) - (a.favorites);
        });*/
        photosByCont.push(southAmericaPhotos);

        var europePhotos = photos.filter(function (row) {
          if(row.continent == 'Europe') {
            return true;
          } else {
            return false;
          }
        });
   /*       europePhotos.sort(function(a, b) {
          return (b.favorites) - (a.favorites);
        }); */
          photosByCont.push(europePhotos);

        var asiaPhotos = photos.filter(function (row) {
          if(row.continent == 'Asia') {
            return true;
          } else {
            return false;
          }
        });
     /*   asiaPhotos.sort(function(a, b) {
          return (b.favorites) - (a.favorites);
        }); */
        photosByCont.push(asiaPhotos);

        var africaPhotos = photos.filter(function (row) {
          if(row.continent == 'Africa') {
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
            return true;
          } else {
            return false;
          }
        });
   /*     oceaniaPhotos.sort(function(a, b) {
          return (b.favorites) - (a.favorites);
        });*/
        photosByCont.push(oceaniaPhotos);
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

    var root = {
      isRoot: true,
      children: [northAmericaPhotos[0], southAmericaPhotos[0], asiaPhotos[0], africaPhotos[0], europePhotos[0], oceaniaPhotos[0]],
    };



    function update() {
      // everytime update() is called, we (re)compute the layout, using the
      // previously provided value function
      var laidOut = bubbleLayout.nodes(root).filter(function(d){return !d.children;});

      var node = svg.selectAll('.node').data(laidOut);

      // deal with newly created nodes:
      var g = node.enter().append('g').classed('node', true); // note 'enter()'


      g.attr('transform', translate);

//~~~~~~~~~~~~~~~~~~
      var defs = g.append('defs')

      var pattern = defs.append('pattern')
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
      transition.select('pattern').attr("id",  function(d) { return (d.id+"-icon");} ); //update photo id
      transition.select('bg').attr("xlink:href",  function(d) { return d.downloadUrl; } ); //update photo url
      transition.select('circle').style('fill', fill); //update background
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
