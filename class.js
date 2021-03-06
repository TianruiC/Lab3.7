var draw=function()
{
  var dataP=d3.json("data.json")
  dataP.then(function(data)
  {
    console.log("data",data)
    drawGraph(data,1000,600);
  },
  function(err)
  {
    console.log(err);
  }
);
document.getElementById("button1").disabled = true;
}

var draw1=function()
{
  var dataP=d3.json("data.json")
  dataP.then(function(data)
  {
    console.log("data",data)
    drawGraph(data,400,400);
  },
  function(err)
  {
    console.log(err);
  }
);
document.getElementById("button2").disabled = true;
}

var draw2=function()
{
  var dataP=d3.json("data.json")
  dataP.then(function(data)
  {
    console.log("data",data)
    drawGraph(data,800,600);
  },
  function(err)
  {
    console.log(err);
  }
);
document.getElementById("button3").disabled = true;
}


var drawGraph=function(data,w,d)
{
  var scren=
  {
    width:w,
    height:d
  };
  var svg=d3.select("body").append("svg")
            .attr("width",scren.width)
            .attr("height",scren.height)
  var margins=
  {
    top:10,
    bottom:50,
    left:35,
    right:70
  }
  var width=scren.width-margins.left-margins.right;
  var height=scren.height-margins.top-margins.bottom;

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
                  .classed("plot",true)
                  .attr("transform","translate("+margins.left+","+margins.top+")");

  var students=plotLand.selectAll("g")
                       .data(data)
                       .enter()
                       .append("g")
                       .attr("fill",function(d){ return colors(d.name)});

  students.selectAll("circle")
          .data(function(d){return d.grades})
          .enter()
          .append("circle")
          .attr("cx",function(d,i){return xScale(i);})
          .attr("cy",function(d,i){return yScale(d);})
          .attr("r",10);
  //the legend...
  var legend=svg.append("g")
                .classed("legend",true)
                .attr("transform","translate("+(width+margins.left)+","+margins.top+")");

  var legendLines=legend.selectAll("g")
                        .data(data)
                        .enter()
                        .append("g")
                        .classed("legendLine",true)
                        .attr("transform",function(d,i){
                        return "translate(0,"+(i*20)+")";});

  legendLines.append("rect")
             .attr("x",0)
             .attr("y",0)
             .attr("width",10)
             .attr("height",10)
             .attr("fill",function(d){return colors(d.name);});

  legendLines.append("text")
             .attr("x",20)
             .attr("y",10)
             .text(function(d){ return d.name;});

  var xAxis=d3.axisBottom(xScale);
  var yAxis=d3.axisLeft(yScale);

  svg.append("g").classed("xAxis",true)
     .call(xAxis)
     .attr("transform","translate("+margins.left+","+(margins.top+height+10)+")");
  svg.append("g").classed("yAxis",true)
     .call(yAxis)
     .attr("transform","translate("+(margins.left-10)+","+(margins.top)+")");
};
