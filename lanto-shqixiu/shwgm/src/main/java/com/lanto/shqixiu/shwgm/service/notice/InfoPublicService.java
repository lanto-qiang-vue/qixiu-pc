package com.lanto.shqixiu.shwgm.service.notice;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.common.WebCache;
import com.lanto.shqixiu.shwgm.model.po.TbInfoPublic;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;
import com.lanto.shqixiu.shwgm.util.JpushClientUtil;


@Service
public class InfoPublicService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("CREATE_TIME");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "TB_INFO_PUBLIC","INFO_ID");
	}



	public void save(TbInfoPublic pojo,ManageLoginInfo info) throws Exception{
		pojo.setCreateTime(new Date());
		Integer id = swdb.savePojoRtPkId(pojo, "INFO_ID");
		String logcontent = "【%s】新增了一条行业管理信息【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getTitle());
		logService.addOperatorLog(info,"行业管理信息发布", logcontent);
	}

	public void update(TbInfoPublic pojo,ManageLoginInfo info) throws SQLException{
		pojo.setUpdateTime(new Date());
		swdb.updatePojo(pojo,"INFO_ID");
		String logcontent = "【%s】修改了一条行业管理信息【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getTitle());
		logService.addOperatorLog(info,"行业管理信息发布", logcontent);
	}
	
	public void publish(TbInfoPublic pojo,ManageLoginInfo info) throws SQLException{
		Integer id = swdb.updatePojo(pojo, "INFO_ID");
		String logcontent = "【%s】发布了一条行业管理信息【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getTitle());
		logService.addOperatorLog(info,"公共信息发布", logcontent);
		if("10311001".equals(pojo.getPublishStatus())){
			JpushClientUtil.sendToAllAndroid(WebCache.getDictDescById(pojo.getInfoType()), pojo.getTitle(),pojo.getTitle(), pojo.getInfoId().toString());
		}
	}
	

	public void delete(String ids,ManageLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbInfoPublic pojo = new TbInfoPublic();
			pojo.setInfoId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条行业管理信息【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),pojo.getTitle());
			logService.addOperatorLog(info,"行业管理信息发布", logcontent);
			TbInfoPublic po = new TbInfoPublic();
			po.setInfoId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
}
