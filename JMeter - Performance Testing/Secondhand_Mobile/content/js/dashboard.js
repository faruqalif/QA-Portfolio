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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.36083333333333334, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.11, 500, 1500, "GET Get Product"], "isController": false}, {"data": [0.35, 500, 1500, "DEL Delete Product"], "isController": false}, {"data": [0.035, 500, 1500, "GET List Product"], "isController": false}, {"data": [0.265, 500, 1500, "POST Create Order"], "isController": false}, {"data": [0.315, 500, 1500, "POST Register"], "isController": false}, {"data": [0.095, 500, 1500, "POST  Create Product"], "isController": false}, {"data": [0.715, 500, 1500, "GET Fetch Product by id"], "isController": false}, {"data": [0.585, 500, 1500, "GET Fetch Orders"], "isController": false}, {"data": [0.635, 500, 1500, "GET Fetch Order by id"], "isController": false}, {"data": [0.455, 500, 1500, "POST Login"], "isController": false}, {"data": [0.51, 500, 1500, "PUT Edit Order by id"], "isController": false}, {"data": [0.26, 500, 1500, "GET Fetch Products"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1200, 0, 0.0, 2548.3300000000004, 87, 16046, 1248.5, 6496.400000000001, 8360.800000000003, 13501.99, 3.909966504620277, 3.344217770471933, 9.75606645558278], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GET Get Product", 100, 0, 0.0, 3447.2599999999998, 526, 16046, 2631.0, 6760.4, 7818.349999999993, 15973.389999999963, 0.3428579265324035, 0.2357148244910274, 0.1175225900516344], "isController": false}, {"data": ["DEL Delete Product", 100, 0, 0.0, 2918.4500000000003, 113, 15736, 1127.5, 8962.2, 11728.35, 15729.249999999996, 0.3473573056188518, 0.1058354290557439, 0.1265276123006169], "isController": false}, {"data": ["GET List Product", 100, 0, 0.0, 4734.730000000001, 650, 12738, 3960.5, 8756.9, 10610.149999999987, 12735.99, 0.33665499596014004, 0.2321078390115809, 0.11309503770535954], "isController": false}, {"data": ["POST Create Order", 100, 0, 0.0, 2809.28, 182, 12602, 1539.5, 7262.6, 9750.949999999995, 12600.58, 0.34542791610246776, 0.23613236452317132, 0.1399927589673087], "isController": false}, {"data": ["POST Register", 100, 0, 0.0, 2269.6999999999994, 283, 15509, 1237.0, 5465.200000000003, 7930.39999999999, 15438.369999999963, 0.33907500339075003, 0.19271645700528955, 0.4540558668452461], "isController": false}, {"data": ["POST  Create Product", 100, 0, 0.0, 5366.95, 770, 14835, 4562.0, 12031.300000000005, 13716.699999999997, 14829.249999999996, 0.33623391120734875, 0.21835503022742864, 8.549180618973008], "isController": false}, {"data": ["GET Fetch Product by id", 100, 0, 0.0, 735.73, 87, 4730, 390.0, 1750.9, 2588.449999999993, 4727.539999999999, 0.34491797850471156, 0.29270871418026795, 0.0629879511527159], "isController": false}, {"data": ["GET Fetch Orders", 100, 0, 0.0, 1377.3999999999996, 146, 8219, 612.0, 3779.200000000001, 4743.499999999991, 8215.88, 0.34620164861225067, 0.4324139732178405, 0.11528785368825926], "isController": false}, {"data": ["GET Fetch Order by id", 100, 0, 0.0, 1254.9600000000007, 102, 12725, 532.5, 3552.400000000002, 6109.649999999974, 12677.879999999976, 0.34656158919282337, 0.43218666933519095, 0.11743835102530246], "isController": false}, {"data": ["POST Login", 100, 0, 0.0, 1492.8999999999999, 281, 6982, 978.0, 3560.0, 4722.499999999997, 6969.559999999994, 0.3405959748367694, 0.16663924159494284, 0.08847512627595767], "isController": false}, {"data": ["PUT Edit Order by id", 100, 0, 0.0, 1727.47, 117, 13268, 678.0, 4253.500000000001, 6990.9999999999945, 13267.75, 0.3469270932713491, 0.23512441672882442, 0.1334856198719839], "isController": false}, {"data": ["GET Fetch Products", 100, 0, 0.0, 2445.1300000000006, 380, 10677, 1755.5, 6370.6, 7519.4, 10652.439999999988, 0.3446018126055343, 0.747422486129777, 0.07908342379130914], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1200, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
