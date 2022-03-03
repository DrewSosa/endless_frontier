var init = function(){  //init will return a list of functions :)

    return {
        // set the width and the height.
        w:1436,
        h:782,

        data_raw:{'name' : 'Sosa'},
        // object holders for  topics and theories
        topics:{},
        theories:{},

        idxVisible:false,

        nodes:[],
        links:[],

        t_nodes:[],
        t_links:[]
    }
}


function getData(callback){
    var self = vis,
        sets = ['topics','theories','theories_links']
        ;

    //push all JSON files into loading array
    sets.forEach(function(d,i){
        self.loading.push(d);
    });

    //push marker for WP vote count info into loading array
    // self.loading.push(setv);

    //get all JSON files
    sets.forEach(function(d,i){
        // i think this is where the data is accessed.
        var str = '../data/policy/' + d +'.json';
        d3.json(str).then(function(data){
            self.data_raw[d] = data[d];
            self.loadingManager(d,callback);
            ass[d] = data[d];

            // console.log(self.data_raw[d]);				// 	// self.loadingManager(d,callback);
        });
    });
}



// getData()
