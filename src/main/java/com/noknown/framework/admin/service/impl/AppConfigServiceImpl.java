package com.noknown.framework.admin.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.noknown.framework.admin.dao.AppConfigDao;
import com.noknown.framework.admin.model.AppConfig;
import com.noknown.framework.admin.service.AppConfigService;
import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.exception.ServiceException;

@Component
public class AppConfigServiceImpl implements AppConfigService {
	
	@Autowired
	private AppConfigDao acDao;

	@Override
	public AppConfig getAppConfg(String role) throws DAOException, ServiceException {
		return acDao.getAppConfig(role);
	}

}
