package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;
import java.util.Date;


public class TvVehicleAccident implements Serializable {
	private Integer accidentId;	
	private Integer vehicleId;
	private Date accidentDate;
	private String accidentAddr;
	private String accidentNature;
	private String accidentResponsibility;
	private String accidentDescription;		//事故种类及车辆损坏情况
	private Integer economicLosses;	//直接经济损失
	private String accidentRegistrant;	//登记人
	private Date addTime;
	public Integer getAccidentId() {
		return accidentId;
	}
	public void setAccidentId(Integer accidentId) {
		this.accidentId = accidentId;
	}
	public Integer getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}
	public Date getAccidentDate() {
		return accidentDate;
	}
	public void setAccidentDate(Date accidentDate) {
		this.accidentDate = accidentDate;
	}
	public String getAccidentAddr() {
		return accidentAddr;
	}
	public void setAccidentAddr(String accidentAddr) {
		this.accidentAddr = accidentAddr;
	}
	public String getAccidentNature() {
		return accidentNature;
	}
	public void setAccidentNature(String accidentNature) {
		this.accidentNature = accidentNature;
	}
	public String getAccidentResponsibility() {
		return accidentResponsibility;
	}
	public void setAccidentResponsibility(String accidentResponsibility) {
		this.accidentResponsibility = accidentResponsibility;
	}
	public String getAccidentDescription() {
		return accidentDescription;
	}
	public void setAccidentDescription(String accidentDescription) {
		this.accidentDescription = accidentDescription;
	}
	public int getEconomicLosses() {
		return economicLosses;
	}
	public void setEconomicLosses(Integer economicLosses) {
		this.economicLosses = economicLosses;
	}
	public String getAccidentRegistrant() {
		return accidentRegistrant;
	}
	public void setAccidentRegistrant(String accidentRegistrant) {
		this.accidentRegistrant = accidentRegistrant;
	}
	public Date getAddTime() {
		return addTime;
	}
	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}
	
}

