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
import { keyboard } from './utils/util.js';


function drawGraphics(app) {
  // 画一个矩形
  let rectangle = new Graphics();
  rectangle.lineStyle(4, 0xFF3300, 1);
  rectangle.beginFill(0x66CCFF);
  rectangle.drawRect(0, 0, 64, 64);
  rectangle.endFill();
  rectangle.x = 170;
  rectangle.y = 170;
  app.stage.addChild(rectangle);

  // 圆
  let circle = new Graphics();
  circle.beginFill(0x9966FF);
  circle.drawCircle(0, 0, 32);
  circle.endFill();
  circle.x = 64;
  circle.y = 130;
  app.stage.addChild(circle);

  // 椭圆
  let ellipse = new Graphics();
  ellipse.beginFill(0xFFFF00);
  ellipse.drawEllipse(0, 0, 50, 20);
  ellipse.endFill();
  ellipse.x = 180;
  ellipse.y = 130;
  app.stage.addChild(ellipse);

  // 圆角矩形
  let roundBox = new Graphics();
  roundBox.lineStyle(4, 0x99CCFF, 1);
  roundBox.beginFill(0xFF9933);
  roundBox.drawRoundedRect(0, 0, 84, 36, 10)
  roundBox.endFill();
  roundBox.x = 48;
  roundBox.y = 190;
  app.stage.addChild(roundBox);

  // 线
  let line = new Graphics();
  line.lineStyle(4, 0xFFFFFF, 1);
  line.moveTo(0, 0);
  line.lineTo(80, 50);
  line.x = 200;
  line.y = 200;
  app.stage.addChild(line);

  // 多边形
  let triangle = new Graphics();
  triangle.beginFill(0x66FF33);

  //Use `drawPolygon` to define the triangle as
  //a path array of x/y positions

  triangle.drawPolygon([
      -32, 64,             //First point
      32, 64,              //Second point
      0, 0                 //Third point
  ]);

  //Fill shape's color
  triangle.endFill();

  //Position the triangle after you've drawn it.
  //The triangle's x/y position is anchored to its first point in the path
  triangle.x = 180;
  triangle.y = 22;

  app.stage.addChild(triangle);

  // 文本
  let message = new Text("Hello Pixi!");
  app.stage.addChild(message);
}

function createApp(params) {
  // 创建一块显示图片的区域
  //Create a Pixi Application
  let app = new Application({
    width: 256, 
    height: 256,
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

  // 画图
  drawGraphics(app)

  // // 加载一张图像
  const loader = new Loader();
  loader
    .add([
      "assets/images/cat.png",
      "assets/images/tileset.png",
      "assets/images/bird/bird1.png",
      "assets/images/bird/bird2.png",
      "assets/images/bird/bird3.png",
    ])
    .load(setup);

  loader.onProgress.add(loadProgressHandler); // called once per loaded/errored file

  function loadProgressHandler (loader, resource) {
    console.log("loading");
    console.log(loader.progress) // 现在图片加载的进度
    console.log(resource.url) // 现在什么图片加载完成了
  }

  let cat, rocket, state, animatedBird
  function setup() {
    console.log("setup", TextureCache);
    // 鸟
    let bird1 = TextureCache['assets/images/bird/bird1.png'],
      bird2 = TextureCache['assets/images/bird/bird2.png'],
      bird3 = TextureCache['assets/images/bird/bird3.png'];
    let birdTexture = [bird1, bird2, bird3];
    animatedBird = new AnimatedSprite(birdTexture);
    animatedBird.x = 300
    animatedBird.y = 200
    animatedBird.animationSpeed = 0.1
    animatedBird.play()
    animatedBird.visible = false
    app.stage.addChild(animatedBird);

    //This code will run when the loader has finished loading the image
    // 图像加载成功，创建精灵
    cat = new Sprite(
      TextureCache["assets/images/cat.png"]
    );

    let Rtexture = TextureCache["assets/images/tileset.png"]
      //Create a rectangle object that defines the position and
      //size of the sub-image you want to extract from the texture
      //(`Rectangle` is an alias for `PIXI.Rectangle`)
      let rectangle = new Rectangle(96, 64, 32, 32);
      console.log(rectangle)
      Rtexture.frame = rectangle;

//Create the sprite from the texture
    rocket = new Sprite(Rtexture);

    //Position the rocket sprite on the canvas
    rocket.x = 32;
    rocket.y = 32;

    rocket.interactive = true

    rocket.on('tap', () => {
      console.log('点击了火箭')
    })
    //Add the rocket to the stage
    app.stage.addChild(rocket);

    
    // 图片的位置 或者
    cat.x = 96;
    cat.y = 96;
    // cat.position.set(96, 96)

    // 图片的大小
    // cat.width = 80;
    // cat.height = 120;

    // 图片的比例
    // cat.scale.x = 0.5;
    // cat.scale.y = 0.5;
    // cat.scale.set(2, 2);

    // 旋转图片
    cat.rotation = 0.5;
    // 改变旋转锚点
    cat.anchor.x = 0.5;
    cat.anchor.y = 0.5;

    // 初始化速度，0为静止
    cat.vx = 0;
    cat.vy = 0;
    // 加入舞台，显示精灵
    app.stage.addChild(cat);

    // 游戏状态
    state = play

    // 游戏循环
    app.ticker.add(delta => gameLoop(delta)); // 每秒60次调用了gameLoop
  }

  function play(params) {
    cat.x += cat.vx;
    cat.y += cat.vy;


    rocket.x += 1;
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