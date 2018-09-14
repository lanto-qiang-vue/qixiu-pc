package com.lanto.shqixiu.shwgm.service.manage.corp;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ClientLoginInfo;
import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.po.TbRepairQuato;
import com.lanto.shqixiu.shwgm.model.po.TbTransQuato;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;




@Service
public class TbTransCorpQuatoService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("CREATE_TIME");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "TB_TRANS_QUATO","ID");
	}



	public String save(TbTransQuato pojo,ManageLoginInfo info) throws Exception{
		Integer id = swdb.savePojoRtPkId(pojo, "ID");
		String logcontent = "【%s】手动添加了一条%s【企业编号：%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"企业配额信息",pojo.getCorpId());
		logService.addOperatorLog(info,"企业配额信息", logcontent);
		return null;
	}

	public void update(TbTransQuato pojo,ManageLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"PART_ID");
		String logcontent = "【%s】手动修改了一条%s【企业编号：%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"企业配额信息",pojo.getCorpId());
		logService.addOperatorLog(info,"企业配额信息", logcontent);
	}
	

	public void delete(String ids,ManageLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TbTransQuato pojo = new TbTransQuato();
			pojo.setId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【企业编号：%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"企业配额信息",pojo.getCorpId());
			logService.addOperatorLog(info,"企业配额信息", logcontent);
			TbTransQuato po = new TbTransQuato();
			po.setId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
	
	
	
}
