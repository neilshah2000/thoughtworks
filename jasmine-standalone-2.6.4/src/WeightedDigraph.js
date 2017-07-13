var WeightedDigraph = (function(){
    //constructor
    function WeightedDigraph(size){
        this.V = size;
        // this.vertices = []; //adjacency list
        // init empty arrays at all indexes
        // for(var i=0; i<this.V; i++){
        //     this.vertices[i] = [];
        // }

        // use object based adjancy list to store vertex name strings
        this.vertices = {};
        
    }

    WeightedDigraph.prototype.addEdge = function(edge){
        // this.vertices[edge.from()].push(edge)
        var from = edge.from();
        if(!this.vertices.hasOwnProperty(from)) this.vertices[from] = []; //create adjancy list entry if first time we've seen the vertex
        this.vertices[from].push(edge);
    }

    // vertex is string
    WeightedDigraph.prototype.adj = function(vertex){
        return this.vertices[vertex]; //array of edges
    }

    return WeightedDigraph
})()