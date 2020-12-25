export default class ColumnChart {
    constructor({data = [], label = '', link = "#", value = 0, chartHeight = 50} = {}) {
        this.data = data;
        this.label = label;
        this.link = link;
        this.value = value;
        this.chartHeight = chartHeight;
        this.render();
        this.initEventListeners();
      }
    
    render() {
      const element = document.createElement('div');
      
      element.innerHTML = `<div class="column-chart">
        <div class="column-chart__title">
          Total ${this.label}
          <a href="${this.link}" class="column-chart__link">View all</a>
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${this.value}</div>
          <div data-element="body" class="column-chart__chart">
          
          </div>
        </div>`;
      if (this.data.length < 1) {
        element.querySelector('.column-chart').classList.add('column-chart_loading');
      } else {
        const columnProps = this.getColumnProps(this.data);
        
        for (let k of columnProps) {
          element.querySelector('.column-chart__chart').innerHTML += `<div style="--value: ${k.value}" data-tooltip="${k.percent}"></div>`
        }
      }
      
      this.element = element.firstElementChild;
    }

    getColumnProps(data) {
        const maxValue = Math.max(...data);
        const scale = 50 / maxValue;
  
        return data.map(item => {
          return {
            percent: (item / maxValue * 100).toFixed(0) + '%',
            value: String(Math.floor(item * scale))
          };
        });
      }
    
    initEventListeners () {
      // NOTE: в данном методе добавляем обработчики событий, если они есть
    }
  
    remove() {
      this.element.remove();
    }
  
    destroy() {
      this.remove();
    }
    
    update(newData) {
        this.element.querySelector('.column-chart__chart').innerHTML = null;
        const columnProps = this.getColumnProps(newData);
        
        for (let k of columnProps) {
          this.element.querySelector('.column-chart__chart').innerHTML += `<div style="--value: ${k.value}" data-tooltip="${k.percent}"></div>`
        }
    }
}