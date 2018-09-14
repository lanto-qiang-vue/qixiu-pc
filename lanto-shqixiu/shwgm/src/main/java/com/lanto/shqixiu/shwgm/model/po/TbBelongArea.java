package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;

public class TbBelongArea implements Serializable {
	private Integer id;	//ID
	private String code;	//市行政代码
	private String name;	//市行政名称

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
