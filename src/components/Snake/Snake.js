import React, { useRef, useEffect, useState } from 'react';
const SPEED = 10;
const WIDHT = 300;
const HEIGHT = 300;

const Snake = (props) => {

    const canvas = useRef();
    let snake = [{ x: 150, y: 150 }, { x: 140, y: 150 }, { x: 130, y: 150 }, { x: 120, y: 150 }, { x: 110, y: 150 },];
    let food = null;
    let playing = true;
    let Tick = null;
    let score = useRef(0);

    const drawSquare = (obj, color, borderColor) => {
        let ctx = canvas.current.getContext('2d');
        ctx.fillStyle = color;
        ctx.strokestyle = borderColor;
        ctx.fillRect(obj.x, obj.y, 10, 10);
        ctx.strokeRect(obj.x, obj.y, 10, 10);
    }

    const drawSnakePart = (snakePart) => {
        drawSquare(snakePart, 'lightgreen', 'darkgreen')
    }

    const drawSnake = () => {
        snake.forEach(drawSnakePart);
    }

    // constant adding makes the whole snake move as head becomes second element every change
    const advanceSnake = (dx, dy) => {
        const head = {
            x: (snake[0].x + dx) < 0 ? WIDHT : (snake[0].x + dx) % WIDHT,
            y: (snake[0].y + dy) < 0 ? HEIGHT : (snake[0].y + dy) % HEIGHT
        };
        // add the new head
        snake.unshift(head);
        // remove tail
        if (!isColliding(food, head))
            snake.pop();
        else {
            createFood();
            score.current = score.current + 10;
            document.getElementById('score').innerHTML = `Score: ${score.current}`;
        }
    }

    const advanceUp = () => {
        advanceSnake(0, -SPEED);
    }
    const advanceRight = () => {
        advanceSnake(SPEED, 0);
    }

    const advanceDown = () => {
        advanceSnake(0, SPEED);
    }

    const advanceLeft = () => {
        advanceSnake(-SPEED, 0);
    }

    const advance = useRef(advanceRight);

    const clearCanvas = () => {
        let ctx = canvas.current.getContext('2d');
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
        ctx.strokeRect(0, 0, canvas.current.width, canvas.current.height);
    }



    const changeDirection = (e) => {
        let arrow = e.keyCode;

        switch (arrow) {
            // up
            case (38):
                if (advance.current !== advanceDown) {
                    advance.current = advanceUp;
                }
                break;


            // right
            case (39):
                if (advance.current !== advanceLeft) {
                    advance.current = advanceRight;
                }
                break;


            // down
            case (40):
                if (advance.current !== advanceUp) {
                    advance.current = advanceDown;
                }
                break;

            //left
            case (37):
                if (advance.current !== advanceRight) {
                    advance.current = advanceLeft;
                }
                break;

            // case (32):
            //     if (playing) {
            //         playing = false;
            //         stopGame();
            //     } else {
            //         playing = true;
            //         startGame();
            //     }
            //     break;

            default:
                break;
        }
    }

    const stopGame = () => {
        clearInterval(Tick);
    }

    const startGame = () => {
        Tick = setInterval(() => {
            onTick();
        }, 100)
    }

    const createFood = () => {
        food = {
            x: Math.round((Math.random() * (WIDHT - 10)) / 10) * 10,
            y: Math.round((Math.random() * (HEIGHT - 10)) / 10) * 10,
        }
    }

    const isColliding = (obj1, obj2) => {
        return obj1.x === obj2.x && obj1.y === obj2.y;
    }

    const isFoodOnSnake = () => {
        for (let i = 0; i < snake.length; i++) {
            if (isColliding(food, snake[i])) {
                createFood();
                break;
            }
        }
    }

    const selfCollide = () => {
        for (let i = 4; i < snake.length; i++) {
            if (isColliding(snake[0], snake[i])) {
                playing = false;
                stopGame();
                let ctx = canvas.current.getContext('2d');
                ctx.font = "30px Arial";
                ctx.fillText("Game Over :(", 10, 50);
            }
        }
    }

    const restartGame = () => {
        if (!playing) {
            snake = [{ x: 150, y: 150 }, { x: 140, y: 150 }, { x: 130, y: 150 }, { x: 120, y: 150 }, { x: 110, y: 150 },];
            score.current = 0;
            playing = true;
            advance.current =  advanceRight;
            startGame();
        }
    }

    const drawFood = () => {
        isFoodOnSnake();
        drawSquare(food, 'red', 'darkred')
    }

    const onTick = () => {
        clearCanvas();
        advance.current();
        drawSnake();
        drawFood();
        selfCollide();
    }

    useEffect(() => {
        document.addEventListener('keydown', changeDirection);
        createFood();
        startGame();
        return () => {
            clearInterval(Tick);
        }
    }, []);

    return (
        <>
            <div className='section'>
                <canvas id='snakeCanvas' width='300px' height='300px' ref={canvas} style={{ border: '2px solid black' }}></canvas>
            </div>
            <div className='row'>
                <div id='score'>
                    Score: {props.score}
                </div>
            </div>
            <button onClick={restartGame}>Reset</button>
        </>
    )
}

export default Snake;