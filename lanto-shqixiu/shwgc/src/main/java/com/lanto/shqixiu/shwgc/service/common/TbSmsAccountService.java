package com.lanto.shqixiu.shwgc.service.common;

import org.softbase.service.SwdbFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lanto.shqixiu.shwgc.model.po.TbReportTemp;
import com.lanto.shqixiu.shwgc.model.po.TbReportUser;
import com.lanto.shqixiu.shwgc.model.po.TbSmsAccount;
import com.lanto.shqixiu.shwgc.model.po.TcFileUploadInfo;

/**
 * 
 * @user : lys
 * @date : 2017-05-13
 */
@Service
public class TbSmsAccountService {
	@Autowired
	private SwdbFactory service;
	
	public TbSmsAccount getTbSmsAccountModel(TbSmsAccount account){
		return service.getModelByPo(account);
	}
	
	public boolean update(TbSmsAccount account){
		return service.updatePojo(account, "ID") == 1;
	}
	
	public boolean save(TbSmsAccount account){
		return service.savePojo(account, "ID") == 1;
	}
	
	
	
	
}
