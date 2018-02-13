package com.noknown.framework.webmodule.service.impl;

import com.noknown.framework.common.base.BaseServiceImpl;
import com.noknown.framework.webmodule.model.Announcement;
import com.noknown.framework.webmodule.repository.AnnouncementRepo;
import com.noknown.framework.webmodule.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Component;

/**
 * @author guodong
 * @date 2018/1/28
 */
@Component
public class AnnouncementServiceImpl extends BaseServiceImpl<Announcement, Integer> implements AnnouncementService {

	@Autowired
	private AnnouncementRepo acRepo;

	@Override
	public JpaRepository<Announcement, Integer> getRepository() {
		return acRepo;
	}

	@Override
	public JpaSpecificationExecutor<Announcement> getSpecificationExecutor() {
		return acRepo;
	}
}
