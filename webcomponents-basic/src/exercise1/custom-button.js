const button = 'button'
const infoMessage = 'info_message'

const messageAttribute = 'message'
const isVisibleAttribute = 'is-visible'

class CustomButton extends HTMLElement {

    constructor() {
        super()

        // Shadow DOM
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = `
            ${this._getStyles()}
            ${this._getHTML()}
        `

        // Class Properties
        this._button = this.shadowRoot.querySelector(`.${button}`)
        this._message = this.shadowRoot.querySelector(`.${infoMessage}`)
        this._isVisible = false
    }

    // Runs when component is mounted
    connectedCallback() {

        const infoMessage = this.getAttribute(messageAttribute) || 'No message was informed!'

        this._isVisible = this.hasAttribute(isVisibleAttribute) 
            ? this.getAttribute(isVisibleAttribute) === 'true'
            : this._isVisible
                
        this._button.addEventListener('click', this._toogleVisible.bind(this))

        this._message.textContent = infoMessage
        this._isVisible && this._toogleMessageVisibleClass()
    }

    _toogleVisible() {
        this._isVisible = !this._isVisible
        this._toogleMessageVisibleClass()
    }

    _toogleMessageVisibleClass() {
        this._message.classList.toggle(`${infoMessage}--show`)
    }

    _getStyles() {
        return `
            <style>
                .${button} {
                    border: none;
                    border-radius: 5px;
                    padding: 8px 10px;
                    font-size: 16px;
                    font-weight: 700;
                    background-color: #3C198B;
                    color: #fff;
                    cursor: pointer;
                    box-shadow: 2px 2px 4px rgba(0,0,0,0.4);
                }
                .${button}:hover {
                    background-color: #2C0190;
                }
                .${button}:active {
                    background-color: #140140;
                    box-shadow: none;
                }

                .${infoMessage} {
                    font-size: 24px;
                    font-weight: 600;
                    padding: 0 4px;
                    margin: 0;
                    
                    opacity: 0;
                    visibility: hidden;
                    max-height: 0;                    

                    transition: all 0.5s ease-in-out;
                }
                .${infoMessage}--show {
                    opacity: 1;
                    visibility: visible;
                    max-height: 30px;

                    padding: 4px;
                    margin: 10px 0 0;
                }
            </style>
        `
    }

    _getHTML() {
        return `
            <button class="${button}">
                <slot>Click me!</slot>
            </button>

            <p class="${infoMessage}"></p>
        `
    }

}

customElements.define('rar-custom-button', CustomButton)