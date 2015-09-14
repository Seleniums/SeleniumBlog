var MineArea = {
    row: 16,  //扫雷区域的行数
    col: 30,  //扫雷区域的列数
    MinesCount: 99, //雷的总个数
    MinesPoint: [], //雷的位置列表
    Mines: [],
    //初始化雷单元
    CellInit: function () {
        var row = this.row, col = this.col;
        for (var x = 0; x < row + 2; x++) {
            this.Mines[x] = [];
            for (var y = 0; y < col + 2; y++) {
                this.Mines[x][y] = {
                    isMine: false, //是否有雷
                    isFlag: false,//是否开启旗帜
                    mineCount: 0 //周围有几个雷
                }
            }
        }
    },
    //初始化雷的位置
    MineInit: function () {
        var row = this.row, col = this.col, minecount = this.MinesCount;
        var x, y, count = 0;
        while (count < minecount) {
            x = Math.floor(row * Math.random()) + 1;
            y = Math.floor(col * Math.random()) + 1;
            if (this.Mines[x][y].isMine)continue;
            this.Mines[x][y].isMine = true;
            this.MinesPoint[count++] = [x, y];
        }
    },
    //初始化扫雷区域, 并获得雷周围8个位置雷的总个数
    AreaInit: function () {
        this.CellInit();
        this.MineInit();
        var row = this.row, col = this.col, HTMLstr = "";
        $('.mine_map').append("<div class='mine_area' style='height: " + 24 * row + "px; width: " + 24 * col + "px'>")
        for (var x = 1; x < row + 1; x++) {
            for (var y = 1; y < col + 1; y++) {
                HTMLstr += "<button class='mine' id='cell_" + x + "_" + y + "' onmousedown='MineArea.MouseDown(" + x + "," + y + ",event);'></button>";
                for (var i = x - 1; i < x + 2; i++)
                    for (var j = y - 1; j < y + 2; j++) {
                        this.Mines[x][y].mineCount += this.Mines[i][j].isMine;
                    }
                this.Mines[x][y].mineCount -= this.Mines[x][y].isMine;
            }
            HTMLstr += "<br />";
        }
        $('.mine_area').append(HTMLstr);
    },
    //鼠标在格子按下
    MouseDown: function (x, y, evt) {
        var mine = this.Mines[x][y];
        var id_cell = 'cell_' + x + '_' + y;
        if (evt.which == 1) {
            if (mine.isFlag)return false;
            else if (mine.isMine) this.ShowMine();
            else if (mine.mineCount) $('#' + id_cell).html(mine.mineCount);
            else this.GetNoMine(x, y); //console.log('获得最大无雷区域')
        }
        else if (evt.which == 3) {
            if (mine.isFlag) {
                $('#' + id_cell).removeClass('flag');
                this.Mines[x][y].isFlag = false;
            }
            else {
                $('#' + id_cell).addClass('flag');
                this.Mines[x][y].isFlag = true;
            }
        }
        return false;
    },
    //显示所有的雷
    ShowMine: function () {
        var point = this.MinesPoint, len = this.MinesCount;
        var x, y, id_cell;
        for (var i = 0; i < len; i++) {
            x = point[i][0];
            y = point[i][1];
            id_cell = 'cell_' + x + "_" + y;
            $('#' + id_cell).addClass('imgmine')
        }
    },

    //获得无雷区域
    GetNoMine: function (x, y) {
        var id_cell = 'cell_' + x + '_' + y;
        $('#' + id_cell).addClass('.M0')
        for (var i = x - 1; i < x + 2; i++) {
            if (i < 1 || i > this.row)continue;
            for (var j = y - 1; j < y + 2; j++) {
                if (j < 1 || j > this.col)continue;
                if (i == x && j == y)continue;
                if (this.Mines[i][j].mineCount) {
                    id_cell = 'cell_' + i + '_' + j;
                    $('#' + id_cell).html(this.Mines[i][j].mineCount);
                }
                else {
                                        console.log('i='+i+', j='+j)
                    this.GetNoMine(i, j);

                }
            }
        }
    },

    //递归开雷
    fClearMine: function () {
        var T = this;
        if (T.aClear.length == 0) {
            return
        }
        ++T.OpenedCount;
        var aXY = T.aClear.pop(), X = aXY[0], Y = aXY[1], TX, TY,
            aTmpClear = [], //一个临时数组
            srcEle = $('Img' + X + '_' + Y),
            ObXY, ObTXTY,
            countMine = 0, //获取周围雷的个数
        //从正左开始的8个方向
            arr = T.fGetAround(X, Y), i = arr.length, TAr;
        while (i--) {
            //TX,TY获得本格周围的坐标
            (ObTXTY = T.fGetMine(TX = (TAr = arr[i])[0], TY = TAr[1])).Mine == 1 && ++countMine;
            !ObTXTY.State && aTmpClear.push([TX, TY]);
        }
        ObXY = T.fGetMine(X, Y);
        ObXY.MineCount = countMine;
        srcEle.className = 'M' + countMine;
        if (!countMine) {
            Array.prototype.push.apply(T.aClear, aTmpClear);
            i = aTmpClear.length;
            while (i--)T.fGetMine((TAr = aTmpClear[i])[0], TAr[1]).State = 1;
        } else {
            getOs() == 2 ?
                srcEle.textContent = countMine
                : srcEle.innerText = countMine
        }
        T.fClearMine();
    },

    //获得双键辅助开启
    fOpenFlagMine: function (X, Y) {
        var T = this, FlagCount = 0, TX, TY, ObXY, ObTXTY, aTmpClear = [], FlagErr = false,
            arr = T.fGetAround(X, Y), i = arr.length, TAr;
        while (i--) {
            //TX,TY获得本格周围的坐标
            ObTXTY = T.fGetMine(TX = (TAr = arr[i])[0], TY = TAr[1]);
            switch (ObTXTY.State) {
                case 0: //未开启未标记
                    !ObTXTY.Mine && aTmpClear.push([TX, TY]); //没雷也没旗子的时候加入到被辅助开启的数组}
                    break;
                case 2: //标记了旗子
                    ++FlagCount; //只要标记了旗子,无论对错,都记录标记数+1
                    !ObTXTY.Mine && (FlagErr = true); //没有雷但是标记了旗子,标记错误
            }
        }
        if (FlagCount < T.fGetMine(X, Y).MineCount || aTmpClear.length == 0)return;
        //旗子比实际雷少,无论标记对错,不开启
        //没有可以提供开启的空格
        if (FlagErr) { //有错误则进行结束游戏处理
            T.fFail();
            return;
        }
        Array.prototype.push.apply(T.aClear, aTmpClear);
        i = aTmpClear.length;
        while (i--)T.fGetMine((TAr = aTmpClear[i])[0], TAr[1]).State = 1;
        T.fClearMine();
    },

    //游戏成功结束
    fSuccess: function () {
        this.Success = true;
        $('btnRefreshMap').src = 'success.gif';
    },

    //游戏失败结束
    fFail: function () {
        this.GameOver = true;
        $('btnRefreshMap').src = 'sad.gif';
        this.fShowMine();
    }
};

//换地图
//var ChangeMap = function (Map) {
//    var O = MineArea;
//    switch (Map) {
//        case 1:
//            O.MaxX = O.MaxY = 9;
//            O.MineCount = 10;
//            break;
//        case 2:
//            O.MaxX = O.MaxY = 16;
//            O.MineCount = 40;
//            break;
//        case 3:
//            O.MaxX = 30;
//            O.MaxY = 16;
//            O.MineCount = 99;
//    }
//    O.fInit();
//};

MineArea.AreaInit();

$('button').contextmenu(function () {
    return false;
})


/**
 * Created by wanlu on 2015/7/7.
 */
//$(document).ready(function () {
//
//        //定义雷
//        //(初级为9*9个方块10个雷，中级为16*16个方块40个雷，高级为16*30个方块99个雷)
//        var row = 16;
//        var col = 30;
//        var count = 99;
//        var mines = Array();
//        for (var i = 0; i < row + 2; i++) {
//            mines[i] = new Array();
//            for (var j = 0; j < col + 2; j++) {
//                mines[i][j] = {
//                    ismine: false,
//                    minecount: 0,
//                    isflag: false,
//                    cell_id: 'cell_'+i+'_'+j,
//                    MouseDown: function (event) {
//                        if (event.which == 1) {
//                            if (this.ismine)alert('游戏失败')
//                            else $('#'+this.cell_id).html(this.minecount)
//                        }
//
//                        else if (event.which == 3) {
//
//                            if (this.isflag) {
//                                $('#'+this.cell_id).removeClass('flag');
//                                this.isflag = false;
//                            }
//                            else {
//                                $('#'+this.cell_id).addClass('flag');
//                                this.isflag = true;
//                            }
//                        }
//                    }
//                }
//            }
//        }
//
//        setmine();
//        getcount();
//
//        //随机设置99个雷
//        function setmine() {
//            var x, y;
//            var i = 0;
//            while (i < count) {
//                x = getrandom(row);
//                y = getrandom(col);
//                if (mines[x][y].ismine) {
//                    continue;
//                }
//                mines[x][y].ismine = true;
//                i++;
//            }
//        }
//
//        //获得单元周围雷的个数
//        function getcount() {
//            for (var i = 1; i < row + 1; i++) {
//                for (var j = 1; j < col + 1; j++) {
//                    for (var k = i - 1; k <= i + 1; k++)
//                        for (var m = j - 1; m <= j + 1; m++)
//                            mines[i][j].minecount += mines[k][m].ismine;
//                    mines[i][j].minecount -= mines[i][j].ismine;
//                }
//            }
//        }
//
//        function getrandom(num) {
//            return Math.floor(num * Math.random()) + 1;
//        }
//
//        //在网页
//        for (var i = 1; i < row + 1; i++) {
//            for (var j = 1; j < col + 1; j++) {
//                $('#mines_area').append("<button class='mine' onmousedown='mines["+i+"]["+j+"].MouseDown(event)+'></button>");
//            }
//        }
//
//        $('.mine').contextmenu(function (e) {
//            return false;
//        })
//
//    }
//)
