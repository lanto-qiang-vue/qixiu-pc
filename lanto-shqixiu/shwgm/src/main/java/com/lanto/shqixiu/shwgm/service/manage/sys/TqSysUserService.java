package com.lanto.shqixiu.shwgm.service.manage.sys;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import sun.misc.BASE64Encoder;

import com.lanto.shqixiu.shwgm.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgm.model.po.TqSysUser;
import com.lanto.shqixiu.shwgm.util.Constant;
import com.lanto.shqixiu.shwgm.util.MD5;


@Service
public class TqSysUserService {

	//请选择合适的数据源，默认选client端数据源
	@Resource
	private SwdbFactory service;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("CORP_ID");
		return service.getPageList(uSql, page, "(SELECT A.*,B.ROLE_NAME,C.CORP_NUM,C.CORP_NAME FROM TQ_SYS_USER A LEFT JOIN TQ_SYS_ROLE B ON A.ROLE_ID=B.ROLE_ID LEFT JOIN " +
				"TB_CORP_INFO C ON A.CORP_ID=C.CORP_ID) T","USER_ID");
	}

	public Integer save(TqSysUser pojo) throws Exception{
		TqSysUser con = new TqSysUser();
		con.setUserCode(pojo.getUserCode());
		con = service.getModelByPo(con);
		if(con != null){
			throw new Exception("该用户帐号已经存在，请重新输入");
		}
		Integer id = service.savePojoRtPkId(pojo,"USER_ID");
		pojo.setUserId(id);
		return id;
	}
	
	public TbCorpInfo getCorpById(Integer corpId){
		TbCorpInfo con = new TbCorpInfo();
		con.setCorpId(corpId);
		return service.getModelByPo(con);
	}

	public void update(TqSysUser pojo){
		service.updatePojo(pojo,"USER_ID");
	}
	
	public boolean updatePassword(String userCode,String oldPassword,String newPassword){
		String userpwd = userCode+oldPassword;
		String base64 =  new BASE64Encoder().encode(userpwd.getBytes());
		MD5 md5 = new MD5();
		String jpql="select * from TQ_SYS_USER where USER_CODE=? and password=?";
		List<?> list = service.findAll(jpql, new Object[]{userCode,md5.getMD5ofStr(base64)});
		if (list == null || list.size() < 1){
			return false;
		}else{
			String newuserpwd = userCode+newPassword;
			String newbase64 =  new BASE64Encoder().encode(newuserpwd.getBytes());
			TqSysUser po = new TqSysUser();
			po.setPassword(md5.getMD5ofStr(newbase64));
			po.setUserCode(userCode);
			service.updatePojo(po,"USER_CODE");
			return true;
		}
	}
	
	public List getAllRole(String corp_id){
		return service.findAll("select * from TQ_SYS_ROLE WHERE CORP_ID IN (?,?) AND ROLE_STATUS=?",corp_id,"all_corp", Constant.STATUS_ENABLE);
	}

	public void delete(String ids){
		service.delete("delete from TQ_SYS_USER where USER_ID in (" + ids + ")");
	}
	
	public void updateResetPass(String ids){
		String[] uids = ids.split(",");
		for(String id : uids){
			TqSysUser user = new TqSysUser();
			user.setUserId(Integer.valueOf(id));
			user = service.getModelByPo(user);
			TqSysUser con = new TqSysUser();
			con.setUserId(Integer.valueOf(id));
			MD5 md5 = new MD5();
			String psswod = user.getUserCode() + "123456";
			String base64 =  new BASE64Encoder().encode(psswod.getBytes());
			con.setPassword(md5.getMD5ofStr(base64));
			service.updatePojo(con, "USER_ID");
		}
	}
	
	public void updateCreateUsers(){
		String sql = "SELECT * FROM TB_CORP_INFO WHERE CORP_ID NOT IN (SELECT CORP_ID FROM TQ_SYS_USER) AND BUSINESS_NUM IS NOT NULL";
		List<TbCorpInfo> list = service.findAll(TbCorpInfo.class, sql);
		for(TbCorpInfo info : list){
			TqSysUser con = new TqSysUser();
			con.setUserCode(info.getBusinessNum());
			con = service.getModelByPo(con);
			if(con == null){
				TqSysUser user = new TqSysUser();
				user.setUserCode(info.getBusinessNum());
				user.setCorpId(info.getCorpId());
				user.setUserName(info.getBusinessNum());
				user.setBlongArea(info.getCorpArea());
				user.setIsValid(10011001);
				user.setRoleId(1);
				user.setUserSex("10031001");
				user.setUserType("企业管理员");
				user.setPosition("企业管理员");
				user.setTelphone(info.getLinkTel());
				MD5 md5 = new MD5();
				String psswod = user.getUserCode() + "123456";
				String base64 =  new BASE64Encoder().encode(psswod.getBytes());
				user.setPassword(md5.getMD5ofStr(base64));
				service.savePojo(user, "USER_ID");
			}
		}
	}
	
	public TqSysUser getUserByCode(String code){
		TqSysUser user = new TqSysUser();
		user.setUserCode(code);
		user = service.getModelByPo(user);
		return user;
	}

}
