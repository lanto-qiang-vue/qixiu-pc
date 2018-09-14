package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;
import java.util.Date;

public class TmSysOperateLog implements Serializable {
	private Integer logId;	//LOG_ID
	private String operatorId;	//OPERATOR_ID
	private String machineId;	//MACHINE_ID
	private String moduleName;	//MODULE_NAME
	private Date operateTime;	//OPERATE_TIME
	private String operateContent;	//OPERATE_CONTENT

	public Integer getLogId() {
		return logId;
	}
	public void setLogId(Integer logId) {
		this.logId = logId;
	}
	public String getOperatorId() {
		return operatorId;
	}
	public void setOperatorId(String operatorId) {
		this.operatorId = operatorId;
	}
	public String getMachineId() {
		return machineId;
	}
	public void setMachineId(String machineId) {
		this.machineId = machineId;
	}
	public String getModuleName() {
		return moduleName;
	}
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	public Date getOperateTime() {
		return operateTime;
	}
	public void setOperateTime(Date operateTime) {
		this.operateTime = operateTime;
	}
	public String getOperateContent() {
		return operateContent;
	}
	public void setOperateContent(String operateContent) {
		this.operateContent = operateContent;
	}
}
