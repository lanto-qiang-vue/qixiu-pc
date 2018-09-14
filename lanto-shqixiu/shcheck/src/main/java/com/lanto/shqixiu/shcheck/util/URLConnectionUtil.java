package com.lanto.shqixiu.shcheck.util;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.softbase.utils.SecurityEncode;

public class URLConnectionUtil {
	
	private static final String SERVLET_POST = "POST" ;
	private static final String SERVLET_GET = "GET" ;
	private static final String SERVLET_DELETE = "DELETE" ;
	private static final String SERVLET_PUT = "PUT" ;
	
	private static String prepareParam(Map<String,Object> paramMap){
		StringBuffer sb = new StringBuffer();
		if(paramMap == null){
			paramMap = new HashMap<String,Object>();
		}
		paramMap.put("securetyKey", SecurityEncode.encoderByDES("gzjr", SecurityEncode.DES_KEY));
		paramMap.put("securetyVal", SecurityEncode.encoderByDES("gzjr*&&##&**", SecurityEncode.DES_KEY));
		if(paramMap.isEmpty()){
			return "" ;
		}else{
			for(String key: paramMap.keySet()){
				String value = (String)paramMap.get(key);
				if(sb.length()<1){
					sb.append(key).append("=").append(value);
				}else{
					sb.append("&").append(key).append("=").append(value);
				}
			}
			return sb.toString();
		}
	}
	
	public static String  doPost(String urlStr,Map<String,Object> paramMap ) throws Exception{
		URL url = new URL(urlStr);
		HttpURLConnection conn = (HttpURLConnection)url.openConnection();
		conn.setRequestMethod(SERVLET_POST);
		String paramStr = prepareParam(paramMap);
		conn.setDoInput(true);
		conn.setDoOutput(true);
		OutputStream os = conn.getOutputStream();     
		os.write(paramStr.toString().getBytes("utf-8"));
		os.flush();
		os.close();   		
		conn.setConnectTimeout(60000);
		conn.setReadTimeout(60000);
		conn.connect();
		InputStream inp =  conn.getInputStream();
		BufferedReader reader = new BufferedReader(new InputStreamReader(inp,"UTF-8"));
		// 读取结果
		String line;
		String out = "";
		while ((line = reader.readLine()) != null) {
			out = out + line;
		}
		inp.close();
		reader.close();
		return out;
	}
	
	public static String  doGet(String urlStr,Map<String,Object> paramMap ) throws Exception{
		String paramStr = prepareParam(paramMap);
		if(paramStr == null || paramStr.trim().length()<1){
			
		}else{
			urlStr +="?"+paramStr;
		}
		System.out.println(urlStr);
		URL url = new URL(urlStr);
		HttpURLConnection conn = (HttpURLConnection)url.openConnection();
		conn.setRequestMethod(SERVLET_GET);
		conn.setRequestProperty("Content-Type","text/html; charset=UTF-8");
		
		conn.connect();
		InputStream inp =  conn.getInputStream();
		BufferedReader reader = new BufferedReader(new InputStreamReader(
				inp,"UTF-8"));
		// 读取结果
		String line;
		String out = "";
		while ((line = reader.readLine()) != null) {
			out = out + line;
		}
		inp.close();
		reader.close();
		return out;
	}
	
	public static void doPut(String urlStr,Map<String,Object> paramMap) throws Exception{
		URL url = new URL(urlStr);
		HttpURLConnection conn = (HttpURLConnection)url.openConnection();
		conn.setRequestMethod(SERVLET_PUT);
		String paramStr = prepareParam(paramMap);
		conn.setDoInput(true);
		conn.setDoOutput(true);
		OutputStream os = conn.getOutputStream();     
		os.write(paramStr.toString().getBytes("utf-8"));     
		os.close();   		
		
		BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
		String line ;
		String result ="";
		while( (line =br.readLine()) != null ){
			result += "\n"+line;
		}
		System.out.println(result);
		br.close();
				
	}
	
	public static void doDelete(String urlStr,Map<String,Object> paramMap) throws Exception{
		String paramStr = prepareParam(paramMap);
		if(paramStr == null || paramStr.trim().length()<1){
			
		}else{
			urlStr +="?"+paramStr;
		}	
		System.out.println(urlStr);
		URL url = new URL(urlStr);
		HttpURLConnection conn = (HttpURLConnection)url.openConnection();
		conn.setDoOutput(true);
		conn.setRequestMethod(SERVLET_DELETE);
		//屏蔽掉的代码是错误的，java.net.ProtocolException: HTTP method DELETE doesn't support output
/*		OutputStream os = conn.getOutputStream();     
		os.write(paramStr.toString().getBytes("utf-8"));     
		os.close();  */ 
		
		if(conn.getResponseCode() ==200){
			System.out.println("成功");
		}else{
			System.out.println(conn.getResponseCode());
		}
	}
	
	public static void main(String[] args) throws Exception{
		String urlStr = "http://localhost:8080/XjptService/index";
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("username","张三");
		map.put("password","88888");
		URLConnectionUtil.doGet(urlStr, map);
//		URLConnectionUtil.doPost(urlStr, map);
//		URLConnectionUtil.doPut(urlStr, map);
//		URLConnectionUtil.doDelete(urlStr, map);
		
	}
	
	
}

