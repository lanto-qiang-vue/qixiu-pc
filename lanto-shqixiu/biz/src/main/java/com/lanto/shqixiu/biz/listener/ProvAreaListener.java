/**
 * 
 */
/**
 * @author root
 *
 */
package com.lanto.shqixiu.biz.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ProvAreaListener implements ServletContextListener {
	
	private static final Logger logger = LoggerFactory.getLogger(ProvAreaListener.class);

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		logger.info("服务器启动时获取省份地区：");
		
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}
	
}