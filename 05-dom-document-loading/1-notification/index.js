export default class NotificationMessage {
    static notification;
  
    constructor(message = '', {duration = 0, type = ''} = {}) {
      if (NotificationMessage.notification) {
        NotificationMessage.notification.remove();
      }
  
      this.message = message;
      this.duration = duration;
      this.type = type;
  
      this.render();
  
      NotificationMessage.notification = this.element;
    }
  
    get template() {
      return `
        <div class="notification ${this.type}" style="--value:${this.duration / 1000}s">
          <div class="timer"></div>
          <div class="inner-wrapper">
            <div class="notification-header">${this.type}</div>
            <div class="notification-body">
              ${this.message}
            </div>
          </div>
        </div>
      `;
    }
    
    render() {
      const element = document.createElement('div');
  
      element.innerHTML = this.template;
  
      this.element = element.firstElementChild;
    }
  
    show(docBody = document.body) {
      docBody.append(this.element);
      setTimeout(() => this.remove(), this.duration);
    }
  
    remove () {
      this.element.remove();
    }
  
    destroy() {
      this.remove();
    }
  }
