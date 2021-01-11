import fetchJson from "./utils/fetch-json";

export default class ColumnChart {
  chartHeight = 50

  dataFromServer = [];

  constructor({ 
  url = '', 
  range = { 
    from: new Date(''), 
    to: new Date('') 
  }, 
  label = '', 
  link = "#",
  formatHeading = data => data} = {}) 
  {
      this.url = url;
      this.from = range.from;
      this.to = range.to;
      this.label = label;
      this.link = link;
      this.formatHeading = formatHeading;

      this.render();
      this.requestData();
    }
  
  render() {
    const element = document.createElement('div');
    
    element.innerHTML = `<div class="column-chart" style="--chart-height: ${this.chartHeight}">
      <div class="column-chart__title">
        Total ${this.label}
        <a href="${this.link}" class="column-chart__link">View all</a>
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header"></div>
        <div data-element="body" class="column-chart__chart">
        
        </div>
      </div>`;
    
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(this.element);
  }

  requestData() {        
    this.element.classList.add('column-chart_loading');
    this.subElements.header.innerHTML = '';
    this.subElements.body.innerHTML = '';

    const promise = new Promise((resolve) => {
      const newUrl = new URL(`https://course-js.javascript.ru/${this.url}`);
        newUrl.searchParams.set('from', this.from.toISOString());
        newUrl.searchParams.set('to', this.to.toISOString());
        return resolve(newUrl);
    });

    promise
      .then(data => fetchJson(data))
      .then(result => {
        if (Object.values(result).length) {
          this.subElements.header.innerHTML = this.formatHeading([...Object.values(Object.values(result))].reduce((a, b) => (a + b), 0));
          this.subElements.body.innerHTML = this.getColumnProps(Object.values(result));
      
          this.element.classList.remove('column-chart_loading');
        }
      });
  }

  getColumnProps(data) {
      const maxValue = Math.max(...data);
      const scale = 50 / maxValue;

      return data.map(item => {
          const percent = (item / maxValue * 100).toFixed(0) + '%';
          const value = String(Math.floor(item * scale));
          return `<div style="--value: ${value}" data-tooltip="${percent}"></div>`
      }).join('');
    }
  
update(from, to) {
    this.element.classList.add('column-chart_loading');
    this.subElements.header.innerHTML = '';
    this.subElements.body.innerHTML = '';

    const promise = new Promise((resolve) => {
      const newUrl = new URL(`https://course-js.javascript.ru/${this.url}`);
        newUrl.searchParams.set('from', from.toISOString());
        newUrl.searchParams.set('to', to.toISOString());
        return resolve(newUrl);
    });

    promise
      .then(data => fetchJson(data))
      .then(result => {
        if (Object.values(result).length) {
          this.subElements.header.innerHTML = this.formatHeading([...Object.values(Object.values(result))].reduce((a, b) => (a + b), 0));;
          this.subElements.body.innerHTML = this.getColumnProps(Object.values(result));
      
          this.element.classList.remove('column-chart_loading');
        }
      });
}

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}