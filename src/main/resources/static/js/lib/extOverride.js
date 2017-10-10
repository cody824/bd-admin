Ext.override(Ext.data.Connection, {
	 
	request : function(options) {
	        options = options || {};
	        var me = this,
	            scope = options.scope || window,
	            username = options.username || me.username,
	            password = options.password || me.password || '',
	            async,
	            requestOptions,
	            request,
	            headers,
	            xhr;

	        if (me.fireEvent('beforerequest', me, options) !== false) {

	            requestOptions = me.setOptions(options, scope);
	            
	            if (this.isFormUpload(options) === true) {
	                this.upload(options.form, requestOptions.url, requestOptions.data, options);
	                return null;
	            }

	            // if autoabort is set, cancel the current transactions
	            if (options.autoAbort === true || me.autoAbort) {
	                me.abort();
	            }

	            // create a connection object

	            if ((options.cors === true || me.cors === true) && Ext.isIE && Ext.ieVersion >= 8) {
	                xhr = new XDomainRequest();
	            } else {
	                xhr = this.getXhrInstance();
	            }

	            async = options.async !== false ? (options.async || me.async) : false;

	            // open the request
	            if (username) {
	                xhr.open(requestOptions.method, requestOptions.url, async, username, password);
	            } else {
	                xhr.open(requestOptions.method, requestOptions.url, async);
	            }

	            if (options.withCredentials === true || me.withCredentials === true) {
	                xhr.withCredentials = true;
	            }

	            Ext.apply(options, {requestOptionUrl : requestOptions.url, requestOptionMethod : requestOptions.method});
	            
	            headers = me.setupHeaders(xhr, options, requestOptions.data, requestOptions.params);

	            // create the transaction object
	            request = {
	                id: ++Ext.data.Connection.requestId,
	                xhr: xhr,
	                headers: headers,
	                options: options,
	                async: async,
	                timeout: setTimeout(function() {
	                    request.timedout = true;
	                    me.abort(request);
	                }, options.timeout || me.timeout)
	            };
	            me.requests[request.id] = request;
	            me.latestId = request.id;
	            // bind our statechange listener
	            if (async) {
	                xhr.onreadystatechange = Ext.Function.bind(me.onStateChange, me, [request]);
	            }

	            if ((options.cors === true || me.cors === true) && Ext.isIE && Ext.ieVersion >= 8) {
	                xhr.onload = function() {
	                    me.onComplete(request);
	                };
	            }

	            // start the request!
	            xhr.send(requestOptions.data);
	            if (!async) {
	                return this.onComplete(request);
	            }
	            return request;
	        } else {
	            Ext.callback(options.callback, options.scope, [options, undefined, undefined]);
	            return null;
	        }
	    },
	    
	    setupHeaders: function(xhr, options, data, params){
	        var me = this,
	            headers = Ext.apply({}, options.headers || {}, me.defaultHeaders || {}),
	            contentType = me.defaultPostHeader,
	            jsonData = options.jsonData,
	            xmlData = options.xmlData,
	            key = "",
	            header = "";

	        if (!headers['Content-Type'] && (data || params)) {
	            if (data) {
	                if (options.rawData) {
	                    contentType = 'text/plain';
	                } else {
	                    if (xmlData && Ext.isDefined(xmlData)) {
	                        contentType = 'text/xml';
	                    } else if (jsonData && Ext.isDefined(jsonData)) {
	                        contentType = 'application/json';
	                    }
	                }
	            }
	            headers['Content-Type'] = contentType;
	        }

	        if (me.useDefaultXhrHeader && !headers['X-Requested-With']) {
	            headers['X-Requested-With'] = me.defaultXhrHeader;
	        }
	        
	        var authorization = SureAuthTool.buildAuthrization(options.requestOptionUrl, options.requestOptionMethod, headers);
            Ext.apply(headers ,{Authorization: authorization});
	        
	        // set up all the request headers on the xhr object
	        try{
	            for (key in headers) {
	                if (headers.hasOwnProperty(key)) {
	                    header = headers[key];
	                    xhr.setRequestHeader(key, header);
	                }

	            }
	        } catch(e) {
	            me.fireEvent('exception', key, header);
	        }
	        return headers;
	    },
	    
		onComplete : function(request, xdrResult) {
		    var me = this,
		        options = request.options,
		        result,
		        success,
		        response;
		    try {
		        result = me.parseStatus(request.xhr.status);
		    } catch (e) {
		        
		        result = {
		            success : false,
		            isException : false
		        };
		
		    }
		    success = me.isXdr ? xdrResult : result.success;
		    
		    if (success) {
		        response = me.createResponse(request);
		        var ret = null;
				if (response.responseText != "" && response.responseText.indexOf('"errorNum":') > 0) {
					success = false;
					 me.fireEvent('requestexception', me, response, options);
					 Ext.callback(options.failure, options.scope, [response, options]);
				} else {
					 me.fireEvent('requestcomplete', me, response, options);
					 Ext.callback(options.success, options.scope, [response, options]);
				}
		    } else {
		        if (result.isException || request.aborted || request.timedout) {
		            response = me.createException(request);
		        } else {
		            response = me.createResponse(request);
		        }
		        me.fireEvent('requestexception', me, response, options);
		        Ext.callback(options.failure, options.scope, [response, options]);
		    }
		    Ext.callback(options.callback, options.scope, [options, success, response]);
		    delete me.requests[request.id];
		    return response;
		}

});
