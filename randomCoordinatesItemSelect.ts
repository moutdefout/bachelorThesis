/**
 * @author Maud van Zundert <maud.vanzundert@ru.nl>
 * Used code from RandomItemSelect.ts
 */

import { list } from '../../../backend/lists';
import FlashCard from '../../components/FlashCard';
import { GameStatus } from '../../core/game';
import { RandomAlgorithm } from '../SelectionAlgorithm';

/**
 * (Semi)randomly select the next question and updates the myCoodinates variable
 * @returns index of next question
 */
export default function randomCoordinatesItemSelect(): number {
  const min = 0;
  const max = this.todo.length;
  const r = Math.floor(Math.random() * (max - min) + min);

  myCoordinates = updateToDoCoordinates()
  
  return this.todo[r].index;
}

export let myCoordinates = updateToDoCoordinates();

/**
 * (semi) randomizes order of list of coordinates 
 * @returns list of coordinates
 */
export function updateToDoCoordinates(): number[]{
  var coordinates = [125, 410]; // list of with two possible x-coordinates

  let randomized_coordinates = coordinates
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  
  return randomized_coordinates
}