package com.lanto.shqixiu.shwgc.model.po;

public class TbRepairParts {
	private Integer partId;
	private String partCode;
	private String partName;
	private Float partPrice;
	private String partType;
	private String partBrand;
	private String isOwnerProvide;
	private Integer corpId;
	
	
	
	public Integer getCorpId() {
		return corpId;
	}
	public void setCorpId(Integer corpId) {
		this.corpId = corpId;
	}
	public String getPartBrand() {
		return partBrand;
	}
	public void setPartBrand(String partBrand) {
		this.partBrand = partBrand;
	}
	public String getIsOwnerProvide() {
		return isOwnerProvide;
	}
	public void setIsOwnerProvide(String isOwnerProvide) {
		this.isOwnerProvide = isOwnerProvide;
	}
	public Integer getPartId() {
		return partId;
	}
	public void setPartId(Integer partId) {
		this.partId = partId;
	}
	public String getPartCode() {
		return partCode;
	}
	public void setPartCode(String partCode) {
		this.partCode = partCode;
	}
	public String getPartName() {
		return partName;
	}
	public void setPartName(String partName) {
		this.partName = partName;
	}
	public Float getPartPrice() {
		return partPrice;
	}
	public void setPartPrice(Float partPrice) {
		this.partPrice = partPrice;
	}
	public String getPartType() {
		return partType;
	}
	public void setPartType(String partType) {
		this.partType = partType;
	}
	
}
