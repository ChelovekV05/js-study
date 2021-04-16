// координатные поля доски
var chessBoardSet = {
  number: [8, 7, 6, 5, 4, 3, 2, 1],
  chars: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
}

// шахматные фигуры, их код и положение на доске
var chessmen = [
  king = {
    code: '&#9818;',
    pozition: [[1, 4], [8, 4]],
  },
  queen = {
    code: '&#9819;',
    pozition: [[1, 5], [8, 5]],
  },
  rook = {
    code: '&#9820;',
    pozition: [[1, 1], [1, 8], [8, 1], [8, 8]],
  },
  elephant = {
    code: '&#9821;',
    pozition: [[1, 3], [1, 6], [8, 3], [8, 6]],
  },
  horse = {
    code: '&#9822;',
    pozition: [[1, 2], [1, 7], [8, 2], [8, 7]],
  },
  pawn = {
    code: '&#9823;',
    pozition: [[2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [2, 8],
      [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7 , 7], [7, 8]],
  }
]

var chessBoard = document.createElement('table');
chessBoard['style']['border'] = '1px solid';
chessBoard['style']['border-collapse'] = 'collapse';

for (var i = 0; i < 10; i++) {
  var tr = document.createElement('tr');
  for (var j = 0; j < 10; j++) {
    var td = document.createElement('td');

    td['style']['width'] = '70px';
    td['style']['height'] = '70px'; // установка размеров ячейки
    td['style']['textAlign'] = 'center';

    boardNumbering(i, j, td); // нумерация и
    boardColoring(i, j, td);  // раскраска поля

    // var code = chessPozition(i, j) // добавление фигруы
    // td = createFigure(code, td);   // в ячейку

    tr.append(td);
  }
  chessBoard.append(tr);
}

createFigure(chessBoard);



/**
 * функция добавляет числовую или буквенную нумерацию в ячейку
 * на доску в зваисимости от координат ячейки
 * @param i - номер строки, на которой находится ячейка
 * @param j - номер столбца, на котором находится ячейка
 * @param td - ячейка в которую записывается нумерация
 */
function boardNumbering(i, j, td) {

  if (i === 0 && j > 0 && j < 9) { // проверка на то что ячейка находится на краю доски
    td.innerText = chessBoardSet.chars[j - 1];  // но не является угловой
    td['style']['transform'] = "rotate(180deg)";
  }
  if (i === 9 && j > 0 && j < 9) {
    td.innerText = chessBoardSet.chars[j - 1];
  }

  if (j === 0 && i > 0 && i < 9) {
    td.innerText = chessBoardSet.number[i - 1];
  }
  if (j === 9 && i > 0 && i < 9) {
    td.innerText = chessBoardSet.number[i - 1];
    td['style']['transform'] = "rotate(180deg)";
  }
}

/**
 * функция закрашивает ячейки через одну в черный цвет
 * @param i - номер строки, на которой находится ячейка
 * @param j - номер столбца, на котором находится ячейка
 * @param td - ячейка которая закрашивается
 */
function boardColoring(i, j, td) {
  if (i > 0 && i < 9 && j > 0 && j < 9) { // проверка что ячейка не на краю доски
    if (i % 2 === 0 && j % 2 === 0) { // для четных строк закрашиваются четные столбцы
      td['style']['background'] = '#1f1919';
    } else if (i % 2 !== 0 && j % 2 !== 0) { // для нечетных строк закрашиваются нечетные столбцы
      td['style']['background'] = '#1f1919';
    }
    td['style']['border'] = '1px solid black'; // добавление границ вокруг и установка
    td['style']['fontSize'] = '50px';          //  размера шрифта для ячеек где в дальнейшем
                                               //  будут размещатся фигуры
  }
}

/**
 * функция размещает на доску фигуры и определяет их цвет в зависимости от стороны
 * @param board - доска в формате таблицы на которую производится размещение фигур
 */
function createFigure(board) {
  for (var figure = 0; figure < chessmen.length; figure++) { // перебор всех фигур
    var chessPositions = chessmen[figure].pozition; // запись массива позиций очередной фигуры

    for (var position = 0; position < chessPositions.length; position++) { // перебор всех позиция очередной фигуры
      var td = board // ячейка куда будет размещена фигура
        .querySelector('tr:nth-child('+ (chessPositions[position][0] + 1) +')') // в какой строке должна быть фигура
        .querySelector('td:nth-child('+ (chessPositions[position][1] + 1) +')') // в каком столбце должна быть фигура
      ;
      td.innerHTML = chessmen[figure].code;  // запись кода фигуры в ячейку
      if ((chessPositions[position][0] + 1) > 5) {
        td['style']['color'] = '#c7bfbf'; // определение цвета фигуры в зависимости от стороны
      }
    }
  }
}

document.body.append(chessBoard);


