(function (window){
    function Tab(option){
        //在一个方法中获取的元素，在另外一个方法中无法直接访问
        //所以在这里定义两个属性，是为了给对象的方法提供共享的内容
        this.tabMenus = null;
        this.tabMains = null;

        this.init(option);
    }

    Tab.prototype = {
        constructor: Tab,
        init: function (option) {
            //获取元素
            this.getEles(option);
            //注册事件
            this.regEvents();
            //处理自动轮播的方法
            this.autoPlay(option);
        },
        getEles: function(option){
            //获取用户指定的菜单元素和div元素
            this.tabMenus = document.getElementById(option.tabMenu).children;
            this.tabMains = document.getElementById(option.tabMain).children;
        },
        regEvents: function () {
            //给菜单注册点击事件
            for (var i = 0; i < this.tabMenus.length; i++) {
                var li = this.tabMenus[i];
                li.index = i;

                //因为下面的函数中想要使用当前函数中的this
                //但是下面函数中有自己的this，所以呢，直接访问this不可能拿到当前这个函数中this
                //需要给这个this取个别名
                var that = this;
                li.onclick = function () {
                    //因为tab栏对象中提供了一个方法
                    //这个方法的功能就是，给一个li，帮你实现切换到这个li，以及把他对应的div切换出来

                    //that指的就是tab栏对象， this当前点击的li
                    that.switch(this);
                }
            }
        },
        autoPlay: function (option) {
            if(option.autoPlay){
                var index = 0;
                var that = this;
                // var _self = this;
                // var _this = this;
                setInterval(function(){
                    //根据当前的index，找到对应的li
                    //调用tab栏对象的切换方法，将当前li置为active状态，并且将其对应的div置为selected状态
                    that.switch(that.tabMenus[index]);
                    index ++;
                    // if(index >= that.tabMenus.length){
                    //     index = 0;
                    // }
                    index %= that.tabMenus.length;
                }, 1000);

            }
        },
        switch: function (ele) {
            //排他操作，把所有的li的样式的active去掉
            for (var j = 0; j < this.tabMenus.length; j++) {
                var li = this.tabMenus[j];
                li.className = "tab-item";
                this.tabMains[j].className = "main";
            }

            //给当前的li添加一个active类样式
            ele.className += " active";
            //给当前的li对应的div添加一个selected类样式
            this.tabMains[ele.index].className += " selected";
        }
    };

    window.T = window.Tab = Tab;
})(window)
