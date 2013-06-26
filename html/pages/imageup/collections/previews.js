// Comments Data
// ----------

// Package Previews
// Requires define
// Returns {PreviewsList} constructor
define(['facade','collections/base', 'utils','imageup/models/preview', 'text!imageup/templates/preview_template.html',], 
function(facade, BaseCollections , utils, previewmodel) {

    var PreviewShowList,
        _ = facade._,
        Channel = utils.lib.Channel;

	PreviewShowList = BaseCollections.extend({
        model: previewmodel,

      });

    return PreviewShowList;
});
