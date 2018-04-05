
function addMenuOptions(game) {
    for (var i = 0; i < 3; i++) {
      var option = createMenuButton(i, game);
      document.getElementsByClassName('menu-div')[0].appendChild(option);
    }
  setFirstButton();
}


function chooseGame(game) {
    if (document.getElementsByClassName('menu-div')[0]) {
      exitGame();
    }
  createField(gameSets[game]);
  createMenu();
  addMenuOptions(game);
}


function clearGlobalMass() {
  freeSpacesCatalogue = [];
  reservedSpace = [];
  spacesMass = [];
}


function createField(obj) {
  var field =  document.getElementsByClassName('field')[0];
    field.onclick = onclickField;

  setFieldBaseParams(field, obj);
  setFieldSize(field);
  setBall(obj.shell, obj.shellTransition);
  document.getElementsByClassName('playground')[0].scrollIntoView();
    document.documentElement.style.overflow = 'hidden';
    document.getElementsByClassName('footer')[0].setAttribute('hidden', true);
}


function createMenu() {
  var menuDiv = document.createElement('div');
    menuDiv.classList.add('menu-div');
    menuDiv.style.width = document.documentElement.clientWidth + 'px';
    menuDiv.style.top = window.pageYOffset + 'px';
    menuDiv.style.height = (document.documentElement.clientHeight + 100) + 'px';

  deleteToy()
  document.body.appendChild(menuDiv);
}


function createMenuButton(optionNumber, game) {
  var menuOptions = [
    ['Start Game', function() { startGame(game) }],
    ['Resume Game', continueGame],
    ['Exit Game', exitGame]
  ];

  var button = document.createElement('button');
    button.classList.add('option-button');
    button.innerHTML = menuOptions[optionNumber][0];
    button.onclick = menuOptions[optionNumber][1];
      if (optionNumber === 1) {
        button.setAttribute('hidden', true);
      }

  return button;
}


function createToy() {
  var toysMass = ['ball.png', 'doge.png', 'polo.png', 'basketball.png',
                  'peep.png', 'tennis.png', 'spaceship.png', 'heart.png',
                  'putin.png', 'final.png'];

  var toy = document.createElement('div');
    toy.classList.add('toy-div');
    toy.innerHTML = '<img class="toy" style="width: 64px" src="img/soccer/' +
                    toysMass[parseInt(Math.random() * 9.99)] + '">';

  return toy;
}


function deleteToy() {
  var toy = document.getElementsByClassName('toy-div')[0];
    if (toy) document.body.removeChild(toy);
    document.body.onclick = ''
}


function exitGame() {
  stopTimer();
  clearGlobalMass();
  var field =  document.getElementsByClassName('field')[0];
    field.innerHTML = '';
    field.setAttribute('hidden', true);

  document.getElementsByClassName('footer')[0].removeAttribute('hidden');
  document.body.removeChild(document.getElementsByClassName('menu-div')[0]);
  document.getElementsByClassName('header')[0].scrollIntoView();

  jumpingToy();
}


// NOT USED
function includeJS(url) {
  var script = document.createElement('script');
    script.src = url;
  return script;
}


function jumpingToy() {
  var minTop = document.getElementsByClassName('carusel')[0].
          getBoundingClientRect().bottom + 10;
  var freeSpace = document.documentElement.clientHeight - minTop - 64;

    if (freeSpace > 100 ) {
      var toy = createToy();
        toy.style.top = (minTop + Math.random() * freeSpace) + 'px';
        toy.style.left = (document.documentElement.clientWidth / 2 - 32) + 'px';

      document.body.appendChild(toy);
      document.body.onclick = onclickBody;
    }
}


function onclickArrow(side) {
  var imgMass = document.getElementsByClassName('inner-span');
  var computedWidth = parseInt(getComputedStyle(imgMass[0].children[0]).width) +
                      parseInt(getComputedStyle(imgMass[0].children[0]).paddingLeft);

    for (var i = 0; i < imgMass.length; i++) {
      var left = parseInt(imgMass[i].style.left) || 0;
        if (side === 'left') {
          if (left >=  0) { imgMass[i].style.left = '0px'; break; }
          imgMass[i].style.left = (left + computedWidth) + 'px';
        } else {
          if (left <  document.getElementsByClassName('carusel')[0].offsetWidth -
            (imgMass.length + 1) * computedWidth) break;
          imgMass[i].style.left = (left - computedWidth) + 'px';
        }
    }
}


function onclickBody() {
  var headerBottom = document.getElementsByClassName('header')[0].
                     getBoundingClientRect().bottom;
  var toy = document.getElementsByClassName('toy-div')[0];
  var x = event.clientX;
  var y = event.clientY;

    if (x > document.body.clientWidth - toy.clientWidth)  {
      x = document.body.clientWidth - toy.clientWidth;
    } else if (x < 0) x = 0;

    if (y > document.body.clientHeight - toy.clientHeight)  {
      y = document.body.clientHeight - toy.clientHeight
    } else if (y < headerBottom) y = headerBottom;

    toy.style.top = y + 'px';
    toy.style.left = x + 'px';
}


function onclickField() {
  var ball = document.getElementsByClassName('ball-div')[0];
  var field = document.getElementsByClassName('field')[0];
  var x = event.clientX - field.getBoundingClientRect().left - 10;
  var y = event.clientY - field.getBoundingClientRect().top - 10;

    if (x > field.clientWidth - ball.clientWidth)  {
      x = field.clientWidth - ball.clientWidth;
    } else if (x < 0) x = 0;

    if ( y > field.clientHeight - ball.clientHeight )  {
      y = field.clientHeight - ball.clientHeight;
    } else if (y < 0) y = 0;

    ball.style.top = y + 'px';
    ball.style.left = x + 'px';
}


function resizeMenu() {
  var menuDiv = document.getElementsByClassName('menu-div')[0];
    if (menuDiv) {
        menuDiv.style.width = document.documentElement.clientWidth + 'px';
        menuDiv.style.top = window.pageYOffset + 'px';
        menuDiv.style.height = (document.documentElement.clientHeight + 100) + 'px';
      deleteToy();
    }
}


function resizePageAndField() {
  setLogoSize();
  setCaruselResized();
  setFieldResized();
  deleteToy();
  jumpingToy();
  document.getElementsByClassName('playground')[0].scrollIntoView();
    if (document.getElementsByClassName('menu-div')[0]) setFirstButton();
    if (document.getElementsByClassName('enemy-div')[0]) changeMassSpaces();
}


function setArrows() {
  var arrows = document.getElementsByClassName('arrow');
    arrows[0].addEventListener('click', function() { onclickArrow('left'); });
    arrows[1].addEventListener('click', function() { onclickArrow('right'); });
}


function setBall(file, speed) {
  var ball = document.createElement('div');
    ball.innerHTML = '<img class="ball" style="width: 64px" src="img/soccer/' + file + '">';
    ball.classList.add('ball-div');
    ball.style.transition = speed;

  document.getElementsByClassName('field')[0].appendChild(ball);
  setBallPosition();
}


function setBallPosition() {
  var field = document.getElementsByClassName('field')[0];
  var ball = document.getElementsByClassName('ball-div')[0];
  var ballWidth = parseInt(getComputedStyle(field).width) / 10;
    ball.children[0].style.width = ballWidth + 'px';
    ball.style.top = (field.clientHeight - ballWidth) / 2 + 'px';
    ball.style.left = (field.clientWidth - ballWidth) / 2 + 'px';
}


function setCarusel() {
  var carusel = document.getElementsByClassName('carusel')[0];

    for (var i = 1; i <= 10; i++) {
      var img = document.createElement('img');
      var span = document.createElement('span');
        img.classList.add('carusel-img');
        span.classList.add('inner-span');
        img.setAttribute('src', 'img/carusel/carusel' + i + '.jpg');
      span.appendChild(img);
      carusel.appendChild(span);
    }
}


function setCaruselResized() {
  var imgMass = document.getElementsByClassName('inner-span');
    for (var i = 0; i < imgMass.length; i++) {
      imgMass[i].style.left = '0px';
    }
}


function setFieldBaseParams(node, obj) {
  node.innerHTML = '';
  node.style.backgroundColor = obj.backgroundColor;
  node.style.backgroundImage = obj.backgroundImage;
  node.style.backgroundRepeat = 'no-repeat';
  node.style.backgroundSize = '100% 100%';
  node.style.borderColor = obj.borderColor;
  node.removeAttribute('hidden');
}


function setFieldResized() {
  var field =  document.getElementsByClassName('field')[0];
    if (document.getElementsByClassName('ball-div')[0]) {
      setFieldSize(field);
      setBallPosition();
    }
}


function setFieldSize(node) {
  var winWidth = document.documentElement.clientWidth;
  var winHeight = document.documentElement.clientHeight;
    if (winHeight > winWidth) {
      node.style.width = (winWidth - 20) + 'px';
      node.style.height = (winWidth * 0.66) + 'px';
// ! var heightError = node.getBoundingClientRect().bottom - document.documentElement.clientHeight;
    } else {
      node.style.width = (winWidth - 20) + 'px';
      node.style.height = (winHeight - 20) + 'px';
    }
}


function setFirstButton() {
    if (document.documentElement.clientHeight > document.documentElement.clientWidth) {
      document.getElementsByClassName('menu-div')[0].children[0].style.marginTop = '66%';
    } else {
      document.getElementsByClassName('menu-div')[0].children[0].style.marginTop = '20%';
    }
}


function setIcons() {
  var gameIcons = document.getElementsByClassName('carusel-img');
    for (var i = 0; i < gameIcons.length; i++) {
      gameIcons[i].setAttribute('onclick', 'chooseGame(' + i + ')');
  }
}


function setLogoSize() {
  var logo = document.getElementsByClassName('logo')[0];
    logo.style.width = logo.parentNode.clientHeight * 0.9 + 'px';
}


function stopTimer() {
  clearInterval(enemyTimer);
}


/*  NOW  WORKING ON  */

function startGame(game) {

  createSpaces();
  createEnemiesOnStart(game);
  var timeToNewEnemy = [2000, 1850, 1700, 1550, 1400, 1250, 1100, 950, 800, 650];
  enemyTimer = setInterval( function() {
    if (document.getElementsByClassName('field')[0].children.length > 25 ||
      spacesMass.length === 0) {
      exitGame()
      return;
    }
    addEnemy(game);
  } , timeToNewEnemy[game] );

  var menuDiv = document.getElementsByClassName('menu-div')[0];
    menuDiv.setAttribute('hidden', true);
  getOnReservedPosition();

}


function createEnemiesOnStart(game) {

  var gameNames = ['soccer', '', '', '', '', '', '', '', '', ''];
  var field = document.getElementsByClassName('field')[0];

  for (var i = 0; i < 10; i++) {
    var enemyDiv = document.createElement('div');
      enemyDiv.classList.add('enemy-div');
      enemyDiv.innerHTML = '<img src="img/enemies/' + gameNames[game] + i + '.png" style="width: 32px">';

    field.appendChild(enemyDiv);
    setEnemyPosition(enemyDiv);
  }

}

function addEnemy(game) {

  var gameNames = ['soccer', '', '', '', '', '', '', '', '', ''];
  var randomEnemy = Math.floor( Math.random() * 2.99 );
  var field = document.getElementsByClassName('field')[0];
  var enemyDiv = document.createElement('div');
    enemyDiv.classList.add('enemy-div');
    enemyDiv.innerHTML = '<img src="img/enemies/' + gameNames[game] + '-add' + randomEnemy + '.png" style="width: 32px">';

    setEnemyPosition(enemyDiv);
    field.appendChild(enemyDiv);

}


function setEnemyPosition(node, some=false) {
  var enemyWidth = parseInt(getComputedStyle(document.
                   getElementsByClassName('field')[0]).width) / 10;
  var enemyPlace = findFreeSpaceForEnemy(node, some);
    node.children[0].style.width = enemyWidth + 'px';
    node.style.top = enemyPlace.top;
    node.style.left = enemyPlace.left;
    node.style.opacity = '0.05';
  setTimeout( function () { node.style.opacity = '0.8'; }, 0);
}


function findFreeSpaceForEnemy(node, some) {
  var randomSeed = Math.floor( Math.random() * (freeSpacesCatalogue.length - 0.01) );
  var slot = freeSpacesCatalogue.splice(randomSeed, 1)[0];
    slot.enemy = node;
    if (some === false) {
      spacesMass.push(slot);
    }
  return { top: slot.top, left: slot.left };
}


function createSpaces() {
  var fieldSize = getComputedStyle(document.getElementsByClassName('field')[0])
  var slotWidth = parseInt(fieldSize.width) / 10;
  var heightSlots = Math.floor(parseInt(fieldSize.height) / slotWidth);

    for (var i = 0; i < heightSlots; i++) {
      for (var j = 0; j < 9; j++) {
        var slot = {};
          slot.left = (slotWidth / 2 + j * slotWidth) + 'px';
          slot.top = (i * slotWidth) + 'px';
          slot.enemy = false;
        freeSpacesCatalogue.push(slot);

        if ( (j === 3) || (j === 4) || (j === 5) ) {
          var tempI = heightSlots - Math.floor(heightSlots / 2);
          if ( (i === tempI) || (i === (tempI - 1) ) || ( i === (tempI - 2) ) ) {
            reservedSpace.push( freeSpacesCatalogue.pop() );
            }
        }
      }
    }
}


function createSpacesResize() {
  var newSpacesCatalogue = [];
  var fieldSize = getComputedStyle(document.getElementsByClassName('field')[0])
  var slotWidth = parseInt(fieldSize.width) / 10;
  var heightSlots = Math.floor(parseInt(fieldSize.height) / slotWidth);

    for (var i = 0; i < heightSlots; i++) {
      for (var j = 0; j < 9; j++) {
        var slot = {};
          slot.left = (slotWidth / 2 + j * slotWidth) + 'px';
          slot.top = (i * slotWidth) + 'px';
          slot.enemy = false;
        newSpacesCatalogue.push(slot);
      }
    }
  freeSpacesCatalogue = newSpacesCatalogue;
}


function changeMassSpaces() {
  createSpacesResize();
  setTimeout( function() {
    for (var i = 0; i < spacesMass.length; i++) {
      setEnemyPosition( spacesMass[i].enemy, true );
    }
  }, 0);
}


function getOnReservedPosition() {
  for (var i = 0; i < reservedSpace.length; i++) {
    freeSpacesCatalogue.push( reservedSpace.splice(i, 1)[0] );
  }
}



function gameOver() {}
function continueGame() {}
