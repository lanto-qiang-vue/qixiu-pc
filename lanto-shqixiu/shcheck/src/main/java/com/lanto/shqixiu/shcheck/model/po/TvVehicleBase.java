package com.lanto.shqixiu.shcheck.model.po;

import java.io.Serializable;
import java.util.Date;

public class TvVehicleBase implements Serializable {
	private Integer vehicleId;	//VEHICLE_ID
	private String transCorpId;	//TRANS_CORP_ID
	private String vender;	//厂家
	private String brand;	//品牌
	private String xm;	//车型
	private String plateNum;	//PLATE_NUM
	private String plateColor;	//PLATE_COLOR
	private String vehicleType;	//VEHICLE_TYPE
	private String status;	//STATUS
	private String county;	//COUNTY
	private String loadCertNum;	//LOAD_CERT_NUM
	private String unitName;	//UNIT_NAME
	private String chassisNum;	//底盘号
	private String engineNum;	//发动机号
	private String fuelType;	//燃料类型
	private String tonnage;	//车辆吨位
	private String seat;	//座（卧）位
	private String useType;	//使用类别
	private Date certDate;	//CERT_DATE
	private Date checkDate;	//CHECK_DATE
	private String checkResult;	//CHECK_RESULT
	private Date updateDate;
	private String recordNo;
	private Integer firstMileage;
	private Date lastRepairDate;
	private Date lastCheckDate;
	private String photo;
	private Date regDate;//注册日期	
	private String isSingle;
	private String ownerName;
	private String ownerPhone;
	
	
	public String getIsSingle() {
		return isSingle;
	}
	public void setIsSingle(String isSingle) {
		this.isSingle = isSingle;
	}
	public String getOwnerName() {
		return ownerName;
	}
	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}
	public String getOwnerPhone() {
		return ownerPhone;
	}
	public void setOwnerPhone(String ownerPhone) {
		this.ownerPhone = ownerPhone;
	}
	public Date getRegDate() {
		return regDate;
	}
	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}
	public Integer getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}
	public String getTransCorpId() {
		return transCorpId;
	}
	public void setTransCorpId(String transCorpId) {
		this.transCorpId = transCorpId;
	}
	public String getVender() {
		return vender;
	}
	public void setVender(String vender) {
		this.vender = vender;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getXm() {
		return xm;
	}
	public void setXm(String xm) {
		this.xm = xm;
	}
	public String getPlateNum() {
		return plateNum;
	}
	public void setPlateNum(String plateNum) {
		this.plateNum = plateNum;
	}
	public String getPlateColor() {
		return plateColor;
	}
	public void setPlateColor(String plateColor) {
		this.plateColor = plateColor;
	}
	public String getVehicleType() {
		return vehicleType;
	}
	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCounty() {
		return county;
	}
	public void setCounty(String county) {
		this.county = county;
	}
	public String getLoadCertNum() {
		return loadCertNum;
	}
	public void setLoadCertNum(String loadCertNum) {
		this.loadCertNum = loadCertNum;
	}
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	public String getChassisNum() {
		return chassisNum;
	}
	public void setChassisNum(String chassisNum) {
		this.chassisNum = chassisNum;
	}
	public String getEngineNum() {
		return engineNum;
	}
	public void setEngineNum(String engineNum) {
		this.engineNum = engineNum;
	}
	public String getFuelType() {
		return fuelType;
	}
	public void setFuelType(String fuelType) {
		this.fuelType = fuelType;
	}
	public String getTonnage() {
		return tonnage;
	}
	public void setTonnage(String tonnage) {
		this.tonnage = tonnage;
	}
	public String getSeat() {
		return seat;
	}
	public void setSeat(String seat) {
		this.seat = seat;
	}
	public String getUseType() {
		return useType;
	}
	public void setUseType(String useType) {
		this.useType = useType;
	}
	public Date getCertDate() {
		return certDate;
	}
	public void setCertDate(Date certDate) {
		this.certDate = certDate;
	}
	public Date getCheckDate() {
		return checkDate;
	}
	public void setCheckDate(Date checkDate) {
		this.checkDate = checkDate;
	}
	public String getCheckResult() {
		return checkResult;
	}
	public void setCheckResult(String checkResult) {
		this.checkResult = checkResult;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	public String getRecordNo() {
		return recordNo;
	}
	public void setRecordNo(String recordNo) {
		this.recordNo = recordNo;
	}
	public Date getLastRepairDate() {
		return lastRepairDate;
	}
	public void setLastRepairDate(Date lastRepairDate) {
		this.lastRepairDate = lastRepairDate;
	}
	public Integer getFirstMileage() {
		return firstMileage;
	}
	public void setFirstMileage(Integer firstMileage) {
		this.firstMileage = firstMileage;
	}
	public Date getLastCheckDate() {
		return lastCheckDate;
	}
	public void setLastCheckDate(Date lastCheckDate) {
		this.lastCheckDate = lastCheckDate;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	
}
