var
    data = d3.csv('static/dummyData/trafficSource.csv'),
    margins = {top:10, bottom:10, right:10, left:10},
    barHeight=10,
    width=400,
    chart = d3.select("#chart"),
    x = d3.scale.linear().range([0, width]),
    y = d3.scale.ordinal(barHeight * data.length)
;

debugger;
chart
    .attr("height", barHeight * data.length + margins.top + margins.bottom )
    .attr("width", width * data.length + margins.left + margins.right );

var
    bar = chart
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr("transform",function(d,i){
            return "translate("+margins.left+","+i*barHeight+")";
        })
    ;