package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbExamFileInfo implements Serializable {
	private String fileId;	//FILE_ID
	private Integer examYear;	//考核年度
	private String examType;	//考核类别 0 一二类 1 其他
	private String corpId;	//企业ID
	private String corpNum;	//经营标志牌号（企业编号）
	private String corpName;	//企业名称
	private String corpAdd;	//地址
	private String legalPerson;	//法人
	private String corpTel;	//联系电话
	private String serviceHotline;	//企业服务热线
	private String corpType;	//维修类别
	private String businessNum;	//经营许可证
	private String industryCode;	//营业执照
	private Date openDate;	//开业时间
	private String oldExamLevel;	//原质量考核等级
	private String economicNature;	//经济类型
	private String repairTypes;	//经营范围
	private Float plantArea;	//厂房面积
	private Float parkArea;	//停车场面积
	private Float anteroomArea;	//接待室面积
	private Integer jsfzrNum;	//技术负责人数量
	private Integer jsfzeCzNum;	//技术负责人数量（持证）
	private Integer zjyNum;	//质检员数量
	private Integer zjyCzNum;	//质检员数量（持证）
	private Integer jxNum;	//机修技术人员数量
	private Integer jxCzNum;	//机修技术人员数量（持证）
	private Integer dqNum;	//电器维修技术人员数量
	private Integer dqCzNum;	//电器维修技术人员数量（持证）
	private Integer bjNum;	//钣金维修技术人员数量
	private Integer bjCzNum;	//钣金维修技术人员数量（持证）
	private Integer tqNum;	//涂漆维修技术人员数量
	private Integer tqCzNum;	//涂漆维修技术人员数量（持证）
	private Integer zzjyNum;	//质量总检验员数量
	private Integer zzjyCzNum;	//质量总检验员数量（持证）
	private Integer csNum;	//车身维护技术人员数量
	private Integer csCzNum;	//车身维护技术人员数量（持证）
	private Integer lpgNum;	//LPG/危运维修技术人员数量
	private Integer lpgCzNum;	//LPG/危运维修技术人员数量（持证）
	private Integer ywNum;	//业务接待人员数量
	private Integer ywCzNum;	//业务接待人员数量（持证）
	private Integer jgNum;	//价格核算人员数量
	private Integer jgCzNum;	//价格核算人员数量（持证）
	private Integer glNum;	//管理负责人员数量
	private Integer glCzNum;	//管理负责人员数量（持证）
	private Integer qtNum;	//其它从业人员数量
	private Integer qtCzNum;	//其它从业人员数量（持证）
	private Integer tysbNum;	//通用设备数
	private Integer zysbNum;	//专用设备数
	private Integer jcsbNum;	//检测设备数
	private Integer jlsbNum;	//计量设备数
	private Integer zysggjNum;	//主要手工工具数
	private Integer wxsbNum;	//外协设备数
	private Integer qtsbNum;	//其它设备数
	private Integer zhcdxNum;	//整车大修
	private Integer zcdxNum;	//总成大修
	private Integer ejwhNum;	//二级维护
	private Integer clxxNum;	//车辆小修
	private Integer zxwxNum;	//专项维修
	private Integer jyNum;	//救援
	private Float wxczNum;	//维修产值
	private Float wxlrNum;	//维修利润
	private Float sjsjNum;	//上缴国家税金
	private Integer gssgNum;	//工伤事故
	private Integer hzsgNum;	//火灾事故
	private Integer ydsgNum;	//用电事故
	private Integer qtsgNum;	//其他事故
	private Integer ssrsNum;	//受伤人数
	private Integer swrsNum;	//死亡人数
	private Float jjssNum;	//经济损失
	private Float hbhsNum;	//环保回收废机油
	private Integer fjltNum;	//废旧轮胎
	private Integer fjxdcNum;	//废旧蓄电池
	private Integer fwzlsjNum;	//服务质量事件
	private Integer tbNum;	//被管理部门通报
	private Integer khtsNum;	//客户投诉
	private Float mydNum;	//投诉客户满意率
	private Integer yztsNum;	//有责投诉
	private String isUpload;	//是否提交
	private String uploadOper;	//提交人
	private Date uploadDate;	//提交时间
	private String isZjExam;	//是否专家初评
	private String zjExamLevel;	//专家初评等级
	private String zjOper;	//专家组
	private Date jzDate;	//专家初评时间
	private String isFirstExam;	//是否初评
	private String firstExamLevel;	//初评等级
	private String firstOper;	//初评人
	private Date firstDate;	//初评时间
	private String isSecExam;	//是否复评
	private String secExamLevel;	//复评等级
	private String secOper;	//复评人
	private Date secDate;	//复评时间
	private String isGs;	//是否公示
	private Date gsDate;	//公示时间
	private String isGb;	//是否公布
	private Date gbDate;	//公布时间

	public String getFileId() {
		return fileId;
	}
	public void setFileId(String fileId) {
		this.fileId = fileId;
	}
	public Integer getExamYear() {
		return examYear;
	}
	public void setExamYear(Integer examYear) {
		this.examYear = examYear;
	}
	public String getExamType() {
		return examType;
	}
	public void setExamType(String examType) {
		this.examType = examType;
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
	public String getCorpAdd() {
		return corpAdd;
	}
	public void setCorpAdd(String corpAdd) {
		this.corpAdd = corpAdd;
	}
	public String getLegalPerson() {
		return legalPerson;
	}
	public void setLegalPerson(String legalPerson) {
		this.legalPerson = legalPerson;
	}
	public String getCorpTel() {
		return corpTel;
	}
	public void setCorpTel(String corpTel) {
		this.corpTel = corpTel;
	}
	public String getServiceHotline() {
		return serviceHotline;
	}
	public void setServiceHotline(String serviceHotline) {
		this.serviceHotline = serviceHotline;
	}
	public String getCorpType() {
		return corpType;
	}
	public void setCorpType(String corpType) {
		this.corpType = corpType;
	}
	public String getBusinessNum() {
		return businessNum;
	}
	public void setBusinessNum(String businessNum) {
		this.businessNum = businessNum;
	}
	public String getIndustryCode() {
		return industryCode;
	}
	public void setIndustryCode(String industryCode) {
		this.industryCode = industryCode;
	}
	public Date getOpenDate() {
		return openDate;
	}
	public void setOpenDate(Date openDate) {
		this.openDate = openDate;
	}
	public String getOldExamLevel() {
		return oldExamLevel;
	}
	public void setOldExamLevel(String oldExamLevel) {
		this.oldExamLevel = oldExamLevel;
	}
	public String getEconomicNature() {
		return economicNature;
	}
	public void setEconomicNature(String economicNature) {
		this.economicNature = economicNature;
	}
	public String getRepairTypes() {
		return repairTypes;
	}
	public void setRepairTypes(String repairTypes) {
		this.repairTypes = repairTypes;
	}
	public Float getPlantArea() {
		return plantArea;
	}
	public void setPlantArea(Float plantArea) {
		this.plantArea = plantArea;
	}
	public Float getParkArea() {
		return parkArea;
	}
	public void setParkArea(Float parkArea) {
		this.parkArea = parkArea;
	}
	public Float getAnteroomArea() {
		return anteroomArea;
	}
	public void setAnteroomArea(Float anteroomArea) {
		this.anteroomArea = anteroomArea;
	}
	public Integer getJsfzrNum() {
		return jsfzrNum;
	}
	public void setJsfzrNum(Integer jsfzrNum) {
		this.jsfzrNum = jsfzrNum;
	}
	public Integer getJsfzeCzNum() {
		return jsfzeCzNum;
	}
	public void setJsfzeCzNum(Integer jsfzeCzNum) {
		this.jsfzeCzNum = jsfzeCzNum;
	}
	public Integer getZjyNum() {
		return zjyNum;
	}
	public void setZjyNum(Integer zjyNum) {
		this.zjyNum = zjyNum;
	}
	public Integer getZjyCzNum() {
		return zjyCzNum;
	}
	public void setZjyCzNum(Integer zjyCzNum) {
		this.zjyCzNum = zjyCzNum;
	}
	public Integer getJxNum() {
		return jxNum;
	}
	public void setJxNum(Integer jxNum) {
		this.jxNum = jxNum;
	}
	public Integer getJxCzNum() {
		return jxCzNum;
	}
	public void setJxCzNum(Integer jxCzNum) {
		this.jxCzNum = jxCzNum;
	}
	public Integer getDqNum() {
		return dqNum;
	}
	public void setDqNum(Integer dqNum) {
		this.dqNum = dqNum;
	}
	public Integer getDqCzNum() {
		return dqCzNum;
	}
	public void setDqCzNum(Integer dqCzNum) {
		this.dqCzNum = dqCzNum;
	}
	public Integer getBjNum() {
		return bjNum;
	}
	public void setBjNum(Integer bjNum) {
		this.bjNum = bjNum;
	}
	public Integer getBjCzNum() {
		return bjCzNum;
	}
	public void setBjCzNum(Integer bjCzNum) {
		this.bjCzNum = bjCzNum;
	}
	public Integer getTqNum() {
		return tqNum;
	}
	public void setTqNum(Integer tqNum) {
		this.tqNum = tqNum;
	}
	public Integer getTqCzNum() {
		return tqCzNum;
	}
	public void setTqCzNum(Integer tqCzNum) {
		this.tqCzNum = tqCzNum;
	}
	public Integer getZzjyNum() {
		return zzjyNum;
	}
	public void setZzjyNum(Integer zzjyNum) {
		this.zzjyNum = zzjyNum;
	}
	public Integer getZzjyCzNum() {
		return zzjyCzNum;
	}
	public void setZzjyCzNum(Integer zzjyCzNum) {
		this.zzjyCzNum = zzjyCzNum;
	}
	public Integer getCsNum() {
		return csNum;
	}
	public void setCsNum(Integer csNum) {
		this.csNum = csNum;
	}
	public Integer getCsCzNum() {
		return csCzNum;
	}
	public void setCsCzNum(Integer csCzNum) {
		this.csCzNum = csCzNum;
	}
	public Integer getLpgNum() {
		return lpgNum;
	}
	public void setLpgNum(Integer lpgNum) {
		this.lpgNum = lpgNum;
	}
	public Integer getLpgCzNum() {
		return lpgCzNum;
	}
	public void setLpgCzNum(Integer lpgCzNum) {
		this.lpgCzNum = lpgCzNum;
	}
	public Integer getYwNum() {
		return ywNum;
	}
	public void setYwNum(Integer ywNum) {
		this.ywNum = ywNum;
	}
	public Integer getYwCzNum() {
		return ywCzNum;
	}
	public void setYwCzNum(Integer ywCzNum) {
		this.ywCzNum = ywCzNum;
	}
	public Integer getJgNum() {
		return jgNum;
	}
	public void setJgNum(Integer jgNum) {
		this.jgNum = jgNum;
	}
	public Integer getJgCzNum() {
		return jgCzNum;
	}
	public void setJgCzNum(Integer jgCzNum) {
		this.jgCzNum = jgCzNum;
	}
	public Integer getGlNum() {
		return glNum;
	}
	public void setGlNum(Integer glNum) {
		this.glNum = glNum;
	}
	public Integer getGlCzNum() {
		return glCzNum;
	}
	public void setGlCzNum(Integer glCzNum) {
		this.glCzNum = glCzNum;
	}
	public Integer getQtNum() {
		return qtNum;
	}
	public void setQtNum(Integer qtNum) {
		this.qtNum = qtNum;
	}
	public Integer getQtCzNum() {
		return qtCzNum;
	}
	public void setQtCzNum(Integer qtCzNum) {
		this.qtCzNum = qtCzNum;
	}
	public Integer getTysbNum() {
		return tysbNum;
	}
	public void setTysbNum(Integer tysbNum) {
		this.tysbNum = tysbNum;
	}
	public Integer getZysbNum() {
		return zysbNum;
	}
	public void setZysbNum(Integer zysbNum) {
		this.zysbNum = zysbNum;
	}
	public Integer getJcsbNum() {
		return jcsbNum;
	}
	public void setJcsbNum(Integer jcsbNum) {
		this.jcsbNum = jcsbNum;
	}
	public Integer getJlsbNum() {
		return jlsbNum;
	}
	public void setJlsbNum(Integer jlsbNum) {
		this.jlsbNum = jlsbNum;
	}
	public Integer getZysggjNum() {
		return zysggjNum;
	}
	public void setZysggjNum(Integer zysggjNum) {
		this.zysggjNum = zysggjNum;
	}
	public Integer getWxsbNum() {
		return wxsbNum;
	}
	public void setWxsbNum(Integer wxsbNum) {
		this.wxsbNum = wxsbNum;
	}
	public Integer getQtsbNum() {
		return qtsbNum;
	}
	public void setQtsbNum(Integer qtsbNum) {
		this.qtsbNum = qtsbNum;
	}
	public Integer getZhcdxNum() {
		return zhcdxNum;
	}
	public void setZhcdxNum(Integer zhcdxNum) {
		this.zhcdxNum = zhcdxNum;
	}
	public Integer getZcdxNum() {
		return zcdxNum;
	}
	public void setZcdxNum(Integer zcdxNum) {
		this.zcdxNum = zcdxNum;
	}
	public Integer getEjwhNum() {
		return ejwhNum;
	}
	public void setEjwhNum(Integer ejwhNum) {
		this.ejwhNum = ejwhNum;
	}
	public Integer getClxxNum() {
		return clxxNum;
	}
	public void setClxxNum(Integer clxxNum) {
		this.clxxNum = clxxNum;
	}
	public Integer getZxwxNum() {
		return zxwxNum;
	}
	public void setZxwxNum(Integer zxwxNum) {
		this.zxwxNum = zxwxNum;
	}
	public Integer getJyNum() {
		return jyNum;
	}
	public void setJyNum(Integer jyNum) {
		this.jyNum = jyNum;
	}
	public Float getWxczNum() {
		return wxczNum;
	}
	public void setWxczNum(Float wxczNum) {
		this.wxczNum = wxczNum;
	}
	public Float getWxlrNum() {
		return wxlrNum;
	}
	public void setWxlrNum(Float wxlrNum) {
		this.wxlrNum = wxlrNum;
	}
	public Float getSjsjNum() {
		return sjsjNum;
	}
	public void setSjsjNum(Float sjsjNum) {
		this.sjsjNum = sjsjNum;
	}
	public Integer getGssgNum() {
		return gssgNum;
	}
	public void setGssgNum(Integer gssgNum) {
		this.gssgNum = gssgNum;
	}
	public Integer getHzsgNum() {
		return hzsgNum;
	}
	public void setHzsgNum(Integer hzsgNum) {
		this.hzsgNum = hzsgNum;
	}
	public Integer getYdsgNum() {
		return ydsgNum;
	}
	public void setYdsgNum(Integer ydsgNum) {
		this.ydsgNum = ydsgNum;
	}
	public Integer getQtsgNum() {
		return qtsgNum;
	}
	public void setQtsgNum(Integer qtsgNum) {
		this.qtsgNum = qtsgNum;
	}
	public Integer getSsrsNum() {
		return ssrsNum;
	}
	public void setSsrsNum(Integer ssrsNum) {
		this.ssrsNum = ssrsNum;
	}
	public Integer getSwrsNum() {
		return swrsNum;
	}
	public void setSwrsNum(Integer swrsNum) {
		this.swrsNum = swrsNum;
	}
	public Float getJjssNum() {
		return jjssNum;
	}
	public void setJjssNum(Float jjssNum) {
		this.jjssNum = jjssNum;
	}
	public Float getHbhsNum() {
		return hbhsNum;
	}
	public void setHbhsNum(Float hbhsNum) {
		this.hbhsNum = hbhsNum;
	}
	public Integer getFjltNum() {
		return fjltNum;
	}
	public void setFjltNum(Integer fjltNum) {
		this.fjltNum = fjltNum;
	}
	public Integer getFjxdcNum() {
		return fjxdcNum;
	}
	public void setFjxdcNum(Integer fjxdcNum) {
		this.fjxdcNum = fjxdcNum;
	}
	public Integer getFwzlsjNum() {
		return fwzlsjNum;
	}
	public void setFwzlsjNum(Integer fwzlsjNum) {
		this.fwzlsjNum = fwzlsjNum;
	}
	public Integer getTbNum() {
		return tbNum;
	}
	public void setTbNum(Integer tbNum) {
		this.tbNum = tbNum;
	}
	public Integer getKhtsNum() {
		return khtsNum;
	}
	public void setKhtsNum(Integer khtsNum) {
		this.khtsNum = khtsNum;
	}
	public Float getMydNum() {
		return mydNum;
	}
	public void setMydNum(Float mydNum) {
		this.mydNum = mydNum;
	}
	public Integer getYztsNum() {
		return yztsNum;
	}
	public void setYztsNum(Integer yztsNum) {
		this.yztsNum = yztsNum;
	}
	public String getIsUpload() {
		return isUpload;
	}
	public void setIsUpload(String isUpload) {
		this.isUpload = isUpload;
	}
	public String getUploadOper() {
		return uploadOper;
	}
	public void setUploadOper(String uploadOper) {
		this.uploadOper = uploadOper;
	}
	public Date getUploadDate() {
		return uploadDate;
	}
	public void setUploadDate(Date uploadDate) {
		this.uploadDate = uploadDate;
	}
	public String getIsZjExam() {
		return isZjExam;
	}
	public void setIsZjExam(String isZjExam) {
		this.isZjExam = isZjExam;
	}
	public String getZjExamLevel() {
		return zjExamLevel;
	}
	public void setZjExamLevel(String zjExamLevel) {
		this.zjExamLevel = zjExamLevel;
	}
	public String getZjOper() {
		return zjOper;
	}
	public void setZjOper(String zjOper) {
		this.zjOper = zjOper;
	}
	public Date getJzDate() {
		return jzDate;
	}
	public void setJzDate(Date jzDate) {
		this.jzDate = jzDate;
	}
	public String getIsFirstExam() {
		return isFirstExam;
	}
	public void setIsFirstExam(String isFirstExam) {
		this.isFirstExam = isFirstExam;
	}
	public String getFirstExamLevel() {
		return firstExamLevel;
	}
	public void setFirstExamLevel(String firstExamLevel) {
		this.firstExamLevel = firstExamLevel;
	}
	public String getFirstOper() {
		return firstOper;
	}
	public void setFirstOper(String firstOper) {
		this.firstOper = firstOper;
	}
	public Date getFirstDate() {
		return firstDate;
	}
	public void setFirstDate(Date firstDate) {
		this.firstDate = firstDate;
	}
	public String getIsSecExam() {
		return isSecExam;
	}
	public void setIsSecExam(String isSecExam) {
		this.isSecExam = isSecExam;
	}
	public String getSecExamLevel() {
		return secExamLevel;
	}
	public void setSecExamLevel(String secExamLevel) {
		this.secExamLevel = secExamLevel;
	}
	public String getSecOper() {
		return secOper;
	}
	public void setSecOper(String secOper) {
		this.secOper = secOper;
	}
	public Date getSecDate() {
		return secDate;
	}
	public void setSecDate(Date secDate) {
		this.secDate = secDate;
	}
	public String getIsGs() {
		return isGs;
	}
	public void setIsGs(String isGs) {
		this.isGs = isGs;
	}
	public Date getGsDate() {
		return gsDate;
	}
	public void setGsDate(Date gsDate) {
		this.gsDate = gsDate;
	}
	public String getIsGb() {
		return isGb;
	}
	public void setIsGb(String isGb) {
		this.isGb = isGb;
	}
	public Date getGbDate() {
		return gbDate;
	}
	public void setGbDate(Date gbDate) {
		this.gbDate = gbDate;
	}
}
