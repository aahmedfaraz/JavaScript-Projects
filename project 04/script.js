// All DOM Elements and Variables
//FLAGs
const sourceCurrencyFlag = document.getElementById('source-currency-flag');
const targetCurrencyFlag = document.getElementById('target-currency-flag');
const sourceBitcoinFlag = document.getElementById('source-bitcoin-flag');
const targetBitcoinFlag = document.getElementById('target-bitcoin-flag');
//SELECTs
const sourceCurrencyCountry = document.getElementById('source-currency');
const targetCurrencyCountry = document.getElementById('target-currency');
const targetBitcoinCountry = document.getElementById('target-bitcoin');
//RATEs
const sourceCurrencyRateAmount = document.getElementById('source-currency-rate-amount');
const targetCurrencyRateAmount = document.getElementById('target-currency-rate-amount');
const targetBitcoinRateAmount = document.getElementById('target-bitcoin-rate-amount');
const sourceCurrencyRateName = document.getElementById('source-currency-name');
const targetCurrencyRateName = document.getElementById('target-currency-name');
const targetBitcoinRateName = document.getElementById('target-bitcoin-name');
//Inputs
const sourceCurrencyAmount = document.getElementById('source-currency-amount');
const targetCurrencyAmount = document.getElementById('target-currency-amount');
const sourceBitcoinAmount = document.getElementById('source-bitcoin-amount');
const targetBitcoinAmount = document.getElementById('target-bitcoin-amount');
//BUTTONs
const flipButton = document.getElementById('flip');
const resetCurrency = document.getElementById('reset-currency');
const resetBitcoin = document.getElementById('reset-bitcoin');

// ALL FUNCTIONS
// 1 - Function to calculate present state info and show to DOM
function calculate() {
    // 1 - Read Codes From DOM Element (Select)
    const sourceFlagCode = sourceCurrencyCountry.value.split('-')[0];
    const sourceCurrencyCode = sourceCurrencyCountry.value.split('-')[1];
    const targetFlagCode = targetCurrencyCountry.value.split('-')[0];
    const targetCurrencyCode = targetCurrencyCountry.value.split('-')[1];
    // 2 - Update Flags
    sourceCurrencyFlag.src = `https://www.countryflags.io/${sourceFlagCode}/shiny/64.png`
    targetCurrencyFlag.src = `https://www.countryflags.io/${targetFlagCode}/shiny/64.png`
    // 3 - Fetch Data from www.exchangerate-api.com according to DOM Codes
    fetch(`https://v6.exchangerate-api.com/v6/59a87fd2f47d4991cff2bd41/latest/${sourceCurrencyCode}`)
        .then(response => response.json()
        .then(data => {
            // 1 - Get the Exact Currency Data
            const targetCurrencyFetchedAmount = data.conversion_rates[targetCurrencyCode];
            let totalTargetCurrencyAmount = null;
            // 2 - Calculate Total Amount
            if (sourceCurrencyAmount.value === ""){
                totalTargetCurrencyAmount = sourceCurrencyAmount.placeholder * targetCurrencyFetchedAmount;
            }else {
                totalTargetCurrencyAmount = sourceCurrencyAmount.value * targetCurrencyFetchedAmount;
            }
            // 3 - Update Input Amounts
            targetCurrencyAmount.value = setFormat(totalTargetCurrencyAmount.toFixed(2));

            // 4 - Update Rate Amounts
            sourceCurrencyRateName.innerText = sourceCurrencyCode;
            targetCurrencyRateName.innerText = targetCurrencyCode;
            targetCurrencyRateAmount.innerText = setFormat(targetCurrencyFetchedAmount.toFixed(2));
        }))
}
// 2 - Function to flip currencies and Update DOM
function flip() {
    const swap = sourceCurrencyCountry.value;
    sourceCurrencyCountry.value = targetCurrencyCountry.value;
    targetCurrencyCountry.value = swap;
    calculate();
}
// 3 - Function to Reset Currency
function resetCurr() {
    sourceCurrencyCountry.value = 'US-USD';
    sourceCurrencyAmount.value = '';
    targetCurrencyCountry.value = 'PK-PKR';
    calculate();
}

// 4 - Function to fetch Bitcoin rate from https://api.coindesk.com/v1/bpi/currentprice.json and Exchange Currency by https://api.exchangerate.host/latest and UPDATE DOM
function calculateBitcoin() {
    // 1 - Read Codes From DOM Element (Select)
    const targetFlagCode = targetBitcoinCountry.value.split('-')[0];
    const targetBitcoinCurrencyCode = targetBitcoinCountry.value.split('-')[1];
    // 2 - Update Flags
    targetBitcoinFlag.src = `https://www.countryflags.io/${targetFlagCode}/shiny/64.png`
    // 3 - Fetch Data from www.exchangerate-api.com according to DOM Codes
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(res => res.json()
        .then(data => {
            const oneBitcoinRateInEuro = data.bpi.EUR.rate_float;
            fetch('https://api.exchangerate.host/latest')
                .then(res => res.json()
                .then(data => {

                    
                    const oneBitcoinInRequiredCurrency = oneBitcoinRateInEuro * data.rates[targetBitcoinCurrencyCode];
                    let totalTargetBitcoinAmount;
                    // 2 - Calculate Total Amount
                    if (sourceBitcoinAmount.value === ""){
                        totalTargetBitcoinAmount = sourceBitcoinAmount.placeholder * oneBitcoinInRequiredCurrency;
                    }else {
                        totalTargetBitcoinAmount = sourceBitcoinAmount.value * oneBitcoinInRequiredCurrency;
                    }
                    // 3 - Update Input Amounts
                    targetBitcoinAmount.value =  setFormat(totalTargetBitcoinAmount.toFixed(2));
        
                    // 4 - Update Rate Amounts
                    targetBitcoinRateName.innerText = targetBitcoinCurrencyCode;
                    targetBitcoinRateAmount.innerText = setFormat(oneBitcoinInRequiredCurrency.toFixed(2));
                }));
        } ));
}

// 5 - Function to Reset Bitcoin
function resetBit() {
    targetBitcoinCountry.value = 'US-USD';
    sourceBitcoinAmount.value = '';
    calculateBitcoin();
}

// 6 - Function to set Format of Number
function setFormat(num) {
    const wholePart = parseInt(String(num).split('.')[0]);
    const deciamlPart = parseInt(String(num).split('.')[1]);
    return wholePart.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "." + deciamlPart;
}

// ALL EVENT LISTENERS
// 1 - Source Currency Changed - UPDATE DOM
sourceCurrencyCountry.addEventListener('change',calculate);
// 2 - Target Currency Changed - UPDATE DOM
targetCurrencyCountry.addEventListener('change',calculate);
// 3 - Source Amount Changed - UPDATE DOM
sourceCurrencyAmount.addEventListener('input',calculate);
// 4 - On Focus to Source Amount - Empty that to further use - then UPDATE DOM
sourceCurrencyAmount.addEventListener('click',()=>{sourceCurrencyAmount.value = '';calculate();})
// 5 - Flip Button - swap Currencies - then UPDATE DOM
flipButton.addEventListener('click',flip);
// 6 - Reset Button - reset DOM
resetCurrency.addEventListener('click',resetCurr);
// 7 - Target Bitcoin Changed - UPDATE DOM
targetBitcoinCountry.addEventListener('change',calculateBitcoin);
// 8 - Source Bitcoin Input Updated - UPDATE DOM
sourceBitcoinAmount.addEventListener('input',calculateBitcoin);
// 9 - Reset Bitcoin Button CLicked - UPDATE DOM
resetBitcoin.addEventListener('click',resetBit);

// ALL FUNCTIONS TO RUN ON START
calculate();
calculateBitcoin();
