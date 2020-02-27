$(function () {
    // 获取用户详情
    // 请求地址：/admin/user/detail
    // 请求方式：get
    // 请求参数：无
    // 返回数据：
    // 名称   	  类型  	说明    
    // username	string	用户名称  
    // nickname	string	用户昵称  
    // email  	string	用户邮箱  
    // userPic 	string	用户图片地址
    // password	string	用户密码  

    // 发送ajax请求
    $.ajax({
        type: "get",
        url: BigNew.user_detail,
        headers: {
            Authorization: localStorage.getItem('token')
        },
        dataType: "json",
        success: function (response) {
            console.log(response.data);
            // $('.username').val(response.data.username);
            // $('.nickname').val(response.data.nickname);
            // $('.email').val(response.data.email);
            // $('.password').val(response.data.password);

            // 将响应回来需要的数据进行对象的遍历
            for(key in response.data){
                // console.log(key);
                $(`.${key}`).val(response.data[key]);
            }

            //图片的渲染
            $('.user_pic').attr({'src':response.data.userPic})
        }
    });
})