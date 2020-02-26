$(function () {
    // 用户登录
    // 请求地址：/admin/user/login
    // 请求方式：post
    // 请求参数：
    // 名称      	类型    	说明        
    // username	string	用户名（admin）
    // password	string	密码(123456)

    // 1.注册点击事件
    $('.input_sub').click(function (e) {
        // 阻止默认行为 
        e.preventDefault();
        // 2.获取用户名和密码内容
        let user = $('.input_txt').val().trim();
        let password = $('.input_pass').val().trim();

        // 3，非空判断
        if (user === '' || password === '') {
            // 之前alert体验糟糕，模态框替换
            // alert('内容不能为空，请重新输入！');
            $('#myModal').modal();
            // 通过JQ修改弹框中的文字
            $('.modal-body p').html('老铁，内容不可为空哦~')
            return;
        } else {
            //4.发送ajax请求
            $.ajax({
                type: "post",
                url: "http://localhost:8080/api/v1/admin/user/login",
                data: {
                    username: user,
                    password: password,
                },
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    //5.处理响应结果
                    if (response.code == 200) {
                        // 5.1 把token 通过本地存储存数据
                        localStorage.setItem('token', response.token);
                        // 5.2 成功：跳转到管理系统首页
                        window.location.href = './index.html'
                    } else {
                        // 5.3 失败：提示用户
                        // alert(response.msg);
                        // 调用模态框
                        $('#myModal').modal();
                        // 通过JQ修改弹框中的文字
                        $('.modal-body p').html(response.msg)

                    }
                }
            });
        }
    })
})

// 完成登录页