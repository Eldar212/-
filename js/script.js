'use strict';

let startBtn = document.getElementById("start"),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBydgetValue = document.getElementsByClassName('daybudget-value')[0],
	level_value = document.getElementsByClassName('level-value')[0],
	expenses_value = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
	monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
	yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],
	expenses_item = document.getElementsByClassName('expenses-item'),

	expensesBtn = document.getElementsByTagName("button")[0],
	optionalExpensesBtn = document.getElementsByTagName("button")[1],
	countBtn = document.getElementsByTagName("button")[2],
	optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	chooseIncome = document.querySelector('.choose-income'),
	savings = document.querySelector('#savings'),
	choose_sum = document.querySelector('.choose-sum'),
	choose_percent = document.querySelector('.choose-percent'),
	year_value = document.querySelector('.year-value'),
	month_value =  document.querySelector('.month-value'),
	day_value =  document.querySelector('.day-value');


let money, time;

startBtn.addEventListener('click', function() {
	time = prompt('Введите дату в формате YYYY-MM-DD', ''),
	money = +prompt("Ваш бюджет на месяц?", '');

	while (isNaN(money) || money == '' || money == null) {
		money = +prompt("Ваш бюджет на месяц?", '');
	}
	appData.budget = money;
	appData.timeData = time;
	budgetValue.textContent = money.toFixed();
	year_value.value = new Date(Date.parse(time)).getFullYear();
	month_value.value = new Date(Date.parse(time)).getMonth() + 1;
	day_value.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener('click', function() {
	let sum = 0;
	for (let i=0; i<expenses_item.length; i++) {
		let a = expenses_item[i].value,
				b = expenses_item[++i].value;

		if ((typeof(a)) === 'string' && ( typeof(a)) != null && (typeof(b)) != null
			&& a != '' && b != '' && a.length < 50) {
			console.log('done');
			appData.expenses[a] = b;
			sum += +b;
		} else {
			i = i - 1;
		}
	}
	expenses_value.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function() {
	for (let i =0; i < optionalExpensesItem.length; i++ ) {
		let opt = optionalExpensesItem[i].value;
		appData.optionalExpenses[i] = opt;
		optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
	}

});

countBtn.addEventListener('click', function () {

	if(appData.budget != undefined) {
		appData.moneyPerDay = (appData.budget / 30).toFixed();
		dayBydgetValue.textContent = appData.moneyPerDay;

		if (appData.moneyPerDay < 100) {
			level_value.textContent = ("Это минимальный уровень достатка!");
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			level_value.textContent = ("Это средний уровень достатка!");
		} else if (appData.moneyPerDay > 2000) {
			level_value.textContent = ("Это высокий уровень достатка!");
		} else {
			console.log("Произошла ошибка");
		}
	} else {
		dayBydgetValue.textContent = ('Произошла ошибка');
	}
});

chooseIncome.addEventListener('input', function() {
	let items = chooseIncome.value;
	appData.income = items.split(", ");
	incomeValue.textContent = appData.income;
});

savings.addEventListener('input', function () {
	if (appData.savings == true) {
		appData.savings = false
	} else {
		appData.savings = true
	}
});

choose_sum.addEventListener('input', function () {
	if(appData.savings == true) {
		let sum = +choose_sum.value,
			percent = +choose_percent.value;

		appData.monthIncome = sum /100 /12 *percent;
		appData.yearIncome = sum /100 *percent;

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

choose_percent.addEventListener('input', function () {
	if(appData.savings == true) {
		let sum = +choose_sum.value,
			percent = +choose_percent.value;

		appData.monthIncome = sum /100 /12 *percent;
		appData.yearIncome = sum /100 *percent;

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

let appData = {
	budget: money,
	expenses: {},
	optionalExpenses: {},
	income: [],
	timeData: time,
	savings: false
 };

