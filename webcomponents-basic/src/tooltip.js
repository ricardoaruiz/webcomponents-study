class Tooltip extends HTMLElement {
    
    constructor() {
        super()

        // Props
        this._tooltipIcon
        this._tooltipContainer
        this._tooltipText

        // Shadow DOM
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = `
            <style>
                .tooltip-icon {
                    position: relative;
                    cursor: pointer;
                }
                .tooltip-container {
                    background-color: black;
                    color: white;
                    position: absolute;
                    z-index: 10;
                    padding: 6px;
                    border-radius: 6px;
                    display: none;
                }
                .show {
                    display: block;
                }
            </style>

            <slot>Some default</slot>
            <span class="tooltip-icon"> (?) 
                <div class="tooltip-container"></div>
            </span>
        `
    }
    
    /**
     * This method is called when the component is mounted
     */
    connectedCallback() {
        this._tooltipIcon = this.shadowRoot.querySelector('span')
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this))
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this))

        this._tooltipContainer = this.shadowRoot.querySelector('.tooltip-container')
        this._tooltipContainer.textContent = this.getAttribute('text') || 'Default tooltip text'        
    }

    _showTooltip() {
        this._tooltipContainer.classList.add('show')
    }

    _hideTooltip() {
        this._tooltipContainer.classList.remove('show')
    }
}

customElements.define(
    'rar-tooltip', 
    Tooltip
)