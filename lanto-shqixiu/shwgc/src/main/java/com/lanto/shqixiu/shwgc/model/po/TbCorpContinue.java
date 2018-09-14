package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbCorpContinue implements Serializable {
	private Integer continueId;	//CONTINUE_ID
	private String orderId;	//业务流水号
	private String corpId;	//企业ID
	private Date oldValidEndDate;	//原许可证有效日期
	private Date validEndDate;	//许可证有效日期
	private String applyOper;	//申请人
	private String applyOperTel;	//联系电话
	private Date applyDate;	//申请日期
	private String acceptOper;	//受理人
	private String acceptOpinion;	//受理意见
	private Date acceptDate;	//受理日期
	private String checkOper;	//CHECK_OPER
	private String checkOpinion;	//CHECK_OPINION
	private Date checkDate;	//CHECK_DATE
	private String completeOper;	//办结人
	private Date completeDate;	//办结日期
	private String completeOpinion;	//办结意见
	private String status;	//状态
	private String dataFrom;	//数据来源(管理端 企业端 网站 网办)
	private String orderNo;	//ORDER_NO

	public Integer getContinueId() {
		return continueId;
	}
	public void setContinueId(Integer continueId) {
		this.continueId = continueId;
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public Date getOldValidEndDate() {
		return oldValidEndDate;
	}
	public void setOldValidEndDate(Date oldValidEndDate) {
		this.oldValidEndDate = oldValidEndDate;
	}
	public Date getValidEndDate() {
		return validEndDate;
	}
	public void setValidEndDate(Date validEndDate) {
		this.validEndDate = validEndDate;
	}
	public String getApplyOper() {
		return applyOper;
	}
	public void setApplyOper(String applyOper) {
		this.applyOper = applyOper;
	}
	public String getApplyOperTel() {
		return applyOperTel;
	}
	public void setApplyOperTel(String applyOperTel) {
		this.applyOperTel = applyOperTel;
	}
	public Date getApplyDate() {
		return applyDate;
	}
	public void setApplyDate(Date applyDate) {
		this.applyDate = applyDate;
	}
	public String getAcceptOper() {
		return acceptOper;
	}
	public void setAcceptOper(String acceptOper) {
		this.acceptOper = acceptOper;
	}
	public String getAcceptOpinion() {
		return acceptOpinion;
	}
	public void setAcceptOpinion(String acceptOpinion) {
		this.acceptOpinion = acceptOpinion;
	}
	public Date getAcceptDate() {
		return acceptDate;
	}
	public void setAcceptDate(Date acceptDate) {
		this.acceptDate = acceptDate;
	}
	public String getCheckOper() {
		return checkOper;
	}
	public void setCheckOper(String checkOper) {
		this.checkOper = checkOper;
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
	public String getCompleteOper() {
		return completeOper;
	}
	public void setCompleteOper(String completeOper) {
		this.completeOper = completeOper;
	}
	public Date getCompleteDate() {
		return completeDate;
	}
	public void setCompleteDate(Date completeDate) {
		this.completeDate = completeDate;
	}
	public String getCompleteOpinion() {
		return completeOpinion;
	}
	public void setCompleteOpinion(String completeOpinion) {
		this.completeOpinion = completeOpinion;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDataFrom() {
		return dataFrom;
	}
	public void setDataFrom(String dataFrom) {
		this.dataFrom = dataFrom;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
}
