package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;

public class TcQualityCreditCheck implements Serializable {
	private Integer checkId;	//考核ID
	private Integer corpId;	//企业ID
	private String checkYear;	//考核年份
	private String checkRate;	//考核等级
	private String remark;	//备注

	public Integer getCheckId() {
		return checkId;
	}
	public void setCheckId(Integer checkId) {
		this.checkId = checkId;
	}
	public Integer getCorpId() {
		return corpId;
	}
	public void setCorpId(Integer corpId) {
		this.corpId = corpId;
	}
	public String getCheckYear() {
		return checkYear;
	}
	public void setCheckYear(String checkYear) {
		this.checkYear = checkYear;
	}
	public String getCheckRate() {
		return checkRate;
	}
	public void setCheckRate(String checkRate) {
		this.checkRate = checkRate;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
}
