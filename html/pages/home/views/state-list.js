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
        
        initialize : function(options) {
        	BaseStateListView.prototype.initialize.call(this, options);
        	this.id = options.id || this.id || _.uniqueId('v');
        },
        
        addSubscribers : function() {
        	Channel('changestate' + this.collection.cid).subscribe(this.changeUrl);
        },
        
        changeUrl : function(model) {
        	var payload = model.get('payload');
        	console.log(payload['id'] + ' ' + payload['name']);
        }
        	
    });

    return HomeStateListView;
});