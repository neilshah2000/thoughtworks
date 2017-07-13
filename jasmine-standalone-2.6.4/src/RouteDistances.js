var RouteDistances = (function(){
    // constructor
    // pass the starting node we are interested in here
    function RouteDistances(graph){
        this.graph = graph
    }

    // returns the distance between from and to is there is a route
    // otherwise returns -1
    RouteDistances.prototype.directPathDistance = function(from, to){
        var nextDoor = this.graph.adj(from) // array of edges
        var distance = -1;
        for(var i=0; i<nextDoor.length; i++){
            if(nextDoor[i].to() === to) distance = nextDoor[i].weight;
        }
        return distance;        
    }

    return RouteDistances
})()