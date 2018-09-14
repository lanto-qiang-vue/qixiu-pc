package com.lanto.shqixiu.shcheck.model.po;

import java.io.Serializable;
import java.util.Date;

public class TvVehicleParam implements Serializable {
	private Integer paramId;	
	private Integer vehicleId;
	private Date productionDate;
	private String productionPlace;
	private String brandModel;
	private String busLevel;
	private String vehicleDimensions;
	private Float totalMass;
	private String seatArrangement;
	private Integer occupantNumber;
	private Float tractionMass;	
	private Integer axleNumber;
	private String engineBrand;
	private Integer enginePower;
	private Integer engineDisplacement;
	private String emissionStandard;
	private String driveType;
	private Integer tyreNumber;
	private String headlightType;
	private String transmissionType;
	private String retarder;
	private String steeringGear;
	private String brakeType;
	private String suspensionType;
	private String qtpz;	//其他配置  otherConfig会与json转换的关键字冲突
	private Date addTime;
	public Integer getParamId() {
		return paramId;
	}
	public void setParamId(Integer paramId) {
		this.paramId = paramId;
	}
	public Integer getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}
	public Date getProductionDate() {
		return productionDate;
	}
	public void setProductionDate(Date productionDate) {
		this.productionDate = productionDate;
	}
	public String getProductionPlace() {
		return productionPlace;
	}
	public void setProductionPlace(String productionPlace) {
		this.productionPlace = productionPlace;
	}
	public String getBrandModel() {
		return brandModel;
	}
	public void setBrandModel(String brandModel) {
		this.brandModel = brandModel;
	}
	public String getBusLevel() {
		return busLevel;
	}
	public void setBusLevel(String busLevel) {
		this.busLevel = busLevel;
	}
	public String getVehicleDimensions() {
		return vehicleDimensions;
	}
	public void setVehicleDimensions(String vehicleDimensions) {
		this.vehicleDimensions = vehicleDimensions;
	}
	public Float getTotalMass() {
		return totalMass;
	}
	public void setTotalMass(Float totalMass) {
		this.totalMass = totalMass;
	}
	public String getSeatArrangement() {
		return seatArrangement;
	}
	public void setSeatArrangement(String seatArrangement) {
		this.seatArrangement = seatArrangement;
	}
	public Integer getOccupantNumber() {
		return occupantNumber;
	}
	public void setOccupantNumber(Integer occupantNumber) {
		this.occupantNumber = occupantNumber;
	}
	public Float getTractionMass() {
		return tractionMass;
	}
	public void setTractionMass(Float tractionMass) {
		this.tractionMass = tractionMass;
	}
	public Integer getAxleNumber() {
		return axleNumber;
	}
	public void setAxleNumber(Integer axleNumber) {
		this.axleNumber = axleNumber;
	}
	public String getEngineBrand() {
		return engineBrand;
	}
	public void setEngineBrand(String engineBrand) {
		this.engineBrand = engineBrand;
	}
	public Integer getEnginePower() {
		return enginePower;
	}
	public void setEnginePower(Integer enginePower) {
		this.enginePower = enginePower;
	}
	
	public Integer getEngineDisplacement() {
		return engineDisplacement;
	}
	public void setEngineDisplacement(Integer engineDisplacement) {
		this.engineDisplacement = engineDisplacement;
	}
	public String getEmissionStandard() {
		return emissionStandard;
	}
	public void setEmissionStandard(String emissionStandard) {
		this.emissionStandard = emissionStandard;
	}
	
	public String getDriveType() {
		return driveType;
	}
	public void setDriveType(String driveType) {
		this.driveType = driveType;
	}
	public Integer getTyreNumber() {
		return tyreNumber;
	}
	public void setTyreNumber(Integer tyreNumber) {
		this.tyreNumber = tyreNumber;
	}
	public String getHeadlightType() {
		return headlightType;
	}
	public void setHeadlightType(String headlightType) {
		this.headlightType = headlightType;
	}
	public String getTransmissionType() {
		return transmissionType;
	}
	public void setTransmissionType(String transmissionType) {
		this.transmissionType = transmissionType;
	}
	public String getRetarder() {
		return retarder;
	}
	public void setRetarder(String retarder) {
		this.retarder = retarder;
	}
	public String getSteeringGear() {
		return steeringGear;
	}
	public void setSteeringGear(String steeringGear) {
		this.steeringGear = steeringGear;
	}
	public String getBrakeType() {
		return brakeType;
	}
	public void setBrakeType(String brakeType) {
		this.brakeType = brakeType;
	}
	public String getSuspensionType() {
		return suspensionType;
	}
	public void setSuspensionType(String suspensionType) {
		this.suspensionType = suspensionType;
	}
	public String getQtpz() {
		return qtpz;
	}
	public void setQtpz(String qtpz) {
		this.qtpz = qtpz;
	}
	public Date getAddTime() {
		return addTime;
	}
	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}
	
}

