$(function(){
    
    //社团管理左侧树点击切换改变颜色
    $(document).on("click",".shetuanname li",function(){
        $(this).addClass("xuanzhong").siblings().removeClass("xuanzhong");
    });
    
    //新建社团
        $(".addst").on("click",function(){
            $(".shetuanname").prepend("<li style='color:#999;'>双击修改社团名称</li>");
            $(".shetuanname li").removeClass("xuanzhong");
            $(".stdata").hide();
            $(".xinjianneirong").show();
            $(".shetuanbianji2").css({"background":"#ebebeb"}).empty().attr("contenteditable","true");
            $(".bianjijiaoshi2").css({"background":"#ebebeb"}).empty().attr("contenteditable","true");
            $(".xiugaijs2").html("保存").siblings().addClass("baocun").removeClass("bianji");
            $(".bianjist2").html("保存").siblings().addClass("baocun").removeClass("bianji");
            $("#jiaoshitouxiang2").attr("src","../img/shangchuantouxiang.png");
            	var height=$(".mystjs").height();
        		$(".myshetuan").height(height);
        })
        
        //双击修改社团名称
        $(document).on("dblclick",".shetuanname li",function(){
            var zhi=$(this).text();
            $(this).html('<input type="text" value="'+ zhi +'" />');
            $(this).children().blur(function(){
                var inputval=$("input").val();
                if(inputval.length==0){
                    $(".xiafaSuccess").show();
                    $(".wx_huise").show();
                    setTimeout(function(){
                        $(".xiafaSuccess").hide();
                        $(".wx_huise").hide();
                    },2000);
                    
                    
                }else{
                    $(this).parent().text(inputval).css({"color":"#000"});
                }
                
            })
        })
    
    
})