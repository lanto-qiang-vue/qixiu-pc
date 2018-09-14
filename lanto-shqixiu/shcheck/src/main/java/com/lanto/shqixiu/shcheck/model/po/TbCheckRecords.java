package com.lanto.shqixiu.shcheck.model.po;

import java.util.Date;

public class TbCheckRecords {
	private Integer checkId;
	private Integer stationId;
	private Integer vehicleId;
	private String plateNum;
	private String transCorpName;
	private Integer recordId;
	private Date checkStartTime;
	private Date checkEndTime;
	private String checkType;
	private String vehicleLevel;
	private String checkPerson;
	private String checkResult;
	private String status;
	
	
	
	public Date getCheckStartTime() {
		return checkStartTime;
	}
	public void setCheckStartTime(Date checkStartTime) {
		this.checkStartTime = checkStartTime;
	}
	public Date getCheckEndTime() {
		return checkEndTime;
	}
	public void setCheckEndTime(Date checkEndTime) {
		this.checkEndTime = checkEndTime;
	}
	public Integer getCheckId() {
		return checkId;
	}
	public void setCheckId(Integer checkId) {
		this.checkId = checkId;
	}
	public Integer getStationId() {
		return stationId;
	}
	public void setStationId(Integer stationId) {
		this.stationId = stationId;
	}
	public Integer getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}
	public String getPlateNum() {
		return plateNum;
	}
	public void setPlateNum(String plateNum) {
		this.plateNum = plateNum;
	}
	public String getTransCorpName() {
		return transCorpName;
	}
	public void setTransCorpName(String transCorpName) {
		this.transCorpName = transCorpName;
	}
	public Integer getRecordId() {
		return recordId;
	}
	public void setRecordId(Integer recordId) {
		this.recordId = recordId;
	}
	public String getCheckType() {
		return checkType;
	}
	public void setCheckType(String checkType) {
		this.checkType = checkType;
	}
	public String getVehicleLevel() {
		return vehicleLevel;
	}
	public void setVehicleLevel(String vehicleLevel) {
		this.vehicleLevel = vehicleLevel;
	}
	public String getCheckPerson() {
		return checkPerson;
	}
	public void setCheckPerson(String checkPerson) {
		this.checkPerson = checkPerson;
	}
	public String getCheckResult() {
		return checkResult;
	}
	public void setCheckResult(String checkResult) {
		this.checkResult = checkResult;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
}
