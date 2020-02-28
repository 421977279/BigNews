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

    // 功能一：自动渲染页面
    $.ajax({
        type: "get",
        url: BigNew.user_detail,
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        dataType: "json",
        success: function (response) {
            console.log(response.data);
            // $('.username').val(response.data.username);
            // $('.nickname').val(response.data.nickname);
            // $('.email').val(response.data.email);
            // $('.password').val(response.data.password);

            // 将响应回来需要的数据进行对象的遍历
            for (key in response.data) {
                // console.log(key);
                $(`.${key}`).val(response.data[key]);
            }

            //图片的渲染
            $('.user_pic').attr({
                'src': response.data.userPic
            })
        }
    });

    // 功能二：预览页面
    // 给form表单注册change事件监听上传的图片
    $('#exampleInputFile').change(function () {
        // 上传的图片缓存到form表单元素的files属性上
        console.dir(this);
        // jq中没有封装files方法，只有原生有，因此使用this获取
        // 由于files是伪元素，因此需要根据索引获取里面的值
        let url = this.files[0];
        // URL.createObjectURL属于静态方法
        // 括号内传参，参数为URL的File对象
        // 该方法将图片文件对象转url路径
        url = URL.createObjectURL(url);
        // 将url的路径传入预览图片src路径里
        $('.user_pic').attr({
            'src': url
        })
    });

    // 功能三：编辑个人信息
    // 编辑用户信息
    // 请求地址：/admin/user/edit
    // 请求方式：post
    // 请求数据：使用formData提交
    // 名称   	  类型  	说明    
    // username	string	用户名称  
    // nickname	string	用户昵称  
    // email  	string	用户邮箱  
    // userPic 	 file 	用户图片地址
    // password	string	用户密码  

    // 功能三：注册点击修改按钮事件
    $('.btn-edit').click(function (e) {
        // 阻止默认行为
        e.preventDefault();
        // 获取form表单元素
        let form = document.querySelector('#form');
        // 将form表单元素以参数形式传入FormData内置对象中
        let fd = new FormData(form);
        // FormData作为对象发送ajqx请求
        $.ajax({
            type: "post",
            url: BigNew.user_edit,
            // headers: {
            //     Authorization: localStorage.getItem('token')
            // },
            data: fd,
            dataType: "json",
            contentType: false,
            processData: false,
            success: function (response) {
                console.log(response);
                if (response.code == 200) {
                    $('#myModal').modal();
                    $('.modal-body').html(response.msg)
                    $('.btn-primary').click(function () {
                        location.reload();
                    })
                }
            }
        });
    })

})