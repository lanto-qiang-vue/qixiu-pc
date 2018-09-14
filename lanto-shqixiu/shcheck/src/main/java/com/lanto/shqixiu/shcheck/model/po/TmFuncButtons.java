package com.lanto.shqixiu.shcheck.model.po;

import java.io.Serializable;

public class TmFuncButtons implements Serializable {
	private Integer id;	//ID
	private String code;	//编码
	private String name;	//名称

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
}
