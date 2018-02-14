package com.noknown.framework.admin.service;

import com.noknown.framework.admin.model.AppConfig;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;

/**
 * @author guodong
 * @date 2018/1/28
 */
public interface AppConfigService {

	/**
	 * 获取角色对应配置
	 *
	 * @param role 角色
	 * @return 配置
	 * @throws DaoException     异常
	 * @throws ServiceException 异常
	 */
	AppConfig getAppConfg(String role) throws DaoException, ServiceException;
}
