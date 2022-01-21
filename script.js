// input number
const totalCost = document.getElementById('total-cost');
const anInitialFee = document.getElementById('an-initial-fee');
const creditTerm = document.getElementById('credit-term');

// input range
const totalCostRange = document.getElementById('total-cost-range');
const anInitialFeeRange = document.getElementById('an-initial-fee-range');
const creditTermRange = document.getElementById('credit-term-range');

// итоговые цены
const amountOfCredit = document.getElementById('amount-of-credit');
const monthlyPaymentPrice = document.getElementById('monthly-payment');
const recommendedIncome = document.getElementById('recommended-income');

// все input number
const inputsNumber = document.querySelectorAll('.input-number');

// все input range
const inputsRange = document.querySelectorAll('.input-range');

// все bank button
const bankBtns = document.querySelectorAll('.bank');



// Делаем так чтобы когда тащешь за input range в input number был текст и наоборот
const inputsRange2 = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;    
}; 

const inputsNumber2 = () => {
    totalCostRange.value = totalCost.value;
    anInitialFeeRange.value = anInitialFee.value;
    creditTermRange.value = creditTerm.value;
};

inputsNumber.forEach((input) => {
    input.addEventListener('input', () => {
        inputsNumber2();
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    })
});

inputsRange.forEach((input) => {
    input.addEventListener('input', () => {
        inputsRange2();
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    })
});

inputsRange2();
inputsNumber2();


// Создаем массив для инфы по банкам
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
    }
];

// Создаем текущий процент
let currentPrecent = banks[0].precents;

// Создаем переключение по кнопкам bankBtns
bankBtns.forEach((bank) => {
    bank.addEventListener('click', () => {
        bankBtns.forEach((item) => {
            item.classList.remove('active');
        })
        bank.classList.add('active');
        takeActiveBank(bank); // это для того чтобы на bank накидывался data-name 
    });
});

const takeActiveBank = (currentActive) => {
    // Создаем переменную с data атрибутом и вешаем его на елемент
    const dataValue = currentActive.dataset.name;
    // Создаем currentBank в которой говорим чтобы dataValue и bank.name были равны 
    const currentBank = banks.find(bank => bank.name === dataValue);
    currentPrecent = currentBank.precents; // Делаем текущий процент
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
};




const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {

    /*
        ЕП - Ежемесячный платёж,
        РК - Размер кредита,
        ПС - Процентная ставка,
        КМ - Количество месяцев

        ЕП = (РК + ((( РК / 100) * ПС) / 12) * КМ / КМ;
    */

    let monthlyPayment; // Ежемесячный платёж
    let lounAmount = totalCost - anInitialFee; // Размер кредита
    let interestRate = currentPrecent// Процентная ставка,
    let numberOfYears = creditTerm; // Количество лет
    let numberOfMonths = numberOfYears * 12 // Количество месяцев

    monthlyPayment = (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMonths / numberOfMonths);
    const monthlyPaymentRound = Math.round(monthlyPayment);

    if (monthlyPaymentRound < 0) {
        return false;
    } else {
        amountOfCredit.innerHTML = `${lounAmount} ₽`;
        monthlyPaymentPrice.innerHTML = `${monthlyPaymentRound} ₽`;
        recommendedIncome.innerHTML = `${monthlyPaymentRound + ((monthlyPaymentRound / 100) * 35)} ₽`;
    }
}