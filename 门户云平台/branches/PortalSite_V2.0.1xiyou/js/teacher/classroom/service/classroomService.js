/**
 * Created by lyh on 2018/9/10.
 */
app.service('classroomService',['$http','$timeout','$q',function($http,$timeout,$q) {
    var deferred=$q.defer();
    var promise=deferred.promise;

    var dayToWeek = function(dateTime){
        var week=['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
        var day = new Date(dateTime).getDay();
        return week[day];
    };
    var dateToYMD = function (dateTime) {
        return dateTime.substr(0,10);
    }



    /** 根据资源的type 判断需要给出的资源图片 */
    var resImgFromType = function (type,filename) {
        var resImg="";
        switch (type){
            case "video":
                resImg = "img/resources_video.png";
                break;
            case "audio":
                resImg = "img/resources_ear.png";
                break;
            case "document":
                var suffix = filename.substring(filename.lastIndexOf(".")+1);
                if(suffix.toLowerCase()=="doc" || suffix.toLowerCase()=="docx" ){
                    resImg = "img/resources_word.png";
                }else if(suffix.toLowerCase()=="ppt" || suffix.toLowerCase()=="pptx"){
                    resImg = "img/resources_ppt.png";
                }else if(suffix.toLowerCase()=="xlsx" || suffix.toLowerCase()=="xls"){
                    resImg = "img/resources_excal.png";
                }else if(suffix.toLowerCase()=="pdf"){
                    resImg = "img/resources_pdf.png";
                }
                break;
            case "image":
                resImg="img/resources_pic.png";
                break;
            case "quz":
                resImg="img/zyx_testpic.png";
                break;
            default :
                resImg="img/resources_pic.png";
        }
        return resImg;
    }

    /* 课堂记录  课堂信息请求 */
    var lessonRequest = function(params,succ,err){
        $http.get(lessonIp+"lesson/lessonRecord",{params:params}).success(function (res) {
            succ(res);
        }).error(function (error) {
            err(error);
        })
    }
    
    this.lessonOne = function (params,success,err) {
        lessonRequest(params,function (res) {
            var data;
            if(res.ret == 200){
                data= res.data;
            }else{
                data = [];
            }
            success(data);
        },function (error) {
            err(error);
        })
    }
    
    /* 课堂记录  课堂信息请求处理 */
    this.lessonList = function (params,succ,err) {
        lessonRequest(params,function(res) {
            var lessonList = [];
            var data;
            if(res.ret == 200){
                data= res.data;
            }else{
                data = [];
            }

            var time="";
            var dataGrade;
            var dataJson;
            var knowledge;
            var lesson = {};
            angular.forEach(data,function (o,k) {
                /* 根据时间判断是否在同一天 不同天 重新创建 */
                if(time != o.lessonRecord.startTime){
                    lesson={};
                    dataJson = [];
                    time= o.lessonRecord.startTime;
                    lesson.id=o.lessonRecord.id;
                    lesson.week=dayToWeek(time);
                    var date = dateToYMD(time);
                    lesson.date=date;
                    lesson.data = dataJson;
                    lessonList.push(lesson);
                }else{
                    time = o.lessonRecord.startTime;
                }
                /* 每天上的所有课程  */
                dataGrade= {};
                dataGrade.id = o.lessonRecord.id;
                dataGrade.grade = o.lessonRecord.grade+"("+o.lessonRecord.className+")班";
                if($.isEmptyObject(o.lessonRecord.grade)){
                    dataGrade.grade = "";
                }
                dataGrade.subject = o.lessonRecord.subject;
                dataGrade.classId = o.lessonRecord.classId;
                dataGrade.time = o.lessonRecord.startTime.substr(11,5);

                /*  课堂中 教师的录屏 以及教师所用的资源文件  */
                if(!$.isEmptyObject(o.videoList)){
                    knowledge = [];
                    angular.forEach(o.videoList,function (v,i) {
                        var resource = {};
                        resource.img = resImgFromType(v.type,v.filename);
                        resource.name = v.filename;
                        knowledge.push(resource);
                    })
                    dataGrade.knowledge=knowledge;
                }
                dataJson.push(dataGrade);
            });
            console.log(lessonList);
            succ(lessonList);
        },function(e) {
            err(e)
        });
    };
    /**
     *  查询课堂提问交流
     * @param params
     * @param succ
     * @param err
     */
    this.lessonComment = function (params,succ,err) {
        $http.get(lessonIp+"lesson/lessonComment",{params:params}).success(function (res) {
           var data;
           console.log(res);
            if(res.ret == 200){
                data= res.data;
            }else{
                data = [];
            }
            succ(data);
        }).error(function (error) {
            err(error);
        })
    };
    /**
     * 新增课堂提问交流数据
     * @param params
     * @param succ
     * @param err
     */
    this.putLessonComment = function (params,succ,err) {
        $http.post(lessonIp+"lesson/saveLesson",params).success(function (res) {
           var data ;
            console.log(res);
            if(res.ret == 200){
                data= "success";
            }else{
                data = "error";
            }
            succ(data);
        }).error(function (err) {
            err(err);
        })
    };
    /**
     * 获取学生的课堂表现
     * @param params
     * @param succ
     * @param error
     */
    this.getLessonStu = function (params,succ,error) {
        $http.get(lessonIp+"lesson/lessonEval",{params:params}).success(function (res) {
            var data ;
            if(res.ret == 200){
                data= res.data;
            }else{
                data = [];
            }
            console.log(data);
            var normal = [];
            var excellent = [];
            var poor = [];
            angular.forEach(data,function(o,k){
                var x = {};
                x.id=o.id;
                x.name=o.stu_name;
                x.content = o.vcontent;
                x.state = o.eval_flag;
                x.stuId =o.stu_id;
                switch (o.eval_flag){
                    case 0:
                        excellent.push(x);
                        break;
                    case 1:
                        normal.push(x);
                        break;
                    default :
                        poor.push(x);
                        break;
                }
            });
            var stuList={};
            stuList.normal = normal;
            stuList.excellent = excellent;
            stuList.poor = poor;
            succ(stuList);
        }).error(function (err) {
            error(err);
        })
    };


    this.stuResource = function (params,succ,error) {
        $http.get(lessonIp+"lesson/findResInfo",{params:params}).success(function (res) {
            console.log(res);
            var data;
            if(res.ret == 200){
                data= res.data;
            }else{
                data = [];
            }
            succ(data);
        }).error(function (err) {
            error(err);
        })
    };
    //学生情况处理：状态，评论
    this.stuSituation = function (id,params,succ,error) {
        $http.get(lessonIp+"lesson/"+id,{params:params}).success(function (res) {
            console.log(res);
            succ(res);
        }).error(function (err) {
            error(err);
        })
    }

    this.getUserByToken = function (url,params,succ,error) {
        if($.isEmptyObject(params)){
            console.log("参数未传递~");
        }
        $http.get(jeucIp+"uc/user/"+url).success(function (res) {
            console.log(res);
            if($.isEmptyObject(res)){
                console.log("与用户连接时，出现问题~");
                return ;
            }
            var jsonObj = angular.fromJson(res);
            console.log(jsonObj);
            succ(jsonObj.data);
            sessionStorage.setItem("userInfo",angular.toJson(jsonObj.data));
            console.log(sessionStorage.getItem("userInfo"));
        }).error(function (err) {
            error(err);
        })
    }

    this.dateLessonMonth = function (param,succ,err) {
        $http.get(lessonIp+"lesson/lessonDate",{params:param}).success(function (res) {
            var data;
            if (res.ret == 200){
                data= res.data;
            }
            if($.isEmptyObject(data)){
                data = [];
            }
            succ(data);
        }).error(function (errr) {
            err(errr);
        })
    }



}])
