import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable } from '@angular/core';
import { defer, fromEvent, merge, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mapTo } from 'rxjs/operators';

@Injectable()
export class FocusWithinService extends Observable<Element | null> {
  constructor(
    @Inject(DOCUMENT) documentRef: Document,
    { nativeElement }: ElementRef<HTMLElement>
  ) {
    // Level one: boolean
    const focused$ = merge(
      defer(() => of(documentRef.activeElement)),
      fromEvent(nativeElement, 'focusin').pipe(mapTo(true)),
      fromEvent<FocusEvent>(nativeElement, 'focusout').pipe(
        map(({ relatedTarget }) =>
          nativeElement.contains(relatedTarget as Node)
        )
      )
    ).pipe(distinctUntilChanged());

    super((subscriber) => focused$.subscribe(subscriber));

    // // Level two: element
    // const focusedElement$ = merge(
    //   defer(() => of(documentRef.activeElement)),
    //   fromEvent(nativeElement, "focusin").pipe(map(({ target }) => target)),
    //   fromEvent<FocusEvent>(nativeElement, "focusout").pipe(
    //     map(({ relatedTarget }) => relatedTarget)
    //   )
    // ).pipe(
    //   map((element: Element | null) =>
    //     element && nativeElement.contains(element) ? element : null
    //   ),
    //   distinctUntilChanged()
    // );

    // // Level three: element+
    // const final$ = merge(
    //   fromEvent(documentRef, "focusin"),
    //   fromEvent(documentRef, "focusout"),
    //   of(null)
    // ).pipe(
    //   debounceTime(0),
    //   map(() =>
    //     nativeElement.contains(documentRef.activeElement)
    //       ? documentRef.activeElement
    //       : null
    //   ),
    //   distinctUntilChanged()
    // );
    // // Beware of NgZone!
  }
}
