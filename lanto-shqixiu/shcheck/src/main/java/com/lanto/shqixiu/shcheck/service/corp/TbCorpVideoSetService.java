package com.lanto.shqixiu.shcheck.service.corp;


import java.util.Date;

import javax.annotation.Resource;

import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shcheck.model.po.TjBdVideoSet;
import com.lanto.shqixiu.shcheck.service.sys.TjSysOperateLogService;

@Service
public class TbCorpVideoSetService {

	@Resource
	private SwdbFactory service;
	@Resource
	private TjSysOperateLogService logService;


	public void save(TjBdVideoSet pojo){
		service.savePojo(pojo);
	}
	
	public TjBdVideoSet getModel(TjBdVideoSet po){
		return service.getModelByPo(po);
	}
	public TjBdVideoSet getCorpVideSet(String corpId){
		TjBdVideoSet corp = new TjBdVideoSet();
		corp.setCorpId(corpId);
		corp = service.getModelByPo(corp);
		return corp;
	}
	
	public void update(TjBdVideoSet pojo){
		pojo.setUpdateTime(new Date());
		service.updatePojo(pojo,"CORP_ID");
	}


}
