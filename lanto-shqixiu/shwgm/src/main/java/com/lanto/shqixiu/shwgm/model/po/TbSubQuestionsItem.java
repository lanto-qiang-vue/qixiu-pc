package com.lanto.shqixiu.shwgm.model.po;

import java.util.Date;

public class TbSubQuestionsItem {
	private Integer subjectId;			
	private Integer itemId;			
	private String itemTag;			//选项标识
	private String itemName;		//选项名称
	private Integer itemScore;		//选项得分
	private String creator;			//创建人
	private Date createTime;		//创建时间
	private String status;			//状态
	
	
	
	public Integer getSubjectId() {
		return subjectId;
	}
	public void setSubjectId(Integer subjectId) {
		this.subjectId = subjectId;
	}
	public Integer getItemId() {
		return itemId;
	}
	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}
	public String getItemTag() {
		return itemTag;
	}
	public void setItemTag(String itemTag) {
		this.itemTag = itemTag;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public Integer getItemScore() {
		return itemScore;
	}
	public void setItemScore(Integer itemScore) {
		this.itemScore = itemScore;
	}
	public String getCreator() {
		return creator;
	}
	public void setCreator(String creator) {
		this.creator = creator;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

	
	
	
}
