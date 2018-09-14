package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbVehicleGasDataDetail implements Serializable {
	private Integer detailId;	//DETAIL_ID
	private String corpId;	//企业ID
	private String corpNum;	//企业编号
	private String billNo;	//流水号 以前的ORDER_NUM
	private String vechileNum;	//车牌号
	private String vechileColor;	//车牌颜色
	private Date tableDate;	//录入时间
	private String checkerName;	//检测人员
	private Date checkDate;	//检测日期
	private Float hcB;	//维修前HC
	private Float coB;	//维修前
	private Float noB;	//维修前
	private Float hcA;	//维修后
	private Float coA;	//维修后
	private Float noA;	//维修后
	private Float opaqueA;	//维修后不透光系数
	private Float smokeA;	//维修后烟度
	private Float opaqueB;	//维修前不透光系数
	private Float smokeB;	//维修前烟度
	private String operatingUnit;	//营运单位
	private String transNum;	//上传单号
	private String corpTel;	//企业电话
	private String touchTel;	//联系电话
	private String sjPerson;	//负责人
	private Date addDate;	//填表日期
	public Integer getDetailId() {
		return detailId;
	}
	public void setDetailId(Integer detailId) {
		this.detailId = detailId;
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
	public String getBillNo() {
		return billNo;
	}
	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}
	public String getVechileNum() {
		return vechileNum;
	}
	public void setVechileNum(String vechileNum) {
		this.vechileNum = vechileNum;
	}
	public String getVechileColor() {
		return vechileColor;
	}
	public void setVechileColor(String vechileColor) {
		this.vechileColor = vechileColor;
	}
	public Date getTableDate() {
		return tableDate;
	}
	public void setTableDate(Date tableDate) {
		this.tableDate = tableDate;
	}
	public String getCheckerName() {
		return checkerName;
	}
	public void setCheckerName(String checkerName) {
		this.checkerName = checkerName;
	}
	public Date getCheckDate() {
		return checkDate;
	}
	public void setCheckDate(Date checkDate) {
		this.checkDate = checkDate;
	}
	public Float getHcB() {
		return hcB;
	}
	public void setHcB(Float hcB) {
		this.hcB = hcB;
	}
	public Float getCoB() {
		return coB;
	}
	public void setCoB(Float coB) {
		this.coB = coB;
	}
	public Float getNoB() {
		return noB;
	}
	public void setNoB(Float noB) {
		this.noB = noB;
	}
	public Float getHcA() {
		return hcA;
	}
	public void setHcA(Float hcA) {
		this.hcA = hcA;
	}
	public Float getCoA() {
		return coA;
	}
	public void setCoA(Float coA) {
		this.coA = coA;
	}
	public Float getNoA() {
		return noA;
	}
	public void setNoA(Float noA) {
		this.noA = noA;
	}
	public Float getOpaqueA() {
		return opaqueA;
	}
	public void setOpaqueA(Float opaqueA) {
		this.opaqueA = opaqueA;
	}
	public Float getSmokeA() {
		return smokeA;
	}
	public void setSmokeA(Float smokeA) {
		this.smokeA = smokeA;
	}
	public Float getOpaqueB() {
		return opaqueB;
	}
	public void setOpaqueB(Float opaqueB) {
		this.opaqueB = opaqueB;
	}
	public Float getSmokeB() {
		return smokeB;
	}
	public void setSmokeB(Float smokeB) {
		this.smokeB = smokeB;
	}
	public String getOperatingUnit() {
		return operatingUnit;
	}
	public void setOperatingUnit(String operatingUnit) {
		this.operatingUnit = operatingUnit;
	}
	public String getTransNum() {
		return transNum;
	}
	public void setTransNum(String transNum) {
		this.transNum = transNum;
	}
	public String getCorpTel() {
		return corpTel;
	}
	public void setCorpTel(String corpTel) {
		this.corpTel = corpTel;
	}
	public String getTouchTel() {
		return touchTel;
	}
	public void setTouchTel(String touchTel) {
		this.touchTel = touchTel;
	}
	public String getSjPerson() {
		return sjPerson;
	}
	public void setSjPerson(String sjPerson) {
		this.sjPerson = sjPerson;
	}
	public Date getAddDate() {
		return addDate;
	}
	public void setAddDate(Date addDate) {
		this.addDate = addDate;
	}

	
	
}
