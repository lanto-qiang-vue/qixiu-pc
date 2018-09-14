package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;

public class TbCorpPosition implements Serializable {
	private String corpId;
	private Float longitude;
	private Float latitude;
	private String CorpAddr;
	private String CorpTel;
	private String SelfIntroduction;
	private Float CorpStarLevel;

	public String getCorpId() {
		return corpId;
	}

	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}

	public Float getLongitude() {
		return longitude;
	}

	public void setLongitude(Float longitude) {
		this.longitude = longitude;
	}

	public Float getLatitude() {
		return latitude;
	}

	public void setLatitude(Float latitude) {
		this.latitude = latitude;
	}

	public String getCorpAddr() {
		return CorpAddr;
	}

	public void setCorpAddr(String corpAddr) {
		CorpAddr = corpAddr;
	}

	public String getCorpTel() {
		return CorpTel;
	}

	public void setCorpTel(String corpTel) {
		CorpTel = corpTel;
	}

	public String getSelfIntroduction() {
		return SelfIntroduction;
	}

	public void setSelfIntroduction(String selfIntroduction) {
		SelfIntroduction = selfIntroduction;
	}

	public Float getCorpStarLevel() {
		return CorpStarLevel;
	}

	public void setCorpStarLevel(Float corpStarLevel) {
		CorpStarLevel = corpStarLevel;
	}

	@Override
	public String toString() {
		return "TbCorpPosition [corpId=" + corpId + ", longitude=" + longitude
				+ ", latitude=" + latitude + ", CorpAddr=" + CorpAddr
				+ ", CorpTel=" + CorpTel + ", SelfIntroduction="
				+ SelfIntroduction + ", CorpStarLevel=" + CorpStarLevel + "]";
	}
	
}

