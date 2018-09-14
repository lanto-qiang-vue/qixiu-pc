package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;
import java.util.Date;

public class TcCorpEmployee implements Serializable {
	private Integer employeeId;	//人员ID
	private Integer corpId;	//企业ID
	private String employeeCode;	//员工编号
	private String employeeName;	//员工姓名
	private String cardCode;	//身份证号
	private String sex;	//性别
	private Date birthday;	//出生日期
	private String isDown;	//可否下载
	private String workPost;	//从业岗位
	private String jobTitle;	//职称/技术等级
	private String level;	//级别
	private String eduRecord;	//学历
	private Date entryTime;	//入职时间
	private String telpnone;	//手机号码
	private String address;	//住址
	private String isByExam;	//是否通过考试
	private String rulesRecord;	//违章处分记录
	private String isPrint;	//是否已打印
	private String trainRecord;	//专项培训记录
	private String keepRecord;	//继续教育记录
	private String honestyRecord;	//诚信考核记录
	private String photo;	//照片路径

	public Integer getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(Integer employeeId) {
		this.employeeId = employeeId;
	}
	public Integer getCorpId() {
		return corpId;
	}
	public void setCorpId(Integer corpId) {
		this.corpId = corpId;
	}
	public String getEmployeeCode() {
		return employeeCode;
	}
	public void setEmployeeCode(String employeeCode) {
		this.employeeCode = employeeCode;
	}
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getCardCode() {
		return cardCode;
	}
	public void setCardCode(String cardCode) {
		this.cardCode = cardCode;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public Date getBirthday() {
		return birthday;
	}
	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}
	public String getIsDown() {
		return isDown;
	}
	public void setIsDown(String isDown) {
		this.isDown = isDown;
	}
	public String getWorkPost() {
		return workPost;
	}
	public void setWorkPost(String workPost) {
		this.workPost = workPost;
	}
	public String getJobTitle() {
		return jobTitle;
	}
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public String getEduRecord() {
		return eduRecord;
	}
	public void setEduRecord(String eduRecord) {
		this.eduRecord = eduRecord;
	}
	public Date getEntryTime() {
		return entryTime;
	}
	public void setEntryTime(Date entryTime) {
		this.entryTime = entryTime;
	}
	public String getTelpnone() {
		return telpnone;
	}
	public void setTelpnone(String telpnone) {
		this.telpnone = telpnone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getIsByExam() {
		return isByExam;
	}
	public void setIsByExam(String isByExam) {
		this.isByExam = isByExam;
	}
	public String getRulesRecord() {
		return rulesRecord;
	}
	public void setRulesRecord(String rulesRecord) {
		this.rulesRecord = rulesRecord;
	}
	public String getIsPrint() {
		return isPrint;
	}
	public void setIsPrint(String isPrint) {
		this.isPrint = isPrint;
	}
	public String getTrainRecord() {
		return trainRecord;
	}
	public void setTrainRecord(String trainRecord) {
		this.trainRecord = trainRecord;
	}
	public String getKeepRecord() {
		return keepRecord;
	}
	public void setKeepRecord(String keepRecord) {
		this.keepRecord = keepRecord;
	}
	public String getHonestyRecord() {
		return honestyRecord;
	}
	public void setHonestyRecord(String honestyRecord) {
		this.honestyRecord = honestyRecord;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
}
