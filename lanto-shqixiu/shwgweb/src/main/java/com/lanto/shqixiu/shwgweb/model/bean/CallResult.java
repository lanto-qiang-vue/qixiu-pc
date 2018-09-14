package com.lanto.shqixiu.shwgweb.model.bean;

import java.util.HashMap;
import java.util.Map;

public class CallResult {
	private String tip;
	private Map<String,Object> data;
	
	public String getTip() {
		return tip;
	}
	public void setTip(String tip) {
		this.tip = tip;
	}
	public boolean isSuccess() {
		return this.tip == null;
	}
	public Object get(String key) {
		if(this.data == null){
			return null;
		}
		return this.data.get(key);
	}
	public void put(String key,Object value) {
		if(this.data == null){
			this.data = new HashMap<String, Object>();
		}
		this.data.put(key, value);
	}

	public void setData(Map<String,Object> data){
		this.data = data;
	}
}
