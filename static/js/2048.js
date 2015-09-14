/**
 * Created by wanlu on 2015/7/6.
 */


$('.game-map').height($('.game-map').width());


$(document).ready(function () {

    var MY2048 = {
        isChange: true,
        cell: [],
        Init: function () { //初始化一个4*4的数组
            var cell = this.cell;
            for (var i = 0; i < 4; i++) {
                cell[i] = [];
                for (var j = 0; j < 4; j++) {
                    cell[i][j] = 0;
                }
            }
            MY2048.NewCell();
            MY2048.NewCell();
            MY2048.printcell();
            $(document).keydown(function (event) {
                MY2048.isChange = false;
                var direct = event.which; //获得键盘按下方向
                //console.log('press: ' + direct)
                if (direct == 37)      MY2048.ToLeft();      //用户按下 ←
                else if (direct == 38) MY2048.ToUp();        //用户按下 ↑
                else if (direct == 39) MY2048.ToRight();     //用户按下 →
                else if (direct == 40) MY2048.ToDown();      //用户按下 ↓
                MY2048.NewCell();
                MY2048.printcell();
            })
        },
        ToRight: function () {
            var cell = this.cell, num;

            function remove(row, start) {
                MY2048.isChange = true;
                for (var j = start; j > 0; j--) {
                    num = cell[row][j] = cell[row][j - 1];
                    if (!num) continue;
                    $('.pos-' + row + '-' + (j - 1)).html('');
                    $('.pos-' + row + '-' + (j - 1)).removeClass('num-' + num);
                    $('.pos-' + row + '-' + j).addClass('num num-' + num);
                    $('.map_2048').append("<div class='num num-" + num + " pos-" + row + "-" + j + "'>" + num + "</div>")
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
                    if (cell[i][j] == cell[i][j - 1] && cell[i][j] != 0) {
                        num = cell[i][j] = 2 * cell[i][j];
                        $('.pos-' + i + '-' + (j - 1)).html('');
                        $('.pos-' + i + '-' + (j - 1)).removeClass('num-' + num / 2);
                        $('.pos-' + i + '-' + j).html(num);
                        $('.pos-' + i + '-' + j).removeClass('num-' + num / 2);
                        $('.pos-' + i + '-' + j).addClass('num num-' + num);
                        remove(i, j - 1);
                    }
                }
            }
        },
        ToLeft: function () {
            var cell = this.cell, num;

            function remove(row, start) {
                MY2048.isChange = true;
                for (var j = start; j < 3; j++) {
                    num = cell[row][j] = cell[row][j + 1];
                    if (!num) continue;
                    $('.pos-' + row + '-' + (j + 1)).html('');
                    $('.pos-' + row + '-' + (j + 1)).removeClass('num-' + num);
                    $('.pos-' + row + '-' + j).addClass('num num-' + num);
                    $('.map_2048').append("<div class='num num-" + num + " pos-" + row + "-" + j + "'>" + num + "</div>")

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
                    if (cell[i][j] == cell[i][j + 1] && cell[i][j] != 0) {
                        num = cell[i][j] = 2 * cell[i][j];
                        $('.pos-' + i + '-' + (j + 1)).html('');
                        $('.pos-' + i + '-' + (j + 1)).removeClass('num-' + num / 2);
                        $('.pos-' + i + '-' + j).html(num);
                        $('.pos-' + i + '-' + j).removeClass('num-' + num / 2);
                        $('.pos-' + i + '-' + j).addClass('num num-' + num);

                        remove(i, j + 1);
                    }
                }
            }
        },
        ToDown: function () {
            var cell = this.cell, num;

            function remove(col, start) {
                MY2048.isChange = true;
                for (var i = start; i > 0; i--) {
                    num = cell[i][col] = cell[i - 1][col];
                    if (!num) continue;
                    $('.pos-' + (i - 1) + '-' + col).html('');
                    $('.pos-' + (i - 1) + '-' + col).removeClass('num-' + num);
                    $('.map_2048').append("<div class='num num-" + num + " pos-" + i + "-" + col + "'>" + num + "</div>")
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
                    if (cell[i][j] == cell[i - 1][j] && cell[i][j] != 0) {
                        num = cell[i][j] = 2 * cell[i][j];
                        $('.pos-' + (i - 1) + '-' + j).html('');
                        $('.pos-' + (i - 1) + '-' + j).removeClass('num-' + num / 2);
                        $('.pos-' + i + '-' + j).html(num);
                        $('.pos-' + i + '-' + j).removeClass('num-' + num / 2);
                        $('.pos-' + i + '-' + j).addClass('num num-' + num);
                        remove(j, i - 1)
                    }
                }
            }
        },
        ToUp: function () {
            var cell = this.cell, num;

            function remove(col, start) {
                MY2048.isChange = true;
                for (var i = start; i < 3; i++) {
                    num = cell[i][col] = cell[i + 1][col];
                    if (!num) continue;
                    $('.pos-' + (i + 1) + '-' + col).html('');
                    $('.pos-' + (i + 1) + '-' + col).removeClass('num-' + num);
                    $('.map_2048').append("<div class='num num-" + num + " pos-" + i + "-" + col + "'>" + num + "</div>")
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
                    if (cell[i][j] == cell[i + 1][j] && cell[i][j] != 0) {
                        num = cell[i][j] = 2 * cell[i][j];
                        $('.pos-' + (i + 1) + '-' + j).html('');
                        $('.pos-' + (i + 1) + '-' + j).removeClass('num-' + num / 2);
                        $('.pos-' + i + '-' + j).html(num);
                        $('.pos-' + i + '-' + j).removeClass('num-' + num / 2);
                        $('.pos-' + i + '-' + j).addClass('num num-' + num);
                        remove(j, i + 1);
                    }
                }
            }
        },
        NewCell: function () {    //获得随机数2/4， 并赋给数组中值为0的值
            var cell = this.cell, i, j, num;

            if (MY2048.IsFull()) {
                alert('游戏结束！');
                MY2048.Init();
                $('.map_2048').empty();
                //console.log('游戏结束！');
                return false;
            }

            if(!MY2048.isChange) return false;

            do {
                i = GetRandom(4);
                j = GetRandom(4);
            } while (cell[i][j]);

            cell[i][j] = num = 2 * (GetRandom(2) + 1);

            $('.map_2048').append("<div class='num num-" + num + " pos-" + i + "-" + j + "'>" + num + "</div>")
            //console.log('x = ' + i + ", y = " + j);
        },
        IsFull: function () {
            for (var i = 0; i < 4; i++)
                for (var j = 0; j < 4; j++)
                    if (!this.cell[i][j])
                        return false;
            return true;
        },
        printcell: function () {    //打印数组
            var cell = this.cell;
            for (var i = 0; i < 4; i++) {
                console.log(cell[i]);
            }

            console.log("***************************")
        }
    };

    //获得0~num之间的随你整数
    function GetRandom(num) {
        return Math.floor(Math.random() * num)
    }

    MY2048.Init();

})