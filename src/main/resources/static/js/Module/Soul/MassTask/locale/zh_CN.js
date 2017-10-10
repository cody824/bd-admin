MASS_TASK_LABEL = {
    title : "群发消息管理",
    create : "创建群发任务",
    addUser : "添加发送用户",
    detail : "消息明细",
    trigger : "触发",
    test : "测试 ",
    delete : "删除",
    stop:"关闭",
    import : "导入excel数据",
    importOrder : "导入订单用户",
    importPhoneBindUser : "导入绑定手机用户",
    importEmailBindUser : "导入绑定邮箱用户"
};

MASS_TASK_PROPERTY = {
    id : "任务ID",
    name : "任务名",
    type : "类型",
    status : "状态",
    createName : "创建者",
    ctime : "创建时间",
    utime : "更新时间",
    content : "内容",
    defaultContent : "默认内容",
    jobId : "作业ID",
    msgNum : "消息数量"
};

MASS_MESSAGE_PROPERTY = {

};

MASS_TASK_DATA = {
    taskType : {
        'sms' : '短信',
        'email' : '邮件',
        'wechat' : '微信'
    },
    taskStatus : {
        'init' : '初始化',
        'run' : '运行中',
        'stop' : '停止',
        'error' : '错误'
    }
};


MASS_MESSAGE_DATA = {
	    status : {
	        'init' : '未发送',
	        'ok' : '发送成功',
	        'fail' : '发送失败'
	    },
	};

MASS_MESSAGE_PROPERTY = {
	    id : "id",
	    taskId : "任务id",
	    userName : "用户名",
	    status : "状态",
	    type : "类型",
	    phone : "电话号码",
	    email : "邮箱",
	    wechat : "微信openid",
	    ctime : "创建时间",
	    utime : "变动时间",
	    content : "消息内容"
	};








MASS_USER_PROPERTY = {
		id : '用户ID',
		email : '邮箱',
		mobile : '手机号',
		fullName : '用户姓名'
	};

MASS_TASK_COMBO = {
		taskType: [
	        ['sms', '短信'],
	        ['email', '邮件'],
	        ['wechat', '微信']
	    ]  
	};