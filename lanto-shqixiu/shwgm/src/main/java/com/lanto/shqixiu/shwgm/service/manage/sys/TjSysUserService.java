package com.lanto.shqixiu.shwgm.service.manage.sys;

import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.service.ZwdbFactory;
import org.springframework.stereotype.Service;

import sun.misc.BASE64Encoder;

import com.lanto.shqixiu.shwgm.model.po.TbCorpDetectInfo;
import com.lanto.shqixiu.shwgm.model.po.TbTransCorpInfo;
import com.lanto.shqixiu.shwgm.model.po.TjSysUser;
import com.lanto.shqixiu.shwgm.model.po.TtSysUser;
import com.lanto.shqixiu.shwgm.util.Constant;
import com.lanto.shqixiu.shwgm.util.MD5;


@Service
public class TjSysUserService {

	@Resource
	private SwdbFactory swdb;
	
	@Resource
	private ZwdbFactory zwdb;
	
	@Resource
	private TmSysOperateLogService logService;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("CORP_ID");
		return swdb.getPageList(uSql, page, "(SELECT A.*,B.ROLE_NAME,C.STATION_NAME AS CORP_NAME FROM TJ_SYS_USER A LEFT JOIN TJ_SYS_ROLE B ON A.ROLE_ID=B.ROLE_ID LEFT JOIN " +
				"TB_CORP_DETECT_INFO C ON A.CORP_ID=C.STATION_ID) T","USER_ID");
	}

	public Integer save(TjSysUser pojo) throws Exception{
		TjSysUser con = new TjSysUser();
		con.setUserCode(pojo.getUserCode());
		con = swdb.getModelByPo(con);
		if(con != null){
			throw new Exception("该用户帐号已经存在，请重新输入");
		}
		Integer id = swdb.savePojoRtPkId(pojo,"USER_ID");
		pojo.setUserId(id);
		return id;
	}
	
	public TbCorpDetectInfo getCorpById(Integer corpId){
		TbCorpDetectInfo con = new TbCorpDetectInfo();
		con.setStationId(corpId);
		return swdb.getModelByPo(con);
	}

	public void update(TjSysUser pojo){
		swdb.updatePojo(pojo,"USER_ID");
	}
	
	public boolean updatePassword(String userCode,String oldPassword,String newPassword){
		String userpwd = userCode+oldPassword;
		String base64 =  new BASE64Encoder().encode(userpwd.getBytes());
		MD5 md5 = new MD5();
		String jpql="select * from TJ_SYS_USER where USER_CODE=? and password=?";
		List<?> list = swdb.findAll(jpql, new Object[]{userCode,md5.getMD5ofStr(base64)});
		if (list == null || list.size() < 1){
			return false;
		}else{
			String newuserpwd = userCode+newPassword;
			String newbase64 =  new BASE64Encoder().encode(newuserpwd.getBytes());
			TjSysUser po = new TjSysUser();
			po.setPassword(md5.getMD5ofStr(newbase64));
			po.setUserCode(userCode);
			swdb.updatePojo(po,"USER_CODE");
			return true;
		}
	}
	
	public List getAllRole(String corp_id){
		return swdb.findAll("select * from TJ_SYS_ROLE WHERE CORP_ID IN (?,?) AND ROLE_STATUS=?",corp_id,"all_corp", Constant.STATUS_ENABLE);
	}

	public void delete(String ids){
		swdb.delete("delete from TJ_SYS_USER where USER_ID in (" + ids + ")");
	}
	
	public void updateResetPass(String ids){
		String[] uids = ids.split(",");
		for(String id : uids){
			TjSysUser user = new TjSysUser();
			user.setUserId(Integer.valueOf(id));
			user = swdb.getModelByPo(user);
			TjSysUser con = new TjSysUser();
			con.setUserId(Integer.valueOf(id));
			MD5 md5 = new MD5();
			String psswod = user.getUserCode() + "123456";
			String base64 =  new BASE64Encoder().encode(psswod.getBytes());
			con.setPassword(md5.getMD5ofStr(base64));
			swdb.updatePojo(con, "USER_ID");
		}
	}
	
	public void updateCreateUsers(){
		String sql = "SELECT * FROM TB_TRANS_CORP_INFO WHERE CORP_ID NOT IN (SELECT CORP_ID FROM TT_SYS_USER) AND BUSINESS_NUM IS NOT NULL";
		List<TbTransCorpInfo> list = swdb.findAll(TbTransCorpInfo.class, sql);
		for(TbTransCorpInfo info : list){
			TtSysUser con = new TtSysUser();
			con.setUserCode(info.getBusinessNum());
			con = swdb.getModelByPo(con);
			if(con == null){
				TtSysUser user = new TtSysUser();
				user.setUserCode(info.getBusinessNum());
				user.setCorpId(info.getCorpId());
				user.setUserName(info.getBusinessNum());
				user.setBlongArea(info.getCorpArea());
				user.setIsValid(10011001);
				user.setRoleId(1);
				user.setUserSex("10031001");
				user.setUserType("企业管理员");
				user.setPosition("企业管理员");
				user.setTelphone(info.getCoprTel());
				MD5 md5 = new MD5();
				String psswod = user.getUserCode() + "123456";
				String base64 =  new BASE64Encoder().encode(psswod.getBytes());
				user.setPassword(md5.getMD5ofStr(base64));
				swdb.savePojo(user, "USER_ID");
			}
		}
	}
	
	public TjSysUser getUserByCode(String code){
		TjSysUser user = new TjSysUser();
		user.setUserCode(code);
		user = swdb.getModelByPo(user);
		return user;
	}

}
