package com.lanto.shqixiu.shwgweb.model.po;

import java.io.Serializable;

public class TrPlateNumProvince implements Serializable {
	private Integer id;	//ID
	private String provinceName;	//名字

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getProvinceName() {
		return provinceName;
	}
	public void setProvinceName(String provinceName) {
		this.provinceName = provinceName;
	}
}
