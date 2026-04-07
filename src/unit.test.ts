import { GildedRose, Item } from './gildedRose';

function updateItem(name: string, sellIn: number, quality: number): Item {
  const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);
  const result = gildedRose.updateQuality()[0];
  if (result) {
      return result
  }
  return new Item(name, sellIn, quality)
}
describe('All items', () => {
// ─────────────────────────────────────────────────────────────────────────────
// Normal items
// ─────────────────────────────────────────────────────────────────────────────
    describe('Normal items', () => {
        describe('sellIn', () => {
            it('decreases by 1 each day', () => {
                const item = updateItem('Normal Item', 10, 20);
                expect(item.sellIn).toBe(9);
            });

            it('can go negative (no lower bound)', () => {
                const item = updateItem('Normal Item', 0, 20);
                expect(item.sellIn).toBe(-1);
            });
        });

        describe('quality', () => {
            it('decreases by 1 before the sell date', () => {
                const item = updateItem('Normal Item', 5, 20);
                expect(item.quality).toBe(19);
            });

            it('decreases by 2 on the sell date (sellIn = 0)', () => {
                const item = updateItem('Normal Item', 0, 20);
                expect(item.quality).toBe(18);
            });

            it('decreases by 2 after the sell date (sellIn < 0)', () => {
                const item = updateItem('Normal Item', -1, 20);
                expect(item.quality).toBe(18);
            });

            it('never goes below 0 (before sell date)', () => {
                const item = updateItem('Normal Item', 5, 0);
                expect(item.quality).toBe(0);
            });

            it('never goes below 0 (after sell date)', () => {
                const item = updateItem('Normal Item', 0, 1);
                expect(item.quality).toBe(0);
            });

            it('never goes below 0 when quality is already 0 after sell date', () => {
                const item = updateItem('Normal Item', 0, 0);
                expect(item.quality).toBe(0);
            });
        });
    });

// ─────────────────────────────────────────────────────────────────────────────
// Aged Brie
// ─────────────────────────────────────────────────────────────────────────────
    describe('Aged Brie', () => {
        const AGED_BRIE = 'Aged Brie';

        describe('sellIn', () => {
            it('decreases by 1 each day', () => {
                const item = updateItem(AGED_BRIE, 10, 20);
                expect(item.sellIn).toBe(9);
            });
        });

        describe('quality', () => {
            it('increases by 1 before the sell date', () => {
                const item = updateItem(AGED_BRIE, 5, 20);
                expect(item.quality).toBe(21);
            });

            it('increases by 2 on the sell date (sellIn = 0)', () => {
                const item = updateItem(AGED_BRIE, 0, 20);
                expect(item.quality).toBe(22);
            });

            it('increases by 2 after the sell date (sellIn < 0)', () => {
                const item = updateItem(AGED_BRIE, -1, 20);
                expect(item.quality).toBe(22);
            });

            it('never exceeds 50 when increasing before sell date', () => {
                const item = updateItem(AGED_BRIE, 5, 50);
                expect(item.quality).toBe(50);
            });

            it('never exceeds 50 when increasing after sell date', () => {
                const item = updateItem(AGED_BRIE, 0, 49);
                expect(item.quality).toBe(50);
            });

            it('never exceeds 50 when already at 50 after sell date', () => {
                const item = updateItem(AGED_BRIE, 0, 50);
                expect(item.quality).toBe(50);
            });
        });
    });

// ─────────────────────────────────────────────────────────────────────────────
// Sulfuras, Hand of Ragnaros
// ─────────────────────────────────────────────────────────────────────────────
    describe('Sulfuras, Hand of Ragnaros', () => {
        const SULFURAS = 'Sulfuras, Hand of Ragnaros';

        describe('sellIn', () => {
            it('never changes', () => {
                const item = updateItem(SULFURAS, 10, 80);
                expect(item.sellIn).toBe(10);
            });

            it('never changes even when past sell date', () => {
                const item = updateItem(SULFURAS, -1, 80);
                expect(item.sellIn).toBe(-1);
            });
        });

        describe('quality', () => {
            it('never changes', () => {
                const item = updateItem(SULFURAS, 10, 80);
                expect(item.quality).toBe(80);
            });

            it('never changes past the sell date', () => {
                const item = updateItem(SULFURAS, -1, 80);
                expect(item.quality).toBe(80);
            });
        });
    });

// ─────────────────────────────────────────────────────────────────────────────
// Backstage passes to a TAFKAL80ETC concert
// ─────────────────────────────────────────────────────────────────────────────
    describe('Backstage passes to a TAFKAL80ETC concert', () => {
        const BACKSTAGE = 'Backstage passes to a TAFKAL80ETC concert';

        describe('sellIn', () => {
            it('decreases by 1 each day', () => {
                const item = updateItem(BACKSTAGE, 15, 20);
                expect(item.sellIn).toBe(14);
            });
        });

        describe('quality', () => {
            it('increases by 1 when more than 10 days remaining (sellIn > 10)', () => {
                const item = updateItem(BACKSTAGE, 15, 20);
                expect(item.quality).toBe(21);
            });

            it('increases by 1 on exactly 11 days remaining (boundary)', () => {
                const item = updateItem(BACKSTAGE, 11, 20);
                expect(item.quality).toBe(21);
            });

            it('increases by 2 when exactly 10 days remaining', () => {
                const item = updateItem(BACKSTAGE, 10, 20);
                expect(item.quality).toBe(22);
            });

            it('increases by 2 when between 6 and 10 days remaining (sellIn = 7)', () => {
                const item = updateItem(BACKSTAGE, 7, 20);
                expect(item.quality).toBe(22);
            });

            it('increases by 2 on exactly 6 days remaining (boundary)', () => {
                const item = updateItem(BACKSTAGE, 6, 20);
                expect(item.quality).toBe(22);
            });

            it('increases by 3 when exactly 5 days remaining', () => {
                const item = updateItem(BACKSTAGE, 5, 20);
                expect(item.quality).toBe(23);
            });

            it('increases by 3 when between 1 and 5 days remaining (sellIn = 3)', () => {
                const item = updateItem(BACKSTAGE, 3, 20);
                expect(item.quality).toBe(23);
            });

            it('increases by 3 on the last day (sellIn = 1)', () => {
                const item = updateItem(BACKSTAGE, 1, 20);
                expect(item.quality).toBe(23);
            });

            it('drops to 0 on the sell date (sellIn = 0)', () => {
                const item = updateItem(BACKSTAGE, 0, 20);
                expect(item.quality).toBe(0);
            });

            it('drops to 0 after the concert (sellIn < 0)', () => {
                const item = updateItem(BACKSTAGE, -1, 20);
                expect(item.quality).toBe(0);
            });

            it('never exceeds 50 when increasing with more than 10 days left', () => {
                const item = updateItem(BACKSTAGE, 15, 50);
                expect(item.quality).toBe(50);
            });

            it('never exceeds 50 when increasing with 10 days or less', () => {
                const item = updateItem(BACKSTAGE, 10, 49);
                expect(item.quality).toBe(50);
            });

            it('never exceeds 50 when increasing with 5 days or less', () => {
                const item = updateItem(BACKSTAGE, 5, 48);
                expect(item.quality).toBe(50);
            });
        });
    });
});
