/*
 * Copyright 2002-2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.lanto.shqixiu.shwgm.quote;

import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.softbase.service.SwdbFactory;
import org.springframework.stereotype.Service;


@Service
public class QuoteService  {
	
	private static Log logger = LogFactory.getLog(QuoteService.class);
	
	@Resource
	private SwdbFactory service;

	//每天凌晨1点触发
//	@Scheduled(cron="0 0 1 * * ?")
//	public void updateQuotes() throws Exception {
//		logger.info("*****普通维修评价定时任务开始：**************");
//		logger.info("*****普通维修评价定时任务每天凌晨1点系统评价未评价的竣工合格证");
//		String sql = "select * from tr_repair_gene_manage where IS_COMMENT=? and STATUS=? and datediff(?,LEAVE_DATE) > 30";
//		List<TbCorpComment> clist = new ArrayList<TbCorpComment>();
//		List<TrRepairGeneManage> geneList = service.findAll(TrRepairGeneManage.class, sql, "10431001","10091002",CommonUtils.printDate(new Date()));
//		for(TrRepairGeneManage gene : geneList){
//			TbCorpInfo corp = new TbCorpInfo();
//			corp.setCorpId(gene.getCorpId());
//			corp = service.getModelByPo(corp);
//			TbCorpComment comment = new TbCorpComment();
//			comment.setCertificationId(gene.getCertSn());
//			comment.setCorpId(gene.getCorpId());
//			comment.setCorpNum(corp.getCorpNum());
//			comment.setCorpName(corp.getCorpName());
//			comment.setVechileNum(gene.getPlateNuma() + gene.getPlateNumb() + "." + gene.getPlateNum());
//			comment.setCommentRemark("超过30天由系统自动评价");
//			comment.setInsertDate(new Date());
//			comment.setOperatingUnit(gene.getDelegateName());
//			comment.setOperatingUnitTel(gene.getTelPhone());
//			comment.setCommentType("10421002");
//			comment.setRepairType("10441001");
//			comment.setTotalScore(50);
//			comment.setFwtdScore(8);
//			comment.setWxzlScore(16);
//			comment.setWxjgScore(16);
//			comment.setCorpType(corp.getCorpType());
//			service.savePojo(comment, "COMMENT_ID");
//			TrRepairGeneManage con = new TrRepairGeneManage();
//			con.setGeneId(gene.getGeneId());
//			con.setIsComment("10431002");
//			service.updatePojo(con, "GENE_ID");
//			clist.add(comment);
//		}
//		if(clist != null && clist.size() > 0){
//			logger.info("*****传入协会网站：**************" + clist.size());
//			ClassPathXmlApplicationContext cac = new ClassPathXmlApplicationContext("classpath*:/spring/send.xml");
//			CommentService cservice = (CommentService) cac.getBean("corpCommentservice");
//			cservice.insertCommendList(clist);
//		}
//		logger.info("*****普通维修评价定时任务结束：**************");
//	}
}
