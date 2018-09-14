package com.lanto.shqixiu.shwgm.model.app;

import java.io.Serializable;
import java.util.Date;

public class TbDailyCheckStationSecure implements Serializable {
	private Integer checkId;	//CHECK_ID
	private String stationId;	//STATION_ID
	private String stationName;	//STATION_NAME
	private String corpAdd;
	private String rectResult;	//RECT_RESULT
	private Date checkDate;	//CHECK_DATE
	private String createUser;	//CREATE_USER
	public Integer getCheckId() {
		return checkId;
	}
	public void setCheckId(Integer checkId) {
		this.checkId = checkId;
	}
	public String getStationId() {
		return stationId;
	}
	public void setStationId(String stationId) {
		this.stationId = stationId;
	}
	public String getStationName() {
		return stationName;
	}
	public void setStationName(String stationName) {
		this.stationName = stationName;
	}
	public String getCorpAdd() {
		return corpAdd;
	}
	public void setCorpAdd(String corpAdd) {
		this.corpAdd = corpAdd;
	}
	public String getRectResult() {
		return rectResult;
	}
	public void setRectResult(String rectResult) {
		this.rectResult = rectResult;
	}
	public Date getCheckDate() {
		return checkDate;
	}
	public void setCheckDate(Date checkDate) {
		this.checkDate = checkDate;
	}
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}


	
}

