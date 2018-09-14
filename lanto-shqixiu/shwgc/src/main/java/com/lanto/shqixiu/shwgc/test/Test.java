package com.lanto.shqixiu.shwgc.test;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

public class Test {
	

	/**
	 * @param args
	 * @throws Exception 
	 * @throws InvocationTargetException 
	 * @throws IllegalArgumentException 
	 * @throws IllegalAccessException 
	 * @throws InstantiationException 
	 */
	public static void main(String[] args) throws Exception  {
		long i = System.currentTimeMillis();
		JsonTest js = new JsonTest();
		String s = null;
		TestPo po = new TestPo();
		String json = "[{\"USER_NAME\":\"name0\",\"USER_AGE\":\"4\",CREATE_TIME:\"2014-10-18 20:47:66\",\"IS_STUDENT\":true3}," +
				"{\"USER_NAME\":\"name0\",\"USER_AGE\":\"44444444444444444444444444455\",\"CREATE_TIME\":\"2014-10-18 20:47:66\",\"IS_STUDENT\":false2}," +
				"{\"USER_NAME\":\"name0\",\"USER_AGE\":null,\"CREATE_TIME\":\"2014-10-18 20:47:66\",\"IS_STUDENT\":1},{\"USER_NAME\":\"name1\",\"USER_AGE\":5,\"IS_STUDENT\":\"true\"}]";
//		String json = "{\"userName\":\"name0\",\"userAgeee\":0,\"userMail\":7}";
		Gson gson = new GsonBuilder().enableComplexMapKeySerialization().create();
		List<Map<String,Object>> jsm = gson.fromJson(json, new TypeToken<List<Map<String,Object>>>(){}.getType());
		for(Map<String,Object> m : jsm){
			Set<String> set = new HashSet();
			set = m.keySet();
			for(String key : set){
				System.out.println(key + ":" + m.get(key));
			}
		}
		
//		po = gson.fromJson(json, TestPo.class);
		List<TestPo> li = new ArrayList<TestPo>();
		try {
			li = js.getPojoList(json,TestPo.class);
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for(TestPo p:li){
			System.out.println(p.getUserName() + ":" + p.getUserAge() + ":time:" + p.getCreateTime() + ":is:" + p.getIsStudent());
		}
		System.out.println(li.size());
		System.out.println((System.currentTimeMillis() - i));
	}

}
