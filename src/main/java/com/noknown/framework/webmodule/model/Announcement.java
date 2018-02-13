package com.noknown.framework.webmodule.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author guodong on 2018/1/28.
 * @version 1.0
 */
@Entity
@Table(name = "webmodule_announcement")
@JsonIgnoreProperties({"handler", "hibernateLazyInitializer"})
public class Announcement implements Serializable {

	private static final long serialVersionUID = -1740245438107073157L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	private String title;

	private String content;

	private Date createTime;

	private boolean top;

	public Integer getId() {
		return id;
	}

	public Announcement setId(Integer id) {
		this.id = id;
		return this;
	}

	public String getTitle() {
		return title;
	}

	public Announcement setTitle(String title) {
		this.title = title;
		return this;
	}

	public String getContent() {
		return content;
	}

	public Announcement setContent(String content) {
		this.content = content;
		return this;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public Announcement setCreateTime(Date createTime) {
		this.createTime = createTime;
		return this;
	}

	public boolean isTop() {
		return top;
	}

	public Announcement setTop(boolean top) {
		this.top = top;
		return this;
	}
}
