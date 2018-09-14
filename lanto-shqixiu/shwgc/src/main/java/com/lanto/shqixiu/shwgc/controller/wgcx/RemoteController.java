package com.lanto.shqixiu.shwgc.controller.wgcx;

import java.io.File;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.controller.ParamInit;
import org.softbase.utils.CommonUtils;
import org.softbase.utils.SecurityEncode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgc.model.bean.TrRepairImagBean;
import com.lanto.shqixiu.shwgc.model.bean.TvVehicleCheckBean;
import com.lanto.shqixiu.shwgc.model.po.TbBdCode;
import com.lanto.shqixiu.shwgc.model.po.TbBdVideoSet;
import com.lanto.shqixiu.shwgc.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgc.model.po.TrRepairImage;
import com.lanto.shqixiu.shwgc.model.po.TvVehicleBase;
import com.lanto.shqixiu.shwgc.model.po.TvVehicleCheck;
import com.lanto.shqixiu.shwgc.service.wgcx.RemoteService;
import com.lanto.shqixiu.shwgc.util.Constant;
import com.lanto.shqixiu.shwgc.util.ImgErToFileUtil;


@Controller
@RequestMapping(value="remote/repair",produces = "text/html;charset=UTF-8")
public class RemoteController extends BaseCon{
	
	@Resource
	private RemoteService service;	
	private Logger logger = Logger.getLogger(RemoteController.class);// 日志

	@RequestMapping("getRepair")
	@ResponseBody
	public Object getRepair(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try{
			String  accept_token = CommonUtils.checkNull(request.getParameter("accept_token"));
			String acceptToken = SecurityEncode.decoderByDES(accept_token, SecurityEncode.DES_KEY);
			if(!"gzjr87733788".equals(acceptToken)){
				return super.getOutException(null, URLEncoder.encode("accept_token错误！", "utf-8"));					
			}
			String msg = CommonUtils.checkNull(request.getParameter("msg"));
			//logger.info(msg);
			String demsg = URLDecoder.decode(msg, "utf-8");
			//logger.info(demsg);
			if (CommonUtils.checkIsNullStr(msg)) {
				return super.getOutException(null, URLEncoder.encode("参数错误！", "utf-8"));					
			}
			
			TvVehicleCheckBean check = json.getPojo(demsg, TvVehicleCheckBean.class);
			if(check == null){
				return super.getOutException(null, URLEncoder.encode("参数错误！", "utf-8"));				
			}
			String plateNum = check.getPlateNum();
			String plateColor = check.getPlateColor();
			
			List<Map>  listManage=null;
			
			if ( "二维竣工检验".endsWith(check.getCheckType())) { 
				 listManage = service.getSLMRecord(plateNum,plateColor);		
			} else
				 listManage = service.getVehicleBase(plateNum,plateColor);	

			return super.getOutData(listManage);
		}catch(Exception e){
			e.printStackTrace();
			logger.error("获取维修数据失败", e);
			return super.getOutException(e, "获取维修数据失败");
		}
	}

	@RequestMapping("getCheck")
	@ResponseBody
	public Object getCheck(HttpServletRequest request,HttpServletResponse response) {
		try{
			//30fb61cdfbeedf471f3149f96c0364c1
			String  accept_token = CommonUtils.checkNull(request.getParameter("accept_token"));
			String acceptToken = SecurityEncode.decoderByDES(accept_token, SecurityEncode.DES_KEY);
			if(!"gzjr87733788".equals(acceptToken)){
				return super.getOutException(null, URLEncoder.encode("accept_token错误！", "utf-8"));					
			}
			String msg = CommonUtils.checkNull(request.getParameter("msg"));
			//logger.info(msg);
			String demsg = URLDecoder.decode(msg, "utf-8");
			//logger.info(demsg);
			if (CommonUtils.checkIsNullStr(msg)) {
				return super.getOutException(null, URLEncoder.encode("参数错误！", "utf-8"));					
			}
			TvVehicleCheckBean check = json.getPojo(demsg, TvVehicleCheckBean.class);
			if(check == null){
				return super.getOutException(null, URLEncoder.encode("参数错误！", "utf-8"));				
			}		

			TbBdCode code = new TbBdCode();
			code.setCodeDesc(check.getPlateColor());
			code = service.getModel_Code(code);
			if(code == null){
				return super.getOutException(null, URLEncoder.encode("车牌颜色不存在！", "utf-8"));
			}
			check.setPlateColor(code.getCodeId());

			TvVehicleBase veh = new TvVehicleBase();
			veh.setPlateColor(check.getPlateColor());
			veh.setPlateNum(check.getPlateNum());
			veh = service.getModel_VehicleBase(veh);
			if(veh == null){
			  return super.getOutException(null,URLEncoder.encode("车辆信息不存在！", "utf-8"));
			}
		
			/*
			TvVehicleCheck check_old = new TvVehicleCheck();
			check_old.setJcId(check.getJcId());
			check_old = service.getModelByPo(check_old);
			if (check_old != null){
				service.delete("delete from tv_vehicle_check where JC_ID = ?", check.getJcId());
			}	
			*/
			check.setVehicleId(veh.getVehicleId());
			check.setCreateDate(new Date());
			
			check.setImage1(getImagePath(check.getImage1(),"0"));
			check.setImage2(getImagePath(check.getImage2(),"0"));
			check.setImage3(getImagePath(check.getImage3(),"0"));
			
			TvVehicleCheck ch = new TvVehicleCheck();
			BeanUtils.copyProperties(ch, check);
	        service.savePojoCheck(ch);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"上传检测记录出错");			
		}
	}	
	@RequestMapping("getImange")
	@ResponseBody
	public Object getImange(HttpServletRequest request,HttpServletResponse response) {
		try{
			//30fb61cdfbeedf471f3149f96c0364c1
			String  accept_token = CommonUtils.checkNull(request.getParameter("accept_token"));
			String acceptToken = SecurityEncode.decoderByDES(accept_token, SecurityEncode.DES_KEY);
			if(!"gzjr87733788".equals(acceptToken)){
				return super.getOutException(null, URLEncoder.encode("accept_token错误！", "utf-8"));					
			}
			String msg = CommonUtils.checkNull(request.getParameter("msg"));
			String demsg = URLDecoder.decode(msg, "utf-8");
			if (CommonUtils.checkIsNullStr(msg)) {
				return super.getOutException(null, URLEncoder.encode("参数错误！", "utf-8"));					
			}
			TrRepairImagBean check = json.getPojo(demsg, TrRepairImagBean.class);
			if(check == null){
				return super.getOutException(null, URLEncoder.encode("参数错误！", "utf-8"));				
			}		
			String picName=check.getImage1();
			String chanel=picName.substring(picName.length()-5,picName.length()-4);//取通道
			check.setChannelCode(Integer.parseInt(chanel));

			check.setCreateDate(new Date());
			String fid =getImagePath(check.getImgData(),"1");
			check.setImage1(fid);
			TrRepairImage ch = new TrRepairImage();
			BeanUtils.copyProperties(ch, check);
	        service.savePojoRepairImage(ch);
	        Map out = new HashMap();
	        out.put("fid", fid);
			out.put("success", "true");	
			return super.getOutData(out);
			
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"上传维修图片出错");			
		}
	}
	@RequestMapping("getCorpVideoSet")
	@ResponseBody
	public Object getCorpVideoSet(HttpServletRequest request,HttpServletResponse resp4onse) {
		try{
			//30fb61cdfbeedf471f3149f96c0364c1
			String  accept_token = CommonUtils.checkNull(request.getParameter("accept_token"));
			String acceptToken = SecurityEncode.decoderByDES(accept_token, SecurityEncode.DES_KEY);
			if(!"gzjr87733788".equals(acceptToken)){
				return super.getOutException(null, URLEncoder.encode("accept_token错误！", "utf-8"));					
			}
			String msg = CommonUtils.checkNull(request.getParameter("msg"));
			String demsg = URLDecoder.decode(msg, "utf-8");
			if (CommonUtils.checkIsNullStr(msg)) {
				return super.getOutException(null, URLEncoder.encode("参数错误！", "utf-8"));					
			}
		
			TbCorpInfo corp = json.getPojo(demsg, TbCorpInfo.class);
			if(corp == null){
				return super.getOutException(null, URLEncoder.encode("参数错误！", "utf-8"));				
			}
			
			corp =service.getModel_Corp(corp);
			TbBdVideoSet videoSet = new TbBdVideoSet();
			videoSet.setCorpId(corp.getCorpId());
			videoSet = service.getModel_VideoSet(videoSet);
			
			return super.getOutData(videoSet);
			
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"上传维修图片出错");			
		}
	}	
	private String getImagePath(String imageStr,String sFlag){
		
		if(CommonUtils.checkIsNullStr(imageStr)){
			return "";
		}
		String year = CommonUtils.printDate("yyyy", new Date());
		String mothYear = CommonUtils.printDate("yyyy-MM", new Date());
		String mothYearDay = CommonUtils
				.printDate("yyyy-MM-dd", new Date());
		String uuid = UUID.randomUUID().toString();
		String uName = uuid + ".jpg";
		//String uName = imageStr;
		String fid ="";
		if (sFlag.equals("0")) {
			 fid = Constant.ATTACH_FILE_UPLOAD_CHECK_IMANGE +  "/" +year + "/" + mothYear + "/" + mothYearDay + "/"+ uName;
		} else if (sFlag.equals("1")) {
			 fid = Constant.ATTACH_FILE_UPLOAD_REPAIR_IMANGE + "/" +year + "/" + mothYear + "/" + mothYearDay + "/"+ uName;			
		}
			
		String fileUrl = ParamInit.attachFileUploadPath + fid;
		File newFile = new File(fileUrl);
		if(!newFile.getParentFile().exists()){
			newFile.getParentFile().mkdirs();
		}		
		ImgErToFileUtil.saveToImgByStr(imageStr, fileUrl);
		
		return fid;
	}	

}

