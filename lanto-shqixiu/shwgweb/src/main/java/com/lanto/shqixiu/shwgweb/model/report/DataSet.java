package com.lanto.shqixiu.shwgweb.model.report;


public class DataSet {
	
	
	private String setName;
	private Object data;
	private Class clazz;
	
	public DataSet(String setName, Object data,Class clazz) {
		super();
		this.setName = setName;
		this.data = data;
		this.clazz = clazz;
	}
	
	public DataSet(String setName,Class clazz) {
		super();
		this.setName = setName;
		this.clazz = clazz;
	}
	
	public String getSetName() {
		return setName;
	}

	public void setSetName(String setName) {
		this.setName = setName;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public Class getClazz() {
		return clazz;
	}

	public void setClazz(Class clazz) {
		this.clazz = clazz;
	}
	
	
}
