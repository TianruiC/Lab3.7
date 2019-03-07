var draw=function()
{
  var dataP=d3.csv("data.csv")
  dataP.then(function(data)
  {
    console.log("data",data)
    drawChart(data);
  },
  function(err)
  {
    console.log(err);
  }
  )
  document.getElementById("button1").disabled = true;
};

var drawGrpah=function(data)
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

  //plot land

  var ploLand =svg.append("g")
                  .classed("plot",true);
}
