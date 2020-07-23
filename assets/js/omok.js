window.onload   = () => {
    let $btnMakeBoard   = document.querySelector('#btnMakeBoard');
    $btnMakeBoard.addEventListener('click', () => {
        let num = document.querySelector('#boardSize').value;
        let $renderTarget   = document.querySelector('#omokBoard tbody')
        makeBoard($renderTarget, num);
    })
}

const winPoint  = 3;
let size    = -1;
let omok    = undefined;
let turn    = true;
let history = undefined;

function makeBoard($target, num) {
    $target.innerHTML   = '';

    try {
        omok    = new Array(parseInt(num));
        history = new Array();
        size    = num;

        for(let i = 0; i < size; i++) {
            const $tr   = document.createElement('tr');
            $tr.id      = `tr.${i}`
            for(let j = 0; j < size; j++) {
                const $td       = document.createElement('td');
                $td.id          = `td.${j}.${i}`
                $td.className   = 'omok-cell';
                $td.addEventListener('click', function() {
                    cellClick(this);
                })
                $tr.appendChild($td);
            }
            $target.appendChild($tr);
            omok[i] = new Array(parseInt(num));
        }
        
    } catch(e) {
        console.log(e);
    }
}

function cellClick($target) {
    const cellId    = $target.id;
    const x         = cellId.split('.')[1];
    const y         = cellId.split('.')[2];

    if(omok[y][x] != undefined) return

    const num   = (turn) ? 1 : 2;
    omok[y][x]  = num

    $target.className   += ` ${turn ? 'bbb' : 'www'}`
    history.push(`${x}, ${y}, ${num}`)
    turn    = !turn;
    console.log(history)

    if(checkWin(x, y)) {
        alert('win');
        
        $target.closest('tbody').querySelectorAll('td').forEach(element => {
            element.outerHTML   = element.outerHTML;
        });
    }
}

function checkWin(x, y) {
    const num   = omok[y][x];
    let result  = false;
    
    for(let i = -1; i < 2; i++) {
        for(let j = -1; j < 2; j++) {
            if(i == 0 && j == 0) continue;
            if(checkDirect(x, y, i, j, num)) return !result;
        }
    }

    return result;
}

function checkDirect(x, y, i, j, chkNum) {
    let result  = false;
    x   = parseInt(x);
    y   = parseInt(y);
    i   = parseInt(i);
    j   = parseInt(j);

    for(let idx = 1; idx < winPoint; idx++) {
        if(omok[y + j * idx][x + i * idx] != chkNum) return result;
    }
    if(omok[y + j * winPoint][x + i * winPoint] == chkNum) return result;

    result  = true;
    return result;

}

function render($target, msg) {
    $target.innerHTML   = msg;
}