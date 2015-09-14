/**
 * Created by wanlu on 2015/7/6.
 */

$(document).ready(function () {

    //初始化一个4*4的数组
    var cell = new Array();
    for (var i = 0; i < 4; i++) {
        cell[i] = new Array();
        for (var j = 0; j < 4; j++) {
            cell[i][j] = 0;
        }
    }

    getnew();
    getnew();
    printcell();

    $(document).keydown(function (event) {
        var direct = event.which; //获得键盘按下方向
        console.log('press: ' + direct)
        if (direct == 37)      toleft();      //用户按下 ←
        else if (direct == 38) toup();        //用户按下 ↑
        else if (direct == 39) toright();     //用户按下 →
        else if (direct == 40) todown();      //用户按下 ↓
        getnew();
        printcell();
    })

    function toright() {

        function remove(row, start) {
            for (var j = start; j > 0; j--) {
                cell[row][j] = cell[row][j - 1];
            }
            cell[row][0] = 0;
        }

        function getsum(row, start, end) {
            var sum = 0;
            for (var j = start; j < end; j++) {
                sum = sum + cell[row][j];
            }
            return sum;
        }

        for (var i = 0; i < 4; i++) {

            //将所有的数字向右移动至有其他数字遮拦
            for (var j = 3; j > 0; j--) {
                while (cell[i][j] == 0) {
                    if (getsum(i, 0, j) == 0)break;
                    remove(i, j);
                }
            }

            //将左右方向相邻的相同数字相加并赋给右边的数，且同行其他的数向右移一位
            for (var j = 3; j > 0; j--) {
                if (cell[i][j] == cell[i][j - 1]) {
                    cell[i][j] = 2 * cell[i][j];
                    remove(i, j - 1);
                }
            }
        }
    }

    function toleft() {

        function remove(row, start) {
            for (var j = start; j < 3; j++) {
                cell[row][j] = cell[row][j + 1];
            }
            cell[row][3] = 0;
        }

        function getsum(row, start, end) {
            var sum = 0;
            for (var j = end; j > start; j--) {
                sum = sum + cell[row][j];
            }
            return sum;
        }

        for (var i = 0; i < 4; i++) {

            //将所有的数字向左移动至有其他数字遮拦
            for (var j = 0; j < 4; j++) {
                while (cell[i][j] == 0) {
                    if (getsum(i, j, 3) == 0)break;
                    remove(i, j);
                }
            }

            //将左右方向相邻的相同数字相加并赋给左边的数，且同行其他的数向左移一位
            for (var j = 0; j < 3; j++) {
                if (cell[i][j] == cell[i][j + 1]) {
                    cell[i][j] = 2 * cell[i][j];
                    remove(i, j + 1);
                }
            }
        }
    }

    function todown() {

        function remove(col, start) {
            for (var i = start; i > 0; i--) {
                cell[i][col] = cell[i - 1][col];
            }
            cell[0][col] = 0;
        }

        function getsum(col, start, end) {
            var sum = 0;
            for (var i = start; i < end; i++) {
                sum = sum + cell[i][col];
            }
            return sum;
        }

        for (var j = 0; j < 4; j++) {

            //将所有的数字向下移动至有其他数字遮拦
            for (var i = 3; i > 0; i--) {
                while (cell[i][j] == 0) {
                    if (getsum(j, 0, i) == 0)break;
                    remove(j, i);
                }
            }

            //将上下方向相邻的相同数字相加并赋给下面的数，且同列其他的数向下移一位
            for (var i = 3; i > 0; i--) {
                if (cell[i][j] == cell[i - 1][j]) {
                    cell[i][j] = 2 * cell[i][j];
                    remove(j, i - 1)
                }
            }
        }
    }

    function toup() {

        function remove(col, start) {
            for (var i = start; i < 3; i++) {
                cell[i][col] = cell[i + 1][col];
            }
            cell[3][col] = 0;
        }

        function getsum(col, start, end) {
            var sum = 0;
            for (var i = end; i > start; i--) {
                sum = sum + cell[i][col];
            }
            return sum;
        }

        for (var j = 0; j < 4; j++) {

            //将所有的数字向上移动至有其他数字遮拦
            for (var i = 0; i < 3; i++) {
                while (cell[i][j] == 0) {
                    if (getsum(j, i, 3) == 0)break;
                    remove(j, i);
                }
            }

            //将上下方向相邻的相同数字相加并赋给上面的数，且同列其他的数向上移一位
            for (var i = 0; i < 3; i++) {
                if (getsum(j, i - 1, 3) == 0)break;
                if (cell[i][j] == cell[i + 1][j]) {
                    cell[i][j] = 2 * cell[i][j];
                    remove(j, i + 1);
                }
            }
        }
    }

    //获得随机数2/4， 并赋给数组中值为0的值
    function getnew() {
        var flag = true;
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                if (cell[i][j] == 0) {
                    flag = false;
                    break;
                }
            }
        }

        if (flag) {
            console.log('游戏结束！');
            return
        }

        do {
            i = getRandon(4);
            j = getRandon(4);
        } while (cell[i][j] != 0);
        cell[i][j] = 2 * (getRandon(2) + 1);
        console.log('(row=' + i + ', col=' + j + ')')
    }

    //打印数组
    function printcell() {
        for (var i = 0; i < 4; i++) {
            console.log(cell[i]);
        }
    }

    //获得0~num之间的随你整数
    function getRandon(num) {
        return Math.floor(Math.random() * num)
    }

})