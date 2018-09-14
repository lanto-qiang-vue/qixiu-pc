package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;

public class TbExamHis implements Serializable {
	private Integer hisId;	//ID
	private String corpId;	//企业ID
	private Integer examYear;	//考核年度
	private String examLevel;	//考核等级

	public Integer getHisId() {
		return hisId;
	}
	public void setHisId(Integer hisId) {
		this.hisId = hisId;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public Integer getExamYear() {
		return examYear;
	}
	public void setExamYear(Integer examYear) {
		this.examYear = examYear;
	}
	public String getExamLevel() {
		return examLevel;
	}
	public void setExamLevel(String examLevel) {
		this.examLevel = examLevel;
	}
}
