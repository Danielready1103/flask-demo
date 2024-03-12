// 取得主繪製區域
const myChart = echarts.init(document.getElementById('main'));
// 呼叫後端資料跟繪製
drawPM25();

// 取得後端資料
function drawPM25() {
    $.ajax(
        {
            url: "/pm25-data",
            type: "GET",
            dataType: "json",
            success: (result) => {
                //console.log(result);
                //繪製對應區塊並給予必要參數
                drawChat(myChart, result["datetime"], "PM2.5", result["site"], result["pm25"])
            }
        }
    )
}

function drawChat(chart, title, legend, xData, yData) {
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
                data: yData
            }
        ]
    };

    chart.setOption(option);
}