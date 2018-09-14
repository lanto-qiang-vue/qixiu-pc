package com.lanto.shqixiu.shcheck.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbCorpComplain implements Serializable {
	private Integer complainId;	//ID
	private String complainOper;	//投诉人
	private Date complainDate;	//投诉日期
	private String corpId;	//被投诉企业ID
	private String corpName;	//被投诉企业名称
	private String areaCode;	//所属辖区
	private String contactTel;	//投诉人联系电话
	private String contactType;	//投诉方式
	private String complainContent;	//投诉内容
	private String isAccept;	//是否受理
	private String acceptRemark;	//受理说明
	private String acceptOper;	//受理人
	private Date acceptDate;	//受理日期
	private String isCorpDeal;	//企业是否处理
	private String corpDealRemark;	//企业处理内容
	private String corpDealOper;	//企业处理人
	private Date corpDealDate;	//CORP_DEAL_DATE
	private String corpContactTel;	//企业处理人联系电话
	private String isComplete;	//是否办结
	private String completeRemark;	//办结备注
	private String completeOper;	//办结人
	private Date completeDate;	//办结日期
	private Date happenDate;//事发时间
	private String idCard;//身份证号码
	private String orderId;
	private String orderNo;

	public Integer getComplainId() {
		return complainId;
	}
	public void setComplainId(Integer complainId) {
		this.complainId = complainId;
	}
	public String getComplainOper() {
		return complainOper;
	}
	public void setComplainOper(String complainOper) {
		this.complainOper = complainOper;
	}
	public Date getComplainDate() {
		return complainDate;
	}
	public void setComplainDate(Date complainDate) {
		this.complainDate = complainDate;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getAreaCode() {
		return areaCode;
	}
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	public String getContactTel() {
		return contactTel;
	}
	public void setContactTel(String contactTel) {
		this.contactTel = contactTel;
	}
	
	public String getComplainContent() {
		return complainContent;
	}
	public void setComplainContent(String complainContent) {
		this.complainContent = complainContent;
	}
	public String getIsAccept() {
		return isAccept;
	}
	public void setIsAccept(String isAccept) {
		this.isAccept = isAccept;
	}
	public String getAcceptRemark() {
		return acceptRemark;
	}
	public void setAcceptRemark(String acceptRemark) {
		this.acceptRemark = acceptRemark;
	}
	public String getAcceptOper() {
		return acceptOper;
	}
	public void setAcceptOper(String acceptOper) {
		this.acceptOper = acceptOper;
	}
	public Date getAcceptDate() {
		return acceptDate;
	}
	public void setAcceptDate(Date acceptDate) {
		this.acceptDate = acceptDate;
	}
	public String getIsCorpDeal() {
		return isCorpDeal;
	}
	public void setIsCorpDeal(String isCorpDeal) {
		this.isCorpDeal = isCorpDeal;
	}
	public String getCorpDealRemark() {
		return corpDealRemark;
	}
	public void setCorpDealRemark(String corpDealRemark) {
		this.corpDealRemark = corpDealRemark;
	}
	public String getCorpDealOper() {
		return corpDealOper;
	}
	public void setCorpDealOper(String corpDealOper) {
		this.corpDealOper = corpDealOper;
	}
	public Date getCorpDealDate() {
		return corpDealDate;
	}
	public void setCorpDealDate(Date corpDealDate) {
		this.corpDealDate = corpDealDate;
	}
	public String getCorpContactTel() {
		return corpContactTel;
	}
	public void setCorpContactTel(String corpContactTel) {
		this.corpContactTel = corpContactTel;
	}
	public String getIsComplete() {
		return isComplete;
	}
	public void setIsComplete(String isComplete) {
		this.isComplete = isComplete;
	}
	public String getCompleteRemark() {
		return completeRemark;
	}
	public void setCompleteRemark(String completeRemark) {
		this.completeRemark = completeRemark;
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
	public String getContactType() {
		return contactType;
	}
	public void setContactType(String contactType) {
		this.contactType = contactType;
	}
	public Date getHappenDate() {
		return happenDate;
	}
	public void setHappenDate(Date happenDate) {
		this.happenDate = happenDate;
	}
	public String getIdCard() {
		return idCard;
	}
	public void setIdCard(String idCard) {
		this.idCard = idCard;
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
}
