
  var dataP=d3.json("data.json");
  dataP.then(function(data)
  {
    console.log("data",data)
    drawGraph(data);
  },
  function(err)
  {
    console.log(err);
  }
);
  //document.getElementById("button1").disabled = true;


var drawGraph=function(data)
{
  var screen=
  {
    width:500,
    height:400
  };
  var svg=d3.select("svg")
            .attr("width",screen.width)
            .attr("width",screen.height)
  var margins=
  {
    top:10,
    bottom:10,
    left:10,
    right:10
  }
  var width=screen.width-margins.left-margins.right;
  var height=screen.height-margins.top-margins.bottom;

  //scales usually go here
  var xScale=d3.scaleLinear()
               .domain([0,20])
               .range([0,width]);
  var yScale=d3.scaleLinear()
               .domain([0,100])
               .range([height,0]);
  var colors=d3.scaleOrdinal(d3.schemeAccent);
  //plot land

  var plotLand =svg.append("g")
                  .classed("plot",true);
                  .attr("transform","translate("+margins.left+","+margins.top+")");

  var students=plotLand.selectAll("g")
                       .data(data)
                       .enter()
                       .append("g");
                       .attr("fill",function(d){ return colors(d.name)})

  students.selectAll("circle")
          .data(function(d){return d.grades})
          .enter()
          .append("circle")
          .attr("cx",function(d,i){return xScale(i)})
          .attr("cy",function(d,i){return yScale(d)})
          .attr("r",5);
  //the legend...
  
}
