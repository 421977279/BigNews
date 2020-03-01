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

    // 功能一：调用文章列表的函数自动渲染页面
    rest();

    // 新增文章类别
    // 请求地址：/admin/category/add
    // 请求方式：post
    // 请求参数：
    // 名称  	类型    	说明  
    // name	string	类别名称
    // slug	string	别名 

    // 功能二：新增文章分类
    // 1.给新增分类按钮注册点击事件
    $('table .btn-success').on('click', function () {
        //调用模态框
        $('#exampleModal').modal();
        // 获取新增分类按钮的值
        const str = $('table .btn-success').html();
        // 实现模态框按钮的值和样式与新增分类按钮保持一致
        $('.modal-footer .btn-primary')
            // 模态框按钮的值与新增分类按钮保持一致
            .html(str)
            // 模态框按钮的样式与新增分类按钮保持一致(变蓝色)
            // class="btn btn-success"
            .attr('class', 'btn btn-success');
    })

    // 2.隐藏模态框时，将输入框内的数据清空，方便下次操作使用
    $('#exampleModal').on('hidden.bs.modal', function (e) {
        // form表单在jq中没有封装方法，需要转化为DOM对象，使用重置方法来清除数据
        // .reset() 清空表单所有数据(DOM对象，原生的)
        $('#exampleModal form')[0].reset();
    })

    // 编辑文章类别
    // 请求地址：/admin/category/edit
    // 请求方式：post
    // 请求参数：
    // 名称  	类型    	说明  
    // id  	number	类别id
    // name	string	类别名称
    // slug	string	别名  


    // 功能二：编辑文章分类
    // 1.由于编辑按钮是动态生成出来的，所以需要使用JQ的事件委托方法
    $('tbody').on('click', '.btn-info', function () {
        // 2.调用模态框
        $('#exampleModal').modal();
        // console.log($(this));
        // $(this):事件处理程序中的this指向当前事件源

        // 3.实现模态框按钮的值和样式与新增分类按钮保持一致
        //   并将编辑按钮的id赋值给模态框按钮
        // console.log($(this).html());   //'编辑'

        // 3.1首先获取对应的id属性
        const id = $(this).attr('data-id');

        $('.modal-footer button').eq(1)
            // 3.2模态框按钮的值与新增分类按钮保持一致
            .html($(this).html())
            // 3.3模态框按钮的样式与新增分类按钮保持一致(变绿色)
            // class="btn btn-success"
            .attr('class', 'btn btn-info')
            // 3.4 将编辑按钮的id赋值给模态框按钮
            .attr('data-id', id);
        // 4.实现将文章分类内容填写进模态框的输入框内

        // 4.1 获取文章分类的名称
        const textName = $(this).parents('tr').children().eq(0).text().trim();
        // 4.2 获取文章分类的Slug
        const slugName = $(this).parents('tr').children().eq(1).text().trim();
        // 将文章分类内容填写进模态框的输入框内
        // 注意：这里的内容是被form表单元素包裹住，因此需要使用val()方法
        // 4.3 填入文章分类的名称
        $('#recipient-name').val(textName);
        // 4.4 填入文章分类的Slug
        $('#recipient-name2').val(slugName);
    })

    // 功能三：分别给新增和编辑文章分类的模态框绑定注册事件

    $('.modal-footer .btn-primary').on('click', function () {
        // 1.给新增文章分类的模态框绑定注册事件
        if ($(this).text().trim() === '新增分类') {
            // 发送ajax请求
            $.ajax({
                type: "post",
                url: BigNew.category_add,
                data: {
                    name: $('#recipient-name').val().trim(),
                    slug: $('#recipient-name2').val().trim()
                },
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    if (response.code === 201) {
                        // 重新渲染页面
                        rest();
                        // 隐藏模态框
                        $('#exampleModal').modal('hide');
                    }
                }
            });
        }
        // 2.给编辑文章分类的模态框绑定注册事件
        else {
            console.log($('#recipient-name').val().trim());
            console.log($('#recipient-name2').val().trim());
            console.log($(this).attr('data-id'));
            // 发送ajax请求
            $.ajax({
                type: "post",
                url: BigNew.category_edit,
                data: {
                    // 将编辑按钮的id赋值给模态框按钮
                    id: $(this).attr('data-id'),
                    name: $('#recipient-name').val().trim(),
                    slug: $('#recipient-name2').val().trim()
                },
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    if (response.code === 200) {
                        // 重新渲染页面
                        rest();
                        // 隐藏模态框
                        $('#exampleModal').modal('hide');
                    }
                }
            });
        }
    })

    // 删除文章类别
    // 请求地址：/admin/category/delete  
    // 请求方式：post
    // 请求参数：
    // 名称  	类型    	说明  
    // id  	number	文章id

    // 功能四：删除文章分类
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
                if (response.code === 204) {
                    // 重新渲染页面
                    rest();
                    alert(response.msg)
                }
            }
        });
    })
})