package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;

public class TbBdExamItem implements Serializable {
	private Integer itemId;	//ID
	private Integer typeId;	//考核类型ID
	private Integer itemScore;	//分值
	private String itemDetail;	//明细
	private Integer orderId;	//显示顺序
	private String itemName;	//ITEM_NAME

	public Integer getItemId() {
		return itemId;
	}
	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}
	public Integer getTypeId() {
		return typeId;
	}
	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}
	public Integer getItemScore() {
		return itemScore;
	}
	public void setItemScore(Integer itemScore) {
		this.itemScore = itemScore;
	}
	public String getItemDetail() {
		return itemDetail;
	}
	public void setItemDetail(String itemDetail) {
		this.itemDetail = itemDetail;
	}
	public Integer getOrderId() {
		return orderId;
	}
	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
}
