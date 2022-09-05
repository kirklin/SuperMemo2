export interface SuperMemoItem {
  interval: number
  repetition: number
  EFactor: number
}

/**
 * After each repetition assess the quality of repetition response in 0-5 grade scale:
 * 5 - perfect response
 * 4 - correct response after a hesitation
 * 3 - correct response recalled with serious difficulty
 * 2 - incorrect response; where the correct one seemed easy to recall
 * 1 - incorrect response; the correct one remembered
 * 0 - complete blackout.
 */
export type SuperMemoGrade = 0 | 1 | 2 | 3 | 4 | 5;

export function SuperMemo(
  item: SuperMemoItem,
  grade: SuperMemoGrade,
): SuperMemoItem {
  let nextInterval: number;
  let nextRepetition: number;
  let nextEFactor: number;

  if (grade >= 3) {
    if (item.repetition === 0)
      nextInterval = 1;
    else if (item.repetition === 1)
      nextInterval = 6;
    else
      nextInterval = Math.round(item.interval * item.EFactor);

    nextRepetition = item.repetition + 1;
  }
  else {
    nextInterval = 1;
    nextRepetition = 0;
  }

  /**
   * After each repetition modify the E-Factor of the recently repeated item according to the formula:
   * EF':=EF+(0.1-(5-q)*(0.08+(5-q)*0.02))
   * where:
   * EF' - new value of the E-Factor,
   * EF - old value of the E-Factor,
   * q - quality of the response in the 0-5 grade scale.
   * If EF is less than 1.3 then let EF be 1.3.
   */
  nextEFactor
    = item.EFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));

  if (nextEFactor < 1.3)
    nextEFactor = 1.3;

  return {
    interval: nextInterval,
    repetition: nextRepetition,
    EFactor: nextEFactor,
  };
}
