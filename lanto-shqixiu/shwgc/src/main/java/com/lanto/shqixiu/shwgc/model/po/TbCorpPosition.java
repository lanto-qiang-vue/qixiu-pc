package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;

public class TbCorpPosition implements Serializable {
	private String corpId;	//企业ID
	private String longitude;	//经度
	private String latitude;	//纬度
	private String corpAddr;	//地址
	private String corpTel;	//电话
	private String selfIntroduction;	//业务介绍
	private Float corpStarLevel;	//企业星级评定

	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getCorpAddr() {
		return corpAddr;
	}
	public void setCorpAddr(String corpAddr) {
		this.corpAddr = corpAddr;
	}
	public String getCorpTel() {
		return corpTel;
	}
	public void setCorpTel(String corpTel) {
		this.corpTel = corpTel;
	}
	public String getSelfIntroduction() {
		return selfIntroduction;
	}
	public void setSelfIntroduction(String selfIntroduction) {
		this.selfIntroduction = selfIntroduction;
	}
	public Float getCorpStarLevel() {
		return corpStarLevel;
	}
	public void setCorpStarLevel(Float corpStarLevel) {
		this.corpStarLevel = corpStarLevel;
	}
}
