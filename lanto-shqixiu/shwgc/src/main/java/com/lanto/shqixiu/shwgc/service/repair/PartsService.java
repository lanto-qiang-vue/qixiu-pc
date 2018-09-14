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


import com.lanto.shqixiu.shwgc.model.po.TbRepairParts;
import com.lanto.shqixiu.shwgc.service.sys.TqSysOperateLogService;


@Service
public class PartsService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TqSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("PART_NAME");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "TB_REPAIR_PARTS","PART_ID");
	}



	public String save(TbRepairParts pojo,ClientLoginInfo info) throws Exception{
		Integer id = swdb.savePojoRtPkId(pojo, "PART_ID");
		String logcontent = "【%s】新增了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"配件信息",pojo.getPartName());
		logService.addOperatorLog(info,"配件信息", logcontent);
		return null;
	}

	public void update(TbRepairParts pojo,ClientLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"PART_ID");
		String logcontent = "【%s】修改了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"配件信息",pojo.getPartName());
		logService.addOperatorLog(info,"配件信息", logcontent);
	}
	

	public void delete(String ids,ClientLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbRepairParts pojo = new TbRepairParts();
			pojo.setPartId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"配件信息",pojo.getPartName());
			logService.addOperatorLog(info,"配件信息", logcontent);
			TbRepairParts po = new TbRepairParts();
			po.setPartId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
	
	
	
}
