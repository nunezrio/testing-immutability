import { TestBed } from "@angular/core/testing";

import { VoteService } from "./vote.service";

describe("VoteServiceService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should start empty", () => {
    const service: VoteService = TestBed.get(VoteService);
    expect(service.getItems()).toEqual([]);
  });

  it("should add to the list", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.addItem("Beta");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 },
      { name: "Beta", votes: 0 }
    ]);
  });

  it("should be able to undo after adding", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.addItem("Beta");
    service.undo();
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 0 }]);
    service.undo();
    expect(service.getItems()).toEqual([]);
  });

  // TODO - test removeItem

  it("if remove works", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 0 }]);
    service.removeItem("Alpha");
    expect(service.getItems()).toEqual([]);
  });

  it("if remove works from middle of array", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    service.addItem("Beta");
    service.addItem("Gamma");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 },
      { name: "Beta", votes: 0 },
      { name: "Gamma", votes: 0 }
    ]);
    service.removeItem("Beta");
    expect(service.getItems()).toEqual([
      { name: "Alpha", votes: 0 },
      { name: "Gamma", votes: 0 }
    ]);
  });

  // TODO - test removeItem & undo
  it("if remove works and is undone", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 0 }]);
    service.removeItem("Alpha");
    expect(service.getItems()).toEqual([]);
    service.undo();
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 0 }]);
  });

  // TODO - test upvote
  it("upvote increases", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 0 }]);
    service.upvote("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 1 }]);
  });

  it("upvote increases multiple times", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 0 }]);
    service.upvote("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 1 }]);
    service.upvote("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 2 }]);
    service.upvote("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 3 }]);
  });

  // TODO - test upvote & undo
  it("upvote increases and undoes", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 0 }]);
    service.upvote("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 1 }]);
    service.undo();
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 0 }]);
  });

  // TODO - test downvote
  it("downvote decreases", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 0 }]);
    service.downvote("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: -1 }]);
  });

  it("downvote decreases multiple times", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 0 }]);
    service.downvote("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: -1 }]);
    service.downvote("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: -2 }]);
    service.downvote("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: -3 }]);
  });

  // TODO - test downvote & undo
  it("downvote decreases and then undoes", () => {
    const service: VoteService = TestBed.get(VoteService);
    service.addItem("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 0 }]);
    service.downvote("Alpha");
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: -1 }]);
    service.undo();
    expect(service.getItems()).toEqual([{ name: "Alpha", votes: 0 }]);
  });
});
