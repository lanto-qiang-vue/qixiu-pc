package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbCorpJoin implements Serializable {
	private Integer joinId;	
	private Integer corpId;
	private String recordNo;
	private String profile;
	private Date applyDate;
	private String applyPerson;
	private String checkOpinion;
	private String checkPerson;
	private Date checkDate;
	private String status;
	
	private String frontPhoto;
	private Double longitude;
	private Double latitude;
	
	
	
	public String getRecordNo() {
		return recordNo;
	}
	public void setRecordNo(String recordNo) {
		this.recordNo = recordNo;
	}
	public Integer getJoinId() {
		return joinId;
	}
	public void setJoinId(Integer joinId) {
		this.joinId = joinId;
	}
	public Integer getCorpId() {
		return corpId;
	}
	public void setCorpId(Integer corpId) {
		this.corpId = corpId;
	}
	public String getProfile() {
		return profile;
	}
	public void setProfile(String profile) {
		this.profile = profile;
	}
	public String getFrontPhoto() {
		return frontPhoto;
	}
	public void setFrontPhoto(String frontPhoto) {
		this.frontPhoto = frontPhoto;
	}
	public Date getApplyDate() {
		return applyDate;
	}
	public void setApplyDate(Date applyDate) {
		this.applyDate = applyDate;
	}
	public String getApplyPerson() {
		return applyPerson;
	}
	public void setApplyPerson(String applyPerson) {
		this.applyPerson = applyPerson;
	}
	public String getCheckOpinion() {
		return checkOpinion;
	}
	public void setCheckOpinion(String checkOpinion) {
		this.checkOpinion = checkOpinion;
	}
	public String getCheckPerson() {
		return checkPerson;
	}
	public void setCheckPerson(String checkPerson) {
		this.checkPerson = checkPerson;
	}
	public Date getCheckDate() {
		return checkDate;
	}
	public void setCheckDate(Date checkDate) {
		this.checkDate = checkDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Double getLongitude() {
		return longitude;
	}
	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}
	public Double getLatitude() {
		return latitude;
	}
	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}
	
}

