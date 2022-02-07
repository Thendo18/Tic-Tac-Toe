import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'my-app';

  btnRef: any;
  popupRef: any;
  newgameBtn: any;
  restartBtn: any;
  msgRef: any;

  //Winning Pattern Array
  winningPattern: any[] = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //Player 'X' plays first
  xTurn = true;
  count = 0;


  ngOnInit(): void {

  }

  newGame() {
    this.count = 0;
    this.enableButtons();
  }

  restartGame() {
    this.count = 0;
    this.enableButtons();
  }

  ngAfterViewInit(): void {
    this.btnRef = document.querySelectorAll(".button-option");
    this.popupRef = document.querySelector(".popup");
    this.msgRef = document.getElementById("message");
    //Display X/O on click
    this.btnRef.forEach((element: any) => {
      element.addEventListener("click", () => {
        if (this.xTurn) {
          this.xTurn = false;
          //Display X
          element.innerText = "X";
          element.disabled = true;
        } else {
          this.xTurn = true;
          //Display Y
          element.innerText = "O";
          element.disabled = true;
        }

        //Increment count on each click
        this.count += 1;
        if (this.count == 9) {
          this.drawFunction();
        }
        //Check for win on every click
        this.winChecker();
      });
    });
  }


  //Disable All Buttons
  disableButtons(): void {
    this.btnRef.forEach((element: any) => (element.disabled = true));
    //enable popup
    this.popupRef.classList.remove("hide");
  }

  //Enable all buttons (For New Game and Restart)
  enableButtons() {
    this.btnRef.forEach((element: any) => {
      element.innerText = "";
      element.disabled = false;
    });
    //disable popup
    this.popupRef.classList.add("hide");
  }

  //This function is executed when a player wins
  winFunction(letter: any): void {
    this.disableButtons();
    if (letter == "X") {
      this.msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    } else {
      this.msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
    }
  };

  //Function for draw
  drawFunction() {
    this.disableButtons();
    this.msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
  };

  //Win Logic
  winChecker() {
    //Loop through all win patterns
    for (let i of this.winningPattern) {
      let [element1, element2, element3] = [
        this.btnRef[i[0]].innerText,
        this.btnRef[i[1]].innerText,
        this.btnRef[i[2]].innerText,
      ];
      //Check if elements are filled
      //If 3 empty elements are same and would give win as would
      if (element1 != "" && (element2 != "") && (element3 != "")) {
        if (element1 == element2 && element2 == element3) {
          //If all 3 buttons have same values then pass the value to winFunction
          this.winFunction(element1);
        }
      }
    }
  };

}
