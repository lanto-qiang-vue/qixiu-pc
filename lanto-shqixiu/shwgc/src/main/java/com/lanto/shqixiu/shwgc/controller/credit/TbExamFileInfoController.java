package com.lanto.shqixiu.shwgc.controller.credit;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JasperRunManager;

import org.apache.log4j.Logger;
import org.softbase.controller.BaseCon;
import org.softbase.model.ClientLoginInfo;
import org.softbase.page.PageUnit;
import org.softbase.page.SqlUnit;
import org.softbase.utils.CommonUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.lanto.shqixiu.shwgc.common.WebCache;
import com.lanto.shqixiu.shwgc.model.bean.ExamFileScore;
import com.lanto.shqixiu.shwgc.model.po.TbCorpInfo;
import com.lanto.shqixiu.shwgc.model.po.TbExamFileFgs;
import com.lanto.shqixiu.shwgc.model.po.TbExamFileInfo;
import com.lanto.shqixiu.shwgc.model.po.TbExamFileScore;
import com.lanto.shqixiu.shwgc.service.credit.TbExamFileInfoService;
import com.lanto.shqixiu.shwgc.util.Constant;
import com.lanto.shqixiu.shwgc.util.ReportDataSource;


@Controller
@RequestMapping(value="client/credit/tbexamfileinfo",produces = "text/html;charset=UTF-8")
public class TbExamFileInfoController extends BaseCon{

	private Logger logger = Logger.getLogger(TbExamFileInfoController.class);// 日志

	@Resource
	private TbExamFileInfoService service;

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

	@RequestMapping("fgsList")
	@ResponseBody
	public Object fgsList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String fileId = CommonUtils.checkNull(request.getParameter("fileId"));
			List list = service.getFgsList(fileId);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询分公司出错");
		}
	}

	@RequestMapping("zPList")
	@ResponseBody
	public Object zPList(HttpServletRequest request,HttpServletResponse response) {
		try{
			String fileId = CommonUtils.checkNull(request.getParameter("FILE_ID"));
			String typeId = CommonUtils.checkNull(request.getParameter("TYPE_ID"));
			List list = service.getZpList(fileId,typeId);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询分公司出错");
		}
	}


	@RequestMapping("getCorpInfo")
	@ResponseBody
	public Object getCorpInfo(HttpServletRequest request,HttpServletResponse response) {
		try{
			ClientLoginInfo info = super.getClientLoginInfo();
			Integer year = Integer.valueOf(CommonUtils.printDate("yyyy", new Date()));
			TbExamFileInfo exam = new TbExamFileInfo();
			exam.setCorpId(info.getCorpId());
			exam.setExamYear(year - 1);
			exam = service.getModelByPo(exam);
			if(exam != null){
				throw new Exception("该企业已经填写过<font color='red'>" + (year -1) +"</font>年度的质量信誉考核档案，只能填写上一年度的档案！");
			}
			TbCorpInfo corp = new TbCorpInfo();
			corp = service.getCorpInfo(info.getCorpId());
			return super.getOutData(json.toMap(corp));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"不能重复填写");
		}
	}

	@RequestMapping("report")
	@ResponseBody
	public Object report(HttpServletRequest request,HttpServletResponse response) {
		try{
			ClientLoginInfo info = super.getClientLoginInfo();
			String fileId = CommonUtils.checkNull(request.getParameter("FILE_ID"));
			String examType = CommonUtils.checkNull(request.getParameter("EXAM_TYPE"));

			Map basicInfo = new HashMap();
			basicInfo = getExamInfo(fileId);
			Map map = new HashMap();
			map.put("SUBREPORT_DIR", this.getUrl(request));
			map.put("affiliInfo", this.affili(fileId));
			map.put("basicInfo", basicInfo);
			map.put("examForm", this.getExamFrom(fileId,examType));
			//**************************************/
			this.getPDF(request,response,map);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"打印报表出错");
		}
	}

	private ReportDataSource getExamFrom(String fileId,String examType){
		List<ExamFileScore> zpList = service.getZpListByPo(fileId,examType);
		return new ReportDataSource(zpList,ExamFileScore.class);
	}

	private ReportDataSource affili(String fileId){
		List<TbExamFileFgs> affiliList = service.getFgsListByPo(fileId);
		return new ReportDataSource(affiliList,TbExamFileFgs.class);
	}

	private Map getExamInfo(String fileId) throws Exception{
		TbExamFileInfo exam = new TbExamFileInfo();
		exam.setFileId(fileId);
		exam = service.getModelByPo(exam);
		if(exam == null){
			throw new Exception("该质量信誉考核档案不存在！");
		}
		Integer certCount = exam.getJsfzeCzNum() + exam.getZjyCzNum() + exam.getJxCzNum() + exam.getDqCzNum()+ exam.getBjCzNum()
							+ exam.getTqCzNum() + exam.getZzjyCzNum() + exam.getCsCzNum() + exam.getLpgCzNum()
							+ exam.getYwCzNum() + exam.getJgCzNum() + exam.getGlCzNum() + exam.getQtCzNum();

		Integer personCount = exam.getJsfzrNum() + exam.getZjyNum() + exam.getJxNum() + exam.getDqNum() + exam.getBjNum()
							+ exam.getTqNum() + exam.getZzjyNum() + exam.getCsNum() + exam.getLpgNum()
							+ exam.getYwNum() + exam.getJgNum() + exam.getGlNum() + exam.getQtNum();

		Integer accidentCount = exam.getGssgNum() + exam.getHzsgNum() + exam.getYdsgNum() + exam.getQtsgNum();

		Float areaCount = exam.getPlantArea() + exam.getParkArea() + exam.getAnteroomArea();

		Map map = json.toMapByPo(exam);
		map.put("certCount", certCount);
		map.put("accidentCount", accidentCount);
		map.put("personCount", personCount);
		map.put("areaCount", areaCount);
		map.put("corpType", WebCache.getDictDescById(exam.getCorpType()));
		return map;
	}

	private String getUrl(HttpServletRequest request){
		String _url = request.getSession().getServletContext().getRealPath("/jasper/");
		return  _url + "\\";
	}

	@RequestMapping("getAllType")
	@ResponseBody
	public Object getAllType(HttpServletRequest request,HttpServletResponse response) {
		try{
			String type = CommonUtils.checkNull(request.getParameter("EXAM_TYPE"));
			String year = CommonUtils.checkNull(request.getParameter("EXAM_YEAR"));
			List list = service.getAllType(type,year);
			return super.getOutData(list);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"查询考核大项出错");
		}
	}

	@RequestMapping("save")
	@ResponseBody
	public Object save(HttpServletRequest request,HttpServletResponse response) {
		try{
			String data = CommonUtils.checkNull(request.getParameter("data"));
			String list = CommonUtils.checkNull(request.getParameter("list"));
			TbExamFileInfo po = json.getPojo(data, TbExamFileInfo.class);
			List<TbExamFileFgs> fgs = new ArrayList<TbExamFileFgs>();
			fgs = json.getPojoList(list, TbExamFileFgs.class);
			if(!CommonUtils.checkIsNullStr(po.getFileId())){
				service.update(po,fgs);
			}else{
				Integer year = Integer.valueOf(CommonUtils.printDate("yyyy", new Date()));
				TbExamFileInfo exam = new TbExamFileInfo();
				exam.setCorpId(po.getCorpId());
				exam.setExamYear(year - 1);
				exam = service.getModelByPo(exam);
				if(exam != null){
					throw new Exception("该企业已经填写过<font color='red'>" + (year -1) +"</font>年度的质量信誉考核档案！");
				}
				po.setExamYear(year - 1);
				if("10141001".equals(po.getCorpType()) || "10141002".equals(po.getCorpType())){
					po.setExamType("10381001");//一二类维修企业
				}else{
					po.setExamType("10381002");//三类维修企业 摩托车维修企业 专项维修企业
				}
				po.setIsUpload(Constant.IF_TYPE_NO);
				po.setIsFirstExam(Constant.IF_TYPE_NO);
				po.setIsGb(Constant.IF_TYPE_NO);
				po.setIsSecExam(Constant.IF_TYPE_NO);
				po.setIsZjExam(Constant.IF_TYPE_NO);
				po.setIsGs(Constant.IF_TYPE_NO);
				service.save(po,fgs);
			}
			return super.getOutData(json.toMap(po));
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}

	@RequestMapping("saveZiPing")
	@ResponseBody
	public Object saveZiPing(HttpServletRequest request,HttpServletResponse response) {
		try{
			String fileId = CommonUtils.checkNull(request.getParameter("FILE_ID"));
			String list = CommonUtils.checkNull(request.getParameter("list"));
			List<TbExamFileScore> zp = new ArrayList<TbExamFileScore>();
			zp = json.getPojoList(list, TbExamFileScore.class);
			service.saveZiPing(fileId,zp);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"保存出错");
		}
	}

	@RequestMapping("submit")
	@ResponseBody
	public Object submit(HttpServletRequest request,HttpServletResponse response) {
		try{
			String fileId = CommonUtils.checkNull(request.getParameter("FILE_ID"));
			ClientLoginInfo info = super.getClientLoginInfo();
			TbExamFileInfo file = new TbExamFileInfo();
			file.setFileId(fileId);
			file.setUploadOper(info.getUserCode());
			file.setUploadDate(new Date());
			file.setIsUpload(Constant.IF_TYPE_YES);
			service.update(file);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}

	@RequestMapping("delete")
	@ResponseBody
	public Object delete(HttpServletRequest request,HttpServletResponse response) {
		try{
			String ids = CommonUtils.checkNull(request.getParameter("ids"));
			service.delete(ids);
			return super.getOutData(true);
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e);
			return super.getOutException(e,"删除出错");
		}
	}

	private void getPDF(HttpServletRequest request,HttpServletResponse response,Map map) throws IOException{
		OutputStream ouputStream=null;
		try {
			File reportFile = new File(this.getUrl(request) + "EXAMREPORT.jasper");
			//reportFile = new File(this.getUrl() + "EXAMREPORT.jrxml");
			byte[] bytes = JasperRunManager.runReportToPdf(reportFile.getPath(), map);
			response.setContentType("application/pdf");
			response.setContentLength(bytes.length);
			response.addHeader("title", "上海市机动车维修企业质量信誉考核申请表");
			response.setHeader("title", "上海市机动车维修企业质量信誉考核申请表");
			ouputStream = response.getOutputStream();
			ouputStream.write(bytes, 0, bytes.length);
			ouputStream.flush();
		} catch (Exception e) {
			PrintWriter out = null;
			out = response.getWriter();
			out.println("<html>");
			out.println("<head>");
			out
					.println("<title>JasperReports - Web Application Sample</title>");
			out
					.println("<link rel=\"stylesheet\" type=\"text/css\" href=\"../stylesheet.css\" title=\"Style\">");
			out.println("</head>");

			out.println("<body bgcolor=\"white\">");

			out
					.println("<span class=\"bnew\">JasperReports encountered this error :</span>");
			out.println("<pre>");

			e.printStackTrace(out);

			out.println("</pre>");

			out.println("</body>");
			out.println("</html>");
			out.close();

		} finally{

			ouputStream.close();
		}
	}

	private void createWhere(List<SqlUnit> sList,HttpServletRequest request){
		String fileId = CommonUtils.checkNull(request.getParameter("FILE_ID"));
		String examYear = CommonUtils.checkNull(request.getParameter("EXAM_YEAR"));

		ClientLoginInfo info = super.getClientLoginInfo();
		sList.add(new SqlUnit("corpId", " and CORP_ID = ? ",info.getCorpId()));

		if (!CommonUtils.isNullString(fileId)){
			sList.add(new SqlUnit("fileId", " and FILE_ID like ? ","%" + fileId.trim() + "%"));
		}
		if (!CommonUtils.isNullString(examYear)){
			sList.add(new SqlUnit("examYear", " and EXAM_YEAR = ? ",examYear.trim()));
		}

	}
}
