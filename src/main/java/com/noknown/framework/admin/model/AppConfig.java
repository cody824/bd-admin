package com.noknown.framework.admin.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * @author guodong
 * @date 2018/1/28
 */
public class AppConfig {

	/**
	 * 属性配置
	 */
	private Properties uiConfig;

	/**
	 * 模块列表
	 */
	private List<ModuleGroup> moduleList;

	public List<ModuleGroup> getModuleList() {
		if (moduleList == null) {
			moduleList = new ArrayList<ModuleGroup>();
		}
		return moduleList;
	}

	public void setModuleList(List<ModuleGroup> moduleList) {
		this.moduleList = moduleList;
	}

	public Properties getUiConfig() {
		return uiConfig;
	}

	public void setUiConfig(Properties uiConfig) {
		this.uiConfig = uiConfig;
	}

}
