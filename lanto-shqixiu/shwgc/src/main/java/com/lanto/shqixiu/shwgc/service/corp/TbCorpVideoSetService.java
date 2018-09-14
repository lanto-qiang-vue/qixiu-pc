package com.lanto.shqixiu.shwgc.service.corp;


import java.util.Date;

import javax.annotation.Resource;

import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.po.TbBdVideoSet;
import com.lanto.shqixiu.shwgc.service.sys.TqSysOperateLogService;

@Service
public class TbCorpVideoSetService {

	@Resource
	private SwdbFactory service;
	@Resource
	private TqSysOperateLogService logService;


	public void save(TbBdVideoSet pojo){
		service.savePojo(pojo);
	}
	
	public TbBdVideoSet getModel(TbBdVideoSet po){
		return service.getModelByPo(po);
	}
	public TbBdVideoSet getCorpVideSet(String corpId){
		TbBdVideoSet corp = new TbBdVideoSet();
		corp.setCorpId(corpId);
		corp = service.getModelByPo(corp);
		return corp;
	}
	
	public void update(TbBdVideoSet pojo){
		pojo.setUpdateTime(new Date());
		service.updatePojo(pojo,"CORP_ID");
	}


}
