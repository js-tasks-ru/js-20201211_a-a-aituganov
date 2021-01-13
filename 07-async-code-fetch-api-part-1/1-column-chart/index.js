import fetchJson from "./utils/fetch-json";

export default class ColumnChart {
  element;
  chartHeight = 50;
  subElements = {};

  constructor({
    label = '',
    link = '',
    formatHeading = data => data,
    url = '',
    range = {
      from: new Date(),
      to: new Date(),
    }
  } = {}) {
    this.url = url;

    this.from = range.from;
    this.to = range.to;
    this.label = label;
    this.link = link;
    this.formatHeading = formatHeading;

    this.render();
    this.requestData(this.from, this.to);
  }
  
  render() {
    const element = document.createElement('div');
    
    element.innerHTML = `<div class="column-chart">
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

  async requestData(from, to) {        
    this.element.classList.add('column-chart_loading');
    this.subElements.header.textContent = '';
    this.subElements.body.innerHTML = '';

    const newUrl = new URL(this.url, `https://course-js.javascript.ru/`);
    newUrl.searchParams.set('from', from.toISOString());
    newUrl.searchParams.set('to', to.toISOString());

    try {
      const response = await fetchJson(newUrl);

      const data = Object.values(response);

      if (data.length) {
        this.subElements.header.textContent = this.formatHeading([...Object.values(data)].reduce((a, b) => (a + b), 0));
        this.subElements.body.innerHTML = this.getColumnProps(data);
      
        this.element.classList.remove('column-chart_loading');
      }
    } catch (error) {
      //some error
    }
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
  
async update(from, to) {
    return await this.requestData(from, to);
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