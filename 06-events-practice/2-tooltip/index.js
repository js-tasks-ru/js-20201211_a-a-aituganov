class Tooltip {
    constructor() {
        if (typeof Tooltip.instance === 'object') {
            return Tooltip.instance;
        }
        Tooltip.instance = this;
        return this;
    }

    render(text) {
        const tooltipElement = document.createElement('div');

        tooltipElement.innerHTML = `<div class="tooltip">${text}</div>`;
        this.element = tooltipElement.firstElementChild;

        document.body.append(this.element);
    }

    hover = (event) => {
        let target = event.target.closest('[data-tooltip]');

        if (!target) return;

        this.render(target.dataset.tooltip);

        event.target.addEventListener('mousemove', (event) => {
            this.element.style.left = (event.pageX + 10) + 'px';
            this.element.style.top = (event.pageY + 10) + 'px';
        });
    }

    removeTooltip = () => {
        this.remove();
    }

    initialize() {
        document.addEventListener('pointerover', this.hover)

        document.addEventListener('pointerout', this.removeTooltip)
    }

    remove() {
        if (this.element) this.element.remove();
    }

    destroy() {
        this.remove();      
    }
}

const tooltip = new Tooltip();

export default tooltip;
