package com.lanto.shqixiu.shcheck.controller.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.CheckLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shcheck.model.bean.CheckedNode;
import com.lanto.shqixiu.shcheck.model.bean.Dict;
import com.lanto.shqixiu.shcheck.model.bean.FuncNode;
import com.lanto.shqixiu.shcheck.model.bean.TcFunc;
import com.lanto.shqixiu.shcheck.model.po.TbBdArea;
import com.lanto.shqixiu.shcheck.model.po.TmSysUser;
import com.lanto.shqixiu.shcheck.service.sys.CommonService;
import com.lanto.shqixiu.shcheck.service.sys.LoginService;
/**
 * 
 * @user : liuxin
 * @date : 2014-10-11
 */

@Controller
@RequestMapping(value="check/sys/common",produces = "text/html;charset=UTF-8")
public class CommonController extends BaseCon {
	private Logger logger = Logger.getLogger(CommonController.class);// 日志
	
	@Resource
	private CommonService service;
	
	@Resource
	private LoginService loginService;
	
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
			Integer userId = super.getCheckLoginInfo().getUserId();
			List<TcFunc> data = service.getMenus(userId);
			//return super.getOutData(data);
			
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
			CheckLoginInfo user = super.getCheckLoginInfo();
			if(user.getUserId() == null){
				return super.getOutData(null);
			}
			Map userInfo = loginService.getLoginUserInfo(user.getUserCode());
			return super.getOutData(userInfo);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e, "获取登录名失败");
		}
		
		
	}
	
	@RequestMapping("getTransCorpBySel")
	@ResponseBody
	public Object getTransCorpBySel(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			PageUnit pUnit = super.PageInit();
			List<SqlUnit> sList = new ArrayList<SqlUnit>();
			createWhere(sList,request);
			List data = service.getTransCorpBySel(sList, pUnit);
			return super.getOutPage(data,pUnit);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询市辖区信息出错");
		}
		
	}
	
	@RequestMapping("getCasecadeCode")
	@ResponseBody
	public Object getCasecadeCode(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{	
			List<Map> data = service.getCasecadeCode();
			return super.getOutData(data);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询系统数据出错");
		}
		
	}
	
	@RequestMapping("getFuncPower")
	@ResponseBody
	public Object getFuncPower(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			Integer userId = super.getCheckLoginInfo().getUserId();
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
	
	@RequestMapping("getBdStation")
	@ResponseBody
	public Object getBdStation(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			CheckLoginInfo user = super.getCheckLoginInfo();
			List data = service.getBdStation(user.getCorpId());
			return super.getOutData(data);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询工位信息出错");
		}
		
	}
	
	@RequestMapping("getRepairItems")
	@ResponseBody
	public Object getRepairItems(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			CheckLoginInfo user = super.getCheckLoginInfo();
			List data = service.getRepairItems(user.getCorpId());
			return super.getOutData(data);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询维修项目出错");
		}
		
	}
	
	@RequestMapping("getRepairParts")
	@ResponseBody
	public Object getRepairParts(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			CheckLoginInfo user = super.getCheckLoginInfo();
			List data = service.getRepairParts(user.getCorpId());
			return super.getOutData(data);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询维修项目出错");
		}
		
	}
	
	@RequestMapping("areaTree")
	@ResponseBody
	public Object areaTree(HttpServletRequest request,HttpServletResponse response) throws Exception {
		try{
			String area = CommonUtils.checkNull(request.getParameter("area"));
			TbBdArea po = service.getAreaModel(super.getCheckLoginInfo().getAreaCode());
			List<TmSysUser> data = service.getAreaTree(super.getCheckLoginInfo().getAreaCode());
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
			if(po.getFuncId() == 10L){
				return new FuncNode(po);
			}
		}
		return null;
	}
	
	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		String corpCode = CommonUtils.checkNull(request.getParameter("CORP_NUM"));
		String corpName = CommonUtils.checkNull(request.getParameter("CORP_NAME"));
		String corpArea = CommonUtils.checkNull(request.getParameter("CORP_AREA"));
		String jyfw = CommonUtils.checkNull(request.getParameter("CORP_TYPE"));
		String buyStatus = CommonUtils.checkNull(request.getParameter("STATUS"));
		
		if (!CommonUtils.isNullString(jyfw)){
			sList.add(new SqlUnit("jyfw", " and CORP_TYPE = ? ",jyfw.trim()));
		}
		if (!CommonUtils.isNullString(corpArea)){
			sList.add(new SqlUnit("corpArea", " and CORP_AREA = ? ",corpArea.trim()));
		}
		if (!CommonUtils.isNullString(corpCode)){
			sList.add(new SqlUnit("corpCode", " and CORP_NUM like ? ","%" + corpCode.trim() + "%"));
		}
		if (!CommonUtils.isNullString(corpName)){
			sList.add(new SqlUnit("corpName", " and CORP_NAME like ? ","%" + corpName.trim() + "%"));
		}
		if (!CommonUtils.isNullString(buyStatus)){
			sList.add(new SqlUnit("buyStatus", " and STATUS = ? ",buyStatus.trim()));
		}
	}
	
}
