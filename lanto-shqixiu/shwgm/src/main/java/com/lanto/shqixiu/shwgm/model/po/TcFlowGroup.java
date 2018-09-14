package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;

public class TcFlowGroup implements Serializable {
	private Integer groupId;	//组ID
	private String groupCode;	//组编号
	private String groupName;	//组名称
	private String belongArea;	//所属辖区
	private String processId;	//工作流ID
	private String remark;	//备注

	public Integer getGroupId() {
		return groupId;
	}
	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}
	public String getGroupCode() {
		return groupCode;
	}
	public void setGroupCode(String groupCode) {
		this.groupCode = groupCode;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getBelongArea() {
		return belongArea;
	}
	public void setBelongArea(String belongArea) {
		this.belongArea = belongArea;
	}
	public String getProcessId() {
		return processId;
	}
	public void setProcessId(String processId) {
		this.processId = processId;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
}
