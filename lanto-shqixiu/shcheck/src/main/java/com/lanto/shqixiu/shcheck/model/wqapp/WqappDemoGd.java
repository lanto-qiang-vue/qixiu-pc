package com.lanto.shqixiu.shcheck.model.wqapp;

import java.io.Serializable;
import java.util.Date;

public class WqappDemoGd implements Serializable {
	private Integer gdId;	
	private String gdbh;	
	private String jcdh;	
	private String gdlx;	
	private String wxlx;	
	private Date kdsj;	
	private String zjy;	
	private String corpName;
	private String status;
	
	public Integer getGdId() {
		return gdId;
	}
	public void setGdId(Integer gdId) {
		this.gdId = gdId;
	}
	public String getGdbh() {
		return gdbh;
	}
	public void setGdbh(String gdbh) {
		this.gdbh = gdbh;
	}
	public String getJcdh() {
		return jcdh;
	}
	public void setJcdh(String jcdh) {
		this.jcdh = jcdh;
	}
	public String getGdlx() {
		return gdlx;
	}
	public void setGdlx(String gdlx) {
		this.gdlx = gdlx;
	}
	public String getWxlx() {
		return wxlx;
	}
	public void setWxlx(String wxlx) {
		this.wxlx = wxlx;
	}
	public Date getKdsj() {
		return kdsj;
	}
	public void setKdsj(Date kdsj) {
		this.kdsj = kdsj;
	}
	public String getZjy() {
		return zjy;
	}
	public void setZjy(String zjy) {
		this.zjy = zjy;
	}
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
