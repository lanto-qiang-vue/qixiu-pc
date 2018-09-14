package com.lanto.shqixiu.shcheck.model.po;

import java.io.Serializable;

public class TrRepairGeneDetail implements Serializable {
	private Long detailId;	//明细ID
	private String billCode;	//工单ID
	private String repairType;	//维修类别
	private String repairItem;	//维修项目
	private Float timeCost;	//工时费用（元）
	private Float matCost;	//材料费用（元）
	private Float costSum;	//维修费用（合计）
	private String repairman;//主修人员

	public Long getDetailId() {
		return detailId;
	}
	public void setDetailId(Long detailId) {
		this.detailId = detailId;
	}
	
	public String getBillCode() {
		return billCode;
	}
	public void setBillCode(String billCode) {
		this.billCode = billCode;
	}
	public String getRepairType() {
		return repairType;
	}
	public void setRepairType(String repairType) {
		this.repairType = repairType;
	}
	public String getRepairItem() {
		return repairItem;
	}
	public void setRepairItem(String repairItem) {
		this.repairItem = repairItem;
	}
	public Float getTimeCost() {
		return timeCost;
	}
	public void setTimeCost(Float timeCost) {
		this.timeCost = timeCost;
	}
	public Float getMatCost() {
		return matCost;
	}
	public void setMatCost(Float matCost) {
		this.matCost = matCost;
	}
	public Float getCostSum() {
		return costSum;
	}
	public void setCostSum(Float costSum) {
		this.costSum = costSum;
	}
	public String getRepairman() {
		return repairman;
	}
	public void setRepairman(String repairman) {
		this.repairman = repairman;
	}
	
}
