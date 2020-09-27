package com.noknown.framework.admin.dao.impl;

import com.noknown.framework.admin.dao.AppConfigDao;
import com.noknown.framework.admin.model.AppConfig;
import com.noknown.framework.common.dao.impl.AbstractObjectStoreXmlFileDaoImpl;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.util.BaseUtil;
import com.noknown.framework.common.util.StringUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @author guodong
 * @date 2018/1/28
 */
@Component
public class AppConfigObjectStoreXmlFileDaoImpl extends AbstractObjectStoreXmlFileDaoImpl implements AppConfigDao {


	private final static String DIR_NAME = "appConfig";

	@Value("${admin.appConfig.basePath:classpath:./userConfig/xml}")
	private String basePath;

	@Override
	public AppConfig getAppConfig(String role) throws DaoException {
		AppConfig appConfig = (AppConfig) this.getObjectByKey(DIR_NAME, role + ".xml", AppConfig.class);
		if (appConfig == null) {
			appConfig = (AppConfig) this.getObjectByKey(DIR_NAME, role, AppConfig.class);
		}
		return appConfig;
	}

	@Override
	public AppConfig getAppConfig(String role, String page) throws DaoException {
		if (StringUtil.isBlank(page)) {
			page = DIR_NAME;
		}
		AppConfig appConfig = (AppConfig) this.getObjectByKey(page, role + ".xml", AppConfig.class);
		if (appConfig == null) {
			appConfig = (AppConfig) this.getObjectByKey(page, role, AppConfig.class);
		}
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
