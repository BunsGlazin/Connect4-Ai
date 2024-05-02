# Connect4 Ai using MiniMax Algorithm

## What is Connect4?
Connect Four is a two - player game in which the players choose a colour and then take turns dropping the coloured tokens into a six – row, seven – column vertical grid. The pieces fall straight down occupying the lowest available space in a column. The objective of the game is to be the first to form a horizontal, vertical or diagonal connection of four of one’s own colour. For every move made by one player that increases their chance of winning, there is an equal decrease in chance of winning for the other player. As the total gains and losses of the game negate each other, Connect Four is classified as a zero-sum  game.

## Technology used
This project makes use of Angular – a TypeScript powered frontend framework to implement the user interface and the AI code. Angular provides a versatile toolkit for building dynamic web applications, offering features such as two – way data binding, modular components, and multiple useful libraries. Angular’s TypeScript foundation offers significant advantages in terms of code maintainability, readability, and scalability. TypeScript’s typing system enhances code quality and facilitates early error detection which helps prevent common errors. TypeScript’s object – oriented features enable us to organize our codebase into reusable components and modules.

## Minimax Algorithm
As the Connect Four game is a zero-sum game, the MiniMax algorithm can be utilized to help the AI players make the best move in every scenario. The MiniMax algorithm makes use of the fact that both players are working against each other to make predictions about future states of the game. The idea behind the algorithm is that the algorithm’s (AI’s)  opponent will try to minimize whatever the algorithm is trying to maximize. The algorithm taking this into account, chooses a move that leaves the opponent capable of doing the least possible damage to the algorithm’s preferred game state.
