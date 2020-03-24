package com.jetsen.bigdata.util;

/**
 * Created by HuaiY on 2018/5/17.
 */
public class WriteFileThread extends Thread{

    String StingJson = "";//定义线程内变量
    public WriteFileThread(String StingJson){//定义带参数的构造函数,达到初始化线程内变量的值
        this.StingJson = StingJson;
    }
    @Override
    public void run() {
        WriteJsonFile.WriteConfigJson(StingJson);
    }
}