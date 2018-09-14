package com.lanto.shqixiu.shwgm.model.po;

public class TbRepairPartsList {
	private Integer listId;
	private Integer recordId;
	private String partCode;
	private String partName;
	private Float partPrice;
	private String partType;
	private String partBrand;
	private String isOwnerProvide;
	private String partPhoto;
	private Integer partNumber;
	
	
	
	public Integer getPartNumber() {
		return partNumber;
	}
	public void setPartNumber(Integer partNumber) {
		this.partNumber = partNumber;
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
	public String getPartPhoto() {
		return partPhoto;
	}
	public void setPartPhoto(String partPhoto) {
		this.partPhoto = partPhoto;
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
