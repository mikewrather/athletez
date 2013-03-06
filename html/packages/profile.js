// Profile Controller
// ---------------
// module as controller for 'profile' package
// Returns {ProfileController} constructor

define([
    "require",
    "text!profile/templates/layout.html",
    "facade",
    "controller",
    "models",
    "views",
    "utils",
    "profile/models/user",
    "profile/views/header"
    ], function (require, profileLayoutTemplate) {

    var ProfileController,
        facade = require("facade"),
        Controller = require("controller"),
        models = require("models"),
        views = require("views"),
        utils = require("utils"),
        ProfileUserModel = require("profile/models/user"),
        ProfileHeaderView = require("profile/views/header"),
        LayoutView = views.LayoutView,
        $ = facade.$,
        _ = facade._,
        debug = utils.debug,
        Channel = utils.lib.Channel,
        cssArr = [
            "/packages/profile/profile.css"
        ];

    ProfileController = Controller.extend({

        initialize: function (options) {
            Channel('load:css').publish(cssArr);

            _.bindAll(this);

            this.handleOptions(options);
            
            this.initProfile();
            
            return this;
        },
        
        initProfile: function() {
            this.createProfileData();
            this.handleDeferreds();            
            this.setupLayout().render();
        },
        
        createProfileData: function () {
            this.user = new ProfileUserModel();            
            this.user.fetch();
        },
        
        handleDeferreds: function() {
            var controller = this;

            $.when(this.user.request).done(function () {
                controller.setupHeaderView();                                
            });
        },
        
        setupHeaderView: function() {
            var headerView;

            headerView = new ProfileHeaderView({
                model: this.user,
                name: "Header",
                destination: "#profile-header"
            });

            this.scheme.push(headerView);            
            this.layout.render();
        },
        
        setupLayout: function () {
            var profileLayout;

            profileLayout = new LayoutView({
                scheme: this.scheme,
                destination: "#main",
                template: profileLayoutTemplate,
                displayWhen: "ready"
            });
            this.layout = profileLayout;

            return this.layout;
        },

        
        
        
        
        

        initProfileResume: function() {
            this.createTodosList();
            this.handleDeferreds();
            this.addSubscribers();
        },
        
        initSections: function () {
            this.setupHeaderView();
            this.setupControlsView();
            this.setupTodosListView();
            this.setupLayout().render();
        },

        createTodosList: function () {
            // var data = this.fetchData();
            // this.collection = (data)? new TodosList(data) : new TodosList();
            this.collection = new TodosList();
            this.collection.fetch();
        },

        setupTodosListView: function() {
            var todosListView;

            todosListView = new TodosListView({
                collection: this.collection,
                destination: "#todos-section"
            });

            this.scheme.push(todosListView);
        },

        setupControlsView: function() {
            var controlsView;

            controlsView = new ControlsView({
                collection: this.collection,
                name: "Controls",
                destination: "#controls"
            });

            this.scheme.push(controlsView);
        },

        // Using Application States Collection / localStorage for persistance of todos data

        saveData: function () {
            if (this.appStates) {
                this.appStates.add({
                    name: 'todosData',
                    data: this.collection.toJSON(),
                    storage: 'localStorage',
                    expires: new Date(Date.now() + 1000 * (/*secs*/60 * /*mins*/7 * /*hrs*/24 * /*days*/365))
                });
                this.appStates.save('todosData');
            }
        },

        destroyOrUpdateData: function (models) {
            if (this.appStates) {
                if (models && _.isArray(models)) {
                    if (this.collection.models.length === models.length) {
                        this.appStates.destroy('todosData');
                    } else {
                        this.saveData();
                    }
                }
            }
        },

        fetchData: function (callback) {
            var model, data;
            if (this.appStates) {
                model = this.appStates.findInCollectionOrStorage('todosData');
            }
            if (model && model.data) {
                data = model.data;
            }
            if (callback && _.isFunction(callback)) {
                callback(data);
            }
            return data;
        },

        addSubscribers: function () {
            this.collection.on('add remove reset toggleAllComplete', this.saveData);
            this.collection.on('clearCompleted', this.destroyOrUpdateData);
            // Channel('todos:clearCompleted').subscribe(this.destroyOrUpdateData);
            Channel('todo:toggleDone').subscribe(this.saveData);
            Channel('todo:clear').subscribe(this.saveData);
            Channel('todo:save').subscribe(this.saveData);
            Channel('todos:fetch').subscribe(this.fetchData);
        },

        removeSubscribers: function () {
            this.collection.off('add remove reset toggleAllComplete', this.saveData);
            this.collection.on('clearCompleted', this.destroyOrUpdateData);
            // Channel('todos:clearCompleted').unsubscribe(this.destroyData);
            Channel('todo:toggleDone').unsubscribe(this.saveData);
            Channel('todo:clear').unsubscribe(this.saveData);
            Channel('todo:save').unsubscribe(this.saveData);
            Channel('todos:fetch').unsubscribe(this.fetchData);
        }

    });

    return ProfileController;
});
