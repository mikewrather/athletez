define(["require","text!signup/templates/basciFinal.html","backbone","underscore","views","facade","utils"],function(e,t,n,r){var i,s=e("facade"),o=e("views"),u=e("utils"),a=u.lib.Channel,f=n.View;return i=f.extend({initialize:function(e){this.template=r.template(t,{page:e.openAsPopUp?!0:!1}),e.destination&&(this.$el=$(e.destination)),e.openAsPopUp&&(this.openAsPopUp=e.openAsPopUp),this.render()},render:function(){this.$el.html(this.template),this.registrationElements(),this.payload=this.finalRegistrationPayload(this.options.attr),this.fetchpayload(this.payload)},events:{"click .regsubmitfinal":"next","click #editname":"editName"},editName:function(e){e.preventDefault(),$(".firstdiv").empty();var t=this.getnameElement("first_name","First Name","firstname"),n=this.getnameElement("last_name","Last Name","lastname"),r=this.getLabel("First Name"),i=this.getLabel("Second Name");$(".firstdiv").append(r),$(".firstdiv").append(t),$(".firstdiv").append(i),$(".firstdiv").append(n)},getLabel:function(e){var t=$("<div/>").attr({"class":"label"}),n=$("<lable/>").attr({For:e}).html(e);return t.append(n),t},getnameElement:function(e,t,n){var r=$("<input/>").attr({name:n,type:"text",id:e,placeholder:t});return r},finalRegistrationPayload:function(e){payload={};var t=e.attr;return $.each(t,function(e,t){payload[t.name]=t.value}),payload},registrationElements:function(){var e={"01":"January","02":"February","03":"March","04":"April","05":"May","06":"June","07":"July","08":"August","09":"September",10:"October",11:"November",12:"December"},t={1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9",10:"10",11:"11",12:"12",13:"13",14:"14",15:"15",16:"16",17:"17",18:"18",19:"19",20:"20",21:"21",22:"22",23:"23",24:"24",25:"25",26:"26",27:"27",28:"28",29:"29",30:"30",31:"31"},n={1945:"1945",1946:"1946",1947:"1947",1948:"1948",1949:"1949",1950:"1950",1951:"1951",1952:"1952",1953:"1953",1954:"1954",1955:"1955",1956:"1956",1957:"1957",1958:"1958",1959:"1959",1960:"1960",1961:"1961",1962:"1962",1963:"1963",1964:"1964",1965:"1965",1966:"1966",1967:"1967",1968:"1968",1969:"1969",1970:"1970",1971:"1971",1972:"1972",1973:"1973",1974:"1974",1975:"1975",1976:"1976",1977:"1977",1978:"1978",1979:"1979",1980:"1980",1981:"1981",1982:"1982",1983:"1983",1984:"1984",1985:"1985",1986:"1986",1987:"1987",1988:"1988",1989:"1989",1990:"1990",1991:"1991",1992:"1992",1993:"1993",1994:"1994",1995:"1995",1996:"1996",1997:"1997",1998:"1998",1999:"1999",2e3:"2000",2001:"2001"},r=this.option(e,"born","06");this.$el.find("#dob").append(r);var i=this.option(t,"borndate","15");this.$el.find("#dob").append(i);var s=this.option(n,"borndyear","1985");this.$el.find("#dob").append(s)},option:function(e,t,n){var r='<select class="'+t+'">';return $.each(e,function(e,t){var i="";if(e==n)var i="selected='selected'";r+='<option value="'+e+'" '+i+">"+t+"</option>"}),r+="</select>",r},fetchpayload:function(e){this.$el.find("#first_name").val(e.firstname+" "+e.lastname),this.$el.find("#emailInput").val(e.email)},next:function(e){e.preventDefault();var t=$(".terms-condition-h").is(":checked");if(!t){alert("Please select terms and condition.");return}var n=this;console.log(this.payload);var r=this.$(":input").serializeArray();$.each(r,function(e,t){payload[t.name]=t.value}),console.log(payload,"new payload"),this.payload.gender=$("input:radio[name=gender]:checked").val(),this.payload.password=$("#password").val(),this.payload.re_password=$("#re_password").val(),this.payload.dob=$(".borndate").val()+"-"+$(".born").val()+"-"+$(".borndyear").val(),this.payload.accept_terms=t,this.model.save(this.payload,{success:function(e){location.href="#usersettings",$("#RegModal").modal("hide")},error:function(e){$(".errormsg").remove();var t=jQuery.parseJSON(e.request.responseText);errorArray=t.exec_data.error_array,$.each(errorArray,function(e,t){n.displayErrors(t)})}})},displayErrors:function(e){var t=$("#"+e.field),n=t.width();if(n){console.log(t.position(),"fieldName",n,"elemet width");var r=this.displayMesage(t.position(),e.error,n);$("#finalreg input.regsubmitfinal").before(r)}},displayMesage:function(e,t,n){console.log(n,"widthele");var r=e.left+15;r+=n,console.log(r,"posleft");var i=$("<div/>").attr({name:"error message","class":"errormsg"}).css({width:"90%","margin-top":"10px",color:"#CE0009"}).html(t);return i}}),i});