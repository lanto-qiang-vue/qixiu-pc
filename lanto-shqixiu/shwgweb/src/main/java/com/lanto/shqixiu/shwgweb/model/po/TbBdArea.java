package com.lanto.shqixiu.shwgweb.model.po;

import java.io.Serializable;

public class TbBdArea implements Serializable {
	private Integer id;	//ID
	private String areaCode;	//辖区代码
	private String areaName;	//辖区名称

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getAreaCode() {
		return areaCode;
	}
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
}
