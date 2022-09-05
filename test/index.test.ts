import { describe, expect, it } from "vitest";

import type { SuperMemoItem } from "../src";
import { SuperMemo } from "../src";

describe("SuperMemo", () => {
  let item: SuperMemoItem = {
    interval: 0,
    repetition: 0,
    EFactor: 2.5,
  };

  it("Grade: 5", () => {
    item = SuperMemo(item, 5);

    expect(item).toEqual({ interval: 1, repetition: 1, EFactor: 2.6 });
  });

  it("Grade: 4", () => {
    item = SuperMemo(item, 4);

    expect(item).toEqual({ interval: 6, repetition: 2, EFactor: 2.6 });
  });

  it("Grade: 3", () => {
    item = SuperMemo(item, 3);

    expect(item).toEqual({ interval: 16, repetition: 3, EFactor: 2.46 });
  });

  it("Grade: 2", () => {
    item = SuperMemo(item, 2);

    expect(item).toEqual({
      interval: 1,
      repetition: 0,
      EFactor: 2.1399999999999997,
    });
  });

  it("Grade: 1", () => {
    item = SuperMemo(item, 1);

    expect(item).toEqual({
      interval: 1,
      repetition: 0,
      EFactor: 1.5999999999999996,
    });
  });

  it("Grade: 0", () => {
    item = SuperMemo(item, 0);

    expect(item).toEqual({ interval: 1, repetition: 0, EFactor: 1.3 });
  });
});
