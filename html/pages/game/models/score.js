// score.js Model
// ------------
// Requires define
// Return {BaseModel} model constructor object

define(["models/base"], function (BaseModel) {

	return BaseModel.extend({

		url: function() {
            if (testpath)
                return testpath + '/game/score/';
            return '/api/game/score/'+this.gameId+'/?teams_id='+this.teams_id+"&score="+this.score;
        }

	});
});

