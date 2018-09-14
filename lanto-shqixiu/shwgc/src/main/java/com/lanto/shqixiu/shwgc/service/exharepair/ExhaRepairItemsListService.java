package com.lanto.shqixiu.shwgc.service.exharepair;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ClientLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.po.TbExhaustRepairItemsList;
import com.lanto.shqixiu.shwgc.service.sys.TqSysOperateLogService;


@Service
public class ExhaRepairItemsListService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TqSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("CREATE_TIME");
		page.setOrderByType("ASC");
		return swdb.getPageList(uSql, page, "TB_EXHAUST_REPAIR_ITEMS_LIST","LIST_ID");
	}



	public Integer save(TbExhaustRepairItemsList pojo,ClientLoginInfo info) throws Exception{
		Integer id = swdb.savePojoRtPkId(pojo, "LIST_ID");
		String logcontent = "【%s】新增了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"维修项目",pojo.getItemName());
		logService.addOperatorLog(info,"维修项目", logcontent);
		return id;
	}

	public void update(TbExhaustRepairItemsList pojo,ClientLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"LIST_ID");
		String logcontent = "【%s】修改了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"维修项目",pojo.getItemName());
		logService.addOperatorLog(info,"维修项目", logcontent);
	}
	

	public void delete(String ids,ClientLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbExhaustRepairItemsList pojo = new TbExhaustRepairItemsList();
			pojo.setListId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"维修项目",pojo.getItemName());
			logService.addOperatorLog(info,"维修项目", logcontent);
			TbExhaustRepairItemsList po = new TbExhaustRepairItemsList();
			po.setListId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
	
	
	
}
