package com.lanto.shqixiu.shwgm.model.app;

import java.io.Serializable;
import java.util.Date;

public class TbDailyCheckGasSecure implements Serializable {
	private Integer checkId;	//CHECK_ID
	private String corpId;	//CORP_ID
	private String corpNum;	//CORP_NUM
	private String corpName;	//CORP_NAME
	private String corpAdd;
	private String corpType;	//CORP_TYPE
	private String rectResult;	//RECT_RESULT
	private Date checkDate;	//CHECK_DATE
	private String createUser;	//CREATE_USER


	public Integer getCheckId() {
		return checkId;
	}
	public void setCheckId(Integer checkId) {
		this.checkId = checkId;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getCorpNum() {
		return corpNum;
	}
	public void setCorpNum(String corpNum) {
		this.corpNum = corpNum;
	}
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getCorpType() {
		return corpType;
	}
	public void setCorpType(String corpType) {
		this.corpType = corpType;
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
	public String getCorpAdd() {
		return corpAdd;
	}
	public void setCorpAdd(String corpAdd) {
		this.corpAdd = corpAdd;
	}

}

