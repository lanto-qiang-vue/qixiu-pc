package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;
import java.util.Date;

public class TvVehicleCheck implements Serializable {
	private Integer checkId;
	private Long geneId;	//普通维修单ID	
	private String jcId;	
	private Date checkDate;	
	private String lcRecord;	
	private String checkType;	
	private String checkDj;	
	private String vehDj;	
	private String corpName;
	private String djr;
	private Date createDate;
	
	private Integer vehicleId;
	
	private String image1;
	private String image2;
	private String image3;
	
	
	public Long getGeneId() {
		return geneId;
	}
	public void setGeneId(Long geneId) {
		this.geneId = geneId;
	}
	public String getJcId() {
		return jcId;
	}
	public void setJcId(String jcId) {
		this.jcId = jcId;
	}
	public Integer getCheckId() {
		return checkId;
	}
	public void setCheckId(Integer checkId) {
		this.checkId = checkId;
	}
	public Date getCheckDate() {
		return checkDate;
	}
	public void setCheckDate(Date checkDate) {
		this.checkDate = checkDate;
	}
	public String getLcRecord() {
		return lcRecord;
	}
	public void setLcRecord(String lcRecord) {
		this.lcRecord = lcRecord;
	}
	public String getCheckType() {
		return checkType;
	}
	public void setCheckType(String checkType) {
		this.checkType = checkType;
	}
	public String getCheckDj() {
		return checkDj;
	}
	public void setCheckDj(String checkDj) {
		this.checkDj = checkDj;
	}
	public String getVehDj() {
		return vehDj;
	}
	public void setVehDj(String vehDj) {
		this.vehDj = vehDj;
	}
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getDjr() {
		return djr;
	}
	public void setDjr(String djr) {
		this.djr = djr;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Integer getVehicleId() {
		return vehicleId;
	}
	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}
	public String getImage1() {
		return image1;
	}
	public void setImage1(String image1) {
		this.image1 = image1;
	}
	public String getImage2() {
		return image2;
	}
	public void setImage2(String image2) {
		this.image2 = image2;
	}
	public String getImage3() {
		return image3;
	}
	public void setImage3(String image3) {
		this.image3 = image3;
	}
	
}
