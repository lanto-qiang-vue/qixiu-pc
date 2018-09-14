package com.lanto.shqixiu.shwgm.service.manage.sys;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import sun.misc.BASE64Encoder;

import com.lanto.shqixiu.shwgm.model.po.TmSysUser;
import com.lanto.shqixiu.shwgm.util.Constant;
import com.lanto.shqixiu.shwgm.util.MD5;


@Service
public class TmSysUserService {

	@Resource
	private SwdbFactory service;
	@Resource
	private TmSysOperateLogService logService;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("USER_ID");
		return service.getPageList(uSql, page, "(SELECT A.*,B.ROLE_NAME FROM TM_SYS_USER A LEFT JOIN TM_SYS_ROLE B ON A.ROLE_ID=B.ROLE_ID) T","USER_ID");
	}
	
	public List getSelList(List<SqlUnit> uSql) throws SQLException{
		String sql = "select t.*,a.AREA_NAME from TM_SYS_USER t left join TB_BD_AREA a on t.BLONG_AREA=a.AREA_CODE where 1=1";
		return service.getList(sql, uSql);
	}
	public List getSelList_ys(List<SqlUnit> uSql) throws SQLException{
		String sql = "select t.*,a.AREA_NAME from tt_sys_user t left join TB_BD_AREA a on t.BLONG_AREA=a.AREA_CODE where 1=1";
		return service.getList(sql, uSql);
	}
	public Integer save(TmSysUser pojo ,ManageLoginInfo info) throws Exception{
		TmSysUser con = new TmSysUser();
		con.setUserCode(pojo.getUserCode());
		con = service.getModelByPo(con);
		if(con != null){
			throw new Exception("该用户帐号已经存在，请重新输入");
		}
		Integer id = service.savePojoRtPkId(pojo,"USER_ID");
		pojo.setUserId(id);
		String logcontent = "用户【%s】新增了一位管理端用户 【%s】 ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getUserName());
		logService.addOperatorLog(info, "用户管理", logcontent);
		return id;
	}
	
	public TmSysUser getUserByCode(String code){
		TmSysUser user = new TmSysUser();
		user.setUserCode(code);
		user = service.getModelByPo(user);
		return user;
	}

	public void update(TmSysUser pojo,ManageLoginInfo info){
		service.updatePojo(pojo,"USER_ID");
		String logcontent = "用户【%s】修改了一位管理端用户 【%s】的信息 ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getUserName());
		logService.addOperatorLog(info,"用户管理", logcontent);
	}
	
	public boolean updatePassword(String userCode,String oldPassword,String newPassword){
		String userpwd = userCode+oldPassword;
		String base64 =  new BASE64Encoder().encode(userpwd.getBytes());
		MD5 md5 = new MD5();
		String jpql="select * from TM_SYS_USER where USER_CODE=? and password=?";
		List<?> list = service.findAll(jpql, new Object[]{userCode,md5.getMD5ofStr(base64)});
		if (list == null || list.size() < 1){
			return false;
		}else{
			String newuserpwd = userCode+newPassword;
			String newbase64 =  new BASE64Encoder().encode(newuserpwd.getBytes());
			TmSysUser po = new TmSysUser();
			po.setPassword(md5.getMD5ofStr(newbase64));
			po.setUserCode(userCode);
			service.updatePojo(po,"USER_CODE");
			return true;
		}
	}

	public void delete(String ids){
		service.delete("delete from TM_SYS_USER where USER_ID in (" + ids + ")");
	}
	
	public void updateResetPass(String ids){
		String[] uids = ids.split(",");
		for(String id : uids){
			TmSysUser user = new TmSysUser();
			user.setUserId(Integer.valueOf(id));
			user = service.getModelByPo(user);
			TmSysUser con = new TmSysUser();
			con.setUserId(Integer.valueOf(id));
			MD5 md5 = new MD5();
			String psswod = user.getUserCode() + "123456";
			String base64 =  new BASE64Encoder().encode(psswod.getBytes());
			con.setPassword(md5.getMD5ofStr(base64));
			service.updatePojo(con, "USER_ID");
		}
	}
	
	public List getAllRole(){
		return service.findAll("select * from TM_SYS_ROLE WHERE ROLE_STATUS=?", Constant.STATUS_ENABLE);
	}
}
