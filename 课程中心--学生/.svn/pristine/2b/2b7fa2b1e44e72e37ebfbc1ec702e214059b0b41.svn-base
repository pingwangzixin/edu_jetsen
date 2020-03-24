//以下上传资源左侧树
var curMenus = null,
	zTree_Menus = null;
var settings = {
	view: {
		showLine: true,
		showIcon: false,
		selectedMulti: false,
		dblClickExpand: true //控制收展

	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeExpand: beforeExpands,
		onNodeCreated: this.onNodeCreateds,
		beforeClick: this.beforeClicks

	}
};

var zNodes = [{
		id: 1,
		pId: 0,
		name: "初一",
		open: true
	},
	{
		id: 11,
		pId: 1,
		name: "数学上册"
	},
	{
		id: 111,
		pId: 11,
		name: "第一单元"
	},
	{
		id: 1111,
		pId: 111,
		name: "第一章"
	},
	{
		id: 11111,
		pId: 1111,
		name: "第一节"
	},
	{
		id: 11112,
		pId: 1111,
		name: "第二节"
	},
	{
		id: 11113,
		pId: 1111,
		name: "第三节"
	},
	{
		id: 11114,
		pId: 1111,
		name: "第四节"
	},
	{
		id: 112,
		pId: 11,
		name: "第二单元"
	},
	{
		id: 1121,
		pId: 112,
		name: "第一章"
	},
	{
		id: 11211,
		pId: 1121,
		name: "第一节"
	},
	{
		id: 11212,
		pId: 1121,
		name: "第二节"
	},
	{
		id: 11213,
		pId: 1121,
		name: "第三节"
	},
	{
		id: 11214,
		pId: 1121,
		name: "第四节"
	},
	{
		id: 113,
		pId: 11,
		name: "第三单元"
	},
	{
		id: 1131,
		pId: 113,
		name: "第一章"
	},
	{
		id: 11311,
		pId: 1131,
		name: "第一节"
	},
	{
		id: 11312,
		pId: 1131,
		name: "第二节"
	},
	{
		id: 11313,
		pId: 1131,
		name: "第三节"
	},
	{
		id: 11314,
		pId: 1131,
		name: "第四节"
	},
	{
		id: 114,
		pId: 11,
		name: "第四单元"
	},
	{
		id: 1141,
		pId: 114,
		name: "第一章"
	},
	{
		id: 11411,
		pId: 1141,
		name: "第一节"
	},
	{
		id: 11412,
		pId: 1141,
		name: "第二节"
	},
	{
		id: 11413,
		pId: 1141,
		name: "第三节"
	},
	{
		id: 11414,
		pId: 1141,
		name: "第四节"
	},
	{
		id: 12,
		pId: 1,
		name: "数学下册"
	},
	{
		id: 121,
		pId: 12,
		name: "第一单元"
	},
	{
		id: 1211,
		pId: 121,
		name: "第一章"
	},
	{
		id: 12111,
		pId: 1211,
		name: "第一节"
	},
	{
		id: 12112,
		pId: 1211,
		name: "第二节"
	},
	{
		id: 12113,
		pId: 1211,
		name: "第三节"
	},
	{
		id: 12114,
		pId: 1211,
		name: "第四节"
	},
	{
		id: 13,
		pId: 1,
		name: "语文上册"
	},
	{
		id: 131,
		pId: 13,
		name: "第一单元"
	},
	{
		id: 1311,
		pId: 131,
		name: "第一章"
	},
	{
		id: 13111,
		pId: 1311,
		name: "第一节"
	},
	{
		id: 13112,
		pId: 1311,
		name: "第二节"
	},
	{
		id: 13113,
		pId: 1311,
		name: "第三节"
	},
	{
		id: 13114,
		pId: 1311,
		name: "第四节"
	},

	{
		id: 2,
		pId: 0,
		name: "初二"
	},
	{
		id: 21,
		pId: 2,
		name: "数学上册"
	},
	{
		id: 211,
		pId: 21,
		name: "第一单元"
	},
	{
		id: 212,
		pId: 21,
		name: "第二单元"
	},
	{
		id: 213,
		pId: 21,
		name: "第三单元"
	},
	{
		id: 214,
		pId: 21,
		name: "第四单元"
	},
	{
		id: 22,
		pId: 2,
		name: "数学下册"
	},
	{
		id: 221,
		pId: 22,
		name: "第一单元"
	},
	{
		id: 222,
		pId: 22,
		name: "第二单元"
	},
	{
		id: 223,
		pId: 22,
		name: "第三单元"
	},
	{
		id: 224,
		pId: 22,
		name: "第四单元"
	},

	{
		id: 3,
		pId: 0,
		name: "初三"
	},
	{
		id: 31,
		pId: 3,
		name: "数学上册"
	},
	{
		id: 311,
		pId: 31,
		name: "第一单元"
	},
	{
		id: 312,
		pId: 31,
		name: "第二单元"
	},
	{
		id: 313,
		pId: 31,
		name: "第三单元"
	},
	{
		id: 314,
		pId: 31,
		name: "第四单元"
	},
	{
		id: 32,
		pId: 3,
		name: "数学下册"
	},
	{
		id: 321,
		pId: 32,
		name: "第一单元"
	},
	{
		id: 322,
		pId: 32,
		name: "第二单元"
	},
	{
		id: 323,
		pId: 32,
		name: "第三单元"
	},
	{
		id: 324,
		pId: 32,
		name: "第四单元"
	},

];

function beforeExpands(treeId, node) {
	if(node.isParent) {
		if(node.level === 0) {
			var pNode = curMenus;
			while(pNode && pNode.level !== 0) {
				pNode = pNode.getParentNode();
			}
			if(pNode !== node) {
				var a = $("#" + pNode.tId + "_a");
				zTree_Menus.expandNode(pNode, false);
			}
			a = $("#" + node.tId + "_a");

			var isOpen = false;
			for(var i = 0, l = node.children.length; i < l; i++) {
				if(node.children[i].open) {
					isOpen = true;
					break;
				}
			}
			if(isOpen) {
				zTree_Menus.expandNode(node, true);
				curMenus = node;
			} else {
				zTree_Menus.expandNode(node.children[0].isParent ? node.children[0] : node, true);
				curMenus = node.children[0];
			}
		} else {
			zTree_Menus.expandNode(node);

		}
	}
	return !node.isParent;
}

function beforeClicks(treeId, node) {

	if(node.isParent) {
		if(node.level === 0) {
			zTree_Menus.expandNode(node);
			if(!node.open) {
				return false;
			}
			var pNode = curMenus;
			while(pNode && pNode.level !== 0) {
				pNode = pNode.getParentNode();
			}
			if(pNode !== node) {
				var a = $("#" + pNode.tId + "_a");

				zTree_Menus.expandNode(pNode, false);
			}
			a = $("#" + node.tId + "_a");

			var isOpen = false;
			for(var i = 0, l = node.children.length; i < l; i++) {
				if(node.children[i].open) {
					isOpen = true;
					break;
				}
			}
			if(isOpen) {
				zTree_Menus.expandNode(node, true);
				curMenus = node;
			} else {
				zTree_Menus.expandNode(node.children[0].isParent ? node.children[0] : node, true);
				curMenus = node.children[0];
			}
		} else {
			zTree_Menus.expandNode(node);

		}
	} else {
		$(".knowledgeSelect").eq(0).html($("#knowledgeZtree .curSelectedNode:last").text());
		$(".knowledgeBox").hide();

	}
	return !node.isParent;
};
//以下修改属性树状图
var curMenuamend = null,
	zTree_Menuamend = null;
var settingamend = {
	view: {
		showLine: true,
		showIcon: false,
		selectedMulti: false,
		dblClickExpand: true //控制收展

	},
	data: {
		simpleData: {
			enable: true
		}
	},
	callback: {
		beforeExpand: beforeExpandamend,
		onNodeCreated: this.onNodeCreated,
		beforeClick: this.beforeClickamend

	}
};
function beforeExpandamend(treeId, node) {
	if(node.isParent) {
		if(node.level === 0) {
			var pNode = curMenuamend;
			while(pNode && pNode.level !== 0) {
				pNode = pNode.getParentNode();
			}
			if(pNode !== node) {
				var a = $("#" + pNode.tId + "_a");
				zTree_Menuamend.expandNode(pNode, false);
			}
			a = $("#" + node.tId + "_a");

			var isOpen = false;
			for(var i = 0, l = node.children.length; i < l; i++) {
				if(node.children[i].open) {
					isOpen = true;
					break;
				}
			}
			if(isOpen) {
				zTree_Menuamend.expandNode(node, true);
				curMenuamend = node;
			} else {
				zTree_Menuamend.expandNode(node.children[0].isParent ? node.children[0] : node, true);
				curMenuamend = node.children[0];
			}
		} else {
			zTree_Menuamend.expandNode(node);

		}
	}
	return !node.isParent;
}

function beforeClickamend(treeId, node) {

	if(node.isParent) {
		if(node.level === 0) {
			zTree_Menuamend.expandNode(node);
			if(!node.open) {
				return false;
			}
			var pNode = curMenuamend;
			while(pNode && pNode.level !== 0) {
				pNode = pNode.getParentNode();
			}
			if(pNode !== node) {
				var a = $("#" + pNode.tId + "_a");

				zTree_Menuamend.expandNode(pNode, false);
			}
			a = $("#" + node.tId + "_a");

			var isOpen = false;
			for(var i = 0, l = node.children.length; i < l; i++) {
				if(node.children[i].open) {
					isOpen = true;
					break;
				}
			}
			if(isOpen) {
				zTree_Menuamend.expandNode(node, true);
				curMenuamend = node;
			} else {
				zTree_Menuamend.expandNode(node.children[0].isParent ? node.children[0] : node, true);
				curMenuamend = node.children[0];
			}
		} else {
			zTree_Menuamend.expandNode(node);

		}
	} else {
		$(".knowledgeSelect").eq(1).html($("#amendknowledgeZtree .curSelectedNode:last").text());
		$(".knowledgeBox").hide();

	}
	return !node.isParent;
};

$(document).ready(function() {
	//tab栏切换函数
	function tabs(tabTit, on, tabCon) {
		$(tabCon).each(function() {
			$(this).children().eq(0).show();
		});
		$(tabTit).each(function() {
			$(this).children().eq(0).addClass(on);
		});
		$(tabTit).children().click(function() {
			$(this).addClass(on).siblings().removeClass(on);
			var index = $(tabTit).children().index(this);
			$(tabCon).children().eq(index).show().siblings().hide();
		});
	}
	tabs(".investment_title", "on", ".investment_con");
	//tabs(".nav-list>ul","current",".nav-container");
	//导航条
	$('.head .list li').on('click', function() {
		$(this).find('a').addClass('active').parent('li').siblings('li').find('a').removeClass('active');
	});
	//筛选
	function filterAll(config) {
		$(config.inputQx).on("click", function() {
			$(this).toggleClass("active");
			if($(this).attr("class") == "active") {
				$(config.inputDx).addClass("active");
			} else {
				$(config.inputDx).removeClass("active");
			}
		});
		$(config.inputDx).on("click", function() {
			$(this).toggleClass("active");
			/*if($(config.inputDx).attr("class")==""){
				$(config.inputQx).removeClass("active");
			}*/
			var ls = $(config.inputDx).length;
			var chs = $(config.inputDx + ".active").length;
			if(ls == chs) {
				$(config.inputQx).addClass("active");
			} else {
				$(config.inputQx).removeClass("active");
			}
		});
	}
	//调用方法
	filterAll({
		"inputQx": ".investment_btn dl dd[sxqb='all']",
		"inputDx": ".investment_btn dl dd[sxdg='dg']"
	});

	//
	//列表切换
	$(".lianjie span a").on("click", function() {
		$(".lianjie span a").removeClass("cur");
		$(this).addClass("cur");
	})
	//下载提示
	$(".weike").on("mousemove", function() {
		$(".juxing").show();
	});
	$(".weike").on("mouseout", function() {
		$(".juxing").hide();
	})

	//上传资源
	$(".shangchuan").on("click", function() {
		$(".YupResources").show();
		$(".zhezhao").show();
		$(".YupResources .tijiao").show();
		$('.YupResources .left').css('background', 'none');
	})
	//上传资源提示
	$(".shangchuan").on("mousemove", function() {
		$(".sc_juxing").show();
	});
	$(".shangchuan").on("mouseout", function() {
		$(".sc_juxing").hide();
	})

	//微课大赛上传
	$(".weike").on("click", function() {
		$(".weikeupload").show();
		$(".zhezhao").show();
		$(".weikeupload .tijiao").show();
		$('.weikeupload .left').css('background', 'none');
	})

	//关闭上传弹窗

	$(".weikegb img").on("click", function() {
		$(".weikeupload,.uploadzy").hide();
		$(".zhezhao").hide();
	})
	//删除资源
	$("#delete").on("click", function() {
		var s = $(".investment_con_one input:checked").size();
		if(!s) {
			$(".xiafaSuccess").show()
			$(".xiafaSuccess img").attr('src', '../img/gantan.png');
			$(".text-text").text("请选中您需要删除的资源");
			setTimeout(function() {
				$(".xiafaSuccess").hide();
				$(".zhezhao").hide();
			}, 1500)
		} else {
			$(".text-text").text("确认要删除资源吗?");
			$('.delSureDel').css('display', 'block');
		}
	})

	cancelUpload('.upqxsc', '.zhezhao,.delSureDel');
	cancelUpload('.delClose', '.zhezhao,.delSureDel');

	//下载资源
	$("#download").on("click", function() {
		var s = $(".investment_con_one input:checked").size();
		if(!s) {
			$(".xiafaSuccess").show()
			$(".xiafaSuccess img").attr('src', '../img/gantan.png');
			$(".text-text").text("请选中您需要下载的资源");
			setTimeout(function() {
				$(".xiafaSuccess").hide();
			}, 1500)
		}
	})

	//上传弹窗按钮切换	//有啥用？
	/* $(".nianji button").on("click",function(){
	     $(this).addClass("scxz").siblings().removeClass("scxz")
	 });*/
	//取消上传
	function cancelUpload(obj, child) {
		$(obj).on('click', function() {
			$(child).css('display', 'none');
		})
	}
	cancelUpload('.upqxsc', '.zhezhao,.weikeupload');
	cancelUpload('.upqxsc', '.zhezhao,.uploadzy');

	//点击共享至老师
	function showWindow(obj, children) {
		$(obj).on('click', function() {
			var s = $(".investment_con_one input:checked").size();
			if(s) {
				$(children).css('display', 'block');
				controlH();
			} else {
				$(".del_down2").show()
				$(".del_down2 img").attr('src', '../img/gantan.png');
				$(".text-text").text("请选中您需要共享的资源");
				$(".zhezhao").show();
				setTimeout(function() {
					$(".del_down2").hide();
					$(".zhezhao").hide();
				}, 1500);
			}

		})
	}
	showWindow('#shareTeacher', '.zhezhao,.ggTeacher');
	cancelUpload('.gongClose', '.zhezhao,.gongxiangzhi');
	cancelUpload('.gongxiangzhi .upqxsc', '.zhezhao,.gongxiangzhi');

	//没用
	/*   $('.gongSeleAll').on('click',function(){
	       if($(this).prop('checked')){
	           $('.gongxiangzhi .gongPersons li input').prop('checked',true);
	           $(this).prop('checked',true);
	       }else{
	           $('.gongxiangzhi .gongPersons li input').prop('checked',false);
	           $(this).prop('checked',false);
	       }
	   })*/

	//下发到学生
	//showWindow('#toStudent','.zhezhao,.toStudentWrap');
	cancelUpload('.weikegb', '.zhezhao,.toStudentWrap');
	$('#toStudent').on('click', function() {
		$('.xiafaSuccess').show();
		$('.xiafaSuccess .text-text').text('请选中您需要共享的资源');
		setTimeout(function() {
			$('.xiafaSuccess').hide();
		}, 1500);
	});

	$('.toStudentWrap .upsuresc').on('click', function() {
		if($(".gongPersons li input:checked").size()) {
			$('.toStudentWrap').css('display', 'none');
			$('.xiafaSuccess').css('display', 'block');
			setTimeout(xiafaHide, 1800);

			function xiafaHide() {
				$('.xiafaSuccess,.zhezhao').css('display', 'none');
			}
		}

	})

	/*课件点击变背景色*/
	$('.uploadzy .kejian').on('click', function() {
		$(this).addClass('cur').siblings().removeClass('cur');
	})
	/*编辑点击课件变色================*/
	$('.editWrap .kejian').on('click', function() {
		$(this).addClass('cur').siblings().removeClass('cur');
	})

	/*控制筛选内容变多问题*/
	function controlDown() {
		var h = $('.investment_btn').outerHeight(true);
		if(h > 80) {
			$('.investment_btn dl dt').css('height', '43px');
		}

	}
	controlDown();

	/*编辑点击弹出  控制===============*/
	$('.investment_con .bianji').on('click', function() {
		$('.editWrap,.zhezhao').show();
	})
	$('.editWrap .upqxsc,#editClose').on('click', function() {
		$('.editWrap,.zhezhao').hide();
	})

	//下谁 改的真费劲
	$('Ydel .tijiao .upsuresc').on('click', function() {
		$('.delSureDel').hide(); //
		$(".del_down2").show().find('.text-text').text('删除成功'); //
		$('.zhezhao').css('z-index', '21');
		setTimeout(function() {
			$(".del_down2").hide();
			$(".zhezhao").css('z-index', '10').hide(); //
		}, 1500)
	});

	/*2017.05.27 zy*/
	//资源上传 ---直接上传至老师，其它必选项禁填
	$('.YupResources').on('click', '.YtoTeacher input', function() {
		if($(this).prop('checked') == true) {
			$(this).parent().siblings('.nianji,.weikeWrap').children('select,input').addClass('Yactive').attr('disabled', true);
		} else {
			$(this).parent().siblings('.nianji,.weikeWrap').children('select,input').removeClass('Yactive').attr('disabled', false);
		}
	});

	//上传至老师按钮弹窗
	$('.YshareToClass').on('click', function() {
		$('.YupResourcesTeach,.zhezhao').show();
	});

	//老师下发的 回传弹框
	$('.YneedReturn').on('click', function() {
		$('.YupResourcesReturn,.zhezhao').show();
	});
	//上传资源知识点选择树
	$(document).ready(function() {
		$.fn.zTree.init($("#knowledgeZtree"), settings, zNodes);
		zTree_Menus = $.fn.zTree.getZTreeObj("knowledgeZtree");
		curMenus = zTree_Menus.getNodes()[0]; //默认选中的
		$("#knowledgeZtree").on('click', '.node_name', function() {
			$('#knowledgeZtree .node_name').parent().removeClass('curSelectedNode');
			$(this).parent().addClass('curSelectedNode');

		});

	});
    //修改资源知识点选择树
	$(document).ready(function() {
		$.fn.zTree.init($("#amendknowledgeZtree"), settingamend, zNodes);
		zTree_Menuamend = $.fn.zTree.getZTreeObj("amendknowledgeZtree");
		curMenuamend= zTree_Menuamend.getNodes()[0]; //默认选中的
		$("#amendknowledgeZtree").on('click', '.node_name', function() {
			$('#amendknowledgeZtree .node_name').parent().removeClass('curSelectedNode');
			$(this).parent().addClass('curSelectedNode');
		});

	});

	//2018-07-02 zmj 选择知识点
	$(".knowledgeSelect").on("click", function() {

		if($(".knowledgeBox").css("display") == "none") {
			$(".knowledgeBox").show();
		} else {
			$(".knowledgeBox").hide();
		};
		$("body").on("mousedown", onBodyDown);

	});
	

	function hideMenu() {
		$(".knowledgeBox").hide();
		
		$("body").off("mousedown", onBodyDown);
	}

	function onBodyDown(event) {

		if(!(event.target.className == "knowledgeBox" || event.target.className == "knowledgeSelect" || $(event.target).parents(".knowledgeBox").length > 0)) {

			hideMenu();
		}
	};

});