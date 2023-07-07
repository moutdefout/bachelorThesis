/**
 * @author Maud van Zundert <maud.vanzundert@ru.nl>
 * Used code from ItemToMap
 */

import React, { useContext } from 'react';
import ItemPair from '../core/item';
import useDragAndDrop from '../hooks/useDragAndDrop';
import FlashCard from './FlashCard';
import { PlayModeProps } from './GameInterface';
import { GameStateContext } from './GameProvider';
import Map from './Map';
import { GameState, GameStatus } from '../core/game';
import { myCoordinates } from '../algorithms/item-select/randomCoordinatesItemSelect';

export default function TwoItemsToContrast({
  editMode,
  cardZoom,
  mapDimensions,
}: PlayModeProps) {
  const { gameState, gameActions } = useContext(GameStateContext);

  const {
    items,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    zoom,
    setZoom,
    size,
    dragging,
  } = useDragAndDrop(gameState.activePairs, mapDimensions, editMode);

  const clickHandle = (pair: ItemPair) => {
    gameActions.processAnswer(pair.index);
  };

  const mouseHover = (pair: ItemPair) => {
    gameActions.hoverOverAnswer(pair); 
    // if event listener catches mouse movement, calls hoverOverAnswer function in game
  };

  var twoItems = newListToContrast(gameState.itemPairs, gameState?.current)

  return (
    <Map
      dragging={dragging}
      onMouseMove={onMouseMove}
      cardZoom={cardZoom}
      zoom={zoom}
      setZoom={setZoom}
      size={size}
      editMode={editMode}
      onMouseUp={onMouseUp}
      showBack={true}
      backgroundImage={gameState.backgroundImage} 
    >       
      {twoItems.map((item: ItemPair) => (
        <div key={item.index} onMouseEnter={() => mouseHover(item)}> 
          <FlashCard  
            key={item.index}
            editMode={editMode}
            x=  {(item === twoItems[0])? myCoordinates[0]:myCoordinates[1]}
            y=  {280} 
            zoom={zoom}
            pair={item}
            showBack={true}
            isClickable={true}
            isActive= {true} 
            isVisible = {true} 
            onClickCapture={() => clickHandle(item)}
            onMouseDown={onMouseDown(item)}
          />
        </div>
      ))}
    </Map>
  );


  
}
/**
 * Uses the current question to find another item in all itempairs, 
 * adds the ItemPair with one index above the current to the list 
 * if the current ItemPair's index is even.
 * And adds the ItemPair one index below to the list if the index of the current ItemPair is odd.
 * @param allItems list existing of all item pairs 
 * @param activePair the item pair in the current question
 * @returns list with two item pairs, including the one in the current question
 */
export function newListToContrast(allItems: ItemPair[], activePair: ItemPair): ItemPair[]{
    var list:ItemPair[] = [] 
    var item = null;
    if (activePair.index % 2===0){
        var otherConcept = activePair.index + 1
        for(var i=0; i<allItems.length; i++){
            item = allItems[i]
            if (item.index == otherConcept){
                list = [activePair, item]
            }
        } 
    }
    else{
        otherConcept = activePair.index - 1
        for(var i=0; i<allItems.length; i++){
            item = allItems[i]
            if (item.index === otherConcept){
                list = [activePair, item]
            }
        }
    }
    return list  
}





