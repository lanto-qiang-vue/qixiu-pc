package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;

public class TqSysInspector implements Serializable{
	private Integer id;
	private String certNum;
	private String name;
	private Integer corpId;
	
	public Integer getCorpId() {
		return corpId;
	}
	public void setCorpId(Integer corpId) {
		this.corpId = corpId;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getCertNum() {
		return certNum;
	}
	public void setCertNum(String certNum) {
		this.certNum = certNum;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
