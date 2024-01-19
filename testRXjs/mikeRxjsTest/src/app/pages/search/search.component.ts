import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  switchMap,
  tap,
} from 'rxjs';

interface DataModel {
  full_name: string;
  stargazers_count: number;
  forks_count: number;
}

interface SearchModel {
  tempKeyword: string;
  per_page?: number;
  page?: number;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [HttpClient],
})
export class SearchComponent {
  private _http = inject(HttpClient);

  baseApiUrl = 'https://api.github.com/search/repositories'; // Github API
  loading = false; // 是否正在載入資料
  data: DataModel[] = []; // 資料列表
  searchData: SearchModel = {
    // 搜尋資料
    tempKeyword: '',
    per_page: 10,
    page: 1,
  };

  keyUp = new Subject<string>(); // 輸入框鍵盤事件
  sortBy$ = new BehaviorSubject({ sort: 'stars', order: 'desc' }); // 排序資訊

  fuzzyQueryData: string[] = [];

  ngOnInit(): void {
    // 設定模糊查詢 RxJS 流
    this.keyUp
      .pipe(
        debounceTime(300), // 等待時間，避免立即響應每次按鍵
        distinctUntilChanged(), // 只有當輸入值變化時才發送
        map((value) => value.trim()), // 去除前後空格
        tap((value) => value === '' && (this.fuzzyQueryData = [])), // 當輸入值為空時清空模糊查詢資料
        filter((value) => value !== '' && value.length >= 3), // 當輸入值不為空且長度大於等於3時才發送

        switchMap((keyword) => {
          return this.getGithubData$({ tempKeyword: keyword });
        }),
        tap((res: DataModel[]) => {
          this.fuzzyQueryData = res.map((item) => item.full_name);
        })
      )
      .subscribe();

    // 顯示 stars 排序資訊
    this.sortBy$
      .pipe(filter((sort) => sort.sort === 'stars'))
      .subscribe((sort) => {
        this.data.sort((a, b) => {
          if (sort.order === 'asc') {
            return a.stargazers_count - b.stargazers_count;
          } else {
            return b.stargazers_count - a.stargazers_count;
          }
        });
      });

    // 顯示 forks 排序資訊
    this.sortBy$
      .pipe(filter((sort) => sort.sort === 'forks'))
      .subscribe((sort) => {
        this.data.sort((a, b) => {
          if (sort.order === 'asc') {
            return a.forks_count - b.forks_count;
          } else {
            return b.forks_count - a.forks_count;
          }
        });
      });
  }

  // 搜尋
  search(keyword: string, selectPage: string = '10', setPage: number = 1) {
    this.loading = true;
    this.fuzzyQueryData = [];
    this.searchData = {
      tempKeyword: keyword,
      per_page: Number(selectPage),
      page: setPage,
    };
    this.getGithubData$(this.searchData)
      .pipe(
        finalize(() => (this.loading = false)),
        filter((res) => res.length > 0),
        tap((res: DataModel[]) => (this.data = res))
      )
      .subscribe();
  }
  // 切換頁面
  changePage(changeNum: -1 | 1, selectPage: string): void {
    if (changeNum < 0 && this.searchData.page === 1) {
      return;
    }
    this.search(
      this.searchData.tempKeyword,
      selectPage,
      this.searchData.page! + changeNum
    );
  }

  // 切換排序
  changeSort = (sortField: string) => {
    if (sortField === this.sortBy$.value.sort) {
      this.sortBy$.next({
        sort: sortField,
        order: this.sortBy$.value.order === 'asc' ? 'desc' : 'asc',
      });
    } else {
      this.sortBy$.next({
        sort: sortField,
        order: 'desc',
      });
    }
  };
  // 鍵盤事件
  onKeyUp(event: KeyboardEvent) {
    this.keyUp.next((<HTMLInputElement>event.target).value);
  }

  // 取得 Github 資料
  getGithubData$(data: SearchModel): Observable<DataModel[]> {
    let apiUrl = `${this.baseApiUrl}?q=${data.tempKeyword}`;
    if (!!data.per_page && !!data.page) {
      apiUrl = apiUrl + `&per_page=${data.per_page}` + `&page=${data.page}`;
    }
    return this._http.get(apiUrl).pipe(
      catchError((err) => {
        alert(err.message);
        return [];
      }),
      map((res: any) => res.items),
      map(this.toDataModel)
    );
  }

  // 轉換資料格式
  toDataModel(items: any[]): DataModel[] {
    return items.map((item: any) => {
      return {
        full_name: item.full_name,
        stargazers_count: item.stargazers_count,
        forks_count: item.forks_count,
      };
    });
  }
}
