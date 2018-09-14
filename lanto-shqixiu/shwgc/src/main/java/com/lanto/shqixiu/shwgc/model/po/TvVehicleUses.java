package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;
import java.util.Date;


public class TvVehicleUses implements Serializable {
	private Integer usesId;	
	private Integer vehicleId;
	private Date usesTime;
	private Float mileage;
	private Float intervalMileage;
	private Float fuelConsumption;
	private Float quota;
	private Float surplus;
	private Float deficit;
	private String useUnit;
	private String driverName;	
	private Date addTime;
	public Integer getUsesId() {
		return usesId;
	}
	public void setUsesId(Integer usesId) {
		this.usesId = usesId;
	}
	public Integer getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}
	public Date getUsesTime() {
		return usesTime;
	}
	public void setUsesTime(Date usesTime) {
		this.usesTime = usesTime;
	}
	public Float getMileage() {
		return mileage;
	}
	public void setMileage(Float mileage) {
		this.mileage = mileage;
	}
	public Float getIntervalMileage() {
		return intervalMileage;
	}
	public void setIntervalMileage(Float intervalMileage) {
		this.intervalMileage = intervalMileage;
	}
	public Float getFuelConsumption() {
		return fuelConsumption;
	}
	public void setFuelConsumption(Float fuelConsumption) {
		this.fuelConsumption = fuelConsumption;
	}
	public Float getQuota() {
		return quota;
	}
	public void setQuota(Float quota) {
		this.quota = quota;
	}
	public Float getSurplus() {
		return surplus;
	}
	public void setSurplus(Float surplus) {
		this.surplus = surplus;
	}
	public Float getDeficit() {
		return deficit;
	}
	public void setDeficit(Float deficit) {
		this.deficit = deficit;
	}
	public String getUseUnit() {
		return useUnit;
	}
	public void setUseUnit(String useUnit) {
		this.useUnit = useUnit;
	}
	public String getDriverName() {
		return driverName;
	}
	public void setDriverName(String driverName) {
		this.driverName = driverName;
	}
	public Date getAddTime() {
		return addTime;
	}
	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}
	
	
	
}

