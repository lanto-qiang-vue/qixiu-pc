package com.lanto.shqixiu.shwgm.model.po;

import java.util.Date;

public class TbRepairRecords {
	private Integer recordId;		//维修ID
	private Integer corpId;			//维修企业ID
	private String corpName;		//维修企业名称
	private Integer vehicleId;		//车辆ID
	private String plateNum;		//车牌号码
	private String engineNumber;	//发动机号码
	private String carVin;			//车架号
	private Date repairDate;		//送修日期
	private Integer repairMile;		//送修里程
	private String faultDescript;	//故障描述
	private String faultReason;		//故障原因
	private Date settleDate;		//结算日期
	private String statementNo;		//结算清单号
	private Date startRepairTime;	//开工时间
	private Date endRepairTime;		//完工时间
	private String repairStation;	//维修工位
	private String repairPerson;	//送修人
	private String repairPersonPhone;	//送修人联系电话
	private String status;			//状态
	
	
	public Integer getRecordId() {
		return recordId;
	}
	public void setRecordId(Integer recordId) {
		this.recordId = recordId;
	}
	public Integer getCorpId() {
		return corpId;
	}
	public void setCorpId(Integer corpId) {
		this.corpId = corpId;
	}
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public Integer getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}
	public String getPlateNum() {
		return plateNum;
	}
	public void setPlateNum(String plateNum) {
		this.plateNum = plateNum;
	}
	public String getEngineNumber() {
		return engineNumber;
	}
	public void setEngineNumber(String engineNumber) {
		this.engineNumber = engineNumber;
	}
	public String getCarVin() {
		return carVin;
	}
	public void setCarVin(String carVin) {
		this.carVin = carVin;
	}
	public Date getRepairDate() {
		return repairDate;
	}
	public void setRepairDate(Date repairDate) {
		this.repairDate = repairDate;
	}
	public Integer getRepairMile() {
		return repairMile;
	}
	public void setRepairMile(Integer repairMile) {
		this.repairMile = repairMile;
	}
	public String getFaultDescript() {
		return faultDescript;
	}
	public void setFaultDescript(String faultDescript) {
		this.faultDescript = faultDescript;
	}
	public String getFaultReason() {
		return faultReason;
	}
	public void setFaultReason(String faultReason) {
		this.faultReason = faultReason;
	}
	public Date getSettleDate() {
		return settleDate;
	}
	public void setSettleDate(Date settleDate) {
		this.settleDate = settleDate;
	}
	public String getStatementNo() {
		return statementNo;
	}
	public void setStatementNo(String statementNo) {
		this.statementNo = statementNo;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getStartRepairTime() {
		return startRepairTime;
	}
	public void setStartRepairTime(Date startRepairTime) {
		this.startRepairTime = startRepairTime;
	}
	public Date getEndRepairTime() {
		return endRepairTime;
	}
	public void setEndRepairTime(Date endRepairTime) {
		this.endRepairTime = endRepairTime;
	}
	public String getRepairStation() {
		return repairStation;
	}
	public void setRepairStation(String repairStation) {
		this.repairStation = repairStation;
	}
	public String getRepairPerson() {
		return repairPerson;
	}
	public void setRepairPerson(String repairPerson) {
		this.repairPerson = repairPerson;
	}
	public String getRepairPersonPhone() {
		return repairPersonPhone;
	}
	public void setRepairPersonPhone(String repairPersonPhone) {
		this.repairPersonPhone = repairPersonPhone;
	}
	
}
