describe("Create some edges", function() {

    var edge = new Edge(1,2,10)

    it("should not have the same to and from node", function() {
        expect(edge.from()).not.toEqual(edge.to());
        expect(edge.from()).toEqual(1);
        expect(edge.to()).toEqual(2);
    });

    it("should have weight 10", function() {
        expect(edge.weight).toEqual(10);
    });
});

