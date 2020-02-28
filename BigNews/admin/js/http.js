/* 沙箱模式 */
(function (w) {
    // 设置全局ajax请求

    $.ajaxSetup({
        //发送请求前调用函数
        beforeSend: function () {
            //显示进度条，进度条插件添加到window上
            if (window.NProgress) {
                NProgress.start() 
            }
        },
        // 全局添加请求头
        headers: {
            Authorization: localStorage.getItem('token')
        },
        // 请求失败
        // 意味着服务器拒绝给你数据，通常情况下用户没有正确的token,
        // 没有正确的token，提示跳转到主页，让用户重新登录并获取token
        error: function () {

        },
        //请求完成后调用函数(无论是成功或失败)
        complete: function () {
            if (window.NProgress) {
                NProgress.done()
            }
        },
    });

    var baseURL = 'http://localhost:8080/api/v1'
    var BigNew = {
        baseURL: baseURL, //基地址
        user_login: baseURL + '/admin/user/login', //用户登录
        user_info: baseURL + '/admin/user/info', //用户信息
        user_detail: baseURL + '/admin/user/detail', //用户详情
        user_edit: baseURL + '/admin/user/edit', //用户编辑
        category_list: baseURL + '/admin/category/list', //文章类别查询
        category_add: baseURL + '/admin/category/add', //文章类别新增
        category_search: baseURL + '/admin/category/search', //文章类别搜索
        category_edit: baseURL + '/admin/category/edit', //文章类别编辑
        category_delete: baseURL + '/admin/category/delete', //文章类别删除
        article_query: baseURL + '/admin/article/query', //文章搜索
        article_publish: baseURL + '/admin/article/publish', //文章发布
        article_search: baseURL + '/admin/article/search', //文章信息查询
        article_edit: baseURL + '/admin/article/edit', //文章编辑
        article_delete: baseURL + '/admin/article/delete', //文章删除
        comment_list: baseURL + '/admin/comment/search', //文章评论列表
        comment_pass: baseURL + '/admin/comment/pass', //文章评论通过
        comment_reject: baseURL + '/admin/comment/reject', //文章评论不通过
        comment_delete: baseURL + '/admin/comment/delete', //文章评论删除
    };

    //暴露接口
    w.BigNew = BigNew;
})(window);