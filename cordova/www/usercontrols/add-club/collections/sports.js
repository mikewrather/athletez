define(["facade","sportorg/collections/sports_listall"],function(e,t){var n=t.extend({ParseForDropdown:function(){var e=t.prototype.ParseForDropdown.call(this);return e.unshift({payload:{id:null,custom_name:"Don't use a single sport"}}),e}});return n});