var MineMap = {
    row: 9,  //雷的行数
    col: 9,     //雷的列数
    mineCount: 10,  //雷的个数
    minePos: [],  //雷的位置列表
    remainConut: 0,  //未打开的区域个数
    time: 0,
    mine: [],   //雷元素
    MapInit: function () { //初始化雷区域
        this.time = 0;
        this.remainConut = this.row * this.col;
        var row = this.row, col = this.col, mine = this.mine;
        var HTML = '<div class="mine_div">', id_cell;
        for (var x = 0; x < row; x++) {
            mine[x] = [];
            for (var y = 0; y < col; y++) {
                mine[x][y] = {
                    id: '',
                    isMine: false,
                    isFlag: false,
                    state: false,
                    count: 0
                };
                id_cell = mine[x][y].id = 'cell_' + x + '_' + y;
                HTML += '<button class="mine_cell" id="' + id_cell + '" onmousedown="MineMap.MouseDown(' + x + ',' + y + ',event);"></button>';
            }
        }
        HTML += '</div>';
        HTML += '<div class="score">';
        HTML += '<img src="images/mine/clock.png" style="float: left;"/>';
        HTML += '<input type="text" id="time">';
        HTML += '<img src="images/mine/mine.png" style="float: right;"/>';
        HTML += '<input type="text" id="count" style="float: right;">';
        HTML += '</div>';
        $(".mine_area").css("width", (27 * col) + "px");
        $('.mine_area').html(HTML);
        $('#count').val(this.remainConut)
        this.SetMine();
        this.GetAroundMine();
    },
    SetMine: function () {  //布置雷的位置
        var row = this.row, col = this.col, mine = this.mine, count = this.mineCount;
        var x, y;
        while (count) {
            x = Math.floor(row * Math.random());
            y = Math.floor(col * Math.random());
            if (mine[x][y].isMine)continue;
            mine[x][y].isMine = true;
            this.minePos[--count] = [x, y];
        }
    },
    GetAroundPos: function (X, Y) {  //获得周围8个位置的坐标
        var row = this.row, col = this.col;
        var TX, TY, i = 8;
        var pos = [], dinate = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]];
        while (i--) {
            TX = X + dinate[i][0];
            TY = Y + dinate[i][1];
            if ((TX < 0 || TX >= row || TY < 0 || TY >= col))continue;
            pos.push([TX, TY])
        }
        return pos;
    },
    GetAroundMine: function () {  //获得周围雷的个数，并记入雷元素中
        var row = this.row, col = this.col, mine = this.mine;
        var pos, tx, ty;
        for (var x = 0; x < row; x++) {
            for (var y = 0; y < col; y++) {
                pos = this.GetAroundPos(x, y);
                for (var i = 0; i < pos.length; i++) {
                    tx = pos[i][0];
                    ty = pos[i][1];
                    mine[x][y].count += mine[tx][ty].isMine;
                }
            }
        }
    },
    MouseDown: function (x, y, evt) {  //
        var mine = this.mine[x][y];

        if (evt.which == 1) {  //鼠标左击
            if (mine.isFlag) return false;  //如果被标记，则不响应

            if (mine.isMine) {  //单击到雷执行的函数
                this.Failed();
                return false;
            }

            this.NumberMine(x, y);
        }

        if (evt.which == 3) {  //鼠标右击
            $('#' + mine.id).toggleClass('flag');
            mine.isFlag = !(mine.isFlag);
        }

        return false;
    },
    Failed: function () {
        var pos = this.minePos;
        var x, y, mine;
        for (var i = 0; i < pos.length; i++) {
            x = pos[i][0];
            y = pos[i][1];
            mine = this.mine[x][y];
            if (mine.isFlag) {
                $('#' + mine.id).addClass('wrong_flag');
            }
            else {
                $('#' + mine.id).addClass('wrong_mine');
            }
        }
        $('button').mousedown(function () {
            return false;
        })
        alert('You lost!');
    },
    NumberMine: function (x, y) {
        var mine = this.mine[x][y];
        var num = mine.count;

        if (mine.isFlag) return;

        if (mine.state) return;
        mine.state = true;

        if (--this.remainConut == this.mineCount) {
            alert('Congratulations!');
        }

        $('#count').val(this.remainConut)

        if (num) {
            $('#' + mine.id).html(num);
            $('#' + mine.id).addClass('M' + num);
        }
        else {
            $('#' + mine.id).addClass('M0');
            this.GetNoMineArea(x, y);   //获得最大无雷区域
        }
    },
    GetNoMineArea: function (x, y) {
        var pos = this.GetAroundPos(x, y);
        var tx, ty, mine;
        for (var i = 0; i < pos.length; i++) {
            tx = pos[i][0];
            ty = pos[i][1];
            mine = this.mine[tx][ty];
            this.NumberMine(tx, ty);
        }
    }
};

function Init() {
    var level = document.radio_list.level;
    var Map = 1;
    for (var i = 0; i < level.length; i++)
        if (level[i].checked) {
            Map = i + 1;
            break;
        }
    DrawMap(Map);
}

function DrawMap(Map) {
    var minemap = MineMap;
    switch (Map) {
        case 1:
            minemap.row = minemap.col = 9;
            minemap.mineCount = 10;
            break;
        case 2:
            minemap.row = minemap.col = 16;
            minemap.mineCount = 40;
            break;
        case 3:
            minemap.row = 16;
            minemap.col = 30;
            minemap.mineCount = 99;
    }
    minemap.MapInit();
}

$('.mine_area').contextmenu(function () {
    return false;
});

setInterval(function () {
    $('#time').val(++MineMap.time)
}, 1000);