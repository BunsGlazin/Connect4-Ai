import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NotificationService } from './notification.service';
import { NgToastService } from 'ng-angular-popup';
import { NONE_TYPE } from '@angular/compiler';
import { withDebugTracing } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'project';

  hero!: number;
  power = '';

  constructor(private toast: NgToastService) {}

  board: any;
  WIDTH = 7;
  HEIGHT = 6;
  chance: any;
  present: any;
  num: any;
  lastchance: any;
  x: any;
  player1score: number = 0;
  player2score: number = 0;

  ngOnInit() {
    this.board = [
      [-1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1]
    ];

    this.present = [
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true]
    ];
    this.num = [5, 5, 5, 5, 5, 5, 5];
    this.chance = 0;
    this.lastchance = 1;
  }

  pressed(l: number, b: number, c: any): void {
    //console.log(b);

    if(!this.isNotDraw()) {
      this.present = [
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false]];
      setTimeout(()=>{this.resetter();}, 3000);

      this.showDraw()
      return;
    }

    this.insertPiece(b, (this.chance % 2) + 1);
    this.chance++;
    this.x = this.chkwinner();
    if (this.x != -1) {
      this.present = [
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false]];
      setTimeout(()=>{this.resetter();}, 3000);
      
      //console.log('Player ' + this.x + ' wins!!');
      this.showSuccess();
      if (this.x == 1) {
        this.player1score++;
      } else {
        this.player2score++;
      }
    } else {
      // After player's move, make AI move
      this.makeAIMove();
      this.chance++
      if(!this.isNotDraw()) {
        this.present = [
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false]];
        setTimeout(()=>{this.resetter();}, 3000);
  
        this.showDraw()
        return;
      }
      this.x = this.chkwinner();
      //console.log('this is winner checker ' + this.x);
      if (this.x != -1) {
        this.present = [
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false],
          [false, false, false, false, false, false, false]];
        setTimeout(()=>{this.resetter();}, 3000);
        
        //console.log('Player ' + this.x + ' wins!!');
        this.showSuccess();
        if (this.x == 1) {
          this.player1score++;
        } else {
          this.player2score++;
        }
      }
    }
    //console.log(this.chance);
    //console.log(this.board);
    //console.log(this.num)
    //console.log(this.get_valid_locations())
  }

  chkLine(a: number, b: number, c: number, d: number) {
    return a != -1 && a == b && a == c && a == d;
  }

  chkwinner(): number {
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 7; c++)
        if (
          this.chkLine(
            this.board[r][c],
            this.board[r + 1][c],
            this.board[r + 2][c],
            this.board[r + 3][c]
          )
        )
          return this.board[r][c];

    for (let r = 0; r < 6; r++)
      for (let c = 0; c < 4; c++)
        if (
          this.chkLine(
            this.board[r][c],
            this.board[r][c + 1],
            this.board[r][c + 2],
            this.board[r][c + 3]
          )
        )
          return this.board[r][c];

    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 4; c++)
        if (
          this.chkLine(
            this.board[r][c],
            this.board[r + 1][c + 1],
            this.board[r + 2][c + 2],
            this.board[r + 3][c + 3]
          )
        )
          return this.board[r][c];

    for (let r = 3; r < 6; r++)
      for (let c = 0; c < 4; c++)
        if (
          this.chkLine(
            this.board[r][c],
            this.board[r - 1][c + 1],
            this.board[r - 2][c + 2],
            this.board[r - 3][c + 3]
          )
        )
          return this.board[r][c];
    return -1;
  }

  showDraw() {
    this.toast.success({
      detail: 'Game ended in a draw!',
      summary: '',
      duration: 3000,
    });
  }


  showSuccess() {
    this.toast.success({
      detail: 'WE HAVE A WINNER!',
      summary: (this.x==1 ? "You " : "AI ") + (this.x==1 ? "win!!" : "wins!!"),
      duration: 3000,
    });
  }

  resetter() {

    this.board = [
      [-1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1]
    ];

    this.present = [
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true],
    ];
    this.num = [5, 5, 5, 5, 5, 5, 5];
    this.lastchance = !this.lastchance;
    this.chance = 0;

    for(let i = 0; i< this.HEIGHT; i++){
      for (let j = 0; j < this.WIDTH; j++){
        document.getElementById('hole' + i + '' + j)?.style.setProperty('background-color', 'black')
      }
    }
  }

  insertPiece(col: number, aiOp: any) {
    //console.log('in insertpi ' + col + '  ' + aiOp);
    if (aiOp == 1) {
      document.getElementById('hole' + this.num[col] + '' + col)?.style.setProperty('background-color', 'red');
    } else {
      document.getElementById('hole' + this.num[col] + '' + col)?.style.setProperty('background-color', 'yellow');
    }
    this.present[this.num[col]][col] = false;
    this.board[this.num[col]][col] = aiOp;
    this.num[col]-=1;
  }



  isWinningMove(col: number): boolean {
    const current_player = 1 + this.chance % 2;

    //console.log(col, this.num)

    // Check for vertical alignments
    if (this.num[col] <= 2 && this.num[col]>=0 &&
        this.board[this.num[col] + 1][col] === current_player &&
        this.board[this.num[col] + 2][col] === current_player &&
        this.board[this.num[col] + 3][col] === current_player) {
        return true;
    }

    for (let dy = -1; dy <= 1; dy++) {
        let nb = 0; // Counter of the number of stones of the current player surrounding the played stone in the tested direction.
        for (let dx = -1; dx <= 1; dx += 2) {
            for (let x = col + dx, y = this.num[col] + dx * dy; x >= 0 && x < this.WIDTH && y >= 0 && y < this.HEIGHT; nb++) {
                //console.log(x, this.board[y], typeof(x))
                if(this.board[y][x] !== current_player) {
                  break;
                }
                x += dx;
                y += dx * dy;
            }
        }
        if (nb >= 3) return true; // There is an alignment if at least 3 other stones of the current user are surrounding the played stone in the tested direction.
    }
    return false;
  }


  get_valid_locations(): number[] {
    const valid_locations: number[] = [];
    for (let c = 0; c < this.WIDTH; c++) {
        if (this.num[c] >= 0) {
            valid_locations.push(c);
        }
    }
    return valid_locations;
  }


  isNotDraw() {
    for(let i = 0; i<this.WIDTH; i++) {
      if (this.num[i]>=0) return true
    }
    return false
  }

  canPlay(col : number) {
    return this.num[col]>=0
  }


  winning_move() {

    for (let i = 0; i<this.WIDTH; i++) {
      if (this.isWinningMove(i) ) {
        return {"col" : i, "result" : true, "player" : this.chance%2 + 1}
      }
    }

    return {"col" : null, "result" : false, "player" : this.chance%2 + 1}
  }


  is_terminal_node() {
    return this.winning_move()["result"] || !this.isNotDraw()
  }



  minimax(depth: number, alpha: number, beta: number, maximizingPlayer: boolean): [number | null, number] {
    const valid_locations = this.get_valid_locations();
    const is_terminal = this.is_terminal_node();

    if (depth == 0 || is_terminal) {
        if (is_terminal) {
            let winResult = this.winning_move()
            if (winResult["result"] && winResult["player"]==2) {
                return [winResult['col'], 100000000000000];
            } else if (winResult["result"] && winResult["player"]==1) {
                return [winResult["col"], -10000000000000];
            } else {
                return [null, 0];
            }
        } else {
            return [null, this.score_position(2)];
        }
    }

    if (maximizingPlayer) {
        let value = -Infinity;
        let column = valid_locations[Math.floor(Math.random() * valid_locations.length)];
        for (const col of valid_locations) {
            const row = this.num[col];
            const b_copy = JSON.parse(JSON.stringify(this.board)); // Deep copy
            this.board[row][col] = 2
            this.chance++
            this.num[col]--

            const new_score = this.minimax(depth - 1, alpha, beta, false)[1];

            this.board[row][col] = -1
            this.chance--
            this.num[col]++
            if (new_score > value) {
                value = new_score;
                column = col;
            }
            alpha = Math.max(alpha, value);
            if (alpha >= beta) {
                break;
            }
        }
        return [column, value];
    } else {
        let value = Infinity;
        let column = valid_locations[Math.floor(Math.random() * valid_locations.length)];
        for (const col of valid_locations) {
            const row = this.num[col];
            const b_copy = JSON.parse(JSON.stringify(this.board)); // Deep copy
            this.board[row][col] = 1
            this.chance++
            this.num[col]--

            const new_score = this.minimax(depth - 1, alpha, beta, true)[1];

            this.board[row][col] = -1
            this.chance--
            this.num[col]++
            if (new_score < value) {
                value = new_score;
                column = col;
            }
            beta = Math.min(beta, value);
            if (alpha >= beta) {
                break;
            }
        }
        return [column, value];
    }
  }


  evaluate_window(window: number[], piece: number): number {
    let score = 0;
    const opp_piece = piece === 1 ? 2 : 1;

    if (window.filter(cell => cell === piece).length === 4) {
        score += 100;
    } else if (window.filter(cell => cell === piece).length === 3 && window.includes(-1)) {
        score += 5;
    } else if (window.filter(cell => cell === piece).length === 2 && window.filter(cell => cell === -1).length === 2) {
        score += 2;
    }

    if (window.filter(cell => cell === opp_piece).length === 3 && window.includes(-1)) {
        score -= 4;
    }

    return score;
  }

  score_position(piece: number): number {
    let score = 0;

    // Score center column
    const center_array = this.board.map((row: any[]) => row[this.WIDTH / 2]);
    const center_count = center_array.filter((cell: number) => cell === piece).length;
    score += center_count * 3;

    // Score Horizontal
    for (let r = 0; r < this.HEIGHT; r++) {
        for (let c = 0; c < this.WIDTH - 3; c++) {
            const window = this.board[r].slice(c, c + 4);
            score += this.evaluate_window(window, piece);
        }
    }

    // Score Vertical
    for (let c = 0; c < this.WIDTH; c++) {
        for (let r = 0; r < this.HEIGHT - 3; r++) {
            const window = [];
            for (let i = 0; i < 4; i++) {
                window.push(this.board[r + i][c]);
            }
            score += this.evaluate_window(window, piece);
        }
    }

    // Score positive sloped diagonal
    for (let r = 0; r < this.HEIGHT - 3; r++) {
        for (let c = 0; c < this.WIDTH - 3; c++) {
            const window = [];
            for (let i = 0; i < 4; i++) {
                window.push(this.board[r + i][c + i]);
            }
            score += this.evaluate_window(window, piece);
        }
    }

    // Score negative sloped diagonal
    for (let r = 0; r < this.HEIGHT - 3; r++) {
        for (let c = 0; c < this.WIDTH - 3; c++) {
            const window = [];
            for (let i = 0; i < 4; i++) {
                window.push(this.board[r + 3 - i][c + i]);
            }
            score += this.evaluate_window(window, piece);
        }
    }

    return score;
  }





  negaMax(alpha : number, beta : number, maxomin : boolean) : number {

    if (this.chance==this.WIDTH*this.HEIGHT) return 0;

    //debugger;

    for(let i = 0; i< this.WIDTH; i++) {
      if(this.canPlay(i) && this.isWinningMove(i)) {
        return Math.floor((this.WIDTH*this.HEIGHT + 1 - this.chance)/2)
      }
    }

    let maxi = Math.floor((this.WIDTH*this.HEIGHT - 1 - this.chance)/2)

    if (beta>maxi) {
      beta = maxi
      if (alpha>beta) return beta;
    }

    for(let i = 0; i<this.WIDTH; i++) {
      if (this.canPlay(i)) {
        if(maxomin) this.board[this.num[i]][i] = 1;
        else this.board[this.num[i]][i] = 2;
        this.num[i]--
        this.chance++

        let score = -this.negaMax(-beta, -alpha, !maxomin)
        //console.log(this.num[i], i)
        this.chance--
        this.num[i]++
        this.board[this.num[i]][i] = -1
        

        if(score >= beta) return score;  // prune the exploration if we find a possible move better than what we were looking for.
        if(score > alpha) alpha = score;
      }

      return alpha;
    }


    return 0;
  }

  makeAIMove() {
    let val = this.minimax(2, -Infinity, Infinity, true);
    let colVal = val[0]
    this.insertPiece(colVal!=null ? colVal : -1, 2)
  }
}
