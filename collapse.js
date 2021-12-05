class Collapse extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' })
    const tmpl = document.getElementById('collapse_tmpl');
    let cloneTemplate = tmpl.content.cloneNode(true);
    let style = document.createElement('style');

    style.textContent = `
      :host{
        display:flex;
        border:3px solid #ebeef5;
        border-radius:5px;
        width:100%;
      }
      .cj-collapse{
        width:100%;
      }
    `

    shadow.appendChild(style);
    shadow.appendChild(cloneTemplate);

    let slot = shadow.querySelector('slot');  //监控slot变化
    slot.addEventListener('slotchange', (e) => {
      this.slotList = e.target.assignedElements();
      this.render();
    })
  }

  static get observedAttributes() {
    return ['active'];
  }

  // updata
  attributeChangedCallback(key, oldVal, newVal) {
    if (key === 'active') {
      this.activeList = JSON.parse(newVal);
      this.render();
    }
    console.log('属性变化时执行');
  }
  render() {
    if (this.slotList && this.activeList) {
      // console.log(this.slotList, this.activeList);
      [...this.slotList].forEach(child => {
        child.setAttribute('active', JSON.stringify(this.activeList));
      })
    }
  }
  // connectedCallback() {
  //   console.log('插入dom时执行的回调');
  // }
  // disconnectedCallback() {
  //   console.log('移除dom时执行的回调');
  // }
  // adoptedCallback() {
  //   console.log('将组件移动到iframe会执行');
  // }
}

export default Collapse