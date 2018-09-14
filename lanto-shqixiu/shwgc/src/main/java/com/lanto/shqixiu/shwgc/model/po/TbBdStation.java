package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;

public class TbBdStation implements Serializable{
	private Integer stationId;
	private Integer corpId;
	private String stationCode;
	private String stationName;
	private Integer channelCode1;
	private Integer channelCode2;
	private String remark;
	public Integer getStationId() {
		return stationId;
	}
	public void setStationId(Integer stationId) {
		this.stationId = stationId;
	}
	public Integer getCorpId() {
		return corpId;
	}
	public void setCorpId(Integer corpId) {
		this.corpId = corpId;
	}
	public String getStationCode() {
		return stationCode;
	}
	public void setStationCode(String stationCode) {
		this.stationCode = stationCode;
	}
	public String getStationName() {
		return stationName;
	}
	public void setStationName(String stationName) {
		this.stationName = stationName;
	}
	
	public Integer getChannelCode1() {
		return channelCode1;
	}
	public void setChannelCode1(Integer channelCode1) {
		this.channelCode1 = channelCode1;
	}
	public Integer getChannelCode2() {
		return channelCode2;
	}
	public void setChannelCode2(Integer channelCode2) {
		this.channelCode2 = channelCode2;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	
}
