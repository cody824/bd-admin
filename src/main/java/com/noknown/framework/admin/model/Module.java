package com.noknown.framework.admin.model;

import java.io.File;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Properties;

/**
 * @author guodong
 * @date 2018/1/28
 */
public class Module implements Serializable {

	private static final long serialVersionUID = 5290893523927251122L;

	/**
	 * 模块名称
	 */
	private String name;

	/**
	 * 是否禁止
	 */
	private boolean disable;

	/**
	 * 许可
	 */
	private int permissions;

	/**
	 * 属性配置
	 */
	private Properties config;

	public Properties getConfig() {
		return config;
	}

	public void setConfig(Properties config) {
		this.config = config;
	}

	public boolean isDisable() {
		return disable;
	}

	public void setDisable(boolean disable) {
		this.disable = disable;
	}

	public int getPermissions() {
		return permissions;
	}

	public void setPermissions(int permissions) {
		this.permissions = permissions;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public static ArrayList<Module> initModules(ArrayList<Module> array,
	                                            int right, String moduleDirPath) {
		Module md;
		ArrayList<Module> mdArray = new ArrayList<>();
		for (Module anArray : array) {
			md = anArray;
			if (right < md.getPermissions()) {
				continue;
			}
			Module module = initModule(moduleDirPath, md.getName());
			mdArray.add(module);
		}
		return mdArray;

	}

	private static Module initModule(String moduleDir, String moduleName) {
		Module module = new Module();
		module.setDisable(false);
		module.setName(moduleName);
		return module;
	}

	public static ArrayList<String> getJsFileList(String moduleDir) {
		ArrayList<String> array = new ArrayList<>();
		File dir = new File(moduleDir);
		if (dir.exists() && dir.isDirectory()) {
			String[] files = dir.list();
			if (files != null) {
				for (String file : files) {
					if (file.endsWith(".js")) {
						array.add(file);
					}
				}
			}
		}
		return array;
	}

	public static ArrayList<String> getLocalFileList(String moduleDir) {
		ArrayList<String> array = new ArrayList<>();
		File dir = new File(moduleDir);
		if (dir.exists() && dir.isDirectory()) {
			String[] files = dir.list();
			if (files != null) {
				for (String file : files) {
					if (file.endsWith(".lang")) {
						array.add(file);
					}

				}
			}
		}
		return array;
	}

}
