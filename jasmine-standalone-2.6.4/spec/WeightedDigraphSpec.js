describe("Create a weighted digraph", function() {

    var wdg = new WeightedDigraph(5);
    wdg.addEdge(new Edge(1,2,10));
    wdg.addEdge(new Edge(1,3,10));
    wdg.addEdge(new Edge(1,4,10));
    wdg.addEdge(new Edge(1,5,10));

    it("should return adjacent nodes", function() {
        expect(wdg.adj(1).length).toEqual(4);

    });
});

