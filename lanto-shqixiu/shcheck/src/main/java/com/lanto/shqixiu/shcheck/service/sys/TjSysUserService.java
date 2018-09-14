package com.lanto.shqixiu.shcheck.service.sys;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.CheckLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import sun.misc.BASE64Encoder;

import com.lanto.shqixiu.shcheck.model.po.TjSysUser;
import com.lanto.shqixiu.shcheck.util.Constant;
import com.lanto.shqixiu.shcheck.util.MD5;


@Service
public class TjSysUserService {

	//请选择合适的数据源，默认选client端数据源
	@Resource
	private SwdbFactory service;
	@Resource
	private TjSysOperateLogService logService;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("USER_ID");
		return service.getPageList(uSql, page, "(SELECT A.*,B.ROLE_NAME FROM TJ_SYS_USER A LEFT JOIN TJ_SYS_ROLE B ON A.ROLE_ID=B.ROLE_ID) T","USER_ID");
	}

	public Integer save(TjSysUser pojo,CheckLoginInfo info) throws Exception{
		TjSysUser con = new TjSysUser();
		con.setUserCode(pojo.getUserCode());
		con = service.getModelByPo(con);
		if(con != null){
			throw new Exception("该用户帐号已经存在，请重新输入");
		}
		Integer id = service.savePojoRtPkId(pojo,"USER_ID");
		pojo.setUserId(id);
		String logcontent = "用户【%s】新增了一位企业端用户 【%s】 ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getUserName());
		logService.addOperatorLog(info, "用户管理", logcontent);
		return id;
	}

	public void update(TjSysUser pojo,CheckLoginInfo info){
		service.updatePojo(pojo,"USER_ID");
		String logcontent = "用户【%s】修改了一位企业端用户 【%s】的信息 ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getUserName());
		logService.addOperatorLog(info,"用户管理", logcontent);
	}
	
	public boolean updatePassword(String userCode,String oldPassword,String newPassword){
		String userpwd = userCode+oldPassword;
		String base64 =  new BASE64Encoder().encode(userpwd.getBytes());
		MD5 md5 = new MD5();
		String jpql="select * from TJ_SYS_USER where USER_CODE=? and password=?";
		List<?> list = service.findAll(jpql, new Object[]{userCode,md5.getMD5ofStr(base64)});
		if (list == null || list.size() < 1){
			return false;
		}else{
			String newuserpwd = userCode+newPassword;
			String newbase64 =  new BASE64Encoder().encode(newuserpwd.getBytes());
			TjSysUser po = new TjSysUser();
			po.setPassword(md5.getMD5ofStr(newbase64));
			po.setUserCode(userCode);
			service.updatePojo(po,"USER_CODE");
			return true;
		}
	}
	
	public List getAllRole(String corp_id){
		return service.findAll("select * from TJ_SYS_ROLE WHERE CORP_ID in (?,?) AND ROLE_STATUS=?",corp_id,"all_corp", Constant.STATUS_ENABLE);
	}

	public void delete(String ids){
		service.delete("delete from TJ_SYS_USER where USER_ID in (" + ids + ")");
	}
	
	public void updateResetPass(String ids){
		String[] uids = ids.split(",");
		for(String id : uids){
			TjSysUser user = new TjSysUser();
			user.setUserId(Integer.valueOf(id));
			user = service.getModelByPo(user);
			TjSysUser con = new TjSysUser();
			con.setUserId(Integer.valueOf(id));
			MD5 md5 = new MD5();
			String psswod = user.getUserCode() + "123456";
			String base64 =  new BASE64Encoder().encode(psswod.getBytes());
			con.setPassword(md5.getMD5ofStr(base64));
			service.updatePojo(con, "USER_ID");
		}
	}
	
	public TjSysUser getUserByCode(String code){
		TjSysUser user = new TjSysUser();
		user.setUserCode(code);
		user = service.getModelByPo(user);
		return user;
	}

}
