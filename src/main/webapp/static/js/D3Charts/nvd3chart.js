var colors = d3.scale.category20();
debugger
var chart;
var
    axisXkey = "date",
    axisYkey = "impressions",
    division = 1000000,
    nestKey = "campaign_id"

;


    //"multiple","date", "impressions", 1000000,"campaign_id"
nv.addGraph(function() {
    chart = nv.models.stackedAreaChart()
        .useInteractiveGuideline(true)
        .x(function(d) { return d[0] })
        .y(function(d) { return d[1] })
        .controlLabels({stacked: "Stacked"})
        .duration(300);

    chart.xAxis.tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });
    chart.yAxis.tickFormat(d3.format(',.4f'));

    chart.legend.vers('furious');

    var graph = d3.json("/a1/report/1/2016-04-08,2016-04-19", function(data) {

        data.forEach(function (d) {

            d[axisXkey] = new Date(d[axisXkey]);
            d[axisYkey] = parseInt(d[axisYkey]) / division;

            /*            (d.clicks==null) ? delete d.clicks : '';
             (d.channel==null) ? delete d.channel : '';
             (d.audience_segment==null) ? delete d.audience_segment : '';
             (d.city==null) ? delete d.city : '';
             (d.os==null) ? delete d.os : '';
             (d.device_type==null) ? delete d.device_type : '';
             (d.conversions==null) ? delete d.conversions : '';
             (d.cost==null) ? delete d.cost : '';*/
        });

        data = data.sort(function (a, b) {
            if (a[axisXkey] > b[axisXkey]) {
                return 1;
            }
            if (a[axisXkey] < b[axisXkey]) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        var stack = d3.layout.stack()
            .offset("zero")
            .values(function(d) { return d.values; })
            .x(function(d) { return d[axisXkey]; })
            .y(function(d) { return d[axisYkey]; })
        ;

        var nest = d3.nest()
            .key(function(d) { return d[nestKey]; })
            .sortKeys(d3.descending)
        ;


        var layers = nest.entries(data);



        d3.select('#chart1')
            .datum(layers)
            .transition().duration(1000)
            .call(chart)
            .each('start', function() {
                setTimeout(function() {
                    d3.selectAll('#chart1 *').each(function() {
                        if(this.__transition__)
                            this.__transition__.duration = 1;
                    })
                }, 0)
            });
    })


    nv.utils.windowResize(chart.update);
    return chart;
});
