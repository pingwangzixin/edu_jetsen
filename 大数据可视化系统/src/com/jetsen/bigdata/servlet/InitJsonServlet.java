package com.jetsen.bigdata.servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Servlet implementation class InitJsonServlet
 */
@WebServlet("/InitJsonServlet")
public class InitJsonServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InitJsonServlet() {
        super();
        // TODO Auto-generated constructor stub
//        String jsonStr="{\"name\":\"景德镇市\",\"type\":\"city\",\"userNum\":6238,\"resouceNum\":235784,\"userList\":[{\"value\":614,\"name\":\"教师\"},{\"value\":6169,\"name\":\"学生\"},{\"value\":5,\"name\":\"家长\"}],\"sex\":[{ \"value\":335,\"name\":\"男\"},{\"value\":310,\"name\":\"女\"}],\"areaResource\":{\"areaName\":[ \"浮梁县\", \"珠山区\",\"昌江区\",\"乐平市\",\"浮梁县\", \"珠山区\",\"昌江区\",\"乐平市\",\"浮梁县\"],\"areaCount\":[204,204, 0,0,204,204, 0,0,0]}}";
//    	WriteFileThread writeFileThread = new WriteFileThread(jsonStr);
//        writeFileThread.start();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
