package com.noknown.framework.admin.model;

import java.io.File;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Properties;

public class Module implements Serializable {
	/**
	 * 
	 */
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

	public static boolean isModuleDir(String dirPath) {

		return true;

	}

	public static ArrayList<Module> initModules(ArrayList<Module> array,
			int right, String moduleDirPath) {
		Module md;
		ArrayList<Module> mdArray = new ArrayList<Module>();
		Iterator<Module> it = array.iterator();
		while (it.hasNext()) {
			md = it.next();
			if (right < md.getPermissions())
				continue;
			Module module = initModule(moduleDirPath, md.getName());
			mdArray.add(module);
		}
		return mdArray;

	}

	public static Module initModule(String moduleDir, String moduleName) {
		Module module = new Module();
		module.setDisable(false);
		module.setName(moduleName);
		return module;
	}

	public static ArrayList<String> getJsFileList(String moduleDir) {
		ArrayList<String> array = new ArrayList<String>();
		File dir = new File(moduleDir);
		if (dir != null && dir.isDirectory()) {
			String[] files = dir.list();
			for (int i = 0; i < files.length; i++) {
				if (files[i].endsWith(".js"))
					array.add(files[i]);

			}
		}
		return array;
	}

	public static ArrayList<String> getLocalFileList(String moduleDir) {
		ArrayList<String> array = new ArrayList<String>();
		File dir = new File(moduleDir);
		if (dir != null && dir.isDirectory()) {
			String[] files = dir.list();
			for (int i = 0; i < files.length; i++) {
				if (files[i].endsWith(".lang"))
					array.add(files[i]);

			}
		}
		return array;
	}

}
