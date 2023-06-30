window.addEventListener('DOMContentLoaded', () => {
    let count;
    const form = document.createElement('form');
    const input = document.createElement('input');
    const buttonStart = document.createElement('button');
    const text = document.querySelector('.text');
    input.classList.add('input');
    input.placeholder = 'Введите количетсво карточек';
    input.setAttribute('type', 'number');
    buttonStart.classList.add('btn');
    buttonStart.textContent = 'Поехали';
    form.append(input);
    form.append(buttonStart);
    text.append(form);

    buttonStart.addEventListener('click', (event) => {
        event.preventDefault();
        count = input.value;
        if(count == 0) {
            alert('Это 0!');
            return false; 
        }
        if(count % 2 !== 0) {
            alert('Введите четное число');
            return false;
        }
        if(count > 10) {
            createNumbersArray(4);
        }
        else {
            createNumbersArray(count);
        }
        buttonStart.disabled = true;
        document.getElementById('title').textContent = 60
        nIntervId = setInterval(goTimer, 1000)
        function goTimer() {
            if(document.getElementById('title').textContent != 0) {
                document.getElementById('title').textContent = parseInt(document.getElementById('title').textContent) - 1;
            }
            else {
                alert('вы проиграли!')
                document.getElementById('game').innerHTML = '';
                clearInterval(nIntervId);
                document.getElementById('title').textContent = 'Игра в пары';
                buttonStart.disabled = false;
            }
        }
    })

    class Card {
        _open = false;
        _success = false; 
        constructor(num, action) {
            this.card = document.createElement('div');
            this.card.classList.add('card');
            this.card.textContent = num;
            this.num = num;

            this.card.addEventListener('click', () => {
                if (this.open == false && this.success == false) {
                    this.open = true;
                    action(this)
                }
            })
            document.getElementById('game').append(this.card);
        }
        set open(value) {
            this._open = value;
            if (value) {
            this.card.classList.add('open');
            } else {
            this.card.classList.remove('open');
            }
        }
        get open() {
            return this._open;
        }
    
        set success(value) {
            this._success = value;
            if (value) {
            this.card.classList.add('success');
            } else {
            this.card.classList.remove('success');
            }
        }
        get success() {
            return this._success;
        }
    }

    function createNumbersArray(count) {
        let arrNum = [];
        let arrCard = [];
        firstCard = null;
        secondCard = null;
        for (let i = 1; i <= count / 2; i++) {
            arrNum.push(i);
            arrNum.push(i);
        } 
        arrNum = arrNum.sort(() => Math.random() - 0.5);
        for (const num of arrNum) {
            arrCard.push(new Card(num, flip))
        }
        console.log(arrCard.length)

        function flip(card) {
            if (firstCard !== null && secondCard !== null) {
                if (firstCard.num !== secondCard.num) {
                    firstCard.open = false;
                    secondCard.open = false;
                    firstCard = null;
                    secondCard = null;
                }
            }

            if (firstCard == null) {
                firstCard = card;
            }
            else {
                if (secondCard == null) {
                    secondCard = card;
                }
            }

            if (firstCard !== null && secondCard !== null) {
                if (firstCard.num == secondCard.num) {
                    firstCard.success = true;
                    secondCard.success = true;
                    firstCard = null;
                    secondCard = null;
                }
            }
            console.log(document.querySelectorAll('.card.success').length)
            console.log(document.querySelectorAll('.card.success').length===arrCard.length)

            if (document.querySelectorAll('.card.success').length === arrCard.length) {
                alert('Победа');
                document.getElementById('game').innerHTML = '';
                buttonStart.disabled = false;
                clearInterval(nIntervId);
                document.getElementById('title').textContent = 'Игра в пары';
            }
        }
    }
})



