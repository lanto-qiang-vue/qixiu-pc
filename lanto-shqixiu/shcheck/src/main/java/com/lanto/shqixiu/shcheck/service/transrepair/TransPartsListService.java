package com.lanto.shqixiu.shcheck.service.transrepair;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.CheckLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shcheck.model.po.TbTransRepairPartsList;
import com.lanto.shqixiu.shcheck.service.sys.TjSysOperateLogService;


@Service
public class TransPartsListService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TjSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("PART_NAME");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "TB_TRANS_REPAIR_PARTS_LIST","LIST_ID");
	}



	public Integer save(TbTransRepairPartsList pojo,CheckLoginInfo info) throws Exception{
		Integer id = swdb.savePojoRtPkId(pojo, "LIST_ID");
		String logcontent = "【%s】新增了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"配件记录",pojo.getPartName());
		logService.addOperatorLog(info,"配件记录", logcontent);
		return id;
	}

	public void update(TbTransRepairPartsList pojo,CheckLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"LIST_ID");
		String logcontent = "【%s】修改了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"配件记录",pojo.getPartName());
		logService.addOperatorLog(info,"配件记录", logcontent);
	}
	

	public void delete(String ids,CheckLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbTransRepairPartsList pojo = new TbTransRepairPartsList();
			pojo.setListId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"配件记录",pojo.getPartName());
			logService.addOperatorLog(info,"配件记录", logcontent);
			TbTransRepairPartsList po = new TbTransRepairPartsList();
			po.setListId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
	
	
	
}
