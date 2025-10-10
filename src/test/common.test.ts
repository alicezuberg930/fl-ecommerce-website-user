import { deepObjectComparison, slugify } from "../utils/common";

describe('common', () => {
    it('generate a secure string', () => {
        expect(slugify("một-hai-ba-bốn")).toBe("mot-hai-ba-bon");
    })

    it('get current base url', () => {
        expect(deepObjectComparison({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    })
})