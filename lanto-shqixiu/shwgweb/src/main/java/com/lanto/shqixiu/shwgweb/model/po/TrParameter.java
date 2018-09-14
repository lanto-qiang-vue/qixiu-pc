package com.lanto.shqixiu.shwgweb.model.po;

import java.io.Serializable;

public class TrParameter implements Serializable {
	private Integer paramsId;	//参数ID
	private String paramsCode;	//参数编码
	private String paramsName;	//参数名称
	private Integer paramsValue;	//参数值
	private String paramsUnit;	//参数单位
	private String isStop;	//是否有效
	private String peratorId;	//PERATOR_ID

	public Integer getParamsId() {
		return paramsId;
	}
	public void setParamsId(Integer paramsId) {
		this.paramsId = paramsId;
	}
	public String getParamsCode() {
		return paramsCode;
	}
	public void setParamsCode(String paramsCode) {
		this.paramsCode = paramsCode;
	}
	public String getParamsName() {
		return paramsName;
	}
	public void setParamsName(String paramsName) {
		this.paramsName = paramsName;
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
	public String getIsStop() {
		return isStop;
	}
	public void setIsStop(String isStop) {
		this.isStop = isStop;
	}
	public String getPeratorId() {
		return peratorId;
	}
	public void setPeratorId(String peratorId) {
		this.peratorId = peratorId;
	}
}
