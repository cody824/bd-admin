package com.noknown.framework.admin.dao;

import com.noknown.framework.admin.model.AppConfig;
import com.noknown.framework.common.exception.DAOException;

public interface AppConfigDao {

	AppConfig getAppConfig(String role) throws DAOException;
}
