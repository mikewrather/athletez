define([],function(){var e;return e=function(e,t,n){var r,i=t.localStorage||t.collection.localStorage;switch(e){case"read":r=t.id?i.find(t):i.findAll();break;case"create":r=i.create(t);break;case"update":r=i.update(t);break;case"delete":r=i.destroy(t)}r?n.success(r):n.error("Record not found")},e});