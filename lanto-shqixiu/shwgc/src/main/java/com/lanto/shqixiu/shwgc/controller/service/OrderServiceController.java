package com.lanto.shqixiu.shwgc.controller.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.ClientLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgc.model.po.TbOnSiteService;
import com.lanto.shqixiu.shwgc.model.po.TbOrderService;
import com.lanto.shqixiu.shwgc.model.po.TbRepairParts;
import com.lanto.shqixiu.shwgc.service.repair.PartsService;
import com.lanto.shqixiu.shwgc.service.service.OnSiteServiceService;
import com.lanto.shqixiu.shwgc.service.service.OrderServiceService;


@Controller
@RequestMapping(value="service/orderservice",produces = "text/html;charset=UTF-8")
public class OrderServiceController extends BaseCon{

	private Logger logger = Logger.getLogger(OrderServiceController.class);// 日志

	@Resource
	private OrderServiceService service;

	@RequestMapping("list")
	@ResponseBody
	public Object list(HttpServletRequest request,HttpServletResponse response) {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List list = service.getList(sList, pUnit);
			return super.getOutPage(list,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询出错");
		}
	}


	@RequestMapping("delete")
	@ResponseBody
	public Object delete(HttpServletRequest request,HttpServletResponse response) {
		try{
			ClientLoginInfo info = super.getClientLoginInfo();
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			service.delete(ids,info);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}
	
	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			TbOrderService po = json.getPojo(data, TbOrderService.class);
			ClientLoginInfo info = super.getClientLoginInfo();
			if(CommonUtils.checkIsNotNullAndZero(po.getServiceId())){
				service.update(po,info);
			}else{
				String result=service.save(po,info);
				if(result != null){
					return super.getOutException(null,result);
				}
			}
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		super.createWhere(sList);
	}
}

