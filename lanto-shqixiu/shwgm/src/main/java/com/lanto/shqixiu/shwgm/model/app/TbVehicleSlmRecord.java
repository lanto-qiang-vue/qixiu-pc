package com.lanto.shqixiu.shwgm.model.app;

import java.io.Serializable;
import java.util.Date;

public class TbVehicleSlmRecord implements Serializable {
	private String slmId;	//二级维护ID
	private String certificationId;	//合格证号
	private String vechileNum;	//车牌号码
	private String vechileColor;	//车牌颜色
	private String areaCode;	//辖区代码
	private String areaName;	//辖区
	private String vehicleType;	//车辆类型(如大货车 大客车等)
	private String operatingUnit;	//车主
	private String operatingLicence;	//道路运输证号
	private String recordStatus;	//记录状态 已维护、已检测、已备案
	private String recordType;	//记录类型 提前维修、按期维护、逾期维护
	private Integer slmYear;	//维护周期年份
	private Integer slmMonth;	//维护周期月份
	private String corpId;	//维护企业ID
	private String corpNum;	//维护企业编号
	private String corpName;	//维护企业名称
	private Date beginDate;	//进厂日期
	private Date endDate;	//竣工日期
	private String qcName;	//质检员姓名
	private String detectId;	//检测ID
	private String detectStation;	//监测站名称
	private String printNumber;	//打印识别码
	private Date detectDate;	//检测日期
	private String detectCorp;	//检测企业
	private String detectType;	//检测类别
	private String detectResult;	//检测结果
	private Date recordTime;	//备案时间
	private String recordBy;	//备案人员
	private String punishCondition;	//处罚/报批情况
	private Float punishMoney;	//处罚金额
	private Date punishDate;	//处罚/报批日期
	private String punishtype;	//处罚/报批 0 处罚 1报批
	private String punishOper;	//处罚/报批操作员
	private String auditOpinion;	//备案意见
	private Date transDate;	//上传日期
	private String remark;	//备注
	private String state;	//上传状态
	private String isBl;	//是否补录

	public String getSlmId() {
		return slmId;
	}
	public void setSlmId(String slmId) {
		this.slmId = slmId;
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
	public String getVechileColor() {
		return vechileColor;
	}
	public void setVechileColor(String vechileColor) {
		this.vechileColor = vechileColor;
	}
	public String getAreaCode() {
		return areaCode;
	}
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	public String getVehicleType() {
		return vehicleType;
	}
	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}
	public String getOperatingUnit() {
		return operatingUnit;
	}
	public void setOperatingUnit(String operatingUnit) {
		this.operatingUnit = operatingUnit;
	}
	public String getOperatingLicence() {
		return operatingLicence;
	}
	public void setOperatingLicence(String operatingLicence) {
		this.operatingLicence = operatingLicence;
	}
	public String getRecordStatus() {
		return recordStatus;
	}
	public void setRecordStatus(String recordStatus) {
		this.recordStatus = recordStatus;
	}
	public String getRecordType() {
		return recordType;
	}
	public void setRecordType(String recordType) {
		this.recordType = recordType;
	}
	public Integer getSlmYear() {
		return slmYear;
	}
	public void setSlmYear(Integer slmYear) {
		this.slmYear = slmYear;
	}
	public Integer getSlmMonth() {
		return slmMonth;
	}
	public void setSlmMonth(Integer slmMonth) {
		this.slmMonth = slmMonth;
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
	public Date getBeginDate() {
		return beginDate;
	}
	public void setBeginDate(Date beginDate) {
		this.beginDate = beginDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public String getQcName() {
		return qcName;
	}
	public void setQcName(String qcName) {
		this.qcName = qcName;
	}
	public String getDetectId() {
		return detectId;
	}
	public void setDetectId(String detectId) {
		this.detectId = detectId;
	}
	public String getDetectStation() {
		return detectStation;
	}
	public void setDetectStation(String detectStation) {
		this.detectStation = detectStation;
	}
	public String getPrintNumber() {
		return printNumber;
	}
	public void setPrintNumber(String printNumber) {
		this.printNumber = printNumber;
	}
	public Date getDetectDate() {
		return detectDate;
	}
	public void setDetectDate(Date detectDate) {
		this.detectDate = detectDate;
	}
	public String getDetectCorp() {
		return detectCorp;
	}
	public void setDetectCorp(String detectCorp) {
		this.detectCorp = detectCorp;
	}
	public String getDetectType() {
		return detectType;
	}
	public void setDetectType(String detectType) {
		this.detectType = detectType;
	}
	public String getDetectResult() {
		return detectResult;
	}
	public void setDetectResult(String detectResult) {
		this.detectResult = detectResult;
	}
	public Date getRecordTime() {
		return recordTime;
	}
	public void setRecordTime(Date recordTime) {
		this.recordTime = recordTime;
	}
	public String getRecordBy() {
		return recordBy;
	}
	public void setRecordBy(String recordBy) {
		this.recordBy = recordBy;
	}
	public String getPunishCondition() {
		return punishCondition;
	}
	public void setPunishCondition(String punishCondition) {
		this.punishCondition = punishCondition;
	}
	public Float getPunishMoney() {
		return punishMoney;
	}
	public void setPunishMoney(Float punishMoney) {
		this.punishMoney = punishMoney;
	}
	public Date getPunishDate() {
		return punishDate;
	}
	public void setPunishDate(Date punishDate) {
		this.punishDate = punishDate;
	}
	public String getPunishtype() {
		return punishtype;
	}
	public void setPunishtype(String punishtype) {
		this.punishtype = punishtype;
	}
	public String getPunishOper() {
		return punishOper;
	}
	public void setPunishOper(String punishOper) {
		this.punishOper = punishOper;
	}
	public String getAuditOpinion() {
		return auditOpinion;
	}
	public void setAuditOpinion(String auditOpinion) {
		this.auditOpinion = auditOpinion;
	}
	public Date getTransDate() {
		return transDate;
	}
	public void setTransDate(Date transDate) {
		this.transDate = transDate;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getIsBl() {
		return isBl;
	}
	public void setIsBl(String isBl) {
		this.isBl = isBl;
	}
}
