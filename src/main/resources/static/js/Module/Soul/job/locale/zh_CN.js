JOB_LABEL = {
    title : "作业管理",

    start : "开始",
    stop : "结束",
    pause : "暂停",
    resume : "恢复",
    log : "查看日志",
    trigger : "触发"
};

JOB_PROPERTY = {
    id : "作业ID",
    appId : "服务器ID",
    mode : "模式",
    type : "类型",
    percent : "完成度",
    createTime: "创建时间",
    updateTime: "修改时间",
    jobName : "作业名",
    jobGroup : "作业组",
    jobStatus : "作业状态",
    cronExpression : "定时参数",
    description : "描述",
    beanClass : "运行类",
    isConcurrent : "是否并发",
    springId : "运行类ID",
    methodName : "运行方法",
    runNum : "运行次数"
};

JOB_LOG_PROPERTY = {
    jobId : "作业ID",
    ctime : "日志时间",
    content : "日志内容",
    level : "级别"
};

JOB_DATA = {
    jobStatus : {
        'NORMAL': '正常',
        'PAUSED': '暂停',
        'COMPLETE': '完成'
    },
    jobMode : {
        'Multiple' : '多台',
        'Single' : '单台'
    },
    jobType : {
        'cron' : '定时运行',
        'once' : '单次触发'
    },
    jobConcurrent : {
        '1' : '并发',
        '0' : '非并发'
    }
};