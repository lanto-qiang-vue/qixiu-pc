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

import com.lanto.shqixiu.shwgm.model.po.TbBanners;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;


@Service
public class BannerManageService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("SORT_NUMBER DESC,BANNER_ID");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "tb_banners","BANNER_ID");
	}



	public void save(TbBanners pojo,ManageLoginInfo info) throws Exception{
		pojo.setCreateTime(new Date());
		pojo.setStatus("10011001");
		pojo.setLinkType("_blank");
		//pojo.setLinkUrl("javascript:void(0);");
		pojo.setSortNumber(1);
		Integer id = swdb.savePojoRtPkId(pojo, "BANNER_ID");
		pojo.setBannerId(id);
		String logcontent = "【%s】新增了一条编号为【%s】 的Banner信息 ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getBannerId());
		logService.addOperatorLog(info,"Banner管理", logcontent);
	}

	public void update(TbBanners pojo,ManageLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"BANNER_ID");
		String logcontent = "【%s】修改了一条编号为【%s】 的Banner信息  ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getBannerId());
		logService.addOperatorLog(info,"Banner管理", logcontent);
	}
	

	public void delete(String ids,ManageLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			String logcontent = "【%s】删除了一条编号为【%s】的Banner信息  ";
			logcontent = String.format(logcontent, info.getUserName(),"Banner",chid);
			logService.addOperatorLog(info,"Banner管理", logcontent);
			TbBanners po = new TbBanners();
			po.setBannerId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
}
