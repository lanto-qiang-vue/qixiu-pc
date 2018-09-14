package com.lanto.shqixiu.shwgweb.model.po;

import java.io.Serializable;
import java.util.Date;

public class TcCorpQualificationLog implements Serializable {
	private Integer logId;	//历史ID
	private Integer qualiId;	//资质ID
	private String opeType;	//操作类型
	private String opeObject;	//操作对象
	private String opeCause;	//暂停/恢复原因
	private Date opeTime;	//操作时间
	private Integer opePerson;	//操作人

	public Integer getLogId() {
		return logId;
	}
	public void setLogId(Integer logId) {
		this.logId = logId;
	}
	public Integer getQualiId() {
		return qualiId;
	}
	public void setQualiId(Integer qualiId) {
		this.qualiId = qualiId;
	}
	public String getOpeType() {
		return opeType;
	}
	public void setOpeType(String opeType) {
		this.opeType = opeType;
	}
	public String getOpeObject() {
		return opeObject;
	}
	public void setOpeObject(String opeObject) {
		this.opeObject = opeObject;
	}
	public String getOpeCause() {
		return opeCause;
	}
	public void setOpeCause(String opeCause) {
		this.opeCause = opeCause;
	}
	public Date getOpeTime() {
		return opeTime;
	}
	public void setOpeTime(Date opeTime) {
		this.opeTime = opeTime;
	}
	public Integer getOpePerson() {
		return opePerson;
	}
	public void setOpePerson(Integer opePerson) {
		this.opePerson = opePerson;
	}
}
