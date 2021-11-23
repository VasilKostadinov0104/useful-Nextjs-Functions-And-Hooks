import { useState } from "react";

export enum DIRECTION {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

export function useSwipeClose({
  handleClose,
  direction,
  secondarySwipes = [{ callback: null, direction: null }],
}) {
  const [begintouch, setBegintouch] = useState(null);
  const [touchtime, settouchtime] = useState(null);
  const time = 100;
  const handleTouchStart = (e) => {
    const firstTouchEvent = e.touches[0];
    const location = {
      x: firstTouchEvent.clientX,
      y: firstTouchEvent.clientY,
    };
    setBegintouch(location);
    settouchtime(Date.now());
  };

  const handleTouchEnd = (e) => {
    const firstTouchEvent = e.changedTouches[0];
    const location = {
      x: firstTouchEvent.clientX, //get the location of the end of the touch
      y: firstTouchEvent.clientY,
    };
    const differences = {
      x: begintouch.x - location.x, //find the difference from the start to the end touch
      y: begintouch.y - location.y,
    };

    let condition = null;
    switch (direction) {
      case DIRECTION.DOWN:
        condition = differences.y + 50 < 0 && Date.now() - touchtime < time;
        break;
      case DIRECTION.UP:
        condition = differences.y - 50 >= 0 && Date.now() - touchtime < time;
        break;
      case DIRECTION.LEFT:
        condition = differences.x + 50 < 0 && Date.now() - touchtime < time;
      case DIRECTION.RIGHT:
        condition = differences.x - 50 >= 0 && Date.now() - touchtime < time;
        break;
      default:
        break;
    }

    if (condition) {
      handleClose();
    }
    if (secondarySwipes[0].direction != null) {
      secondarySwipes?.forEach((swipe) => {
        let conditionSwipe = null;
        switch (swipe.direction) {
          case DIRECTION.DOWN:
            conditionSwipe = differences.y < 0 && Date.now() - touchtime < time;
            break;
          case DIRECTION.UP:
            conditionSwipe =
              differences.y >= 0 && Date.now() - touchtime < time;
            break;
          case DIRECTION.LEFT:
            conditionSwipe = differences.x < 0 && Date.now() - touchtime < time;
          case DIRECTION.RIGHT:
            conditionSwipe =
              differences.x >= 0 && Date.now() - touchtime < time;
            break;
          default:
            break;
        }
        if (conditionSwipe) {
          swipe.callback();
        }
      });
    }
  };

  return { handleTouchStart, handleTouchEnd };
}
