package com.noknown.framework.webmodule.repository;

import com.noknown.framework.webmodule.model.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

/**
 * @author guodong
 * @date 2018/1/28
 */
public interface AnnouncementRepo extends JpaRepository<Announcement, Integer>, JpaSpecificationExecutor<Announcement> {

}
