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

import com.lanto.shqixiu.shwgm.model.po.TpSysUser;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;
import com.lanto.shqixiu.shwgm.util.MD5;


@Service
public class TpSysUserService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("CREATE_TIME");
		page.setOrderByType("DESC");
		return swdb.getPageList(uSql, page, "TP_SYS_USER","USER_ID");
	}



	public String save(TpSysUser pojo,ManageLoginInfo info) throws Exception{
		TpSysUser temp = new TpSysUser();
		temp.setUserCode(pojo.getUserCode());
		temp = swdb.getModelByPo(temp);
		if(temp!=null){
			return "该用户已经存在！";
		}
		pojo.setCreateTime(new Date());
		Integer id = swdb.savePojoRtPkId(pojo, "USER_ID");
		String logcontent = "【%s】新增了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"专家用户",pojo.getUserName());
		logService.addOperatorLog(info,"专家用户管理", logcontent);
		return null;
	}

	public void update(TpSysUser pojo,ManageLoginInfo info) throws SQLException{
		swdb.updatePojo(pojo,"USER_ID");
		String logcontent = "【%s】修改了一条%s【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),"专家用户",pojo.getUserName());
		logService.addOperatorLog(info,"专家用户管理", logcontent);
	}
	

	public void delete(String ids,ManageLoginInfo info){
		String[] chids = ids.split(",");
		for(String chid : chids){
			TpSysUser pojo = new TpSysUser();
			pojo.setUserId(Integer.valueOf(chid));
			pojo = swdb.getModelByPo(pojo);
			String logcontent = "【%s】删除了一条%s【%s】  ";
			logcontent = String.format(logcontent, info.getUserName(),"专家用户",pojo.getUserName());
			logService.addOperatorLog(info,"专家用户管理", logcontent);
			TpSysUser po = new TpSysUser();
			po.setUserId(Integer.valueOf(chid));
			swdb.deleteByPo(po);
		}
	}
	
	
	public void updateResetPass(String ids){
		String[] uids = ids.split(",");
		for(String id : uids){
			TpSysUser user = new TpSysUser();
			user.setUserId(Integer.valueOf(id));
			user = swdb.getModelByPo(user);
			TpSysUser con = new TpSysUser();
			con.setUserId(Integer.valueOf(id));
			MD5 md5 = new MD5();
			String psswod = user.getUserCode() + "123456";
			String base64 =  new BASE64Encoder().encode(psswod.getBytes());
			con.setPassword(md5.getMD5ofStr(base64));
			swdb.updatePojo(con, "USER_ID");
		}
	}
	
}
