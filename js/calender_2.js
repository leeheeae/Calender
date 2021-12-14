const date = new Date();

const readCalender = () => {
	const todayYear = date.getFullYear();
	const todayMonth = date.getMonth() + 1;

	document.querySelector(
		'.mainTopContent > h2'
	).innerHTML = `${todayYear}년 ${todayMonth}월`;

	const prevLast = new Date(todayYear, todayMonth - 1, 0);
	const thisLast = new Date(todayYear, todayMonth, 0);

	const prevLastDay = prevLast.getDay();
	const prevLastDate = prevLast.getDate();

	const thisLastDay = thisLast.getDay();
	const thisLastDate = thisLast.getDate();

	const prevDates = [];
	const thisDates = [...Array(thisLastDate + 1).keys()].slice(1);
	const nextDates = [];

	if (prevLastDay !== 6) {
		for (let i = 0; i < prevLastDay + 1; i++) {
			prevDates.unshift(prevLastDate - i);
		}
	}

	for (let i = 0; i < 6 - thisLastDay; i++) {
		nextDates.push(i + 1);
	}
	const dates = prevDates.concat(thisDates, nextDates);

	const firstDate = dates.indexOf(1);
	const lastDate = dates.lastIndexOf(thisLastDate);

	dates.forEach((date, i) => {
		const dateState = i >= firstDate && i <= lastDate ? 'this' : 'other';
		dates[
			i
		] = `<div class="date"><span class="${dateState}"">${date}</span></div>`;
	});

	//그리기
	document.querySelector('.calendar-days').innerHTML = dates.join('');

	//오늘 날짜 그리기
    const today = new Date();

    if (todayMonth === today.getMonth() + 1 && todayYear === today.getFullYear()) {
        for (let date of document.querySelectorAll('.this')) {
            if (Number(date.innerText) === today.getDate()) {
                date.classList.add('today');
                return;
            }
		}
	}
}

//이전 버튼
const prevMonth = () => {
    date.setMonth(date.getMonth() - 1);
    readCalender();
};

//다음 버튼
const nextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    readCalender();
};

const goToday = () => {
    date = new Date();
    readCalender();
};

window.addEventListener('load', readCalender);