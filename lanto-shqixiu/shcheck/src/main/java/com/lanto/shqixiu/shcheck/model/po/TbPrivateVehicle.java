package com.lanto.shqixiu.shcheck.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbPrivateVehicle implements Serializable {
	private Integer vehicleId;
	private Integer userId;
	private String plateNum;
	private String plateColor;
	private String vehicleBrand;
	private String vehicleType;
	private String vehicleCapacity;
	private String productionYear;
	private Date buyTime;
	private String vin;
	private String engineNo;
	private String ownerName;
	private String ownerPhone;
	private String vheiclePhoto;
	private Date createTime;
	private String isSelect;
	private Date bindDate;
	private Date startRepairTime;
	
	public Integer getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
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
	public String getVehicleBrand() {
		return vehicleBrand;
	}
	public void setVehicleBrand(String vehicleBrand) {
		this.vehicleBrand = vehicleBrand;
	}
	public String getVehicleType() {
		return vehicleType;
	}
	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}
	public String getVehicleCapacity() {
		return vehicleCapacity;
	}
	public void setVehicleCapacity(String vehicleCapacity) {
		this.vehicleCapacity = vehicleCapacity;
	}
	public String getProductionYear() {
		return productionYear;
	}
	public void setProductionYear(String productionYear) {
		this.productionYear = productionYear;
	}
	public Date getBuyTime() {
		return buyTime;
	}
	public void setBuyTime(Date buyTime) {
		this.buyTime = buyTime;
	}
	public String getVin() {
		return vin;
	}
	public void setVin(String vin) {
		this.vin = vin;
	}
	public String getEngineNo() {
		return engineNo;
	}
	public void setEngineNo(String engineNo) {
		this.engineNo = engineNo;
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
	public String getVheiclePhoto() {
		return vheiclePhoto;
	}
	public void setVheiclePhoto(String vheiclePhoto) {
		this.vheiclePhoto = vheiclePhoto;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getIsSelect() {
		return isSelect;
	}
	public void setIsSelect(String isSelect) {
		this.isSelect = isSelect;
	}
	public Date getBindDate() {
		return bindDate;
	}
	public void setBindDate(Date bindDate) {
		this.bindDate = bindDate;
	}
	public Date getStartRepairTime() {
		return startRepairTime;
	}
	public void setStartRepairTime(Date startRepairTime) {
		this.startRepairTime = startRepairTime;
	}
	
}
