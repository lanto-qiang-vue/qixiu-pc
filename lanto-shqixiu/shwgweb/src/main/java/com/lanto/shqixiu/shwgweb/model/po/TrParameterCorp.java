package com.lanto.shqixiu.shwgweb.model.po;

import java.io.Serializable;

public class TrParameterCorp implements Serializable {
	private Integer id;	//ID
	private Integer paramsId;	//公共参数表ID
	private String corpId;	//企业ID
	private Integer paramsValue;	//参数值
	private String paramsUnit;	//参数单位
	private String peratorId;	//PERATOR_ID

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getParamsId() {
		return paramsId;
	}
	public void setParamsId(Integer paramsId) {
		this.paramsId = paramsId;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public Integer getParamsValue() {
		return paramsValue;
	}
	public void setParamsValue(Integer paramsValue) {
		this.paramsValue = paramsValue;
	}
	public String getParamsUnit() {
		return paramsUnit;
	}
	public void setParamsUnit(String paramsUnit) {
		this.paramsUnit = paramsUnit;
	}
	public String getPeratorId() {
		return peratorId;
	}
	public void setPeratorId(String peratorId) {
		this.peratorId = peratorId;
	}
}
