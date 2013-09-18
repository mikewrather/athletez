define([
	'require',
	'text!signup/templates/basciFinal.html', 
    'backbone',
    'underscore',
    'views',
    'facade', 
    'utils', 
	],function(require,  signupBasicTemplate,backbone,_) {
			
		var SignupBasicView,
        	facade = require('facade'),
        	 views = require('views'),
        	
        	utils = require('utils'),
        	Channel = utils.lib.Channel,
        	
        	SectionView = backbone.View;
			SignupBasicView = SectionView.extend({
              
              initialize: function (options) {
                    this.template =  _.template(signupBasicTemplate);
                    this.$el = $(options.destination);
                    this.render();
                                    
                },
                render: function(){

                    this.$el.html(this.template);
                    this.registrationElements();
                    this.payload=this.finalRegistrationPayload(this.options.attr);
                    this.fetchpayload(this.payload); 
                },     
                events:{
                "click .regsubmitfinal":"next"   
                },
                finalRegistrationPayload: function(attrs){
                    
                    payload = {};
                    var fields = attrs.attr;
                 
                    $.each(fields, function(i, field){
                       
                        payload[field.name] = field.value;
                    
                    });
                    
                   return payload;

                },
                registrationElements: function(){

                    var month = {'01':'January','02':'February','03':'March','04':'April','05':'May','06':'June','07':'July','08':'August','09':'September','10':'October','11':'November','12':'December'};
    
                     var day={'1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','10':'10','11':'11','12':'12','13':'13','14':'14','15':'15','16':'16','17':'17','18':'18','19':'19','20':'20','21':'21','22':'22','23':'23','24':'24','25':'25','26':'26','27':'27','28':'28','29':'29','30':'30','31':'31'};
    
                    var year = {'1920':'1920','1921':'1921','1922':'1922','1923':'1923','1924':'1924','1925':'1925','1926':'1926','1927':'1927','1928':'1928','1929':'1929','1930':'1930','1931':'1931','1932':'1932','1933':'1933','1934':'1934','1935':'1935','1936':'1936','1937':'1937','1938':'1938','1939':'1939','1940':'1940','1941':'1941','1942':'1942','1943':'1943','1944':'1944','1945':'1945','1946':'1946','1947':'1947','1948':'1948','1949':'1949','1950':'1950','1951':'1951','1952':'1952','1953':'1953','1954':'1954','1955':'1955','1956':'1956','1957':'1957','1958':'1958','1959':'1959','1960':'1960','1961':'1961','1962':'1962','1963':'1963','1964':'1964','1965':'1965','1966':'1966','1967':'1967','1968':'1968','1969':'1969','1970':'1970','1971':'1971','1972':'1972','1973':'1973','1974':'1974','1975':'1975','1976':'1976','1977':'1977','1978':'1978','1979':'1979','1980':'1980','1981':'1981','1982':'1982','1983':'1983','1984':'1984','1985':'1985','1986':'1986','1987':'1987','1988':'1988','1989':'1989','1990':'1990','1991':'1991','1992':'1992','1993':'1993','1994':'1994','1995':'1995','1996':'1996','1997':'1997','1998':'1998','1999':'1999','2000':'2000','2001':'2001','2002':'2002','2003':'2003','2004':'2004','2005':'2005','2006':'2006','2007':'2007','2008':'2008','2009':'2009','2010':'2010','2011':'2011','2012':'2012','2013':'2013','2014':'2014','2015':'2015','2016':'2016','2017':'2017','2018':'2018'};

                    
                    var months = this.option(month,"born");
                    $(".seconddiv").append(months);
                    var date = this.option(day,"borndate");
                    $(".seconddiv").append(date);
                    var years = this.option(year,"borndyear");
                    $(".seconddiv").append(years);
        
                },
                option: function(elem,classes){
                    var element = $('<select/>').attr({
                                     "class":classes
                                     });
                    $.each(elem,function(key,value){
                        var options=$("<option/>").attr({
                                         "value": key
                                    }).
                                    html(value).
                                    appendTo(element);
                        
                    });
                    return element;
                },
                fetchpayload: function(payload){
                    
                  $("#nameInput").val(payload.firstname+' '+ payload.lastname);
                  $("#emailInput").val(payload.email); 
                },
                next: function(event){
                    event.preventDefault();
                    alert("preventing default");
                    console.log(this.payload);
                    this.payload.gender=$("input:radio[name=gender]").val();
                    this.payload.password=$("#password").val();
                    this.payload.re_password=$("#cpassword").val();
                    //this.payload.dob=$(".born").val()+'-'+ $(".borndate").val()+'-'+ $(".borndyear").val();
                    this.payload.dob="10-6-1987"; 
                    this.payload.accept_terms=true;
                    
                    this.model.save(this.payload,
                        {
                            success: function(msg) {
                              
                              
                                /* update the view now */
                                 Channel('upload-user-image').publish(msg);
                            },
                            error: function() {
                                /* handle the error code here */
                            }
                        }
                    );
                }

            });    
            
            return SignupBasicView;

    }); 