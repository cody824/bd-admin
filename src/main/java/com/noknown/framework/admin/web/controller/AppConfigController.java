package com.noknown.framework.admin.web.controller;

import com.noknown.framework.admin.model.AppConfig;
import com.noknown.framework.admin.model.Module;
import com.noknown.framework.admin.model.ModuleGroup;
import com.noknown.framework.admin.service.AppConfigService;
import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * @author guodong
 * @date 2018/1/28
 */
@Controller
public class AppConfigController extends BaseController {

	@Autowired
	private AppConfigService appConfigService;

	@RequestMapping(value = "/config/appconfig", method = RequestMethod.GET)
	public @ResponseBody
	Object getAppConfig() throws Exception {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth == null) {
			return outActionError("请登录", HttpStatus.UNAUTHORIZED);
		}

		Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();

		AppConfig config = getAppConfig(authorities, null);

		return outActionReturn(config, HttpStatus.OK);
	}

	@RequestMapping(value = "/config/{page}", method = RequestMethod.GET)
	public @ResponseBody
	Object getAppConfig(@PathVariable String page) throws Exception {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth == null) {
			return outActionError("请登录", HttpStatus.UNAUTHORIZED);
		}

		Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();

		AppConfig config = getAppConfig(authorities, page);

		return outActionReturn(config, HttpStatus.OK);
	}

	private AppConfig getAppConfig(Collection<? extends GrantedAuthority> authorities, String page) throws Exception {

		//用于存放整理后的ModuleGroup
		List<ModuleGroup> mgList = new ArrayList<>();
		AppConfig config = new AppConfig();
		//获取所有权限对应的配置
		List<AppConfig> al = new ArrayList<>();
		if (authorities != null && authorities.size() > 0) {
			for(GrantedAuthority role : authorities){
				AppConfig obj = appConfigService.getAppConfg(role.getAuthority(), page);
				if (obj != null) {
					al.add(obj);
				}
			}
		}

		//先过滤掉重复的配置
		int mgCount = 0;
		if (al.size() > 0){
			//用于记录ModuleGroup是否已经出现过
			Map<String, Integer> mgMap = new HashMap<>(64);
			//用于记录Module是否已经出现过
			Map<String, Integer> mMap = new HashMap<>(64);

			for(AppConfig ac : al){
				//一些设置，暂时没有用处
				config.setUiConfig(ac.getUiConfig());

				//获取单个权限对应的模块组
				List<ModuleGroup> mgtList = ac.getModuleList();
				if(mgtList == null || mgtList.size() == 0){
					continue;
				}

				//获取模块组中的模块
				for(ModuleGroup mg : mgtList){
					String mgName = mg.getName();
					if(mgMap.containsKey(mgName)){
						List<Module> mList = mg.getSubModules();
						if(mList != null && mList.size() > 0){
							int idx = mgMap.get(mgName);
							for(Module m : mList){
								String mapName = mgName + m.getName();
								if(!mMap.containsKey(mapName)){
									mMap.put(mgName + m.getName(), 1);
									mgList.get(idx).getSubModules().add(m);
								}
							}
						}
					}else{
						List<Module> mList = mg.getSubModules();
						if(mList != null && mList.size() > 0){
							for(Module m : mList){
								mMap.put(mgName + m.getName(), 1);
							}
						}
						mgList.add(mgCount, mg);
						mgMap.put(mgName, mgCount);
						mgCount++;
					}
				}
			}
		}

		//排序(根据配置文件中的index属性)
		if(mgList.size() > 0){
			CompareModuleByIndex cm = new CompareModuleByIndex();
			CompareModuleGroupByIndex cm2 = new CompareModuleGroupByIndex();
			for(ModuleGroup mg : mgList){
				mg.getSubModules().sort(cm);
			}
			mgList.sort(cm2);
			//AppConfig
			config.setModuleList(mgList);
		}

		return config;
	}

	/****************** compare func **************************/
	static class CompareModuleByIndex implements Comparator<Module> {
		@Override
		public int compare(Module o1, Module o2) {
			int o1index = Integer.valueOf(o1.getConfig().getProperty("index", "0"));
			int o2index = Integer.valueOf(o2.getConfig().getProperty("index", "0"));
			return Integer.compare(o1index, o2index);
		}
	}

	static class CompareModuleGroupByIndex implements Comparator<ModuleGroup> {
		@Override
		public int compare(ModuleGroup o1, ModuleGroup o2) {
			int o1index = 1000, o2index = 1000;
			if (o1.getConfig() != null) {
				o1index = Integer.valueOf(o1.getConfig().getProperty("index", "1000"));
			}
			if (o2.getConfig() != null) {
				o2index = Integer.valueOf(o2.getConfig().getProperty("index", "1000"));
			}
			return Integer.compare(o1index, o2index);
		}
	}
}