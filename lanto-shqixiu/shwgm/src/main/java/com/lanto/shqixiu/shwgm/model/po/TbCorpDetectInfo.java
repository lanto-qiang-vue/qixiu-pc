package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;

public class TbCorpDetectInfo implements Serializable {
	private Integer stationId;	//STATION_ID
	private String stationName;	//检测站名称
	private String stationNameJc;	//检测站简称
	private String longitude;	//LONGITUDE
	private String latitude;	//LATITUDE
	private String stationTel;	//联系方式
	private String stationFal;	//传真
	private String stationAddress;	//检测站地址
	private String stationArea;	//所属辖区


	public Integer getStationId() {
		return stationId;
	}
	public void setStationId(Integer stationId) {
		this.stationId = stationId;
	}
	public String getStationName() {
		return stationName;
	}
	public void setStationName(String stationName) {
		this.stationName = stationName;
	}
	public String getStationNameJc() {
		return stationNameJc;
	}
	public void setStationNameJc(String stationNameJc) {
		this.stationNameJc = stationNameJc;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getStationTel() {
		return stationTel;
	}
	public void setStationTel(String stationTel) {
		this.stationTel = stationTel;
	}
	public String getStationFal() {
		return stationFal;
	}
	public void setStationFal(String stationFal) {
		this.stationFal = stationFal;
	}
	public String getStationAddress() {
		return stationAddress;
	}
	public void setStationAddress(String stationAddress) {
		this.stationAddress = stationAddress;
	}
	public String getStationArea() {
		return stationArea;
	}
	public void setStationArea(String stationArea) {
		this.stationArea = stationArea;
	}

}
