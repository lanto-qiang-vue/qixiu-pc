package com.lanto.shqixiu.shcheck.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbCorpInfo implements Serializable {
	private String corpId;	//企业ID
	private String corpNum;	//企业编号
	private String corpName;	//企业名称
	private String businessNum;
	private String orgNumber;
	private String corpAdd;
	private String linkZip;
	private String businessType;
	private String linkMan;
	private String linkTel;
	private String legalName;
	private String legalTel;
	private String corpType;
	private Date certificateFirstTime;
	private Date certificatStartTime;
	private Date certificateEndTime;
	private String corpArea;
	private String emails;
	private String status;
	private String magorBrands;
	private String isJoin;
	private Integer joinId;
	private String longitude;
	private String latitude;
	private Date updateDate;
	
	private String fictPerson;
	private String technologyPerson;
	private String finalPerson;
	private String qualityPerson;
	private String is4s;
	private String isSecMaintain;
	private String isWycl;
	private String isXny;
	private String isQcjy;
	private String serviceHotline;
	
	private Integer zblc;
	private Integer zbrq;
	
	private String createQuatoCount;
	private String uploadQuatoCount;
	private String searchQuatoCount;
	private Integer createQuatoNum;
	private Integer uploadQuatoNum;
	private Integer searchQuatoNum;
	
	
	public Integer getCreateQuatoNum() {
		return createQuatoNum;
	}
	public void setCreateQuatoNum(Integer createQuatoNum) {
		this.createQuatoNum = createQuatoNum;
	}
	public Integer getUploadQuatoNum() {
		return uploadQuatoNum;
	}
	public void setUploadQuatoNum(Integer uploadQuatoNum) {
		this.uploadQuatoNum = uploadQuatoNum;
	}
	public Integer getSearchQuatoNum() {
		return searchQuatoNum;
	}
	public void setSearchQuatoNum(Integer searchQuatoNum) {
		this.searchQuatoNum = searchQuatoNum;
	}
	public String getServiceHotline() {
		return serviceHotline;
	}
	public void setServiceHotline(String serviceHotline) {
		this.serviceHotline = serviceHotline;
	}
	public String getCorpId() {
		return corpId;
	}
	public void setCorpId(String corpId) {
		this.corpId = corpId;
	}
	public String getCorpNum() {
		return corpNum;
	}
	public void setCorpNum(String corpNum) {
		this.corpNum = corpNum;
	}
	public String getCorpName() {
		return corpName;
	}
	public void setCorpName(String corpName) {
		this.corpName = corpName;
	}
	public String getBusinessNum() {
		return businessNum;
	}
	public void setBusinessNum(String businessNum) {
		this.businessNum = businessNum;
	}
	public String getOrgNumber() {
		return orgNumber;
	}
	public void setOrgNumber(String orgNumber) {
		this.orgNumber = orgNumber;
	}
	public String getCorpAdd() {
		return corpAdd;
	}
	public void setCorpAdd(String corpAdd) {
		this.corpAdd = corpAdd;
	}
	public String getLinkZip() {
		return linkZip;
	}
	public void setLinkZip(String linkZip) {
		this.linkZip = linkZip;
	}
	public String getBusinessType() {
		return businessType;
	}
	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}
	public String getLinkMan() {
		return linkMan;
	}
	public void setLinkMan(String linkMan) {
		this.linkMan = linkMan;
	}
	public String getLinkTel() {
		return linkTel;
	}
	public void setLinkTel(String linkTel) {
		this.linkTel = linkTel;
	}
	public String getLegalName() {
		return legalName;
	}
	public void setLegalName(String legalName) {
		this.legalName = legalName;
	}
	public String getLegalTel() {
		return legalTel;
	}
	public void setLegalTel(String legalTel) {
		this.legalTel = legalTel;
	}
	public String getCorpType() {
		return corpType;
	}
	public void setCorpType(String corpType) {
		this.corpType = corpType;
	}
	public Date getCertificateFirstTime() {
		return certificateFirstTime;
	}
	public void setCertificateFirstTime(Date certificateFirstTime) {
		this.certificateFirstTime = certificateFirstTime;
	}
	public Date getCertificatStartTime() {
		return certificatStartTime;
	}
	public void setCertificatStartTime(Date certificatStartTime) {
		this.certificatStartTime = certificatStartTime;
	}
	public Date getCertificateEndTime() {
		return certificateEndTime;
	}
	public void setCertificateEndTime(Date certificateEndTime) {
		this.certificateEndTime = certificateEndTime;
	}
	public String getCorpArea() {
		return corpArea;
	}
	public void setCorpArea(String corpArea) {
		this.corpArea = corpArea;
	}
	public String getEmails() {
		return emails;
	}
	public void setEmails(String emails) {
		this.emails = emails;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMagorBrands() {
		return magorBrands;
	}
	public void setMagorBrands(String magorBrands) {
		this.magorBrands = magorBrands;
	}
	public String getIsJoin() {
		return isJoin;
	}
	public void setIsJoin(String isJoin) {
		this.isJoin = isJoin;
	}
	public Integer getJoinId() {
		return joinId;
	}
	public void setJoinId(Integer joinId) {
		this.joinId = joinId;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	public String getFictPerson() {
		return fictPerson;
	}
	public void setFictPerson(String fictPerson) {
		this.fictPerson = fictPerson;
	}
	public String getTechnologyPerson() {
		return technologyPerson;
	}
	public void setTechnologyPerson(String technologyPerson) {
		this.technologyPerson = technologyPerson;
	}
	public String getFinalPerson() {
		return finalPerson;
	}
	public void setFinalPerson(String finalPerson) {
		this.finalPerson = finalPerson;
	}
	public String getQualityPerson() {
		return qualityPerson;
	}
	public void setQualityPerson(String qualityPerson) {
		this.qualityPerson = qualityPerson;
	}
	public String getIs4s() {
		return is4s;
	}
	public void setIs4s(String is4s) {
		this.is4s = is4s;
	}
	public String getIsSecMaintain() {
		return isSecMaintain;
	}
	public void setIsSecMaintain(String isSecMaintain) {
		this.isSecMaintain = isSecMaintain;
	}
	public String getIsWycl() {
		return isWycl;
	}
	public void setIsWycl(String isWycl) {
		this.isWycl = isWycl;
	}
	public String getIsXny() {
		return isXny;
	}
	public void setIsXny(String isXny) {
		this.isXny = isXny;
	}
	public String getIsQcjy() {
		return isQcjy;
	}
	public void setIsQcjy(String isQcjy) {
		this.isQcjy = isQcjy;
	}
	public Integer getZblc() {
		return zblc;
	}
	public void setZblc(Integer zblc) {
		this.zblc = zblc;
	}
	public Integer getZbrq() {
		return zbrq;
	}
	public void setZbrq(Integer zbrq) {
		this.zbrq = zbrq;
	}
	public String getCreateQuatoCount() {
		return createQuatoCount;
	}
	public void setCreateQuatoCount(String createQuatoCount) {
		this.createQuatoCount = createQuatoCount;
	}
	public String getUploadQuatoCount() {
		return uploadQuatoCount;
	}
	public void setUploadQuatoCount(String uploadQuatoCount) {
		this.uploadQuatoCount = uploadQuatoCount;
	}
	public String getSearchQuatoCount() {
		return searchQuatoCount;
	}
	public void setSearchQuatoCount(String searchQuatoCount) {
		this.searchQuatoCount = searchQuatoCount;
	}
	
	
}
