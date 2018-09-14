package com.lanto.shqixiu.shcheck.model.po;

import java.io.Serializable;
import java.util.Date;

public class TcCertScore implements Serializable {
	private Integer scoreId;	//成绩ID
	private Integer certId;	//证书ID
	private String module;	//考试模块
	private Float theoryScore;	//理论成绩
	private Float opeScore;	//实操成绩
	private Date examTime;	//考试时间
	private Date recordTime;	//录入时间
	private String isAdd;	//是否增考

	public Integer getScoreId() {
		return scoreId;
	}
	public void setScoreId(Integer scoreId) {
		this.scoreId = scoreId;
	}
	public Integer getCertId() {
		return certId;
	}
	public void setCertId(Integer certId) {
		this.certId = certId;
	}
	public String getModule() {
		return module;
	}
	public void setModule(String module) {
		this.module = module;
	}
	public Float getTheoryScore() {
		return theoryScore;
	}
	public void setTheoryScore(Float theoryScore) {
		this.theoryScore = theoryScore;
	}
	public Float getOpeScore() {
		return opeScore;
	}
	public void setOpeScore(Float opeScore) {
		this.opeScore = opeScore;
	}
	public Date getExamTime() {
		return examTime;
	}
	public void setExamTime(Date examTime) {
		this.examTime = examTime;
	}
	public Date getRecordTime() {
		return recordTime;
	}
	public void setRecordTime(Date recordTime) {
		this.recordTime = recordTime;
	}
	public String getIsAdd() {
		return isAdd;
	}
	public void setIsAdd(String isAdd) {
		this.isAdd = isAdd;
	}
}
