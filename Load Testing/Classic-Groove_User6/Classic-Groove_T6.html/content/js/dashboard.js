/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9873737373737373, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-23"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-24"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-21"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-22"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-20"], "isController": false}, {"data": [0.9166666666666666, 500, 1500, "http://localhost/Classic-Groove-main/index.php-18"], "isController": false}, {"data": [0.9166666666666666, 500, 1500, "http://localhost/Classic-Groove-main/index.php-19"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-16"], "isController": false}, {"data": [0.9166666666666666, 500, 1500, "http://localhost/Classic-Groove-main/index.php-17"], "isController": false}, {"data": [0.9166666666666666, 500, 1500, "Test"], "isController": true}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-14"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-15"], "isController": false}, {"data": [0.9166666666666666, 500, 1500, "http://localhost/Classic-Groove-main/index.php"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-12"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-13"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-10"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-11"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-30"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-29"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-27"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-28"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-6"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-25"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-5"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-26"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-3"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-1"], "isController": false}, {"data": [1.0, 500, 1500, "http://localhost/Classic-Groove-main/index.php-0"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 192, 0, 0.0, 48.09375, 1, 1376, 3.0, 182.90000000000097, 288.0, 834.739999999996, 22.46139447824052, 2317.039393352246, 24.48215225783809], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://localhost/Classic-Groove-main/index.php-23", 6, 0, 0.0, 1.6666666666666667, 1, 2, 2.0, 2.0, 2.0, 2.0, 0.7838014369693012, 8.725914435009797, 0.44012287720444154], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-24", 6, 0, 0.0, 3.6666666666666665, 1, 10, 3.0, 10.0, 10.0, 10.0, 0.7834943849569078, 1.3054414093105249, 0.4376550665970227], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-21", 6, 0, 0.0, 2.5, 2, 4, 2.0, 4.0, 4.0, 4.0, 0.7830853563038371, 1.9500660728269381, 0.4420149765074393], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-22", 6, 0, 0.0, 2.1666666666666665, 1, 3, 2.0, 3.0, 3.0, 3.0, 0.7833920877399138, 3.3860286917352136, 0.4421881120250686], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-20", 6, 0, 0.0, 3.0, 2, 4, 3.0, 4.0, 4.0, 4.0, 0.782983165861934, 113.07084876190787, 0.443486558788986], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-18", 6, 0, 0.0, 334.0, 225, 794, 241.0, 794.0, 794.0, 794.0, 0.7552870090634441, 67.07757525333585, 0.39534554380664655], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-19", 6, 0, 0.0, 343.16666666666663, 200, 763, 242.5, 763.0, 763.0, 763.0, 0.7561436672967864, 67.11365784499056, 0.39505552930056714], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-16", 6, 0, 0.0, 3.6666666666666665, 2, 9, 2.5, 9.0, 9.0, 9.0, 0.7765984985762361, 13.882582958516696, 0.4482126100181206], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-17", 6, 0, 0.0, 230.16666666666666, 113, 715, 138.0, 715.0, 715.0, 715.0, 0.7633587786259541, 2.401896469465649, 0.40478888358778625], "isController": false}, {"data": ["Test", 6, 0, 0.0, 492.16666666666663, 288, 1376, 291.5, 1376.0, 1376.0, 1376.0, 0.6964596633778294, 1149.5097350188623, 12.145875652930934], "isController": true}, {"data": ["http://localhost/Classic-Groove-main/index.php-14", 6, 0, 0.0, 4.166666666666666, 2, 8, 4.0, 8.0, 8.0, 8.0, 0.7751937984496124, 1.31671915374677, 0.44058866279069764], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-15", 6, 0, 0.0, 4.0, 2, 7, 3.5, 7.0, 7.0, 7.0, 0.7760962359332557, 2.825727994437977, 0.4479227299185099], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php", 6, 0, 0.0, 492.16666666666663, 288, 1376, 291.5, 1376.0, 1376.0, 1376.0, 0.7019185774450163, 1158.519696676123, 12.241076128919046], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-12", 6, 0, 0.0, 5.333333333333334, 2, 15, 3.5, 15.0, 15.0, 15.0, 0.7744933522653931, 1.6036953820833872, 0.443972263456822], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-13", 6, 0, 0.0, 3.1666666666666665, 1, 8, 2.0, 8.0, 8.0, 8.0, 0.7742934572202865, 3.7588015389082465, 0.4393207994579946], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-10", 6, 0, 0.0, 2.8333333333333335, 1, 4, 3.0, 4.0, 4.0, 4.0, 0.7739938080495357, 1.5059117808307534, 0.439906636996904], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-11", 6, 0, 0.0, 3.0, 2, 4, 3.0, 4.0, 4.0, 4.0, 0.7734949078251901, 1.6633161982725282, 0.445666011344592], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-30", 6, 0, 0.0, 2.3333333333333335, 1, 4, 2.0, 4.0, 4.0, 4.0, 0.7847240387130526, 4.93824385299503, 0.4475379283285378], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-29", 6, 0, 0.0, 1.6666666666666667, 1, 2, 2.0, 2.0, 2.0, 2.0, 0.7847240387130526, 0.9709427314935914, 0.45060325660476064], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-9", 6, 0, 0.0, 3.8333333333333335, 2, 8, 3.0, 8.0, 8.0, 8.0, 0.7730962504831851, 5.834209106429584, 0.43939650173946654], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-8", 6, 0, 0.0, 12.166666666666666, 3, 51, 4.5, 51.0, 51.0, 51.0, 0.773594636410521, 5.907472843604951, 0.4419461545899948], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-27", 6, 0, 0.0, 1.5, 1, 2, 1.5, 2.0, 2.0, 2.0, 0.7844162635638645, 3.4578662243430514, 0.4473624003137665], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-7", 6, 0, 0.0, 5.666666666666667, 3, 15, 3.5, 15.0, 15.0, 15.0, 0.7454342154304883, 0.881320660951671, 0.42513045098770036], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-28", 6, 0, 0.0, 1.5, 1, 2, 1.5, 2.0, 2.0, 2.0, 0.7847240387130526, 2.371797753727439, 0.4483042603975935], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-6", 6, 0, 0.0, 4.5, 3, 7, 4.5, 7.0, 7.0, 7.0, 0.7424823660438065, 3.7166414660933054, 0.4219968135131791], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-25", 6, 0, 0.0, 1.8333333333333333, 1, 4, 1.0, 4.0, 4.0, 4.0, 0.7840062720501764, 1.1829000882007057, 0.43870663465307724], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-5", 6, 0, 0.0, 13.833333333333332, 3, 25, 13.0, 25.0, 25.0, 25.0, 0.7429420505200593, 3.9785610915056955, 0.42080702080237736], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-26", 6, 0, 0.0, 2.3333333333333335, 1, 5, 2.0, 5.0, 5.0, 5.0, 0.7840062720501764, 4.378772009342741, 0.44789420815366526], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-4", 6, 0, 0.0, 5.5, 2, 10, 4.0, 10.0, 10.0, 10.0, 0.7446016381236039, 1.0899979058078928, 0.4224741716306776], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-3", 6, 0, 0.0, 3.9999999999999996, 1, 11, 3.0, 11.0, 11.0, 11.0, 0.7446940548591287, 4.8880243887302965, 0.4232538475859501], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-2", 6, 0, 0.0, 8.666666666666666, 7, 11, 9.0, 11.0, 11.0, 11.0, 0.744509244323117, 702.6092722422137, 0.4224217489762998], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-1", 6, 0, 0.0, 9.5, 2, 25, 6.5, 25.0, 25.0, 25.0, 0.7424823660438065, 194.7586593939488, 0.42272189394876875], "isController": false}, {"data": ["http://localhost/Classic-Groove-main/index.php-0", 6, 0, 0.0, 21.5, 5, 49, 19.0, 49.0, 49.0, 49.0, 0.7260406582768635, 6.311732363262343, 0.3672744736205228], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 192, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
