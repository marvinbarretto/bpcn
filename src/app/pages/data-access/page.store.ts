import { Injectable, signal } from "@angular/core";
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Page } from "../utils/page.model";
import { PageService } from "./page.service";

@Injectable({
  providedIn: 'root'
})
export class PageStore {
  pages$$ = signal<Page[]>([]);
  loading$$ = signal<boolean>(false);
  error$$ = signal<string | null>(null);

  constructor(private pageService: PageService) {}

  loadPages() {
    this.loading$$.set(true);
    this.error$$.set(null);

    this.pageService.getPages().pipe(
      tap( pages => {
        this.pages$$.set(pages.data);
        this.loading$$.set(false);
      }),
      catchError((error) => {
        this.error$$.set(`Failed to load pages. ${error}`);
        this.loading$$.set(false);
        return of([]);
      })
    ).subscribe();
  }

  getRootPages(): Page[] {
    return this.pages$$().filter( page => !page.parentPage );
  }

  getChildPages(parentId: number): Page[] {
    return this.pages$$().filter( page => page.parentPage?.id === parentId);
  }

  hasChildren(pageId: number): boolean {
    return this.getChildPages(pageId).length > 0;
  }
}
