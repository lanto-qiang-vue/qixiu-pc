package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbCorpComment implements Serializable {
	private Integer commentId;	//COMMENT_ID
	private String certificationId;//合格证号
	private String vechileNum;	//车牌号
	private String operatingUnit;	//车主
	private String operatingUnitTel;	//联系手机
	private String corpId;	//企业ID
	private String corpNum;	//企业编号
	private String corpName;	//企业名称
	private Integer totalScore;	//总体评分
	private Integer fwtdScore; //服务态度评分
	private Integer wxzlScore;//维修质量评分
	private Integer wxjgScore;//维修价格评分
	private String commentRemark;	//评价内容
	private Date insertDate;	//评价时间
	private String commentType;	//评价类型：系统、车主
	private String repairType;
	public Integer getCommentId() {
		return commentId;
	}
	public void setCommentId(Integer commentId) {
		this.commentId = commentId;
	}
	public String getCertificationId() {
		return certificationId;
	}
	public void setCertificationId(String certificationId) {
		this.certificationId = certificationId;
	}
	public String getVechileNum() {
		return vechileNum;
	}
	public void setVechileNum(String vechileNum) {
		this.vechileNum = vechileNum;
	}
	public String getOperatingUnit() {
		return operatingUnit;
	}
	public void setOperatingUnit(String operatingUnit) {
		this.operatingUnit = operatingUnit;
	}
	public String getOperatingUnitTel() {
		return operatingUnitTel;
	}
	public void setOperatingUnitTel(String operatingUnitTel) {
		this.operatingUnitTel = operatingUnitTel;
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
	public Integer getTotalScore() {
		return totalScore;
	}
	public void setTotalScore(Integer totalScore) {
		this.totalScore = totalScore;
	}
	public Integer getFwtdScore() {
		return fwtdScore;
	}
	public void setFwtdScore(Integer fwtdScore) {
		this.fwtdScore = fwtdScore;
	}
	public Integer getWxzlScore() {
		return wxzlScore;
	}
	public void setWxzlScore(Integer wxzlScore) {
		this.wxzlScore = wxzlScore;
	}
	public Integer getWxjgScore() {
		return wxjgScore;
	}
	public void setWxjgScore(Integer wxjgScore) {
		this.wxjgScore = wxjgScore;
	}
	public String getCommentRemark() {
		return commentRemark;
	}
	public void setCommentRemark(String commentRemark) {
		this.commentRemark = commentRemark;
	}
	public Date getInsertDate() {
		return insertDate;
	}
	public void setInsertDate(Date insertDate) {
		this.insertDate = insertDate;
	}
	public String getCommentType() {
		return commentType;
	}
	public void setCommentType(String commentType) {
		this.commentType = commentType;
	}
	public String getRepairType() {
		return repairType;
	}
	public void setRepairType(String repairType) {
		this.repairType = repairType;
	}
	

}

