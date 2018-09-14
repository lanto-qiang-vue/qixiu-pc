package com.lanto.shqixiu.shwgm.service.manage.sys;

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

import sun.misc.BASE64Encoder;

import com.lanto.shqixiu.shwgm.common.WebCache;
import com.lanto.shqixiu.shwgm.model.po.TbComplaint;
import com.lanto.shqixiu.shwgm.model.po.TbInfoPublic;
import com.lanto.shqixiu.shwgm.model.po.TbQuestions;
import com.lanto.shqixiu.shwgm.model.po.TgSysUser;
import com.lanto.shqixiu.shwgm.model.po.TmSysUser;
import com.lanto.shqixiu.shwgm.model.po.TpSysUser;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;
import com.lanto.shqixiu.shwgm.util.MD5;


@Service
public class TgSysUserService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("CREATE_TIME");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "TG_SYS_USER","USER_ID");
	}



	public String save(TgSysUser pojo,ManageLoginInfo info) throws Exception{
		TgSysUser temp = new TgSysUser();
		temp.setTelphone(pojo.getTelphone());
		temp = swdb.getModelByPo(temp);
		if(temp!=null){
			return "该用户已经存在！";
		}
		pojo.setCreateTime(new Date());
		Integer id = swdb.savePojoRtPkId(pojo, "USER_ID");
		String logcontent = "【%s】新增了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"个人用户",pojo.getUserName());
		logService.addOperatorLog(info,"个人用户管理", logcontent);
		return null;
	}

	public void update(TgSysUser pojo,ManageLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"USER_ID");
		String logcontent = "【%s】修改了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"个人用户",pojo.getUserName());
		logService.addOperatorLog(info,"个人用户管理", logcontent);
	}
	

	public void delete(String ids,ManageLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TgSysUser pojo = new TgSysUser();
			pojo.setUserId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"个人用户",pojo.getUserName());
			logService.addOperatorLog(info,"个人用户管理", logcontent);
			TgSysUser po = new TgSysUser();
			po.setUserId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
	
	
	public void updateResetPass(String ids){
		String[] uids = ids.split(",");
		for(String id : uids){
			TgSysUser user = new TgSysUser();
			user.setUserId(Integer.valueOf(id));
			user = swdb.getModelByPo(user);
			TgSysUser con = new TgSysUser();
			con.setUserId(Integer.valueOf(id));
			MD5 md5 = new MD5();
			String psswod = user.getTelphone() + "123456";
			String base64 =  new BASE64Encoder().encode(psswod.getBytes());
			con.setPassword(md5.getMD5ofStr(base64));
			swdb.updatePojo(con, "USER_ID");
		}
	}
	
}
