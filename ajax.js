function ajax(param){
	try{
		if(typeof param=="object" && param!=undefined){
			
			var xmlHttp;
			if(window.addEventListener){
				xmlHttp=new XMLHttpRequest();
				}else{
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");	
					}
			if(param.type=="GET" && param.data!=undefined){
				  xmlHttp.open(param.type,param.url+"?"+param.data);
				}else{
				  xmlHttp.open(param.type,param.url);	
					
					}		
				xmlHttp.onloadend=function(){
				      if(typeof param.complete=="function"){
						  param.complete();
						  }	
					}	
			if(param.data!=undefined){
				switch(param.contentType){
				case "urlencoded":
					xmlHttp.setRequestHeader("content-type","application/x-www-form-urlencoded");
					break;
				case "json":
				   xmlHttp.setRequestHeader("content-type","application/json");
					}
				
				}		
			xmlHttp.onreadystatechange=function(){
			    if(this.readyState==4&&this.status==200){
					var data=this.responseText;
				  if(param.dataType=="json"){
					  data=JSON.parse(data);
					  
					  }
					  param.success(data);
					}	
				   	
				}
				if(param.type=="POST" && param.data!=undefined){
					xmlHttp.send(param.data);
					}else{
					xmlHttp.send();	
						}		
			
			}else{
		   throw new Error("不是对象或对象为空");		
				}
		
		}catch(e){
			alert(e.message);
			}
	}