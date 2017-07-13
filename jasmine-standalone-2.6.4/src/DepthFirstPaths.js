// https://www.youtube.com/watch?v=ZmoVxpZomKs&list=PLxc4gS-_A5VDvP_9W8JJ04zk6m1qTolzG&index=4
var DepthFirstPaths = (function(){
    // constructor
    // pass the starting node we are interested in here
    function DepthFirstPaths(graph, startName){
        var that = this;
        this.marked = {};
        this.edgeTo = {};
        this.start = startName;
        dfs(graph, startName);
        

        // private DFS algorithm
        function dfs(graph, s){
            that.marked[s] = true;
            var adjacent = graph.adj(s) // array of adjacent edges
            for(var i=0; i<adjacent.length; i++){
                var w = adjacent[i].to();
                var marked = that.marked[w];
                if(!that.marked[w]){
                    dfs(graph, w);
                    that.edgeTo[w] = s;
                }
            }
        }
    }

    DepthFirstPaths.prototype.hasPathTo = function(vertexName){
        return this.marked.hasOwnProperty(vertexName);
        // return this.marked[vertexName];
    }

    DepthFirstPaths.prototype.pathTo = function(vertexName){
        if(!this.hasPathTo(vertexName)) return null;
        var path = [];
        for(var x=vertexName; x!==this.start; x=this.edgeTo[x]){
            path.push(x);
        }
        path.push(this.start);
        return path;
    }

    return DepthFirstPaths
})()