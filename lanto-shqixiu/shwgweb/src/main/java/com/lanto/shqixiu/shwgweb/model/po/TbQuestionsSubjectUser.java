package com.lanto.shqixiu.shwgweb.model.po;

import java.util.Date;

public class TbQuestionsSubjectUser {
	private Integer childId;	
	private Integer commitId;	
	private Integer subjectId;		
	private Integer itemId;		
	private Date createTime;		//创建时间
	
	public Integer getChildId() {
		return childId;
	}
	public void setChildId(Integer childId) {
		this.childId = childId;
	}
	public Integer getCommitId() {
		return commitId;
	}
	public void setCommitId(Integer commitId) {
		this.commitId = commitId;
	}
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
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	
}
