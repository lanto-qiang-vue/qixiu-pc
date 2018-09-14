package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;
import java.util.Date;

public class TcCorpTwoMaintain implements Serializable {
	private Integer maintainId;	//二维ID
	private Integer corpId;	//企业ID
	private String applyCause;	//年审时间
	private String firstCheckOpinion;	//初审意见
	private String firstCheckOpe;	//初审人员
	private Date firstCheckTime;	//初审时间
	private Integer checkPerson;	//审核人
	private String applyOpe;	//申请操作员
	private Date applyDate;	//申请时间
	private String checkStatus;	//审核是否通过
	private String checkOpinion;	//审核意见
	private Date checkDate;	//审核日期
	private String status;	//当前是否有效

	public Integer getMaintainId() {
		return maintainId;
	}
	public void setMaintainId(Integer maintainId) {
		this.maintainId = maintainId;
	}
	public Integer getCorpId() {
		return corpId;
	}
	public void setCorpId(Integer corpId) {
		this.corpId = corpId;
	}
	public String getApplyCause() {
		return applyCause;
	}
	public void setApplyCause(String applyCause) {
		this.applyCause = applyCause;
	}
	public String getFirstCheckOpinion() {
		return firstCheckOpinion;
	}
	public void setFirstCheckOpinion(String firstCheckOpinion) {
		this.firstCheckOpinion = firstCheckOpinion;
	}
	public String getFirstCheckOpe() {
		return firstCheckOpe;
	}
	public void setFirstCheckOpe(String firstCheckOpe) {
		this.firstCheckOpe = firstCheckOpe;
	}
	public Date getFirstCheckTime() {
		return firstCheckTime;
	}
	public void setFirstCheckTime(Date firstCheckTime) {
		this.firstCheckTime = firstCheckTime;
	}
	public Integer getCheckPerson() {
		return checkPerson;
	}
	public void setCheckPerson(Integer checkPerson) {
		this.checkPerson = checkPerson;
	}
	public String getApplyOpe() {
		return applyOpe;
	}
	public void setApplyOpe(String applyOpe) {
		this.applyOpe = applyOpe;
	}
	public Date getApplyDate() {
		return applyDate;
	}
	public void setApplyDate(Date applyDate) {
		this.applyDate = applyDate;
	}
	public String getCheckStatus() {
		return checkStatus;
	}
	public void setCheckStatus(String checkStatus) {
		this.checkStatus = checkStatus;
	}
	public String getCheckOpinion() {
		return checkOpinion;
	}
	public void setCheckOpinion(String checkOpinion) {
		this.checkOpinion = checkOpinion;
	}
	public Date getCheckDate() {
		return checkDate;
	}
	public void setCheckDate(Date checkDate) {
		this.checkDate = checkDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
}
