package com.lanto.shqixiu.shwgm.model.po;

import java.util.Date;

public class TbExhaustRepairRecords {
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
	private String ownerPhone;		//车主电话
	private String fuelType;
	private String coCheck;
	private String coBeforeRepair;
	private String coAfterRepair;
	private String hcCheck;
	private String hcBeforeRepair;
	private String hcAfterRepair;
	private String noCheck;
	private String noBeforeRepair;
	private String noAfterRepair;
	private String btgxsCheck;
	private String btgxsBeforeRepair;
	private String btgxsAfterRepair;
	private String zdlbglCheck;
	private String zdlbglBeforeRepair;
	private String zdlbglAfterRepair;
	
	public String getOwnerPhone() {
		return ownerPhone;
	}
	public void setOwnerPhone(String ownerPhone) {
		this.ownerPhone = ownerPhone;
	}
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
	public String getFuelType() {
		return fuelType;
	}
	public void setFuelType(String fuelType) {
		this.fuelType = fuelType;
	}
	public String getCoCheck() {
		return coCheck;
	}
	public void setCoCheck(String coCheck) {
		this.coCheck = coCheck;
	}
	public String getCoBeforeRepair() {
		return coBeforeRepair;
	}
	public void setCoBeforeRepair(String coBeforeRepair) {
		this.coBeforeRepair = coBeforeRepair;
	}
	public String getCoAfterRepair() {
		return coAfterRepair;
	}
	public void setCoAfterRepair(String coAfterRepair) {
		this.coAfterRepair = coAfterRepair;
	}
	public String getHcCheck() {
		return hcCheck;
	}
	public void setHcCheck(String hcCheck) {
		this.hcCheck = hcCheck;
	}
	public String getHcBeforeRepair() {
		return hcBeforeRepair;
	}
	public void setHcBeforeRepair(String hcBeforeRepair) {
		this.hcBeforeRepair = hcBeforeRepair;
	}
	public String getHcAfterRepair() {
		return hcAfterRepair;
	}
	public void setHcAfterRepair(String hcAfterRepair) {
		this.hcAfterRepair = hcAfterRepair;
	}
	public String getNoCheck() {
		return noCheck;
	}
	public void setNoCheck(String noCheck) {
		this.noCheck = noCheck;
	}
	public String getNoBeforeRepair() {
		return noBeforeRepair;
	}
	public void setNoBeforeRepair(String noBeforeRepair) {
		this.noBeforeRepair = noBeforeRepair;
	}
	public String getNoAfterRepair() {
		return noAfterRepair;
	}
	public void setNoAfterRepair(String noAfterRepair) {
		this.noAfterRepair = noAfterRepair;
	}
	public String getBtgxsCheck() {
		return btgxsCheck;
	}
	public void setBtgxsCheck(String btgxsCheck) {
		this.btgxsCheck = btgxsCheck;
	}
	public String getBtgxsBeforeRepair() {
		return btgxsBeforeRepair;
	}
	public void setBtgxsBeforeRepair(String btgxsBeforeRepair) {
		this.btgxsBeforeRepair = btgxsBeforeRepair;
	}
	public String getBtgxsAfterRepair() {
		return btgxsAfterRepair;
	}
	public void setBtgxsAfterRepair(String btgxsAfterRepair) {
		this.btgxsAfterRepair = btgxsAfterRepair;
	}
	public String getZdlbglCheck() {
		return zdlbglCheck;
	}
	public void setZdlbglCheck(String zdlbglCheck) {
		this.zdlbglCheck = zdlbglCheck;
	}
	public String getZdlbglBeforeRepair() {
		return zdlbglBeforeRepair;
	}
	public void setZdlbglBeforeRepair(String zdlbglBeforeRepair) {
		this.zdlbglBeforeRepair = zdlbglBeforeRepair;
	}
	public String getZdlbglAfterRepair() {
		return zdlbglAfterRepair;
	}
	public void setZdlbglAfterRepair(String zdlbglAfterRepair) {
		this.zdlbglAfterRepair = zdlbglAfterRepair;
	}
	
}
