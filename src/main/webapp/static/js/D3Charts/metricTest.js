d3.json('static/dummyData/performance.json', function(data) {
    for (var i = 0; i < data.length; i++) {
        data[i] = MG.convert.date(data[i], 'date');
    }

    var all_the_data = MG.clone(data[0]);
    for (i = 1; i < data.length; i++){
        for (var j = 0; j < data[i].length; j++) {
            if (i === 2 && all_the_data[j].date < new Date('2014-02-01')) {
            } else {
                all_the_data[j]['value' + (i + 1)] = data[i][j].value;
            }
        }
    }
debugger; 
    MG.data_graphic({
        title: "Handling Different Sized Lines in a Single Array",
        description: "How do you handle data with multiple implied time series lengths?",
        data: all_the_data,
        width: 600,
        height: 200,
        right: 40,
        target: '#chart',
        linked: true,
        y_extended_ticks: true,
        x_accessor: 'date',
        y_accessor: ['value', 'value2', 'value3']
    });
});