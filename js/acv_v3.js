
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
        t_links:[],

        scaleFactor:1,

        focusDistance:180, // dunno what this is.
        topicFocus:null, //dunno what this is either.
        topicHighlight:null,
        topicTransformDist:{  // dunno what this does.
            'x':0,
            'y':0,
            'zoom':1
        },

        theoryFocus:null,

        fadeInTime:800,
        fadeInTimeout:null,

        animTime:300,

        loaded:false,
        loading:[],

        tt_padX_orig:18,
        tt_padX:18,

        t_hBoxCoords:{},

        //fullscreen or not
        fsMode:false,

        size:function(){
            var self = vis;

            var midSize = window.innerWidth <=998 && window.innerWidth >768,
                smallSize = window.innerWidth <=768;

            var scaleH = window.innerHeight/self.h,
                scaleW = window.innerWidth/self.w,

                adjust  = scaleH <scaleW ? scaleH*self.scaleFactor : scaleW*self.scaleFactor,
                adjustH = adjust*self.h,
                adjustW = adjust*self.w,

                offH = 45*adjust,
                offW = 12*adjust,
                padd = adjustH*0.05,

                boxW = 475*adjust -padd*2,
                boxH = adjustH*0.9,
                box_textPad = 30*adjust,

                fsFont = midSize ? 68*adjust : smallSize ? 75*adjust : 60*adjust,
                fsPadTop = midSize ? adjustH/5 : smallSize ? adjustH/6 : adjustH/3,

                fsFontWeight = smallSize ? 'bold' : midSize ? 'normal' : 'normal',

                fsFontBelow = midSize ? 34*adjust : smallSize ? 36*adjust : 24*adjust,

                fsW = 700*adjust,
                fsL = 180*adjust,
                fsPad = 45*adjust,

                titleW = 450*adjust,
                titleFont = 24*adjust,

                labelW = 450*adjust,
                labelFont = 36*adjust,

                idxW = 60*adjust,
                idx_boxW = 800*adjust,
                idx_boxPad = 24*adjust,
                idx_linkPad = 6*adjust,
                xOutW = 30*adjust,

                t_boxW  = 375*adjust -padd*2,
                t_boxH  = 525*adjust -padd*2,
                t_padd  = 3*adjust,
                t_paddL = 12*adjust,
                t_paddT = 39*adjust,
                t_bordB	= 6*adjust,

                t_tweetH = 17*adjust,
                t_tweetL = 21*adjust,

                font = 16*adjust,
                q_font = 30*adjust,
                t_font = 14*adjust,
                t_q_font = 24*adjust,

                x_font = 12*adjust
                ;

            self.adjust = adjust;

            self.tt_padX = self.tt_padX_orig*adjust;

            self.fullScreen
                //.style('padding-left',fsL +'px')
                .on('click',function(){
                    self.fullScreenMode();
                    //d3.event.stopPropagation();
                });
            self.fullScreen.selectAll('.main')
                .style('font-size',fsFont +'px')
                .style('font-weight',fsFontWeight)
                .style('margin-top',(window.innerHeight -adjustH)/2 +fsPadTop +'px')
                .style('padding-left',fsL +'px')
                .style('width',fsW +'px')
                ;
            self.fullScreen.selectAll('.below')
                .style('font-size',fsFontBelow +'px')
                .style('width',fsW +'px')
                .style('padding-top',fsPad +'px')
                ;

            self.titleCred
                .style('bottom',(window.innerHeight -adjustH)/2 +padd +25*adjust +'px')
                .style('left',(window.innerWidth -adjustW)/2 +padd +30*adjust +'px')
                .style('font-size',titleFont+'px')
                .style('width',titleW +'px')
                ;
            self.titleCred.selectAll('.return')
                .style('font-size',x_font+'px');

            self.hBox
                .style('top',(window.innerHeight -adjustH)/2 +padd +'px')
                .style('left',(window.innerWidth -adjustW)/2 +padd +'px')
                .style('width',boxW +'px')
                .style('height',boxH -padd*2 +'px')
                .style('padding',padd +'px')
                //.style('border-top-width',padd +'px')
                .style('border-bottom-width',padd +'px')
                .style('font-size',font+'px')
                ;
            self.hBoxQ
                .style('font-size',q_font+'px')
                .style('padding-bottom',box_textPad +'px');
            self.hBoxBod
                .style('padding-top',box_textPad +'px');

            self.t_hBox
                .style('top',(window.innerHeight -adjustH)/2 +padd*2 +'px')
                .style('right',(window.innerWidth -adjustW)/2 +padd +'px')
                .style('width',t_boxW +'px')
                .style('max-height',t_boxH +'px')
                .style('padding-top',0)
                .style('padding-right',padd +'px')
                .style('padding-bottom',padd +'px')
                .style('padding-left',padd +'px')
                .style('font-size',t_font+'px')
                //.style('border-top-width',t_bordB +'px')
                //.style('border-bottom-width',t_bordB +'px')
                ;
            self.t_hBoxInt
                .style('padding-top',30*adjust +'px')
                .style('padding-bottom',24*adjust +'px');
            self.t_hBoxTweet
                .style('width',t_tweetH +'px')
                .style('height',t_tweetH +'px')
                .style('margin-left',t_tweetL +'px')
                ;
            self.t_hBoxName
                .style('font-size',t_q_font+'px');
            self.t_hBoxVote
                .style('font-size',font+'px');

            self.topicLabel
                .style('top',(window.innerHeight -adjustH)/2 +padd +38*adjust +'px')
                .style('left',(window.innerWidth -adjustW)/2 +adjustW/2.5 +'px')
                .style('width',labelW +'px')
                .style('font-size',labelFont+'px');
            self.xBack
                .style('bottom',(window.innerHeight -adjustH)/2 +padd +30*adjust +'px')
                .style('left',(window.innerWidth -adjustW)/2 +padd +30*adjust +'px')
                .style('font-size',x_font+'px');

            self.idx
                .style('width',idxW +'px')
                .style('height',idxW +'px')
                .style('bottom',(window.innerHeight -adjustH)/2 +padd +60*adjust +'px')
                .style('right',(window.innerWidth -adjustW)/2 +padd +20*adjust +'px');
            self.idxBox
                .style('left',(window.innerWidth -adjustW)/2 +adjustW/2 -idx_boxW/2 +'px')
                .style('top',(window.innerHeight -adjustH)/2 +padd*2 +'px')
                .style('width',idx_boxW +'px')
                .style('height',adjustH -box_textPad*2 -padd*3 -35*adjust +'px')
                .style('font-size',t_font+'px')
                .style('padding-left',box_textPad +'px')
                .style('padding-right',box_textPad +'px')
                .style('padding-bottom',box_textPad +'px')
                .style('border-top-width',box_textPad +'px')
                //.style('border-bottom-width',box_textPad +'px')
                .style('border-left-width',box_textPad/2 +'px')
                .style('border-right-width',box_textPad/2 +'px');
                ;
            self.idxBox.selectAll('.title')
                .style('padding-top',box_textPad/4 +'px')
                .style('padding-bottom',box_textPad +'px')
                .style('font-size',q_font +'px');
            self.idxBox.selectAll('.col')
                //.style('padding-top',idx_boxPad +'px')
                ;
            self.idxBox.selectAll('.theoryLink')
                .style('font-size',x_font+'px')
                .style('margin-left',x_font+'px')
                .style('padding-top',idx_linkPad +'px');
            self.idxBox.selectAll('.theoryLink.topic')
                .style('font-size',16*self.adjust +'px')
                .style('margin-left','0px')
                .style('padding-top',function(d){
                    return d.first ? '0px' : 16*self.adjust +'px';
                });
            self.xIdx
                .style('font-size',x_font+'px')
                .style('bottom',(window.innerHeight -adjustH)/2 +padd +30*adjust +'px')
                .style('right',(window.innerWidth -adjustW)/2 +padd +30*adjust +'px');
            self.xOut
                .style('right',xOutW/2 +'px')
                .style('width',xOutW +'px')
                .style('height',xOutW +'px');
        },

        generate:function(){
            var self = vis;

            self.svg = d3.select('svg#map');
            self.svgG = self.svg.append('g').classed('svgG',true);
            self.titleCred = d3.select('#titleCred');

            self.hBox = d3.select('#hBox');
            self.hBoxQ = d3.select('#hBox .descrip.q');
            self.hBoxBod = d3.select('#hBox .descrip.body');

            self.t_hBox = d3.select('#t_hBox');
            self.t_hBoxInt  = d3.select('#t_hBox .t_interact');
            self.t_hBoxName = d3.select('#t_hBox .t_name');
            self.t_hBoxVote = d3.select('#t_hBox .t_vote');
            self.t_hBoxTweet = d3.select('#t_hBox .t_tweet');
            self.t_hBoxBody = d3.select('#t_hBox .t_body');

            self.topicLabel = d3.select('#topicLabel');

            self.idxHolder = d3.select('#idxHolder');
            self.idx = d3.select('#idx');
            self.idxBox = d3.select('#idxBox');
            self.xIdx = d3.select('#xIdx');
            self.xOut = d3.select('#xOut');

            self.fullScreen = d3.select('#fullScreen');
            self.xBack = d3.select('#xBack');

            self.size();
            self.getData();

        },
        getData: async function(){
            /* Callback hell. Thank god for this link.
            https://www.hacksparrow.com/javascript/foreach-in-promise-async-function.html
            */

			console.log(`Generating data...`);
            var self = vis,
				files = ['topics','theories','theories_links']
				;

			//push all JSON files into loading array
			files.forEach(function(d,i){
				self.loading.push(d);
			});

            // await files.forEach(async function(filename){
            //     var str = '../data/policy/' + filename +'.json';
            //     data = await d3.json(str);
            //     self.data_raw[filename] = await data[filename];
            //     console.log(Object.keys(self.data_raw));
            // }).then( () => self.processData());


           for (let i = 0; i <files.length; i++) {
                var str = '../data/policy/' + files[i] +'.json';
                data = await d3.json(str);
                self.data_raw[files[i]] = await data[files[i]];
                console.log(Object.keys(self.data_raw));
           }

            self.processData();


            // var promises = [];
            // files.forEach(function(filename){
            //     var str = '../data/policy/' + filename +'.json';
            //     promises.push(d3.json(str))
            // })
            // Promise.all(promises).then(function(data){
            //     files.forEach(function(filename){
            //         self.data_raw[filename] = data[filename];
            //     });
            // });
            // console.log(self.data_raw);





            // sets.forEach(async function (d, i) {
            //     // i think this is where the data is accessed.
            //     var str = '../data/policy/' + d + '.json';
            //     // here is the solution for now.
            //     await d3.json(str).then(function (data) {
            //         self.data_raw[d] = data[d];
            //         //investigating the callback function.
            //         // self.loadingManager(d,callback);
            //     });

            // });
            // self.processData();

			//get all JSON files
            //old calback version 2/26/2022
			// sets.forEach(function(d,i){
			// 	// i think this is where the data is accessed.
			// 	var str = '../data/policy/' + d +'.json';
            //     // here is the solution for now.
            //     d3.json(str).then(function(data){
			// 		self.data_raw[d] = data[d];
            //         //investigating the callback function.
            //         self.loadingManager(d,callback);
		// 	});
        // // })

		},
        processData: function(){
            console.log(`Processing data...`);
            // console.log(Object.keys(self.data_raw));
            var self = vis;
            var scale_size = d3.scaleLinear()
                .domain([1,15])
                .range([5,25]);

            //positioning functions
            // exists a better way to code this, but this suffices.

            function posXY(d){
                var posX,
                    posY,

                    centerX = self.w/2,
                    centerY = self.w/2,

                    unit = self.w/10;
                // exists a better way to code this, but this suffices.

                if (d.id === 'nih'){
                    posX = 969;
                    posY = 592;
                }
                else if (d.id === 'arpa'){
                    posX = 1070;
                    posY = 409;
                }
                else if (d.id === 'procurement'){
                    posX = 481;
                    posY = 401;
                }
                else if (d.id === 'nationalLabs'){
                    posX = 617;
                    posY = 398;
                }
                else{
					posX = centerX;
					posY = centerY;
                }
                return [posX, posY];
            }
            // create a dictionary for topics
            self.data_raw.topics.forEach(function(d){
                d.size_scaled = scale_size(d.size);
                self.topics[d.id] = d;

                d.description_HTML = d.description;

                //make links HTML ready.
                // understand later.
                if(d.links){
                    var brax = d.description.match(/\[(.+?)\]/g),
                        linx = [];
                    brax.forEach(function(_d,_i){
                        // remove square brackets
                        //concat accordant link
                        var str = _d.replace(/[\[\]']+/g,''),
                            a = "<a target='_blank' href ='" +d.links[_i] + "'>" + str +"</a>";
                            d.description_HTML = d.description_HTML.replace(_d,a);
                    });
                }
            });
            //shifting the positions for each topic?
            self.data_raw.topics.forEach(function(d){
                var arrpos = posXY(d); // returns the position of the topic, as defined above.
                d.focus = {} // what does this mean?
                d.x_orig = arrpos[0]; // log the original positions.
                d.y_orig = arrpos[1];
                self.nodes.push(d); // push updated topic into the nodes category, defined in line 16.

                //push all theories into t_nodes array.
                // account for topic, because some appear more than once.
                if (d.theories){
                    d.theories.forEach( function(_d){
                        var t_node;
                        // condition ? return if true : return if false
                        /* This returns theory at index _d if theory is in the t_nodes already, and extends the list if not?
                            confusing ass construction though.
                        */
                        t_node = self.t_nodes.indexOf(self.theories[_d]) < 0 ? self.theories[_d] : $.extend(true, {}, self.theories[_d]);

                        t_node.topic = d.id;

                        t_node.x = d.x - Math.random();
                        t_node.y = d.y - Math.random();

                        t_node.speed = 0.075;
                        t_node.radius = 1.5;

                        t_node.focus = {};

                        // push the node into our global array of nodes.
                        self.t_nodes.push(t_node);
                    });
                }
            });
                    // for each topic, record links to their children.
            self.data_raw.topics.forEach(function(d,i){
                if (d.children){
                    d.children.forEach(function(_d){
                        self.links.push({
                            'source': i,
                            'target': d3.keys(self.topics).indexOf(_d.id),
                            'value': _d.overlap
                        });
                    })
                }
            });

            // figure this part out later. Doesn't get activated.
            self.data_raw.theories_links.forEach(function(d,i) {
                //for each theory, sort out its corresponding links.
                var n1 = self.t_nodes.filter(function(t) {return t.id=== d.source;}), // where the theory is a source.
                n2 = self.t_nodes.filter(function(t) {return t.id == d.target;}) // where the theory is a link.
                pairs = [],
                e1 = null,
                e2 = null;

                //if length is >1, could either be because of quals or because a theory
				//appears twice and its relationships don't change -- so account for both nodes
                // if(n1.length >1 && n2.length >1){ //if it is both a target and a source in multiple places.
                //     //
				// 	e1 = d.source_qual ? n1.filter(function(n){ return n.topic === d.source_qual; })[0] : null;
				// 	e2 = d.target_qual ? n2.filter(function(n){ return n.topic === d.target_qual; })[0] : null;
				// 	e1 && e2 ? pairs.push([e1,e2])
				// 	: e1 && !e2 ? pairs.push([e1,n2[0]],[e1,n2[1]])
				// 	: !e1 && e2 ? pairs.push([n1[0],e2],[n1[1],e2])
				// 	: pairs.push([n1[0],n2[0]],[n1[0],n2[1]],[n1[1],n2[0]],[n1[1],n2[1]]);
				// } else if(n1.length >1 && n2.length <=1){
				// 	e1 = d.source_qual ? n1.filter(function(n){ return n.topic === d.source_qual; })[0] : null;
				// 	e2 = n2[0];
				// 	e1 ? pairs.push([e1,e2]) : pairs.push([n1[0],e2],[n1[1],e2]);
				// } else if(n1.length <=1 && n2.length >1){
				// 	e1 = n1[0];
				// 	e2 = d.target_qual ? n2.filter(function(n){ return n.topic === d.target_qual; })[0] : null;
				// 	e2 ? pairs.push([e1,e2]) : pairs.push([e1,n2[0]],[e1,n2[1]]);
				// } else{
				// 	e1 = n1[0];
				// 	e2 = n2[0];
				// 	pairs.push([e1,e2]);
				// }
				// pairs.forEach(function(p){
				// 	self.t_links.push({
				// 		'source':p[0],
				// 		'target':p[1],
				// 		'type':d.type
				// 	});
				// 	if(d.type === 'parent'){
				// 		p[0].t_parents.push(p[1]);
				// 		p[1].t_children.push(p[0]);
				// 	} else if(d.type === 'sibling'){
				// 		console.log(d); // d -- theory link :)
				// 		p[0].t_siblings.push(p[1]);
				// 		p[1].t_siblings.push(p[0]);
				// 	}
				// });
			});
            self.draw();
        },
        loadingManager:function(_item,_callback){
            var self = vis;
            self.loading = self.loading.filter(function(_d){ return _d !== _item; });
            if(self.loading.length === 0){
                _callback();
            }
        },


        fadeIn:function(){
            var self = vis;

            self.svgG
                .style('visibility','visible')
                .style('opacity',1)
                ;
            d3.select('.spinner')
                .transition()
                .duration(self.fadeInTime)
                .style('opacity',0)
                ;
            d3.select('#loading')
                .transition()
                .delay(self.fadeInTime)
                .duration(self.fadeInTime)
                .style('opacity',0)
                .transition()
                .delay(self.fadeInTime*2)
                .duration(self.fadeInTime)
                .style('display','none');
        },
        draw: function(){
            var self = vis;

            self.w = 1436;
            self.h = 782;

            self.svgG
                .attr('transform', function(){
                    var x = (self.w - self.w*self.scaleFactor) /2.5 ,
                        y = (self.y - self.h*self.scaleFactor) / 2;
                        return 'translate(' + x + ',' + y + ')scale(' + self.scaleFactor + ')';
                });
            // series of clickhandlers.
            self.titleCred.classed('show', true);
            self.titleCred.selectAll('.return')
                .on('click', function(){
                    if (window.self !== window.top && self.fsMode ) {
                        self.fullScreenMode();
                        d3.event.stopPropogation();
                    }
                    else{
                        if (self.fsMode){
                            self.fullScreenMode();
                            d3.event.stopPropogation();
                        }
                        // what does this do? maybe it refreshes the page?
                        window.location.replace("https://www.quantamagazine.org/20150803-physics-theories-map/")
                    }
                });
            self.idxHolder // handle the index button.
                .on('click', function(){
                    if (!self.idxVisible){
                        showIdxBox();
                    }
                    else{
                        hideIdxBox();
                    }
                });
            self.xOut
                .on('click', function(){
                    hideIdxBox();
                })
            self.xBack // not sure what this does.
                .on('click', function(){
                    topicUnview(true);
                });
            self.fullScreen.selectAll('.main') // not sure what this does.
                .on('click', function(){
                    self.fullScreenMode();
                    d3.event.stopPropogation();
                });

            // For each topic, collect its corresponding theories in alphabetical order.
            var alpha = [],
                top_arr = d3.keys(self.topics).sort(); // get a list of all topics sorted.

                top_arr.forEach(function(d){
                //create a topic object.
                var obj = {
                    'id': d,
                    'name': self.topics[d].name,
                    'topic': true
                };
                alpha.push(obj); // push another topic object in.

                if (self.topics[d].theories){
                    var theory_arr = self.topics[d].theories.slice(); // get the theories for each topic.
                    theory_arr.sort(function(a,b){ // sorting function to sort the theories in alphabetical order.
                        var _a = a.toLowerCase(),
                            _b = b.toLowerCase();
                        if (_a < _b) {
                            return -1;
                        }
                        if (_a > _b) {
                            return 1;
                        }
                        return 0;
                    });
                    theory_arr.forEach(function(_d){ // for each theory in the array
                        var t_obj = {  //for each theory in the array, create an obj
                            'id': _d,
                            'name': self.theories[_d].name,
                            'parent': d,
                            'topic': false
                        }
                        alpha.push(t_obj);
                    });
                }
        });

        var split_01 = 22,
            split_02 = 42

        var col_01,
            col_02,
            col_03;

        // Set the font sizes for the topics & theories.
        var topicFont  = 16 * self.adjust,
            theoryFont = 12 * self.adjust
            //set padding
            topicPad   = 16*self.adjust,
            theoryPad  = 6*self.adjust;

        function colClick(d){
            if(d.topic){
                self.topicFocus = d.id;
                topicFocus(d.id);
                topicView(d.id);
            }
            else{
                // else set the focus to d's parent obj
                var _t = self.t_nodes.filter(function(_d){
                    return _d.topic === d.parent && _d.id === d.id;
                })[0];


                self.topicFocus = d.parent;
                topicFocus(d.parent);
                topicView(d.parent);

                self.theoryFocus = d.id;
                theoryLock(_t, true);
            }

            t_nodes
                .classed('spotlight', function(id){
                    return self.topicFocus && d.topic === self.topicFocus;
                })
                .attr('r', function(d){
                    if (self.topicFocus && d.topic == self.topicFocus){
                        d.radius = c_rad;
                    }
                    else{
                        d.radius = t_rad;
                    }
                    return d.radius;
                });
            hideIdxBox(); // hide index.
        }
        // maybe this is creating the list of topics in the index?
        col_01 = d3.select('#idxBox #list .col_01')
            .selectAll('div.theoryLink')
            .data(alpha.slice(0, split_01))
        col_01.enter().append('div')
            .classed('theoryLink', true);
        col_01
            .classed('topic', function(d) {
                return d.topic;
            })
            .each(function(d, i){
                d.first = i === 0;
            })
            .style('font-size', function(d){
                return d.topic ? topicFont + 'px' : theoryFont + 'px';
            })
            .style('margin-left',function(d){
                return d.topic ? '0px' : topicFont +'px';
            })
            .style('padding-top',function(d,i){
                return d.first ? '0px' : d.topic ? topicPad +'px' : theoryPad +'px';
            })
            .html(function(d){ return d.name; });

            // do the same for col 2 & 3.
            col_02
				.on('click',function(d){
					colClick(d);
				});
			col_02.exit().remove();
			col_03 = d3.select('#idxBox #list .col_03')
				.selectAll('div.theoryLink')
				.data(alpha.slice(split_02,alpha.length));
			col_03.enter().append('div')
				.classed('theoryLink',true);
			col_03
				.classed('topic',function(d){
					return d.topic;
				})
				.each(function(d,i){
					d.first = i === 0;
				})
				.style('font-size',function(d){
					return d.topic ? topicFont +'px' : theoryFont +'px';
				})
				.style('margin-left',function(d){
					return d.topic ? '0px' : topicFont +'px';
				})
				.style('padding-top',function(d,i){
					return d.first ? '0px' : d.topic ? topicPad +'px' : theoryPad +'px';
				})
				.html(function(d){ return d.name; });
			col_03
				.on('click',function(d){
					colClick(d);
				});
			col_03.exit().remove();

            // sets the line for???
            // unknown.
            var line_linear = d3.svg.line()
                .x(function(d) { return d.x; })
                .y(function(d) { return d.y; })
                .interpolate('linear');
            var line_hull = d3.svg.line()
                .x(function(d) { return d.x; })
                .y(function(d) { return d.y; })
                .interpolate('linear-closed');


            /* Fish Eye - https://bost.ocks.org/mike/fisheye/
            fisheye distortion magnifies the local region around the mouse,
            while leaving the larger graph unaffected for context.
            The localized, circular nature of the distortion
            can be seen clearly by applying it to a uniform grid.
            */
            var fisheye = d3.fisheye.circular()
                .radius(self.h/2) // set radius to half
                .distortion(1); // go back and look at what this does later.

            var zoom = d3.behaviour.zoom();

            //initialize the force graph.
            var force = d3.layout.force()
                .nodes(self.nodes)
                .links(self.links)
                .size([self.w, self.h])
                .charge(-1500)
                .linkStrength(function(d){
                    return 0;
                })
                .on('tick', tick)
                .start()
                ;
            // create a topic force graph?
            var t_force = d3.layout.force()
				.nodes(self.t_nodes)
				.links(self.t_links)
				.size([self.w,self.h])
				.gravity(0)
				.charge(0)
				.linkStrength(0)
			    .on('tick',t_tick)
				.start()
				;

            var topics,
				links,
				hulls,

				labelContainer,
				labelsG,
				labels,

				theories,
				t_nodeG,
				t_nodes,
				t_links,

				t_labelsG,
				t_labels
				;
            // theory radius // padding parameters
            var t_rad = 1.5,
                f_rad = t_rad,
                c_rad = f_rad,
                t_pad = 18;

        },
        fullScreenMode:function(){
            var self = vis;
            //thanks, http://www.sitepoint.com/use-html5-full-screen-api/
            //is full screen available?
            if 	((
                document.fullscreenEnabled ||
                document.webkitFullscreenEnabled ||
                document.mozFullScreenEnabled ||
                document.msFullscreenEnabled) &&
                self.fsMode === false
            ) 	{

                self.fsMode = true;
                self.fullScreen.classed('act',true);

                //grab visualization div
                var elem = document.getElementById('vis');

                // go full-screen with cross browser functionality
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen();
                } else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                }
            }
            // if already in full screen
            else if(self.fsMode === true){

                self.fsMode = false;
                self.fullScreen.classed('act',false);

                // exit full-screen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }

                self.idxVisible = false;
                self.idxBox.classed('show',false);
                self.idx.classed('on',false);
            }
        },
        encode:function(_text){
            var self = this;
            var text = encodeURIComponent(_text).replace(/'/g,"%27").replace(/"/g,"%22");
            return text;
        }
    }
}

 // initialize the function
 var vis = init();
 vis.generate(); // creates the space.
 $(window).resize(function(){
	vis.size();
});
console.log("Stand up Sosa. Did you forget what you came here to do?")
