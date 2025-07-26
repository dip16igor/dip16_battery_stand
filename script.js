// Make sure to include config.js in your HTML file before this script, like so:
// <script src="config.js"></script>

//console.time("All");
am4core.useTheme(am4themes_animated);
//am4core.useTheme(am4themes_material);
let oldLength = 0

let sound1 = document.getElementById("myAudio");

// Create chart instance
let chart = am4core.create("chartdiv", am4charts.XYChart);
let AxisX = chart.xAxes.push(new am4charts.DateAxis());    // ось X - ось Времени
let AxisY = chart.yAxes.push(new am4charts.ValueAxis());    // ось Y
//let AxisX2 = chart.xAxes.push(new am4charts.DateAxis());
let AxisY2 = chart.yAxes.push(new am4charts.ValueAxis()); // добавляем еще одну ось Y

let title = chart.titles.create();

let options = { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };

let labelLog = chart.createChild(am4core.Label);
labelLog.text = "Start script";
labelLog.fontSize = 12;
labelLog.align = "center";
labelLog.isMeasured = false;
labelLog.x = 100;
labelLog.y = 100;
//labelLog.stroke = am4core.color("lightyellow"); // обводка
labelLog.fill = am4core.color("lightgrey"); // цвет шрифта

//chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

let chart2 = am4core.create("chartdivG1", am4charts.GaugeChart);
let axis = chart2.xAxes.push(new am4charts.ValueAxis());
let hand = chart2.hands.push(new am4charts.ClockHand());
let label = chart2.radarContainer.createChild(am4core.Label);

let chart3 = am4core.create("chartdivG2", am4charts.GaugeChart);
let axis2 = chart3.xAxes.push(new am4charts.ValueAxis());
let hand2 = chart3.hands.push(new am4charts.ClockHand());
let label2 = chart3.radarContainer.createChild(am4core.Label);

let chart4 = am4core.create("chartdiv4", am4charts.GaugeChart);
let axis3 = chart4.xAxes.push(new am4charts.ValueAxis());
let hand3 = chart4.hands.push(new am4charts.ClockHand());
let hand31 = chart4.hands.push(new am4charts.ClockHand());
let hand32 = chart4.hands.push(new am4charts.ClockHand());
let label4 = chart4.radarContainer.createChild(am4core.Label);
let label41 = chart4.radarContainer.createChild(am4core.Label);
let label42 = chart4.radarContainer.createChild(am4core.Label);

let chart5 = am4core.create("chartdiv5", am4charts.GaugeChart);
let axis4 = chart5.xAxes.push(new am4charts.ValueAxis());
let hand4 = chart5.hands.push(new am4charts.ClockHand());
let label6 = chart5.radarContainer.createChild(am4core.Label);

// Create chart instance
let chartC1 = am4core.create("chartdiv7", am4charts.XYChart);

var container = am4core.create("chartdiv6", am4core.Container); // контейнер с графиками
container.width = am4core.percent(100);
container.height = am4core.percent(100);
container.layout = "vertical";
//chart.paddingRight = 50;   // отступ от правого края страницы

// let data = [ { "time": new Date('2020-02-23T21:25'), "value": 21, "time1": new Date('2020-02-24T21:25'), "rssi": -70 },
//              { "time": new Date('2020-02-24T21:25'), "value": 22, "time1": new Date('2020-02-25T21:25'), "rssi": -66 },
//              { "time": new Date('2020-02-25T21:25'), "value": 24 },
//              { "time": new Date('2020-02-26T21:25'), "value": 23, "time1": new Date('2020-02-27T21:25'), "rssi": -65 },
//              { "time": new Date('2020-02-27T21:25'), "value": 53, "time1": new Date('2020-02-28T21:25'), "rssi": -67 } ]

// ];  
let data1 = []; // массив для хранения данных 
let data1_new = []; // массив для хранения данных 
let data2 = []; // массив для хранения данных 
let DATA = [];  // итоговый массив для двух графиков 

let DATA4 = [];
DATA4.push({ cell: 1, voltage: 0, qmax: 0 })
DATA4.push({ cell: 2, voltage: 0, qmax: 0 })
DATA4.push({ cell: 3, voltage: 0, qmax: 0 })
DATA4.push({ cell: 4, voltage: 0, qmax: 0 })
DATA4.push({ cell: 5, voltage: 0, qmax: 0 })

// let DATA4 = {
//     "cell1voltage": 0, "cell2voltage": 0, "cell3voltage": 0, "cell4voltage": 0, "cell5voltage": 0,
//     "cell1qmax": 0, "cell2qmax": 0, "cell3qmax": 0, "cell4qmax": 0, "cell5qmax": 0
// }

//let price1 = 100, price2 = 100;
let i;
let toggleRec = 0
//let flagData1First, flagData2First;

// for (i = 0; i < 10; i++) {
//     price1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
//     data1.push({ time: new Date(2016, 1, i), value: price1 });
// }
// // data2.push({ time: new Date(2016, 1, 2), value: price2 });
// for (i = 0; i < 10; i++) {
//     price2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
//     data2.push({ time: new Date(2016, 1, i), value: price2 });
// }

// console.log(data1)
// console.log(data2)
// console.log(DATA)
let i1 = 0, i2 = 0, k = 0, imax;
//let endData1 = 0, endData2 = 0;
let count, countEq = 0, count1 = 0, count2 = 0

let tempData3

//console.log("length1: " + data1.length + "\tlength2: " + data2.length)

//********************************************* NEW **************************************************/
let chartCount = 12;
let charts = [];
let cursorShowDisposers = [];



//console.log("charts[0].data.length = " + charts[0].data.length)
//console.log("charts[1].data.length = " + charts[1].data.length)
//console.log("charts[2].data.length = " + charts[2].data.length)

// after the charts are made, add scrollbar to the first one
// let firstChart = charts[0];
// firstChart.scrollbarX = new am4core.Scrollbar();
// firstChart.zoomOutButton.disabled = false;

// enable date axis labels for the last one
// let lastChart = charts[charts.length - 1];
// let lastDateAxis = lastChart.xAxes.getIndex(0);
// lastDateAxis.renderer.labels.template.disabled = false;
// lastDateAxis.cursorTooltipEnabled = true;


function generateData() {
    var data = [];
    var value = 10;
    let tempS = 0
    for (var i = 1; i < 3; i++) {
        value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        tempS += 1 + Math.abs(Math.random() * 10);
        data.push({ time: new Date(2020, 10, 14, 10, 15, tempS), value: value });
    }
    return data;
}

// create chart
function makeChart() {
    let chart = container.createChild(am4charts.XYChart);
    charts.push(chart);

    /* Make automatic colors more distinctive by increasing steps */
    chart.colors.step = 2;

    //chart.data = generateData();
    //chart.zoomOutButton.disabled = true;
    //chart.padding(10, 15, 10, 15);
    chart.padding(10, 15, 10, 15); // отступ справа, между, слева

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    //dateAxis.renderer.labels.template.disabled = true;
    dateAxis.tooltip.animationDuration = 0;
    //dateAxis.cursorTooltipEnabled = false;

    //dateAxis.groupData = true;     // группировать данные при увеличении количества точек
    //dateAxis.groupCount = 1000;    // работает только для оси времени DateAxis. количество групп(точек) на графике 


    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    //valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 60;
    //valueAxis.title.text = "AxisY"
    valueAxis.title.fontWeight = "bold";

    chart.xAxes.getIndex(0).renderer.labels.template.disabled = false;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.zoomOutButton.disabled = false;
    chart.scrollbarY = new am4core.Scrollbar();  // полоса прокрутки по Y
    chart.legend = new am4charts.Legend(); // легенда

    //valueAxis.title.dx = 15

    let cursor = new am4charts.XYCursor();
    //cursor.lineY.disabled = true;
    //cursor.xAxis = dateAxis;
    chart.cursor = cursor;

    let buttonContainer = chart.plotContainer.createChild(am4core.Container);   // создаем контейнер
    buttonContainer.shouldClone = false;
    buttonContainer.align = "center";
    buttonContainer.valign = "top";
    buttonContainer.zIndex = Number.MAX_SAFE_INTEGER;
    buttonContainer.marginTop = 5;
    buttonContainer.marginRight = 50;
    buttonContainer.layout = "horizontal";

    let zoomInButton = buttonContainer.createChild(am4core.Button);     // в контейнере создаем кнопку ZOOM +
    zoomInButton.label.text = "[bold]+";
    zoomInButton.events.on("hit", function (ev) {       // обработчик события нажатия на кнопку
        let diff = dateAxis.maxZoomed - dateAxis.minZoomed;
        let delta = diff * 0.2;
        dateAxis.zoomToDates(new Date(dateAxis.minZoomed + delta), new Date(dateAxis.maxZoomed - delta));
    });

    let zoomOutButton = buttonContainer.createChild(am4core.Button);    // в контейнере создаем кнопку ZOOM -
    zoomOutButton.label.text = "[bold]-";
    zoomOutButton.events.on("hit", function (ev) {
        let diff = dateAxis.maxZoomed - dateAxis.minZoomed;
        let delta = diff * 0.2;
        dateAxis.zoomToDates(new Date(dateAxis.minZoomed - delta), new Date(dateAxis.maxZoomed + delta));
    });

    //dateAxis.groupData = true;     // группировать данные при увеличении количества точек
    //dateAxis.groupCount = 1000;    // работает только для оси времени DateAxis. количество групп(точек) на графике 


    //series.tooltipText = "{time.formatDate('yyyy-mm-dd HH:mm:ss')} \n {name} = [bold]{valueY} [/]";   // подсказка, значение в точке {time} показывает только дату

    // chart.cursor.adapter.add("cursorPoint", function (point, target) {
    //     if (!chart.cursor.fitsToBounds(point)) {
    //         point.y = 0;
    //         chart.cursor.lineY.visible = false;
    //         chart.yAxes.getIndex(0).cursorTooltipEnabled = false;
    //     }
    //     else {
    //         chart.cursor.lineY.visible = true;
    //         chart.yAxes.getIndex(0).cursorTooltipEnabled = true;
    //     }
    //     return point;
    // });

    // whenever any of the charts is zoomed, we should zoom all other charts
    // dateAxis.events.on("selectionextremeschanged", function (event) {
    //     syncDateAxes(event.target);
    // })
}

// добавляем данные на графики
function addSeriesToCharts() {
    //--------------------------------------------------------------------------------------- I RSOC, ASoC, Temp, Capacity ----------------------------------------------------------
    let series00 = charts[0].series.push(new am4charts.StepLineSeries());
    series00.dataFields.dateX = "time";
    series00.dataFields.valueY = "value20";
    series00.interpolationDuration = 0;
    series00.strokeWidth = 2;
    series00.startLocation = 0.5; // метка точки в начале линии

    let bullet00 = series00.bullets.push(new am4charts.CircleBullet());
    series00.minBulletDistance = 1;
    bullet00.fill = am4core.color("white");
    bullet00.circle.radius = 3;
    bullet00.strokeWidth = 1.5;
    let bullet00hover = bullet00.states.create("hover");
    bullet00hover.properties.scale = 2;

    let series01 = charts[0].series.push(new am4charts.StepLineSeries());
    series01.dataFields.dateX = "time";
    series01.dataFields.valueY = "value19";
    series01.interpolationDuration = 0;
    series01.strokeWidth = 2;
    series01.startLocation = 0.5; // метка точки в начале линии

    let bullet01 = series01.bullets.push(new am4charts.CircleBullet());
    series01.minBulletDistance = 1;
    bullet01.fill = am4core.color("white");
    bullet01.circle.radius = 3;
    bullet01.strokeWidth = 1.5;
    let bullet01hover = bullet01.states.create("hover");
    bullet01hover.properties.scale = 2;

    let series02 = charts[0].series.push(new am4charts.StepLineSeries());

    series02.dataFields.dateX = "time";
    series02.dataFields.valueY = "value21";
    series02.interpolationDuration = 0;
    series02.strokeWidth = 2;
    series02.startLocation = 0.5; // метка точки в начале линии

    let bullet02 = series02.bullets.push(new am4charts.CircleBullet());
    series02.minBulletDistance = 1;
    bullet02.fill = am4core.color("white");
    bullet02.circle.radius = 3;
    bullet02.strokeWidth = 1.5;
    let bullet02hover = bullet02.states.create("hover");
    bullet02hover.properties.scale = 2;

    let valueAxis03 = charts[0].yAxes.push(new am4charts.ValueAxis());
    //valueAxis.tooltip.disabled = true;
    valueAxis03.renderer.minWidth = 60;
    valueAxis03.title.text = "Capacity, mAh"
    valueAxis03.title.fontWeight = "bold";
    //valueAxis13.title.dx = 15
    valueAxis03.renderer.opposite = true;   // перенос оси на правую сторону графика
    //valueAxis13.dx = 0
    valueAxis03.syncWithAxis = charts[0].yAxes.getIndex(0); //  синхронизация осей

    let series03 = charts[0].series.push(new am4charts.StepLineSeries());
    series03.dataFields.dateX = "time";
    series03.dataFields.valueY = "value24";
    series03.interpolationDuration = 0;
    series03.strokeWidth = 2;
    series03.yAxis = valueAxis03;
    series03.startLocation = 0.5; // метка точки в начале линии

    let bullet03 = series03.bullets.push(new am4charts.CircleBullet());
    series03.minBulletDistance = 1;
    bullet03.fill = am4core.color("white");
    bullet03.circle.radius = 3;
    bullet03.strokeWidth = 1.5;
    let bullet03hover = bullet03.states.create("hover");
    bullet03hover.properties.scale = 2;

    let series04 = charts[0].series.push(new am4charts.StepLineSeries());
    series04.dataFields.dateX = "time";
    series04.dataFields.valueY = "value25";
    series04.interpolationDuration = 0;
    series04.strokeWidth = 2;
    series04.yAxis = valueAxis03;
    series04.startLocation = 0.5; // метка точки в начале линии

    let bullet04 = series04.bullets.push(new am4charts.CircleBullet());
    series04.minBulletDistance = 1;
    bullet04.fill = am4core.color("white");
    bullet04.circle.radius = 3;
    bullet04.strokeWidth = 1.5;
    let bullet04hover = bullet04.states.create("hover");
    bullet04hover.properties.scale = 2;

    //charts[0].yAxes.getIndex(0).min = 0
    //charts[0].yAxes.getIndex(0).max = 100
    //charts[0].scrollbarY = new am4core.Scrollbar();  // полоса прокрутки по Y
    //charts[0].legend = new am4charts.Legend(); // легенда

    //charts[0].xAxes.getIndex(0).renderer.labels.template.disabled = false;

    charts[0].series.getIndex(0).name = "RSoC"; // todo
    charts[0].series.getIndex(0).tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY} % [/]";
    charts[0].series.getIndex(1).name = "ASoC";
    charts[0].series.getIndex(1).tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY} % [/]";
    charts[0].series.getIndex(2).name = "Temp";
    charts[0].series.getIndex(2).tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY} °C [/]";
    charts[0].series.getIndex(3).name = "Rem Cap";
    charts[0].series.getIndex(3).tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY} mAh [/]";
    charts[0].series.getIndex(4).name = "Full Cap";
    charts[0].series.getIndex(4).tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY} mAh [/]";

    charts[0].yAxes.getIndex(0).title.text = "RSoC, ASoC, % / Temp, °C";

    //charts[0].xAxes.getIndex(0).groupData = true;     // группировать данные при увеличении количества точек
    //charts[0].xAxes.getIndex(0).groupCount = 1000;    // работает только для оси времени DateAxis. количество групп(точек) на графике 


    //series111.groupFields.valueY = "average";  // показывать максимальное значение группы average high low open close sum
    //series111.groupFields.valueX = "close";    // время точки - время последней точки в группе open close   

    charts[0].xAxes.getIndex(0).tooltipDateFormat = "dd.MM HH:mm:ss";
    //-------------------------------------------------------------------------------------------------------- II Time ---------------------------------------------------
    let series11 = charts[1].series.push(new am4charts.StepLineSeries());
    series11.dataFields.dateX = "time";
    series11.dataFields.valueY = "value26";
    series11.interpolationDuration = 0;
    series11.strokeWidth = 2;
    series11.startLocation = 0.5; // метка точки в начале линии
    series11.name = "TimeToEmpty"
    series11.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY} min [/]";

    let bullet11 = series11.bullets.push(new am4charts.CircleBullet());
    series11.minBulletDistance = 1;
    bullet11.fill = am4core.color("white");
    bullet11.circle.radius = 3;
    bullet11.strokeWidth = 1.5;
    let bullet11hover = bullet11.states.create("hover");
    bullet11hover.properties.scale = 2;

    let series12 = charts[1].series.push(new am4charts.StepLineSeries());
    series12.dataFields.dateX = "time";
    series12.dataFields.valueY = "value27";
    series12.interpolationDuration = 0;
    series12.strokeWidth = 2;
    series12.startLocation = 0.5; // метка точки в начале линии
    series12.name = "TimeToFull"
    series12.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY} min [/]";

    let bullet12 = series12.bullets.push(new am4charts.CircleBullet());
    series12.minBulletDistance = 1;
    bullet12.fill = am4core.color("white");
    bullet12.circle.radius = 3;
    bullet12.strokeWidth = 1.5;
    let bullet12hover = bullet12.states.create("hover");
    bullet12hover.properties.scale = 2;

    // charts[1].yAxes.getIndex(0).min = -1
    // charts[1].yAxes.getIndex(0).max = 200

    charts[1].yAxes.getIndex(0).title.text = "TimeToEmpty/TimeToFull, min";

    //charts[1].xAxes.getIndex(0).groupData = true;     // группировать данные при увеличении количества точек
    //charts[1].xAxes.getIndex(0).groupCount = 1000;    // работает только для оси времени DateAxis. количество групп(точек) на графике 

    charts[1].xAxes.getIndex(0).tooltipDateFormat = "dd.MM HH:mm:ss";
    //------------------------------------------------------------------------------------------  III SafetyStatus --------------------------------------------------------------
    let jj = 0
    let HexString1
    for (jj = data1.length - 1; jj >= 0; jj--) {
        // console.log("jj: " + jj)

        if ("value30" in data1[jj]) {
            let temInt = parseInt(data1[jj].value30)
            console.log("value30 = " + data1[jj].value30 + " [" + jj + "]")
            HexString1 = temInt.toString(16).toUpperCase().padStart(4, '0')
            console.log("Hex: 0x" + HexString1)
            break
        }
    }

    //let title2 = charts[2].titles.create();
    //title2.text = "SafetyStatus: 0x" + HexString1

    charts[2].yAxes.getIndex(0).title.text = "SafetyStatus";

    let series21 = charts[2].series.push(new am4charts.StepLineSeries());
    series21.dataFields.dateX = "time";
    series21.dataFields.valueY = "value30";
    series21.interpolationDuration = 0;
    series21.strokeWidth = 2;
    series21.startLocation = 0.5; // метка точки в начале линии
    series21.name = "SafetyStatus: 0x" + HexString1

    //let hexString = 
    series21.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY}[/]";

    let bullet21 = series21.bullets.push(new am4charts.CircleBullet());
    bullet21.fill = am4core.color("white");
    bullet21.circle.radius = 3;
    bullet21.strokeWidth = 1.5;
    let bullet21hover = bullet21.states.create("hover");
    bullet21hover.properties.scale = 2;

    charts[2].xAxes.getIndex(0).tooltipDateFormat = "dd.MM HH:mm:ss";
    //-----------------------------------------------------------------------------------------  IV OperationStatus --------------------------------------------------------------
    let HexString2
    for (jj = data1.length - 1; jj >= 0; jj--) {
        // console.log("jj: " + jj)

        if ("value32" in data1[jj]) {
            let temInt = parseInt(data1[jj].value32)
            console.log("value32 = " + data1[jj].value32 + " [" + jj + "]")
            HexString2 = temInt.toString(16).toUpperCase().padStart(4, '0')
            console.log("Hex: 0x" + HexString2)
            break
        }
    }

    //let title3 = charts[3].titles.create();
    //title3.text = "OperationStatus: 0x" + HexString2

    charts[3].yAxes.getIndex(0).title.text = "OperationStatus";

    let series31 = charts[3].series.push(new am4charts.StepLineSeries());
    series31.dataFields.dateX = "time";
    series31.dataFields.valueY = "value32";
    series31.interpolationDuration = 0;
    series31.strokeWidth = 2;
    series31.startLocation = 0.5; // метка точки в начале линии
    series31.name = "OperationStatus: 0x" + HexString2
    series31.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY}[/]";

    let bullet31 = series31.bullets.push(new am4charts.CircleBullet());
    bullet31.fill = am4core.color("white");
    bullet31.circle.radius = 3;
    bullet31.strokeWidth = 1.5;
    let bullet31hover = bullet31.states.create("hover");
    bullet31hover.properties.scale = 2;

    charts[3].xAxes.getIndex(0).tooltipDateFormat = "dd.MM HH:mm:ss";
    //-----------------------------------------------------------------------------------------  V BatteryStatus --------------------------------------------------------------
    //let jj3 = 0
    let HexString3
    for (jj = data1.length - 1; jj >= 0; jj--) {
        // console.log("jj: " + jj)

        if ("value34" in data1[jj]) {
            let temInt = parseInt(data1[jj].value34)
            console.log("value34 = " + data1[jj].value34 + " [" + jj + "]")
            HexString3 = temInt.toString(16).toUpperCase().padStart(4, '0')
            console.log("Hex: 0x" + HexString3)
            break
        }
    }

    //let title4 = charts[4].titles.create();
    //title4.text = "BatteryStatus: 0x" + HexString3

    charts[4].yAxes.getIndex(0).title.text = "BatteryStatus";

    let series41 = charts[4].series.push(new am4charts.StepLineSeries());
    series41.dataFields.dateX = "time";
    series41.dataFields.valueY = "value34";
    series41.interpolationDuration = 0;
    series41.strokeWidth = 2;
    series41.startLocation = 0.5; // метка точки в начале линии
    series41.name = "BatteryStatus: 0x" + HexString3
    series41.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY}[/]";

    let bullet41 = series41.bullets.push(new am4charts.CircleBullet());
    bullet41.fill = am4core.color("white");
    bullet41.circle.radius = 3;
    bullet41.strokeWidth = 1.5;
    let bullet41hover = bullet41.states.create("hover");
    bullet41hover.properties.scale = 2;

    charts[4].xAxes.getIndex(0).tooltipDateFormat = "dd.MM HH:mm:ss";
    //-----------------------------------------------------------------------------------------  VI GaugingStatus Bits FC FD REST RDIS --------------------------------------------------------------
    // let HexString4
    // for (jj = data1.length - 1; jj >= 0; jj--) {
    //     console.log("jj: " + jj)

    //     if ("value36" in data1[jj]) {
    //         let temInt = parseInt(data1[jj].value36)
    //         console.log("value36 = " + data1[jj].value36 + " [" + jj + "]")
    //         HexString4 = temInt.toString(16).toUpperCase().padStart(4, '0')
    //         console.log("Hex: 0x" + HexString4)
    //         break
    //     }
    // }

    charts[5].yAxes.getIndex(0).title.text = "GaugingStatus BITS"

    let series51 = charts[5].series.push(new am4charts.StepLineSeries())
    series51.dataFields.dateX = "time"
    series51.dataFields.valueY = "value51"
    series51.interpolationDuration = 0
    series51.strokeWidth = 2
    series51.startLocation = 0.5; // метка точки в начале линии
    series51.name = "FD1"
    series51.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY}[/]";

    let bullet51 = series51.bullets.push(new am4charts.CircleBullet());
    bullet51.fill = am4core.color("white");
    bullet51.circle.radius = 3;
    bullet51.strokeWidth = 1.5;
    let bullet51hover = bullet51.states.create("hover");
    bullet51hover.properties.scale = 2;

    let series52 = charts[5].series.push(new am4charts.StepLineSeries())
    series52.dataFields.dateX = "time"
    series52.dataFields.valueY = "value52"
    series52.interpolationDuration = 0
    series52.strokeWidth = 2
    series52.startLocation = 0.5; // метка точки в начале линии
    series52.name = "FC1"
    series52.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY}[/]";

    let bullet52 = series52.bullets.push(new am4charts.CircleBullet());
    bullet52.fill = am4core.color("white");
    bullet52.circle.radius = 3;
    bullet52.strokeWidth = 1.5;
    let bullet52hover = bullet52.states.create("hover");
    bullet52hover.properties.scale = 2;

    let series53 = charts[5].series.push(new am4charts.StepLineSeries())
    series53.dataFields.dateX = "time"
    series53.dataFields.valueY = "value53"
    series53.interpolationDuration = 0
    series53.strokeWidth = 2
    series53.startLocation = 0.5; // метка точки в начале линии
    series53.name = "REST1"
    series53.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY}[/]";

    let bullet53 = series53.bullets.push(new am4charts.CircleBullet());
    bullet53.fill = am4core.color("white");
    bullet53.circle.radius = 3;
    bullet53.strokeWidth = 1.5;
    let bullet53hover = bullet53.states.create("hover");
    bullet53hover.properties.scale = 2;

    let series54 = charts[5].series.push(new am4charts.StepLineSeries())
    series54.dataFields.dateX = "time"
    series54.dataFields.valueY = "value54"
    series54.interpolationDuration = 0
    series54.strokeWidth = 2
    series54.startLocation = 0.5; // метка точки в начале линии
    series54.name = "RDIS1"
    series54.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY}[/]";

    let bullet54 = series54.bullets.push(new am4charts.CircleBullet());
    bullet54.fill = am4core.color("white");
    bullet54.circle.radius = 3;
    bullet54.strokeWidth = 1.5;
    let bullet54hover = bullet54.states.create("hover");
    bullet54hover.properties.scale = 2;

    charts[5].xAxes.getIndex(0).tooltipDateFormat = "dd.MM HH:mm:ss";
    /* //-----------------------------------------------------------------------------------------  VI GaugingStatus --------------------------------------------------------------
     let HexString4
     for (jj = data1.length - 1; jj >= 0; jj--) {
         console.log("jj: " + jj)
 
         if ("value36" in data1[jj]) {
             let temInt = parseInt(data1[jj].value36)
             console.log("value36 = " + data1[jj].value36 + " [" + jj + "]")
             HexString4 = temInt.toString(16).toUpperCase().padStart(4, '0')
             console.log("Hex: 0x" + HexString4)
             break
         }
     }
 
     charts[5].yAxes.getIndex(0).title.text = "GaugingStatus";
 
     let series51 = charts[5].series.push(new am4charts.StepLineSeries());
     series51.dataFields.dateX = "time";
     series51.dataFields.valueY = "value36";
     series51.interpolationDuration = 0;
     series51.strokeWidth = 2;
     series51.startLocation = 0.5; // метка точки в начале линии
     series51.name = "GaugingStatus: 0x" + HexString4
     series51.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY}[/]";
 
     let bullet51 = series51.bullets.push(new am4charts.CircleBullet());
     bullet51.fill = am4core.color("white");
     bullet51.circle.radius = 3;
     bullet51.strokeWidth = 1.5;
     let bullet51hover = bullet51.states.create("hover");
     bullet51hover.properties.scale = 2;
 
     charts[5].xAxes.getIndex(0).tooltipDateFormat = "dd.MM HH:mm:ss";*/
    //-----------------------------------------------------------------------------------------  VII Status --------------------------------------------------------------
    charts[6].yAxes.getIndex(0).title.text = "Status";

    let series61 = charts[6].series.push(new am4charts.StepLineSeries());
    series61.dataFields.dateX = "time";
    series61.dataFields.valueY = "value49";
    series61.interpolationDuration = 0;
    series61.strokeWidth = 2;
    series61.startLocation = 0.5; // метка точки в начале линии
    series61.name = "Status"
    series61.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY}[/]";

    let bullet61 = series61.bullets.push(new am4charts.CircleBullet());
    bullet61.fill = am4core.color("white");
    bullet61.circle.radius = 3;
    bullet61.strokeWidth = 1.5;
    let bullet61hover = bullet61.states.create("hover");
    bullet61hover.properties.scale = 2;

    charts[6].xAxes.getIndex(0).tooltipDateFormat = "dd.MM HH:mm:ss";
    //-----------------------------------------------------------------------------------------  VIII UpdateStatus --------------------------------------------------------------
    let HexString5
    for (jj = data1.length - 1; jj >= 0; jj--) {
        // console.log("jj: " + jj)

        if ("value31" in data1[jj]) {
            let temInt = parseInt(data1[jj].value31)
            console.log("value31 = " + data1[jj].value31 + " [" + jj + "]")
            HexString5 = temInt.toString(16).toUpperCase().padStart(2, '0')
            console.log("Hex: 0x" + HexString5)
            break
        }
    }

    charts[7].yAxes.getIndex(0).title.text = "UpdateStatus";

    let series71 = charts[7].series.push(new am4charts.StepLineSeries());
    series71.dataFields.dateX = "time";
    series71.dataFields.valueY = "value31";
    series71.interpolationDuration = 0;
    series71.strokeWidth = 2;
    series71.startLocation = 0.5; // метка точки в начале линии
    series71.name = "UpdateStatus: 0x" + HexString5
    series71.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY}[/]";

    let bullet71 = series71.bullets.push(new am4charts.CircleBullet());
    bullet71.fill = am4core.color("white");
    bullet71.circle.radius = 3;
    bullet71.strokeWidth = 1.5;
    let bullet71hover = bullet71.states.create("hover");
    bullet71hover.properties.scale = 2;

    charts[7].xAxes.getIndex(0).tooltipDateFormat = "dd.MM HH:mm:ss";
    //-----------------------------------------------------------------------------------------  IX ChargingStatus --------------------------------------------------------------
    let HexString6
    for (jj = data1.length - 1; jj >= 0; jj--) {
        // console.log("jj: " + jj)

        if ("value35" in data1[jj]) {
            let temInt = parseInt(data1[jj].value35)
            console.log("value35 = " + data1[jj].value35 + " [" + jj + "]")
            HexString6 = temInt.toString(16).toUpperCase().padStart(4, '0')
            console.log("Hex: 0x" + HexString6)
            break
        }
    }

    charts[8].yAxes.getIndex(0).title.text = "ChargingStatus";

    let series81 = charts[8].series.push(new am4charts.StepLineSeries());
    series81.dataFields.dateX = "time";
    series81.dataFields.valueY = "value35";
    series81.interpolationDuration = 0;
    series81.strokeWidth = 2;
    series81.startLocation = 0.5; // метка точки в начале линии
    series81.name = "ChargingStatus: 0x" + HexString6
    series81.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY}[/]";

    let bullet81 = series81.bullets.push(new am4charts.CircleBullet());
    bullet81.fill = am4core.color("white");
    bullet81.circle.radius = 3;
    bullet81.strokeWidth = 1.5;
    let bullet81hover = bullet81.states.create("hover");
    bullet81hover.properties.scale = 2;

    charts[8].xAxes.getIndex(0).tooltipDateFormat = "dd.MM HH:mm:ss";
    //-----------------------------------------------------------------------------------------  X MaxError --------------------------------------------------------------
    let HexString7
    for (jj = data1.length - 1; jj >= 0; jj--) {
        // console.log("jj: " + jj)

        if ("value55" in data1[jj]) {
            let temInt = parseInt(data1[jj].value55)
            console.log("value55 = " + data1[jj].value55 + " [" + jj + "]")
            HexString7 = temInt.toString(16).toUpperCase().padStart(4, '0')
            // console.log("Hex: 0x" + HexString7)
            break
        }
    }
    charts[9].yAxes.getIndex(0).title.text = "MaxError";

    let series91 = charts[9].series.push(new am4charts.StepLineSeries());
    series91.dataFields.dateX = "time";
    series91.dataFields.valueY = "value55";
    series91.interpolationDuration = 0;
    series91.strokeWidth = 2;
    series91.startLocation = 0.5; // метка точки в начале линии
    series91.name = "Max Error"
    series91.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY} %[/]";

    let bullet91 = series91.bullets.push(new am4charts.CircleBullet());
    bullet91.fill = am4core.color("white");
    bullet91.circle.radius = 3;
    bullet91.strokeWidth = 1.5;
    let bullet91hover = bullet91.states.create("hover");
    bullet91hover.properties.scale = 2;

    charts[9].xAxes.getIndex(0).tooltipDateFormat = "dd.MM HH:mm:ss";
    // //-----------------------------------------------------------------------------------------  X BatteryMode --------------------------------------------------------------
    // let HexString7
    // for (jj = data1.length - 1; jj >= 0; jj--) {
    //     console.log("jj: " + jj)

    //     if ("value33" in data1[jj]) {
    //         let temInt = parseInt(data1[jj].value33)
    //         console.log("value33 = " + data1[jj].value33 + " [" + jj + "]")
    //         HexString7 = temInt.toString(16).toUpperCase().padStart(4, '0')
    //         console.log("Hex: 0x" + HexString7)
    //         break
    //     }
    // }
    // charts[9].yAxes.getIndex(0).title.text = "BatteryMode";

    // let series91 = charts[9].series.push(new am4charts.StepLineSeries());
    // series91.dataFields.dateX = "time";
    // series91.dataFields.valueY = "value33";
    // series91.interpolationDuration = 0;
    // series91.strokeWidth = 2;
    // series91.startLocation = 0.5; // метка точки в начале линии
    // series91.name = "BatteryMode: 0x" + HexString7
    // series91.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY}[/]";

    // let bullet91 = series91.bullets.push(new am4charts.CircleBullet());
    // bullet91.fill = am4core.color("white");
    // bullet91.circle.radius = 3;
    // bullet91.strokeWidth = 1.5;
    // let bullet91hover = bullet91.states.create("hover");
    // bullet91hover.properties.scale = 2;

    // charts[9].xAxes.getIndex(0).tooltipDateFormat = "dd.MM HH:mm:ss";
    //-----------------------------------------------------------------------------------------  XI Learning Stage --------------------------------------------------------------
    charts[10].yAxes.getIndex(0).title.text = "Learning Stage";

    let series101 = charts[10].series.push(new am4charts.StepLineSeries());
    series101.dataFields.dateX = "time";
    series101.dataFields.valueY = "value50";
    series101.interpolationDuration = 0;
    series101.strokeWidth = 2;
    series101.startLocation = 0.5; // метка точки в начале линии
    series101.name = "Learning Stage"
    series101.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY}[/]";

    let bullet101 = series101.bullets.push(new am4charts.CircleBullet());
    bullet101.fill = am4core.color("white");
    bullet101.circle.radius = 3;
    bullet101.strokeWidth = 1.5;
    let bullet101hover = bullet101.states.create("hover");
    bullet101hover.properties.scale = 2;

    charts[10].xAxes.getIndex(0).tooltipDateFormat = "dd.MM HH:mm:ss";
    //-----------------------------------------------------------------------------------------  XII CellVoltage --------------------------------------------------------------
    charts[11].yAxes.getIndex(0).title.text = "CellVoltage";

    let series111 = charts[11].series.push(new am4charts.StepLineSeries());
    series111.dataFields.dateX = "time";
    series111.dataFields.valueY = "value38";
    series111.interpolationDuration = 0;
    series111.strokeWidth = 2;
    series111.startLocation = 0.5; // метка точки в начале линии
    series111.name = "Cell1Voltage"
    series111.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY} mV[/]";

    let bullet111 = series111.bullets.push(new am4charts.CircleBullet());
    series111.minBulletDistance = 10;
    bullet111.fill = am4core.color("white");
    bullet111.circle.radius = 3;
    bullet111.strokeWidth = 1.5;
    let bullet111hover = bullet111.states.create("hover");
    bullet111hover.properties.scale = 2;

    let series112 = charts[11].series.push(new am4charts.StepLineSeries());
    series112.dataFields.dateX = "time";
    series112.dataFields.valueY = "value39";
    series112.interpolationDuration = 0;
    series112.strokeWidth = 2;
    series112.startLocation = 0.5; // метка точки в начале линии
    series112.name = "Cell2Voltage"
    series112.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY} mV[/]";

    let bullet112 = series112.bullets.push(new am4charts.CircleBullet());
    series112.minBulletDistance = 10;
    bullet112.fill = am4core.color("white");
    bullet112.circle.radius = 3;
    bullet112.strokeWidth = 1.5;
    let bullet112hover = bullet112.states.create("hover");
    bullet112hover.properties.scale = 2;

    let series113 = charts[11].series.push(new am4charts.StepLineSeries());
    series113.dataFields.dateX = "time";
    series113.dataFields.valueY = "value40";
    series113.interpolationDuration = 0;
    series113.strokeWidth = 2;
    series113.startLocation = 0.5; // метка точки в начале линии
    series113.name = "Cell3Voltage"
    series113.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY} mV[/]";

    let bullet113 = series113.bullets.push(new am4charts.CircleBullet());
    series113.minBulletDistance = 10;
    bullet113.fill = am4core.color("white");
    bullet113.circle.radius = 3;
    bullet113.strokeWidth = 1.5;
    let bullet113hover = bullet113.states.create("hover");
    bullet113hover.properties.scale = 2;

    let series114 = charts[11].series.push(new am4charts.StepLineSeries());
    series114.dataFields.dateX = "time";
    series114.dataFields.valueY = "value41";
    series114.interpolationDuration = 0;
    series114.strokeWidth = 2;
    series114.startLocation = 0.5; // метка точки в начале линии
    series114.name = "Cell4Voltage"
    series114.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY} mV[/]";

    let bullet114 = series114.bullets.push(new am4charts.CircleBullet());
    series114.minBulletDistance = 10;
    bullet114.fill = am4core.color("white");
    bullet114.circle.radius = 3;
    bullet114.strokeWidth = 1.5;
    let bullet114hover = bullet114.states.create("hover");
    bullet114hover.properties.scale = 2;

    let series115 = charts[11].series.push(new am4charts.StepLineSeries());
    series115.dataFields.dateX = "time";
    series115.dataFields.valueY = "value42";
    series115.interpolationDuration = 0;
    series115.strokeWidth = 2;
    series115.startLocation = 0.5; // метка точки в начале линии
    series115.name = "Cell5Voltage"
    series115.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY} mV[/]";

    let bullet115 = series115.bullets.push(new am4charts.CircleBullet());
    series115.minBulletDistance = 10;
    bullet115.fill = am4core.color("white");
    bullet115.circle.radius = 3;
    bullet115.strokeWidth = 1.5;
    let bullet115hover = bullet115.states.create("hover");
    bullet115hover.properties.scale = 2;

    //charts[11].xAxes.getIndex(0).groupData = true;     // группировать данные при увеличении количества точек
    //charts[11].xAxes.getIndex(0).groupCount = 1000;    // работает только для оси времени DateAxis. количество групп(точек) на графике 

    series111.groupFields.valueY = "average";  // показывать максимальное значение группы average high low open close sum
    series111.groupFields.valueX = "close";    // время точки - время последней точки в группе open close   

    series112.groupFields.valueY = "average";  // показывать максимальное значение группы average high low open close sum
    series112.groupFields.valueX = "close";    // время точки - время последней точки в группе open close   

    series113.groupFields.valueY = "average";  // показывать максимальное значение группы average high low open close sum
    series113.groupFields.valueX = "close";    // время точки - время последней точки в группе open close   

    series114.groupFields.valueY = "average";  // показывать максимальное значение группы average high low open close sum
    series114.groupFields.valueX = "close";    // время точки - время последней точки в группе open close   

    series115.groupFields.valueY = "average";  // показывать максимальное значение группы average high low open close sum
    series115.groupFields.valueX = "close";    // время точки - время последней точки в группе open close   

    charts[11].xAxes.getIndex(0).tooltipDateFormat = "dd.MM HH:mm:ss";

    series115.events.on('ready', () => {
        console.log('series115 ready!');
        document.getElementById("p1").innerHTML = "Charts ready";
        labelLog.text = "Charts ready";
        flagSeries115ready = 1
        console.timeEnd("All");
        // playAudio()
        playAudio1()
    });
}

//********************************************************************************************************** */

function sort() { // сортировка и слияние двух массивов
    console.time("sort")

    let i1 = 0, i2 = 0
    let endData1 = 0, endData2 = 0
    let count, countEq = 0, count1 = 0, count2 = 0

    DATA.length = 0 // очистка массива

    console.log("-------------SORTING----------------")
    console.log("length1: " + data1.length + "\tlength2: " + data2.length)

    for (count = 0; ; count++) {

        if ((i1 >= data1.length)) {    // вышли за пределы data1
            DATA.push({ time: data2[i2].time, value2: data2[i2].value }) // собираем очередной элемент DATA
            i2++
            //console.log("i2 += " + i2)
        }

        else if ((i2 >= data2.length)) {   // вышли за пределы data2
            DATA.push({ time: data1[i1].time, value1: data1[i1].value }) // собираем очередной элемент DATA
            i1++
            //console.log("i1 += " + i1)
        }
        else if (data1[i1].time.getTime() < data2[i2].time.getTime()) {  //пока текущий элемент data1 старше очередного элемента data2
            DATA.push({ time: data1[i1].time, value1: data1[i1].value }) // собираем очередной элемент DATA

            if (i1 < data1.length) {
                i1++
                //console.log("i1 ++= " + i1)
            }
            else {
                i2++    // data1 кончился, перебираем data2 до конца
                //console.log("i2 ++= " + i2)
            }
            count1++
        }

        else if (data1[i1].time.getTime() == data2[i2].time.getTime()) {
            DATA.push({ time: data1[i1].time, value1: data1[i1].value, value2: data2[i2].value }) // собираем очередной элемент DATA
            //console.log("d1==d2")
            if (i1 < data1.length) {
                i1++
                //console.log("i1 ++= " + i1)
            }
            if (i2 < data2.length) {
                i2++
                //console.log("i2 ++= " + i2)
            }
            countEq++
        }

        else if (data1[i1].time.getTime() > data2[i2].time.getTime()) { //пока текущий элемент data1 младше очередного элемента data2
            DATA.push({ time: data2[i2].time, value2: data2[i2].value }) // собираем очередной элемент DATA
            //console.log("d1>d2")
            if (i2 < data2.length) {
                i2++
                //console.log("i2 ++= " + i2)
            }
            else {
                i1++    // data2 кончился, перебираем data1 до конца
                //console.log("i1 ++= " + i1)
            }
            count2++
        }

        //console.log("i1: " + i1 + " end " + endData1 + "\ti2: " + i2 + " end " + endData2)

        //console.log(count)

        //if (i1 > 20)
        //    break

        if (endData1 && endData2) {
            console.log("Sorting OK")
            break
        }

        if (i1 >= data1.length - 1)
            endData1 = 1
        if (i2 >= data2.length - 1)
            endData2 = 1

        //count++
        //if (count > 50)
        //    break
    }
    console.log("count: " + count)
    console.log("Eq: " + countEq + " 1: " + count1 + " 2: " + count2)
    console.log("DATA.length: " + DATA.length)
    //console.log("--------------------------------")
    // console.log(DATA[DATA.length - 5])
    // console.log(DATA[DATA.length - 4])
    // console.log(DATA[DATA.length - 3])
    // console.log(DATA[DATA.length - 2])
    console.log(DATA[DATA.length - 1])
    //console.log("--------------------------------")
    console.timeEnd("sort");
}

//let removedItem = data.splice(10, 1); // удаление элементов массива 

let flagData1ready = 0  // флаг готовности данных 1
let flagData1_new_ready = 0  // флаг готовности данных 1

let flagSeries1ready = 0
let flagSeries2ready = 0
let flagSeries3ready = 0
let flagSeries4ready = 0
let flagSeries5ready = 0
let flagSeries6ready = 0
let flagSeries115ready = 0
let flagSeriesC11ready = 0

function makeCharts() {


    // ГРАФИКИ X-Y
    chart.data = data1; // массив данных для графика chart

    AxisX.renderer.minGridDistance = 60; // минимальное расстояние между линиями сетки по оси X
    //AxisX.renderer.grid.template.location = 0.5
    //AxisX.startLocation = 50;
    //AxisX.endLocation = 0.5;
    //AxisX.dateFormats.setKey("second", "ss");
    //AxisX.interpolationDuration = 500;
    //AxisX.rangeChangeDuration = 500;
    //AxisX.baseInterval = {
    //    "timeUnit": "minute",
    //    "count": 1
    //};

    AxisX.title.text = "Дата";          // подпись оси X
    AxisX.title.fontWeight = "bold";    // жирный шрифт



    //valueAxis.tooltip.disabled = true;    // выключение подсказок 
    //valueAxis.renderer.minWidth = 35;
    AxisY.title.text = "Напряжение, mV";
    //AxisY.title.dx = 5 // смещение подписи
    AxisY.title.fontWeight = "bold";    // жирный шрифт

    //AxisY.numberFormatter = new am4core.NumberFormatter();
    //AxisY.numberFormatter.numberFormat = "#.00";

    // AxisY.adapter.add("getTooltipText", function (text, target, key) {
    //     return ">>> " + text + " <<<";
    // });

    //AxisY.dx = 20
    //AxisY.renderer.opposite = true;   // перенос оси на правую сторону графика

    //AxisX.baseInterval.timeUnit = "sec" // задаем типичный интервал времени между точками
    //AxisX.baseInterval.count = 5        // 5 сек


    // title.text = "data1: " + data1.length + "\tdata2: " + data2.length + "\tсуммарно: " + DATA.length + " точек";

    //let tempDate = new Date()
    title.text = "Tочек: " + data1.length + ". Обновлено " + new Date().toLocaleString('en-US', options) + " Последняя точка " + data1[data1.length - 1].time.toLocaleString('en-US', options)

    //title.text = "Tочек: " + DATA.length + ". Обновлено " + new Date().toLocaleString() + " Последняя точка " + DATA[DATA.length - 1].time.toLocaleString()
    title.fontSize = 20;
    title.marginBottom = 30;
    title.dy = 30

    /////////
    // let series00 = charts[0].series.push(new am4charts.StepLineSeries());
    // series00.dataFields.dateX = "time";
    // series00.dataFields.valueY = "value20";
    // series00.interpolationDuration = 0;
    // series00.strokeWidth = 2;
    // series00.startLocation = 0.5; // метка точки в начале линии

    // let bullet00 = series00.bullets.push(new am4charts.CircleBullet());
    // series00.minBulletDistance = 1;
    // bullet00.fill = am4core.color("white");
    // bullet00.circle.radius = 3;
    // bullet00.strokeWidth = 1.5;
    // let bullet00hover = bullet00.states.create("hover");
    // bullet00hover.properties.scale = 2;

    //////////


    let series = chart.series.push(new am4charts.StepLineSeries()); // новая переменная - линейный график

    //series.data = data;
    series.dataFields.dateX = "time";   // назначаем данные 
    series.dataFields.valueY = "value22";

    //AxisX.groupData = true;     // группировать данные при увеличении количества точек
    //AxisX.groupCount = 1000;    // работает только для оси времени DateAxis. количество групп(точек) на графике 
    //AxisX.baseValue = 1
    //AxisX.baseDuration = 1 // длительность базового интервала в мс
    //AxisX.baseInterval = { timeUnit: "hour", count: 1 }
    //series.connect = false;     // в серии могут быть разрывы
    //series.autoGapCount = 20     // коэффициент, показывающий что в данных есть разрыв. Если интервал > baseInterval.count x autoGapCount ??

    series.groupFields.valueY = "average";  // показывать максимальное значение группы average high low open close sum
    series.groupFields.valueX = "close";    // время точки - время последней точки в группе open close   
    series.strokeWidth = 1.5                // толщина линии графика
    //series.stroke = am4core.color("black");     // red Цвет графика
    //series.tensionX = 0.8;      // сглаживание между точками
    //series.tensionY = 0.8;      // сглаживание между точками

    series.startLocation = 0.5; // метка точки в начале линии
    //series.hiddenState.transitionDuration = 15000;
    //series.hiddenState.transitionEasing = am4core.ease.elasticInOut;

    //bullet.fillOpacity = 1;
    //bullet.fill = chart.colors.getIndex(0);
    //bullet.isMeasured = false;
    //series.dataFields.valueX = "x";         // назначаем значение (вектор) для оси X
    //series.dataFields.valueY = "value";     // назначаем значение (вектор) для оси Y
    series.name = "Напряжение";

    AxisY.baseValue = 0;   // уровень от которого идет заливка цветом под графиком
    series.fillOpacity = 0.2;  // заливка цветом под графиком до оси Y=0

    //series.tooltip.getFillFromObject = false; // заливка подсказки цветом отличается от цвета подсказки
    //series.tooltip.background.fill = am4core.color("rgba(63, 125, 238, 1)") // заливка
    //series.tooltip.stroke = am4core.color("black")          // обводка
    //series.tooltip.label.fill = am4core.color("black");   // цвет текста
    series.tooltipText = "{time.formatDate('MM.dd HH:mm:ss')} \n {name} = [bold]{valueY.formatNumber('#####.#')} mV[/]";   // подсказка, значение в точке {time} показывает только дату

    //let gradient = new am4core.LinearGradient();        // новый градиент от 0.9 до 0 прозрачности
    //gradient.addColor(chart.colors.getIndex(0), 0.9);   // прозрачность 0,9 у самой линии графика
    //gradient.addColor(chart.colors.getIndex(0), 0);     // градиент бледнеет к  AxisY.baseValue = 0
    //gradient.rotation = 90;     // угол поворота градиента. 0 - горизонтальный; 90 - вертикальный
    //series.fill = gradient;     // заливка градиентом

    var bullet = series.bullets.push(new am4charts.CircleBullet());  // кружочки в точках данных
    series.minBulletDistance = 30;            // не работает для X = ValueAxis
    bullet.fill = chart.colors.getIndex(0).lighten(0.5) //am4core.color("white");
    bullet.circle.radius = 4;
    let bullet1hover = bullet.states.create("hover");
    bullet1hover.properties.scale = 1.5;
    //series.bullets.fill = chart.colors.getIndex(8);//am4core.color("rgba(255, 0, 0, 0.5)");; // заливка точек цветом отличается от цвета подсказки

    //series.bullets.circle.radius = 5;

    //series.strokeOpacity = 0.3      // прозрачность линии

    //series.tooltip.pointerOrientation = "vertical"; // ориентация подсказки
    //series.tooltip.background.fill = 
    //series.tooltip.background.fillOpacity = 0.1;    // прозрачность фона подсказки
    /*
        let series2 = chart.series.push(new am4charts.LineSeries()); // второй график
    
        series2.dataFields.dateX = "time";
        series2.dataFields.valueY = "value22";
    
        series2.name = "Min";
        series2.groupFields.valueY = "low";  // показывать минимальное значение группы average min max open close
        series2.groupFields.valueX = "close";
    
        //series2.connect = false;    // в серии могут быть разрывы
        series2.autoGapCount = 30 // коэффициент, показывающий что в данных есть разрыв
    
        //series2.bullets.push(new am4charts.CircleBullet());  // кружочки в точках данных
        //series2.minBulletDistance = 20;            // не работает для X = ValueAxis
    
        //series2.stroke = am4core.color("blue");        // red Цвет графика
        series2.tensionX = 0.8;      // сглаживание между точками
        series2.tensionY = 0.8;      // сглаживание между точками 
        series2.tooltipText = "{name} = [bold]{valueY}[/]";   // подсказка, значение в точке
        // //series2.tooltip.pointerOrientation = "vertical"; // ориентация подсказки
        // //series2.tooltip.background.fillOpacity = 0.1;    // прозрачность фона подсказки
        // series2.hidden = false          //можно сразу скрыть график
        // //series2.fillOpacity = 0.1;    // заливка цветом под графиком до оси Y=0
        series2.strokeOpacity = 0.3
    
        let series3 = chart.series.push(new am4charts.LineSeries()); // второй график
    
        //series2.data = data;
    
        series3.dataFields.dateX = "time";
        series3.dataFields.valueY = "value22";
    
        series3.name = "Max";
        series3.groupFields.valueY = "high";  // показывать среднее значение группы average low high open close 
        series3.groupFields.valueX = "close";
    
        //series3.connect = false;    // в серии могут быть разрывы
        series3.autoGapCount = 30 // коэффициент, показывающий что в данных есть разрыв
    
        //series3.bullets.push(new am4charts.CircleBullet());  // кружочки в точках данных
        //series3.minBulletDistance = 20;            // не работает для X = ValueAxis
    
        //series3.stroke = am4core.color("green");        // red Цвет графика
        //series3.strokeWidth = 1.5                // толщина линии графика
        series3.tensionX = 0.8;      // сглаживание между точками
        series3.tensionY = 0.8;      // сглаживание между точками 
        series3.strokeOpacity = 0.3
    
        series3.tooltipText = "{name} = [bold]{valueY}[/]";   // подсказка, значение в точке
    */
    //let axisTooltip = AxisX.tooltip; // подсказка на оси X

    chart.cursor = new am4charts.XYCursor();        // новый объект - Курсор
    //chart.cursor.snapToSeries = series3;          // привязываем к графику series3 При привязке отображается подсказка только для одного графика
    //chart.cursor.xAxis = AxisX;
    chart.cursor.maxTooltipDistance = 100;
    chart.xAxes.getIndex(0).tooltipDateFormat = "dd.MM HH:mm:ss";

    // Create scrollbars
    //hart.scrollbarX = new am4core.Scrollbar(); // полосы прокрутки и масштаба
    chart.scrollbarY = new am4core.Scrollbar(); //****************************************************************************************************  */

    chart.legend = new am4charts.Legend(); // легенда

    // let scrollbarX = new am4charts.XYChartScrollbar();  // мини график сверху для масштабирования
    //scrollbarX.series.push(series);    //  миниграфик среднего значения

    //chart.scrollbarX = scrollbarX;
    chart.scrollbarX = new am4core.Scrollbar();
    //chart.scrollbarX.animationDuration = 200;
    //chart.dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss";   // формат даты для всего графика
    chart.exporting.menu = new am4core.ExportMenu();    // добавляем меню экспорта
    chart.exporting.dateFormat = "yyyy-MM-dd HH:mm:ss"; // формат даты при экспорте

    let buttonContainer = chart.plotContainer.createChild(am4core.Container);   // создаем контейнер
    buttonContainer.shouldClone = false;
    buttonContainer.align = "center";
    buttonContainer.valign = "top";
    buttonContainer.zIndex = Number.MAX_SAFE_INTEGER;
    buttonContainer.marginTop = 5;
    buttonContainer.marginRight = 50;
    buttonContainer.layout = "horizontal";

    let zoomInButton = buttonContainer.createChild(am4core.Button);     // в контейнере создаем кнопку ZOOM +
    zoomInButton.label.text = "[bold]+";
    zoomInButton.events.on("hit", function (ev) {       // обработчик события нажатия на кнопку
        let diff = AxisX.maxZoomed - AxisX.minZoomed;
        let delta = diff * 0.2;
        AxisX.zoomToDates(new Date(AxisX.minZoomed + delta), new Date(AxisX.maxZoomed - delta));
    });

    let zoomOutButton = buttonContainer.createChild(am4core.Button);    // в контейнере создаем кнопку ZOOM -
    zoomOutButton.label.text = "[bold]-";
    zoomOutButton.events.on("hit", function (ev) {
        let diff = AxisX.maxZoomed - AxisX.minZoomed;
        let delta = diff * 0.2;
        AxisX.zoomToDates(new Date(AxisX.minZoomed - delta), new Date(AxisX.maxZoomed + delta));
    });

    let recButton = buttonContainer.createChild(am4core.Button);    // в контейнере создаем кнопку UPDATE
    recButton.label.text = "Auto update OFF";
    recButton.events.on("hit", function (ev) {
        if (toggleRec == 0) {
            toggleRec = 1
            recButton.label.text = "[bold][blue]Auto update ON";
            updateDataOn()
        }
        else {
            toggleRec = 0
            recButton.label.text = "Auto update OFF";
            //clearInterval(interval4) // остановка функции
            updateDataOff()
        }
    });

    let sortButton = buttonContainer.createChild(am4core.Button);    // в контейнере создаем кнопку UPDATE
    sortButton.label.text = "ZOOM";
    sortButton.events.on("hit", function (ev) {

        //console.log(AxisX.start.getTime)
        AxisX.zoomToDates(
            new Date(2020, 10, 20),
            new Date(2020, 10, 21)
        );

        for (let i = 0; i < charts.length; i++) {
            let chart = charts[i];
            let dateAxis = chart.xAxes.getIndex(0);

            dateAxis.events.disableType("selectionextremeschanged");
            //dateAxis.start = AxisX.start;
            //dateAxis.end = AxisX.end;

            dateAxis.zoomToDates(
                new Date(2020, 10, 21, 0),
                new Date(2020, 10, 21, 14)
            );

            dateAxis.events.enableType("selectionextremeschanged");

        }
    });

    let deleteButton = buttonContainer.createChild(am4core.Button);    // в контейнере создаем кнопку UPDATE
    deleteButton.label.text = "[bold red]DELETE data!";
    deleteButton.events.on("hit", function (ev) {

        let oReq = new XMLHttpRequest();
        //oReq.onload = reqListener1;
        oReq.open("get", `${config.apiBaseUrl}?action=station_data_delete&station=${config.stationId}`, true);
        oReq.send();

        document.getElementById("p1").innerHTML = "All data deleted!";
        labelLog.text = "All data deleted!";
    });

    /*
        let reloadButton = buttonContainer.createChild(am4core.Button);    // в контейнере создаем кнопку UPDATE
        reloadButton.label.text = "RELOAD";
        reloadButton.events.on("hit", function (ev) {
    
            console.log(`GET: ${config.apiBaseUrl}?action=sensor_data&station=${config.otherStationId}&sensor_name=temp`);
    
            let oReq = new XMLHttpRequest();
            oReq.onload = reqListener1;
            oReq.open("get", `${config.apiBaseUrl}?action=sensor_data&station=${config.otherStationId}&sensor_name=temp`, true);
            oReq.send();
    
            // запрос на сервер
            console.log(`GET: ${config.apiBaseUrl}?action=sensor_data&station=${config.otherStationId}&sensor_name=humidity`);
            // запрос данных о rssi
            let oReq1 = new XMLHttpRequest();
            oReq1.onload = reqListener2;
            oReq1.open("get", `${config.apiBaseUrl}?action=sensor_data&station=${config.otherStationId}&sensor_name=humidity`, true);
            oReq1.send();
        });
    
        let sortButton = buttonContainer.createChild(am4core.Button);    // в контейнере создаем кнопку UPDATE
        sortButton.label.text = "SORT";
        sortButton.events.on("hit", function (ev) {
            sort()
        });
    
        let updateButton = buttonContainer.createChild(am4core.Button);    // в контейнере создаем кнопку UPDATE
        updateButton.label.text = "UPD";
        updateButton.events.on("hit", function (ev) {
            chart.validateData(); // обновление данных графиков
            chart2.validateData(); // обновление данных графиков
            title.text = " Количество точек: " + DATA.length;
        });
    
        let lineButton = buttonContainer.createChild(am4core.Button);    // в контейнере создаем кнопку UPDATE
        lineButton.label.text = "LINE";
        lineButton.events.on("hit", function (ev) {
            series.tensionX = 1.0;      // сглаживание между точками
            series.tensionY = 1.0;      // сглаживание между точками
            series2.tensionX = 1.0;      // сглаживание между точками
            series2.tensionY = 1.0;      // сглаживание между точками
            series3.tensionX = 1.0;      // сглаживание между точками
            series3.tensionY = 1.0;      // сглаживание между точками
            series4.tensionX = 1.0;      // сглаживание между точками
            series4.tensionY = 1.0;      // сглаживание между точками
            series5.tensionX = 1.0;      // сглаживание между точками
            series5.tensionY = 1.0;      // сглаживание между точками
            series6.tensionX = 1.0;      // сглаживание между точками
            series6.tensionY = 1.0;      // сглаживание между точками
            series.smoothing = "bezier";
            series2.smoothing = "bezier";
            series3.smoothing = "bezier";
            series4.smoothing = "bezier";
            series5.smoothing = "bezier";
            series6.smoothing = "bezier";
        });
    
        let splineButton = buttonContainer.createChild(am4core.Button);    // в контейнере создаем кнопку UPDATE
        splineButton.label.text = "SPLINE";
        splineButton.events.on("hit", function (ev) {
            series.tensionX = 0.8;      // сглаживание между точками
            series.tensionY = 0.8;      // сглаживание между точками
            series2.tensionX = 0.8;      // сглаживание между точками
            series2.tensionY = 0.8;      // сглаживание между точками
            series3.tensionX = 0.8;      // сглаживание между точками
            series3.tensionY = 0.8;      // сглаживание между точками
            series4.tensionX = 0.8;      // сглаживание между точками
            series4.tensionY = 0.8;      // сглаживание между точками
            series5.tensionX = 0.8;      // сглаживание между точками
            series5.tensionY = 0.8;      // сглаживание между точками
            series6.tensionX = 0.8;      // сглаживание между точками
            series6.tensionY = 0.8;      // сглаживание между точками
            series.smoothing = "bezier";
            series2.smoothing = "bezier";
            series3.smoothing = "bezier";
            series4.smoothing = "bezier";
            series5.smoothing = "bezier";
            series6.smoothing = "bezier";
        });
        let monoButton = buttonContainer.createChild(am4core.Button);    // в контейнере создаем кнопку UPDATE
        monoButton.label.text = "MONOT";
        monoButton.events.on("hit", function (ev) {
            series.smoothing = "monotoneX";
            series2.smoothing = "monotoneX";
            series3.smoothing = "monotoneX";
            series4.smoothing = "monotoneX";
            series5.smoothing = "monotoneX";
            series6.smoothing = "monotoneX";
        });
    
    */
    // let steplineButton = buttonContainer.createChild(am4core.Button);    // в контейнере создаем кнопку UPDATE
    // steplineButton.label.text = "STEP";
    // steplineButton.events.on("hit", function (ev) {
    //     series = chart.series.push(new am4charts.StepLineSeries());
    // });

    //console.log("AxisX.baseInterval : " + AxisX.baseInterval)
    //console.log("series.autoGapCount : " + series.autoGapCount)

    //console.log("AxisX.baseDuration [ms] : " + AxisX.baseDuration)
    //console.log("AxisX.baseValue : " + AxisX.baseValue)



    //hand.value = (data1[data1.length - 1].value / 1000)
    //label.text = data1[data1.length - 1].value + " mV";



    //hand.showValue(Number(data1[data1.length - 1].value / 1000), 3200, am4core.ease.linear);

    //console.log("DATA.length = " + DATA.length)
    //console.log("value [" + [DATA.length - 1] + "] is " + typeof (DATA[DATA.length - 1].value1) + ": " + DATA[DATA.length - 1].value1);


    //AxisY2.tooltip.disabled = true;
    //AxisY2.renderer.grid.template.strokeDasharray = "2,3";
    //AxisY2.renderer.labels.template.fill = am4core.color("#dfcc64");
    AxisY2.renderer.minWidth = 60;
    AxisY2.title.text = "Ток, mA";
    AxisY2.title.fontWeight = "bold";    // жирный шрифт
    //AxisY2.title.dx = 15 // смещение подписи
    AxisY2.renderer.opposite = true;   // перенос оси на правую сторону графика
    AxisY2.dx = 0
    AxisY2.syncWithAxis = AxisY; //  синхронизация осей

    AxisY2.renderer.labels.template.adapter.add("text", (label, target, key) => {
        if (target.dataItem && (target.dataItem.value < 0)) {
            return "[red]" + label;
        } else {
            return label;
        }
    });

    let series4 = chart.series.push(new am4charts.StepLineSeries());
    series4.name = "Ток";
    series4.dataFields.dateX = "time";
    series4.dataFields.valueY = "value23";
    series4.yAxis = AxisY2;
    //series4.groupFields.valueY = "average";  // показывать максимальное значение группы average high low open close sum
    //series4.groupFields.valueX = "close";    // время точки - время последней точки в группе open close  
    //series4.xAxis = AxisX;
    //series4.tooltipText = "{valueY.value}";
    //series4.fill = am4core.color("#dfcc64");
    //series4.stroke = am4core.color("#dfcc64");

    series4.strokeWidth = 1.5                // толщина линии графика
    //series4.stroke = am4core.color("black");     // red Цвет графика
    //series4.tensionX = 0.8;      // сглаживание между точками
    //series4.tensionY = 0.8;      // сглаживание между точками

    series4.startLocation = 0.5; // метка точки в начале линии
    //series4.bullets.push(new am4charts.CircleBullet());  // кружочки в точках данных
    //series4.minBulletDistance = 30;            // не работает для X = ValueAxis

    var bullet4 = series4.bullets.push(new am4charts.CircleBullet());  // кружочки в точках данных
    series4.minBulletDistance = 30;            // не работает для X = ValueAxis
    bullet4.fill = chart.colors.getIndex(4).lighten(0.5) //am4core.color("white");
    bullet4.circle.radius = 4;
    let bullet4hover = bullet4.states.create("hover");
    bullet4hover.properties.scale = 1.5;

    AxisY2.baseValue = 0;   // уровень от которого идет заливка цветом под графиком
    series4.fillOpacity = 0.1;  // заливка цветом под графиком до оси Y=0

    //series4.tooltip.getFillFromObject = false; // заливка подсказки цветом отличается от цвета подсказки
    //series4.tooltip.background.fill = am4core.color("rgba(63, 125, 238, 1)") // заливка
    //series.tooltip.stroke = am4core.color("black")          // обводка
    //series4.tooltip.label.fill = am4core.color("black");   // цвет текста
    series4.tooltipText = "{time.formatDate('MM-dd HH:mm:ss')} \n {name} = [bold]{valueY.formatNumber('####.#')} mA[/]";   // подсказка, значение в точке {time} показывает только дату

    // let gradient1 = new am4core.LinearGradient();        // новый градиент от 0.9 до 0 прозрачности
    // gradient1.addColor(chart.colors.getIndex(6), 0.9);   // прозрачность 0,9 у самой линии графика
    // gradient1.addColor(chart.colors.getIndex(7), 0);     // градиент бледнеет к  AxisY.baseValue = 0
    // gradient1.rotation = 90;     // угол поворота градиента. 0 - горизонтальный; 90 - вертикальный
    // series4.fill = gradient1;     // заливка градиентом
    /*
        let series5 = chart.series.push(new am4charts.LineSeries()); // второй график
    
        series5.dataFields.dateX = "time";
        series5.dataFields.valueY = "value23";
        series5.yAxis = AxisY2;
        series5.name = "Min";
        series5.groupFields.valueY = "low";  // показывать среднее значение группы average min max open close
        series5.groupFields.valueX = "close";
    
        //series5.connect = false;    // в серии могут быть разрывы
        //series5.autoGapCount = 1.1 // коэффициент, показывающий что в данных есть разрыв
    
        //series5.bullets.push(new am4charts.CircleBullet());  // кружочки в точках данных
        //series5.minBulletDistance = 20;            // не работает для X = ValueAxis
    
        //series5.stroke = am4core.color("blue");        // red Цвет графика
        series5.tensionX = 0.8;      // сглаживание между точками
        series5.tensionY = 0.8;      // сглаживание между точками
        series5.tooltipText = "{name} = [bold]{valueY}[/]";   // подсказка, значение в точке
        // //series5.tooltip.pointerOrientation = "vertical"; // ориентация подсказки
        // //series5.tooltip.background.fillOpacity = 0.1;    // прозрачность фона подсказки
        // series5.hidden = false          //можно сразу скрыть график
        // //series5.fillOpacity = 0.1;    // заливка цветом под графиком до оси Y=0
        series5.strokeOpacity = 0.3
    
        let series6 = chart.series.push(new am4charts.LineSeries()); // второй график
    
        //series5.data = data;
    
        series6.dataFields.dateX = "time";
        series6.dataFields.valueY = "value23";
        series6.yAxis = AxisY2;
        series6.name = "Max";
        series6.groupFields.valueY = "high";  // показывать среднее значение группы average low high open close
        series6.groupFields.valueX = "close";
    
        //series6.connect = false;    // в серии могут быть разрывы
        //series3.autoGapCount = 1.1 // коэффициент, показывающий что в данных есть разрыв
    
        //series3.bullets.push(new am4charts.CircleBullet());  // кружочки в точках данных
        //series3.minBulletDistance = 20;            // не работает для X = ValueAxis
    
        //series3.stroke = am4core.color("green");        // red Цвет графика
        //series3.strokeWidth = 1.5                // толщина линии графика
        series6.tensionX = 0.8;      // сглаживание между точками
        series6.tensionY = 0.8;      // сглаживание между точками
        series6.strokeOpacity = 0.3
    
        series6.tooltipText = "{name} = [bold]{valueY}[/]";   // подсказка, значение в точке
    */

    // series.smoothing = "monotoneX";
    //series2.smoothing = "monotoneX";
    //series3.smoothing = "monotoneX";
    // series4.smoothing = "monotoneX";
    //  series5.smoothing = "monotoneX";
    //  series6.smoothing = "monotoneX";

    //scrollbarX.series.push(series4);    //  миниграфик среднего значения

    series.events.on('ready', () => {
        console.log('series1 ready!');
        flagSeries1ready = 1
    });
    // series2.events.on('ready', () => {
    //     console.log('series2 ready!');
    //     flagSeries2ready = 1
    // });
    // series3.events.on('ready', () => {
    //     console.log('series3 ready!');
    //     flagSeries3ready = 1
    //});
    series4.events.on('ready', () => {
        console.log('series4 ready!');
        flagSeries4ready = 1
    });
    // series5.events.on('ready', () => {
    //     console.log('series5 ready!');
    //     flagSeries5ready = 1
    // });
    // series6.events.on('ready', () => {
    //     console.log('series6 ready!');
    //     flagSeries6ready = 1
    // });


}

function makeGauge1() {
    // ИНДИКАТОР ЧАСОВОГО ТИПА  ----------------------------------------------------------------------------
    // create chart  

    chart2.innerRadius = am4core.percent(90);

    axis.min = 0;
    axis.max = 25;
    axis.strictMinMax = true;
    // axis.renderer.inside = true; подписи внутри
    axis.renderer.ticks.template.disabled = false
    axis.renderer.ticks.template.inside = false;

    axis.renderer.labels.template.radius = 12;
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.grid.template.disabled = false;
    axis.renderer.ticks.template.length = 8;
    axis.hiddenState.properties.opacity = 1;
    axis.hiddenState.properties.visible = true;
    axis.setStateOnChildren = true;
    axis.renderer.hiddenState.properties.endAngle = 180;

    let colorSet = new am4core.ColorSet();

    let gradient2 = new am4core.LinearGradient();
    gradient2.stops.push({ color: am4core.color("red") })
    gradient2.stops.push({ color: am4core.color("yellow") })
    //gradient2.stops.push({ color: am4core.color("violet") })
    //gradient2.stops.push({ color: am4core.color("blue") })
    //gradient2.stops.push({ color: am4core.color("lightblue") })
    //gradient2.stops.push({ color: am4core.color("lightblue") })
    gradient2.stops.push({ color: am4core.color("green") })
    gradient2.stops.push({ color: am4core.color("green") })
    // gradient2.stops.push({ color: am4core.color("yellow") })
    gradient2.stops.push({ color: am4core.color("red") })

    //axis.renderer.line.stroke = gradient2;
    axis.renderer.line.strokeWidth = 2;
    axis.renderer.line.strokeOpacity = 1;
    axis.renderer.line.toBack()
    axis.renderer.grid.template.disabled = true;

    let range = axis.axisRanges.create();
    range.value = 0;
    range.endValue = 15;
    range.axisFill.fillOpacity = 1;
    range.axisFill.fill = am4core.color("#FF0000");
    range.axisFill.zIndex = -1;
    range.innerRadius = am4core.percent(60)
    //range.

    let range1 = axis.axisRanges.create();
    range1.value = 15;
    range1.endValue = 21;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = am4core.color("#00FF00");
    range1.axisFill.zIndex = -1;

    let range2 = axis.axisRanges.create();
    range2.value = 21;
    range2.endValue = 25;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = am4core.color("#FF0000");
    range2.axisFill.zIndex = -1;

    label.isMeasured = false;
    label.fontSize = 20;
    label.x = am4core.percent(50);
    label.y = am4core.percent(100);
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    label.text = "[bold]---- V";

    let label1 = chart2.radarContainer.createChild(am4core.Label);
    label1.isMeasured = false;
    label1.fontSize = 20;
    label1.x = am4core.percent(50);
    label1.y = am4core.percent(100);
    label1.horizontalCenter = "middle";
    label1.verticalCenter = "top";
    label1.text = "Voltage";


    hand.pin.disabled = true;
    hand.radius = am4core.percent(95);
    hand.innerRadius = am4core.percent(50);
    hand.startWidth = 8;
    hand.stroke = am4core.color("blue");
    //hand.strokeWidth = 50
    //hand.renderer.stroke.Width = 10
    hand.fill = am4core.color("blue");
    hand.fillOpacity = 0.5
    //hand.toFront()
    //hand.value = 3000

    let counterHang = 1
    let interval2  // периодически вызываемая функция, не блокирует поток

    hand.value = 0
    interval2 = setInterval(() => {

        //console.log("wait...")
        let jj = 0
        //console.log("wait...")

        for (jj = data1.length - 1; jj >= 0; jj--) {
            if ("value22" in data1[jj]) {
                console.log("value22 = " + data1[jj].value22 + " [" + jj + "]")
                break
            }
        }

        hand.showValue(Number(data1[jj].value22 / 1000), 4000, am4core.ease.elasticOut);
        label.text = "[bold]" + data1[jj].value22 / 1000 + " V";

        counterHang--

        if (counterHang <= 0) { //  
            //console.log("render complite!")
            clearInterval(interval2) // остановка функции

        }
    }, 2000) // интервал 100 мс

}

function makeGauge2() {
    // ВТОРОЙ ИНДИКАТОР ЧАСОВОГО ТИПА --------------------------------------------------------------------------------
    // create chart  

    chart3.innerRadius = am4core.percent(90);

    axis2.min = -5;
    axis2.max = 5;
    axis2.strictMinMax = true;
    // axis.renderer.inside = true; подписи внутри
    axis2.renderer.ticks.template.disabled = false
    axis2.renderer.ticks.template.inside = false;

    axis2.renderer.labels.template.radius = 12;
    axis2.renderer.ticks.template.strokeOpacity = 1;
    axis2.renderer.grid.template.disabled = false;
    axis2.renderer.ticks.template.length = 8;
    axis2.hiddenState.properties.opacity = 1;
    axis2.hiddenState.properties.visible = true;
    axis2.setStateOnChildren = true;
    axis2.renderer.hiddenState.properties.endAngle = 180;

    //let colorSet = new am4core.ColorSet();

    // let gradient3 = new am4core.LinearGradient();
    // gradient3.stops.push({ color: am4core.color("red") })
    // gradient3.stops.push({ color: am4core.color("yellow") })
    // gradient3.stops.push({ color: am4core.color("green") })
    // gradient3.stops.push({ color: am4core.color("green") })
    // gradient3.stops.push({ color: am4core.color("green") })
    // gradient3.stops.push({ color: am4core.color("yellow") })
    // gradient3.stops.push({ color: am4core.color("red") })
    // gradient3.stops.push({ color: am4core.color("blue") })

    // axis2.renderer.line.stroke = gradient3;
    axis2.renderer.line.strokeWidth = 2;
    axis2.renderer.line.strokeOpacity = 1;
    axis2.renderer.line.toBack()
    axis2.renderer.grid.template.disabled = true;

    let range3 = axis2.axisRanges.create();
    range3.value = -5;
    range3.endValue = -4;
    range3.axisFill.fillOpacity = 1;
    range3.axisFill.fill = am4core.color("#FF0000");
    range3.axisFill.zIndex = -1;

    let range4 = axis2.axisRanges.create();
    range4.value = -4;
    range4.endValue = -3;
    range4.axisFill.fillOpacity = 1;
    range4.axisFill.fill = am4core.color("yellow");
    range4.axisFill.zIndex = -1;

    let range5 = axis2.axisRanges.create();
    range5.value = -3;
    range5.endValue = 3;
    range5.axisFill.fillOpacity = 1;
    range5.axisFill.fill = am4core.color("#00FF00");
    range5.axisFill.zIndex = -1;

    let range6 = axis2.axisRanges.create();
    range6.value = 3;
    range6.endValue = 4;
    range6.axisFill.fillOpacity = 1;
    range6.axisFill.fill = am4core.color("yellow");
    range6.axisFill.zIndex = -1;

    let range7 = axis2.axisRanges.create();
    range7.value = 4;
    range7.endValue = 5;
    range7.axisFill.fillOpacity = 1;
    range7.axisFill.fill = am4core.color("#FF0000");
    range7.axisFill.zIndex = -1;

    label2.isMeasured = false;
    label2.fontSize = 20;
    label2.x = am4core.percent(50);
    label2.y = am4core.percent(100);
    label2.horizontalCenter = "middle";
    label2.verticalCenter = "bottom";
    label2.text = "[bold]--- A";

    let label3 = chart3.radarContainer.createChild(am4core.Label);
    label3.isMeasured = false;
    label3.fontSize = 20;
    label3.x = am4core.percent(50);
    label3.y = am4core.percent(100);
    label3.horizontalCenter = "middle";
    label3.verticalCenter = "top";
    label3.text = "Current";


    hand2.pin.disabled = true;
    hand2.radius = am4core.percent(95);
    hand2.innerRadius = am4core.percent(50);
    hand2.startWidth = 8;
    hand2.stroke = am4core.color("blue");
    //hand.strokeWidth = 50
    //hand.renderer.stroke.Width = 10
    hand2.fill = am4core.color("blue");
    hand2.fillOpacity = 0.5
    //hand.toFront()
    //hand.value = 3000

    let counterHang2 = 1 //data2.length
    let interval3  // периодически вызываемая функция, не блокирует поток

    hand2.value = 0


    interval3 = setInterval(() => {

        let jj = 0
        for (jj = data1.length - 1; jj >= 0; jj--) {
            if ("value23" in data1[jj]) {
                console.log("value23 = " + data1[jj].value23 + " [" + jj + "]")
                // let HexString = data1[jj].value23.toString(16)
                // console.log("Hex: 0x" + HexString)
                break
            }
        }

        hand2.showValue(Number(data1[jj].value23 / 1000), 3000, am4core.ease.elasticOut);
        label2.text = "[bold]" + data1[jj].value23 / 1000 + " A";

        counterHang2--

        if (counterHang2 <= 0) { //  
            //counterHang2 = data2.length
            //console.log("render complite!")
            clearInterval(interval3) // остановка функции    
        }

    }, 2000) // интервал 100 мс

}

function makeGauge3() {
    // ТРЕТИЙ ИНДИКАТОР ЧАСОВОГО ТИПА --------------------------------------------------------------------------------
    // create chart  

    chart4.innerRadius = am4core.percent(90);

    axis3.min = 0;
    axis3.max = 100;
    axis3.strictMinMax = true;
    // axis.renderer.inside = true; подписи внутри
    axis3.renderer.ticks.template.disabled = false
    axis3.renderer.ticks.template.inside = false;

    axis3.renderer.labels.template.radius = 12;
    axis3.renderer.ticks.template.strokeOpacity = 1;
    axis3.renderer.grid.template.disabled = false;
    axis3.renderer.ticks.template.length = 8;
    axis3.hiddenState.properties.opacity = 1;
    axis3.hiddenState.properties.visible = true;
    axis3.setStateOnChildren = true;
    axis3.renderer.hiddenState.properties.endAngle = 180;

    //let colorSet = new am4core.ColorSet();

    // let gradient3 = new am4core.LinearGradient();
    // gradient3.stops.push({ color: am4core.color("red") })
    // gradient3.stops.push({ color: am4core.color("yellow") })
    // gradient3.stops.push({ color: am4core.color("green") })
    // gradient3.stops.push({ color: am4core.color("green") })
    // gradient3.stops.push({ color: am4core.color("green") })
    // gradient3.stops.push({ color: am4core.color("yellow") })
    // gradient3.stops.push({ color: am4core.color("red") })
    // gradient3.stops.push({ color: am4core.color("blue") })

    // axis2.renderer.line.stroke = gradient3;
    axis3.renderer.line.strokeWidth = 2;
    axis3.renderer.line.strokeOpacity = 1;
    axis3.renderer.line.toBack()
    axis3.renderer.grid.template.disabled = true;

    let range = axis3.axisRanges.create();
    range.value = 20;
    range.endValue = 100;
    range.axisFill.fillOpacity = 1;
    range.axisFill.fill = am4core.color("#00FF00");
    range.axisFill.zIndex = -1;
    range.innerRadius = am4core.percent(60)
    //range.

    let range1 = axis3.axisRanges.create();
    range1.value = 10;
    range1.endValue = 20;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = am4core.color("#FFFF00");
    range1.axisFill.zIndex = -1;

    let range2 = axis3.axisRanges.create();
    range2.value = 0;
    range2.endValue = 10;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = am4core.color("#FF0000");
    range2.axisFill.zIndex = -1;

    label4.isMeasured = false;
    label4.fontSize = 20;
    label4.x = am4core.percent(25);
    label4.y = am4core.percent(100);
    label4.horizontalCenter = "left";
    label4.verticalCenter = "bottom";
    label4.dx = 10
    label4.text = "[bold]--- % ";

    label41.isMeasured = false;
    label41.fontSize = 20;
    label41.x = am4core.percent(50);
    label41.y = am4core.percent(0);
    label41.horizontalCenter = "right";
    label41.verticalCenter = "bottom";
    label41.text = "[bold]--- %";

    label42.isMeasured = false;
    label42.fontSize = 16;
    label42.x = am4core.percent(50);
    label42.y = -25
    label42.horizontalCenter = "middle";
    label42.verticalCenter = "bottom";
    label42.text = "[bold]+/- -- %";

    let label5 = chart4.radarContainer.createChild(am4core.Label);
    label5.isMeasured = false;
    label5.fontSize = 20;
    label5.x = am4core.percent(50);
    label5.y = 10;
    label5.horizontalCenter = "middle";
    label5.verticalCenter = "top";
    label5.text = "MaxError/ASoC/RSoC";

    // let label51 = chart4.radarContainer.createChild(am4core.Label);
    // label51.isMeasured = false;
    // label51.fontSize = 20;
    // label51.x = am4core.percent(50);
    // label51.y = 20
    // label51.horizontalCenter = "middle";
    // label51.verticalCenter = "top";
    // label51.text = "ASoC";


    hand3.pin.disabled = true;
    hand3.radius = am4core.percent(95);
    hand3.innerRadius = am4core.percent(60);
    hand3.startWidth = 8;
    hand3.stroke = am4core.color("blue");
    //hand.strokeWidth = 50
    //hand.renderer.stroke.Width = 10
    hand3.fill = am4core.color("blue");
    hand3.fillOpacity = 0.5
    //hand.toFront()
    //hand.value = 3000

    hand31.pin.disabled = true;
    hand31.radius = am4core.percent(95);
    hand31.innerRadius = am4core.percent(70);
    hand31.startWidth = 5;
    hand31.stroke = am4core.color("blue");
    //hand.strokeWidth = 50
    //hand.renderer.stroke.Width = 10
    hand31.fill = am4core.color("green");
    hand31.fillOpacity = 0.5

    hand32.pin.disabled = true;
    hand32.radius = am4core.percent(95);
    hand32.innerRadius = am4core.percent(70);
    hand32.startWidth = 5;
    hand32.stroke = am4core.color("black");
    //hand.strokeWidth = 50
    //hand.renderer.stroke.Width = 10
    hand32.fill = am4core.color("red");
    hand32.fillOpacity = 0.5



    let counterHang3 = 1 //data2.length
    let interval_3  // периодически вызываемая функция, не блокирует поток

    hand3.value = 0
    hand31.value = 0
    hand32.value = 0

    interval_3 = setInterval(() => {

        let jj = 0
        for (jj = data1.length - 1; jj >= 0; jj--) {
            if ("value20" in data1[jj]) {
                console.log("value20 = " + data1[jj].value20 + " [" + jj + "]")
                break
            }
        }

        let jj1 = 0
        for (jj1 = data1.length - 1; jj1 >= 0; jj1--) {
            if ("value19" in data1[jj1]) {
                console.log("value19 = " + data1[jj1].value19 + " [" + jj1 + "]")
                break
            }
        }

        let jj2 = 0
        for (jj2 = data1.length - 1; jj2 >= 0; jj2--) {
            if ("value55" in data1[jj2]) {
                console.log("value55 = " + data1[jj2].value55 + " [" + jj2 + "]")
                break
            }
        }

        hand3.showValue(Number(data1[jj].value20), 1000, am4core.ease.sinOut);
        hand31.showValue(Number(data1[jj1].value19), 1000, am4core.ease.sinOut);
        hand32.showValue(Number(data1[jj2].value55), 1000, am4core.ease.sinOut);

        label4.text = "[bold]" + data1[jj].value20 + " %";
        label41.text = "[bold]" + data1[jj1].value19 + " %";
        label42.text = "[bold]" + "+/-" + data1[jj2].value55 + " %";

        counterHang3--

        if (counterHang3 <= 0) { //  
            //counterHang2 = data2.length
            //console.log("render complite!")
            clearInterval(interval_3) // остановка функции    
        }

    }, 2000) // интервал 100 мс

}

function makeGauge4() {
    // ВТОРОЙ ИНДИКАТОР ЧАСОВОГО ТИПА --------------------------------------------------------------------------------
    // create chart  

    chart5.innerRadius = am4core.percent(90);

    axis4.min = 20;
    axis4.max = 60;
    axis4.strictMinMax = true;
    // axis.renderer.inside = true; подписи внутри
    axis4.renderer.ticks.template.disabled = false
    axis4.renderer.ticks.template.inside = false;

    axis4.renderer.labels.template.radius = 12;
    axis4.renderer.ticks.template.strokeOpacity = 1;
    axis4.renderer.grid.template.disabled = false;
    axis4.renderer.ticks.template.length = 8;
    axis4.hiddenState.properties.opacity = 1;
    axis4.hiddenState.properties.visible = true;
    axis4.setStateOnChildren = true;
    axis4.renderer.hiddenState.properties.endAngle = 180;

    //let colorSet = new am4core.ColorSet();

    // let gradient3 = new am4core.LinearGradient();
    // gradient3.stops.push({ color: am4core.color("red") })
    // gradient3.stops.push({ color: am4core.color("yellow") })
    // gradient3.stops.push({ color: am4core.color("green") })
    // gradient3.stops.push({ color: am4core.color("green") })
    // gradient3.stops.push({ color: am4core.color("green") })
    // gradient3.stops.push({ color: am4core.color("yellow") })
    // gradient3.stops.push({ color: am4core.color("red") })
    // gradient3.stops.push({ color: am4core.color("blue") })

    // axis2.renderer.line.stroke = gradient3;
    axis4.renderer.line.strokeWidth = 2;
    axis4.renderer.line.strokeOpacity = 1;
    axis4.renderer.line.toBack()
    axis4.renderer.grid.template.disabled = true;

    let range = axis4.axisRanges.create();
    range.value = 20;
    range.endValue = 40;
    range.axisFill.fillOpacity = 1;
    range.axisFill.fill = am4core.color("#00FF00");
    range.axisFill.zIndex = -1;
    range.innerRadius = am4core.percent(60)
    //range.

    let range1 = axis4.axisRanges.create();
    range1.value = 40;
    range1.endValue = 50;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = am4core.color("#FFFF00");
    range1.axisFill.zIndex = -1;

    let range2 = axis4.axisRanges.create();
    range2.value = 50;
    range2.endValue = 60;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = am4core.color("#FF0000");
    range2.axisFill.zIndex = -1;

    label6.isMeasured = false;
    label6.fontSize = 20;
    label6.x = am4core.percent(50);
    label6.y = am4core.percent(100);
    label6.horizontalCenter = "middle";
    label6.verticalCenter = "bottom";
    label6.text = "[bold]--- °C";

    let label7 = chart5.radarContainer.createChild(am4core.Label);
    label7.isMeasured = false;
    label7.fontSize = 20;
    label7.x = am4core.percent(50);
    label7.y = am4core.percent(100);
    label7.horizontalCenter = "middle";
    label7.verticalCenter = "top";
    label7.text = "Temp";


    hand4.pin.disabled = true;
    hand4.radius = am4core.percent(95);
    hand4.innerRadius = am4core.percent(50);
    hand4.startWidth = 8;
    hand4.stroke = am4core.color("black");
    //hand.strokeWidth = 50
    //hand.renderer.stroke.Width = 10
    hand4.fill = am4core.color("red");
    hand4.fillOpacity = 0.5
    //hand.toFront()
    //hand.value = 3000

    // let counterHang4 = 1 //data2.length
    // let interval_4  // периодически вызываемая функция, не блокирует поток

    // hand4.value = 20
    // interval_4 = setInterval(() => {

    //     let jj = 0
    //     for (jj = data1.length - 1; jj > 0; jj--) {
    //         if ("value21" in data1[jj]) {
    //             console.log("value21 = " + data1[jj].value21 + " [" + jj + "]")
    //             break
    //         }
    //     }

    //     hand4.showValue(Number(data1[jj].value21 / 10), 3000, am4core.ease.elasticOut);
    //     label6.text = "[bold]" + data1[jj].value21 / 10 + " °С";

    //     counterHang4--

    //     if (counterHang4 <= 0) { //  
    //         //counterHang2 = data2.length
    //         //console.log("render complite!")
    //         clearInterval(interval_4) // остановка функции    
    //     }

    // }, 2000) // интервал 100 мс


    setTimeout(setGaugeG4, 2000)

    function setGaugeG4() {
        let jj = 0
        for (jj = data1.length - 1; jj >= 0; jj--) { // поиск последнего значения
            if ("value21" in data1[jj]) {
                console.log("value21 = " + data1[jj].value21 + " [" + jj + "]")
                let HexString = parseFloat(data1[jj].value21)
                console.log("Hex: 0x" + HexString.toString(16))

                break
            }
        }

        hand4.showValue(Number(data1[jj].value21), 3000, am4core.ease.elasticOut);
        label6.text = "[bold]" + data1[jj].value21 + " °С";
    }



}

function makeColumnChart1() {

    let titleC1 = chartC1.titles.push(new am4core.Label());
    titleC1.text = "Cell Voltage, Qmax";
    titleC1.fontSize = 12;
    //titleC1.marginBottom = 15;

    /* Make automatic colors more distinctive by increasing steps */
    chartC1.colors.step = 6;

    let jjj = 0
    for (jjj = data1.length - 1; jjj > 0; jjj--) { // поиск последнего значения
        if ("value48" in data1[jjj]) {
            console.log("value48 = " + data1[jjj].value48 + " [" + jjj + "]")
            titleC1.text = "QmaxPack " + "[bold]" + data1[jjj].value48 + " mAh";
            break
        }
    }

    chartC1.data = DATA4
    // Create axes
    let categoryAxisC1 = chartC1.xAxes.push(new am4charts.CategoryAxis());
    categoryAxisC1.dataFields.category = "cell";
    categoryAxisC1.renderer.grid.template.location = 0;
    categoryAxisC1.renderer.minGridDistance = 10;
    categoryAxisC1.tooltip.disabled = true;

    let valueAxisC1 = chartC1.yAxes.push(new am4charts.ValueAxis());
    valueAxisC1.renderer.minWidth = 5;
    valueAxisC1.title.text = "Voltage, V";
    valueAxisC1.title.fontWeight = "bold";    // жирный шрифт
    //valueAxisC1.title.dx = 15 // смещение подписи

    //valueAxisC1.min = 2.7;
    //valueAxisC1.max = 4.3;
    valueAxisC1.cursorTooltipEnabled = false;


    let valueAxisC11 = chartC1.yAxes.push(new am4charts.ValueAxis());
    valueAxisC11.renderer.minWidth = 5;
    //valueAxisC11.min = 6.0;
    //valueAxisC11.max = 7.5;
    valueAxisC11.title.text = "Qmax, Ah";
    valueAxisC11.title.fontWeight = "bold";    // жирный шрифт

    valueAxisC11.cursorTooltipEnabled = false;

    valueAxisC11.renderer.opposite = true;   // перенос оси на правую сторону графика
    valueAxisC11.syncWithAxis = valueAxisC1; //  синхронизация осей

    // Create series
    let seriesC1 = chartC1.series.push(new am4charts.ColumnSeries());
    seriesC1.sequencedInterpolation = true;
    seriesC1.dataFields.valueY = "voltage";
    seriesC1.dataFields.categoryX = "cell";
    seriesC1.clustered = false;
    seriesC1.tooltipText = "[bold]{valueY} V[/]";

    //seriesC1.columns.template.tooltipText = "{valueY.value}";
    //seriesC1.columns.template.tooltipY = 0;
    //seriesC1.columns.template.strokeOpacity = 0;
    //seriesC1.columns.template.strokeWidth = 0;

    seriesC1.tooltip.pointerOrientation = "vertical";

    seriesC1.columns.template.column.cornerRadiusTopLeft = 4;
    seriesC1.columns.template.column.cornerRadiusTopRight = 4;
    seriesC1.columns.template.column.fillOpacity = 0.3;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    // seriesC1.columns.template.adapter.add("fill", function (fill, target) {
    //     return chartC1.colors.getIndex(target.dataItem.index);
    // });


    // Create series
    let seriesC11 = chartC1.series.push(new am4charts.ColumnSeries());
    seriesC11.sequencedInterpolation = true;
    seriesC11.dataFields.valueY = "qmax";
    seriesC11.dataFields.categoryX = "cell";
    seriesC11.clustered = false;
    seriesC11.columns.template.width = am4core.percent(50);
    seriesC11.tooltipText = "[bold]{valueY} Ah[/]";
    //seriesC11.columns.template.strokeWidth = 0;

    seriesC11.yAxis = valueAxisC11;

    seriesC11.tooltip.pointerOrientation = "vertical";

    seriesC11.columns.template.column.cornerRadiusTopLeft = 3;
    seriesC11.columns.template.column.cornerRadiusTopRight = 3;
    seriesC11.columns.template.column.fillOpacity = 0.4;

    chartC1.cursor = new am4charts.XYCursor();
    chartC1.cursor.lineX.disabled = true;
    chartC1.cursor.lineY.disabled = true;

    seriesC11.events.on('ready', () => {
        console.log('seriesC11 ready!');
        flagSeriesC11ready = 1
    });

}



// Коллбек функция, которая вызывается по окончанию приема данных, обработчик данных
function reqListener1() {
    console.log("reqListener1");
    //console.log("Данные data1 приняты");
    //console.log(this.responseText);
    //console.log("Получен " + typeof (this.responseText));

    data1 = JSON.parse(this.responseText); // преобразование JSON -> массив строк

    console.log("Преобразован в " + typeof (data1));
    console.log("Принято " + data1.length + " точек");
    console.log("data1[0].time is " + typeof (data1[0].time) + ": " + data1[0].time);
    //console.log("value22 [0] is " + typeof (data1[0].value22) + ": " + data1[0].value22);
    console.log(data1[0]);
    // console.log("value [0] is " + typeof (data[0].value) + ": " + data[0].value);
    // console.log("time [" + (data.length - 1) + "] is " + typeof (data[data.length - 1].time) + ": " + data[data.length - 1].time);
    // console.log("value [" + (data.length - 1) + "] is " + typeof (data[data.length - 1].value) + ": " + data[data.length - 1].value);

    //console.log("Преобразование из sring в object.. ");

    let numCallbackRuns = 0;

    data1.forEach((element) => {
        //element.sensor_id = new Number(element.sensor_id)       // sensor_id
        element.time = new Date(element.time)                   // преобразование в объект Date
        element.time.setHours(element.time.getHours() + 2);     // сдвиг на два часа вперед UTC+3 -> UTC+5

        numCallbackRuns++
    });

    //console.log("Парсинг закончен");

    flagData1ready = 1  // данные готовы


    console.log("numCallbackRuns: ", numCallbackRuns)

    console.log(data1[0]);
    //oldLength = data1.length
    //console.log("oldLength: " + data1.length)

    //console.log("Преобразование закончено. flagData1ready = " + flagData1ready);
    //console.log("time [" + (numCallbackRuns - 1) + "] is " + typeof (data1[numCallbackRuns - 1].time) + ": " + data1[numCallbackRuns - 1].time + " value [" + (numCallbackRuns - 1) + "] is " + typeof (data1[numCallbackRuns - 1].value) + ": " + data1[numCallbackRuns - 1].value);
    //console.log(data1)
    //console.log(data1[(data1.length - 3)])
    //console.log(data1[(data1.length - 2)])
    //console.log(data1[(data1.length - 1)])

}

// Коллбек функция, которая вызывается по окончанию приема данных, обработчик данных
function reqListener2() {
    console.log("reqListener2");

    // data1_new = JSON.parse(this.responseText); // преобразование JSON -> массив строк
    // console.log("Преобразован в " + typeof (data1_new));
    // console.log("Принято " + data1_new.length + " точек");
    // console.log("data1_new[0].time is " + typeof (data1_new[0].time) + ": " + data1_new[0].time);
    // console.log(data1_new[0]);
    // // console.log("value [0] is " + typeof (data[0].value) + ": " + data[0].value);
    // // console.log("time [" + (data.length - 1) + "] is " + typeof (data[data.length - 1].time) + ": " + data[data.length - 1].time);
    // // console.log("value [" + (data.length - 1) + "] is " + typeof (data[data.length - 1].value) + ": " + data[data.length - 1].value);

    // //console.log("Преобразование из sring в object.. ");

    // let numCallbackRuns = 0;

    // data1_new.forEach((element) => {
    //     //element.sensor_id = new Number(element.sensor_id)       // sensor_id
    //     element.time = new Date(element.time)                   // преобразование в объект Date
    //     element.time.setHours(element.time.getHours() + 2);     // сдвиг на два часа вперед UTC+3 -> UTC+5

    //     numCallbackRuns++
    // });

    // //console.log("Парсинг закончен");

    // //

    // console.log("numCallbackRuns_new: ", numCallbackRuns)
    let Time1 = new Date()
    let Time2 = new Date()
    Time2.setSeconds(Time1.getSeconds() + 6);

    let V = 15000
    V += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);

    data1_new = [{ time: Time1, value22: 14000 }, { time: Time2, value22: V }]

    flagData1_new_ready = 1  // данные готовы


    //price2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);

    //oldLength = data1.length
    //console.log("oldLength: " + data1.length)

    //console.log("Преобразование закончено. flagData1ready = " + flagData1ready);
    //console.log("time [" + (numCallbackRuns - 1) + "] is " + typeof (data1[numCallbackRuns - 1].time) + ": " + data1[numCallbackRuns - 1].time + " value [" + (numCallbackRuns - 1) + "] is " + typeof (data1[numCallbackRuns - 1].value) + ": " + data1[numCallbackRuns - 1].value);
    //console.log(data1_new[0])
    //console.log(data1_new[(data1_new.length - 3)])
    console.log(data1_new[(data1_new.length - 2)])
    console.log(data1_new[(data1_new.length - 1)])

}

//======================================================================================================= ЗАПРОС ДАННЫХ ==========================================================
labelLog.text = "Request Data ...";


document.getElementById("p1").innerHTML = "Request Data ... ";
console.time("loadData")
// запрос на сервер
console.log(`GET: ${config.apiBaseUrl}?action=station_data&station=${config.stationId}`);

let oReq1 = new XMLHttpRequest();
oReq1.onload = reqListener1;
oReq1.open("get", `${config.apiBaseUrl}?action=station_data&station=${config.stationId}`, true);
oReq1.send();


//let interval  // периодически вызываемая функция, не блокирует поток
let interval = setInterval(() => {

    console.log("load...")

    if (flagData1ready == 1) { //  все данные загрузились 

        flagData1ready = 0
        //flagData2ready = 0

        console.log("load complite!")
        console.timeEnd("loadData")

        document.getElementById("p1").innerHTML = "Data loaded";
        labelLog.text = "Data loaded";

        //sort2()

        //console.log(data2)

        console.time("makeCharts")

        document.getElementById("p1").innerHTML = "Render Charts .. ";

        labelLog.text = "Render charts";

        // let intervalWaitSeries = setInterval(() => { // ожидание готовности графиков

        //      if (flagSeries1ready == 1 && flagSeries2ready == 1 && flagSeries3ready == 1 &&
        //            flagSeries4ready == 1 && flagSeries5ready == 1 && flagSeries6ready == 1 && flagSeries115ready == 1) {

        //

        SeeklastCellParams()    // ищем последние значения для аккумуляторов для диаграммы

        setTimeout(makeGauge1, 100)
        setTimeout(makeGauge2, 500)
        setTimeout(makeGauge3, 1000)
        setTimeout(makeGauge4, 1500)
        setTimeout(makeColumnChart1, 2000)
        //setTimeout(SeeklastCellParams, 2500)

        let intervalWaitSeries = setInterval(() => { // ожидание готовности стрелочных индикаторов

            if (flagSeriesC11ready == 1) {

                makeCharts()    // создаем графики напряжения и тока

                clearInterval(intervalWaitSeries) // остановка функции
            }
        }, 100) // интервал 100 мс

        let intervalWaitSeries2 = setInterval(() => { // ожидание готовности графиков

            if (flagSeries1ready == 1 && flagSeries4ready == 1) {
                // create chart instances
                for (let j = 0; j < chartCount; j++) {
                    makeChart();    // создаем графики регистров
                }

                for (let ii = 0; ii < charts.length; ii++) {    // назначаем данные для каждого из графиков
                    charts[ii].data = data1
                }

                addSeriesToCharts()     // добавляем серии на графики

                clearInterval(intervalWaitSeries2) // остановка функции
            }
        }, 100) // интервал 100 мс

        console.timeEnd("makeCharts")

        clearInterval(interval) // остановка функции
    }
}, 100) // интервал 100 мс

function compareDates(a, b) {
    return a.time - b.time;
}

// let interval_reg = setInterval(() => {

//     console.log("load reg...")

//     if (flagData3ready == 1 && flagData4ready == 1 && flagData5ready == 1 &&
//         flagData6ready == 1 && flagData7ready == 1 && flagData8ready == 1 &&
//         flagData9ready == 1 && flagData10ready == 1 && flagData11ready == 1 &&
//         flagData12ready == 1 && flagData13ready == 1 && flagData14ready == 1) { //  все данные загрузились 

//         flagData3ready = 0
//         flagData4ready = 0
//         flagData5ready = 0
//         flagData6ready = 0
//         flagData7ready = 0
//         flagData8ready = 0
//         flagData9ready = 0
//         flagData10ready = 0
//         flagData11ready = 0
//         flagData12ready = 0
//         flagData13ready = 0
//         flagData14ready = 0

//         console.log("load complite!")

//         makeGauge3()

//         makeGauge4()



//         data3.forEach((element) => { // добавляем data 4 в конец data3 в виде time-value2
//             DATA2.push({ time: element.time, value: element.value })
//         })
//         console.log("merge0")
//         console.log(DATA2.length)

//         data4.forEach((element) => { // добавляем data 4 в конец data3 в виде time-value2
//             DATA2.push({ time: element.time, value2: element.value })
//         })
//         console.log("merge1")
//         console.log(DATA2.length)

//         data5.forEach((element) => { // добавляем data 4 в конец data3 в виде time-value2
//             DATA2.push({ time: element.time, value3: element.value })
//         })
//         console.log("merge2")
//         console.log(DATA2.length)

//         data6.forEach((element) => { // добавляем data 4 в конец data3 в виде time-value2
//             DATA2.push({ time: element.time, value4: element.value })
//         })
//         console.log("merge3")
//         console.log(DATA2.length)

//         data7.forEach((element) => { // добавляем data 4 в конец data3 в виде time-value2
//             DATA2.push({ time: element.time, value5: element.value })
//         })
//         console.log("merge4")
//         console.log(DATA2.length)
//         //console.log(DATA2)

//         console.time("DATA2sort")
//         DATA2.sort(compareDates)

//         console.timeEnd("DATA2sort")

//         console.log("DATA2.sort()")
//         console.log(DATA2.length)

//         data8.forEach((element) => { // добавляем data 4 в конец data3 в виде time-value2
//             DATA3.push({ time: element.time, value: element.value })
//         })

//         console.log("merge11")
//         console.log(DATA3.length)

//         data9.forEach((element) => { // добавляем data 4 в конец data3 в виде time-value2
//             DATA3.push({ time: element.time, value2: element.value })
//         })

//         console.log("merge12")
//         console.log(DATA3.length)

//         DATA3.sort(compareDates)

//         console.log("DATA3.sort()")
//         console.log(DATA3.length)

//         DATA4.push({ cell: 1, voltage: 3212, qmax: 6912 })
//         DATA4.push({ cell: 2, voltage: 3205, qmax: 6852 })
//         DATA4.push({ cell: 3, voltage: 3125, qmax: 7012 })
//         DATA4.push({ cell: 4, voltage: 3190, qmax: 6995 })
//         DATA4.push({ cell: 5, voltage: 3150, qmax: 7099 })

//         console.log(DATA4)

//         makeColumnChart1()

//         //chartC1.data = DATA4

//         //console.log(DATA2)

//         charts[0].data = DATA2
//         charts[1].data = DATA3
//         charts[2].data = data5
//         charts[3].data = data6
//         charts[4].data = data7
//         charts[5].data = data8
//         charts[6].data = data9
//         charts[7].data = data10
//         charts[8].data = data11
//         charts[9].data = data12
//         charts[10].data = data13
//         charts[11].data = data14


//         //charts[0].validateData() // обновление данных графиков

//         console.log("charts[0].data.length = " + charts[0].data.length)
//         console.log("charts[1].data.length = " + charts[1].data.length)
//         console.log("charts[2].data.length = " + charts[2].data.length)
//         console.log("charts[3].data.length = " + charts[3].data.length)
//         console.log("charts[4].data.length = " + charts[4].data.length)
//         console.log("charts[5].data.length = " + charts[5].data.length)
//         console.log("charts[6].data.length = " + charts[6].data.length)
//         console.log("charts[7].data.length = " + charts[7].data.length)
//         console.log("charts[8].data.length = " + charts[8].data.length)
//         console.log("charts[9].data.length = " + charts[9].data.length)
//         console.log("charts[10].data.length = " + charts[10].data.length)
//         console.log("charts[11].data.length = " + charts[11].data.length)
//         // console.log("charts[12].data.length = " + charts[12].data.length)
//         // console.log("charts[13].data.length = " + charts[13].data.length)
//         // console.log("charts[14].data.length = " + charts[14].data.length)
//         // console.log("charts[15].data.length = " + charts[15].data.length)
//         // console.log("charts[16].data.length = " + charts[16].data.length)
//         // console.log("charts[17].data.length = " + charts[17].data.length)
//         // console.log("charts[18].data.length = " + charts[18].data.length)
//         // console.log("charts[19].data.length = " + charts[19].data.length)
//         // console.log("charts[20].data.length = " + charts[20].data.length)
//         // console.log("charts[21].data.length = " + charts[21].data.length)
//         // console.log("charts[22].data.length = " + charts[22].data.length)
//         // console.log("charts[23].data.length = " + charts[23].data.length)
//         // console.log("charts[24].data.length = " + charts[24].data.length)


//         clearInterval(interval_reg) // остановка функции
//     }
// }, 100) // интервал 100 мс


function updateChartsOld() {

    document.getElementById("p1").innerHTML = "Update Charts ... ";
    labelLog.text = "Update charts ...";
    console.log("updateCharts")
    //chart.validateData(); // обновление данных графиков
    //chart2.validateData(); // обновление данных графиков
    if (data1[data1.length - 2].time.getTime() > DATA[DATA.length - 1].time.getTime()) // предпоследняя точка новее последней в DATA
    {
        console.log("fullUpdate")
        sort()
        chart.validateData() // обновление данных графиков
    }
    else {
        if (data1[data1.length - 1].time.getTime() > DATA[DATA.length - 1].time.getTime()) // точка новее последней
        {
            console.log("addingPoint")
            //console.log(DATA.length)

            //DATA.push({ time: data1[data1.length - 1].time, value1: data1[data1.length - 1].value, value2: data2[data2.length - 1].value }) // добавляем очередной элемент DATA

            //console.log(DATA.length)

            chart.addData({ // добавляем на график последнюю точку . также добавляется в DATA (?)
                time: data1[data1.length - 1].time, value1: data1[data1.length - 1].value, value2: data2[data2.length - 1].value
            }, 0) // не удаляя первую

            //console.log(DATA.length)
        }
        else
            console.log("no new data available")
    }

    if (data3[data3.length - 2].time.getTime() > tempData3) {
        console.log("charts[0]fullUpdate")
        charts[0].validateData() // обновление данных графиков
    }
    else {
        if ((data3[data3.length - 1].time.getTime() > tempData3)) {
            console.log("charts[0]addingPoint")
            charts[0].addData({ // добавляем на график последнюю точку . также добавляется в DATA (?)
                time: data3[data3.length - 1].time, value: data3[data3.length - 1].value
            }, 0)
        }
        else
            console.log("charts[0] no new data available")
    }

    tempData3 = data3[data3.length - 1].time.getTime()

    hand.showValue(Number(data1[data1.length - 1].value / 1000), 4000, am4core.ease.elasticOut);
    label.text = "[bold]" + data1[data1.length - 1].value / 1000 + " V";

    hand2.showValue(Number(data2[data2.length - 1].value / 1000), 3000, am4core.ease.elasticOut);
    label2.text = "[bold]" + data2[data2.length - 1].value / 1000 + " A";

    hand3.showValue(Number(data3[data3.length - 1].value), 3000, am4core.ease.elasticOut);
    label4.text = "[bold]" + data3[data3.length - 1].value + " %";

    hand31.showValue(Number(data4[data4.length - 1].value), 3000, am4core.ease.elasticOut);
    label41.text = "[bold]" + data4[data4.length - 1].value + " %";

    hand4.showValue(Number(data5[data5.length - 1].value), 3000, am4core.ease.elasticOut);
    label6.text = "[bold]" + data5[data5.length - 1].value + " °С";

    //let options = { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    let tempDate = new Date()
    title.text = "Tочек: " + DATA.length + ". Обновлено " + tempDate.toLocaleString('en-US', options) + " Последняя точка " + DATA[DATA.length - 1].time.toLocaleString('en-US', options)

    document.getElementById("p1").innerHTML = "Update Charts ... OK";
    document.getElementById("t1").innerHTML = "Acc1: Update Charts";
    labelLog.text = "Update charts ... OK";
}


function updateCharts() {

    document.getElementById("p1").innerHTML = "Update Charts ... ";
    labelLog.text = "Update charts ...";
    console.log("updateCharts")

    let jj = 0
    for (jj = data1.length - 1; jj >= 0; jj--) { // поиск последнего значения value22
        if ("value22" in data1[jj]) {
            console.log("value22 = " + data1[jj].value22 + " at " + data1[jj].time + " [" + jj + "]")


            chart.addData({ // добавляем на график последнюю точку . также добавляется в data1 (?)
                // time: data1_new[data1.length - 1].time, value22: data1[data1.length - 1].value
            }, 0) // не удаляя первую

            break
        }
    }

    //chart.validateData(); // обновление данных графиков
    //chart2.validateData(); // обновление данных графиков
    // if (data1_new[data1_new.length - 2].time.getTime() > data1[data1.length - 1].time.getTime()) // предпоследняя точка новее последней в DATA
    // {
    //     console.log("fullUpdate")
    //     sort()
    //     chart.validateData() // обновление данных графиков
    // }
    // else {
    //     if (data1[data1.length - 1].time.getTime() > DATA[DATA.length - 1].time.getTime()) // точка новее последней
    //     {
    //         console.log("addingPoint")
    //         //console.log(DATA.length)

    //         //DATA.push({ time: data1[data1.length - 1].time, value1: data1[data1.length - 1].value, value2: data2[data2.length - 1].value }) // добавляем очередной элемент DATA

    //         //console.log(DATA.length)

    //         chart.addData({ // добавляем на график последнюю точку . также добавляется в DATA (?)
    //             time: data1[data1.length - 1].time, value1: data1[data1.length - 1].value, value2: data2[data2.length - 1].value
    //         }, 0) // не удаляя первую

    //         //console.log(DATA.length)
    //     }
    //     else
    //         console.log("no new data available")
    // }

    // if (data3[data3.length - 2].time.getTime() > tempData3) {
    //     console.log("charts[0]fullUpdate")
    //     charts[0].validateData() // обновление данных графиков
    // }
    // else {
    //     if ((data3[data3.length - 1].time.getTime() > tempData3)) {
    //         console.log("charts[0]addingPoint")
    //         charts[0].addData({ // добавляем на график последнюю точку . также добавляется в DATA (?)
    //             time: data3[data3.length - 1].time, value: data3[data3.length - 1].value
    //         }, 0)
    //     }
    //     else
    //         console.log("charts[0] no new data available")
    // }

    // tempData3 = data3[data3.length - 1].time.getTime()

    hand.showValue(Number(data1_new[data1_new.length - 1].value22 / 1000), 2000, am4core.ease.elasticOut);
    label.text = "[bold]" + data1_new[data1_new.length - 1].value22 / 1000 + " V";

    // hand2.showValue(Number(data2[data2.length - 1].value / 1000), 3000, am4core.ease.elasticOut);
    // label2.text = "[bold]" + data2[data2.length - 1].value / 1000 + " A";

    // hand3.showValue(Number(data3[data3.length - 1].value), 3000, am4core.ease.elasticOut);
    // label4.text = "[bold]" + data3[data3.length - 1].value + " %";

    // hand31.showValue(Number(data4[data4.length - 1].value), 3000, am4core.ease.elasticOut);
    // label41.text = "[bold]" + data4[data4.length - 1].value + " %";

    // hand4.showValue(Number(data5[data5.length - 1].value), 3000, am4core.ease.elasticOut);
    // label6.text = "[bold]" + data5[data5.length - 1].value + " °С";

    //let options = { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    let tempDate = new Date()
    title.text = "Tочек: " + data1.length + ". Обновлено " + tempDate + " Последняя точка " + data1[data1.length - 1].time

    document.getElementById("p1").innerHTML = "Update Charts ... OK";
    document.getElementById("t1").innerHTML = "Acc1: Update Charts";
    labelLog.text = "Update charts ... OK";
}


let interval4  // периодически вызываемая функция, не блокирует поток
function updateDataOn() {

    document.getElementById("p1").innerHTML = "Auto update ON";
    document.getElementById("t1").innerHTML = "Acc1: Auto update ON";
    labelLog.text = "Auto update ON";

    interval4 = setInterval(() => {

        document.getElementById("p1").innerHTML = "Reload Data";
        document.getElementById("t1").innerHTML = "Acc1: Reload Data";

        // console.log("ReloadData")
        // // запрос на сервер
        // console.log(`GET: ${config.apiBaseUrl}?action=sensor_data&station=${config.stationId}&sensor_name=voltage1`);

        // let oReq1 = new XMLHttpRequest();
        // oReq1.onload = reqListener1;
        // oReq1.open("get", `${config.apiBaseUrl}?action=sensor_data&station=${config.stationId}&sensor_name=voltage1`, true);
        // oReq1.send();

        // запрос на сервер
        console.log(`GET: ${config.apiBaseUrl}?action=station_last_values&station=${config.stationId}&count=1`);
        // запрос данных о rssi
        let oReq2 = new XMLHttpRequest();
        oReq2.onload = reqListener2;
        oReq2.open("get", `${config.apiBaseUrl}?action=station_last_values&station=${config.stationId}&count=1`, true);
        oReq2.send();


        console.time("oReq2.send()")

        interval5 = setInterval(() => {

            if (flagData1_new_ready == 1) {
                flagData1_new_ready = 0

                clearInterval(interval5)    // остановка функции

                updateCharts()              // обновление графиков

                console.timeEnd("oReq2.send()")
            }

        }, 1 * 100) // интервал 100 мсек
        //if ()

        //setTimeout(sort, 500) // запустить сортировку через 500 мс

        // setTimeout(updateCharts, 1500) // todo 

        //chartC1.validateData() // обновление данных графиков

    }, 20 * 1000) // интервал 5 сек

}

function updateDataOff() {
    clearInterval(interval4) // остановка функции
    document.getElementById("p1").innerHTML = "Auto update OFF";
    document.getElementById("t1").innerHTML = "Acc1: Auto update OFF";
    labelLog.text = "Auto update OFF";
}

function sort2() {
    let i = 0
    let tempKeys = []   // массив ключей
    let Key1 = "string"          // строка , имя ключа1

    let tempDate = new Date()
    console.log("Init tempDate=")
    console.log(tempDate)
    console.log("")

    data1.forEach((element) => {

        //console.log("time=")
        //console.log(element.time)
        //console.log("tempDate=")
        //console.log(tempDate)

        if (element.time.getTime() == tempDate.getTime()) {

            //console.log("==")

            //data2.    


        }
        else { // времена не равны, добавляем в data2 точку

            tempKeys = Object.keys(element) // получаем массив ключей

            Key1 = tempKeys[1]  //

            //console.log("Key1= " + Key1)


            //for (key in element) { // перебор всех свойств массива
            //console.log("VALUE = " + element[0]);
            //}
            //data2.push({ time: element.time, Key1: 100 })

            // add an arbitrary dynamic key with a dynamic value
            let key = Key1 // insanely complex calculations for the key
            val = element[key]; // insanely complex calculations for the value
            //data2[key] = val;

            //data2[i][key] = val

            //data2["time2"] = element.time
        }

        //element.time = new Date(element.time)                   // преобразование в объект Date
        //element.time.setHours(element.time.getHours() + 2);     // сдвиг на два часа вперед UTC+3 -> UTC+5

        tempDate = element.time

        //console.log("sort2 finish")
    });

}

function SeeklastCellParams() {

    let i = 0
    //------------------------------------ CellVoltage ----------------------------------
    for (i = data1.length - 1; i >= 0; i--) { // поиск последнего значения
        if ("value38" in data1[i]) {
            console.log("Cell1Voltage = value38 = " + data1[i].value38 + " [" + i + "]")
            DATA4[0].voltage = data1[i].value38
            break
        }
    }

    for (i = data1.length - 1; i >= 0; i--) { // поиск последнего значения
        if ("value39" in data1[i]) {
            console.log("Cell2Voltage = value39 = " + data1[i].value39 + " [" + i + "]")
            DATA4[1].voltage = data1[i].value39
            break
        }
    }

    for (i = data1.length - 1; i >= 0; i--) { // поиск последнего значения
        if ("value40" in data1[i]) {
            console.log("Cell3Voltage = value40 = " + data1[i].value40 + " [" + i + "]")
            DATA4[2].voltage = data1[i].value40
            break
        }
    }

    for (i = data1.length - 1; i >= 0; i--) { // поиск последнего значения
        if ("value41" in data1[i]) {
            console.log("Cell3Voltage = value41 = " + data1[i].value41 + " [" + i + "]")
            DATA4[3].voltage = data1[i].value41
            break
        }
    }

    for (i = data1.length - 1; i >= 0; i--) { // поиск последнего значения
        if ("value42" in data1[i]) {
            console.log("Cell3Voltage = value42 = " + data1[i].value42 + " [" + i + "]")
            DATA4[4].voltage = data1[i].value42
            break
        }
    }

    //------------------------------------ CellQmax ----------------------------------
    for (i = data1.length - 1; i >= 0; i--) { // поиск последнего значения
        if ("value43" in data1[i]) {
            console.log("Cell1QMax = value43 = " + data1[i].value43 + " [" + i + "]")
            DATA4[0].qmax = data1[i].value43
            break
        }
    }

    for (i = data1.length - 1; i >= 0; i--) { // поиск последнего значения
        if ("value44" in data1[i]) {
            console.log("Cell2QMax = value44 = " + data1[i].value44 + " [" + i + "]")
            DATA4[1].qmax = data1[i].value44
            break
        }
    }

    for (i = data1.length - 1; i >= 0; i--) { // поиск последнего значения
        if ("value45" in data1[i]) {
            console.log("Cell3QMax = value45 = " + data1[i].value45 + " [" + i + "]")
            DATA4[2].qmax = data1[i].value45
            break
        }
    }

    for (i = data1.length - 1; i >= 0; i--) { // поиск последнего значения
        if ("value46" in data1[i]) {
            console.log("Cell4QMax = value46 = " + data1[i].value46 + " [" + i + "]")
            DATA4[3].qmax = data1[i].value46
            break
        }
    }

    for (i = data1.length - 1; i >= 0; i--) { // поиск последнего значения
        if ("value47" in data1[i]) {
            console.log("Cell5QMax = value47 = " + data1[i].value47 + " [" + i + "]")
            DATA4[4].qmax = data1[i].value47
            break
        }
    }
}




function playAudio() {
    var myAudio = new Audio;
    myAudio.src = "Sound_11342.wav";
    myAudio.play();
}

function playAudio1() {
    sound1.play();
}