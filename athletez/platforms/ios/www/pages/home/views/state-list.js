// The State List
// --------------

define(['facade','views', 'utils', 'packages/location/views/state-list'], 
function(facade,  views,   utils,   BaseStateListView) {

    var HomeStateListView, 
        $ = facade.$,
        _ = facade._,
        Channel = utils.lib.Channel,
        SectionView = views.SectionView;


    HomeStateListView = BaseStateListView.extend({

        //Needed to change tags. Other attribute are same as BaseStateListView
    	tagName: "select",
        _tagName: "option",
        
        events : {
        	"change" : "changeState"
        },
        
        
        initialize : function(options) {
        	BaseStateListView.prototype.initialize.call(this, options);
        	this.id = options.id || this.id || _.uniqueId('v');
        },
        
         changeState: function(e) {
         	console.log(this.collection);
         	var val = $(e.target).val();
         	var id = '';
         	this.collection.each(function(model){
            	if(model.get("payload").name == val) {
            		id = model.get("payload").id;
            	}
            	//var html = template.tmpl(model.toJSON());
            	//el.append(html);
        	});
        	
        	if(id!= '') {
        		console.log("sdsd");
        		routing.trigger('stateChanged', id);
         	}
         	
         	//var val = this.collection.get({name: $(e.target).val()});
         	//console.log(val);
         	
        	//console.log(this.model);
           // Channel('stateChanged:' + this.model.collection.cid).publish(this.model);
        }  
        	
    });

    return HomeStateListView;
});
