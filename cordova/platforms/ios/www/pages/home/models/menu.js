define(["models"],function(e){var t,n=e.BaseModel;return t=n.extend({defaults:{name:null,views:{browse:[{name:"VOTES",value:"votes"},{name:"RECENT",value:"newest"},{name:"FANS",value:"followers"}],time:[{name:"TODAY",value:"DAY"},{name:"THIS WEEK",value:"WEEK"},{name:"THIS MONTH",value:"MONTH"},{name:"ALL TIME",value:"YEAR"}]}}}),t});