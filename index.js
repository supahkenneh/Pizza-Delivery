/*
 Problem 1
A delivery person is delivering pizzas to an infinite two-dimensional grid of houses. She begins by delivering a pizza to the house at her starting location; a dispatcher then calls via radio and tells her where to move next. Moves are always exactly one house to the north (^), south (v), east (>), or west (<). After each move, she delivers a pizza to the house at her new location. The dispatcher has been a little spacey lately, so she sometimes ends up delivering more than one pizza to the same house.

Here are some examples:

> delivers pizzas to two houses: one to the house at the starting location, and one to the house directly east of the starting location.
^>v< delivers pizzas to four houses in a square; the house at the starting/ending location ends up with two pizzas.
^v^v^v^v^v delivers a bunch of pizzas to some very lucky people at only two houses.
Given the string of dispatcher inputs in this file, how many houses receive at least one pizza?
*/

const fs = require('fs');
const { promisify } = require('util');
const fileName = './PizzaDeliveryInput.txt';
const testFile = './text.txt';

const up = '^';
const left = '<';
const down = 'v';
const right = '>';

const fileReaderPromise = promisify(fs.readFile);
//read input file
fileReaderPromise(fileName, 'utf8')
    .then(data => {
        // array to hold unique houses where pizza has been delivered
        const deliveryTrackArr = [];
        // start position, 2d grid [x, y]
        const startPosition = [0, 0];
        let newPosition = startPosition;
        data.split('').forEach(direction => {
            newPosition = JSON.parse(JSON.stringify(newPosition))
            // increment x or y value based on directional input
            switch (direction) {
                case up:
                    newPosition[0] += 1;
                    break;
                case down:
                    newPosition[0] -= 1;
                    break;
                case left:
                    newPosition[1] -= 1;
                    break;
                case right:
                    newPosition[1] += 1;
                    break;
                default:
                    // if no direction value or invalid directional input, throw error
                    throw 'Invalid values present in input file, expected values: ^, v, <, >';
            }
            // only push unique values into array
            if (!deliveryTrackArr.find(elem => elem[0] === newPosition[0] && elem[1] === newPosition[1])) {
                deliveryTrackArr.push(newPosition);
            }
        })
        // return length of array to find the number of houses that receives at least one pizza
        return deliveryTrackArr.length;
    })
    .then(result => {
        // log result (# houses that have received at least one pizza) to console
        console.log(result);
    })
    .catch(error => {
        // handle errors
        console.log(error);
    })

