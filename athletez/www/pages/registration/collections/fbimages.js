// Facebook Images Data
// ----------

// Package Game
// Requires define
// Returns {RegistrationFBImageList} constructor

define(['facade', 'media/collections/images', 'utils'], 
function(facade, MediaImageList, utils) {

    var RegistrationFBImageList,
        _ = facade._,
        Channel = utils.lib.Channel;

    RegistrationFBImageList = MediaImageList.extend({
        
        url: function() {
            if (testpath)
                return testpath + '/user/fbpics';
            return '/api/user/fbpics';
        }
        
    });

    return RegistrationFBImageList;
});
