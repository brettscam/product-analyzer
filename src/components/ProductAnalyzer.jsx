<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Analyzer</title>
    <!-- Include React and ReactDOM from CDN -->
    <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
    <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
    <!-- Include Tailwind CSS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.js"></script>
</head>
<body>
    <!-- Container for our web component -->
    <div id="product-analyzer-root"></div>

    <script>
        // Create a custom element wrapper
        class ProductAnalyzer extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }

            connectedCallback() {
                // Create container
                const container = document.createElement('div');
                this.shadowRoot.appendChild(container);

                // Inject styles
                const style = document.createElement('style');
                style.textContent = `
                    /* Add your component styles here */
                    :host {
                        display: block;
                        width: 100%;
                        max-width: 1200px;
                        margin: 0 auto;
                    }
                `;
                this.shadowRoot.appendChild(style);

                // Mount React component
                ReactDOM.render(
                    React.createElement(ProductAnalyzerComponent),
                    container
                );
            }
        }

        // Register the custom element
        customElements.define('product-analyzer', ProductAnalyzer);
    </script>

    <!-- Example usage -->
    <script>
        // Example of how to embed the component
        document.write(`
            <product-analyzer></product-analyzer>
        `);
    </script>
</body>
</html>
