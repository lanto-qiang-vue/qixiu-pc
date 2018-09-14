package com.lanto.shqixiu.shwgc.model.po;

public class TbRepairItems {
	private Integer itemId;
	private String itemName;
	private Double repairHours;
	private Integer corpId;
	
	
	
	public Integer getCorpId() {
		return corpId;
	}
	public void setCorpId(Integer corpId) {
		this.corpId = corpId;
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
	
	
}
