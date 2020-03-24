package com.jetsen.bigdata.util;


import java.io.*;

/**
 * Created by HuaiY on 2018/5/17.
 */
public class WriteJsonFile {
    public static void WriteConfigJson(String args) {
//      String src = ConstantUtil.WRITE_JSON_FILE_SRC;//这里需要定义一个变量，如"E:\\json\\conf.json";//把json文件写到这个目录下
//    	String src = "/bigdata/WebRoot/server/dataJson";
    	String src = Constants.WRITE_JSON_FILE_URL+"/360200.json"; 
        File file = new File(src);

        if (!file.getParentFile().exists()) {
            file.getParentFile().mkdirs();
        }
        try {
            file.delete();
            file.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            FileWriter fw = new FileWriter(file, true);
            fw.write(args);
            fw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}