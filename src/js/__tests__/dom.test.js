import CardWidget from '../widget';

describe('CardWidget DOM', () => {
  let widget;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <div class="card-example" data-card="visa">
          <div class="card-number">4485 4289 9653 7790</div>
        </div>
        <input id="card-input" data-id="card-input">
        <button data-id="card-submit">Validate</button>
        <div class="result hidden" id="validation-result">
          <div class="result-text">Message</div>
        </div>
      </div>
    `;

    widget = new CardWidget('.container');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should initialize', () => {
    expect(widget).toBeInstanceOf(CardWidget);
    expect(widget.cardInput).toBeTruthy();
    expect(widget.submitBtn).toBeTruthy();
  });

  test('should handle card click', () => {
    const card = document.querySelector('.card-example');
    card.click();

    expect(card.classList.contains('active')).toBe(true);
    expect(widget.cardInput.value).toBe('4485 4289 9653 7790');
  });

  test('should format input', () => {
    const input = widget.cardInput;
    input.value = '4111111111111111';
    input.dispatchEvent(new Event('input'));

    expect(input.value).toBe('4111 1111 1111 1111');
  });

  test('should show validation result', () => {
    widget.cardInput.value = '4111111111111111';
    widget.validateCard();

    expect(widget.resultDiv.classList.contains('hidden')).toBe(false);
  });
});
