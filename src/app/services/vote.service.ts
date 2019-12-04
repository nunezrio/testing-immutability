import { Injectable } from "@angular/core";
import { VoteItem } from "../interfaces/vote-item";

@Injectable({
  providedIn: "root"
})
export class VoteService {
  private history: VoteItem[][] = [];
  private items: VoteItem[] = [];

  constructor() {}

  getItems(): VoteItem[] {
    return this.items;
  }
  getRecentChange(): VoteItem[] {
    return this.history[this.history.length - 1];
  }

  addItem(name: string): void {
    this.markHistoryBeforeChange();

    const newItem: VoteItem = { name, votes: 0 };
    // TODO - this needs to be immutable
    this.items = [...this.items, newItem];
  }

  removeItem(name: string): void {
    this.markHistoryBeforeChange();

    // TODO find the item in the list and remove it immutably
    let index;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === name) index = i;
    }
    if (index)
      this.items = [
        ...this.items.slice(0, index),
        ...this.items.slice(index + 1)
      ];
    if (index === 0) {
      this.items = [...this.items.slice(1)];
    }
  }

  upvote(name: string): void {
    this.markHistoryBeforeChange();

    // TODO find the item in the list and add 1 to the votes
    let index;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === name) index = i;
    }
    if (index) {
      this.items = [
        ...this.items.slice(0, index),
        { name: this.items[index].name, votes: this.items[index].votes + 1 },
        ...this.items.slice(index + 1)
      ];
    }
    if (index === 0) {
      this.items = [
        { name: this.items[0].name, votes: this.items[0].votes + 1 },
        ...this.items.slice(1)
      ];
    }
  }

  downvote(name: string): void {
    this.markHistoryBeforeChange();

    // TODO find the item in the list and remove 1 from the votes
    let index;

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === name) index = i;
    }

    if (index === 0) {
      this.items = [
        { name: this.items[0].name, votes: this.items[0].votes - 1 },
        ...this.items.slice(1)
      ];
    }
    if (index) {
      this.items = [
        ...this.items.slice(0, index),
        { name: this.items[index].name, votes: this.items[index].votes - 1 },
        ...this.items.slice(index + 1)
      ];
    }
  }

  undo() {
    if (this.history.length) {
      // Take the most recent history and use it to replace the list.
      this.items = this.history.pop();
    } else {
      throw new Error("No more undos available.");
    }
  }

  private markHistoryBeforeChange() {
    // Add a snapshot to the history.
    this.history.push(this.items);
  }
}
