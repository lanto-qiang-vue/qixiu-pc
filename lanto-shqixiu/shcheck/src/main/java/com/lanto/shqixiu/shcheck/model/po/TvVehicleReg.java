package com.lanto.shqixiu.shcheck.model.po;

import java.io.Serializable;
import java.util.Date;


public class TvVehicleReg implements Serializable {
	private Integer regId;	
	private Integer vehicleId;
	private Date wxRq;
	
	private String wxLb;
	private String wxNr;
	private String wxDw;
	private String wxDjr;
	private Date addTime;
	
	public Integer getRegId() {
		return regId;
	}
	public void setRegId(Integer regId) {
		this.regId = regId;
	}
	public Integer getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}
	public Date getWxRq() {
		return wxRq;
	}
	public void setWxRq(Date wxRq) {
		this.wxRq = wxRq;
	}
	public String getWxLb() {
		return wxLb;
	}
	public void setWxLb(String wxLb) {
		this.wxLb = wxLb;
	}
	public String getWxNr() {
		return wxNr;
	}
	public void setWxNr(String wxNr) {
		this.wxNr = wxNr;
	}
	public String getWxDw() {
		return wxDw;
	}
	public void setWxDw(String wxDw) {
		this.wxDw = wxDw;
	}
	public String getWxDjr() {
		return wxDjr;
	}
	public void setWxDjr(String wxDjr) {
		this.wxDjr = wxDjr;
	}
	public Date getAddTime() {
		return addTime;
	}
	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}

	@Override
	public String toString() {
		return "TvVehicleReg [addTime=" + addTime + ", regId=" + regId
				+ ", vehicleId=" + vehicleId + ", wxDjr=" + wxDjr + ", wxDw="
				+ wxDw + ", wxLb=" + wxLb + ", wxNr=" + wxNr + ", wxRq=" + wxRq
				+ "]";
	}
	
}

