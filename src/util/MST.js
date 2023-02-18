import { MinPriorityQueue } from "@datastructures-js/priority-queue";

// Compute distance beween two coordinates , source : https://stackoverflow.com/a/27943/17715769

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}


function dfs(node, prev, p, adj){
    for(const i of adj[node]){
        if (i[0] !== prev){
            p[i[0]] = [node, i[1]];
            dfs(i[0], node, p, adj);
        }
    }
}


// nodes = [[id, [lat,lon]]]

export function getMST(nodes, gateway){
    const adj = {};

    for(let i = 0; i < nodes.length; i++){
        adj[nodes[i][0]] = [];
        for(let j = 0; j < i; j++){
            adj[nodes[i][0]].push([nodes[j][0], getDistanceFromLatLonInKm(nodes[i][1][0], nodes[i][1][1], nodes[j][1][0], nodes[j][1][1])]);
            adj[nodes[j][0]].push([nodes[i][0], getDistanceFromLatLonInKm(nodes[i][1][0], nodes[i][1][1], nodes[j][1][0], nodes[j][1][1])]);
        }
    }

    const pq = new MinPriorityQueue(item => item[2]);
    pq.push([-1, gateway, 0]);

    const hashSet = new Set();

    const mstAdj = {};

    for(const i of nodes){
        mstAdj[i[0]] = [];
    }

    while (!pq.isEmpty()){
        const cur = pq.pop();        

        if (hashSet.has(cur[1])) continue;

        if (cur[0] !== -1){
            mstAdj[cur[0]].push([cur[1], cur[2]]);
            mstAdj[cur[1]].push([cur[0], cur[2]]);
        }

        hashSet.add(cur[1]);

        for(let i = 0; i < adj[cur[1]].length; i++){
            if (adj[cur[1]][i][0] !== cur[0] && !hashSet.has(adj[cur[1]][i][0])){
                pq.push([cur[1], adj[cur[1]][i][0], adj[cur[1]][i][1]]);                
            }
        }
    }

    const parent = {};
    dfs(gateway, -1, parent, mstAdj);

    return parent;
}

