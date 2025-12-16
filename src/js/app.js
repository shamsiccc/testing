import '../css/style.css';
import CardWidget from './widget';

document.addEventListener('DOMContentLoaded', () => {
  try {
    const widget = new CardWidget('.container');
    console.log('Card Widget initialized', widget);
  } catch (error) {
    console.error('Failed to initialize widget:', error);

    const container = document.querySelector('.container');
    if (container) {
      container.innerHTML = `
                <div class="error">
                    <h2>Error Loading Widget</h2>
                    <p>${error.message}</p>
                    <p>Please check browser console for details.</p>
                </div>
            `;
    }
  }
});
