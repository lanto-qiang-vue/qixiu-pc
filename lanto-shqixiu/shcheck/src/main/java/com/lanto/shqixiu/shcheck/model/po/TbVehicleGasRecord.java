package com.lanto.shqixiu.shcheck.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbVehicleGasRecord implements Serializable {
	private Integer gasId;	//ID
	private String corpId;	//企业ID
	private String corpNum;	//企业编号
	private String corpName;	//维修企业名称
	private String billNo;	//工单编号
	private String billType;	//工单类别：维修、返修
	private String vechileNum;	//车牌号
	private String vechileColor;	//车牌颜色
	private String operatingUnit;	//OPERATING_UNIT
	private String brand;	//品牌
	private String model;	//型号
	private String engineNumber;	//发动机号
	private String vin;	//车架号码
	private String createBy;	//业务接待
	private Date createDate;	//开单时间
	private Integer mileage;	//进厂里程
	private Date leaveDate;	//LEAVE_DATE
	private String driver;	//送修人
	private String driverPhone;	//送修人电话
	private String jcCode;	//检测单号
	private String burnType;	//燃料类型
	private Date registDate;	//上传时间
	private String transNum;	//上传次数
	private String photo;
	private String certificationId;	//合格证号
	private String isComment;
	private String randCode;

	public Integer getGasId() {
		return gasId;
	}
	public void setGasId(Integer gasId) {
		this.gasId = gasId;
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
	public String getBillNo() {
		return billNo;
	}
	public void setBillNo(String billNo) {
		this.billNo = billNo;
	}
	public String getBillType() {
		return billType;
	}
	public void setBillType(String billType) {
		this.billType = billType;
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
	public String getOperatingUnit() {
		return operatingUnit;
	}
	public void setOperatingUnit(String operatingUnit) {
		this.operatingUnit = operatingUnit;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getEngineNumber() {
		return engineNumber;
	}
	public void setEngineNumber(String engineNumber) {
		this.engineNumber = engineNumber;
	}
	public String getVin() {
		return vin;
	}
	public void setVin(String vin) {
		this.vin = vin;
	}
	public String getCreateBy() {
		return createBy;
	}
	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Integer getMileage() {
		return mileage;
	}
	public void setMileage(Integer mileage) {
		this.mileage = mileage;
	}
	public Date getLeaveDate() {
		return leaveDate;
	}
	public void setLeaveDate(Date leaveDate) {
		this.leaveDate = leaveDate;
	}
	public String getDriver() {
		return driver;
	}
	public void setDriver(String driver) {
		this.driver = driver;
	}
	public String getDriverPhone() {
		return driverPhone;
	}
	public void setDriverPhone(String driverPhone) {
		this.driverPhone = driverPhone;
	}
	public String getJcCode() {
		return jcCode;
	}
	public void setJcCode(String jcCode) {
		this.jcCode = jcCode;
	}
	public String getBurnType() {
		return burnType;
	}
	public void setBurnType(String burnType) {
		this.burnType = burnType;
	}
	public Date getRegistDate() {
		return registDate;
	}
	public void setRegistDate(Date registDate) {
		this.registDate = registDate;
	}
	public String getTransNum() {
		return transNum;
	}
	public void setTransNum(String transNum) {
		this.transNum = transNum;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getCertificationId() {
		return certificationId;
	}
	public void setCertificationId(String certificationId) {
		this.certificationId = certificationId;
	}
	public String getRandCode() {
		return randCode;
	}
	public void setRandCode(String randCode) {
		this.randCode = randCode;
	}
	public String getIsComment() {
		return isComment;
	}
	public void setIsComment(String isComment) {
		this.isComment = isComment;
	}
	
}
