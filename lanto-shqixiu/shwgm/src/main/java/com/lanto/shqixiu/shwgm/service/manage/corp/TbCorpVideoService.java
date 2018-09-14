package com.lanto.shqixiu.shwgm.service.manage.corp;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ClientLoginInfo;
import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.lanto.shqixiu.shwgm.model.po.TbCorpVideo;
import com.lanto.shqixiu.shwgm.model.po.TbRepairQuato;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;
import com.lanto.shqixiu.shwgm.util.HttpRequest;




@Service
public class TbCorpVideoService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("VIDEO_NUM");
		page.setOrderByType("ASC");
		return swdb.getPageList(uSql, page, "(SELECT A.*,B.CORP_NAME FROM TB_CORP_VIDEO A LEFT JOIN TB_CORP_INFO B ON A.CORP_ID=B.CORP_ID) T","ID");
	}



	public String save(TbCorpVideo pojo,ManageLoginInfo info) throws Exception{
		Integer id = swdb.savePojoRtPkId(pojo, "ID");
		String logcontent = "【%s】手动添加了一条%s【企业编号：%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"视频通道信息",pojo.getCorpId());
		logService.addOperatorLog(info,"视频通道信息", logcontent);
		return null;
	}

	public void update(TbCorpVideo pojo,ManageLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"ID");
		String logcontent = "【%s】手动修改了一条%s【企业编号：%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"视频通道信息",pojo.getCorpId());
		logService.addOperatorLog(info,"视频通道信息", logcontent);
	}
	

	public void delete(String ids,ManageLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbCorpVideo pojo = new TbCorpVideo();
			pojo.setId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【企业编号：%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"视频通道信息",pojo.getCorpId());
			logService.addOperatorLog(info,"视频通道信息", logcontent);
			TbCorpVideo po = new TbCorpVideo();
			po.setId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
	
	public Integer getDeviceStatus(String deviceSerial){
		Integer status=-1;
		String key="0e130213d544488bbd28a4076f0b5a0d";
		String param="appKey="+key+"&appSecret=db600011e611d67c420acc3b3612588e";
		String ret=HttpRequest.sendPost("https://open.ys7.com/api/lapp/token/get",param);
		JSONObject object = JSON.parseObject(ret);
		String token=object.getJSONObject("data").get("accessToken").toString();
		param="accessToken="+token+"&deviceSerial="+deviceSerial;
		ret=HttpRequest.sendPost("https://open.ys7.com/api/lapp/device/info",param);
		JSONObject info = JSON.parseObject(ret);
		status=Integer.parseInt(info.getJSONObject("data").get("status").toString());
		return status;
	}
	
	
	
}
