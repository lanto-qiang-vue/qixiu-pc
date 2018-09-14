package com.lanto.shqixiu.shcheck.util;

import java.lang.reflect.Method;
import java.util.List;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRField;

public class ReportDataSource implements JRDataSource{
	
	private int index=-1;
	private List list ;
	private Class clazz;
	
	
	

	private  ReportDataSource(){
		;
	}
	
	public  ReportDataSource(List list,Class clazz){
		this.list = list;
		this.clazz = clazz;
	}
	
	
	public Object getFieldValue(JRField field) throws JRException {
		Object object = null ;
		try {
			Method method = clazz.getMethod(this.getGetMethodName(field.getName()));
			object =  method.invoke(list.get(index), new Object[] {});
		} catch (Exception e) {
			e.printStackTrace();
		}
		//System.out.println(field.getName()+":"+object);
		return object;
	}

	public boolean next() throws JRException {
		index++;   
        return (index < list.size());   
	}
	
	private static String getGetMethodName(String field) {
		return "get" + field.substring(0, 1).toUpperCase() + field.substring(1);
	}

}
