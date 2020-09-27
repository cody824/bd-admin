package com.noknown.framework.admin.dao;

import com.noknown.framework.admin.model.AppConfig;
import com.noknown.framework.common.exception.DaoException;

/**
 * @author guodong
 * @date 2018/1/28
 */
public interface AppConfigDao {

	/**
	 * 获取角色对应配置
	 *
	 * @param role 角色
	 * @return 配置
	 * @throws DaoException 异常
	 */
	AppConfig getAppConfig(String role) throws DaoException;

	/**
	 * 获取角色对应配置
	 *
	 * @param role 角色
	 * @param page 页面
	 * @return 配置
	 * @throws DaoException 异常
	 */
	AppConfig getAppConfig(String role, String page) throws DaoException;
}
