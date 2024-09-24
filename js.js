;(function () {
    
    function MainBlockManager(mainBlock) {
        this.mainBlock = mainBlock;
        this.currentValue = 0;
        this.isAnimated = false;
        this.isHide = false;

        this.fillCircle = mainBlock.querySelector('.circle-svg__fill');

        // считает длину дуги в зависимости от радиуса окружности
        let radius = this.fillCircle.r.animVal.value;
        this.circleLength = Math.PI * radius * 2;

        // В зависимости от длины дуги и нового значения блока
        // делает длину "штрихованой" на длину окружности для возможности с помощью смещения Dashoffset
        // как полностью заполнить круг, так и "спрятать" заполнение
        // и добавляет анимацию
        this.fillCircle.style.strokeDasharray = this.circleLength;
        this.fillCircle.style.strokeDashoffset = this.circleLength;
        this.fillCircle.style.transition = "stroke-dashoffset 1s linear";

        this.setMod = function (param, value) {
            switch (param) {
                case 'animated':
                    {
                        this.setAnimation(value);
                        break;
                    }
                case 'hidden':
                    {
                        this.setHide(value);
                        break;
                    }
            }
        };

       
        this.setValue = function (newValue) {
            newValue = newValue > 100 ? 100 : newValue;
            newValue = (isNaN(newValue) || newValue < 0) ? 0 : newValue;

            // В зависимости от длины дуги и нового значения блока
            // смещает "заполнение" окружности на соответствующее значение
            let arcLength = ((100 - newValue) / 100) * this.circleLength;

            this.fillCircle.style.strokeDashoffset = arcLength;
        };

       
        this.setAnimation = function (value) {
            if (value.toLowerCase() === 'yes') {
                this.isAnimated = true;
                this.mainBlock.style.webkitAnimationPlayState = 'running';
            } else {
                this.isAnimated = false;
                this.mainBlock.style.webkitAnimationPlayState = 'paused';
            }
        };

        
        this.setHide = function (value) {
            if (value.toLowerCase() === 'yes') {
                this.isHide = true;
                this.mainBlock.style.opacity = '0';
            } else {
                this.isHide = false;
                this.mainBlock.style.opacity = '1';
            }
        }
    };

    window.MainBlockManager = MainBlockManager;
}());

;(function () {
    const mainBlock = document.querySelector('.main-block');

    const mainBlockManager = new MainBlockManager(mainBlock);

    const inputValueLabel = document.querySelector('.block-control__input');

    inputValueLabel.addEventListener('change', function (event) {
        mainBlockManager.setValue(+inputValueLabel.value);
    });

    const setHideLabel = document.querySelector('.checkbox__input_hidden');

    setHideLabel.addEventListener('change', function (event) {
        if (setHideLabel.checked) {
            mainBlockManager.setMod('hidden', 'yes');
        } else {
            mainBlockManager.setMod('hidden', '');
        }
    });

    const setAnimationLabel = document.querySelector('.checkbox__input_animated');

    setAnimationLabel.addEventListener('change', function (event) {
        if (setAnimationLabel.checked) {
            mainBlockManager.setMod('animated', 'yes');
        } else {
            mainBlockManager.setMod('animated', '');
        }
    });
}());