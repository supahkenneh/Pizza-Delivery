/* 
Problem 2 
The next day, to speed up the process, the delivery person rents a pizza-delivering goat. She and the goat begin at the same starting location, and they both deliver a pizza to this starting house. She and the goat then take turns moving based on the dispatcher's instructions.

Here are some examples:

^v now delivers pizzas to three houses; The delivery person goes north and the goat goes south.
^>v< now delivers pizzas to three houses; The delivery person and the goat both end up back where they started.
^v^v^v^v^v now delivers pizzas to 11 houses; The delivery person treks north and the goat treks south.
Given the same string of dispatcher inputs as in Part 1, how many houses receive at least one pizza?
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
        // deliveryTrackArr holds unique [x, y] points starting at [0, 0]
        const deliveryTrackArr = [[0, 0]];
        const startPosition = [0, 0];
        // driver and goat start at same position
        let driverPosition = startPosition;
        let goatPosition = startPosition;
        data.split('').forEach((direction, idx) => {
            // driver goes first taking turns with goat. Driver moves on direction on index 0 and every other index
            if (idx === 0 || idx % 2 === 0) {
                driverPosition = JSON.parse(JSON.stringify(driverPosition));
                switch (direction) {
                    case up:
                        driverPosition[0] += 1;
                        break;
                    case down:
                        driverPosition[0] -= 1;
                        break;
                    case left:
                        driverPosition[1] -= 1;
                        break;
                    case right:
                        driverPosition[1] += 1;
                        break;
                }
                // push unique [x, y] points to deliveryTrackArr
                if (!deliveryTrackArr.find(elem => elem[0] === driverPosition[0] && elem[1] === driverPosition[1])) {
                    deliveryTrackArr.push(driverPosition);
                }
            } else {
                // goat moves every other index that driver isn't moving on (odd indexes)
                goatPosition = JSON.parse(JSON.stringify(goatPosition));
                switch (direction) {
                    case up:
                        goatPosition[0] += 1;
                        break;
                    case down:
                        goatPosition[0] -= 1;
                        break;
                    case left:
                        goatPosition[1] -= 1;
                        break;
                    case right:
                        goatPosition[1] += 1;
                        break;
                    default:
                        throw 'Invalid values present in input file, expected values: ^, v, <, >';
                }
                // push unique [x, y] points to deliveryTrackArr
                if (!deliveryTrackArr.find(elem => elem[0] === goatPosition[0] && elem[1] === goatPosition[1])) {
                    deliveryTrackArr.push(goatPosition);
                }
            }
        })
        // returns length of deliveryTrackArr (# of unique houses that have had at least one pizza delivered)
        return deliveryTrackArr.length;
    })
    .then(result => {
        // log result to console
        console.log(result);
    })
    .catch(error => {
        // handle errors
        console.log(error);
    })

