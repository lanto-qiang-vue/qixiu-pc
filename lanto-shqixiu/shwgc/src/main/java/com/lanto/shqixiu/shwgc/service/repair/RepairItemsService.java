package com.lanto.shqixiu.shwgc.service.repair;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ClientLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.po.TbRepairItems;
import com.lanto.shqixiu.shwgc.service.sys.TqSysOperateLogService;


@Service
public class RepairItemsService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TqSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("ITEM_NAME");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "TB_REPAIR_ITEMS","ITEM_ID");
	}



	public String save(TbRepairItems pojo,ClientLoginInfo info) throws Exception{
		Integer id = swdb.savePojoRtPkId(pojo, "ITEM_ID");
		String logcontent = "【%s】新增了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"维修项目信息",pojo.getItemName());
		logService.addOperatorLog(info,"维修项目信息", logcontent);
		return null;
	}

	public void update(TbRepairItems pojo,ClientLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"ITEM_ID");
		String logcontent = "【%s】修改了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"维修项目信息",pojo.getItemName());
		logService.addOperatorLog(info,"维修项目信息", logcontent);
	}
	

	public void delete(String ids,ClientLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbRepairItems pojo = new TbRepairItems();
			pojo.setItemId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"维修项目信息",pojo.getItemName());
			logService.addOperatorLog(info,"维修项目信息", logcontent);
			TbRepairItems po = new TbRepairItems();
			po.setItemId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
	
	
	
}
