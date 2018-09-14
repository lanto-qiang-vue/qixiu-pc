package com.lanto.shqixiu.shwgc.model.po;

import java.util.Date;

public class TbTransRepairItemsList {
	private Integer listId;
	private Integer recordId;
	private Integer itemId;
	private String itemName;
	private Double repairHours;
	private String repairPerson;
	private Date createTime;
	
	
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Integer getListId() {
		return listId;
	}
	public void setListId(Integer listId) {
		this.listId = listId;
	}
	public Integer getRecordId() {
		return recordId;
	}
	public void setRecordId(Integer recordId) {
		this.recordId = recordId;
	}
	public Integer getItemId() {
		return itemId;
	}
	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public Double getRepairHours() {
		return repairHours;
	}
	public void setRepairHours(Double repairHours) {
		this.repairHours = repairHours;
	}
	public String getRepairPerson() {
		return repairPerson;
	}
	public void setRepairPerson(String repairPerson) {
		this.repairPerson = repairPerson;
	}
	
	
}
