package com.noknown.framework.admin.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * @author guodong
 * @date 2018/1/28
 */
public class ModuleGroup implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = -6201138146619458798L;

	/**
	 * 模块组名称
	 */
	private String name;

	/**
	 * 子模块列表
	 */
	private List<Module> subModules;

	/**
	 * 属性配置
	 */
	private Properties config;

	public String getName() {
		return name;
	}

	public List<Module> getSubModules() {
		if (subModules == null) {
			subModules = new ArrayList<>();
		}
		return subModules;
	}

	public Properties getConfig() {
		return config;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setSubModules(List<Module> subModules) {
		this.subModules = subModules;
	}

	public void setConfig(Properties config) {
		this.config = config;
	}

}
