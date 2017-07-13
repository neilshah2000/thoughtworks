var Edge = (function(){
    //constructor
    function Edge(from, to, dist){
        this.v = from;
        this.w = to;
        this.weight = dist;
        //idiom for processing an edge
        //v = e.either, w = e.other(v)

        //https://www.youtube.com/watch?v=MVn1_Om36c4&list=PLxc4gS-_A5VDvP_9W8JJ04zk6m1qTolzG&index=15
    }

    Edge.prototype.either = function(){
        //either endpoint
        return this.v;
    }

    Edge.prototype.other = function(vertex){
        //the end point that is not v
        if(vertex === this.v) return this.w
        else return this.v
    }

    Edge.prototype.from = function(){
        return this.v;
    }

    Edge.prototype.to = function(){
        return this.w;
    }

    Edge.prototype.compareTo = function(otherEdge){
        //compare this edge to other edge
        
    }

    return Edge
})()