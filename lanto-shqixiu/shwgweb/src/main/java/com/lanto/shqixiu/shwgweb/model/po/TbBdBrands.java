package com.lanto.shqixiu.shwgweb.model.po;

import java.io.Serializable;

public class TbBdBrands implements Serializable {
	private Integer id;	
	private String name;
	private String bfirstLatter;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBfirstLatter() {
		return bfirstLatter;
	}
	public void setBfirstLatter(String bfirstLatter) {
		this.bfirstLatter = bfirstLatter;
	}	
}
