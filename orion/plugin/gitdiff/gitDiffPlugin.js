/*******************************************************************************
 * @license
 * Copyright (c) 2013 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html).
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
/*global define URL window*/
define(["orion/plugin", "orion/Deferred", "orion/xhr"], function(PluginProvider, Deferred, xhr) {
    var provider = new PluginProvider({
        name: "Git Diff Editor Annotation Plugin",
        version: "1.0",
        description: "Integrates with Eclipse Orion editor to provide git diff annotation.",
        license: "Eclipse Distribution License",
        website: "https://github.com/gabrielluong/orion-git-diff-plugin"
    });
    
	provider.registerServiceProvider(["orion.core.diff", {
		getDiffContent: function(diffURI){	
			var url = new URL(diffURI, window.location);
			url.query.set("parts", "diff");
			return xhr("GET", url.href, {
				headers: {
					"Orion-Version": "1"
				},
				timeout: 15000
			}).then(function(xhrResult) {
				alert(xhrResult.responseText);
				return xhrResult.responseText;
			});
		},			
		getDiffFileURI: function(diffURI){
			var url = new URL(diffURI, window.location);
			url.query.set("parts", "uris");
			return xhr("GET", url.href, {
				headers: {
					"Orion-Version": "1"
				},
				timeout: 15000
			}).then(function(xhrResult) {
				return JSON.parse(xhrResult.responseText);
			});
		}
	}, {
		contentType: ["application/javascript", "text/html"],
		name: "Git Diff",
		key: ["g", false, false, true], //alt+g
		pid: "gitDiff.config"
	});
    provider.connect();
});
