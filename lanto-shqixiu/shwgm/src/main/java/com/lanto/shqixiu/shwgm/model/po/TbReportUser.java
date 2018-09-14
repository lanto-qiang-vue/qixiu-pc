package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbReportUser implements Serializable {
	private Integer id;	//ID
	private String corpid;	//CORPID
	private String bustype;	//BUSTYPE
	private String verno;	//VERNO
	private byte[] repitem;
	private Date uptime;	//UPTIME

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getCorpid() {
		return corpid;
	}
	public void setCorpid(String corpid) {
		this.corpid = corpid;
	}
	public String getBustype() {
		return bustype;
	}
	public void setBustype(String bustype) {
		this.bustype = bustype;
	}
	public String getVerno() {
		return verno;
	}
	public void setVerno(String verno) {
		this.verno = verno;
	}
	
	public byte[] getRepitem() {
		return repitem;
	}
	public void setRepitem(byte[] repitem) {
		this.repitem = repitem;
	}
	public Date getUptime() {
		return uptime;
	}
	public void setUptime(Date uptime) {
		this.uptime = uptime;
	}
}
