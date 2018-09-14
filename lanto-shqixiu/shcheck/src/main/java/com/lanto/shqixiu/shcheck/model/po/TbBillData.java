package com.lanto.shqixiu.shcheck.model.po;


public class TbBillData {
	private Integer id;	//ID
	private String unitNo;	//UNIT_NO
	private String billId;	//BILL_ID
	private String yearNum;	//YEAR_NUM
	private String monthNum;	//MONTH_NUM
	private String dayNum;	//DAY_NUM
	private Integer flowNum;	//FLOW_NUM


	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getUnitNo() {
		return unitNo;
	}
	public void setUnitNo(String unitNo) {
		this.unitNo = unitNo;
	}
	public String getBillId() {
		return billId;
	}
	public void setBillId(String billId) {
		this.billId = billId;
	}
	public String getYearNum() {
		return yearNum;
	}
	public void setYearNum(String yearNum) {
		this.yearNum = yearNum;
	}
	public String getMonthNum() {
		return monthNum;
	}
	public void setMonthNum(String monthNum) {
		this.monthNum = monthNum;
	}
	public String getDayNum() {
		return dayNum;
	}
	public void setDayNum(String dayNum) {
		this.dayNum = dayNum;
	}
	public Integer getFlowNum() {
		return flowNum;
	}
	public void setFlowNum(Integer flowNum) {
		this.flowNum = flowNum;
	}
}
