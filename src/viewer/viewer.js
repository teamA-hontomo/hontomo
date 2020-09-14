export default class Viewer {

  xml_src = "";
  request = {};
  root;
  current_page = 0;

  constructor(xml_src) {
    this.xml_src = xml_src;

    this.request = new XMLHttpRequest();
    this.request.addEventListener("load", {handleEvent: this.getRootDom, root: this.root});
    this.request.open("GET", xml_src);
    this.request.send();
  }

  // xml のルートs
  getRootDom(e) {
    const parser = new DOMParser();
    this.root = parser.parseFromString(e.target.responseText, "application/xml");
    console.log('hoge');
  }

  show() {
    const pages = this.getElementsByTagName('page');
    const frames = pages[currentPage].children;
    [ ...frames].forEach(elm => {
        arrangeFrame(elm);
    })
  }

  arrangeFrame(elm) {
    const frame = document.createElement('div');
    frame.classList.add('frame');

    //位置の指定
    const position = elm.children[0];
    frame.style.top = position.getAttribute('top') + 'px';
    frame.style.right = position.getAttribute('right') + 'px';
    frame.style.width = position.getAttribute('width') + 'px';
    frame.style.height = position.getAttribute('height') + 'px';

    //画像の指定
    const src = elm.getAttribute('src');
    frame.style.backgroundImage = "url('./" + src +"')";

    this.canvas.appendChild(frame);
  }
}
