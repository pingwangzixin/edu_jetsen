var second = 0;

window.setInterval(function() {
	second++;
}, 1000);

/*结束时保存设备状态必须使用beforeunload*/
window.onbeforeunload = function() {
	var dataArr = {
		'userId': sessionStorage.getItem("userId"),
		'moduleName': sessionStorage.getItem("moduleName"),
		'time': second + '秒',
		'startTime': Date.parse(new Date()),
		'endTime': Date.parse(new Date()) + (second * 1000)
	};
	var url = "http://192.168.9.120:7000/jeuc/api/uc/behavior";
	$.ajax({
		type: "POST",
		url: url,
		async: false, //必须采用同步方法
		data: dataArr,
		success: function(res) {
			console.log(res)
		}
	});
};