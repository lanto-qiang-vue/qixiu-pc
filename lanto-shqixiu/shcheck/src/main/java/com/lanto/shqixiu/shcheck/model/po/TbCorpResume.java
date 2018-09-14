package com.lanto.shqixiu.shcheck.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbCorpResume implements Serializable {
	private Integer resumeId;	//ID
	private String orderId;	//业务流水号
	private String corpId;	//企业ID
	private String applyOper;	//申请人
	private String applyOperTel;	//联系电话
	private Date applyDate;	//申请日期
	private String completeOper;	//办结人
	private Date completeDate;	//办结日期
	private String completeOpinion;	//办结意见
	private String status;	//状态
	private String dataFrom;	//数据来源(管理端 企业端 网站 网办)
	private String orderNo;	//ORDER_NO

	public Integer getResumeId() {
		return resumeId;
	}
	public void setResumeId(Integer resumeId) {
		this.resumeId = resumeId;
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
