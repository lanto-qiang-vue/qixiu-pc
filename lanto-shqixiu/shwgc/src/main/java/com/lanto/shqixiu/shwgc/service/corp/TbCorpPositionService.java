package com.lanto.shqixiu.shwgc.service.corp;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.po.TbBdVideoSet;
import com.lanto.shqixiu.shwgc.model.po.TbCorpPosition;


@Service
public class TbCorpPositionService {

	@Resource
	private SwdbFactory service;

	public List getList(List<SqlUnit> uSql, PageUnit page) throws SQLException{
		page.setOrderByColumn("CORP_ID");
		return service.getPageList(uSql, page, "V_CORP_POSITION","CORP_ID");
	}

	public void save(TbCorpPosition pojo){
		
	}

	public void update(TbCorpPosition pojo){
		service.updatePojo(pojo,"CORP_ID");
	}

	public TbCorpPosition getPositionByPo(TbCorpPosition con){
		return service.getModelByPo(con);
	}
	
	public Map getPosition(String corpId){
		String sql = "select * from V_CORP_POSITION WHERE CORP_ID=?";
		List list = service.findAll(sql, corpId);
		System.out.println(list.size());
		if(list != null && list.size()>0){
			return (Map)list.get(0);
		}
		return null;
	}
	
	public void savePosition(TbCorpPosition pojo){
		service.savePojo(pojo);
	}
	
	public void updatePosition(TbCorpPosition pojo){
		service.updatePojo(pojo, "CORP_ID");
	}
	
	public TbBdVideoSet getVideoInfo(String corpId){
		TbBdVideoSet video = new TbBdVideoSet();
		video.setCorpId(corpId);
		video = service.getModelByPo(video);
		return video;
	}
}
