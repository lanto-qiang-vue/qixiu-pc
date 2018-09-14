package com.lanto.shqixiu.shwgweb.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbCorpLose implements Serializable {
	private Integer loseId;	//ID
	private String orderId;	//业务流水号
	private String corpId;	//企业ID
	private String applyOper;	//申请人
	private String applyOperTel;	//联系电话
	private Date applyDate;	//申请日期
	private String acceptOper;	//受理人
	private String acceptOpinion;	//受理意见
	private Date acceptDate;	//受理日期
	private String completeOper;	//办结人
	private Date completeDate;	//办结日期
	private String completeOpinion;	//办结意见
	private String status;	//状态
	private String dataFrom;	//数据来源(管理端 企业端 网站 网办)
	private String orderNo;	//ORDER_NO

	public Integer getLoseId() {
		return loseId;
	}
	public void setLoseId(Integer loseId) {
		this.loseId = loseId;
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
