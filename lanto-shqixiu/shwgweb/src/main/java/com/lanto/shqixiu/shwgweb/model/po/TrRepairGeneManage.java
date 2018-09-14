package com.lanto.shqixiu.shwgweb.model.po;

import java.io.Serializable;
import java.util.Date;

public class TrRepairGeneManage implements Serializable {
	private Long geneId;	//普通维修单ID
	private String corpId;	//企业ID
	private String billCode;	//工单编号
	private String corpName;	//承修方
	private String delegateName;	//托修单位
	private String plateNuma;	//车牌号码（省）
	private String plateNumb;	//车牌号码（市）
	private String plateNum;	//车牌号码
	private String plateColor;	//车牌颜色
	private String vehicleType;	//车辆类型
	private String vehicleNature;	//车辆性质
	private Date leaveDate;	//出厂日期
	private Integer leaveMileage;	//出厂里程
	private String status;	//提交状态
	private String isPrint;	//打印状态
	private String certSn;	//合格证编号
	private Date addTime;	//开单时间
	private String created;	//开单人员
	private String repairType;//质检员
	private String telPhone;
	private String isChangePart;
	private String isComment;
	private String isRemote;
	private String randCode;
	private Integer sendFlag;//是否发送给如约爱车
	private String orderNo;//如约爱车单号
	private String loginFlag;//如约爱车:ryac
	private Integer vehicleId;
	private String remark;
	private String gdStatus;//工单状态
	private String gdStation;//工单工位
	private Integer inspectorId;

	public Integer getInspectorId() {
		return inspectorId;
	}
	public void setInspectorId(Integer inspectorId) {
		this.inspectorId = inspectorId;
	}
	public Long getGeneId() {
		return geneId;
	}
	public void setGeneId(Long geneId) {
		this.geneId = geneId;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getBillCode() {
		return billCode;
	}
	public void setBillCode(String billCode) {
		this.billCode = billCode;
	}
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getDelegateName() {
		return delegateName;
	}
	public void setDelegateName(String delegateName) {
		this.delegateName = delegateName;
	}
	public String getPlateNuma() {
		return plateNuma;
	}
	public void setPlateNuma(String plateNuma) {
		this.plateNuma = plateNuma;
	}
	public String getPlateNumb() {
		return plateNumb;
	}
	public void setPlateNumb(String plateNumb) {
		this.plateNumb = plateNumb;
	}
	public String getPlateNum() {
		return plateNum;
	}
	public void setPlateNum(String plateNum) {
		this.plateNum = plateNum;
	}
	public String getPlateColor() {
		return plateColor;
	}
	public void setPlateColor(String plateColor) {
		this.plateColor = plateColor;
	}
	public String getVehicleType() {
		return vehicleType;
	}
	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}
	public String getVehicleNature() {
		return vehicleNature;
	}
	public void setVehicleNature(String vehicleNature) {
		this.vehicleNature = vehicleNature;
	}
	public Date getLeaveDate() {
		return leaveDate;
	}
	public void setLeaveDate(Date leaveDate) {
		this.leaveDate = leaveDate;
	}
	public Integer getLeaveMileage() {
		return leaveMileage;
	}
	public void setLeaveMileage(Integer leaveMileage) {
		this.leaveMileage = leaveMileage;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getIsPrint() {
		return isPrint;
	}
	public void setIsPrint(String isPrint) {
		this.isPrint = isPrint;
	}
	public String getCertSn() {
		return certSn;
	}
	public void setCertSn(String certSn) {
		this.certSn = certSn;
	}
	public Date getAddTime() {
		return addTime;
	}
	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}
	public String getCreated() {
		return created;
	}
	public void setCreated(String created) {
		this.created = created;
	}
	public String getRepairType() {
		return repairType;
	}
	public void setRepairType(String repairType) {
		this.repairType = repairType;
	}
	public String getTelPhone() {
		return telPhone;
	}
	public void setTelPhone(String telPhone) {
		this.telPhone = telPhone;
	}
	public String getIsChangePart() {
		return isChangePart;
	}
	public void setIsChangePart(String isChangePart) {
		this.isChangePart = isChangePart;
	}
	public String getIsComment() {
		return isComment;
	}
	public void setIsComment(String isComment) {
		this.isComment = isComment;
	}
	public String getIsRemote() {
		return isRemote;
	}
	public void setIsRemote(String isRemote) {
		this.isRemote = isRemote;
	}
	public String getRandCode() {
		return randCode;
	}
	public void setRandCode(String randCode) {
		this.randCode = randCode;
	}
	public Integer getSendFlag() {
		return sendFlag;
	}
	public void setSendFlag(Integer sendFlag) {
		this.sendFlag = sendFlag;
	}
	public String getOrderNo() {
		return orderNo;
	}
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}
	public String getLoginFlag() {
		return loginFlag;
	}
	public void setLoginFlag(String loginFlag) {
		this.loginFlag = loginFlag;
	}
	public Integer getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public String getGdStatus() {
		return gdStatus;
	}
	public void setGdStatus(String gdStatus) {
		this.gdStatus = gdStatus;
	}
	public String getGdStation() {
		return gdStation;
	}
	public void setGdStation(String gdStation) {
		this.gdStation = gdStation;
	}
	
}
