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

import com.lanto.shqixiu.shwgc.model.po.TbRepairPartsList;
import com.lanto.shqixiu.shwgc.service.sys.TqSysOperateLogService;


@Service
public class PartsListService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TqSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("PART_NAME");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "TB_REPAIR_PARTS_LIST","LIST_ID");
	}



	public Integer save(TbRepairPartsList pojo,ClientLoginInfo info) throws Exception{
		Integer id = swdb.savePojoRtPkId(pojo, "LIST_ID");
		String logcontent = "【%s】新增了一条编号为【%s】的配件记录";
		logcontent = String.format(logcontent, info.getUserName(),id);
		logService.addOperatorLog(info,"配件记录", logcontent);
		return id;
	}

	public void update(TbRepairPartsList pojo,ClientLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"LIST_ID");
		String logcontent = "【%s】修改了一条编号为【%s】的配件记录  ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getListId());
		logService.addOperatorLog(info,"配件记录", logcontent);
	}
	

	public void delete(String ids,ClientLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbRepairPartsList pojo = new TbRepairPartsList();
			pojo.setListId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条编号为【%s】的配件记录";
			logcontent = String.format(logcontent, info.getUserName(),pojo.getListId());
			logService.addOperatorLog(info,"配件记录", logcontent);
			TbRepairPartsList po = new TbRepairPartsList();
			po.setListId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
	
	
	
}
