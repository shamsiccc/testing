import {
  isValidCardNumber,
  getPaymentSystem,
  formatCardNumber,
  VALID_EXAMPLES,
  PAYMENT_SYSTEM_NAMES,
} from './validators';

export default class CardWidget {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      throw new Error(`Container ${containerSelector} not found`);
    }

    this.cardExamples = null;
    this.cardInput = null;
    this.submitBtn = null;
    this.resultDiv = null;
    this.resultText = null;

    this.init();
  }

  init() {
    this.bindElements();
    this.bindEvents();
    this.setupExamples();
  }

  bindElements() {
    this.cardInput = document.getElementById('card-input');
    this.submitBtn = document.querySelector('[data-id="card-submit"]');
    this.resultDiv = document.getElementById('validation-result');
    this.resultText = this.resultDiv && this.resultDiv.querySelector('.result-text');
    this.cardExamples = document.querySelectorAll('.card-example');
  }

  bindEvents() {
    this.cardExamples.forEach((example) => {
      example.addEventListener('click', () => this.onCardExampleClick(example));
    });

    if (this.cardInput) {
      this.cardInput.addEventListener('input', (e) => this.onCardInput(e));
      this.cardInput.addEventListener('keypress', (e) => this.onCardKeyPress(e));
    }

    if (this.submitBtn) {
      this.submitBtn.addEventListener('click', (e) => this.onSubmit(e));
    }
  }

  setupExamples() {
    if (this.cardExamples.length > 0) {
      this.cardExamples[0].click();
    }
  }

  onCardExampleClick(example) {
    this.cardExamples.forEach((ex) => ex.classList.remove('active'));

    example.classList.add('active');

    const cardType = example.dataset.card;
    if (VALID_EXAMPLES[cardType]) {
      this.cardInput.value = formatCardNumber(VALID_EXAMPLES[cardType]);
    }

    this.hideResult();
  }

  onCardInput(e) {
    let value = e.target.value.replace(/\D/g, '');
    value = formatCardNumber(value);
    e.target.value = value;

    const system = getPaymentSystem(value);

    this.cardExamples.forEach((example) => {
      example.classList.remove('active');
      if (example.dataset.card === system) {
        example.classList.add('active');
      }
    });

    this.hideResult();
  }

  onCardKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.validateCard();
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.validateCard();
  }

  validateCard() {
    const cardNumber = this.cardInput.value.replace(/\D/g, '');

    if (!cardNumber) {
      this.showResult('Please enter card number', false);
      return;
    }

    if (cardNumber.length < 13 || cardNumber.length > 19) {
      this.showResult('Card number must contain 13-19 digits', false);
      return;
    }

    const isValid = isValidCardNumber(cardNumber);
    const system = getPaymentSystem(cardNumber);
    const systemName = PAYMENT_SYSTEM_NAMES[system] || 'Unknown';

    if (isValid) {
      this.showResult(`✓ Valid ${systemName} card`, true);
    } else {
      this.showResult(`✗ Invalid ${systemName} card number`, false);
    }
  }

  showResult(message, isValid) {
    if (!this.resultDiv || !this.resultText) return;

    this.resultDiv.classList.remove('hidden');
    this.resultDiv.className = 'result';
    this.resultDiv.classList.add(isValid ? 'valid' : 'invalid');
    this.resultText.textContent = message;
  }

  hideResult() {
    if (this.resultDiv) {
      this.resultDiv.classList.add('hidden');
    }
  }
}
