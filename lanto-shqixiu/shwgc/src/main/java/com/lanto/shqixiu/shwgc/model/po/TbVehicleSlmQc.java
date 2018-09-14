package com.lanto.shqixiu.shwgc.model.po;

import java.io.Serializable;
import java.util.Date;

public class TbVehicleSlmQc implements Serializable {
	private String slmId;	//二维记录ID
	private String corpId;	//维修企业ID
	private String corpNum;	//维修企业编号
	private String corpName;	//维修企业名称
	private String areaCode;	//辖区
	private String certificationId;	//合格证号
	private String operatingLicence;	//营运证号
	private String operatingUnit;	//营运单位
	private String wxgw;	//维修工位
	private String wxgr1;	//维修工人1
	private String wxgr2;	//维修工人2
	private String dpBh;	//底盘编号
	private String vechileNum;	//车牌号码
	private String vechileColor;	//车牌颜色
	private Date beginDate;	//进厂日期
	private Date endDate;	//竣工日期
	private String qcName;	//质检员姓名
	private String fdjQj;	//发动机清洁
	private String lqy;	//冷却液
	private String jy;	//机油
	private String jyLqq;	//机油滤清器
	private String kqLqq;	//空气滤清器
	private String ryLqq;	//燃油滤清器
	private String pd;	//皮带
	private String lmCzZz;	//油门操纵装置
	private String cyjTjZz;	//柴油机停机装置
	private String tbZyXc;	//踏板自由行程
	private String lhqZb;	//离合器总泵
	private String lhqFb;	//离合器分泵
	private String lhqQgLx;	//离合器油管或拉线
	private String lhqYm;	//离合器油面
	private String fxp;	//方向盘
	private String fxj;	//方向机
	private String hzLgQt;	//横直拉杆与球头
	private String lsZx;	//各部螺栓及主销
	private String jzq;	//减振器
	private String qs;	//前束
	private String zdTbZyXc;	//制动踏板自由行程
	private String zcZdZz;	//驻车自动装置
	private String zzy;	//制动液
	private String sdXc;	//手动行程
	private String zdGl;	//制动管路
	private String lgZc;	//轮毂轴承
	private String cqt;	//贮气筒
	private String zdZb;	//制动总泵
	private String zdFb;	//制动分泵
	private String zdpQy;	//前右自动盘厚度
	private String zdpQz;	//前左自动盘厚度
	private String zdpZy;	//中右自动盘厚度
	private String zdpZz;	//中左自动盘厚度
	private String zdpHy;	//后右自动盘厚度
	private String zdpHz;	//后左自动盘厚度
	private String zdgQy;	//前右自动鼓直径
	private String zdgQz;	//前左自动鼓直径
	private String zdgZy;	//中右自动鼓直径
	private String zdgZz;	//中左自动鼓直径
	private String zdgHy;	//后右自动鼓直径
	private String zdgHz;	//后左自动鼓直径
	private String wxj;	//万向节
	private String wxjLs;	//万向节螺栓
	private String zjZcZj;	//中间轴承及支架
	private String ybDg;	//各仪表及灯光
	private String yyht;	//一氧化碳CO
	private String thq;	//碳化氢HC
	private String dyhw;	//氮氧化物NOX
	private String yd;	//烟度(RB)
	private String gxsXs;	//光吸收系数(M-1)
	private String bsqQj;	//BSQ_QJ
	private String czJg;	//操纵机构
	private String zxLtHwSd;	//转向轮胎花纹深度
	private String qtLtHwSd;	//其它轮胎花纹深度

	public String getSlmId() {
		return slmId;
	}
	public void setSlmId(String slmId) {
		this.slmId = slmId;
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
	public String getAreaCode() {
		return areaCode;
	}
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	public String getCertificationId() {
		return certificationId;
	}
	public void setCertificationId(String certificationId) {
		this.certificationId = certificationId;
	}
	public String getOperatingLicence() {
		return operatingLicence;
	}
	public void setOperatingLicence(String operatingLicence) {
		this.operatingLicence = operatingLicence;
	}
	public String getOperatingUnit() {
		return operatingUnit;
	}
	public void setOperatingUnit(String operatingUnit) {
		this.operatingUnit = operatingUnit;
	}
	public String getWxgw() {
		return wxgw;
	}
	public void setWxgw(String wxgw) {
		this.wxgw = wxgw;
	}
	public String getWxgr1() {
		return wxgr1;
	}
	public void setWxgr1(String wxgr1) {
		this.wxgr1 = wxgr1;
	}
	public String getWxgr2() {
		return wxgr2;
	}
	public void setWxgr2(String wxgr2) {
		this.wxgr2 = wxgr2;
	}
	public String getDpBh() {
		return dpBh;
	}
	public void setDpBh(String dpBh) {
		this.dpBh = dpBh;
	}
	public String getVechileNum() {
		return vechileNum;
	}
	public void setVechileNum(String vechileNum) {
		this.vechileNum = vechileNum;
	}
	public String getVechileColor() {
		return vechileColor;
	}
	public void setVechileColor(String vechileColor) {
		this.vechileColor = vechileColor;
	}
	public Date getBeginDate() {
		return beginDate;
	}
	public void setBeginDate(Date beginDate) {
		this.beginDate = beginDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public String getQcName() {
		return qcName;
	}
	public void setQcName(String qcName) {
		this.qcName = qcName;
	}
	public String getFdjQj() {
		return fdjQj;
	}
	public void setFdjQj(String fdjQj) {
		this.fdjQj = fdjQj;
	}
	public String getLqy() {
		return lqy;
	}
	public void setLqy(String lqy) {
		this.lqy = lqy;
	}
	public String getJy() {
		return jy;
	}
	public void setJy(String jy) {
		this.jy = jy;
	}
	public String getJyLqq() {
		return jyLqq;
	}
	public void setJyLqq(String jyLqq) {
		this.jyLqq = jyLqq;
	}
	public String getKqLqq() {
		return kqLqq;
	}
	public void setKqLqq(String kqLqq) {
		this.kqLqq = kqLqq;
	}
	public String getRyLqq() {
		return ryLqq;
	}
	public void setRyLqq(String ryLqq) {
		this.ryLqq = ryLqq;
	}
	public String getPd() {
		return pd;
	}
	public void setPd(String pd) {
		this.pd = pd;
	}
	public String getLmCzZz() {
		return lmCzZz;
	}
	public void setLmCzZz(String lmCzZz) {
		this.lmCzZz = lmCzZz;
	}
	public String getCyjTjZz() {
		return cyjTjZz;
	}
	public void setCyjTjZz(String cyjTjZz) {
		this.cyjTjZz = cyjTjZz;
	}
	public String getTbZyXc() {
		return tbZyXc;
	}
	public void setTbZyXc(String tbZyXc) {
		this.tbZyXc = tbZyXc;
	}
	public String getLhqZb() {
		return lhqZb;
	}
	public void setLhqZb(String lhqZb) {
		this.lhqZb = lhqZb;
	}
	public String getLhqFb() {
		return lhqFb;
	}
	public void setLhqFb(String lhqFb) {
		this.lhqFb = lhqFb;
	}
	public String getLhqQgLx() {
		return lhqQgLx;
	}
	public void setLhqQgLx(String lhqQgLx) {
		this.lhqQgLx = lhqQgLx;
	}
	public String getLhqYm() {
		return lhqYm;
	}
	public void setLhqYm(String lhqYm) {
		this.lhqYm = lhqYm;
	}
	public String getFxp() {
		return fxp;
	}
	public void setFxp(String fxp) {
		this.fxp = fxp;
	}
	public String getFxj() {
		return fxj;
	}
	public void setFxj(String fxj) {
		this.fxj = fxj;
	}
	public String getHzLgQt() {
		return hzLgQt;
	}
	public void setHzLgQt(String hzLgQt) {
		this.hzLgQt = hzLgQt;
	}
	public String getLsZx() {
		return lsZx;
	}
	public void setLsZx(String lsZx) {
		this.lsZx = lsZx;
	}
	public String getJzq() {
		return jzq;
	}
	public void setJzq(String jzq) {
		this.jzq = jzq;
	}
	public String getQs() {
		return qs;
	}
	public void setQs(String qs) {
		this.qs = qs;
	}
	public String getZdTbZyXc() {
		return zdTbZyXc;
	}
	public void setZdTbZyXc(String zdTbZyXc) {
		this.zdTbZyXc = zdTbZyXc;
	}
	public String getZcZdZz() {
		return zcZdZz;
	}
	public void setZcZdZz(String zcZdZz) {
		this.zcZdZz = zcZdZz;
	}
	public String getZzy() {
		return zzy;
	}
	public void setZzy(String zzy) {
		this.zzy = zzy;
	}
	public String getSdXc() {
		return sdXc;
	}
	public void setSdXc(String sdXc) {
		this.sdXc = sdXc;
	}
	public String getZdGl() {
		return zdGl;
	}
	public void setZdGl(String zdGl) {
		this.zdGl = zdGl;
	}
	public String getLgZc() {
		return lgZc;
	}
	public void setLgZc(String lgZc) {
		this.lgZc = lgZc;
	}
	public String getCqt() {
		return cqt;
	}
	public void setCqt(String cqt) {
		this.cqt = cqt;
	}
	public String getZdZb() {
		return zdZb;
	}
	public void setZdZb(String zdZb) {
		this.zdZb = zdZb;
	}
	public String getZdFb() {
		return zdFb;
	}
	public void setZdFb(String zdFb) {
		this.zdFb = zdFb;
	}
	public String getZdpQy() {
		return zdpQy;
	}
	public void setZdpQy(String zdpQy) {
		this.zdpQy = zdpQy;
	}
	public String getZdpQz() {
		return zdpQz;
	}
	public void setZdpQz(String zdpQz) {
		this.zdpQz = zdpQz;
	}
	public String getZdpZy() {
		return zdpZy;
	}
	public void setZdpZy(String zdpZy) {
		this.zdpZy = zdpZy;
	}
	public String getZdpZz() {
		return zdpZz;
	}
	public void setZdpZz(String zdpZz) {
		this.zdpZz = zdpZz;
	}
	public String getZdpHy() {
		return zdpHy;
	}
	public void setZdpHy(String zdpHy) {
		this.zdpHy = zdpHy;
	}
	public String getZdpHz() {
		return zdpHz;
	}
	public void setZdpHz(String zdpHz) {
		this.zdpHz = zdpHz;
	}
	public String getZdgQy() {
		return zdgQy;
	}
	public void setZdgQy(String zdgQy) {
		this.zdgQy = zdgQy;
	}
	public String getZdgQz() {
		return zdgQz;
	}
	public void setZdgQz(String zdgQz) {
		this.zdgQz = zdgQz;
	}
	public String getZdgZy() {
		return zdgZy;
	}
	public void setZdgZy(String zdgZy) {
		this.zdgZy = zdgZy;
	}
	public String getZdgZz() {
		return zdgZz;
	}
	public void setZdgZz(String zdgZz) {
		this.zdgZz = zdgZz;
	}
	public String getZdgHy() {
		return zdgHy;
	}
	public void setZdgHy(String zdgHy) {
		this.zdgHy = zdgHy;
	}
	public String getZdgHz() {
		return zdgHz;
	}
	public void setZdgHz(String zdgHz) {
		this.zdgHz = zdgHz;
	}
	public String getWxj() {
		return wxj;
	}
	public void setWxj(String wxj) {
		this.wxj = wxj;
	}
	public String getWxjLs() {
		return wxjLs;
	}
	public void setWxjLs(String wxjLs) {
		this.wxjLs = wxjLs;
	}
	public String getZjZcZj() {
		return zjZcZj;
	}
	public void setZjZcZj(String zjZcZj) {
		this.zjZcZj = zjZcZj;
	}
	public String getYbDg() {
		return ybDg;
	}
	public void setYbDg(String ybDg) {
		this.ybDg = ybDg;
	}
	public String getYyht() {
		return yyht;
	}
	public void setYyht(String yyht) {
		this.yyht = yyht;
	}
	public String getThq() {
		return thq;
	}
	public void setThq(String thq) {
		this.thq = thq;
	}
	public String getDyhw() {
		return dyhw;
	}
	public void setDyhw(String dyhw) {
		this.dyhw = dyhw;
	}
	public String getYd() {
		return yd;
	}
	public void setYd(String yd) {
		this.yd = yd;
	}
	public String getGxsXs() {
		return gxsXs;
	}
	public void setGxsXs(String gxsXs) {
		this.gxsXs = gxsXs;
	}
	public String getBsqQj() {
		return bsqQj;
	}
	public void setBsqQj(String bsqQj) {
		this.bsqQj = bsqQj;
	}
	public String getCzJg() {
		return czJg;
	}
	public void setCzJg(String czJg) {
		this.czJg = czJg;
	}
	public String getZxLtHwSd() {
		return zxLtHwSd;
	}
	public void setZxLtHwSd(String zxLtHwSd) {
		this.zxLtHwSd = zxLtHwSd;
	}
	public String getQtLtHwSd() {
		return qtLtHwSd;
	}
	public void setQtLtHwSd(String qtLtHwSd) {
		this.qtLtHwSd = qtLtHwSd;
	}
}
