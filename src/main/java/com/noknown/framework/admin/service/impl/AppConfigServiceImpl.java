package com.noknown.framework.admin.service.impl;

import com.noknown.framework.admin.dao.AppConfigDao;
import com.noknown.framework.admin.model.AppConfig;
import com.noknown.framework.admin.service.AppConfigService;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author guodong
 * @date 2018/1/28
 */
@Component
public class AppConfigServiceImpl implements AppConfigService {

	private final AppConfigDao acDao;

	@Autowired
	public AppConfigServiceImpl(AppConfigDao acDao) {
		this.acDao = acDao;
	}

	@Override
	public AppConfig getAppConfg(String role) throws DaoException {
		return acDao.getAppConfig(role);
	}

	@Override
	public AppConfig getAppConfg(String role, String page) throws DaoException, ServiceException {
		return acDao.getAppConfig(role, page);
	}

}
