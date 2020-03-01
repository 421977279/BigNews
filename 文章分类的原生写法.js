//入口函数
$(function () {
    // 所有文章类别
    // 请求地址：/admin/category/list
    // 请求方式：get
    // 请求参数：无
    // 返回数据：文章
    // 名称 	  类型  	说明  
    // id 	number	类别  
    // name	string	类别名称
    // slug	string	别名  

    // 封装:获取到列表数据并渲染到页面中
    function rest() {
        $.ajax({
            type: "get",
            url: BigNew.category_list,
            dataType: "json",
            success: function (response) {
                //准备数据，ajax请求成功那就是数据准备好了
                console.log(response);
                // 调用模板 - template('id名称',数据)
                // 渲染页面
                $('tbody').html(template('t1', response));
            }
        });
    }

    // 调用渲染文章列表的函数
    rest();

    // 新增文章类别
    // 请求地址：/admin/category/add
    // 请求方式：post
    // 请求参数：
    // 名称  	类型    	说明  
    // name	string	类别名称
    // slug	string	别名

    // 功能一：实现新增分类功能
    //点击新增分类按钮弹出模态框
    $('.btn-success').click(function () {
        // 调用模态框
        $('#exampleModal').modal();
        $('form')[0].reset();
        // 给同一个按钮绑定了多次事件

    })

    // 给btn-primary绑定事件
    $('.btn-primary').click(function () {
        // 获取新增分类名称的文本
        const newName = $('#recipient-name').val().trim();
        // 获取新增分类Slug的文本
        const newSlug = $('#recipient-name2').val().trim();
        // console.log(newName);
        // console.log(newSlug);
        $.ajax({
            type: "post",
            url: BigNew.category_add,
            data: {
                name: newName,
                slug: newSlug
            },
            dataType: "json",
            success: function (res) {
                console.log(res);
                rest();
                // $('#exampleModal,.modal-backdrop').hide();
                $('#exampleModal').modal('hide')
            }
        });

    })

    // 编辑文章类别
    // 请求地址：/admin/category/edit
    // 请求方式：post
    // 请求参数：
    // 名称  	类型    	说明  
    // id  	number	类别id
    // name	string	类别名称
    // slug	string	别名  

    // 功能二：实现编辑功能
    // 点击编辑按钮弹出模态框
    $('.table tbody').on('click', '.btn-info', function (event) {
        // console.log($(this));
        // 当点击事件源，判断类名存在的条件时触发以下代码
        // if ($(this).hasClass('btn-info')) {
        console.log(this);
        // 调用模态框
        $('#exampleModal').modal();

        // 获取目标事件的属性(id)
        // console.log($(event.target).attr('data-id'));
        let id = $(this).attr('data-id');
        $('.btn-primary').attr('data-id',id);
        // 获取目标事件本地的名字
        let strName = $(this).parent().prev().prev().text().trim();
        // 获取目标事件Slug的名字
        let strSlug = $(this).parent().prev().text().trim();

        // console.log(strName);
        // console.log(strSlug);
        // 从html结构获取内容并填写入表单内
        $('#recipient-name').val(strName);
        $('#recipient-name2').val(strSlug);
        // }
    })

    // 点击确定按钮时编辑完成
    $('.btn-primary').click(function () {
        // 获取新增分类名称的文本
        const newName = $('#recipient-name').val().trim();

        // 获取新增分类Slug的文本
        const newSlug = $('#recipient-name2').val().trim();

        console.log(newName);
        console.log(newSlug);
        $.ajax({
            type: "post",
            url: BigNew.category_edit,
            data: {
                id: $(this).attr('data-id'),
                name: newName,
                slug: newSlug
            },
            dataType: "json",
            success: function (res) {
                // console.log(res);
                rest();
                // $('#exampleModal,.modal-backdrop').hide();
                $('#exampleModal').modal('hide')
            }
        });
    })

    // 删除文章类别
    // 请求地址：/admin/category/delete  
    // 请求方式：post
    // 请求参数：
    // 名称  	类型    	说明  
    // id  	number	文章id

    // 功能三：实现删除功能
    $('.table tbody').on('click', '.btn-danger', function (event) {
        let id = $(this).attr('data-id');
        $.ajax({
            type: "post",
            url: BigNew.category_delete,
            data: {
                id: id
            },
            dataType: "json",
            success: function (response) {
                // console.log(response);
                rest();
            }
        });
    })
})