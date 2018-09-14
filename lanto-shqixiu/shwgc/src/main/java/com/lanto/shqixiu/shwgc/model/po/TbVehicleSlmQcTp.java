package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbVehicleSlmQcTp implements Serializable {
	private String slmId;	//二维记录ID
	private Date jcZpZpSj;	//进厂照片抓拍时间
	private Date sgZpZpSj;	//施工照片抓拍时间
	private Date ccZpZpSj;	//出厂照片抓拍时间
	private Date createDate;
	private String jcZp;
	private String ccZp;
	private String sgZp;

	public String getSlmId() {
		return slmId;
	}
	public void setSlmId(String slmId) {
		this.slmId = slmId;
	}
	public Date getJcZpZpSj() {
		return jcZpZpSj;
	}
	public void setJcZpZpSj(Date jcZpZpSj) {
		this.jcZpZpSj = jcZpZpSj;
	}

	public Date getSgZpZpSj() {
		return sgZpZpSj;
	}
	public void setSgZpZpSj(Date sgZpZpSj) {
		this.sgZpZpSj = sgZpZpSj;
	}
	public Date getCcZpZpSj() {
		return ccZpZpSj;
	}
	public void setCcZpZpSj(Date ccZpZpSj) {
		this.ccZpZpSj = ccZpZpSj;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public String getJcZp() {
		return jcZp;
	}
	public void setJcZp(String jcZp) {
		this.jcZp = jcZp;
	}
	public String getCcZp() {
		return ccZp;
	}
	public void setCcZp(String ccZp) {
		this.ccZp = ccZp;
	}
	public String getSgZp() {
		return sgZp;
	}
	public void setSgZp(String sgZp) {
		this.sgZp = sgZp;
	}
	
}
