define(["facade","user/models/common"],function(e,t){var n,r=e._;return n=t.extend({idAttribute:"academics_tests_topics_id",data:{user_id:this.user_id,year:this.year},processData:!0,url:function(){return this.action=="update"?"api/user/testscore/"+this.users_id+"?id1="+this.users_id:this.action=="save"?"api/user/addtestscore/"+this.users_id+"?id1="+this.users_id:this.action=="delete"?"api/user/testscore/"+this.users_id+"?id1="+this.users_id:"api/user/addtestscore/"},showSuccessMessage:function(e){console.log("showSuccessMessage test"),$(this.target).parent().find(".success_h").html(e).fadeIn(),$(this.target).parent().find(".error_h").html("").fadeOut()},showErrorMessage:function(e){$(this.target).parent().find(".success_h").html("").fadeOut(),$(this.target).parent().find(".error_h").html(e).fadeIn()}}),n});