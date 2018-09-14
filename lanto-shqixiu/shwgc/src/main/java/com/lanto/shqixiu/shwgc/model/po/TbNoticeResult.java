package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbNoticeResult implements Serializable {
	private Integer resultId;	//回执ID
	private Integer noticeId;	//通告ID
	private String resultBy;	//回执人
	private Date resultDate;	//回执时间
	private String resultContent;	//回执内容
	private String isAlreadResult;	//是否回执
	private String resultByCode;	//回执人ID
	private String resultType;	//回执类型

	public Integer getResultId() {
		return resultId;
	}
	public void setResultId(Integer resultId) {
		this.resultId = resultId;
	}
	public Integer getNoticeId() {
		return noticeId;
	}
	public void setNoticeId(Integer noticeId) {
		this.noticeId = noticeId;
	}
	public String getResultBy() {
		return resultBy;
	}
	public void setResultBy(String resultBy) {
		this.resultBy = resultBy;
	}
	public Date getResultDate() {
		return resultDate;
	}
	public void setResultDate(Date resultDate) {
		this.resultDate = resultDate;
	}
	public String getResultContent() {
		return resultContent;
	}
	public void setResultContent(String resultContent) {
		this.resultContent = resultContent;
	}
	public String getIsAlreadResult() {
		return isAlreadResult;
	}
	public void setIsAlreadResult(String isAlreadResult) {
		this.isAlreadResult = isAlreadResult;
	}
	public String getResultByCode() {
		return resultByCode;
	}
	public void setResultByCode(String resultByCode) {
		this.resultByCode = resultByCode;
	}
	public String getResultType() {
		return resultType;
	}
	public void setResultType(String resultType) {
		this.resultType = resultType;
	}
}
