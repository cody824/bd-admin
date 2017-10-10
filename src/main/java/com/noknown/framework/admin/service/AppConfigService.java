package com.noknown.framework.admin.service;

import com.noknown.framework.admin.model.AppConfig;
import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.exception.ServiceException;

public interface AppConfigService {

	AppConfig getAppConfg(String role) throws DAOException, ServiceException;
}
