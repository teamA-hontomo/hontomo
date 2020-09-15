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

    this.canvas.appendChild(frame);
    console.log("append");
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
