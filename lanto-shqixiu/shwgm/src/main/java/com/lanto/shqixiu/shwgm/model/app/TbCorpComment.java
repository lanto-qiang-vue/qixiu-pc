package com.lanto.shqixiu.shwgm.model.app;

/***
 * 
 * @author Administrator APP-点评服务
 * 
 */
public class TbCorpComment {

	private String commentId; // COMMENT_ID
	private String certificationId;// 合格证号
	private String vechileNum; // 车牌号
	private String operatingUnit; // 车主
	private String operatingUnitTel; // 联系手机
	private String corpId; // 企业ID
	private String corpNum; // 企业编号
	private String corpName; // 企业名称
	private String totalScore; // 总体评分
	private String fwtdScore; // 服务态度评分
	private String wxzlScore;// 维修质量评分
	private String wxjgScore;// 维修价格评分
	private String commentRemark; // 评价内容
	private String insertDate; // 评价时间
	private String commentType; // 评价类型：系统、车主
	public String getCommentId() {
		return commentId;
	}
	public void setCommentId(String commentId) {
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
	public String getTotalScore() {
		return totalScore;
	}
	public void setTotalScore(String totalScore) {
		this.totalScore = totalScore;
	}
	public String getFwtdScore() {
		return fwtdScore;
	}
	public void setFwtdScore(String fwtdScore) {
		this.fwtdScore = fwtdScore;
	}
	public String getWxzlScore() {
		return wxzlScore;
	}
	public void setWxzlScore(String wxzlScore) {
		this.wxzlScore = wxzlScore;
	}
	public String getWxjgScore() {
		return wxjgScore;
	}
	public void setWxjgScore(String wxjgScore) {
		this.wxjgScore = wxjgScore;
	}
	public String getCommentRemark() {
		return commentRemark;
	}
	public void setCommentRemark(String commentRemark) {
		this.commentRemark = commentRemark;
	}
	public String getInsertDate() {
		return insertDate;
	}
	public void setInsertDate(String insertDate) {
		this.insertDate = insertDate;
	}
	public String getCommentType() {
		return commentType;
	}
	public void setCommentType(String commentType) {
		this.commentType = commentType;
	}

	

}