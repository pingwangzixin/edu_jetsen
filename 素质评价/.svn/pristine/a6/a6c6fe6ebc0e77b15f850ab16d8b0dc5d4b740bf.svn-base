/*
	<div class="scrollMain" id="ss"></div>
	外层div为规定区域 要有高度传递
	页面需运行 autoScroll("id")
*/
function autoScroll(obj){
	var obj = document.getElementById(obj);
	if(obj){
		obj.style.width = "100%";//防止多次点击无限加宽
		var width = obj.offsetWidth + 17;
		obj.style.width = width+"px";
	}
	else{
		//alert("没有id"+obj);
	}
}
function show_fade(btn,box){//无bug 触摸显示隐藏
	var btn = document.getElementById(btn);
	if(btn){
		var btn_box = document.getElementById(box);
		btn.tim = null;
		clearTimeout(btn.tim)
		btn.onmouseover = function(){
			clearTimeout(btn.tim)
			btn_box.style.display = "block";
		}
		btn.onmouseout = function(){
			btn.tim = setTimeout(function(){
				btn_box.style.display = "none";
			},1000);
		}
		btn_box.onmouseover = function(){
			clearTimeout(btn.tim)
		}
		btn_box.onmouseout = function(){
			btn.tim = setTimeout(function(){
				btn_box.style.display = "none";
			},500);
		}
	}
}

var minderwidth = {
	//true  为显示
	l:true,
	r:true
}
	
function mindWidth(typeArr){//改变内容区域的宽度定义
	
	var window_W = $(window).width();
	
	if(typeArr){
		var l = typeArr[0];
		var r = typeArr[1];
		
		minderwidth.l = typeArr[0];
		minderwidth.r = typeArr[1];
	}
	else{
		var l = minderwidth.l;
		var r = minderwidth.r;
	}
	
	var width_now = $("#mind_box").width();
	
	if(l==true && r==true){
		//alert("左右全开")
		$("#mind_box").css({//脑图的宽度最初设定
			"width":(window_W-280-320-10)+'px',
			"marginLeft":"285px",
		});
		$("#mind_boxMain").css({
			"width":(window_W-280-320-10)+'px'
		});
	}
	
	if(l==false && r==true){
		//alert("右面单开");
		$("#mind_box").css({//脑图的宽度最初设定
			"width":(window_W-320-10)+'px',
			"marginLeft":"5px",
		});
		$("#mind_boxMain").css({
			"width":(window_W-320-10)+'px',
		});
	}
	
	if(l==true && r==false){
		//alert("左面单开")
		$("#mind_box").css({//脑图的宽度最初设定
			"width":(window_W-280-10)+'px',
			"marginLeft":"285px",
		});
		$("#mind_boxMain").css({
			"width":(window_W-280-10)+'px',
		});
	}
	
	if(l==false && r==false){
		//alert("两面全开");
		$("#mind_box").css({//脑图的宽度最初设定
			"width":(window_W-10)+'px',
			"marginLeft":"5px",
		});
		$("#mind_boxMain").css({
			"width":(window_W-10)+'px',
		});
	}

}

/*1*/
function toolAction(typeArr){//右侧
	/*
		脑图盒子 mind_box
	*/
	mindWidth(typeArr);
	
	$("#btn_infoHide").click(function(){
		$("#infoShow").stop().animate({"right":"-320px"},function(){
			$("#btn_infoHide").hide();
			$("#btn_infoShow").show().animate({"left":"-20px"});
		});
		//
		minderwidth.r=false;
		mindWidth();
	});
	$("#btn_infoShow").click(function(){
		$("#btn_infoShow").animate({"left":"-0px"},function(){
			$("#btn_infoShow").hide();
			$("#btn_infoHide").show();
			$("#infoShow").animate({"right":"0px"});
		});
		//
		minderwidth.r=true;
		mindWidth();
	});
}
/*2*/
function listAction(){//左侧
	$("#list_infoHide").click(function(){
		$("#listShow").stop().animate({"left":"-280px"},function(){
			$("#list_infoHide").hide();
			$("#list_infoShow").show().animate({"left":"280px"});
		});
		//
		minderwidth.l=false;
		mindWidth();
	});
	$("#list_infoShow").click(function(){
		$("#list_infoShow").animate({"left":"0px"},function(){
			$("#list_infoShow").hide();
			$("#list_infoHide").show();
			$("#listShow").animate({"left":"0px"});
			JTscrollbar("my");//在界面运行完高度判断之后
		});	
		//
		minderwidth.l=true;
		mindWidth();
	});
}
/*3 左侧滚动条*/
function leftRollbar(c){
	var window_H = $(window).height();
	
	if(c){
		$("div.mainContent").css("height",window_H);
		$("#mr").css("height",window_H-45);
	}else{
		$("div.mainContent").css("height",window_H-81);
		$("#mr").css("height",window_H-81-45);
	}
	
	JTscrollbar("my");//在界面运行完高度判断之后
	JTscrollbar("mr");//界面在经过刷新的时候需要重新运行
}
/*4 信息提示框 */
/*
	样例
	msgalert()是为了调用的时候 写的东西少点 给包了一层 MessageAlert({json})
	function msgalert(){
		MessageAlert({
			title:"这里填充标题", 			
			info:"填充内容进去的内容",		
			fnbak:function(){
				
			},		
			fngo:function(){
				
			}
		});
	}
*/
function MessageAlert(JsonStr){
	//框架模版
	/*
		*为必填项目
		#MessBg 	灰色背景
		#MessBox	Message框
		#MessTit	Message标题
		#MessInfo	Message内容
		#MessBak	取消
		#MessGo		确定
		
		JsonStr = {
			title:"标题", 			
			info:"填充内容/isPrompt",		*
			left:10%,
			css:{"width":"","height":""},
			fnbak:function(){
				//取消按钮回调函数
			},		
			fngo:function(e){ //e为 fngo的传参
				//确定按钮回调函数
			}
		}
	*/
	var Json = JsonStr;
	var difNum = parseInt(Math.random()*100000);
	
	if(Json){
		
		var str='<div class="MessageBg" id="MessBg'+difNum+'"></div>'+
				'<div class="MessageBox" id="MessBox'+difNum+'">'+
					'<dl class="box">'+
						'<dt class="tit" id="MessTit'+difNum+'">'+
							'系统提示'+
						'</dt>'+
						'<dd class="info">'+
							'<div class="intext" id="MessInfo'+difNum+'">'+
								'内容填充区域内容填'+
							'</div>'+
						'</dd>'+
						'<dd class="MessageBtn">'+
//							'<input id="MessBak'+difNum+'" class="btn bak" type="button" value="取消"/>'+
							'<input id="MessGo'+difNum+'" class="btn go" type="button" value="确定"/>'+
						'</dd>'+
					'</dl>'+
				'</div>';
		
		
		$("body:eq(0)").append(str);//添加到页面
		
		if(Json.title){//标题
			$("#MessTit"+difNum).html(Json.title);
		}
		
		if(Json.left){//左侧边距
			$("#MessBox"+difNum).css({"left":Json.left});
		}
		
		if(Json.css){//样式
			$("#MessBox"+difNum).css(Json.css);
		}
		
		if(Json.info){//内容
			//prompt
			if(Json.info == "isPrompt"){
				$("#MessInfo"+difNum).html("<input class='messageAlertText' type='text' value='0' />");
			}
			//其余展示的内容
			else{
				$("#MessInfo"+difNum).html(Json.info);
			}
		}
		
		$("#MessGo"+difNum).click(function(){//确定
			
			//当为prompt状态时 获取其值并且 返回到 Json.fngo(str) 参数调用
			var str = $("#MessInfo"+difNum+" input.messageAlertText").val();
			
			$("#MessBg"+difNum).remove();
			$("#MessBox"+difNum).remove();
			
			if(Json.fngo){//确定回调函数
				Json.fngo(str);
			}
		});
		$("#MessBak"+difNum).click(function(){//取消
					
			$("#MessBg"+difNum).remove()
			$("#MessBox"+difNum).remove()
			
			if(Json.fnbak){//取消回调函数
				Json.fnbak();
			}
		});
		
	}
	else{
		alert("没有必要的传输Json")
	}
}

/* 5 滚动无限刷新 */
function textRollshow(Json){
	var box = Json.box;
	var main = Json.main;
	var h="";
	(Json.h)?h = Json.h:h=0;
	
	var addH = 100; //盒子内容多增加的padding值
	var boxHeight = $("#"+box).height();//盒子高度
	$("#"+box).scroll(function(){
		var mainHeight = $("#"+main).height()+addH;
		var top = $("#"+box).scrollTop();
		if((top+boxHeight)==(mainHeight-h)){
			//$("#"+main).append(strLi)
			Json.Fn();
		}
		//document.title=(top+boxHeight)+"||"+mainHeight;
	});
}











































