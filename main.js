let count = 0; //消した石の数
let turn = true; //Trueならプレイヤー

//スタート画面
select();
function select() {
  document.querySelector("h1").textContent = "先行か後攻を選んでください";
  document.querySelector("h2").textContent = "最後の一つをとったほうが負けです";
  let btn = document.querySelector("#start");
  for (let i = 0; i < 3; i++) {
    let td = document.createElement("td");
    btn.appendChild(td);
  }
  //先行か後攻を選択された時の処理
  document.querySelectorAll("td")[0].textContent = "先行";
  document.querySelectorAll("td")[0].onclick = () => {
    document.querySelector("#start").classList.add("is-hidden");
    document.querySelector("#btn").classList.add("none");
    turn = true;
    init();
  };
  document.querySelectorAll("td")[2].textContent = "後攻";
  document.querySelectorAll("td")[2].onclick = () => {
    document.querySelector("#start").classList.add("is-hidden");
    document.querySelector("#btn").classList.add("none");
    turn = false;
    init();
  };
}

//ゲーム画面の初期化
function init() {
  let main = document.querySelector("#main");
  for (let i = 0; i < 2; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < 8; j++) {
      let td = document.createElement("td");
      td.className = "tile";
      tr.appendChild(td);
    }
    main.appendChild(tr);
  }
  let btn = document.querySelector("#btn");
  for (let i = 0; i < 3; i++) {
    let td = document.createElement("td");
    td.textContent = i + 1;
    td.onclick = clickPlayer;
    td.value = i + 1;
    btn.appendChild(td);
  }
  showText();
}

//クリックされた時の処理
function clickPlayer(e) {
  turn = false;
  deleteTile(e.srcElement.value);
  document.querySelector("#btn").classList.add("none");
}

//テキストの表示
function showText() {
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("h2");
  h1.textContent = `　残り${16 - count}個です`;
  if (count == 16) {
    h1.textContent = "最初に戻る";
    h1.classList.add("end");
    h1.onclick = () => {
      document.location.reload();
    };
    if (turn) {
      h2.textContent = "あなたの勝ちです！！";
    } else {
      h2.textContent = "あなたの負けです...";
    }
  } else {
    if (turn) {
      h2.textContent = "取る個数を選んでください";
      document.querySelector("#btn").classList.remove("none");
    } else {
      h2.textContent = "コンピューターの番です";
      clickCom();
    }
  }
}

//コンピューターの指し手
function clickCom() {
  turn = true;
  let random = Math.floor(Math.random() * 3);
  const remainder = (16 - count) % 4;
  setTimeout(function () {
    switch (remainder) {
      case 0:
        deleteTile(3);
        break;
      case 1:
        deleteTile(random + 1);
        break;
      case 2:
        deleteTile(1);
        break;
      case 3:
        deleteTile(2);
        break;
      default:
        deleteTile(random + 1);
    }
  }, 1000);
}

//消す処理
function deleteTile(num) {
  let tile = document.querySelectorAll(".tile");

  for (let i = 0; i < num; i++) {
    tile[count].style.backgroundColor = "white";
    count++;
    if (count == 16) {
      break;
    }
  }
  showText();
}
