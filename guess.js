window.onload = function () {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

    var categories;         // Array of topics
    var chosenCategory;     // Selected catagory
    var getHint ;          // Word getHint
    var word ;              // Selected word
    var guess ;             // Geuss
    var geusses = [ ];      // Stored geusses
    var lives ;             // Lives
    var counter ;           // Count correct geusses
    var space;              // Number of spaces in word '-'

    // Get elements
    var showLives = document.getElementById("mylives");
    var showCatagory = document.getElementById("scatagory");
    var getHint = document.getElementById("hint");
    var showClue = document.getElementById("clue");



    // create alphabet ul
    var buttons = function () {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');

        for (var i = 0; i < alphabet.length; i++) {
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    }


    // Select Catagory
    var selectCat = function () {
        if (chosenCategory === categories[0]) {
            catagoryName.innerHTML = "The Chosen Category Is Premier League Football Teams";
        } else if (chosenCategory === categories[1]) {
            catagoryName.innerHTML = "The Chosen Category Is Films";
        } else if (chosenCategory === categories[2]) {
            catagoryName.innerHTML = "The Chosen Category Is Cities";
        }
    }

    // Create geusses ul
    result = function () {
        wordHolder = document.getElementById('hold');
        correct = document.createElement('ul');

        for (var i = 0; i < word.length; i++) {
            correct.setAttribute('id', 'my-word');
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            if (word[i] === "-") {
                guess.innerHTML = "-";
                space = 1;
            } else {
                guess.innerHTML = "_";
            }

            geusses.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    }

    // Show lives
    comments = function () {
        showLives.innerHTML = "Você tem " + lives + " tentativas";
        if (lives < 1) {
            showLives.innerHTML = "Game Over";
        }
        for (var i = 0; i < geusses.length; i++) {
            if (counter + space === geusses.length) {
                showLives.innerHTML = "Acertou!";
            }
        }
    }


    // OnClick Function
    check = function () {
        list.onclick = function () {
            var geuss = (this.innerHTML);
            this.setAttribute("class", "active");
            this.onclick = null;

            if ((lives > 0)) {


                for (var i = 0; i < word.length; i++) {
                    if (word[i] === geuss) {
                        geusses[i].innerHTML = geuss;
                        counter += 1;
                    }
                }
                var j = (word.indexOf(geuss));
                if (j === -1) {
                    lives -= 1;
                    comments();
                    //animate(); --removing stick man
                    shakeit();
                } else {
                    comments();
                }
            }else{
                shakeit();
            }
        }
    }


    // Play
    play = function () {
        categories = [
            /*["everton", "liverpool", "swansea", "chelsea", "hull", "manchester-city", "newcastle-united"],
            ["alien", "dirty-harry", "gladiator", "finding-nemo", "jaws"],
            ["manchester", "milan", "madrid", "amsterdam", "prague"]*/
            ["kazoo"]
        ];

        chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
        word = word.replace(/\s/g, "-");
        //console.log(word);
        buttons();

        geusses = [ ];
        lives = 5;
        counter = 0;
        space = 0;
        result();
        comments();
    }

    play();

    // Hint

    hint.onclick = function() {

        hints = [
           /* ["Based in Mersyside", "Based in Mersyside", "First Welsh team to reach the Premier Leauge", "Owned by A russian Billionaire", "Once managed by Phil Brown", "2013 FA Cup runners up", "Gazza's first club"],
            ["Science-Fiction horror film", "1971 American action film", "Historical drama", "Anamated Fish", "Giant great white shark"],
            ["Northern city in the UK", "Home of AC and Inter", "Spanish capital", "Netherlands capital", "Czech Republic capital"]*/
           ["Pode ser feito de metal ou de plástico", "É um instrumento músical", "Foi inventado na Africa"]
        ];

        var catagoryIndex = categories.indexOf(chosenCategory);
        var hintIndex = getRandomArbitrary(0,hints [catagoryIndex].length);
        showClue.innerHTML = "Dica:  " +  hints [catagoryIndex][parseInt(hintIndex)];
    };

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }


    // Reset

    document.getElementById('reset').onclick = function() {
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        context.clearRect(0, 0, 400, 400);
        play();
    }

    var shakeit = function () {

        shake(document.getElementById("shakeit"));
    }


    //SHAKE IT
    var shakingElements = [];


    var shake = function (element, magnitude = 16, angular = false) {
        //First set the initial tilt angle to the right (+1)
        var tiltAngle = 1;

        //A counter to count the number of shakes
        var counter = 1;

        //The total number of shakes (there will be 1 shake per frame)
        var numberOfShakes = 15;

        //Capture the element's position and angle so you can
        //restore them after the shaking has finished
        var startX = 0,
            startY = 0,
            startAngle = 0;

        // Divide the magnitude into 10 units so that you can
        // reduce the amount of shake by 10 percent each frame
        var magnitudeUnit = magnitude / numberOfShakes;

        //The `randomInt` helper function
        var randomInt = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        //Add the element to the `shakingElements` array if it
        //isn't already there
        if(shakingElements.indexOf(element) === -1) {
            //console.log("added")
            shakingElements.push(element);

            //Add an `updateShake` method to the element.
            //The `updateShake` method will be called each frame
            //in the game loop. The shake effect type can be either
            //up and down (x/y shaking) or angular (rotational shaking).
            if(angular) {
                angularShake();
            } else {
                upAndDownShake();
            }
        }

        //The `upAndDownShake` function
        function upAndDownShake() {

            //Shake the element while the `counter` is less than
            //the `numberOfShakes`
            if (counter < numberOfShakes) {

                //Reset the element's position at the start of each shake
                element.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';

                //Reduce the magnitude
                magnitude -= magnitudeUnit;

                //Randomly change the element's position
                var randomX = randomInt(-magnitude, magnitude);
                var randomY = randomInt(-magnitude, magnitude);

                element.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';

                //Add 1 to the counter
                counter += 1;

                requestAnimationFrame(upAndDownShake);
            }

            //When the shaking is finished, restore the element to its original
            //position and remove it from the `shakingElements` array
            if (counter >= numberOfShakes) {
                element.style.transform = 'translate(' + startX + ', ' + startY + ')';
                shakingElements.splice(shakingElements.indexOf(element), 1);
            }
        }

        //The `angularShake` function
        function angularShake() {
            if (counter < numberOfShakes) {
                //console.log(tiltAngle);
                //Reset the element's rotation
                element.style.transform = 'rotate(' + startAngle + 'deg)';

                //Reduce the magnitude
                magnitude -= magnitudeUnit;

                //Rotate the element left or right, depending on the direction,
                //by an amount in radians that matches the magnitude
                var angle = Number(magnitude * tiltAngle).toFixed(2);
                //console.log(angle);
                element.style.transform = 'rotate(' + angle + 'deg)';
                counter += 1;

                //Reverse the tilt angle so that the element is tilted
                //in the opposite direction for the next shake
                tiltAngle *= -1;

                requestAnimationFrame(angularShake);
            }

            //When the shaking is finished, reset the element's angle and
            //remove it from the `shakingElements` array
            if (counter >= numberOfShakes) {
                element.style.transform = 'rotate(' + startAngle + 'deg)';
                shakingElements.splice(shakingElements.indexOf(element), 1);
                //console.log("removed")
            }
        }

    };
}


