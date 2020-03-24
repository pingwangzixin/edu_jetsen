/**
 * 获取json文件
 */
function getJson(selectType, quzTypeTitle, callback) {
//	alert(123)
    var typeName;
    var type;
    var capitalLetterArr = [];
	var lowercaseLetterArr = [];
    $.ajax({
        type: "get", //请求方式
        url: "json/data.json", //地址，就是json文件的请求路径
        async: false, //同步请求
        dataType: "json", //数据类型可以为 text xml json  script  jsonp
        success: function(data) { //返回的参数就是 action里面所有的有get和set方法的参数
            if(selectType == "largeTitle") {
                for(var i = 0; i < data.largeTitle.length; i++) {
                    if(quzTypeTitle.indexOf(data.largeTitle[i].name) != -1) {
                        typeName = data.largeTitle[i].name;
                        type = data.largeTitle[i].type;
                    }
                }
            } else if(selectType == "quzType") {
                for(var i = 0; i < data.quzType.length; i++) {
                    if(quzTypeTitle.indexOf(data.quzType[i].name) != -1) {
                        type = data.quzType[i].type;
                        typeName = data.quzType[i].name;
                    }
                }
            }else if(selectType == "capitalLetter"){
            	capitalLetterArr = data.capitalLetter;
            }else if(selectType == "lowercaseLetters"){
            	lowercaseLetterArr = data.lowercaseLetters;
            }else if(selectType == "letter"){
            	capitalLetterArr = data.capitalLetter;
            	lowercaseLetterArr = data.lowercaseLetters;
            }
        }
    });
//  if(type != undefined) {
        return {
        	"typeName":typeName,
			"type":type,
            "capitalLetterArr":capitalLetterArr,
            "lowercaseLetterArr":lowercaseLetterArr
        };
//  }
}

// 唯一的随机id
function Yrandom() {
	function S4() {
		return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}

	function guid() {
		return(S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	}
	return myID = guid();
}

// 添加小题模板
var template = '<li class="clearfix">'
				+'<span class="btn fr">'
					+'<b class="btn_edit">编辑</b>'
					+'<b class="btn_move">移动</b>'
					+'<b class="btn_merge">与上题合并</b>'
					+'<b class="btn_split">拆分</b>'
					+'<b class="btn_delete">删除</b>'
				+'</span>'
				+'<span class="btn fr">'
					+'<b class="btn_sure">确认</b>'
					+'<b class="btn_cancel">取消</b>'
				+'</span>'
				+'<div class="question_option">'
					+'<div class="question_type clearfix">'
						+'<b class="fl tit_num">1.</b> '
						+'<select class="fl" name="">'
							+'<option value="请选择题型">请选择题型</option>'
							+'<option value="2" data-val="single">单选</option>'
							+'<option value="4" data-val="multiple">多选</option>'
							+'<option value="1" data-val="judge">判断</option>'
							+'<option value="6" data-val="short_answer">简答</option>'
						+'</select>'
						+'<div class="question_template fl">'
							+'<span class="fl">答案</span>'
							+'<div class="all_tem single fl">'
								+'<ul class="fl">'
									+'<li>A</li>'
									+'<li>B</li>'
									+'<li>C</li>'
									+'<li>D</li>'
									+'<li class="btn fl">'
										+'<img src="../img/plus.png" class="plus" />'
										+'<img src="../img/reduce.png" class="reduce" />'
									+'</li>'
								+'</ul>'
							+'</div>'
							+'<div class="all_tem multiple fl">'
								+'<ul class="fl">'
									+'<li>A</li>'
									+'<li>B</li>'
									+'<li>C</li>'
									+'<li>D</li>'
									+'<li class="btn fl">'
										+'<img src="../img/plus.png" class="plus"/>'
										+'<img src="../img/reduce.png" class="reduce"/>'
									+'</li>'
								+'</ul>'
							+'</div>'
							+'<div class="all_tem judge fl">'
								+'<ul class="fl">'
									+'<li answer="08T">对</li>'
									+'<li answer="08F">错</li>'
								+'</ul>'
							+'</div>'
						+'</div>'
					+'</div>'
				+'</div>'
				+'<div class="qusetion_main">'
					+'<div class="normal_state">'
						+'<div class="echo_content stem_cont"></div>'
							+'<div class="analysis_cont clearfix">'
								+'<span class="fl">解析：</span>'
								+'<div class="echo_content fl"></div>'
							+'</div>'
						+'</div>'
						+'<div class="edit_state">'
							+'<div class="stem_cont">'
								+'<div class="editor_unified" id=""></div>'
							+'</div>'
							+'<div class="analysis_cont">'
								+'<span>解析：</span>'
								+'<div class="editor_unified" id=""></div>'
							+'</div>'
							+'</div>'
						+'</div>'
						+'<div class="img_zoom">'
						+'<div class="img_zoom_btn clearfix">'
						+'<b class="narrow fl">－</b>'
						+'<b class="enlarge fl">＋</b>'
					+'</div>'
				+'</div>'
			+'</li>';

$(function() {
	var htmlArr = [];
	//加载年级
	showGrade();
	// 点击识别试题
	//用来匹配每道题开始的各种点
	var reg1 = /(<[^>]*>)(\d*\.?．?)(.*)/
	//匹配每道题开始的各种点，但是保留img标签，为了防止有的两位数题号之间有图片，保留下来,并去掉点之前的题号
	var reg2 = /(<[^>]*>)(<img[^>]*>)(\d*\.?．?)(.*)/
	//匹配到原定义的题有给的分数，将分数，括号，匹配
	var reg3 = /(<[^>]*>)([（(]\d*分[)）])(.*)/
	//匹配到原定义的题有给的分数，将分数，括号，匹配，保留img标签，防止中间有img标签
	var reg4 = /(<[^>]*>)(<img[^>]*>)([（(]\d*分[)）])(.*)/
	//用来匹配题号中间有空格，去掉空格
	var reg_null = /<([a-z]+?)(?:\s+?[^>]*?)?>\s*?<\/\1>/ig;
	// 用来去大题题号
	var importSection= /(^\s*<p(?:\s+[^>]*)?>(?:<[^>]+>)*)\s*([〇一二三四五六七八九十]+)((?:<\/[^>]+>)*\s*(?:<[^>]+>)*)[，。；,\.．;、]/i;
	//删除ol和li标签，后台没有去除的原因因为ol自动排序题号，后台删除以后就没有题号进行区分
	var filter_p = /<p[^>]*>[^<]*<\/p>/g;
	var filter_li = /<li[^>]*>/g;
	var filter_li_end = /<\/li>/g;
	var filter_ol = /<\/?ol[^>]*>/g;
	//去掉特殊字符,过滤两个，一种是p标签里只有特殊字符，那么过滤掉标签和特殊字符，如果内容中有部分特殊字符，那么只过滤特殊字符
	var filter_special_font1 = /<p>&#xa0;<\/p>/g;
	var filter_special_font2 = /&#xa0;/g;
	//去空格
	var filter_space = /\s*/g;
	//	匹配img标签，给该标签加样式
	var regex1 = new RegExp("(i?)(\<img)(?!(.*?style=['\"](.*)['\"])[^\>]+\>)", "gmi");
	var regex2 = new RegExp("(i?)(\<img.*?style=['\"])([^\>]+\>)", "gmi");
	
	//数字正则
	var filter_number = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
	//字母正则
	var filter_letter= /^[A-Za-z]+$/;
	var htmlArr = [];
	var htmlGroup = [];
	//点击识别试题
	function clickMethod() {
		//获取选定区域的内容
//importData = '<div id="dd" style="display: none;">'
//					+ importData
//					+ '</div>';
		var objF = $('#dd');
//		var objF = $(importData);

		//查找是否有ol标签
		var myObj = objF.children();
		var contentArr = [];
		//每一行的内容
		var lineContent;
		//li标签对象
		var li_Obj ;
		//li标签内容
		var liContent;
		//技术规则
		var num = 0;
		//正文内容
		var textContent;
		//截取部分内容
		var strContent;
		//大题题号集合
		var largeArr = [];
		//小题号
		var quzTypeArr = [];
		var quzTypeInt = [];
		var subtitleArr = [];
		//ol标签类型
		var ol_type;
		//下标		
		var thisIndex;
		//字母数组
 		var letterObj = [];
		//最终集合
		var quzList = new Array()
		//循环ol标签
		for (var i = 0; i < myObj.length; i++) {
			lineContent = myObj[i].outerHTML;
			//如果包含ol标签，那么进行循环去标签
			if(lineContent.indexOf("<ol") != -1){
				//获取ol标签下的li标签
				li_Obj = $(myObj[i]).children();
				//查看ol标签的type值，如果没有，默认是数字1
				if($(myObj[i]).context.type == "" || $(myObj[i]).context.type == null ){
					ol_type = 1;
				}else{
					ol_type = $(myObj[i]).context.type;
				}
				//查看类型是否是数字
				if(filter_number.test(ol_type)){
					num = ol_type-1;
					//循环li标签，将li标签替换为p标签并添加索引
					for (var j = 0; j < li_Obj.length; j++) {
						//因为存在一个ol标签下有多个题，所有，每个li进行+1进行题号赋值
						num = num + 1;
						liContent = li_Obj[j].outerHTML.replace(filter_p,'').replace(filter_li,'<p>'+num+'.'+'').replace(filter_li_end,'</p>');
						contentArr.push(liContent)
					}		
				}else if(filter_letter.test(ol_type)){
					console.log(ol_type);
//					capitalLetterArr,lowercaseLetterArr
					letterObj = getJson("letter", null);
					if(letterObj.capitalLetterArr.indexOf(ol_type) != -1){//capitalLetterArr-大写
						thisIndex = letterObj.capitalLetterArr.indexOf(ol_type);
						//循环li标签，将li标签替换为p标签并添加索引
						for (var j = 0; j < li_Obj.length; j++) {
							//根据下标获取当前的排序类型
							num = thisIndex + j;
							liContent = li_Obj[j].outerHTML.replace(filter_p,'').replace(filter_li,'<p>'+letterObj.capitalLetterArr[num]+'.'+'').replace(filter_li_end,'</p>');
							contentArr.push(liContent)
						}
					}else{//lowercaseLetterArr-小写
						thisIndex = letterObj.lowercaseLetterArr.indexOf(ol_type);
						//循环li标签，将li标签替换为p标签并添加索引
						for (var j = 0; j < li_Obj.length; j++) {
							//根据下标获取当前的排序类型
							num = thisIndex + j;
							liContent = li_Obj[j].outerHTML.replace(filter_p,'').replace(filter_li,'<p>'+letterObj.lowercaseLetterArr[num]+'.'+'').replace(filter_li_end,'</p>');
							contentArr.push(liContent)
						}
					}
					
					
				}else{
					alert("发现新的排序类型，当前未支持……")
				}
			}else{
				contentArr.push(myObj[i].outerHTML)
			}
		}
		//最终的要处理的集合
//		console.log(contentArr)
		//处理正文内容
		for (var i = 0; i < contentArr.length; i++) {
			//正文内容
			textContent = contentArr[i];
			strContent = $(textContent)[0].innerText.replace(filter_space,"");
			//如果长度大于5，截取前五位正文内容
			if(strContent.length > 5) {
				strContent = strContent.substring(0, 5);
			}
			//扫描出大题题号
			var largeObj = getJson("largeTitle", strContent);
			//大题题号
			if(largeObj != undefined) {
				var largeNum = largeObj.type;
				if(largeNum != null && largeNum != "") {
					largeArr.push(i);
				}
			}
			//循环小题题号
			var nums = sux(strContent);
			if(nums != undefined ){
				subtitleArr.push(i);
			}
		}
		console.log("大题开始下标" + largeArr)
		console.log("小题号开始下包集合：" + subtitleArr)
		/**
		 * 去除提大题标识,进行倒叙循环
		 */
		for(var i = 0; i < subtitleArr.length; i++) {
			var ss = "";
			var examType = 0;
			// 遍历大题，去掉题目
			for(var s = 0; s < largeArr.length; s++) {
				if(subtitleArr[i] < largeArr[s] && largeArr[s] < subtitleArr[i + 1]) {
					ss = contentArr.slice(subtitleArr[i], largeArr[s]);
					break;
				} else {
					if(!isNaN(subtitleArr[i + 1])) {
						ss = contentArr.slice(subtitleArr[i], subtitleArr[i + 1]);
					} else {
						ss = contentArr.slice(subtitleArr[i], subtitleArr[i + 10]);
					}
				}
			}
			var str1 = ss[0].replace(reg1, '$1$3').replace(reg2, '$1$2$4').replace(reg3, '$1$3').replace(reg4, '$1$2$4');
			for(var q = 0; q < ss.length; q++) {
				ss[q] = ss[q].replace(regex1, "$2 style=\"\"$3");
				ss[q] = ss[q].replace(regex2, "$2width:auto;$3");
				ss[q] = ss[q];
			}
			str1 = str1.replace(regex1, "$2 style=\"\"$3");
			str1 = str1.replace(regex2, "$2width:auto;$3");

			ss[0] = str1;
			ss = ss.join('');

			var reg_null = /<([a-z]+?)(?:\s+?[^>]*?)?>\s*?<\/\1>/ig;
			ss = ss.replace(reg_null, "");
			// console.log(ss)

			var divCont = '<div>' + ss + '</div>';
			htmlArr.push(divCont);
			htmlArr.push('<div></div>');
			$('.zy_import_part_lower .task_list').append(template);

			// ss = ss.toString().replace(/[\r\n\t]/g, "")
			for(var j = 0; j < largeArr.length; j++) {
				if(subtitleArr[i] > largeArr[j]) {
					examType = quzTypeInt[j];
				}
			}
			$("#" + (i + 1)).append('<input type="button" value=题类型："' + examType + '">&nbsp;');
			// 请求调用去除html方法
			// sendHtml(ss, examType);
		}


	}

	// 截取指定字符或得题号，通过点的最后一位，如果是0-9之间的数字，那么判定符合条件
	function sux(strr) {
		var numbers;
		var numArr = [0,1,2,3,4,5,6,7,8,9];
		if(strr.indexOf(".") != -1) {
			numbers = strr.split(".")[0];
		} else if(strr.indexOf("．") != -1) {
			numbers = strr.split("．")[0];
		} else if(strr.indexOf("．") != -1) {
			numbers = strr.split("．")[0];
		} else if(strr.indexOf("、") != -1) {
			numbers = strr.split("、")[0];
		} else {
			console.log("识别异常---sux");
		}
		if(numbers != undefined) {
			numbers = numbers.replace(filter_space, "");
			var lastNum = parseInt(numbers.charAt(numbers.length-1));
			if(numArr.indexOf(lastNum) != -1){
				return lastNum;
			}else{
				return undefined;
			}
		}else{
			return undefined;
		}
	}

	function judgeTitle(strr) {
		var content;
		if(strr.indexOf(".") != -1) {
			content = strr.split(".");
		} else if(strr.indexOf("．") != -1) {
			content = strr.split("．");
		} else if(strr.indexOf("．") != -1) {
			content = strr.split("．");
		} else if(strr.indexOf("、") != -1) {
			content = strr.split("、");
		} else {
			console.log("识别异常---judgeTitle");
		}
		content.shift();
		return content.toString();
	}

	clickMethod();

	var posData = {
		editorHeadHeight: 31,						// 编辑器编辑头高度，固定
		imgZoomHeight: $('.img_zoom').height() + 6, // 缩放按钮高度，固定
		liPaddingTop: 22, 							// 父级li上内边距，固定
		liPaddingLeft: 10, 							// 父级li左内边距，固定
		questionHeight: 0, 							// 题型及选项高度，不固定
		questionBottom: 10, 						// 题型及选项下外边距，固定
		prevEditorHeight : 0,						// 题干高度(uedtior)
		analysisTitHeight : 35						// 解析标题高度
	};	
	// console.log(posData)
	
	// 图片缩放大小按钮展示/位置计算
	function imgZoomBtn(obj,type){
// console.log(obj.find('iframe').eq(0))
		posData.prevEditorHeight = type == 'analysis' ? posData.prevEditorHeight = obj.parents('.edit_state').find('.stem_cont').height() : 0;
// $('iframe').contents().find("img").on('click', function() {
		obj.find('iframe').contents().find("img").on('click', function() {
			obj.parents('.edit_state').find('.editor_unified iframe').contents().find("img").removeAttr('class');
// $(this).parents(document).contents().find("img").removeAttr('class');
			$(this).attr('class', 'last_img');
			if(!$(this).attr('zoom')) {
				$(this).attr('zoom', 0);
			}
			if(!$(this).attr('init-w')) {
				$(this).attr('init-w', $(this).css('width'));
			}

			var selectedObj = $(window.parent.document).find('.task_list>li.last_active');
			posData.questionHeight = selectedObj.find('.question_option').height();

			if(type == 'analysis'){
				var top = $(this).offset().top + posData.editorHeadHeight + posData.questionHeight + posData.questionBottom + posData.liPaddingTop + posData.prevEditorHeight + posData.analysisTitHeight - posData.imgZoomHeight;
			}else{
				var top = $(this).offset().top + posData.editorHeadHeight + posData.questionHeight + posData.questionBottom + posData.liPaddingTop - posData.imgZoomHeight;
			}
			var left = $(this).offset().left + posData.liPaddingLeft;
			selectedObj.find('.img_zoom').css({
				'left': left + 'px',
				'top': top + 'px'
			}).show();
		})
	}

	// 实例化编辑器组
	var ue = [];
	$('.editor_unified').each(function(index, ele) {
		var _this = $(this);
		$(this).attr('id', 'editor_' + Yrandom());
		var ueNUm = $(this).attr('id');
		ue.push(UE.getEditor(ueNUm, {
			initialFrameHeight: 100,
			// initialFrameWidth : 400,
			scaleEnabled: false
		}));
		ue[index].ready(function() {
// console.log(htmlArr[index])
			ue[index].execCommand('insertHtml', htmlArr[index], true);
// console.log(ue[index].getContent())
			_this.parents('.qusetion_main').find('.echo_content').first().html(ue[index].getContent());
			if(index < $('.editor_unified').length - 1) {
				_this.parents('.qusetion_main').find('.echo_content').last().html(ue[index + 1].getContent());
			}
		});
		// $(this).parents('li').find('iframe').contents().find('img');('textarea[name="content"]').val()
// ue[index].addListener('click', imgZoomBtn);
		/*
		 * ue[index].addListener('click', function() {
		 * $('iframe').contents().find("img").on('click', function() {
		 * $(this).parents(document).contents().find("img").removeAttr('class');
		 * $(this).attr('class', 'last_img'); if(!$(this).attr('zoom')) {
		 * $(this).attr('zoom', 0); } if(!$(this).attr('init-w')) {
		 * $(this).attr('init-w', $(this).css('width')); }
		 * 
		 * var selectedObj =
		 * $(window.parent.document).find('.zy_import_part_lower
		 * .task_list>li.last_active'); posData.questionHeight =
		 * selectedObj.find('.question_option').height(); console.log(posData);
		 * 
		 * var left = $(this).offset().left + posData.liPaddingLeft; var top =
		 * $(this).offset().top + posData.editorHeadHeight +
		 * posData.questionHeight + posData.questionBottom +
		 * posData.liPaddingTop - posData.imgZoomHeight;
		 * selectedObj.find('.img_zoom').css({ 'left': left + 'px', 'top': top +
		 * 'px' }).show(); }) });
		 */
		// console.log(window.frameElement && window.frameElement.id || '')
	});
	
	
	// 数据加载遮罩
	var loadTimer = setInterval(function (){
		if($('.task_list>li').eq($('.task_list>li').length - 1).find('.normal_state .echo_content').html() != ''){
			$('.waiting_box').hide();
			clearInterval(loadTimer);
		}else{
			$('.waiting_box').show();
		}
	},500);

	// 小题鼠标移入移出
	$(document).on('mouseover', '.zy_import_part_lower .task_list>li', function() {
		$(this).addClass('active');
		if($(this).children('span.btn').last().css('display') == 'none') {
			$(this).children('span.btn').first().show();
		}
	});
	$(document).on('mouseout', '.zy_import_part_lower .task_list>li', function() {
		if($(this).children('span.btn').last().css('display') == 'none') {
			$(this).removeClass('active');
		}
		$(this).children('span.btn').first().hide();
	});

	// 选择题型 展示不同答案模板
	$(document).on('click', '.zy_import_part_lower .question_type select', function() {
		var templeteObj = $(this).siblings('.question_template').find('.all_tem');
		for(var i = 0; i < templeteObj.length; i++) {
			if(templeteObj.eq(i).hasClass($(this).children('option:selected').attr('data-val'))) {
				templeteObj.eq(i).show().siblings('div').hide().siblings('span').show();
				return;
			} else {
				templeteObj.eq(i).parent('.question_template').children().hide();
			}
		}
	});

	// 单选/判断Tab切换
	$(document).on('click', '.single li:not(".btn"),.judge li:not(".btn")', function() {
		$(this).addClass('active').siblings('li').removeClass('active');
	});

	// 多选
	$(document).on('click', '.multiple li:not(".btn")', function() {
		$(this).toggleClass('active');
	});

	// 单选/多选添加选项
	var optionArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
// var optionArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
// 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	$(document).on('click','.task_list>li .single .plus,.task_list>li .multiple .plus',function (){
		for(var i=0;i<optionArr.length;i++){
			if(i<optionArr.length-1 && ($(this).parent().prev().text() == optionArr[i])){
				$(this).parent().before('<li>'+optionArr[i+1]+'</li>')	
				return;
			}else if(i>=optionArr.length-1){
				// success/fail/warning
				promptTimer('warning','最多添加10项');
				return;
			}
		}
	});
	
	// 单选/多选删除选项
	$(document).on('click','.task_list>li .single .reduce,.task_list>li .multiple .reduce',function (){
		if($(this).parent('li').parent('ul').children().length > 5){
			$(this).parent().prev('li').remove();	
		}else{
			// success/fail/warning
			promptTimer('warning','最少保留4项');
		}
	});

	// 获取当前鼠标选中题
	$(document).on('mouseover', '.zy_import_part_lower .task_list>li.active', function() {
		$(this).siblings('li').removeClass('last_active');
		$(this).addClass('last_active');
	});

	// 编辑按钮展示题干及解析编辑器事件
	$(document).on('click', '.task_list>li>.btn b.btn_edit', function() {
		$(this).parents('li').addClass('li_edit');
		$(this).parent('.btn').hide().siblings('.btn').show();
		$(this).parent('.btn').hide().siblings('.btn').find('.btn_sure').addClass('btn_from_edit');
		$(this).parents('li').siblings('li').removeClass('last_active');
		$(this).parents('li').addClass('active last_active').children('.qusetion_main').children('.normal_state').hide().siblings('.edit_state').show().children().show();
		// $(this).parents('li').addClass('active
		// last_active').children('.qusetion_main').children('.normal_state').hide().siblings('.edit_state').children('div').show();
		for(var i=0;i<ue.length;i++){
			if($(this).parents('li').find('.edit_state .stem_cont .editor_unified').attr('id') == ue[i].key){
// alert('绑定')
				var stemObj = $(this).parents('li').find('.editor_unified').first();
				var analysisObj = $(this).parents('li').find('.editor_unified').last();
// console.log(stemObj)
// console.log(analysisObj)

				ue[i].addListener('focus', function (){
					imgZoomBtn(stemObj);
				});
				ue[i + 1].addListener('focus', function (){
					imgZoomBtn(analysisObj,'analysis');
				});
			}
		}
	});

	// 图片恢复默认大小
	function imgRecoverySize(obj){
// console.log(obj)
		obj.parents('li').find('.img_zoom').hide();
		var imgObj = obj.parents('li').find('iframe').contents().find('img');
		var liImgObj = obj.parents('li').find('img');
		for(var i = 0; i < imgObj.length; i++) {
			if(imgObj.eq(i).attr('init-w')) {
				imgObj.eq(i).css('width', imgObj.eq(i).attr('init-w'));
// obj.parents('li').find('img').eq(i).css('width', auto);
			}
			imgObj.eq(i).removeAttr('init-w');
			imgObj.eq(i).removeAttr('zoom');
			imgObj.eq(i).removeClass('last_img');
		}
		for(var i = 0; i < liImgObj.length; i++) {
			if(liImgObj.eq(i).attr('init-w')) {
				console.log(liImgObj.eq(i).attr('init-w'))
				liImgObj.eq(i).css('width', liImgObj.eq(i).attr('init-w'));
			}
			liImgObj.eq(i).removeAttr('init-w');
			liImgObj.eq(i).removeAttr('zoom');
			liImgObj.eq(i).removeClass('last_img');
		}
	}

	// 编辑/拆分取消按钮事件
	$(document).on('click', '.task_list>li>.btn b.btn_cancel', function() {
		var _this = $(this);
// $(this).parent('.btn').hide().siblings('.btn').show();
		$(this).parent('.btn').hide().siblings('.btn').hide();
		$(this).parents('li').removeClass('active').children('.qusetion_main').children('.normal_state').show().siblings('.edit_state').hide();
// $(this).parents('li').removeClass('active').children('.qusetion_main').children('.normal_state').show().siblings('.edit_state').children('div').hide();
		imgRecoverySize($(this));
		for(var i=0;i<ue.length;i++){
			if(_this.parents('li').find('.edit_state .editor_unified').last().attr('id') == ue[i].key){
				ue[i].setContent('');
				ue[i].execCommand('insertHtml',_this.parents('li').find('.echo_content').last().html(),true);
			}
		}
	});

	// 编辑确认按钮事件
	var matchingUe = null;
	$(document).on('click', '.task_list>li>.btn b.btn_from_edit', function() {
		matchingUe = $(this).parents('li').find('.editor_unified');
		var _this = $(this);
		for(var i = 0; i < matchingUe.length; i++) {
			for(var j = 0; j < ue.length; j++) {
				if(matchingUe.eq(i).attr('id') == ue[j].key) {
// _this.parents('li').find('.normal_state').show();
					_this.parents('li').find('.normal_state').show().siblings('.edit_state').hide();
					_this.parent('.btn').hide().siblings('.btn').show();
					imgRecoverySize(_this);	
					_this.parents('li').find('.normal_state .echo_content').eq(i).html(ue[j].getContent());
				}
			}
		}
		$(this).removeClass('btn_from_edit');
	});

	// 图片放大
	var zoomSize = 10; // 每次放大的值px
	var zoomBig = 5; // 放大倍数
	$(document).on('click', '.task_list>li>.img_zoom .enlarge ', function() {
		var imgObj = $(this).parents('li').find('iframe').contents().find('.last_img');
		var imgZoom = imgObj.css('width').substring(0, imgObj.css('width').length - 2) - 0;
// console.log(imgObj)
		if(imgObj.attr('zoom') - 0 < zoomBig) {
			imgObj.attr('zoom', imgObj.attr('zoom') - 0 + 1)
			imgObj.css({
				'width': imgZoom + zoomSize + 'px',
				'height': 'auto'
			});
		} else {
			imgObj.attr('zoom', zoomBig);
			return;
		}
	});
	// 图片缩小
	$(document).on('click', '.task_list>li>.img_zoom .narrow', function() {
		var imgObj = $(this).parents('li').find('iframe').contents().find('.last_img');
		var imgZoom = imgObj.css('width').substring(0, imgObj.css('width').length - 2) - 0;
		if(imgObj.attr('zoom') - 0 >= 1) {
			imgObj.attr('zoom', imgObj.attr('zoom') - 0 - 1)
			imgObj.css({
				'width': imgZoom - zoomSize + 'px',
				'height': 'auto'
			});
		} else {
			imgObj.attr('zoom', 0);
			return;
		}
	});

	// 标题排序
	function titSort() {
		var titObj = $('.task_list>li .tit_num');
		titObj.eq(0).text(1);
		$('.task_list>li .btn_merge').show();
		titObj.eq(0).parents('.question_option').parent('li').find('.btn_merge').hide();
		for(var i = 1; i < titObj.length; i++) {
			titObj.eq(i).text(titObj.eq(i - 1).parents('.question_option').parent('li').find('.tit_num').text() - 0 + 1);
			// titObj.eq(i).text(titObj.eq(i).parents('.question_option').parent('li').prev().find('.tit_num').text()
			// - 0 + 1);
		}
	}
	titSort();

	// 删除题按钮
	var deleteLi = null;
	$(document).on('click', '.task_list>li>.btn b.btn_delete', function() {
		$('.confirm_delete_box').show();
		deleteLi = $(this).parent().parent('li');
		/*
		 * $(this).parent().parent('li').remove();
		 * console.log($(this).parent().parent('li')) titSort();
		 */
	});
	
	// 删除确认弹框取消按钮
	$(document).on('click','.confirm_delete_box button.cancel',function (){
		$('.confirm_delete_box').hide();
	});
	
	// 删除确认弹框确认按钮
	$(document).on('click','.confirm_delete_box button.sure',function (){
		$('.confirm_delete_box').hide();
		// success/fail/warning
		promptTimer('success','删除成功');
		deleteLi.remove();
		titSort();
	});

	// 移动试题按钮
	var moveIndex = -1;
	$(document).on('click', '.task_list>li>.btn b.btn_move', function() {
		$('.subject_move_box').show();
		moveIndex = $(this).parent('span').parent('li').find('.tit_num').text() - 1;
	});

	// 获取试题可移动区间/可添加区间
	var questionNum = -1;
	var maxQuestionNum = 200;
	var moveSection = '';

	function relevantInfo(tip) {
		questionNum = $('.task_list').children().length;
		moveSection = '请输入1-' + questionNum + '之间的整数';
		tip = tip ? tip : '';
		// 移动小题
		$('.add_question_box .con .main_cont p.order input').attr('placeholder', moveSection);
		$('.add_question_box .main_cont p.tip').first().text(tip + moveSection);
		$('.add_question_box .main_cont p.tip').last().text('增加数量不可为空，最多为' + maxQuestionNum + '，当前已有' + questionNum + '道。');
		// 添加小题
		$('.subject_move_box .main_cont p.tip').text(moveSection);
		if($('.task_list').children().length > 1) {
			$('.subject_move_box .main_cont .order input').attr('placeholder', moveSection);
		}
	}
	relevantInfo();

	// 移动试题
	// var moveReg = /^[1-9]\d{0,2}$/;
	var moveReg = /^[0]+[0-9]*$/gi;
	// 移动试题输入框限制
	$(document).on('keyup', '.subject_move_box .main_cont .order input', function() {
		$(this).val($(this).val().replace(moveReg, '').substr(0, 3));
		// $(this).val($(this).val().replace(/[^\d]/g,'').substr(0,3));
		if($('.subject_move_box .main_cont .order input').val() - 0 > questionNum) {
			$('.subject_move_box .main_cont .tip').show();
		} else {
			$('.subject_move_box .main_cont .tip').hide();
		}
	});

	// 移动试题确认按钮
	$(document).on('click', '.subject_move_box .btn_group button.sure', function() {
		relevantInfo();
		var insertPos = $('.subject_move_box .main_cont .order input').val() - 0;
		var typePart = $('.task_list>li').eq(moveIndex).find('.question_type');
		var stemPart = $('.task_list>li').eq(moveIndex).find('.echo_content').first().html();		// 题干
		var analysisPart = $('.task_list>li').eq(moveIndex).find('.echo_content').last().html();	// 解析
		if($('.subject_move_box .main_cont .order input').val() != '') {
			if(moveIndex < insertPos) {
				$('.task_list>li').eq(insertPos).before(template);
				$('.task_list>li').eq(insertPos).find('.question_type').before(typePart);
				$('.task_list>li').eq(insertPos).find('.question_type').eq(1).remove();
				for(var j=0;j<$('.task_list>li').eq(insertPos).find('.editor_unified').length; j++){
					$('.task_list>li').eq(insertPos).find('.editor_unified').eq(j).attr('id', 'editor_' + Yrandom());
					var ueNUm = $('.task_list>li').eq(insertPos).find('.editor_unified').eq(j).attr('id');
					ue.push(
						UE.getEditor(ueNUm, {
							initialFrameHeight: 100,
	// initialFrameWidth : 400,
							scaleEnabled: false
						})
					);
				}
				ue[ue.length - 1].ready(function() {
					ue[ue.length - 1].execCommand('insertHtml', analysisPart, true);
					$('.task_list>li').eq(insertPos - 1).find('.echo_content').last().html(analysisPart);
				});
				ue[ue.length - 2].ready(function() {
					ue[ue.length - 2].execCommand('insertHtml', stemPart, true);
					$('.task_list>li').eq(insertPos - 1).find('.echo_content').first().html(stemPart);
				});
				$('.task_list>li').eq(moveIndex).remove();
			}else{
				$('.task_list>li').eq(insertPos - 1).before(template);
				$('.task_list>li').eq(insertPos - 1).find('.question_type').before(typePart);
				$('.task_list>li').eq(insertPos -1).find('.question_type').eq(1).remove();
				for(var j=0;j<$('.task_list>li').eq(insertPos - 1).find('.editor_unified').length; j++){
					$('.task_list>li').eq(insertPos - 1).find('.editor_unified').eq(j).attr('id', 'editor_' + Yrandom());
					var ueNUm = $('.task_list>li').eq(insertPos - 1).find('.editor_unified').eq(j).attr('id');
					ue.push(
						UE.getEditor(ueNUm, {
							initialFrameHeight: 100,
	// initialFrameWidth : 400,
							scaleEnabled: false
						})
					);
				}
				ue[ue.length - 1].ready(function() {
					ue[ue.length - 1].execCommand('insertHtml', analysisPart, true);
					$('.task_list>li').eq(insertPos - 1).find('.echo_content').last().html(analysisPart);
				});
				ue[ue.length - 2].ready(function() {
					ue[ue.length - 2].execCommand('insertHtml', stemPart, true);
					$('.task_list>li').eq(insertPos - 1).find('.echo_content').first().html(stemPart);
				});
				$('.task_list>li').eq(moveIndex + 1).remove();
			}
			titSort();
			$('.subject_move_box').hide();
			$('.subject_move_box .main_cont .order input').val('');
		} else {
			$('.subject_move_box .main_cont p.tip').show();
		}
	});
	
	// 移动试题框取消
	$(document).on('click', '.subject_move_box .btn_group button.cancel', function() {
		$('.subject_move_box').hide();
		$('.subject_move_box .main_cont .order input').val('');
		$('.subject_move_box .main_cont p.tip').hide();
	});

	// 向上合并按钮
	$(document).on('click', '.task_list>li>.btn b.btn_merge', function() {
		var _this = $(this);
		var mergeUe = $(this).parents('li').find('.editor_unified');
		var mergePrevUe = $(this).parents('li').prev('li').find('.editor_unified');
		var contStorage = [];
		for(var i=0;i<mergeUe.length;i++){
			for(var j = 0; j < ue.length; j++) {
				if(mergeUe.eq(i).attr('id') == ue[j].key){
					contStorage.push(ue[j].getContent());
				}
			}
		}
		for(var i=0;i<mergePrevUe.length;i++){
			for(var j = 0; j < ue.length; j++) {
				if(mergePrevUe.eq(i).attr('id') == ue[j].key){
					ue[j].execCommand('insertHtml', contStorage[i], true);
					_this.parents('li').prev().find('.echo_content').eq(i).html(ue[j].getContent());
					if(i == mergePrevUe.length - 1){
						mergeUe.parents('li').remove();
						titSort();
					}
				}
			}
		}
	});
	
	// 拆分按钮展示题干编辑器事件
	$(document).on('click', '.task_list>li>.btn b.btn_split', function() {
		$(this).parent('.btn').hide().siblings('.btn').show();
		$(this).parent('.btn').hide().siblings('.btn').find('.btn_sure').addClass('btn_from_split');
		$(this).parents('li').addClass('active').children('.qusetion_main').children('.normal_state').hide().siblings('.edit_state').show().children('.analysis_cont').hide();
		for(var i=0;i<ue.length;i++){
			if($(this).parents('li').find('.edit_state .stem_cont .editor_unified').attr('id') == ue[i].key){
// alert('解绑')
				var stemObj = $(this).parents('li').find('.editor_unified').first();
				var analysisObj = $(this).parents('li').find('.editor_unified').last();
				ue[i].removeListener("focus",function (){
					imgZoomBtn(stemObj);
				});
				ue[i + 1].removeListener("focus",function (){
					imgZoomBtn(analysisObj);
				});
			}
		}
// $(this).parents('li').find('.img_zoom').remove()
	});
	
	// 拆分确认按钮事件
	$(document).on('click', '.task_list>li>.btn b.btn_from_split', function() {
		var _this = $(this);
		var splitPos = $(this).parents('li').find('.tit_num').text() - 0;
		var splitObj = $(this).parents('li').find('.edit_state .stem_cont .editor_unified');
		var splitlabel = '<split-text></split-text>';
		var retainText = '';
		var splitText = '';
		var regSplitlabel = /<split-text><\/split-text>/g;
		for(var i=0;i<ue.length-1;i++){
			if($(this).parents('li').find('.edit_state .stem_cont .editor_unified').attr('id') == ue[i].key){
				ue[i].execCommand('inserthtml',splitlabel,true);
				retainText = ue[i].body.innerHTML.substring(0,ue[i].body.innerHTML.indexOf(splitlabel));
				splitText = ue[i].body.innerHTML.substring(ue[i].body.innerHTML.indexOf(splitlabel)).replace(regSplitlabel,'');
				$('.task_list>li').eq(splitPos).before(template);
				ue[i].setContent('');
				ue[i].execCommand('insertHtml', retainText, true);
				$(this).parents('li').find('.edit_state').hide().siblings('.normal_state').show();
				$(this).parent('.btn').hide().siblings('.btn').show();
// imgRecoverySize(_this);
				for(var j = 0; j < $('.task_list>li').eq(splitPos).find('.editor_unified').length; j++) {
					$('.task_list>li').eq(splitPos).find('.editor_unified').eq(j).attr('id', 'editor_' + Yrandom());
					var ueNUm = $('.task_list>li').eq(splitPos).find('.editor_unified').eq(j).attr('id');
					ue.push(
						UE.getEditor(ueNUm, {
							initialFrameHeight: 100,
							// initialFrameWidth : 400,
							scaleEnabled: false
						})
					);
				}
// console.log(ue[ue.length - 2])
				ue[ue.length - 2].ready(function() {
					ue[ue.length - 2].execCommand('insertHtml', splitText, true);
					$('.task_list>li').eq(splitPos).find('.normal_state .stem_cont').html(splitText);
					$('.task_list>li').eq(splitPos - 1).find('.normal_state .stem_cont').html(retainText);
					imgRecoverySize($('.task_list>li').eq(splitPos - 1).find('.btn_split'));
					imgRecoverySize($('.task_list>li').eq(splitPos).find('.btn_split'));
					titSort();
				});
			}
		}
		$(this).removeClass('btn_from_split');
	});
	
	// 添加小题按钮事件
	$('.zy_import_part_lower .tit ul').on('click', '.add_question_btn', function() {
		relevantInfo('起始题号');
		$('.add_question_box').show();
	});

	// 关闭添加小题框清除数据
	function closeAddBox() {
		$('.add_question_box').hide();
		$('.add_question_box .main_cont input').val('');
		$('.add_question_box .main_cont p.tip').hide();
	}

	// 添加小题框取消事件
	$(document).on('click', '.add_question_box .btn_group button.cancel', function() {
		closeAddBox();
	});

	// 添加小题框起始题号输入限制
	$(document).on('keyup', '.public_box .con .main_cont .order input', function() {
		$(this).val($(this).val().replace(moveReg, '').substr(0, 3));
		if($('.add_question_box .main_cont .order input').val() - 0 > questionNum) {
			$('.add_question_box .main_cont p.tip').first().show();
		} else {
			$('.add_question_box .main_cont p.tip').first().hide();
		}
	});

	// 添加小题框增加数量输入限制
	$(document).on('keyup', '.public_box .con .main_cont .number input', function() {
		$(this).val($(this).val().replace(moveReg, '').substr(0, 3));
		if($('.add_question_box .main_cont .number input').val() - 0 > maxQuestionNum - questionNum) {
			$('.add_question_box .main_cont p.tip').last().show();
		} else {
			$('.add_question_box .main_cont p.tip').last().hide();
		}
	});

	// 添加小题确认按钮
	$(document).on('click', '.add_question_box .btn_group button.sure', function() {
		if($('.add_question_box .main_cont p.tip').first().css('display') == 'none' && $('.add_question_box .main_cont p.tip').last().css('display') == 'none') {
			if($('.add_question_box .main_cont .order input').val() == '' && $('.add_question_box .main_cont .number input').val() == '') {
				$('.add_question_box .main_cont p.tip').last().show();
			} else if($('.add_question_box .main_cont .order input').val() == '' && $('.add_question_box .main_cont .number input').val() != '') {
				var startIndex = $('.task_list>li').length;
				for(var i = 0; i < $('.add_question_box .main_cont .number input').val() - 0; i++) {
					$('.task_list').append(template);
				}
				for(var j = startIndex; j < $('.zy_import_part_lower .task_list>li').length; j++) {
					for(var k = 0; k < $('.zy_import_part_lower .task_list>li').eq(j).find('.editor_unified').length; k++) {
						$('.task_list>li').eq(j).find('.editor_unified').eq(k).attr('id', 'editor_' + Yrandom());
						var ueNUm = $('.task_list>li').eq(j).find('.editor_unified').eq(k).attr('id');
						ue.push(
							UE.getEditor(ueNUm, {
								initialFrameHeight: 100,
		// initialFrameWidth : 400,
								scaleEnabled: false
							})
						);
					}
				}
				titSort();
				closeAddBox();
			} else if($('.add_question_box .main_cont .order input').val() != '' && $('.add_question_box .main_cont .number input').val() == '') {
				$('.add_question_box .main_cont p.tip').last().show();
			} else {
				var insertIndex = $('.add_question_box .main_cont .order input').val() - 1;
				for(var i = 0; i < $('.add_question_box .main_cont .number input').val() - 0; i++) {
					$('.task_list>li').eq(insertIndex).before(template);
					for(var j = 0; j < $('.task_list>li').eq(insertIndex).find('.editor_unified').length; j++) {
						$('.task_list>li').eq(insertIndex).find('.editor_unified').eq(j).attr('id', 'editor_' + Yrandom());
						var ueNUm = $('.task_list>li').eq(insertIndex).find('.editor_unified').eq(j).attr('id');
						ue.push(
							UE.getEditor(ueNUm, {
								initialFrameHeight: 100,
		// initialFrameWidth : 400,
								scaleEnabled: false
							})
						);
					}
				}
				titSort();
				closeAddBox();
				// console.log(ue[0])
			}
		}

	});

	// 展开解析
	$(document).on('click', '.open_analysis', function() {
		$('.task_list>li .qusetion_main .normal_state .analysis_cont').slideToggle(400, function() {});
	});
	
	// 回到顶部按钮显示
	$(document).on('scroll', function() {
		if($(this).scrollTop() >= 500){
			$('.back_top_wrap').fadeIn();
		}else{
			$('.back_top_wrap').fadeOut();
		}
	});
	
	// 回到顶部
	$(document).on('click', '.back_top_wrap', function() {
		$('html,body').animate({scrollTop: '0px'}, 800);
	});
	
	// 保存按钮
	$(document).on('click','.zy_import_part_upper .tit button',function (){
		//校验是否完成必填项
		var message = checkInfo();
		if(message!=""){
			promptTimer('warning', message);
		}else{
			var data = {};
			var info = {};
			var dataSend = [];
			var selseced = '';
			var selectedOption = '';
			var selectedAnswer = '';
			for(var i=0;i<$('.task_list>li').length;i++){
				if(i>3){
					break;
				}
				if($('.task_list>li').eq(i).find('.question_type select option:selected').val()==""){
					
				}
				selseced = $('.task_list>li').eq(i).find('.question_type select option:selected').attr('data-val');
				for(var j=0;j<$('.task_list>li').eq(i).find('.question_type .all_tem').length;j++){
					if($('.task_list>li').eq(i).find('.question_type .all_tem').eq(j).hasClass(selseced)){
						if($('.task_list>li').eq(i).find('.question_type select option:selected').val()=="1"){
							$('.task_list>li').eq(i).find('.question_type .all_tem').eq(j).find('li').each(function (i,v){
								if($(this).hasClass('active')){
									selectedAnswer += ',' + $(this).attr("answer");
								}
							});
						}else{
							$('.task_list>li').eq(i).find('.question_type .all_tem').eq(j).find('li').not(':last').each(function (i,v){
								selectedOption += ',' + $(this).text();
								if($(this).hasClass('active')){
									selectedAnswer += ',' + $(this).text();
								}
							});
						}
						selectedAnswer = selectedAnswer.substring(1);
						selectedOption = selectedOption.substring(1);
					}
				}
				dataSend.push({
					'type' : $('.task_list>li').eq(i).find('.question_type select option:selected').val(),
					'options': selectedOption,
					'answer' : selectedAnswer,
					'stem' : $('.task_list>li').eq(i).find('.normal_state .stem_cont>div').html(),
					'analysis' : $('.task_list>li').eq(i).find('.normal_state .analysis_cont .echo_content').children("p").html()
				});
				selectedOption = '';
				selectedAnswer = ''
			}
			info.subId = $("#showSubject").val();
			info.subIds = $("#showSubject").val()+","+$("#showCharpter").val()+","+$("#showNode").val();
			info.subNames = $("#showSubject option:selected").text()+"//"+$("#showCharpter option:selected").text()+"//"+$("#showNode option:selected").text();
			info.gradeId = $("#showGrade").val();
			info.gradeName = $("#showGrade option:selected").text();
			info.keywords = $("#guanjianzi").val();
			data.info = info;
			data.questions = dataSend;
			console.log(data);
			var json = JSON.stringify(data);
			console.log(json);
			//保存入库
			saveQuestion(json);
		}
	});
});

//提示框1.5ms
/*
 * type : 提示图片 success/fail/warning tipWord : 提示框文字
 */
function promptTimer(type, tipWord){
	$('.timing_box .main_cont').find('.' + type).show().siblings('img').hide();
	$('.timing_box .main_cont p').text(tipWord);
	$('.timing_box').show();
	setTimeout(function (){
		$('.timing_box').hide();
	},1500);
}	

//校验必填项
function checkInfo(){
	var message = "";
	if($("#showGrade").val()==-1){
		message = "请选择年级";
	}else if($("#showSubject").val()==-1){
		message = "请选择科目";
	}else if($("#showCharpter").val()==-1){
		message = "请选择章节";
	}else if($("#guanjianzi").val()==""){
		message = "请输入关键字";
	}
	return message;
}

//保存入库
function saveQuestion(json){
	$.ajax({
		url : '../myQuestion/importMyQuestion.do',
		type : 'post',
		data : {"json": json},
		dataType : 'json',
		success : function(data) {
			if(data.ret==200){
				promptTimer('success', "保存成功");
				$(".createTop .No").click();
				setTimeout(function(){
					window.location.href = "../homework/myquestion.do";
				}, 1000);
			}else{
				promptTimer('fail', "保存失败");
			}
		}
	});
}

//加载年级
function showGrade(){
	$.ajax({
		url : '../homework/showGrade.do',
		type : 'post',
		dataType : 'json',
		success : function(data) {
			var jsonData = $.parseJSON(data).data;
			if($.parseJSON(data).status==200){
				$("#showGrade").removeAttr("disabled");
				var html = "<option value='-1'>请选择年级</option>";
				for(var i=0;i<jsonData.length;i++){
					html+="<option value='"+jsonData[i].id+"'>"+jsonData[i].name+"</option>";
				}
				$("#showGrade").html(html);
				
				$("#showSubject").html("<option value='-1'>请选择节点</option>");
				$("#showSubject").attr("disabled","disabled");
				$("#showCharpter").html("<option value='-1'>请选择章节</option>");
				$("#showCharpter").attr("disabled","disabled");
				$("#showNode").html("<option value='-1'>请选择节点</option>");
				$("#showNode").attr("disabled","disabled");
			}else{
				$("#showGrade").html("<option value='-1'>没有年级</option>");
				$("#showGrade").attr("disabled","disabled");
			}
		}
	});
}
//加载学科
function showSubject(){
	if($("#showGrade").val()!=-1){
		$.ajax({
			url : '../homework/showSubject.do',
			type : 'post',
			data:{gradeId:$("#showGrade").val()},
			dataType : 'json',
			success : function(data) {
				var jsonData = $.parseJSON(data).data;
				subdata = jsonData;
				if($.parseJSON(data).ret==200||$.parseJSON(data).status==200){
					$("#showSubject").removeAttr("disabled");
					var html = "<option value='-1'>请选择学科</option>";
					for(var i=0;i<jsonData.length;i++){
						html+="<option value='"+jsonData[i].id+"'>"+jsonData[i].name+"</option>";
					}
					$("#showSubject").html(html);
					
					$("#showCharpter").html("<option value='-1'>请选择章节</option>");
					$("#showCharpter").attr("disabled","disabled");
					$("#showNode").html("<option value='-1'>请选择节点</option>");
					$("#showNode").attr("disabled","disabled");
				}else{
					$("#showSubject").html("<option value='-1'>没有学科</option>");
					$("#showSubject").attr("disabled","disabled");
				}
			}
		});
	}
}
//加载章节
function showCharpter(){
	if($("#showSubject").val()!=-1){
		$.ajax({
			url : '../homework/showCharpter.do',
			data:{volumeId:$("#showSubject").val()},
			type : 'post',
			dataType : 'json',
			success : function(data) {
				var jsonData = $.parseJSON(data).data;
				if($.parseJSON(data).status==200){
					$("#showCharpter").removeAttr("disabled");
					var html = "<option value='-1'>请选择章节</option>";
					for(var i=0;i<jsonData.length;i++){
						html+="<option value='"+jsonData[i].id+"'>"+jsonData[i].name+"</option>";
					}
					$("#showCharpter").html(html);
					
					$("#showNode").html("<option value='-1'>请选择节点</option>");
					$("#showNode").attr("disabled","disabled");
				}else{
					$("#showCharpter").html("<option value='-1'>该学科没有章节</option>");
					$("#showCharpter").attr("disabled","disabled");
				}
			}
		});
	}
}
//加载节点
function showNode(){
	if($("#showCharpter").val()!=-1){
		$.ajax({
			url :'../homework/showCharpter.do',
			data:{volumeId:$("#showCharpter").val()},
			type : 'post',
			dataType : 'json',
			success : function(data) {
				var jsonData = $.parseJSON(data).data;
				if($.parseJSON(data).status==200 && jsonData.length>0){
					$("#showNode").removeAttr("disabled");
					var html = "<option value='-1'>请选择节点</option>";
					for(var i=0;i<jsonData.length;i++){
						html+="<option value='"+jsonData[i].id+"'>"+jsonData[i].name+"</option>";
					}
					$("#showNode").html(html);
				}else{
					$("#showNode").html("<option value='-1'>该章节没有节点</option>");
					$("#showNode").attr("disabled","disabled");
				}
			}
		});
	}
}