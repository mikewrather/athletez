/**
 * Created with JetBrains PhpStorm.
 * User: mike
 * Date: 2/22/14
 * Time: 5:59 PM
 * To change this template use File | Settings | File Templates.
 */
define(["facade", "models/base"], function (facade, BaseModel) {

	var OpponentModel,
		_ = facade._;

	OpponentModel = BaseModel.extend({

		defaults: _.extend({}, (new BaseModel).attributes, {
			name:""
		}),

		url:function(){
			return "/api/team/addopponent/" + this.id;
		}

	});

	return OpponentModel;
});
