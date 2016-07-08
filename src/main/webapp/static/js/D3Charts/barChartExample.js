'use strict';

var
    data = [55, 44, 30, 23, 17, 14, 16, 25, 41, 61, 85, 101, 95, 105, 114, 150, 180, 210, 125, 100, 71, 75, 72, 67],
    paddings = {top:5,right:5,bottom:5, left:30},
    barWidth  = 22,
    barPadding = 2,
    maxValue = d3.max(data),
    svg = d3.select('body #chart').append('svg'),
    width = (data.length * (barWidth + barPadding) )
;

if(typeof(paddings) !== "object" && typeof(paddings) === "number"){
    var allPaddings = {top:paddings, right:paddings, bottom:paddings, left:paddings}
    paddings = allPaddings;
}


var
    totalWidth = width + paddings.left + paddings.right,
    barGroup = svg.attr({
            'width': totalWidth,
            'height':(maxValue + paddings.top + paddings.bottom)
    })
    .append('g'),

    barGroups = barGroup.selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr({transform:translator}),

    //text position
    textTranslator = "translate("+ (barWidth / 2) + ", 0)",
    scale = d3.scale
        .linear()
        .domain([maxValue, 0])
        .range([0,maxValue]),
    axis =  d3.svg.axis().orient('left').scale(scale),
    axisBarGroup = svg.append('g')
;



axisBarGroup.call(axis);
axisBarGroup.attr({'fill':'none','stroke':'#999','stroke-width':'1', 'transform':'translate('+paddings.left+','+paddings.top+')'});
axisBarGroup.style({'font':'11px normal Arial, sans-serif','font-weight':'normal'})



function xloc(d,i){return paddings.left + (i * ( barWidth + barPadding) )}
function yloc(d,i){return (maxValue  + paddings.top) - d }
function translator(d, i) {
    return "translate(" + xloc(d, i) + "," + yloc(d) + ")";
}

//debugger
barGroups
    .append('rect')
    .attr({
        fill:'steelblue',
        width:barWidth ,
        height : function(d){return d;}
    })
;

barGroups
    .append('text')
    .text(function(d){return d;})
    .attr({
        fill:'white',
        'alignment-baseline':'before-edge',
        'text-anchor':'middle',
        transform:textTranslator
    })
    .style({'font':'10px Arial, sans-serif'})
;
var
    tsvData, csvData, jsonData
;
d3.tsv('static/dummyData/tsv.tsv',function(error,data){
    console.log(data);
    tsvData = data;
});

d3.json('static/dummyData/climate_data.json',function(error,data){
    console.log(data);
    csvData = data;
});


