import {
  Application,
  Loader,
  Sprite,
  TextureCache,
  Rectangle,
  Graphics,
  Text,
  AnimatedSprite
} from './utils/aliase.js';
import { keyboard, randomInt } from './utils/util.js';

function createApp(params) {
  // 创建一块显示图片的区域
  let app = new Application({
    transparent: true
  });
  //Add the canvas that Pixi automatically created for you to the HTML document
  document.body.appendChild(app.view);
  
  console.log(app.renderer.view.width) // 画布的宽
  console.log(app.renderer.view.height) // 画布的高
  
  // 画布设置为全屏
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);

  // // 加载一张图像
  const loader = new Loader();
  loader
    .add([
      "assets/images/treasureHunter.json"
    ])
    .load(setup);

  loader.onProgress.add(loadProgressHandler); // called once per loaded/errored file

  function loadProgressHandler (loader, resource) {
    console.log("loading");
    console.log(loader.progress) // 现在图片加载的进度
    console.log(resource.url) // 现在什么图片加载完成了
  }

  let state; // 游戏状态
  let hunter, dungeon, treasure, door, blobs = []; // 精灵
  function setup() {
    console.log('app.stage', app.stage)
    let id = loader.resources["assets/images/treasureHunter.json"].textures;
    
    // 背景
    dungeon = new Sprite(id['dungeon.png']);
    app.stage.addChild(dungeon);
    
    // 猎人
    hunter = new Sprite(id['explorer.png']);
    hunter.x = 68;
    hunter.y = app.stage.height / 2 - hunter.height / 2;
    app.stage.addChild(hunter);

    // 宝物
    treasure = new Sprite(id['treasure.png'])
    treasure.x = app.stage.width - treasure.width - 68;
    treasure.y = app.stage.height / 2 - treasure.height / 2;
    app.stage.addChild(treasure);

    // 门
    door = new Sprite(id['door.png'])
    door.x = 32
    app.stage.addChild(door);

    // 怪
    let spacing = 48, xoffset = 150;
    let speed = 1, direction = -1;
    for (let i = 0; i < 5; i++) {
      let blob = new Sprite(id['blob.png']);
      let x = spacing * i + xoffset;
      let y = randomInt(0, app.stage.height - blob.height);
      blob.x = x;
      blob.y = y;
      blob.vy = speed * direction;
      direction *= -1; // 反转移动方向
      blobs.push(blob);
      app.stage.addChild(blob);
    }

    // 游戏状态
    state = play

    // 游戏循环
    app.ticker.add(delta => gameLoop(delta)); // 每秒60次调用了gameLoop
  }

  function play(params) {
    // 移动怪
    blobs.forEach(blob => {
      blob.y += blob.vy
      // 是否走出了墙

    })
  }

  function gameLoop (delta) {
    state(delta)
  } 

  let left = keyboard(65),
    right = keyboard(68),// A
    up = keyboard(87),// A
    down = keyboard(83);// A

  left.press = () => {
    //key object pressed
    cat.vx = -2
    cat.vy = 0
  };
  left.release = () => {
    //key object released
    if (!right.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };
  right.press = () => {
    //key object pressed
    cat.vx = 2
    cat.vy = 0
  };
  right.release = () => {
    //key object released
    if (!left.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };
  up.press = () => {
    //key object pressed
    cat.vx = 0
    cat.vy = -2
  };
  up.release = () => {
    //key object released
    if (!down.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };
  down.press = () => {
    //key object pressed
    cat.vx = 0
    cat.vy = 2
  };
  down.release = () => {
    //key object released
    if (!up.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };
}

createApp();