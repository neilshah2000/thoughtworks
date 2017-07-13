/**
 * Basic priority queue implementation. If a better priority queue is wanted/needed,
 * this code works with the implementation in google's closure library (https://code.google.com/p/closure-library/).
 * Use goog.require('goog.structs.PriorityQueue'); and new goog.structs.PriorityQueue()
 */
function PriorityQueue() {
    this._nodes = [];

    this.enqueue = function (priority, key) {
        this._nodes.push({
            key: key,
            priority: priority
        });
        this.sort();
    };
    this.dequeue = function () {
        return this._nodes.shift().key;
    };
    this.sort = function () {
        this._nodes.sort(function (a, b) {
            return a.priority - b.priority;
        });
    };
    this.isEmpty = function () {
        return !this._nodes.length;
    };
}

/**
 * Pathfinding starts here
 */
function Graph() {
    var INFINITY = 1 / 0;
    this.vertices = {};

    this.addVertex = function (name, edges) {
        this.vertices[name] = edges;
    };

    this.shortestPath = function (start, finish) {
        var nodes = new PriorityQueue(),
            distances = {},
            previous = {},
            path = [],
            smallest, vertex, neighbor, alt;

        for (vertex in this.vertices) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(0, vertex);
            } else {
                distances[vertex] = INFINITY;
                nodes.enqueue(INFINITY, vertex);
            }

            previous[vertex] = null;
        }

        while (!nodes.isEmpty()) {
            smallest = nodes.dequeue();

            if (smallest === finish) {
                path = [];

                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }

                break;
            }

            if (!smallest || distances[smallest] === INFINITY) {
                continue;
            }

            for (neighbor in this.vertices[smallest]) {
                alt = distances[smallest] + this.vertices[smallest][neighbor];

                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    previous[neighbor] = smallest;

                    nodes.enqueue(alt, neighbor);
                }
            }
        }

        return path;
    };
}

var g = new Graph();

g.addVertex('A', {
    B: 7,
    C: 8
});
g.addVertex('B', {
    A: 7,
    F: 2
});
g.addVertex('C', {
    A: 8,
    F: 6,
    G: 4
});
g.addVertex('D', {
    F: 8
});
g.addVertex('E', {
    H: 1
});
g.addVertex('F', {
    B: 2,
    C: 6,
    D: 8,
    G: 9,
    H: 3
});
g.addVertex('G', {
    C: 4,
    F: 9
});
g.addVertex('H', {
    E: 1,
    F: 3
});

// Log test, with the addition of reversing the path and prepending the first node so it's more readable
console.log(g.shortestPath('A', 'H').concat(['A']).reverse());



// globals
var graph,
    routes


getGraph().then(function(data){
    console.log(data);
    var edges = data.split(',');
    var cleaned = edges.map(cleanWhiteSpaces);
    var edges = cleaned.map(createEdgeObject);
    var wdg = new WeightedDigraph(5);
    edges.forEach(function(edge){
        wdg.addEdge(edge);
    })
    console.log(wdg)
    console.log(getDistance(wdg, 'ABC'));
    console.log(getDistance(wdg, 'AD'));
    console.log(getDistance(wdg, 'ADC'));
    console.log(getDistance(wdg, 'AEBCD'));
    console.log(getDistance(wdg, 'AED'));
})

function cleanWhiteSpaces(edgeStr){
    return edgeStr.trim();
}

function createEdgeObject(edgeStr){
    [fromVertex, toVertex, edgeWeight] = edgeStr;
    // var fromNum = convertMap[fromVertex];
    // var toNum = convertMap[toVertex];
    return new Edge(fromVertex, toVertex, edgeWeight);
}

function processInput(data){
    var deferred = $.Deferred();
    console.log(data);
    var edges = data.split(',');
    var cleaned = edges.map(cleanWhiteSpaces);
    var distances = cleaned.map(createEdgeObject);
    console.log(distances);
}

function getNumberOfVertexes(edgeArray){

}

// route is string eg ABC
function getDistance(graph, route){
    var rd = new RouteDistances(graph);
    var distance = 0;
    for(var i=1; i<route.length; i++){
        var singleDist;
        singleDist = rd.directPathDistance(route[i-1], route[i]);
        if(singleDist === -1) return 'NO SUCH ROUTE';
        else distance = distance + parseInt(singleDist);
    }
    return distance;
}

function getGraph(){
    return $.get('/src/input.txt');
}

function getRoutes(){
    return $.get('/src/routes.txt')
}

// var convertMap = {
//     A: 0,
//     B: 1,
//     C: 2,
//     D: 3,
//     E: 4,
//     F: 5
// }



// The distance of the route A-B-C.
// The distance of the route A-D.
// The distance of the route A-D-C.
// The distance of the route A-E-B-C-D.
// The distance of the route A-E-D.

// (DFS to find cycles)The number of trips starting at C and ending at C with a maximum of 3 stops.  In the sample data below, there are two such trips: C-D-C (2 stops). and C-E-B-C (3 stops).
//https://www.youtube.com/watch?v=GmVhD-mmMBg&list=PLxc4gS-_A5VDvP_9W8JJ04zk6m1qTolzG&index=4#t=0.509862 4.30

// The number of trips starting at A and ending at C with exactly 4 stops.  In the sample data below, there are three such trips: A to C (via B,C,D); A to C (via D,C,D); and A to C (via D,E,B).
// The length of the shortest route (in terms of distance to travel) from A to C.

// The length of the shortest route (in terms of distance to travel) from B to B.
// shortest paths for digraphs BFS
//https://www.youtube.com/watch?v=ymjClXYuG2w&index=9&list=PLxc4gS-_A5VDvP_9W8JJ04zk6m1qTolzG#t=740.421482


// The number of different routes from C to C with a distance of less than 30.  In the sample data, the trips are: CDC, CEBC, CEBCDC, CDCEBC, CDEBC, CEBCEBC, CEBCEBCEBC.


/**
 * 
 * Dijkstra's uses a priority queue data structure to keep track of the frontier of unvisited nodes.
 * Breadth-first search uses a regular queue data structure. Operations on a priority queue are O(log n).
 * Operations on a regular queue are O(1).
 * The use of a regular queue in BFS is made possible by all edge weights being 1
 *  - which makes the regular queue effectively behave as a priority queue
 */