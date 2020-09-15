export default class Viewer {
  xml_src = "";
  request = {};
  root;
  current_page = 0;
  canvas;

  constructor(xml_src, canvas_id = "view") {
    this.setCanvas(canvas_id);
    this.xml_src = xml_src;

    this.request = new XMLHttpRequest();
    this.request.addEventListener("load", this.getRootDom.bind(this));
    this.request.open("GET", xml_src, false);
    this.request.send();

    return this;
  }

  // xml のルート
  getRootDom(e) {
    const parser = new DOMParser();
    this.root = parser.parseFromString(
      e.target.responseText,
      "application/xml"
    );
  }

  // ページを表示するためのDOMの登録
  setCanvas(id) {
    this.canvas = document.getElementById(id);
  }

  // 現在のページを描画
  show() {
    this.clearView();
    const pages = this.root.getElementsByTagName("page");
    const frames = pages[this.current_page].children;
    [...frames].forEach(elm => {
      this.arrangeFrame(elm);
    });
    return this;
  }

  // コマの配置
  arrangeFrame(elm) {
    const frame = document.createElement("div");
    frame.classList.add("frame");

    //位置の指定
    const position = elm.children[0];
    frame.style.top = position.getAttribute("top") + "px";
    frame.style.right = position.getAttribute("right") + "px";
    frame.style.width = position.getAttribute("width") + "px";
    frame.style.height = position.getAttribute("height") + "px";

    //画像の指定
    const src = elm.getAttribute("src");
    frame.style.backgroundImage = "url('/static/frames/" + src + "')";

    this.addBtns(frame);
    this.canvas.appendChild(frame);
  }

  // コマにボタンを設置する
  addBtns(frame) {
    const list_btn = document.createElement("div");
    list_btn.classList.add("frame-btn", "list-btn");
    // bootstrap の svg アイコンを使用
    list_btn.innerHTML =
      "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-bookmark-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5V2z'/></svg>";
    frame.appendChild(list_btn);

    const agora_btn = document.createElement("div");
    agora_btn.classList.add("frame-btn", "agora-btn");
    agora_btn.innerHTML = 
      "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-chat-left-text' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M14 1H2a1 1 0 0 0-1 1v11.586l2-2A2 2 0 0 1 4.414 11H14a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'/><path fill-rule='evenodd' d='M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z'/></svg>";
    frame.appendChild(agora_btn);
  }

  clearView() {
    this.canvas.innerHTML = "";
  }

  go() {
    this.current_page++;
    this.show();
  }

  back() {
    this.current_page--;
    this.show();
  }
}
