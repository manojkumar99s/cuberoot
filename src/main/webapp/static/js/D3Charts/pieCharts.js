function pieChart(obj) {
    var dimension = obj.dimension;
    var data = obj.data;
    var chartPlaceHolder = d3.select("#"+obj.targetID);
    var margin = {top: 20, right: 20, bottom: 70, left: 40};
    if(!!obj.margin){
        margin = obj.margin;
    }
    var
        width = parseInt(chartPlaceHolder[0][0].offsetWidth * parseInt(dimension.width)/100) - margin.left - margin.right,
        height = width * parseInt(dimension.height)/100 - margin.top - margin.bottom;



    //debugger;
    var radius = Math.min(width, height) / 2;

    var color = d3.scale.category20();

    var pie = d3.layout.pie()
        .value(function (d) {
            return d.apples;
        })
        .sort(null);

    var arc = d3.svg.arc()
        .innerRadius(radius - 50)
        .outerRadius(radius - 10);

    var svg = chartPlaceHolder.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    /*d3.tsv("data.tsv", type, function (error, data) {*/

        var path = svg.datum(data)
            .selectAll("path")
            .data(pie)
            .enter().append("path")
            .attr("fill", function (d, i) {
                return color(i);
            })
            .attr("d", arc);

        d3.selectAll("input")
            .on("change", change);

        var timeout = setTimeout(function () {
            d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
        }, 2000);

        function change() {
            var value = this.value;
            clearTimeout(timeout);
            pie.value(function (d) {
                return d[value];
            }); // change the value function
            path = path.data(pie); // compute the new angles
            path.attr("d", arc); // redraw the arcs
        }
  /*  });*/

    function type(d) {
        d.apples = +d.apples;
        d.oranges = +d.oranges;
        return d;
    }

}