package com.lanto.shqixiu.shwgm.service.notice;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.List;

import javax.annotation.Resource;

import org.snaker.engine.helper.StreamHelper;
import org.softbase.model.ManageLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgm.model.po.TbNotice;
import com.lanto.shqixiu.shwgm.model.po.TbNoticeActor;
import com.lanto.shqixiu.shwgm.service.manage.sys.TmSysOperateLogService;
import com.lanto.shqixiu.shwgm.util.Constant;


@Service
public class TbNoticeService {

	@Resource
	private SwdbFactory service;
	
	@Resource
	private TmSysOperateLogService logService;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("NOTICE_ID");
		page.setOrderByType("DESC");
		String sql="(select *,(select count(*) from tb_notice_see where NOTICE_ID=A.NOTICE_ID) AS SEE_NUM,"+
					"(case client_actor when 'all' then (select count(*) from tb_corp_info) else "+
					"(select count(*) from tb_notice_actor where NOTICE_ID=A.NOTICE_ID) end) AS SUM_NOTICE"+
					" from TB_NOTICE A ) T";
		return service.getPageList(uSql, page, sql,"NOTICE_ID");
	}
	
	public List getResultList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("RESULT_ID");
		page.setOrderByType("DESC");
		return service.getPageList(uSql, page, "TB_NOTICE_RESULT","RESULT_ID");
	}
	
	public List getReceiveInfo(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("SEE_DATE");
		page.setOrderByType("DESC");
		return service.getPageList(uSql, page, "(SELECT A.*,C.CORP_NAME FROM tb_notice_see A LEFT JOIN tb_corp_info C ON A.ACTOR_ID=C.CORP_ID) T","ID");
	}

	public Integer save(TbNotice pojo,String content,ManageLoginInfo info) throws SQLException{
		Integer id = service.savePojoRtPkId(pojo,"NOTICE_ID");
		pojo.setNoticeId(id);
		updateFile(content,id);
		String logcontent = "【%s】新建了一条通知 【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getNoticeTitle());
		logService.addOperatorLog(info,"发送通知", logcontent);
		return id;
	}

	public void update(TbNotice pojo,String content,ManageLoginInfo info) throws SQLException{
		service.updatePojo(pojo,"NOTICE_ID");
		updateFile(content,pojo.getNoticeId());
		String logcontent = "【%s】修改了一条通知 【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getNoticeTitle());
		logService.addOperatorLog(info,"发送通知", logcontent);
	}
	
	public void updateSend(TbNotice pojo,String content,ManageLoginInfo info) throws SQLException{
		service.updatePojo(pojo,"NOTICE_ID");
		updateFile(content,pojo.getNoticeId());
		saveActor(pojo);
		String logcontent = "【%s】发送了一条通知 【%s】  ";
		logcontent = String.format(logcontent, info.getUserName(),pojo.getNoticeTitle());
		logService.addOperatorLog(info,"发送通知", logcontent);
	}
	
	public void saveActor(TbNotice pojo){
		String client = pojo.getClientActor();
		String manage = pojo.getManageActor();
		TbNoticeActor actor = new TbNoticeActor();
		actor.setNoticeId(pojo.getNoticeId());
		service.deleteByPo(actor);
		if(!CommonUtils.checkIsNullStr(client)){
			String[] clientActors = client.split(",");
			for(String act : clientActors){
				TbNoticeActor cactor = new TbNoticeActor();
				cactor.setNoticeId(pojo.getNoticeId());
				cactor.setActorId(act);
				cactor.setIsSee(Constant.IF_TYPE_NO);
				cactor.setActorType("10021002");
				service.savePojo(cactor, "ID");
			}
		}
		if(!CommonUtils.checkIsNullStr(manage)){
			String[] manageActors = manage.split(",");
			for(String act : manageActors){
				TbNoticeActor mactor = new TbNoticeActor();
				mactor.setNoticeId(pojo.getNoticeId());
				mactor.setActorId(act);
				mactor.setIsSee(Constant.IF_TYPE_NO);
				mactor.setActorType("10021001");
				service.savePojo(mactor, "ID");
			}
		}
	}
	
	public void updateFile(String content,Integer id) throws SQLException{
		InputStream input = null;
		input = StreamHelper.getStreamFromString(content);
		String sql = "UPDATE TB_NOTICE SET CONTENT=? WHERE NOTICE_ID=?";
		service.updateFile(sql, input, id);
	}
	
	public byte[] getContent(String id) throws IOException{
		InputStream input = null;
		String sql = "SELECT CONTENT FROM TB_NOTICE WHERE NOTICE_ID = ?";
		input = service.getFile(sql, "CONTENT", id);
		return StreamHelper.readBytes(input);
	}

	public void delete(String ids){
		service.delete("delete from TB_NOTICE_RESULT where NOTICE_ID in (" + ids + ")");
		service.delete("delete from TB_NOTICE_ACTOR where NOTICE_ID in (" + ids + ")");
		service.delete("delete from TB_NOTICE_SEE where NOTICE_ID in (" + ids + ")");
		service.delete("delete from TB_NOTICE where NOTICE_ID in (" + ids + ")");
	}
}
