import { computed, Injectable, signal } from "@angular/core";
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Page } from "../utils/page.model";
import { PageService } from "./page.service";

@Injectable({
  providedIn: 'root'
})
export class PageStore {
  page$$ = signal<Page | null>(null);
  pages$$ = signal<Page[]>([]);
  loading$$ = signal<boolean>(false);
  error$$ = signal<string | null>(null);

  primaryNavPages$$ = computed(() =>
    this.pages$$().filter(page => page.primaryNavigation === true)
  );

  getPageBySlug(slug: string) {
    return computed(() => this.pages$$().find(p => p.slug === slug));
  }

  constructor(private pageService: PageService) {}

  loadPage(slug: string) {
    this.loading$$.set(true);
    this.error$$.set(null);

    this.pageService.getPageBySlug(slug).pipe(
      tap(page => {
        this.page$$.set(page);
        console.log('Page loaded: ', this.page$$());
        this.loading$$.set(false);
      }),
      catchError((error) => {
        this.error$$.set(`Failed to load page. ${error}`);
        this.loading$$.set(false);
        return of(null);
      })
    ).subscribe();
  }

  loadPages() {
    this.loading$$.set(true);
    this.error$$.set(null);

    this.pageService.getPages().pipe(
      tap( pages => {
        this.pages$$.set(pages);
        console.log('Pages loaded: ', this.pages$$());
        this.loading$$.set(false);
      }),
      catchError((error) => {
        this.error$$.set(`Failed to load pages. ${error}`);
        this.loading$$.set(false);
        return of([]);
      })
    ).subscribe();
  }

  getPrimaryNavPages(): Page[] {
    return this.pages$$().filter( page => page.primaryNavigation === true );
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
