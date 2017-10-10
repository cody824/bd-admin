Ext.define('Soul.uiModule.ImageTable',
		{
			singleton : true,

			arrayRequestParam : "arrayInfo",

			singleRequestParam : "singleInfo",

			arrayInfoFailedNum : 0,

			getObjectById : function(objArray, objId) {
				for ( var i = 0; i < objArray.length; i++) {
					var tmp = objArray[i];
					if (tmp.id == objId)
						return tmp;
				}
				return null;
			},

			getArrayIndexById : function(objArray, objId) {
				for ( var i = 0; i < objArray.length; i++) {
					var tmp = objArray[i];
					if (tmp.id == document.getElementById(objId).getAttribute(
							'devName')) {
						return i;
					}
				}
				return objArray.length;
			},

			/*
			 * 获取单个对象的属性，并显示在Tip中，可以显示当前对象属性，也可以直接从后台获取数据并更新。
			 * 
			 * obj : html element e : event url : request url isUpdate :
			 * 是否从后台获取数据更新当前状态 objectArray :
			 * 当前模块的对象数组，如果isUpdate!=1,那就会从此数组中获取单个对象的信息。 propertyArray :
			 * 要显示的属性数组。 imageTableStr : 对象的状态和图片的对应表名（字符串） localeObj : 本地化对象
			 * renderConfig : 对象属性值的render函数配置
			 */
			getSingleObjectInfo : function(obj, e, url, isUpdate, objectArray,
					propertyArray, imageTable, localeObj, renderConfig) {
				var singleInfo;
				var arrIndex = this.getArrayIndexById(objectArray, obj.id);// 获取下标
				if (isUpdate != 1) {
					var str = 'empty';
					if (arrIndex != objectArray.length) {
						str = Soul.util.ObjectView.getObjectTipStr(
								propertyArray, objectArray[arrIndex],
								localeObj, renderConfig);
					}
					Ext.create("Ext.tip.ToolTip", {
						target : obj.id,
						html : str
					});
					return;
				}
				Ext.Ajax.request({
					url : url,
					params : {
						requestType : singleRequestParam,
						objectId : obj.getAttribute('devName')
					}, // 发送的参数
					success : function(response, option) {
						singleInfo = Ext.decode(response.responseText); // 返回的信息
						if (singleInfo.success == null) {
							objectArray[arrIndex] = singleInfo;// 更新objectArray，如没有对象，则添加到数组尾部
							if (objectArray[arrIndex].status != "no_use") {
								var str = getObjectTipStr(propertyArray,
										singleInfo, localeObj, renderConfig);
								set_img(obj.id, singleInfo.status, imageTable);
								tip(str, e);
							}
						} else
							tip(parseError(singleInfo.msg), e);
					},
					failure : function() {
						showErrorInfo(LABEL.error,
								LABEL_MESSAGE.get_single_obj_info_error);
					}
				});
			},

			/*
			 * 获取整个table中对象的属性，并把状态显示在table中。
			 * 
			 * url : request url imageTableStr : 象的状态和图片的对应表名（字符串）
			 * objectArrayStr : 当前模块的对象数组名（字符串） tableArray : 页面对象ID数组（字符串）
			 */
			getObjectArrayInfo : function(url, imageTable, tableArray,
					propertyArray, localeObj, renderConfig) {
				Ext.Ajax.request({
					url : url,
					params : {
						requestType : this.arrayRequestParam,
						remoteIp : Soul.config.BaseConfig.managedIp
					}, // 发送的参数
					success : function(response, option) {
						Soul.Ajax.hideLoadBar();
						if (response.responseText == "") {
							for ( var i = 0; i < tableArray.length; i++) {
								Soul.uiModule.ImageTable.set_img(tableArray[i],
										"no_use", imageTable);
							}
							return;
						}
						var objectArray = Ext.decode(response.responseText); // 返回的信息
						if (objectArray.success == null) {
							for ( var i = 0; i < tableArray.length; i++) {
								var arrIndex = Soul.uiModule.ImageTable
										.getArrayIndexById(objectArray,
												tableArray[i]);
								if (arrIndex == objectArray.length)
									Soul.uiModule.ImageTable
											.set_img(tableArray[i], "no_use",
													imageTable);
								else {
									Soul.uiModule.ImageTable.set_img(
											tableArray[i],
											objectArray[arrIndex].status,
											imageTable);
									var str = Soul.util.ObjectView
											.getObjectTipStr(propertyArray,
													objectArray[arrIndex],
													localeObj, renderConfig);
									Ext.create("Ext.tip.ToolTip", {
										target : tableArray[i],
										html : str
									});
								}
							}
							// eval(objectArrayStr+"=objectArray");
						} else {
							Soul.util.MessageUtil.showErrorInfo(LABEL.error,
									parseError(objectArray.msg));
						}
					},
					failure : function(response) {
						Soul.Ajax.hideLoadBar();
						if (response.responseText != "undefined"
								&& response.responseText != "")
							Soul.util.MessageUtil.showSysFaultInfo(LABEL.error,
									response.responseText);
						for ( var i = 0; i < tableArray.length; i++) {
							this.set_img(tableArray[i], "no_use", imageTable);
						}
					}
				});
			},

			getObjectArrayInfoInLocal : function(objectArray, imageTable,
					tableArray, propertyArray, localeObj, renderConfig) {
				Soul.Ajax.hideLoadBar();
				if (objectArray.success == null) {
					for ( var i = 0; i < tableArray.length; i++) {
						var arrIndex = this.getArrayIndexById(objectArray,
								tableArray[i]);
						if (arrIndex == objectArray.length)
							this.set_img(tableArray[i], "no_use", imageTable);
						else {
							this.set_img(tableArray[i],
									objectArray[arrIndex].status, imageTable);
							var str = Soul.util.ObjectView.getObjectTipStr(
									propertyArray, objectArray[arrIndex],
									localeObj, renderConfig);
							Ext.create("Ext.tip.ToolTip", {
								target : tableArray[i],
								html : str
							});
						}
					}
					// eval(objectArrayStr+"=objectArray");
				}
			},

			// 被选择的对象ID组成数组
			selectedArray : new Array(),

			/*
			 * 根据对象ID判断对象是否被选择
			 * 
			 * objectId : 对象的ID
			 * 
			 * return 1：已经选择 0：没有选择
			 */
			isSelected : function(objectId) {
				for ( var i = 0; i < this.selectedArray.length; i++) {
					if (objectId == this.selectedArray[i])
						return 1;
				}
				return 0;
			},

			/*
			 * 在imageTable中选择对象，把对象ID添加到selectedArray中并改变图片状态。
			 * 
			 * obj : html element objectArray : 当前模块的对象数组
			 * 
			 */
			selectObj : function(obj) {
				var newImg = "";
				var oldImg = obj.style.backgroundImage;
				var pos1 = oldImg.lastIndexOf("_");
				var pos2 = oldImg.lastIndexOf(".");
				if (Ext.Array.contains(this.selectedArray, obj.id)) {
					Ext.Array.remove(this.selectedArray, obj.id);
					newImg = oldImg.substring(0, pos1) + "_00"
							+ oldImg.substr(pos2);
				} else {
					this.selectedArray[this.selectedArray.length] = obj.id;
					newImg = oldImg.substring(0, pos1) + "_10"
							+ oldImg.substr(pos2);
				}
				obj.style.backgroundImage = newImg;
			},

			dcTime : 200, // doubleclick time
			dcDelay : 100, // no clicks after doubleclick
			dcAt : 0, // time of doubleclick
			savEvent : null, // save obj for handling doClick().
			savEvtTime : 0, // save time of click event.
			savTO : null, // handle of click setTimeOut

			/*
			 * 智能的判断是单击还是双击图片
			 * 
			 * which : event type obj : html element objectArray : 当前模块的对象数组
			 * 
			 */
			handleWiselyImage : function(which, obj, objectArray) {
				switch (which) {
				case "click":
					Soul.uiModule.ImageTable.savEvent = obj;
					var d = new Date();
					Soul.uiModule.ImageTable.savEvtTime = d.getTime();
					Soul.uiModule.ImageTable.savTO = setTimeout(function() {
						Soul.uiModule.ImageTable.doClickImage(
								Soul.uiModule.ImageTable.savEvent, objectArray);
					}, Soul.uiModule.ImageTable.dcTime);
					break;
				case "dblclick":
					this.doDblClickImage(which, obj, objectArray);
					break;
				}
				// hideTip();
			},

			/*
			 * 单击图片时做的处理：选择图片表示的对象
			 * 
			 * obj : html element objectArray : 当前模块的对象数组
			 * 
			 */
			doClickImage : function(obj, objectArray) {
				if (Soul.uiMoSoulle.ImageTable.savEvtTime
						- Soul.uiModule.ImageTable.dcAt <= 0) {
					return false;
				}
				Soul.uiModule.ImageTable.selectObj(obj, objectArray);
			},

			/*
			 * 双击图片时做的处理：选择图片表示状态相同的所有对象
			 * 
			 * which : event type obj : html element objectArray : 当前模块的对象数组
			 * 
			 */
			doDblClickImage : function(which, obj, objectArray) {
				var d = new Date();
				Soul.uiModule.ImageTable.dcAt = d.getTime();
				if (Soul.uiModule.ImageTable.savTO != null) {
					Soul.uiModule.ImageTable.savTO = null;
				}

				var o = Soul.uiModule.ImageTable.getObjectById(objectArray,
						obj.id);

				for ( var i = 0; i < objectArray.length; i++) {
					if (objectArray[i].status == o.status) {
						Soul.uiModule.ImageTable.selectObj($(objectArray[i].id),
								objectArray);
					}
				}
			},

			/*
			 * 右键点击图片时做的处理：执行函数fn
			 * 
			 * obj : html element objectArray : 当前模块的对象数组 fn : 执行的函数 event :鼠标事件
			 */
			rightClick : function(obj, objectArray, fn, event) {
				// hideTip();
				if (this.isSelected(obj.id) == 0) {
					this.selectObj(obj, objectArray);
				}
				fn(this.selectedArray, objectArray, event);
			},

			set_img : function(objectId, status, table) {
				url = table[status];
				Soul.util.CommonUtil.$(objectId).style.backgroundImage = "url("
						+ url + ")";
			},

			mouseOverObj : function(obj, e, fn) {
				var img = obj.style.backgroundImage;
				var pos1 = img.lastIndexOf("_");
				var pos2 = img.lastIndexOf(".");
				if (this.isSelected(obj.id) == 1) {
					img = img.substring(0, pos1) + "_11" + img.substr(pos2);
				} else {
					img = img.substring(0, pos1) + "_01" + img.substr(pos2);
				}
				obj.style.backgroundImage = img;
				fn(obj, e);
			},

			mouseOutObj : function(obj) {
				var img = obj.style.backgroundImage;
				var pos1 = img.lastIndexOf("_");
				var pos2 = img.lastIndexOf(".");
				if (this.isSelected(obj.id) == 1) {
					img = img.substring(0, pos1) + "_10" + img.substr(pos2);
				} else {
					img = img.substring(0, pos1) + "_00" + img.substr(pos2);
				}
				obj.style.backgroundImage = img;
				// hideTip();
			}
		});
