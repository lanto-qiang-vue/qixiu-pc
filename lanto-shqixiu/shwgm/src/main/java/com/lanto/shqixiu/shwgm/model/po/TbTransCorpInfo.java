package com.lanto.shqixiu.shwgm.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbTransCorpInfo implements Serializable {
	private Integer corpId;	//企业ID
	private String corpNum;	//企业编号
	private String corpName;	//企业名称
	private String corpType;	//企业类型(经营范围)
	private String corpStype;	//兼营范围
	private String corpArea;	//所属辖区
	private String corpAdd;	//企业地址
	private String economicNature;	//经济性质
	private String accountType;	//核算形式
	private String email;	//电子邮箱
	private String bound;	//特约品牌
	private String adminDept;	//主管部门
	private String serviceHotline;	//维修服务热线
	private String coprTel;	//联系电话
	private String webSite;	//企业网址
	private String faxNum;	//传真号码
	private String chargePerson;	//企业负责人
	private String legalPerson;	//法人代表
	private String certOrgan;	//发证机关
	private String businessNum;	//道路经营许可证号
	private Date firstCertTime;	//首次发证时间
	private Date certDate;	//发证日期
	private Date validStartDate;	//有效开始日期
	private Date validEndDate;	//有效结束日期
	private String remark;	//备注
	private Date updateDate;	//修改日期
	private String status;	//企业状态
	private String contacts;	//联系人
	private String contactsTel;	//联系人手机
	private String legalTel;	//负责人手机
	private String createQuatoCount;
	
	private Integer createQuatoNum;
	
	
	public String getCreateQuatoCount() {
		return createQuatoCount;
	}
	public void setCreateQuatoCount(String createQuatoCount) {
		this.createQuatoCount = createQuatoCount;
	}
	public Integer getCreateQuatoNum() {
		return createQuatoNum;
	}
	public void setCreateQuatoNum(Integer createQuatoNum) {
		this.createQuatoNum = createQuatoNum;
	}
	public Integer getCorpId() {
		return corpId;
	}
	public void setCorpId(Integer corpId) {
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
	public String getCorpType() {
		return corpType;
	}
	public void setCorpType(String corpType) {
		this.corpType = corpType;
	}
	public String getCorpStype() {
		return corpStype;
	}
	public void setCorpStype(String corpStype) {
		this.corpStype = corpStype;
	}
	public String getCorpArea() {
		return corpArea;
	}
	public void setCorpArea(String corpArea) {
		this.corpArea = corpArea;
	}
	public String getCorpAdd() {
		return corpAdd;
	}
	public void setCorpAdd(String corpAdd) {
		this.corpAdd = corpAdd;
	}
	public String getEconomicNature() {
		return economicNature;
	}
	public void setEconomicNature(String economicNature) {
		this.economicNature = economicNature;
	}
	public String getAccountType() {
		return accountType;
	}
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getBound() {
		return bound;
	}
	public void setBound(String bound) {
		this.bound = bound;
	}
	public String getAdminDept() {
		return adminDept;
	}
	public void setAdminDept(String adminDept) {
		this.adminDept = adminDept;
	}
	public String getServiceHotline() {
		return serviceHotline;
	}
	public void setServiceHotline(String serviceHotline) {
		this.serviceHotline = serviceHotline;
	}
	public String getCoprTel() {
		return coprTel;
	}
	public void setCoprTel(String coprTel) {
		this.coprTel = coprTel;
	}
	public String getWebSite() {
		return webSite;
	}
	public void setWebSite(String webSite) {
		this.webSite = webSite;
	}
	public String getFaxNum() {
		return faxNum;
	}
	public void setFaxNum(String faxNum) {
		this.faxNum = faxNum;
	}
	public String getChargePerson() {
		return chargePerson;
	}
	public void setChargePerson(String chargePerson) {
		this.chargePerson = chargePerson;
	}
	public String getLegalPerson() {
		return legalPerson;
	}
	public void setLegalPerson(String legalPerson) {
		this.legalPerson = legalPerson;
	}
	public String getCertOrgan() {
		return certOrgan;
	}
	public void setCertOrgan(String certOrgan) {
		this.certOrgan = certOrgan;
	}
	public String getBusinessNum() {
		return businessNum;
	}
	public void setBusinessNum(String businessNum) {
		this.businessNum = businessNum;
	}
	public Date getFirstCertTime() {
		return firstCertTime;
	}
	public void setFirstCertTime(Date firstCertTime) {
		this.firstCertTime = firstCertTime;
	}
	public Date getCertDate() {
		return certDate;
	}
	public void setCertDate(Date certDate) {
		this.certDate = certDate;
	}
	public Date getValidStartDate() {
		return validStartDate;
	}
	public void setValidStartDate(Date validStartDate) {
		this.validStartDate = validStartDate;
	}
	public Date getValidEndDate() {
		return validEndDate;
	}
	public void setValidEndDate(Date validEndDate) {
		this.validEndDate = validEndDate;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getContacts() {
		return contacts;
	}
	public void setContacts(String contacts) {
		this.contacts = contacts;
	}
	public String getContactsTel() {
		return contactsTel;
	}
	public void setContactsTel(String contactsTel) {
		this.contactsTel = contactsTel;
	}
	public String getLegalTel() {
		return legalTel;
	}
	public void setLegalTel(String legalTel) {
		this.legalTel = legalTel;
	}
	
	
	
}
