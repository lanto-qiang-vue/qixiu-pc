package com.lanto.shqixiu.shwgc.service.service;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ClientLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.po.TbOrderService;
import com.lanto.shqixiu.shwgc.service.sys.TqSysOperateLogService;


@Service
public class OrderServiceService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TqSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("SERVICE_TIME");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "TB_ORDER_SERVICE","SERVICE_ID");
	}



	public String save(TbOrderService pojo,ClientLoginInfo info) throws Exception{
		Integer id = swdb.savePojoRtPkId(pojo, "SERVICE_ID");
		String logcontent = "【%s】新增了一条%sID为【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"预约服务信息",pojo.getServiceId());
		logService.addOperatorLog(info,"预约服务信息", logcontent);
		return null;
	}

	public void update(TbOrderService pojo,ClientLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"SERVICE_ID");
		String logcontent = "【%s】修改了一条%sID为【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"预约服务信息",pojo.getServiceId());
		logService.addOperatorLog(info,"预约服务信息", logcontent);
	}
	

	public void delete(String ids,ClientLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbOrderService pojo = new TbOrderService();
			pojo.setServiceId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%sID为【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"预约服务信息",pojo.getServiceId());
			logService.addOperatorLog(info,"预约服务信息", logcontent);
			TbOrderService po = new TbOrderService();
			po.setServiceId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
	
	
	
}
