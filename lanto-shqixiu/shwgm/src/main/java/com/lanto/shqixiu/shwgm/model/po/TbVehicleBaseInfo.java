package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbVehicleBaseInfo implements Serializable {
	private Integer vechileId;	//VECHILE_ID
	private String vechileNum;	//车牌号码
	private String vechileColor;	//车牌颜色
	private String operatingUnit;	//车主
	private String operatingLicence;	//道路运输证号
	private Date operatingLicenceDate;	//运输证发放日期
	private String areaName;	//所属辖区
	private String vin;	//车架号
	private String engineNumber;	//发动机号
	private String fuelType;	//燃料
	private String brand;	//品牌
	private String model;	//车型
	private String vehicleType;	//车辆类型(如大货车 大客车等)
	private String vehicleKind;	//营运种类(如客运班车等)
	private Date buyDate;	//购车日期
	private Date driveDate;	//行驶证发放日期
	private String vechileLevel;	//技术等级
	private Float loading;	//载重
	private Integer seat;	//座位
	private String remark;	//REMARK
	private String status;	//状态
	private String photo;	//照片(仅作演示用)

	public Integer getVechileId() {
		return vechileId;
	}
	public void setVechileId(Integer vechileId) {
		this.vechileId = vechileId;
	}
	public String getVechileNum() {
		return vechileNum;
	}
	public void setVechileNum(String vechileNum) {
		this.vechileNum = vechileNum;
	}
	public String getVechileColor() {
		return vechileColor;
	}
	public void setVechileColor(String vechileColor) {
		this.vechileColor = vechileColor;
	}
	public String getOperatingUnit() {
		return operatingUnit;
	}
	public void setOperatingUnit(String operatingUnit) {
		this.operatingUnit = operatingUnit;
	}
	public String getOperatingLicence() {
		return operatingLicence;
	}
	public void setOperatingLicence(String operatingLicence) {
		this.operatingLicence = operatingLicence;
	}
	public Date getOperatingLicenceDate() {
		return operatingLicenceDate;
	}
	public void setOperatingLicenceDate(Date operatingLicenceDate) {
		this.operatingLicenceDate = operatingLicenceDate;
	}
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	public String getVin() {
		return vin;
	}
	public void setVin(String vin) {
		this.vin = vin;
	}
	public String getEngineNumber() {
		return engineNumber;
	}
	public void setEngineNumber(String engineNumber) {
		this.engineNumber = engineNumber;
	}
	public String getFuelType() {
		return fuelType;
	}
	public void setFuelType(String fuelType) {
		this.fuelType = fuelType;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getVehicleType() {
		return vehicleType;
	}
	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}
	public String getVehicleKind() {
		return vehicleKind;
	}
	public void setVehicleKind(String vehicleKind) {
		this.vehicleKind = vehicleKind;
	}
	public Date getBuyDate() {
		return buyDate;
	}
	public void setBuyDate(Date buyDate) {
		this.buyDate = buyDate;
	}
	public Date getDriveDate() {
		return driveDate;
	}
	public void setDriveDate(Date driveDate) {
		this.driveDate = driveDate;
	}
	public String getVechileLevel() {
		return vechileLevel;
	}
	public void setVechileLevel(String vechileLevel) {
		this.vechileLevel = vechileLevel;
	}
	public Float getLoading() {
		return loading;
	}
	public void setLoading(Float loading) {
		this.loading = loading;
	}
	public Integer getSeat() {
		return seat;
	}
	public void setSeat(Integer seat) {
		this.seat = seat;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
}
