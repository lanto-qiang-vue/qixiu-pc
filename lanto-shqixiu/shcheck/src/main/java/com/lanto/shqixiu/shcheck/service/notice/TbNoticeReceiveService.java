package com.lanto.shqixiu.shcheck.service.notice;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.snaker.engine.helper.StreamHelper;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shcheck.model.po.TbNoticeResult;
import com.lanto.shqixiu.shcheck.model.po.TbNoticeSee;
import com.lanto.shqixiu.shcheck.util.Constant;


@Service
public class TbNoticeReceiveService {

	@Resource
	private SwdbFactory service;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("SEND_DATE DESC,NOTICE_ID");
		page.setOrderByType("DESC");
		String sql = "(SELECT A.*," +
				"(CASE WHEN exists (SELECT * FROM TB_NOTICE_RESULT WHERE NOTICE_ID=A.NOTICE_ID AND RESULT_BY_CODE = ?) THEN '10041001' ELSE '10041002' END) IS_ALREAD_RESULT, " +
				"(CASE WHEN B.IS_SEE IS NOT NULL THEN '10041001' ELSE '10041002' END) IS_SEE ," +
				"B.SEE_DATE " + 
				" FROM V_NOTICE A LEFT JOIN (SELECT * FROM TB_NOTICE_SEE WHERE ACTOR_ID=? and corp_type='10491003') B ON A.NOTICE_ID = B.NOTICE_ID) T";
		return service.getPageList(uSql, page, sql,"NOTICE_ID");
	}

	public byte[] updateAndGetContent(String id,String actor) throws IOException{
		updateSee(id,actor);
		InputStream input = null;
		String sql = "SELECT CONTENT FROM TB_NOTICE WHERE NOTICE_ID = ?";
		input = service.getFile(sql, "CONTENT", id);
		return StreamHelper.readBytes(input);
	}
	
	public void saveResult(TbNoticeResult po){
		service.savePojo(po, "RESULT_ID");
	}
	
	public void updateSee(String id,String actor){
		TbNoticeSee see = new TbNoticeSee();
		see.setNoticeId(Integer.valueOf(id));
		see.setActorId(actor);
		see.setCorpType("10491003");
		see = service.getModelByPo(see);
		if(see == null){
			TbNoticeSee view = new TbNoticeSee();
			view.setNoticeId(Integer.valueOf(id));
			view.setActorId(actor);
			view.setIsSee(Constant.IF_TYPE_YES);
			view.setSeeDate(new Date());
			view.setCorpType("10491003");	//企业类型为检测站
			service.savePojo(view, "ID");
		}
	}

	public void delete(String ids){
		service.delete("delete from TB_NOTICE where NOTICE_ID in (" + ids + ")");
	}
}
