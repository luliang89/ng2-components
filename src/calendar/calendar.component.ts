import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';


@Component({
    selector: 'calendar',
    templateUrl: `./calendar.component.html`,
    styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements AfterViewInit {

    _dates = [];

    @Input()
    public get dates() {
        return this._dates;
    }

    public set dates(value) {
        if(value){
            if (value instanceof Array) {
                this._dates = value;
            }else{
                this._dates = new Array(value);
            }
        }
    }

    @Input()
    many

    @Output() onVoted = new EventEmitter();

    weeks: any;

    salesDate = new Date();

    month: any

    constructor() { }

    ngAfterViewInit() {
        this.render(true);
    }

    clicks(item,week) {
        if (item.date) {
            if (item.on) {
                item.on = false;
                this.removeByValue(this._dates, this.month + '-' + this.setVal(item.date));
                return;
            }
            if(!this.many){
                this.dates = [];
                this.chenckOn(week);
            }
            item.on = true;
            this._dates.push(this.month + '-' + this.setVal(item.date));
        }
        this.onVoted.emit(this._dates);
    }

    chenckOn(week){
        for(let i of week){
            for(let m of i){
                m.on = false;
            }
        }
    }

    removeByValue(arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    }

    setVal(i) {
        return i < 10 ? '0' + i : i;
    }

    prevMonth = () => {
        this.salesDate = new Date(this.salesDate.setMonth(this.salesDate.getMonth() - 1, 1));
        this.render(false);
    }

    nextMonth = () => {
        this.salesDate = new Date(this.salesDate.setMonth(this.salesDate.getMonth() + 1, 1));
        this.render(false);
    }

    render(status:boolean) {
        if(this._dates.length > 0 && status){
            this.salesDate = new Date(this._dates[0]);
        }
        let date = this.salesDate;
        this.month = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1));
        let arr = [];
        date.setDate(1);
        date.setHours(0, 0, 0, 0);
        let day = date.getDay() - 1;
        day = day < 0 ? 6 : day;
        for (let i = 0; i < day; i++) {
            arr.push({});
        }
        date.setMonth(date.getMonth() + 1);
        date.setSeconds(-1);
        let max = date.getDate();
        //let dataHasValue = !!data;
        for (let i = 1; i <= max; i++) {
            let on = null;
            if (this._dates.length > 0) {
                for (let x of this._dates) {
                    if (x == this.month + '-' + this.setVal(i)) {
                        on = true;
                    }
                }
            }
            arr.push({
                date: i,
                on: on
            });
        }
        day = 7 - date.getDay();
        day = day > 6 ? 0 : day;
        for (let i = 0; i < day; i++) {
            arr.push({});
        }
        let weeks = [];
        let rowNumber = Math.ceil(arr.length / 7);
        for (let i = 0; i < rowNumber; i++) {
            let start = i * 7;
            weeks.push(arr.slice(start, start + 7));
        }
        this.weeks = weeks;
    }

}
