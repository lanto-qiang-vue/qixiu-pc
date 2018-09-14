package com.lanto.shqixiu.shwgm.service.manage.sys;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.bean.TcCheckFunc;
import com.lanto.shqixiu.shwgm.model.po.TmSysRole;
import com.lanto.shqixiu.shwgm.model.po.TmSysRoleFunc;


@Service
public class TbSysRoleService {
	

	@Autowired
	private SwdbFactory service;
	@Resource
	private TmSysOperateLogService logService;
	
	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("ROLE_ID");
		return service.getPageList(uSql, page, "TM_SYS_ROLE","ROLE_ID");
	}

	public Integer save(TmSysRole pojo,List<TcCheckFunc> power,ManageLoginInfo info){
		Integer id = service.savePojoRtPkId(pojo,"ROLE_ID");
		pojo.setRoleId(id);
		insertPower(power,pojo.getRoleId());
		String logcontent = "用户【%s】新增了管理端角色 【%s】 ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getRoleName());
		logService.addOperatorLog(info, "角色权限管理", logcontent);
		return id;
	}

	public void update(TmSysRole pojo,List<TcCheckFunc> power,ManageLoginInfo info){
		service.updatePojo(pojo,"ROLE_ID");
		insertPower(power,pojo.getRoleId());
		String logcontent = "用户【%s】修改了管理端角色 【%s】权限 ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getRoleName());
		logService.addOperatorLog(info, "角色权限管理", logcontent);
	}
	
	public void insertPower(List<TcCheckFunc> power ,Integer roleId){
		service.delete("delete from TM_SYS_ROLE_FUNC where ROLE_ID = ?",roleId);
		if(power != null && power.size() > 0){
			for(TcCheckFunc po : power){
				TmSysRoleFunc rf = new TmSysRoleFunc();
				rf.setRoleId(roleId);
				rf.setFuncId(po.getFuncId().intValue());
				rf.setFuncPower(po.getFuncPower());
				service.savePojo(rf, "ID");
			}
		}		
	}
	
	public List<TcCheckFunc> getMenuList(String roleId){
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT T.*,T.FUNC_IMAGE icon,R.FUNC_POWER, CASE WHEN R.FUNC_ID = T.FUNC_ID THEN 'check' ELSE 'no_check' END IS_CHECK\n" );
		sql.append("  FROM TM_FUNC T\n" );
		sql.append("  LEFT JOIN (SELECT * FROM TM_SYS_ROLE_FUNC WHERE ROLE_ID = ?) R ON T.FUNC_ID = R.FUNC_ID\n" );
		sql.append(" ORDER BY T.SORT_ORDER");
		return service.findAll(TcCheckFunc.class,sql.toString(), roleId);
	}

	public void delete(String ids){
		service.delete("delete from TM_SYS_ROLE where ROLE_ID in (" + ids + ")");
		service.delete("delete from TM_SYS_ROLE_FUNC where ROLE_ID in (" + ids + ")");
	}
}
