import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  pages: number = 1;
  
  @Output() createAction = new EventEmitter<Event>();
  @Output() changeAction = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit(): void {
    // add click event listener to "Page 1" button and set its color to hovered
    let page = document.getElementsByClassName("tab-btn")[0] as HTMLButtonElement;
    page.style.backgroundColor = "var(--hovered)";
    page.addEventListener('click', (event) => {
      this.changeCanvas(parseInt(page.name));
    });
  }

  addPage(event: Event) {
    // Create the new page to insert
    let newPage = document.createElement("button");
    newPage.classList.add("tab-btn");
    this.pages++;
    newPage.innerHTML = "Page " + this.pages;
    newPage.name = String(this.pages);
    // Get a reference to the parent node
    let parentNode;
    let addPage = document.getElementById("add-page");
    if(addPage)
      parentNode = addPage.parentNode;
    parentNode?.insertBefore(newPage,addPage);
    // add canvas to the canvas component
    this.createCanavas(event);
    // change the canvas shown
    newPage.addEventListener('click', (event) => {
      this.changeCanvas(parseInt(newPage.name));
    });
  }
  createCanavas(event: Event) {
    this.createAction.emit(event);   
  }
  changeCanvas(cnv_number: number) {
    let pages = document.getElementsByClassName("tab-btn") as HTMLCollectionOf<HTMLButtonElement>;
    for(let i=0; i<this.pages; i++) {
      pages[i].style.backgroundColor = "var(--unhovered)";
    }
    pages[cnv_number-1].style.backgroundColor = "var(--hovered)";
    this.changeAction.emit(cnv_number);   
  }

}
