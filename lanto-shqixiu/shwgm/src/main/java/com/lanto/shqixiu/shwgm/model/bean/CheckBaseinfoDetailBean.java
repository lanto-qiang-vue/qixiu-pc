package com.lanto.shqixiu.shwgm.model.bean;

import java.io.Serializable;

public class CheckBaseinfoDetailBean implements Serializable {
	private Integer detailId;	//DETAIL_ID
	private Integer checkId;	//CHECK_ID
	private Integer itemId;
	private String itemDetail;	//ITEM_DETAIL
	private String checkResult;	//CHECK_RESULT
	private String itemName;
	private Integer num;


	public Integer getDetailId() {
		return detailId;
	}
	public void setDetailId(Integer detailId) {
		this.detailId = detailId;
	}
	public Integer getCheckId() {
		return checkId;
	}
	public void setCheckId(Integer checkId) {
		this.checkId = checkId;
	}
	public String getItemDetail() {
		return itemDetail;
	}
	public void setItemDetail(String itemDetail) {
		this.itemDetail = itemDetail;
	}
	public String getCheckResult() {
		return checkResult;
	}
	public void setCheckResult(String checkResult) {
		this.checkResult = checkResult;
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
	public Integer getNum() {
		return num;
	}
	public void setNum(Integer num) {
		this.num = num;
	}
	

}