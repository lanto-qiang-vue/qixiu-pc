package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;
import java.util.Date;

public class TvVehiclePlan implements Serializable {
	private Integer planId;	//PLAN_ID
	private String planCode;	//PLAN_CODE
	private String planYear;	//PLAN_YEAR
	private Integer vehicleId;	//VEHICLE_ID
	private Integer repairCycle;	//REPAIR_CYCLE
	private Long repairMileage;	//REPAIR_MILEAGE
	private Date createDate;	//CREATE_DATE
	private String status;	//STATUS
	private String djStatus;	//STATUS
	
	public Integer getPlanId() {
		return planId;
	}
	public void setPlanId(Integer planId) {
		this.planId = planId;
	}
	public String getPlanCode() {
		return planCode;
	}
	public void setPlanCode(String planCode) {
		this.planCode = planCode;
	}
	public String getPlanYear() {
		return planYear;
	}
	public void setPlanYear(String planYear) {
		this.planYear = planYear;
	}
	public Integer getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}
	public Integer getRepairCycle() {
		return repairCycle;
	}
	public void setRepairCycle(Integer repairCycle) {
		this.repairCycle = repairCycle;
	}
	public Long getRepairMileage() {
		return repairMileage;
	}
	public void setRepairMileage(Long repairMileage) {
		this.repairMileage = repairMileage;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDjStatus() {
		return djStatus;
	}
	public void setDjStatus(String djStatus) {
		this.djStatus = djStatus;
	}
	
}
