// - 1 - GLOBALS

// Levels options set
var gameSets = [
  { backgroundColor: 'green',
    backgroundImage: 'url(img/soccer/soccer-field.png)',
    borderColor: 'bisque',
    shell: 'ball.png',
    shellTransition: 'top 0.5s, left 0.5s'
  },
  { backgroundColor: '#5cb083',
    backgroundImage: 'url(img/soccer/doge-field.png)',
    borderColor: 'paleturquoise',
    shell: 'doge.png',
    shellTransition: 'top 0.3s, left 0.3s'
  },
  { backgroundColor: 'aqua',
    backgroundImage: 'url(img/soccer/waterpolo-field.png)',
    borderColor: 'white',
    shell: 'polo.png',
    shellTransition: 'top 0.45s, left 0.45s'
  },
  { backgroundColor: '#e8b255',
    backgroundImage: 'url(img/soccer/basketball-field.png)',
    borderColor: 'brown',
    shell: 'basketball.png',
    shellTransition: 'top 0.4s, left 0.4s'
  },
  { backgroundColor: 'black',
    backgroundImage: 'url(img/soccer/peep-field.png)',
    borderColor: 'grey',
    shell: 'peep.png',
    shellTransition: 'top 0.33s, left 0.33s'
  },
  { backgroundColor: '#be5602',
    backgroundImage: 'url(img/soccer/tennis-field.png)',
    borderColor: 'olivedrab',
    shell: 'tennis.png',
    shellTransition: 'top 0.1s, left 0.1s'
  },
  { backgroundColor: '#1a2435',
    backgroundImage: 'url(img/soccer/space-field.png)',
    borderColor: 'midnightblue',
    shell: 'spaceship.png',
    shellTransition: 'top 0.05s, left 0.05s'
  },
  { backgroundColor: 'orange',
    backgroundImage: 'url(img/soccer/heart-field.png)',
    borderColor: 'black',
    shell: 'heart.png',
    shellTransition: 'top 0.17s, left 0.17s'
  },
  { backgroundColor: '#05cae7',
    backgroundImage: 'url(img/soccer/putin-field.png)',
    borderColor: 'lightgoldenrodyellow',
    shell: 'putin.png',
    shellTransition: 'top 0.1s, left 0.1s'
  },
  { backgroundColor: 'indianred',
    backgroundImage: 'url(img/soccer/final-field.png)',
    fieldWidthCoef: 1.33,
    borderColor: '#fadf1c',
    shell: 'final.png',
    shellTransition: 'top 0.033s, left 0.033s'
  }
]

// globals for spaceMass
var freeSpacesCatalogue = [];
var spacesMass = [];
var reservedSpace = [];
var enemyTimer;

/*
      ,
*/


// - 2 - PAGE STARTING SETTINGS

// sets Logo size
setLogoSize();

// sets Carusel spans with images
setCarusel();

// sets functions for arrows
setArrows();

// sets Icons 'onclick'
setIcons();

// sets Jumping toy
jumpingToy();


// - 3 - PAGE ADAPTATION

// sets 'resize' listener to window
window.addEventListener("resize", resizePageAndField, false);

// sets 'resize' listener for menu to window
window.addEventListener("resize", resizeMenu, false);
