// Code for an interactive bubble visualization in D3.js

function main() {
  var svg = d3.select('#visualization').append('svg');
  svg.attr('width', 800);
  svg.attr('height', 800);

  d3.text('Resources/updatedJSONV2.json', function(err, content) {
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
    console.log(photos);

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
        return d.favorites.length;
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

    function click(d) {
      if (d.id) {
        window.open(d.downloadUrl);
      }
    }

   

  //testing search function
    function getObjects(obj, key, val) {
        var objects = [];
        for (var i in obj) {         
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(getObjects(obj[i], key, val));
            } else if (i == key && obj[key] == val) {
                objects.push(obj);
            }
        }
    
        return objects;
    }

 // document.getElementById("nicknameButton").addEventListener("click", search);

  function search(){
      var val = document.getElementById("nicknameSearch").value;
      console.log(photos);
      console.log(getObjects(photos,'continent','North America'));
      //changeRoot('nickname', val);

  }

  d3.select('#nicknameButton').on('click', function () {
     var val = document.getElementById("nicknameSearch").value;
      console.log(photos);

      console.log(getObjects(photos,'continent','North America'));
    });

//CONTINENT SEARCH : puts the json into arrays by contienent ------------------------------------------------> 
        var northAmericaPhotos = photos.filter(function (row) {
          if(row.continent == 'North America' && row.favorites.length != 0) {
            return true;
          } else {
            return false;
          }
        });

        var southAmericaPhotos = photos.filter(function (row) {
          if(row.continent == 'South America' && row.favorites.length != 0) {
            return true;
          } else {
            return false;
          }
        });

        var europePhotos = photos.filter(function (row) {
          if(row.continent == 'Europe' && row.favorites.length != 0) {
            return true;
          } else {
            return false;
          }
        });

        var asiaPhotos = photos.filter(function (row) {
          if(row.continent == 'Asia' && row.favorites.length != 0) {
            return true;
          } else {
            return false;
          }
        });

        var africaPhotos = photos.filter(function (row) {
          if(row.continent == 'Africa' && row.favorites.length != 0) {
            return true;
          } else {
            return false;
          }
        });

        var AustraliaPhotos = photos.filter(function (row) {
          if(row.continent == 'Oceana' && row.favorites.length != 0) {
            return true;
          } else {
            return false;
          }
        });
//-------------------------------------->

   // console.log(getObjects(photos,'continent','South America'));

    var palette = d3.scale.category20();

    var bubbleLayout = d3.layout.pack().size([800, 800]).sort(null).padding(5);
    bubbleLayout.value(function(photo) {
      if (photo.isActive) {
        // when the data record is active (hovered over), we return a value
        // triple its actual value, to make it larger.
        //
        // **we change the value instead of just scaling the <circle> element
        // because we want D3 to recompute the layout.**
        return photo.favorites.length * 3;
      } else {
        return photo.favorites.length;
      }
    });

    var root = {
      isRoot: true,
      children: northAmericaPhotos,
    };

    function changeRoot(key, val){
       console.log('original root' + root.children);
       root.children = getObjects(photos, key, val);
    }

    function update() {
      // everytime update() is called, we (re)compute the layout, using the
      // previously provided value function
      var laidOut = bubbleLayout.nodes(root);

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
      //transition.select('circle').style('fill', fill);
      transition.select('text').attr('font-size', fontSize).text(nodeText);
;


      // if some nodes are removed, you can use node.exit() to get a placeholder
      // to operate on them
    }

    update(); // on initial page loading, use update() to show the visualization
  });
}

main();
