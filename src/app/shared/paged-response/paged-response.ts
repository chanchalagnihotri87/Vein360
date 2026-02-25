export default class PagedResponse<T> {
  constructor(
    public items: T[],
    public totalPages: number,
    public currentPage: number,
  ) {}

  public get pageNumbers() {
    if (!this.currentPage) {
      return [];
    }

    const pages = [];

    for (let pageNo = 1; pageNo <= this.totalPages; pageNo++) {
      pages.push(pageNo);
    }

    let initialPage =
      pages[0] <= this.currentPage - 5 ? this.currentPage - 5 : pages[0];

    let lastPage = this.currentPage > 5 ? initialPage + 10 : initialPage + 9;

    if (lastPage > pages[pages.length - 1]) {
      lastPage = pages[pages.length - 1];
    }

    if (lastPage - this.currentPage < 5 && this.totalPages > 10) {
      initialPage = initialPage - (5 - (lastPage - this.currentPage));
    }

    return pages.filter((page) => page >= initialPage && page <= lastPage);
  }

  public get previousButtonDisabled() {
    if (this.currentPage && this.currentPage <= 1) {
      return true;
    }

    return false;
  }

  public get nextButtonDisabled() {
    if (this.currentPage && this.currentPage == this.totalPages) {
      return true;
    }

    return false;
  }
}
