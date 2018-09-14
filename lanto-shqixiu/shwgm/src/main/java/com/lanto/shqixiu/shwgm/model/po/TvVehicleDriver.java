package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;
import java.util.Date;


public class TvVehicleDriver implements Serializable {
	private Integer driverId;	
	private Integer vehicleId;
	private String driverName;
	private String idNum;
	private String licenceType;
	private String licenceNum;
	private String certificateNum;
	private String certificateType;
	private Date entryTime;
	private Date dimissionTime;
	private Double safeMileage;
	private String illegalRecord;
	private String accidentRecord;
	private String otherComplaints;
	private Date addTime;
	public Integer getDriverId() {
		return driverId;
	}
	public void setDriverId(Integer driverId) {
		this.driverId = driverId;
	}
	public Integer getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}
	public String getDriverName() {
		return driverName;
	}
	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}
	public String getIdNum() {
		return idNum;
	}
	public void setIdNum(String idNum) {
		this.idNum = idNum;
	}
	public String getLicenceType() {
		return licenceType;
	}
	public void setLicenceType(String licenceType) {
		this.licenceType = licenceType;
	}
	public String getLicenceNum() {
		return licenceNum;
	}
	public void setLicenceNum(String licenceNum) {
		this.licenceNum = licenceNum;
	}
	public String getCertificateNum() {
		return certificateNum;
	}
	public void setCertificateNum(String certificateNum) {
		this.certificateNum = certificateNum;
	}
	public String getCertificateType() {
		return certificateType;
	}
	public void setCertificateType(String certificateType) {
		this.certificateType = certificateType;
	}
	public Date getEntryTime() {
		return entryTime;
	}
	public void setEntryTime(Date entryTime) {
		this.entryTime = entryTime;
	}
	public Date getDimissionTime() {
		return dimissionTime;
	}
	public void setDimissionTime(Date dimissionTime) {
		this.dimissionTime = dimissionTime;
	}
	public Double getSafeMileage() {
		return safeMileage;
	}
	public void setSafeMileage(Double safeMileage) {
		this.safeMileage = safeMileage;
	}
	public String getIllegalRecord() {
		return illegalRecord;
	}
	public void setIllegalRecord(String illegalRecord) {
		this.illegalRecord = illegalRecord;
	}
	public String getAccidentRecord() {
		return accidentRecord;
	}
	public void setAccidentRecord(String accidentRecord) {
		this.accidentRecord = accidentRecord;
	}
	public String getOtherComplaints() {
		return otherComplaints;
	}
	public void setOtherComplaints(String otherComplaints) {
		this.otherComplaints = otherComplaints;
	}
	public Date getAddTime() {
		return addTime;
	}
	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}
	
}

