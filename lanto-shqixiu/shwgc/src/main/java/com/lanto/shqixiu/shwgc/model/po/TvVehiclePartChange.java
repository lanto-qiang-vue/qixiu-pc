package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;
import java.util.Date;


public class TvVehiclePartChange implements Serializable {
	private Integer partId;	
	private Integer vehicleId;
	private Date changeDate;
	private String partName;
	private String repairUnit;
	private String partRegistrant;
	private Date addTime;
	public Integer getPartId() {
		return partId;
	}
	public void setPartId(Integer partId) {
		this.partId = partId;
	}
	public Integer getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}
	public Date getChangeDate() {
		return changeDate;
	}
	public void setChangeDate(Date changeDate) {
		this.changeDate = changeDate;
	}
	public String getPartName() {
		return partName;
	}
	public void setPartName(String partName) {
		this.partName = partName;
	}
	public String getRepairUnit() {
		return repairUnit;
	}
	public void setRepairUnit(String repairUnit) {
		this.repairUnit = repairUnit;
	}
	public String getPartRegistrant() {
		return partRegistrant;
	}
	public void setPartRegistrant(String partRegistrant) {
		this.partRegistrant = partRegistrant;
	}
	public Date getAddTime() {
		return addTime;
	}
	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}
	
	
}

