define(["facade","utils/lib","utils/debug"],function(e,t,n){function l(e){var t=["create","read","update","destroy"],n={};return i.each(t,function(e,t){n[e]=Function.prototype}),s(e,n)}function c(e){var t={create:o,read:u,update:a,destroy:f};return i.extend(t,e),function(t){return i.each(t,function(e,t,n){n[t]=r(e)}),t}(t)}var r,i=e._,s=t.duckTypeCheck,o,u,a,f;return o=function(e){return e.create(this)},u=function(e){return e.read(this)},a=function(e){return e.update(this)},f=function(e){return e.destroy(this)},SyncAction=function(e){var t=e;return function(n,r){var s,o=n.storage||n.collection.storage;if(i.isUndefined(o))throw new Error("storageFactory error, data object does not have a storage property");s=t.call(n,o,r),s?r.success(n,s,r):r.error("Record not found")}},r=function(){if(i.isFunction(arguments[0]))return new SyncAction(arguments[0]);if(l(arguments[0]))return c(arguments[0]);if(!i.isFunction(arguments[0])&&l(arguments[0]))throw new Error("storageFactory expected a function or CRUD interface as 1st argument.")},r});