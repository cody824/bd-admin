package com.noknown.framework.webmodule.controller;

import com.noknown.framework.common.base.BaseController;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.framework.webmodule.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author guodong
 * @date 2018/1/28
 */
@Controller
@RequestMapping(value = "/web-module")
public class AnnouncementController extends BaseController {

	@Autowired
	private AnnouncementService announcementService;


	@RequestMapping(value = "/announcement/", method = RequestMethod.GET)
	public
	@ResponseBody
	Object getAllRoles(
			@RequestParam(value = "filter", required = false) String filter,
			@RequestParam(value = "sort", required = false) String sort,
			@RequestParam(value = "start", required = false, defaultValue = "0") int start,
			@RequestParam(value = "limit", required = false, defaultValue = "-1") int limit)
			throws Exception {
		SQLFilter sqlFilter = this.buildFilter(filter, sort);
		return announcementService.find(sqlFilter, start, limit);
	}
}