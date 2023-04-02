# 1x2-test

## Description
This is a submission for the 1x2 test. The following are some assumptions made while developing the solution:
- There is no need for a spin animation.
- Every symbol should animate since there is no payline field in the JSON data.

## How to Install and Run
The following are the steps to install and run the project:
1. Clone the repository and navigate to the project directory.
2. Run the command `npm install` to install the project dependencies.
3. Run the command `npm start` to start a local development server at http://localhost:3000/.
4. The game can now be accessed in your browser.
5. To build a final solution that can be hosted, run the command `npm run build`.

## Technologies Used
This project uses the following technologies:
- Pixi.js
- GreenSock Tween Engine
- Webpack
- TypeScript

## Project Structure
- /src contains the source code of the project.
- /assets contains the assets used in the project.

## Task
Given a set of symbol assets and dummy responses, create your own very simple slot machine. The simple slot machine should do the following:
- Load & display all the symbols in the /assets folder.
- Display the player's balance & stake amount.
- Display a button which simulates a 'spin' such that when clicked it does the following:
    - Deducts the player's stake from the current balance.
    - Randomly selects a dummy JSON response from the responses provided.
    - From the response, calculate if there was a win. If so, add that to the player's balance, play the 'win' animations for the correct winning symbols, and display the win amount.
- The button must remain disabled until all this has been completed.

## Bonus Task
- Make the stake adjustable by the player. This should change the amount deducted from the balance when pressing spin.
- The stake controls should remain disabled for the duration of the spin and win animations.

## Documentation
The documentation for Pixi.js, handling Spine assets, and GreenSock's Tween Engine can be found here:
- [PixiJs](https://pixijs.io/examples/#/demos-basic) - Pixi documentation
- [pixi-spine](https://github.com/pixijs/spine/tree/pixi5-spine3.7) - Pixi spine repository
- [GreenSock](https://greensock.com/docs/) - GreenSock Tween Engine documentation
