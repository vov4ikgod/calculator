/* Текстовые инпуты */
const totalCost = document.getElementById('total-cost');
const anInitialFee = document.getElementById('an-initial-fee');
const creditTerm = document.getElementById('credit-term');

/* range */
const totalCostRange = document.getElementById('total-cost-range');
const anInitialFeeRange = document.getElementById('an-initial-fee-range');
const creditTermRange = document.getElementById('credit-term-range');

/* итоговая сумма */
const totalAmountOfCredit = document.getElementById('amount-of-credit');
const totalMonthlyPayment = document.getElementById('monthly-payment');
const totalRecommendedIncome = document.getElementById('recommended-income');

/* Все range */
const inputsRange = document.querySelectorAll('.input-range');

/* Все кнопки с процентами */
const bankBtns = document.querySelectorAll('.bank');


const assignValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;    
}; 
assignValue();

const banks = [
    {
        name: 'alfa',
        precents: 8.7
    },

    {
        name: 'sberbank',
        precents: 8.4
    },

    {
        name: 'pochta',
        precents: 7.9
    },

    {
        name: 'tinkoff',
        precents: 9.2
    },
];

let currentPrecent = banks[0].precents;

bankBtns.forEach((bank) => {
    bank.addEventListener('click', () => {
        bankBtns.forEach((item) => {
            item.classList.remove('active');
        })
        bank.classList.add('active');
        takeActiveBank(bank)
    })
});

const takeActiveBank = currentActive => {
    const dataAttrValue = currentActive.dataset.name;
    const currentBank = banks.find(bank => bank.name === dataAttrValue);
    currentPrecent = currentBank.precents;
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
};

inputsRange.forEach((input) => {
    input.addEventListener('input', () => {
        assignValue();
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    })
});


const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
    /*
        ЕП - Ежемесячный платёж,
        РК - Размер кредита,
        ПС - Процентная ставка,
        КМ - Количество месяцев

        ЕП = (РК + (((( РК / 100) * ПС) / 12) * КМ) / КМ;
    */

    let monthlyPayment; // Ежемесячный платёж
    let lounAmount = totalCost - anInitialFee; // Размер кредита
    let interestRate = currentPrecent; // Процентная ставка
    let numberOfYears = creditTerm; // Количество лет
    let numberOfMonths = 12 * numberOfYears // Колличество месяцев

    monthlyPayment = (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMonths) /  numberOfMonths;
    const monthlyPaymentArounded = Math.round(monthlyPayment);
    if (monthlyPaymentArounded < 0) {
        return false;
    } else {
        totalAmountOfCredit.innerHTML = `${lounAmount} ₽`; // Сумма кредита
        totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} ₽`; // Ежемесячный платеж
        totalRecommendedIncome.innerHTML = `${monthlyPaymentArounded + ((monthlyPaymentArounded / 100 * 35))} ₽`; // Рекомендуемый доход
    }
};

