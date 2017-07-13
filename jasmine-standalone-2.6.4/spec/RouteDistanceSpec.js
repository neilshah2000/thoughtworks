describe("Find the distance to connected vertices", function() {

    var wdg = new WeightedDigraph(5);
    wdg.addEdge(new Edge('A','B',5));
    wdg.addEdge(new Edge('B','C',4));
    wdg.addEdge(new Edge('C','D',8));
    wdg.addEdge(new Edge('D','C',8));
    wdg.addEdge(new Edge('D','E',6));
    wdg.addEdge(new Edge('A','D',5));
    wdg.addEdge(new Edge('C','E',2));
    wdg.addEdge(new Edge('E','B',3));
    wdg.addEdge(new Edge('A','E',7));

    wdg.addEdge(new Edge('Z','E',6));

    var rd = new RouteDistances(wdg)

    it("should return the distance from A to B", function() {
        expect(rd.directPathDistance('A', 'B')).toBe(5);
    });

    it("should return -1 for the distance from A to C", function() {
        expect(rd.directPathDistance('A', 'C')).toBe(-1);
    });
});

