package com.lanto.shqixiu.shwgm.model.po;


import java.io.Serializable;
import java.util.Date;

public class TbBusinessEty implements Serializable {

	private static final long serialVersionUID = 1L;
	private Integer id;	//ID
	private String czlx;	//类型
	private String zch;	//工商注册号
	private String mc;	//名称
	private String xkzh;	//许可证号
	private String xkzmc;	// 
	
	private String xkjg;	//许可机关 
	private String xknr;	// 
	private Date xkksrq;	//许可证起始期限 
	private Date xkjsrq;	//许可证截止期限 
	private String zyxmlb;	//主营项目类别 
	
	private String zcdz;	//注册地址 
	private Date clrq;	    //开业日期 
	private String qylx;	//经济类型 
	private String sflag;	// 
	private Date s_sign_data;	// 
	
	private String s_sign_cert;	// 
	private String isupload;	// 
	private String result;	//推送结果 
	private Date operdate;	// 
	private String rjzczb;	// 
	
	private String bz;	// 
	private String djjg;	// 
	private String ztzt;	// 
	private String is_sel;	//选择 
	private String xiaqu;	//辖区 
	private String old_id;	// 
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getCzlx() {
		return czlx;
	}
	public void setCzlx(String czlx) {
		this.czlx = czlx;
	}
	public String getZch() {
		return zch;
	}
	public void setZch(String zch) {
		this.zch = zch;
	}
	public String getMc() {
		return mc;
	}
	public void setMc(String mc) {
		this.mc = mc;
	}
	public String getXkzh() {
		return xkzh;
	}
	public void setXkzh(String xkzh) {
		this.xkzh = xkzh;
	}
	public String getXkzmc() {
		return xkzmc;
	}
	public void setXkzmc(String xkzmc) {
		this.xkzmc = xkzmc;
	}
	public String getXkjg() {
		return xkjg;
	}
	public void setXkjg(String xkjg) {
		this.xkjg = xkjg;
	}
	public String getXknr() {
		return xknr;
	}
	public void setXknr(String xknr) {
		this.xknr = xknr;
	}
	public Date getXkksrq() {
		return xkksrq;
	}
	public void setXkksrq(Date xkksrq) {
		this.xkksrq = xkksrq;
	}
	public Date getXkjsrq() {
		return xkjsrq;
	}
	public void setXkjsrq(Date xkjsrq) {
		this.xkjsrq = xkjsrq;
	}
	public String getZyxmlb() {
		return zyxmlb;
	}
	public void setZyxmlb(String zyxmlb) {
		this.zyxmlb = zyxmlb;
	}
	public String getZcdz() {
		return zcdz;
	}
	public void setZcdz(String zcdz) {
		this.zcdz = zcdz;
	}
	public Date getClrq() {
		return clrq;
	}
	public void setClrq(Date clrq) {
		this.clrq = clrq;
	}
	public String getQylx() {
		return qylx;
	}
	public void setQylx(String qylx) {
		this.qylx = qylx;
	}
	public String getSflag() {
		return sflag;
	}
	public void setSflag(String sflag) {
		this.sflag = sflag;
	}
	public Date getS_sign_data() {
		return s_sign_data;
	}
	public void setS_sign_data(Date sSignData) {
		s_sign_data = sSignData;
	}
	public String getS_sign_cert() {
		return s_sign_cert;
	}
	public void setS_sign_cert(String sSignCert) {
		s_sign_cert = sSignCert;
	}
	public String getIsupload() {
		return isupload;
	}
	public void setIsupload(String isupload) {
		this.isupload = isupload;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public Date getOperdate() {
		return operdate;
	}
	public void setOperdate(Date operdate) {
		this.operdate = operdate;
	}
	public String getRjzczb() {
		return rjzczb;
	}
	public void setRjzczb(String rjzczb) {
		this.rjzczb = rjzczb;
	}
	public String getBz() {
		return bz;
	}
	public void setBz(String bz) {
		this.bz = bz;
	}
	public String getDjjg() {
		return djjg;
	}
	public void setDjjg(String djjg) {
		this.djjg = djjg;
	}
	public String getZtzt() {
		return ztzt;
	}
	public void setZtzt(String ztzt) {
		this.ztzt = ztzt;
	}
	public String getIs_sel() {
		return is_sel;
	}
	public void setIs_sel(String isSel) {
		is_sel = isSel;
	}
	public String getXiaqu() {
		return xiaqu;
	}
	public void setXiaqu(String xiaqu) {
		this.xiaqu = xiaqu;
	}
	public String getOld_id() {
		return old_id;
	}
	public void setOld_id(String oldId) {
		old_id = oldId;
	}
	
}