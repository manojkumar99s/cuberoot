d3.csv('static/dummyData/climate_data.csv', function(data) {

    var
        height = 600,
        width = 800,
        padding = 50
    ;

    var viz = d3.select("#chart")
        .append('svg')
        .attr('id', 'viz')
        .attr('height',height)
        .attr('width',width)
    ;


    dots = viz.selectAll('circle')
        .data(data)
        .enter()
        .append('circle');
    debugger;
/*
    dots.attr('r', function(d) {return d.TMAX});
    dots.attr('r', function(d) {return Math.abs(d.TMAX)});
*/
    dots
        .attr('r', function(d) {return Math.abs(d.TMAX) / 100})
        .attr('cx',function(d){return Math.max(0 + padding, Math.random() * width - padding) })
        .attr('cy',function(d){return Math.max(0 + padding, Math.random() * height - padding) })
        //.style("stroke","red")
        .style("fill",function(d){
            year = d.DATE.chartAt(3);
            if(year === "3"){
                return "blue";
            } else {
                return "green";
            }
        });
});