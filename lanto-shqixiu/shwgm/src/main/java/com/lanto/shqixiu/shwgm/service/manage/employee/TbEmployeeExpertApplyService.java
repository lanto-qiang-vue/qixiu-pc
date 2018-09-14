package com.lanto.shqixiu.shwgm.service.manage.employee;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.common.WebCache;
import com.lanto.shqixiu.shwgm.model.po.TbEmployeeExpert;
import com.lanto.shqixiu.shwgm.model.po.TbEmployeeExpertApply;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;


@Service
public class TbEmployeeExpertApplyService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("APPLY_ID");
		return swdb.getPageList(uSql, page, "TB_EMPLOYEE_EXPERT_APPLY","APPLY_ID");
	}

	public List doExport(List<SqlUnit> uSql){
		return swdb.getList("select * from TB_EMPLOYEE_EXPERT_APPLY where 1=1 ", uSql);
	}
	
	public Integer save(TbEmployeeExpertApply pojo) throws Exception{
		pojo.setCreateDate(new Date());
		Integer id = swdb.savePojoRtPkId(pojo,"APPLY_ID");
		pojo.setApplyId(id);
		return id;
	}
	

	public void update(TbEmployeeExpertApply pojo) throws Exception{
		swdb.updatePojo(pojo,"APPLY_ID");
	}
	
	public void updateCheck(TbEmployeeExpertApply po,ManageLoginInfo info) throws Exception{
		TbEmployeeExpertApply con = new TbEmployeeExpertApply();
		con.setApplyId(po.getApplyId());
		con = swdb.getModelByPo(con);
		if(con == null){
			throw new Exception("专家申请资料不存在!");
		}
		
		if("10321003".equals(po.getStatus())){
			//审核通过将专家申请资料入库
			TbEmployeeExpert expert = new TbEmployeeExpert();
			BeanUtils.copyProperties(con, expert);
			expert.setCreateDate(new Date());
			swdb.savePojoRtPkId(expert, "EXPERT_ID");
		}
		po.setCheckDate(new Date());
		po.setCheckPerson(info.getUserName());
		swdb.updatePojo(po, "APPLY_ID");
		String logcontent = "用户【%s】审核了专家申请资料【 %s】 审核结果为：【%s】";
		logcontent = String.format(logcontent, info.getUserName(),con.getName(),WebCache.getDictDescById(po.getStatus()));
		logService.addOperatorLog(info, "专家申请审核", logcontent);
	}

	
	
}
