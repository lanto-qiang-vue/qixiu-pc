package com.lanto.shqixiu.shwgm.controller.trans.common;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.TransLoginInfo;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgm.model.bean.CheckedNode;
import com.lanto.shqixiu.shwgm.model.bean.Dict;
import com.lanto.shqixiu.shwgm.model.bean.FuncNode;
import com.lanto.shqixiu.shwgm.model.bean.TcFunc;
import com.lanto.shqixiu.shwgm.model.po.TbBdArea;
import com.lanto.shqixiu.shwgm.model.po.TmSysUser;
import com.lanto.shqixiu.shwgm.service.trans.common.TransCommonService;
import com.lanto.shqixiu.shwgm.service.trans.common.TransLoginService;
/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@Controller
@RequestMapping(value="trans/sys/common",produces = "text/html;charset=UTF-8")
public class TransCommonController extends BaseCon {
	private Logger logger = Logger.getLogger(TransCommonController.class);// 日志
	
	@Resource
	private TransCommonService service;
	
	@Resource
	private TransLoginService transLoginService;
	
	@RequestMapping("dict")
	@ResponseBody
	public Object dict(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{	
			List<Map> data = service.getDictList();
			List<Dict> dict = new ArrayList<Dict>();
			for(Map di : data){
				Dict dc = new Dict();
				dc.setCode(di.get("CODE").toString());
				dc.setGroup(di.get("TYPE").toString());
				dc.setName(di.get("NAME").toString());
				dc.setOrder(Integer.valueOf(di.get("NUM").toString()));
				dict.add(dc);
			}
			return super.getOutData(dict);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询数据字典出错");
		}
		
	}
	
	@RequestMapping("getMenus")
	@ResponseBody
	public Object getMenus(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			Integer userId = super.getTransLoginInfo().getUserId();
			List<TcFunc> data = service.getMenus(userId);
			
			for(TcFunc fun : data){
				if("1".equals(fun.getFuncType())){
					fun.setIcon("images/menus/menu3.png");
				}
			}
			FuncNode root = getTree(data);
			return super.getOutData(root.getChildren());
			
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询菜单出错");
		}
		
	}
	
	@RequestMapping("getLoginUser")
	@ResponseBody
	public Object getLoginUser(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			TransLoginInfo user = super.getTransLoginInfo();
			if(user.getUserId() == null){
				return super.getOutData(null);
			}
			Map userInfo = transLoginService.getLoginUserInfo(user.getUserId());
			return super.getOutData(userInfo);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "获取登录名失败");
		}
		
		
	}
	
	@RequestMapping("getHomeInfo")
	@ResponseBody
	public Object getHomeInfo(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			TransLoginInfo user = super.getTransLoginInfo();
			Map out = new HashMap();
			String type = CommonUtils.checkNull(request.getParameter("type"));
			if("10171001".equals(type) || "all".equals(type)){
				List repair1 = service.getRepairWarn1(user.getCorpId());
				out.put("repair1", repair1);
			}
//			if("10171002".equals(type) || "all".equals(type)){
//				List repair2 = service.getRepairWarn2(user.getCorpId());
//				out.put("repair2", repair2);
//			}
			if("10171003".equals(type) || "all".equals(type)){
				List repair3 = service.getRepairWarn3(user.getCorpId());
				out.put("repair3", repair3);
			}
			
			if("10201001".equals(type) || "all".equals(type)){
				List check1 = service.getCheckWarn1(user.getCorpId());
				out.put("check1", check1);
			}
//			if("10201002".equals(type) || "all".equals(type)){
//				List check2 = service.getCheckWarn2(user.getCorpId());
//				out.put("check2", check2);
//			}
			return super.getOutData(out);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "获取逾期车辆出错");
		}
		
		
	}
	
	@RequestMapping("getFuncPower")
	@ResponseBody
	public Object getFuncPower(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			Integer userId = super.getTransLoginInfo().getUserId();
			List data = service.getFuncPower(userId);
			return super.getOutData(data);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询权限信息出错");
		}
		
	}
	
	@RequestMapping("getFuncButtons")
	@ResponseBody
	public Object getFuncButtons(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			List data = service.getFuncButtons();
			return super.getOutData(data);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询按钮信息出错");
		}
		
	}
	
	@RequestMapping("getPlateNumA")
	@ResponseBody
	public Object getPlateNumA(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{	
			List data = service.getPlateNumA();
			return super.getOutData(data);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询车牌号所属省份");
		}
		
	}
	
	@RequestMapping("getPlateNumB")
	@ResponseBody
	public Object getPlateNumB(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{	
			List data = service.getPlateNumB();
			return super.getOutData(data);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询车牌号所属地区");
		}
		
	}
	
	@RequestMapping("getBelongArea")
	@ResponseBody
	public Object getBelongArea(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			List data = service.getBelongArea();
			return super.getOutData(data);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询市辖区信息出错");
		}
		
	}
	
	@RequestMapping("areaTree")
	@ResponseBody
	public Object areaTree(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			String area = CommonUtils.checkNull(request.getParameter("area"));
			TbBdArea po = service.getAreaModel(super.getTransLoginInfo().getAreaCode());
			List<TmSysUser> data = service.getAreaTree(super.getClientLoginInfo().getAreaCode());
			CheckedNode root = new CheckedNode(po.getAreaName(),po.getAreaCode(),true,false);
			root.setIcon("images/menus/1007.png");
			List<CheckedNode> child = new ArrayList<CheckedNode>();
			for(TmSysUser user : data){
				CheckedNode ch = new CheckedNode(user.getUserName(),user.getUserCode(),true,true);
				ch.setIcon("images/menus/100801.png");
				child.add(ch);
			}
			root.setChildren(child);
			return super.getOutData(root);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询市辖区人员信息出错");
		}
		
	}
	
	
	private FuncNode getTree(List<TcFunc> list) throws Exception {
		if(list==null||list.size()<1)	return null;
		return buildTree(getRoot(list),list);
	}
	
	private FuncNode buildTree(FuncNode pnode, List<TcFunc> nodes) throws Exception {
		List<FuncNode> childs = new ArrayList<FuncNode>();
		for( TcFunc tmp : nodes ){
			if( pnode.getFuncId().equals(tmp.getParFuncId()) ){
				childs.add(new FuncNode(tmp));
			}
		}
		
		if( childs.size()>0 ){
			pnode.setChildren(childs);
			for( FuncNode ptmp : childs ){
				buildTree(ptmp, nodes);
			}
		}
		return pnode;
	}
	
	private FuncNode getRoot(List<TcFunc> list) {
		for (TcFunc po : list){
			if("10".equals(po.getFuncId().toString())){
				return new FuncNode(po);
			}
		}
		TcFunc rt = new TcFunc();
		rt.setFuncId(10l);
		rt.setParFuncId(0l);
		return new FuncNode(rt);
	}
	
	
}
