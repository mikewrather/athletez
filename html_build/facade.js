define(["vendor"],function(e){var t={},n,r=e.jQuery||window.jQuery,i=e.Zepto||window.Zepto,s=e._,o=e.Mustache||window.Mustache,u=e.Backbone;return n=r||i,!r&&i&&require(["vendor/plugins/type"],function(){n.type=$.type,require(["vendor/plugins/callbacks"],function(){n.Callbacks=$.Callbacks,require(["vendor/plugins/deferred"],function(){n.Deferred=$.Deferred})})}),n&&(t.type=n.type,t.inArray=n.inArray,t.Callbacks=n.Callbacks,t.Deferred=n.Deferred),t.toHTML=o.to_html,t.$=n,t._=s,t.Backbone=u,t.ajaxRequests=[],t});