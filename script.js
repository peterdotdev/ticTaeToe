window.onload = () => {

    // Auxiliar function to compare arrays ********************************************************************************************************************
    // Warn if overriding existing method
    if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
    // attach the .equals method to Array's prototype to call it on any array
    Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
    }
    // Hide method from for-in loops
    Object.defineProperty(Array.prototype, "equals", {enumerable: false});
    //*************************************************************************************************************************************


    const gameboard = [0,0,0,0,0,0,0,0,0];
    let plays = 0;
    // Make a circle when you click in a square
    const squares = document.querySelectorAll('.square');
    for (let square of squares) {
        square.addEventListener('click',addCircle);
        square.addEventListener('click',checkPlayerWin);
        square.addEventListener('click',checkDraw);
        square.addEventListener('click',CPUplay);
        square.addEventListener('click',checkPlayerLose);
    }
    function addCircle() {
        if (!this.innerHTML) {
            this.insertAdjacentHTML('beforeend','<div class="circle"></div>');
            switch(true) {
                case (this.classList.contains('square1')):
                    gameboard[0] = 1;
                    break;
                case (this.classList.contains('square2')):
                    gameboard[1] = 1;
                    break;
                case (this.classList.contains('square3')):
                    gameboard[2] = 1;
                    break;
                case (this.classList.contains('square4')):
                    gameboard[3] = 1;
                    break;
                case (this.classList.contains('square5')):
                    gameboard[4] = 1;
                    break;
                case (this.classList.contains('square6')):
                    gameboard[5] = 1;
                    break;
                case (this.classList.contains('square7')):
                    gameboard[6] = 1;
                    break;
                case (this.classList.contains('square8')):
                    gameboard[7] = 1;
                    break;
                case (this.classList.contains('square9')):
                    gameboard[8] = 1;
                    break;
            }
            plays++;
        }
    }

    function checkPlayerWin() {
        if ((gameboard[0]+gameboard[1]+gameboard[2]===3) || (gameboard[3]+gameboard[4]+gameboard[5]===3) || (gameboard[6]+gameboard[7]+gameboard[8]===3) ||
            (gameboard[0]+gameboard[3]+gameboard[6]===3) || (gameboard[1]+gameboard[4]+gameboard[7]===3) || (gameboard[2]+gameboard[5]+gameboard[8]===3) ||
            (gameboard[0]+gameboard[4]+gameboard[8]===3) || (gameboard[2]+gameboard[4]+gameboard[6]===3)) {
            document.body.insertAdjacentHTML('beforeend','<p>YOU WIN!</p><p><a href=".">PLAY AGAIN?</a></p>');
            for (let square of squares) {
                square.removeEventListener('click',addCircle);
                square.removeEventListener('click',checkPlayerWin);
                square.removeEventListener('click',checkPlayerLose);
                square.removeEventListener('click',checkDraw);
            }
        }
    }

    function checkPlayerLose() {
        if ((gameboard[0]+gameboard[1]+gameboard[2]===12) || (gameboard[3]+gameboard[4]+gameboard[5]===12) || (gameboard[6]+gameboard[7]+gameboard[8]===12) ||
            (gameboard[0]+gameboard[3]+gameboard[6]===12) || (gameboard[1]+gameboard[4]+gameboard[7]===12) || (gameboard[2]+gameboard[5]+gameboard[8]===12) ||
            (gameboard[0]+gameboard[4]+gameboard[8]===12) || (gameboard[2]+gameboard[4]+gameboard[6]===12)) {
            document.body.insertAdjacentHTML('beforeend','<p>YOU LOSE!</p><p><a href=".">PLAY AGAIN?</a></p>');
            for (let square of squares) {
                square.removeEventListener('click',addCircle);
                square.removeEventListener('click',checkPlayerWin);
                square.removeEventListener('click',checkPlayerLose);
                square.removeEventListener('click',checkDraw);
            }
    }
    }

    function checkDraw() {
        if (plays===9) {
            document.body.insertAdjacentHTML('beforeend',`<p>IT'S A DRAW!</p><p><a href=".">PLAY AGAIN?</a></p>`);
            for (let square of squares) {
                square.removeEventListener('click',addCircle);
                square.removeEventListener('click',checkPlayerWin);
                square.removeEventListener('click',checkPlayerLose);
                square.removeEventListener('click',checkDraw);
            }
        }
    }

    function CPUplay() {
        
        if (plays===1) {
            if (gameboard.equals([0,0,0,0,1,0,0,0,0])) {
                document.querySelector('.square1').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[0] = 4;
            } else {
                document.querySelector('.square5').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[4] = 4;
            }
            plays++;
        }
        
        if (plays===3) {
            if (gameboard.equals([4,1,0,0,1,0,0,0,0])) {
                document.querySelector('.square8').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[7] = 4;
            } else if (gameboard.equals([4,0,1,0,1,0,0,0,0])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            } else if (gameboard.equals([4,0,0,1,1,0,0,0,0])) {
                document.querySelector('.square6').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[5] = 4;
            } else if (gameboard.equals([4,0,0,0,1,1,0,0,0])) {
                document.querySelector('.square4').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[3] = 4;
            } else if (gameboard.equals([4,0,0,0,1,0,1,0,0])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([4,0,0,0,1,0,0,1,0])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([4,0,0,0,1,0,0,0,1])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([1,1,0,0,4,0,0,0,0])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([1,0,1,0,4,0,0,0,0])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([1,0,0,1,4,0,0,0,0])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            } else if (gameboard.equals([1,0,0,0,4,1,0,0,0])) {
                document.querySelector('.square8').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[7] = 4;
            } else if (gameboard.equals([1,0,0,0,4,0,1,0,0])) {
                document.querySelector('.square4').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[3] = 4;
            } else if (gameboard.equals([1,0,0,0,4,0,0,1,0])) {
                document.querySelector('.square4').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[3] = 4;
            } else if (gameboard.equals([1,0,0,0,4,0,0,0,1])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([0,1,1,0,4,0,0,0,0])) {
                document.querySelector('.square1').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[0] = 4;
            } else if (gameboard.equals([0,1,0,1,4,0,0,0,0])) {
                document.querySelector('.square1').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[0] = 4;
            } else if (gameboard.equals([0,1,0,0,4,1,0,0,0])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([0,1,0,0,4,0,1,0,0])) {
                document.querySelector('.square1').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[0] = 4;
            } else if (gameboard.equals([0,1,0,0,4,0,0,1,0])) {
                document.querySelector('.square1').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[0] = 4;
            } else if (gameboard.equals([0,1,0,0,4,0,0,0,1])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([0,0,1,1,4,0,0,0,0])) {
                document.querySelector('.square1').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[0] = 4;
            } else if (gameboard.equals([0,0,1,0,4,1,0,0,0])) {
                document.querySelector('.square9').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[8] = 4;
            } else if (gameboard.equals([0,0,1,0,4,0,1,0,0])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([0,0,1,0,4,0,0,1,0])) {
                document.querySelector('.square6').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[5] = 4;
            } else if (gameboard.equals([0,0,1,0,4,0,0,0,1])) {
                document.querySelector('.square6').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[5] = 4;
            } else if (gameboard.equals([0,0,0,1,4,1,0,0,0])) {
                document.querySelector('.square1').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[0] = 4;
            } else if (gameboard.equals([0,0,0,1,4,0,1,0,0])) {
                document.querySelector('.square1').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[0] = 4;
            } else if (gameboard.equals([0,0,0,1,4,0,0,1,0])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            } else if (gameboard.equals([0,0,0,1,4,0,0,0,1])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            } else if (gameboard.equals([0,0,0,0,4,1,1,0,0])) {
                document.querySelector('.square9').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[8] = 4;
            } else if (gameboard.equals([0,0,0,0,4,1,0,1,0])) {
                document.querySelector('.square9').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[8] = 4;
            } else if (gameboard.equals([0,0,0,0,4,1,0,0,1])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([0,0,0,0,4,0,1,1,0])) {
                document.querySelector('.square9').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[8] = 4;
            } else if (gameboard.equals([0,0,0,0,4,0,1,0,1])) {
                document.querySelector('.square8').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[7] = 4;
            } else if (gameboard.equals([0,0,0,0,4,0,0,1,1])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            }
            plays++;
        }

        if (plays===5) {
            if (gameboard[0]+gameboard[1]+gameboard[2]===8) {
                if (gameboard[2]===0) {
                    document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[2] = 4;
                } else if (gameboard[1]===0) {
                    document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[1] = 4;
                } else {
                    document.querySelector('.square1').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[0] = 4;
                }
            } else if (gameboard[3]+gameboard[4]+gameboard[5]===8) {
                if (gameboard[3]===0) {
                    document.querySelector('.square4').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[3] = 4;
                } else if (gameboard[4]===0) {
                    document.querySelector('.square5').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[4] = 4;
                } else {
                    document.querySelector('.square6').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[5] = 4;
                }
            } else if (gameboard[6]+gameboard[7]+gameboard[8]===8) {
                if (gameboard[6]===0) {
                    document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[6] = 4;
                } else if (gameboard[7]===0) {
                    document.querySelector('.square8').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[7] = 4;
                } else {
                    document.querySelector('.square9').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[8] = 4;
                }
            } else if (gameboard[0]+gameboard[3]+gameboard[6]===8) {
                if (gameboard[0]===0) {
                    document.querySelector('.square1').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[0] = 4;
                } else if (gameboard[3]===0) {
                    document.querySelector('.square4').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[3] = 4;
                } else {
                    document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[6] = 4;
                }
            } else if (gameboard[1]+gameboard[4]+gameboard[7]===8) {
                if (gameboard[1]===0) {
                    document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[1] = 4;
                } else if (gameboard[4]===0) {
                    document.querySelector('.square5').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[4] = 4;
                } else {
                    document.querySelector('.square8').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[7] = 4;
                }
            } else if (gameboard[2]+gameboard[5]+gameboard[8]===8) {
                if (gameboard[2]===0) {
                    document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[2] = 4;
                } else if (gameboard[5]===0) {
                    document.querySelector('.square6').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[5] = 4;
                } else {
                    document.querySelector('.square9').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[8] = 4;
                }
            } else if (gameboard[0]+gameboard[4]+gameboard[8]===8) {
                if (gameboard[0]===0) {
                    document.querySelector('.square1').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[0] = 4;
                } else if (gameboard[4]===0) {
                    document.querySelector('.square5').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[4] = 4;
                } else {
                    document.querySelector('.square9').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[8] = 4;
                }
            } else if (gameboard[2]+gameboard[4]+gameboard[6]===8) {
                if (gameboard[2]===0) {
                    document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[2] = 4;
                } else if (gameboard[4]===0) {
                    document.querySelector('.square5').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[4] = 4;
                } else {
                    document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[6] = 4;
                }
            } else if (gameboard.equals([1,1,4,1,4,0,0,0,0])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            } else if (gameboard.equals([1,1,4,0,4,1,0,0,0])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            } else if (gameboard.equals([1,1,4,0,4,0,1,0,0])) {
                document.querySelector('.square4').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[3] = 4;
            } else if (gameboard.equals([1,1,4,0,4,0,0,1,0])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            } else if (gameboard.equals([1,1,4,0,4,0,0,0,1])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            } else if (gameboard.equals([1,4,1,1,4,0,0,0,0])) {
                document.querySelector('.square8').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[7] = 4;
            } else if (gameboard.equals([1,4,1,0,4,1,0,0,0])) {
                document.querySelector('.square8').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[7] = 4;
            } else if (gameboard.equals([1,4,1,0,4,0,1,0,0])) {
                document.querySelector('.square8').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[7] = 4;
            } else if (gameboard.equals([1,4,1,0,4,0,0,1,0])) {
                document.querySelector('.square4').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[3] = 4;
            } else if (gameboard.equals([1,4,1,0,4,0,0,0,1])) {
                document.querySelector('.square8').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[7] = 4;
            } else if (gameboard.equals([1,1,0,1,4,0,4,0,0])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([1,0,1,1,4,0,4,0,0])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([1,0,0,1,4,1,4,0,0])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([1,0,0,1,4,0,4,1,0])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([1,0,0,1,4,0,4,0,1])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([1,1,0,0,4,1,0,4,0])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([1,0,1,0,4,1,0,4,0])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([1,0,0,1,4,1,0,4,0])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([1,0,0,0,4,1,1,4,0])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([1,0,0,0,4,1,0,4,1])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([1,1,0,4,4,0,1,0,0])) {
                document.querySelector('.square6').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[5] = 4;
            } else if (gameboard.equals([1,0,1,4,4,0,1,0,0])) {
                document.querySelector('.square6').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[5] = 4;
            } else if (gameboard.equals([1,0,0,4,4,1,1,0,0])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([1,0,0,4,4,0,1,1,0])) {
                document.querySelector('.square6').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[5] = 4;
            } else if (gameboard.equals([1,0,0,4,4,0,1,0,1])) {
                document.querySelector('.square6').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[5] = 4;
            } else if (gameboard.equals([1,1,0,4,4,0,0,1,0])) {
                document.querySelector('.square6').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[5] = 4;
            } else if (gameboard.equals([1,0,1,4,4,0,0,1,0])) {
                document.querySelector('.square6').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[5] = 4;
            } else if (gameboard.equals([1,0,0,4,4,1,0,1,0])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([1,0,0,4,4,0,1,1,0])) {
                document.querySelector('.square6').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[5] = 4;
            } else if (gameboard.equals([1,0,0,4,4,0,0,1,1])) {
                document.querySelector('.square6').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[5] = 4;
            } else if (gameboard.equals([1,4,1,0,4,0,0,0,1])) {
                document.querySelector('.square8').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[7] = 4;
            } else if (gameboard.equals([1,4,0,1,4,0,0,0,1])) {
                document.querySelector('.square8').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[7] = 4;
            } else if (gameboard.equals([1,4,0,0,4,1,0,0,1])) {
                document.querySelector('.square8').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[7] = 4;
            } else if (gameboard.equals([1,4,0,0,4,0,1,0,1])) {
                document.querySelector('.square8').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[7] = 4;
            } else if (gameboard.equals([1,4,0,0,4,0,0,1,1])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            } else if (gameboard.equals([4,1,1,0,1,0,0,4,0])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            } else if (gameboard.equals([4,1,0,1,1,0,0,4,0])) {
                document.querySelector('.square6').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[5] = 4;
            } else if (gameboard.equals([4,1,0,0,1,1,0,4,0])) {
                document.querySelector('.square4').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[3] = 4;
            } else if (gameboard.equals([4,1,0,0,1,0,1,4,0])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([4,1,0,0,1,0,0,4,1])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            } else if (gameboard.equals([4,1,1,0,1,0,4,0,0])) {
                document.querySelector('.square4').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[3] = 4;
            } else if (gameboard.equals([4,0,1,1,1,0,4,0,0])) {
                document.querySelector('.square6').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[5] = 4;
            } else if (gameboard.equals([4,0,1,0,1,1,4,0,0])) {
                document.querySelector('.square4').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[3] = 4;
            } else if (gameboard.equals([4,0,1,0,1,0,4,1,0])) {
                document.querySelector('.square4').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[3] = 4;
            } else if (gameboard.equals([4,0,1,0,1,0,4,0,1])) {
                document.querySelector('.square4').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[3] = 4;
            } else if (gameboard.equals([4,1,0,1,1,4,0,0,0])) {
                document.querySelector('.square8').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[7] = 4;
            } else if (gameboard.equals([4,0,1,1,1,4,0,0,0])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            } else if (gameboard.equals([4,0,0,1,1,4,1,0,0])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([4,0,0,1,1,4,0,1,0])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([4,0,0,1,1,4,0,0,1])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([4,1,0,4,1,1,0,0,0])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            } else if (gameboard.equals([4,0,1,4,1,1,0,0,0])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            } else if (gameboard.equals([4,0,0,4,1,1,1,0,0])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([4,0,0,4,1,1,0,1,0])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            } else if (gameboard.equals([4,0,0,4,1,1,0,0,1])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            } else if (gameboard.equals([4,1,4,0,1,0,1,0,0])) {
                document.querySelector('.square8').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[7] = 4;
            } else if (gameboard.equals([4,0,4,1,1,0,1,0,0])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([4,0,4,0,1,1,1,0,0])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([4,0,4,0,1,0,1,1,0])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([4,0,4,0,1,0,1,0,1])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([4,4,1,0,1,0,0,1,0])) {
                document.querySelector('.square7').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[6] = 4;
            } else if (gameboard.equals([4,4,0,1,1,0,0,1,0])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([4,4,0,0,1,1,0,1,0])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([4,4,0,0,1,0,1,1,0])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([4,4,0,0,1,0,0,1,1])) {
                document.querySelector('.square3').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[2] = 4;
            } else if (gameboard.equals([4,1,4,0,1,0,0,0,1])) {
                document.querySelector('.square8').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[7] = 4;
            } else if (gameboard.equals([4,0,4,1,1,0,0,0,1])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([4,0,4,0,1,1,0,0,1])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([4,0,4,0,1,0,1,0,1])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([4,0,4,0,1,0,0,1,1])) {
                document.querySelector('.square2').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[1] = 4;
            } else if (gameboard.equals([4,1,1,1,4,0,0,0,0])) {
                document.querySelector('.square9').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[8] = 4;
            } else if (gameboard.equals([4,1,1,0,4,1,0,0,0])) {
                document.querySelector('.square9').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[8] = 4;
            } else if (gameboard.equals([4,0,1,1,4,1,0,0,0])) {
                document.querySelector('.square9').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[8] = 4;
            } else if (gameboard.equals([4,0,1,1,4,0,1,0,0])) {
                document.querySelector('.square9').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[8] = 4;
            } else if (gameboard.equals([4,0,1,1,4,0,0,1,0])) {
                document.querySelector('.square9').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[8] = 4;
            } else if (gameboard.equals([4,0,1,1,4,0,0,0,1])) {
                document.querySelector('.square6').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[5] = 4;
            } else if (gameboard.equals([0,0,1,0,4,1,1,0,4])) {
                document.querySelector('.square1').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[0] = 4;
            } else if (gameboard.equals([0,0,1,0,4,1,0,1,4])) {
                document.querySelector('.square1').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[0] = 4;
            } else if (gameboard.equals([0,4,1,1,4,0,1,0,0])) {
                document.querySelector('.square8').insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[7] = 4;
            } else {
                const firstZero = gameboard.indexOf(0);
                const lastZero = gameboard.lastIndexOf(0);
                if (Math.random() < 0.5) {
                    document.querySelector(`.square${firstZero+1}`).insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[firstZero] = 4;
                } else {
                    document.querySelector(`.square${lastZero+1}`).insertAdjacentHTML('beforeend','<div class="cross"></div>');
                    gameboard[lastZero] = 4;
                };
            }
            plays++;
        }

        if (plays===7) {
            const firstZero = gameboard.indexOf(0);
            const lastZero = gameboard.lastIndexOf(0);
            if (Math.random() < 0.5) {
                document.querySelector(`.square${firstZero+1}`).insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[firstZero] = 4;
            } else {
                document.querySelector(`.square${lastZero+1}`).insertAdjacentHTML('beforeend','<div class="cross"></div>');
                gameboard[lastZero] = 4;
            };
            plays++;
        }
    }
}