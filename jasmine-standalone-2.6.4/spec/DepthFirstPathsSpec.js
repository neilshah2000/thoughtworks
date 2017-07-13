describe("Find connected paths using a Depth First Search", function() {

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

    dfsFromA = new DepthFirstPaths(wdg, 'A')

    it("should return true when a vertex is connected", function() {
        expect(dfsFromA.hasPathTo('D')).toBe(true);
    });

    it("should return false when a vertex is not connected", function() {
        expect(dfsFromA.hasPathTo('Z')).toBe(false);
    });

    // DFS does NOT return shortest paths so will not work
    // it("should return a direct path where there is one", function() {
    //     var path = dfsFromA.pathTo('E')
    //     var start = path.pop() // take start off the queue

    //     expect(path.pop()).toBe('E');
    // });
});

