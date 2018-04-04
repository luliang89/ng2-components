import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';


@Component({
  selector: 'iui-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less']
})
export class IuiPaginationComponent implements AfterViewInit {

  pageCount = 1;

  private _total = 0;

  /**
   * 总记录数
   */
  @Input()
  public get total() {
    return this._total;
  }

  public set total(value: number) {
    value = Math.max(value, 0);
    if (value === this._total) {
      return;
    }
    this._total = value;
    this.setPageCount();
    this.setIndexStartAndEnd();
    this.setPages();
  }

  private _size = 10;

  /**
   * 页大小 
   */
  @Input()
  public get size() {
    return this._size;
  }

  public set size(value: number) {
    if (!value) {
      return;
    }
    value = Math.min(Math.max(Math.floor(value / 10), 1), 3) * 10;
    if (this._size === value) {
      return;
    }
    this._size = value;
  }

  private _page = 1;

  /**
   * 页码，从1开始
   */
  @Input()
  public get page() {
    return this._page;
  }

  public set page(value: number) {
    value = Math.min(Math.max(Math.floor(value), 1), this.pageCount);
    if (this._page === value) {
      return;
    }
    this._page = value;
  }

  /**
   * 索引开始
   */
  indexStart = 0;

  /**
   * 索引结束
   */
  indexEnd = 0;

  pages: number[] = [];

  @Output()
  pageChange: EventEmitter<{ page: number, size: number }>;

  itemCount: number;

  constructor(
    private elementRef: ElementRef
  ) {
    this.pageChange = new EventEmitter();
  }

  ngAfterViewInit() {
    //setTimeout(() => this.itemCount = this.getItemCount());
  }

  private emit() {
    this.pageChange.emit({
      page: this.page,
      size: this.size
    });
  }

  setPage(page: number) {
    if(page < 1 || page > this.pageCount){
      return;
    }
    if (this._page === page) {
      return;
    }
    this._page = page;
    this.emit();
    this.update();
  }

  setPageSize(size: number) {
    if (this._size === size) {
      return;
    }
    this._size = size;
    this.setPageCount();
    if (this.page > this.pageCount) {
      this.setPage(this.pageCount);
    } else {
      this.emit();
    }
    this.update();
  }

  private update() {
    if (!this.total) {
      return;
    }
    this.setIndexStartAndEnd();
    this.setPages();
  }

  private setIndexStartAndEnd() {
    this.indexStart = (this.page - 1) * this.size + 1;
    let end = this.page * this.size;
    this.indexEnd = end > this.total ? this.total : end;
  }

  private setPageCount() {
    this.pageCount = Math.max(1, Math.ceil(this.total / this.size));
  }

  private getItemCount() {
    let ele = this.elementRef.nativeElement as Element;
    let width = ele.parentElement.offsetWidth;
    if (width < 400) {
      return 1;
    }
    if (width < 500) {
      return 3;
    }
    return 5;
  }

  private setPages() {
    let [start, end] = this.applyPages();
    this.pages = Array<number>(end - start).fill(start + 1).map((s, i) => s + i);
  }

  private applyPages() {
    this.itemCount = this.getItemCount();
    let zero = [0, 1];
    if (this.pageCount < 2) {
      return zero;
    }
    if (this.itemCount === 1) {
      return zero;
    }
    let offset = Math.floor(this.itemCount / 2);
    let start = 1;
    let end = this.pageCount;
    if (this.page <= offset) {
      end = Math.min(end, this.itemCount);
    } else if (this.pageCount - this.page < offset) {
      start = Math.max(this.pageCount - this.itemCount, 0);
    } else {
      start = this.page - offset - 1;
      end = this.page + offset;
    }
    return [start, end];
  }

}
