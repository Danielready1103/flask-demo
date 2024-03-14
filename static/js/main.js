// 取得主繪製區域
const chart1 = echarts.init(document.getElementById('main'));
const chart2 = echarts.init(document.getElementById('six'));
const chart3 = echarts.init(document.getElementById('county'));

$("#update").click(() => {
    drawPM25();
});

//select選擇option時的監聽
$("#select_county").change(() => {
    //val=>value (option value)
    county = $("#select_county").val();
    console.log(county);
    drawCountyPM25(county);
});

// 呼叫後端資料跟繪製
drawPM25();

window.onresize = function () {
    chart1.resize();
    chart2.resize();
    chart3.resize();
};


//制定製圖工具
function drawChat(chart, title, legend, xData, yData, color = '#a90000') {
    let option = {
        title: {
            text: title
        },
        tooltip: {},
        legend: {
            data: [legend]
        },
        xAxis: {
            data: xData
        },
        yAxis: {},
        series: [
            {
                name: legend,
                type: 'bar',
                data: yData,
                itemStyle: {
                    color: color
                }
            }
        ]
    };

    chart.setOption(option);
}

// 取得後端資料
function drawPM25() {
    chart1.showLoading();
    $.ajax(
        {
            url: "/pm25-data",
            type: "GET",
            dataType: "json",
            success: (result) => {
                $(pm25_high_site).text(result["highest"]["site"])
                $(pm25_high_value).text(result["highest"]["pm25"])
                $(pm25_low_site).text(result["lowest"]["site"])
                $(pm25_low_value).text(result["lowest"]["pm25"])

                //console.log(result);
                //繪製對應區塊並給予必要參數
                drawChat(chart1, result["datetime"], "PM2.5", result["site"], result["pm25"], "blue")
                chart1.hideLoading();

                this.setTimeout(() => {
                    drawSixPM25();
                    drawCountyPM25("彰化縣");
                }, 1000);
            },
            error: () => {
                alert("讀取資料失敗，糗稍後再試。")
                chart1.hideLoading();
            }
        }
    )
}

function drawSixPM25() {
    chart2.showLoading();
    $.ajax(
        {
            url: "/six-pm25-data",
            type: "GET",
            dataType: "json",
            success: (result) => {
                //console.log(result);
                //繪製對應區塊並給予必要參數
                this.setTimeout(() => {
                    drawChat(chart2, "六都PM2.5平均值", "PM2.5", result["site"], result["pm25"], 'green')
                }, 1000);
                chart2.hideLoading();
            },
            error: () => {
                alert("讀取資料失敗，糗稍後再試。")
                chart2.hideLoading();
            }
        }
    )
}

function drawCountyPM25(county) {
    chart3.showLoading();
    $.ajax(
        {
            url: `/county-pm25-data/${county}`,
            type: "GET",
            dataType: "json",
            success: (result) => {
                //console.log(result);
                //繪製對應區塊並給予必要參數
                this.setTimeout(() => {
                    drawChat(chart3, county, "PM2.5", result["site"], result["pm25"])
                }, 1000);
                chart3.hideLoading();
            },
            error: () => {
                alert("讀取資料失敗，糗稍後再試。")
                chart3.hideLoading();
            }
        }
    )
}

