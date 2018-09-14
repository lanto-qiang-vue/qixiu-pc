package com.lanto.shqixiu.shcheck.controller.wgcx;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class Test {

	/**
	 * @param args
	 * @throws IOException 
	 */
	public static void main(String[] args) throws IOException {
		
		Test.wgpt();
		//前置注册
//		Test.stuApply();
		//提交意向
//		Test.submitIntention();
	}
	
	public static void wgpt() throws IOException{
//		String address = "http://192.168.2.176:8080/gzwgptc/remote/generepair/getRepairType?accept_token=23e45e6601d71442daafc027cc761e98";
//		URL url = new URL(address);
//		HttpURLConnection conn = (HttpURLConnection)url.openConnection();
//		conn.setRequestMethod("POST");
//		conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
//		//身份证、车型、企业编号
////		String paramStr = "{certNum:\"430522198710016376\",mobilePhone:\"17722858701\",studentName:\"xxxx\"}";
//		
//		conn.setConnectTimeout(60000);
//		conn.setReadTimeout(60000);
//		conn.connect();
//		InputStream inp =  conn.getInputStream();
//		BufferedReader reader = new BufferedReader(new InputStreamReader(inp,"UTF-8"));
//		// 读取结果
//		String line;
//		String out = ""; //返回的结果
//		while ((line = reader.readLine()) != null) {
//			out = out + line;
//		}
//		inp.close();//请记得关闭
//		reader.close();//请记得关闭
//		System.out.println(out);
		
		String address = "http://192.168.2.176:8080/gzwgptc/remote/generepair/getGeneModel?accept_token=23e45e6601d71442daafc027cc761e98";
		URL url = new URL(address);
		HttpURLConnection conn = (HttpURLConnection)url.openConnection();
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-Type", "text/xml; charset=UTF-8");
		//String paramStr = "{repair:{GENE_ID:\"103\",DELEGATE_NAME:\"张三2\",TEL_PHONE:\"17722858701\",PLATE_NUM:\"粤A.88888\",PLATE_COLOR:\"10061001\",EXAMINER:\"20\",LEAVE_DATE:\"2016-01-12\",LEAVE_MILEAGE:\"88888\",VEHICLE_TYPE:\"10341001\",VEHICLE_NATURE:\"10081001\",IS_CHANGE_PART:\"10041001\"}, details:[{REPAIR_TYPE:\"10111001\",REPAIR_ITEM:\"10121004\"}],parts:[{PART_CODE:\"备件编码01\",PART_NAME:\"备件各称01\",PART_COUNT:1}],photos:{}}";
		String paramStr = "{GENE_ID:\"103\"}";

		conn.setDoInput(true);
		conn.setDoOutput(true);
		OutputStream os = conn.getOutputStream();     
		os.write(paramStr.getBytes("utf-8"));
		os.flush();
		os.close();   		
		conn.setConnectTimeout(60000);
		conn.setReadTimeout(60000);
		conn.connect();
		InputStream inp =  conn.getInputStream();
		BufferedReader reader = new BufferedReader(new InputStreamReader(inp,"UTF-8"));
		// 读取结果
		String line;
		String out = ""; //返回的结果
		while ((line = reader.readLine()) != null) {
			out = out + line;
		}
		inp.close();//请记得关闭
		reader.close();//请记得关闭
		System.out.println(out);

	}
	
	public static void stuApply() throws IOException{
		String address = "http://219.136.133.169:10114/XjptService/remote/stuApply?accept_token=b142af8a4900b301b6d94f51290cef46";
		URL url = new URL(address);
		HttpURLConnection conn = (HttpURLConnection)url.openConnection();
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
		//身份证、车型、企业编号
		String paramStr = "{certNum:\"430522198710016376\",mobilePhone:\"17722858701\",studentName:\"xxxx\"}";
		conn.setDoInput(true);
		conn.setDoOutput(true);
		OutputStream os = conn.getOutputStream();     
		os.write(paramStr.getBytes("utf-8"));
		os.flush();
		os.close();   		
		conn.setConnectTimeout(60000);
		conn.setReadTimeout(60000);
		conn.connect();
		InputStream inp =  conn.getInputStream();
		BufferedReader reader = new BufferedReader(new InputStreamReader(inp,"UTF-8"));
		// 读取结果
		String line;
		String out = ""; //返回的结果
		while ((line = reader.readLine()) != null) {
			out = out + line;
		}
		inp.close();//请记得关闭
		reader.close();//请记得关闭
		System.out.println(out);
	}
	
	public static void submitIntention() throws IOException{
		String address = "http://219.136.133.169:10114/XjptService/remote/submitIntention?accept_token=b142af8a4900b301b6d94f51290cef46";
		URL url = new URL(address);
		HttpURLConnection conn = (HttpURLConnection)url.openConnection();
		conn.setRequestMethod("POST");
		conn.setRequestProperty("Content-Type", "application/json; charset=UTF-8");
		//身份证、车型、企业编号
		String paramStr = "{certNum:\"430522198710016376\",vehicleType:\"C1\",corpId:\"20110860\"}";
		conn.setDoInput(true);
		conn.setDoOutput(true);
		OutputStream os = conn.getOutputStream();     
		os.write(paramStr.getBytes("utf-8"));
		os.flush();
		os.close();   		
		conn.setConnectTimeout(60000);
		conn.setReadTimeout(60000);
		conn.connect();
		InputStream inp =  conn.getInputStream();
		BufferedReader reader = new BufferedReader(new InputStreamReader(inp,"UTF-8"));
		// 读取结果
		String line;
		String out = ""; //返回的结果
		while ((line = reader.readLine()) != null) {
			out = out + line;
		}
		inp.close();//请记得关闭
		reader.close();//请记得关闭
		System.out.println(out);
	}
}
