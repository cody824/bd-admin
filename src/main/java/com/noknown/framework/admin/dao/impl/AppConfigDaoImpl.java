package com.noknown.framework.admin.dao.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.noknown.framework.admin.dao.AppConfigDao;
import com.noknown.framework.admin.model.AppConfig;
import com.noknown.framework.common.dao.impl.ObjectStoreXMLFileDaoImpl;
import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.util.BaseUtil;

@Component
public class AppConfigDaoImpl extends ObjectStoreXMLFileDaoImpl implements AppConfigDao {
	

	private final static String dirName = "appConfig";
	
	@Value("${admin.appConfig.basePath:classpath:./userConfig/xml}")
	private String basePath;

	@Override
	public AppConfig getAppConfig(String role) throws DAOException {
		AppConfig appConfig = (AppConfig) this.getObjectByKey(dirName, role + ".xml", AppConfig.class);
		if (appConfig == null)
			appConfig = (AppConfig) this.getObjectByKey(dirName, role, AppConfig.class);
		return appConfig;
	}
	
	@Override
	public String getBasePath() {
		if (basePath.startsWith("classpath")) {
			basePath = BaseUtil.getClassPath()
					+ basePath.substring(basePath.indexOf(":") + 1);
		}
		return basePath;
	}

}
