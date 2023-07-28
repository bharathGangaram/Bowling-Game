import { Component } from '@angular/core';
class Frame {
  firstRoll: string = '';
  secondRoll: string = '';
  thirdRoll: string = '';
  total: number = 0;
  strike: any;
  spare: any;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  columns: any = Array.from({ length: 10 })
  noOfPlayers: number = 0;
  isViewPlayerInput: boolean = false;
  title = 'bowling-game';
  gameStep: number = 1;
  players: any[] = []
  roll: any;

  currentFrame: number = 0;
  currentPlayer: number = 0;
  isGameEnd: boolean = false;
  // initial game start
  startGame() {
    this.gameStep++;
    for (let index = 0; index < this.noOfPlayers; index++) {
      this.players.push(Array.from({ length: 10 }, () => new Frame()))
    }
  }
  // starts new game
  newGame() {
    this.gameStep = 1;
    this.players = [];
    this.currentFrame = 0;
    this.currentPlayer = 0;
    this.noOfPlayers = 0;
    this.isGameEnd = false;
  }
  // roll button action
  hit() {
    if (this.currentPlayer == this.noOfPlayers) {
      this.currentPlayer = 0;
      if (this.currentFrame < 9) this.currentFrame++;
      else {
        this.isGameEnd = true;
        return;
      }

    }
    // frames from 1 to 9
    if (this.currentFrame < 9) {

      if (this.CurrentFrameOp.firstRoll == '') {
        const roll = this.Random(10);
        this.CurrentFrameOp.firstRoll = roll + '';
        if (roll == 10) {
          this.CurrentFrameOp.strike = true;
          this.currentPlayer++;
        }
        return;
      }

      if (this.CurrentFrameOp.secondRoll == '' && !this.CurrentFrameOp.strike) {
        const roll = this.Random(10 - this.CurrentFrameOp.firstRoll);
        this.CurrentFrameOp.secondRoll = roll + "";


        if ((+this.CurrentFrameOp.firstRoll + +this.CurrentFrameOp.secondRoll) == 10) {
          this.CurrentFrameOp.spare = true;
        }

        this.currentPlayer++;
        return;
      }
      if (this.CurrentFrameOp.strike) {
        this.currentPlayer++;
      }
    }
    // frames 10
    else {

      if (this.CurrentFrameOp.firstRoll == '') {

        const roll = this.Random(10);
        this.CurrentFrameOp.firstRoll = roll + '';
        if (roll == 10) {
          this.CurrentFrameOp.strike = true;
          this.CurrentFrameOp.total = 10;
        }
        return;
      }
      if (this.CurrentFrameOp.secondRoll == '' && this.CurrentFrameOp.strike) {
        const roll = this.Random(10);
        if (this.CurrentFrameOp.total == 10) {
          this.CurrentFrameOp.secondRoll = roll + '';
          this.CurrentFrameOp.total = roll + "";
        }

        else if (this.CurrentFrameOp.total > 10) {
          this.CurrentFrameOp.total = roll + "";
          this.currentPlayer++;
        }
        return;
      }

      if (this.CurrentFrameOp.secondRoll != '' && this.CurrentFrameOp.strike) {
        const roll = this.Random(10);
        this.CurrentFrameOp.thirdRoll = roll + '';
        this.currentPlayer++;
        return;
      }

      if (this.CurrentFrameOp.secondRoll == '') {
        const roll = this.Random(10 - this.CurrentFrameOp.firstRoll);
        this.CurrentFrameOp.secondRoll = roll + '';
        if ((+this.CurrentFrameOp.firstRoll + +this.CurrentFrameOp.secondRoll) == 10) {
          this.CurrentFrameOp.spare = true;
          this.CurrentFrameOp.total = 10;
        }
        if ((+this.CurrentFrameOp.firstRoll + +this.CurrentFrameOp.secondRoll) < 10) {
          this.currentPlayer++;
        }


        return;
      }
      if (this.CurrentFrameOp.spare) {
        const roll = this.Random(10);
        this.CurrentFrameOp.thirdRoll = roll + "";
        this.CurrentFrameOp.total = roll + "";
        this.currentPlayer++;
      }
    }


  }
  // get cuurnt frame for the player
  get CurrentFrameOp() {
    return this.players[this.currentPlayer][this.currentFrame]
  }

  // generate random number from o to 10
  Random(end: number): number {
    const range = end + 1;
    return Math.floor(Math.random() * range);
  }

  // calculate frame total
  frameTotal(p: number, f: number): number {
    if (this.players[p][f]?.firstRoll == '') return 0;
    let total;
    const data = this.players[p][f]
    if (this.players[p][f]?.spare) {
      if (this.currentFrame == 9) {
        total = +data.firstRoll + +data.secondRoll + +data.thirdRoll
      }
      else {
        total = +data.firstRoll + +data.secondRoll + +this.players[p][f + 1]?.firstRoll
      }

    } else if (this.players[p][f]?.strike) {
      if (this.currentFrame == 9) {
        total = +data.firstRoll + +data.secondRoll + +data.thirdRoll
      }
      else {
        total = 10 + +this.players[p][f + 1]?.firstRoll + +this.players[p][f + 1]?.secondRoll
      }

    } else {
      total = +data.firstRoll + +data.secondRoll

    }
    return total;

  }

  // calculate player total by adding all frames of the player
  playerTotal(i: number) {
    let total = 0;
    for (let index = 0; index < 10; index++) {

      const element = this.frameTotal(i, index);
      total = +total + element;
    }
    return total
  }


}
