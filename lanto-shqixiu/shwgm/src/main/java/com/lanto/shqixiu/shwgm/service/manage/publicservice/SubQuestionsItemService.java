package com.lanto.shqixiu.shwgm.service.manage.publicservice;

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
import com.lanto.shqixiu.shwgm.model.po.TbComplaint;
import com.lanto.shqixiu.shwgm.model.po.TbInfoPublic;
import com.lanto.shqixiu.shwgm.model.po.TbQuestions;
import com.lanto.shqixiu.shwgm.model.po.TbSubQuestions;
import com.lanto.shqixiu.shwgm.model.po.TbSubQuestionsItem;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;


@Service
public class SubQuestionsItemService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("CREATE_TIME");
		//page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "TB_SUB_QUESTIONS_ITEM","ITEM_ID");
	}



	public void save(TbSubQuestionsItem pojo,ManageLoginInfo info) throws Exception{
		pojo.setCreateTime(new Date());
		Integer id = swdb.savePojoRtPkId(pojo, "ITEM_ID");
		String logcontent = "【%s】新增了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),WebCache.getDictDescById(pojo.getCreator()),pojo.getItemName());
		logService.addOperatorLog(info,"调查问卷问题选项", logcontent);
	}

	public void update(TbSubQuestionsItem pojo,ManageLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"ITEM_ID");
		String logcontent = "【%s】修改了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),WebCache.getDictDescById(pojo.getCreator()),pojo.getItemName());
		logService.addOperatorLog(info,"调查问卷问题选项", logcontent);
	}
	

	public void delete(String ids,ManageLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbSubQuestionsItem pojo = new TbSubQuestionsItem();
			pojo.setItemId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),WebCache.getDictDescById(pojo.getCreator()),pojo.getItemName());
			logService.addOperatorLog(info,"调查问卷问题选项", logcontent);
			TbSubQuestionsItem po = new TbSubQuestionsItem();
			po.setItemId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
}
