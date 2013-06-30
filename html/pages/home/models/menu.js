define(['models'], function (models) {

    var MenuModel,
        BaseModel = models.BaseModel;

    MenuModel = BaseModel.extend({

        defaults: {
            name: null
        }

    });

    return MenuModel;
});