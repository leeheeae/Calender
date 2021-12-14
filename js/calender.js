let date = new Date(); //기준 DATE

const renderCalendar = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    // year-month 채우기
    document.querySelector('.mainTopContent > h2').innerHTML = `${viewYear}년 ${
        viewMonth + 1
    }월`;

    // 지난 달 마지막 Date, 이번 달 마지막 Date
    const prevLast = new Date(viewYear, viewMonth, 0); // 0은 마지막날을 나타내줌
    const thisLast = new Date(viewYear, viewMonth + 1, 0); // 0은 마지막날을 나타내줌

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    //Dates 기본 배열들
    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    //prevDates 계산
    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i);
        }
    }

    //nextDates 계산
    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    //Dates 합치기
    const dates = prevDates.concat(thisDates, nextDates);

    //Dates 정리
    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);


    dates.forEach((date, i) => {
        const condition = i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';
        dates[
			i
		] = `<div class="date"><span class="${condition}"">${date}</span></div>`;
    });

    //그리기
    document.querySelector('.calendar-days').innerHTML = dates.join('');

    //오늘 날짜 그리기
    const today = new Date();
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
        for(let date of document.querySelectorAll('.this')) {
            date.classList.add('today');
            break;
        }
    }
};

//이전 버튼
const prevMonth = () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
};

//다음 버튼
const nextMonth = () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
};

const goToday = () => {
    date = new Date();
    renderCalendar();
};

window.addEventListener('load', renderCalendar);
