package com.lanto.shqixiu.shwgm.model.app;

import java.io.Serializable;
import java.util.Date;

public class TbCorpDailyCheck implements Serializable {
	private Integer dailyId;	//日常检查ID
	private String corpId;	//企业ID
	private String checkCoent;	//检查内容
	private String checkResult;	//检查结果
	private Date checkTime;	//检查时间
	private Date addTime;	//录入时间
	private String remark;	//备注
	private String checkPerson;	//检查员
	private String operator;	//操作员
	private String opeArea;	//操作员辖区
	private String rectItem;	//整改项目
	private String isRect;	//是否需整改
	private String rectResult;	//审核结果
	private String status;	//检查状态
	private String orderId;	//ORDER_ID
	private String orderNo;	//ORDER_NO
	private String corpNum;
	private String corpName;
	private String isImport;
	private String finishTime;
	private String finishDepatment;  //EPATMENT

	public Integer getDailyId() {
		return dailyId;
	}
	public void setDailyId(Integer dailyId) {
		this.dailyId = dailyId;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getCheckCoent() {
		return checkCoent;
	}
	public void setCheckCoent(String checkCoent) {
		this.checkCoent = checkCoent;
	}
	public String getCheckResult() {
		return checkResult;
	}
	public void setCheckResult(String checkResult) {
		this.checkResult = checkResult;
	}
	public Date getCheckTime() {
		return checkTime;
	}
	public void setCheckTime(Date checkTime) {
		this.checkTime = checkTime;
	}
	public Date getAddTime() {
		return addTime;
	}
	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getCheckPerson() {
		return checkPerson;
	}
	public void setCheckPerson(String checkPerson) {
		this.checkPerson = checkPerson;
	}
	public String getOperator() {
		return operator;
	}
	public void setOperator(String operator) {
		this.operator = operator;
	}
	public String getOpeArea() {
		return opeArea;
	}
	public void setOpeArea(String opeArea) {
		this.opeArea = opeArea;
	}
	public String getRectItem() {
		return rectItem;
	}
	public void setRectItem(String rectItem) {
		this.rectItem = rectItem;
	}
	public String getIsRect() {
		return isRect;
	}
	public void setIsRect(String isRect) {
		this.isRect = isRect;
	}
	public String getRectResult() {
		return rectResult;
	}
	public void setRectResult(String rectResult) {
		this.rectResult = rectResult;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
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
	public String getIsImport() {
		return isImport;
	}
	public void setIsImport(String isImport) {
		this.isImport = isImport;
	}
	public String getFinishTime() {
		return finishTime;
	}
	public void setFinishTime(String finishTime) {
		this.finishTime = finishTime;
	}
	public String getFinishDepatment() {
		return finishDepatment;
	}
	public void setFinishDepatment(String finishDepatment) {
		this.finishDepatment = finishDepatment;
	}

	
	
	
}
