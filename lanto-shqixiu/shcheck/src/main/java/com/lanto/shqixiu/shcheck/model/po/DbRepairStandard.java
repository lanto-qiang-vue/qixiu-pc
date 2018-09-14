package com.lanto.shqixiu.shcheck.model.po;

import java.io.Serializable;
import java.util.Date;

public class DbRepairStandard implements Serializable {
	private Integer id;	//ID
	private String name;
	private Integer parId;	
	private String type;
	private Integer repairCycle;
	private Integer repairMileage;
	private Date createDate;
	private String status;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public Integer getParId() {
		return parId;
	}
	public void setParId(Integer parId) {
		this.parId = parId;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Integer getRepairCycle() {
		return repairCycle;
	}
	public void setRepairCycle(Integer repairCycle) {
		this.repairCycle = repairCycle;
	}
	public Integer getRepairMileage() {
		return repairMileage;
	}
	public void setRepairMileage(Integer repairMileage) {
		this.repairMileage = repairMileage;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
}
