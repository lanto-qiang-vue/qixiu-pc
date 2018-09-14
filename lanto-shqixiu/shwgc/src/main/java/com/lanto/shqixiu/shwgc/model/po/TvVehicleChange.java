package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;
import java.util.Date;


public class TvVehicleChange implements Serializable {
	private Integer changeId;	
	private Integer vehicleId;
	private Date changeDate;
	private String changeReason;
	private String changeItem;
	private String changeRegistrant;
	private Date addTime;
	public Integer getChangeId() {
		return changeId;
	}
	public void setChangeId(Integer changeId) {
		this.changeId = changeId;
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
	public String getChangeReason() {
		return changeReason;
	}
	public void setChangeReason(String changeReason) {
		this.changeReason = changeReason;
	}
	public String getChangeItem() {
		return changeItem;
	}
	public void setChangeItem(String changeItem) {
		this.changeItem = changeItem;
	}
	public String getChangeRegistrant() {
		return changeRegistrant;
	}
	public void setChangeRegistrant(String changeRegistrant) {
		this.changeRegistrant = changeRegistrant;
	}
	public Date getAddTime() {
		return addTime;
	}
	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}
	
}

