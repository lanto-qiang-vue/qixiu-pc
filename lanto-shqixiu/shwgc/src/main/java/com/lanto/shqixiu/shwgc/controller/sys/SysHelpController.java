/* Copyright 2013-2015 www.snakerflow.com
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.lanto.shqixiu.shwgc.controller.sys;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.ManageLoginInfo;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgc.model.po.TqSysHelp;
import com.lanto.shqixiu.shwgc.service.SysHelpService;


@Controller
@RequestMapping(value = "client/sys/help",produces = "text/html;charset=UTF-8")
public class SysHelpController extends BaseCon{
	private Logger logger = Logger.getLogger(SysHelpController.class);// 日志
	@Resource
	private SysHelpService service;

	
	@RequestMapping(value = "getContent")
	@ResponseBody
	public Object getContent(HttpServletRequest request,HttpServletResponse response) {
		String funcId = request.getParameter("funcId");
		try {
			byte[] con = service.getContent(funcId);
			if(con == null){
				return super.getOutData(null);
			}
			String content = new String(con,"UTF-8");
			return super.getOutData(content);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(getManageLoginInfo(),e);
			return super.getOutException(e, "获取帮助内容失败！");
		}
	}
	
	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			ManageLoginInfo info = super.getManageLoginInfo();
			TqSysHelp po = json.getPojo(data, TqSysHelp.class);
			TqSysHelp con = new TqSysHelp();
			con = service.getModel(po.getFuncId());
			if(con != null){
				service.update(po);
			}else{
				service.save(po);
			}
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}
	
	
	
}
