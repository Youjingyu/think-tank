$(function () {
    $('#header').load('header.html', function () {
        $('#footer-and-modal').load('footer-and-modal.html', function () {
            $('#sidebar').load('sidebar.html');

            // 兼容ie8 9不支持placeholder属性的问题
            if (navigator.appName === 'Microsoft Internet Explorer') { //判断是否是IE浏览器
                if (navigator.userAgent.match(/Trident/i)) { //判断浏览器内核是否为Trident内核
                    if(navigator.userAgent.match(/MSIE 8.0/i) || navigator.userAgent.match(/MSIE 9.0/i)){  // IE8.0 和 9.0
                        $('input').each(function () {
                            var $this = $(this);
                            var placeholder = $this.attr('placeholder');
                            if(placeholder){
                                this.value = placeholder;
                                $this.on('focus', function () {
                                    if(this.value == placeholder){
                                        this.value = '';
                                    }
                                });
                                $this.on('blur', function () {
                                    if(this.value == ''){
                                        this.value = placeholder;
                                    }
                                });
                            }
                        });
                    }
                }
            }

            var  $header_nav_list = $('.header-nav-list');

            // 二级菜单显示
            $header_nav_list.find('.js-has-sub').on('mouseover', function(){
                $(this).find('.header-nav-sub').show();
            });
            $header_nav_list.find('.js-has-sub').on('mouseout', function(){
                $(this).find('.header-nav-sub').hide();
            });

            // 高亮导航栏
            $header_nav_list.find('li').each(function () {
                var $this = $(this);
                var href = $this.find('a').attr('href');
                if(href){
                    if(new RegExp(href.replace(/.*\//, '')).test(location.href)){
                        $this.addClass('header-nav-item-active');
                    }
                }
            })

            setTimeout(function () {
                // 高亮侧边栏
                var  $sidebar = $('.sidebar');
                $sidebar.find('li').each(function () {
                    var $this = $(this);
                    var href = $this.find('a').attr('href');
                    if(href){
                        if(new RegExp(href.replace(/.*\//, '')).test(location.href)){
                            $this.addClass('sidebar-active');
                        }
                    }
                })
            }, 500);

            // 登录弹窗
            $('#login').on('click', function () {
                $('#login_modal').show();
            })
            $('#login_modal').on('click', function (event) {
                if(/^modal$/.test(event.target.className)){
                    $(this).hide();
                }
            })

            // 页面翻页逻辑
            var $page = $('.page');
            var $pageList = $page.find('li');
            $pageList.eq($pageList.length - 1).on('click', function () {
                var $cur_page = $page.find('.page-active');
                if($cur_page.next().next().length !== 0){
                    $cur_page.removeClass('page-active');
                    $cur_page.next().addClass('page-active');
                }
            });
            $pageList.each(function (index) {
                if(index < $pageList.length - 1){
                    $(this).on('click', function () {
                        $page.find('.page-active').removeClass('page-active');
                        $(this).addClass('page-active');
                    });
                }
            })
        });
    });
})