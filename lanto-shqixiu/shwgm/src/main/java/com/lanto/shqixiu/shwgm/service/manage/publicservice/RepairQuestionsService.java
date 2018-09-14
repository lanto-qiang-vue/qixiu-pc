package com.lanto.shqixiu.shwgm.service.manage.publicservice;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.common.WebCache;
import com.lanto.shqixiu.shwgm.model.po.TbComplaint;
import com.lanto.shqixiu.shwgm.model.po.TbInfoPublic;
import com.lanto.shqixiu.shwgm.model.po.TbQuestions;
import com.lanto.shqixiu.shwgm.model.po.TbRepairQuestions;
import com.lanto.shqixiu.shwgm.model.po.VRepairQuestions;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;
import com.lanto.shqixiu.shwgm.util.HtmlToText;


@Service
public class RepairQuestionsService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("CREATE_TIME");
		page.setOrderByType("DESC");
		List<Map> list= swdb.getPageList(uSql, page, "TB_REPAIR_QUESTIONS","QUES_ID");
		for(Map info : list){
			//String str = HtmlToText.html2Text(CommonUtils.checkNull(info.get("CONTENT")));
			String str = HtmlToText.html2Text(CommonUtils.checkNull(info.get("CONTENT")));
			/*if(str.length() > 55){
				str = str.substring(0, 55) + "...";
			}*/
			info.put("CONTENT", str);
		}
		return list;
	}



	public void save(TbRepairQuestions pojo,ManageLoginInfo info) throws Exception{
		pojo.setCreateTime(new Date());
		Integer id = swdb.savePojoRtPkId(pojo, "QUES_ID");
		String logcontent = "【%s】新增了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),WebCache.getDictDescById(pojo.getType()),pojo.getUserId());
		logService.addOperatorLog(info,"专家问答信息", logcontent);
	}

	public void update(TbRepairQuestions pojo,ManageLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"QUES_ID");
		String logcontent = "【%s】修改了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),WebCache.getDictDescById(pojo.getType()),pojo.getUserId());
		logService.addOperatorLog(info,"专家问答信息", logcontent);
	}
	

	public void delete(String ids,ManageLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbRepairQuestions pojo = new TbRepairQuestions();
			pojo.setQuesId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条编号为【%s】的专家问答信息  ";
			logcontent = String.format(logcontent, info.getUserName(),pojo.getQuesId());
			logService.addOperatorLog(info,"专家问答信息", logcontent);
			TbRepairQuestions po = new TbRepairQuestions();
			po.setQuesId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
}
