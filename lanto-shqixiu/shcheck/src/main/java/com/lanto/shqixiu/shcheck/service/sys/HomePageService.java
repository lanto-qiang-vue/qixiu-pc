package com.lanto.shqixiu.shcheck.service.sys;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.snaker.engine.helper.StreamHelper;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.Json;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shcheck.model.po.TbInfoPublic;
import com.lanto.shqixiu.shcheck.model.po.TbNotice;
import com.lanto.shqixiu.shcheck.model.po.TbNoticeSee;
import com.lanto.shqixiu.shcheck.util.Constant;


@Service
public class HomePageService {
	
	@Resource
	private SwdbFactory service;
	
	public List getAList() throws SQLException{
		String sql = "SELECT A.CODE_DESC,A.CODE_ID,COUNT(*) CORP_COUNT FROM (SELECT CODE_ID,CODE_DESC FROM TB_BD_CODE WHERE TYPE=?) A LEFT JOIN TB_CORP_INFO B ON B.CORP_TYPE=A.CODE_ID " +
				"GROUP BY A.CODE_DESC,A.CODE_ID ORDER BY A.CODE_ID";
		return service.findAll(sql, "1014");
	}
	
	public Map getAObject(String userCode){
		String sql = "SELECT A.USER_CODE,A.USER_NAME,A.BLONG_AREA,B.CORP_NAME FROM TQ_SYS_USER A LEFT JOIN TB_CORP_INFO B ON A.CORP_ID=B.CORP_ID WHERE A.USER_CODE = ?";
		List<Map> list = service.findAll(sql, userCode);
		return list.get(0);
	}
	
	public List getCList(String code){
		String sql = "SELECT * FROM TQ_SYS_OPERATE_LOG WHERE OPERATOR_ID=? ORDER BY OPERATE_TIME DESC limit 0,6";
		return service.findAll(sql, code);
	}
	
	public byte[] updateAndGetContent(String id,String actor) throws IOException{
		updateSee(id,actor);
		InputStream input = null;
		String sql = "SELECT CONTENT FROM TB_NOTICE WHERE NOTICE_ID = ?";
		input = service.getFile(sql, "CONTENT", id);
		return StreamHelper.readBytes(input);
	}
	
	public byte[] getInfoContent(String id) throws IOException{
		InputStream input = null;
		String sql = "SELECT CONTENT FROM TB_INFO_PUBLIC WHERE INFO_ID = ?";
		input = service.getFile(sql, "CONTENT", id);
		return StreamHelper.readBytes(input);
	}
	
	public List getChartLine(){
		String sql = "SELECT A.AREA_NAME NAME,COUNT(T.CORP_ID) TOTAL_NUM FROM TB_CORP_INFO T LEFT JOIN TB_BD_AREA A ON T.CORP_AREA=A.AREA_CODE  WHERE STATUS='10221001'  GROUP BY A.AREA_NAME";
		return service.findAll(sql);
	}
	
	public Map getNoticeModel(String id) throws Exception{
		TbNotice no = new TbNotice();
		no.setNoticeId(Integer.valueOf(id));
		no = service.getModelByPo(no);
		Json json = new Json();
		return json.toMap(no);
	}
	
	public Map getInfoModel(String id) throws Exception{
		TbInfoPublic no = new TbInfoPublic();
		no.setInfoId(Integer.valueOf(id));
		no = service.getModelByPo(no);
		Json json = new Json();
		return json.toMap(no);
	}
	
	public void updateSee(String id,String actor){
		TbNoticeSee see = new TbNoticeSee();
		see.setNoticeId(Integer.valueOf(id));
		see.setActorId(actor);
		see = service.getModelByPo(see);
		if(see == null){
			TbNoticeSee view = new TbNoticeSee();
			view.setNoticeId(Integer.valueOf(id));
			view.setActorId(actor);
			view.setIsSee(Constant.IF_TYPE_YES);
			view.setSeeDate(new Date());
			service.savePojo(view, "ID");
		}
	}
	
	
	public List getUnReNotice(String corpId){
		String sql = "select a.NOTICE_ID,A.NOTICE_TITLE,a.IS_RESULT,a.SEND_BY,date_format(a.SEND_DATE,'%Y-%m-%d %H:%i:%s') SEND_DATE,a.DATA_FROM from v_notice a where a.ACTOR_ID in (?,?) and a.IS_RESULT = '10041001' and " +
				"not exists (SELECT 1 FROM TB_NOTICE_RESULT WHERE NOTICE_ID=A.NOTICE_ID AND RESULT_BY_CODE = ?) order by SEND_DATE DESC,NOTICE_ID desc";
		return service.findAll(sql, "all",corpId,corpId);
	}
	
	public List getGList(){
		String sql = "SELECT * FROM TB_INFO_PUBLIC WHERE STATUS=? ORDER BY CREATE_TIME DESC limit 0,15";
		return service.findAll(sql,"10011001");
	}
	
	public Integer getBusCount1(String corpId){
		String sql = "select count(*) from tb_daily_check_business where CHECK_TYPE=? and CORP_ID=?";
		return (Integer)service.findRtObject(sql, Integer.class, "10241002",corpId);
	}
	
	public Integer getBusCount2(String corpId){
		String sql = "select count(*) from tb_daily_check_business where CHECK_TYPE=? and CORP_ID=? and datediff(now(),BEFORE_DATE) > 0";
		return (Integer)service.findRtObject(sql, Integer.class, "10241002",corpId);
	}
	
	public Integer getProCount1(String corpId){
		String sql = "select count(*) from tb_daily_check_product where CHECK_TYPE=? and CORP_ID=?";
		return (Integer)service.findRtObject(sql, Integer.class, "10241002",corpId);
	}
	
	public Integer getProCount2(String corpId){
		String sql = "select count(*) from tb_daily_check_product where CHECK_TYPE=? and CORP_ID=? and datediff(now(),BEFORE_DATE) > 0";
		return (Integer)service.findRtObject(sql, Integer.class, "10241002",corpId);
	}
	public String getSecure(String corpId){
		String sql = " SELECT DATE_FORMAT(CHECK_DATE,'%m') as sMonth  FROM tb_daily_check_secure "+
		             " WHERE DATE_FORMAT(CHECK_DATE,'%Y')=DATE_FORMAT(NOW(),'%Y') "+
		             " AND corp_id=? AND check_status='已报送' ";
		
		List<Map>  aList= service.findAll(sql, corpId);
		String[] bArray = {"01","02","03", "04", "05","06","07", "08", "09","10","11", "12"};		
		String result="";
        int i=0;
        int j=0;
        for( i=0;i<bArray.length;i++){
        	boolean findFlag=false;
            for( j=0;j<aList.size();j++){
              String value  =String.valueOf(aList.get(j).get("SMONTH"));
              if (bArray[i].equals(value)) {
            	  findFlag=true; 
              } 
            }
            if (!findFlag) {
            	result = result+","+bArray[i];	                       
            }
        }
        if (result.length() >1 )
        	result = result.substring(1);
		return result;
	}
	public Integer getBase(String corpId){
		String sql = "select count(*) from tb_daily_check_information where  CORP_ID=? and STATUS='10091002'";
		return (Integer)service.findRtObject(sql, Integer.class,corpId);
	}	
}
