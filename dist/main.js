/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "1253558f96c167d2584f";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./index.js")(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./EuclideanGeometry/EuclideanGeometry.js":
/*!************************************************!*\
  !*** ./EuclideanGeometry/EuclideanGeometry.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EuclideanGeometry; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = __webpack_require__(/*! ../constants */ "./constants/constants.js"),
    pi = _require.pi,
    atan2 = _require.atan2,
    tan = _require.tan,
    acos = _require.acos,
    asin = _require.asin,
    cos = _require.cos,
    sin = _require.sin,
    sqrt = _require.sqrt;

var EuclideanGeometry =
/*#__PURE__*/
function () {
  function EuclideanGeometry(context) {
    _classCallCheck(this, EuclideanGeometry);

    _defineProperty(this, "_circleDefault", {
      color: "black",
      fill: true,
      dash: [0, 0],
      cc: false // coutner clock wise

    });

    _defineProperty(this, "_lineDefault", {
      color: "black"
    });

    _defineProperty(this, "dist", function (_ref, _ref2) {
      var _ref3 = _slicedToArray(_ref, 2),
          x1 = _ref3[0],
          y1 = _ref3[1];

      var _ref4 = _slicedToArray(_ref2, 2),
          x2 = _ref4[0],
          y2 = _ref4[1];

      return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    });

    this.context = context;
    return this;
  }

  _createClass(EuclideanGeometry, [{
    key: "middleBetween",
    value: function middleBetween(a, b) {
      var alpha = this.getAlphaBetweenPoints(a, b);
      var middle = this.dist(a, b) / 2;
      return this.coordsFromDeg(alpha, middle, b);
    }
  }, {
    key: "getAlphaBetweenPoints",
    value: function getAlphaBetweenPoints(_ref5, _ref6) {
      var _ref7 = _slicedToArray(_ref5, 2),
          xa = _ref7[0],
          ya = _ref7[1];

      var _ref8 = _slicedToArray(_ref6, 2),
          xb = _ref8[0],
          yb = _ref8[1];

      var w = xa - xb;
      var h = ya - yb;
      return atan2(h, w) * 180 / pi;
    }
  }, {
    key: "coordsFromDeg",
    value: function coordsFromDeg(deg, len, _ref9) {
      var _ref10 = _slicedToArray(_ref9, 3),
          baseX = _ref10[0],
          baseY = _ref10[1],
          baseR = _ref10[2];

      return [baseX + len * cos(deg), baseY + len * sin(deg), baseR];
    }
  }, {
    key: "halfDeg",
    value: function halfDeg(a, b, c) {
      var angle1 = getAlphaBetweenPoints(a, b);
      var angle2 = getAlphaBetweenPoints(a, c);
      var halfDeg = (angle1 + angle2) / 2;
      return halfDeg;
    }
  }, {
    key: "sss",
    value: function sss(a, b, c) {
      var alpha = acos((Math.pow(b, 2) + Math.pow(c, 2) - Math.pow(a, 2)) / (2 * b * c));
      var beta = acos((Math.pow(a, 2) + Math.pow(c, 2) - Math.pow(b, 2)) / (2 * a * c));
      var gamma = pi - alpha - beta;
      return [alpha, beta, gamma];
    }
  }, {
    key: "circle",
    value: function circle(_ref11, o) {
      var _ref12 = _slicedToArray(_ref11, 3),
          x = _ref12[0],
          y = _ref12[1],
          r = _ref12[2];

      var context = this.context,
          _circleDefault = this._circleDefault;
      var options = Object.assign(_circleDefault, o);
      context.beginPath();
      context.moveTo(x + r, y);
      context.arc(x, y, r, 0, 2 * pi);
      context.strokeStyle = options.color;
      context.setLineDash(options.dash);
      context.fillStyle = options.color;
      options.fill ? context.fill() : context.stroke();
    }
  }, {
    key: "halfCircle",
    value: function halfCircle(_ref13, o) {
      var _ref14 = _slicedToArray(_ref13, 3),
          x = _ref14[0],
          y = _ref14[1],
          r = _ref14[2];

      var context = this.context,
          _circleDefault = this._circleDefault;
      var options = Object.assign(_circleDefault, o);
      context.beginPath();
      context.arc(x, y, r, 0, pi, options.cc);
      context.stroke();
      context.fillStyle = "rgba(0,0,0,0.05)";
      context.fill();
    }
  }, {
    key: "circumcircle",
    value: function circumcircle(_ref15) {
      var _ref16 = _slicedToArray(_ref15, 3),
          _ref16$ = _slicedToArray(_ref16[0], 2),
          x1 = _ref16$[0],
          y1 = _ref16$[1],
          _ref16$2 = _slicedToArray(_ref16[1], 2),
          x2 = _ref16$2[0],
          y2 = _ref16$2[1],
          _ref16$3 = _slicedToArray(_ref16[2], 2),
          x3 = _ref16$3[0],
          y3 = _ref16$3[1];

      // i borrowed this function from: https://beta.observablehq.com/@mbostock/circumcircle
      var a2 = x1 - x2;
      var a3 = x1 - x3;
      var b2 = y1 - y2;
      var b3 = y1 - y3;
      var d1 = x1 * x1 + y1 * y1;
      var d2 = d1 - x2 * x2 - y2 * y2;
      var d3 = d1 - x3 * x3 - y3 * y3;
      var ab = (a3 * b2 - a2 * b3) * 2;
      var xa = (b2 * d3 - b3 * d2) / ab - x1;
      var ya = (a3 * d2 - a2 * d3) / ab - y1;
      if (isNaN(xa) || isNaN(ya)) return;
      return [x1 + xa, y1 + ya, sqrt(xa * xa + ya * ya)];
    }
  }, {
    key: "pointOnCircle",
    value: function pointOnCircle(center, r, deg, context) {
      var coordsFromDeg = this.coordsFromDeg;
      var cords = coordsFromDeg(deg, r, center);
      return cords;
    }
  }, {
    key: "incircleTriangle",
    value: function incircleTriangle(_ref17, _ref18, _ref19) {
      var _ref20 = _slicedToArray(_ref17, 2),
          xa = _ref20[0],
          ya = _ref20[1];

      var _ref21 = _slicedToArray(_ref18, 2),
          xb = _ref21[0],
          yb = _ref21[1];

      var _ref22 = _slicedToArray(_ref19, 2),
          xc = _ref22[0],
          yc = _ref22[1];

      var dist = this.dist;
      var a = dist([xb, yb], [xc, yc]);
      var b = dist([xa, ya], [xc, yc]);
      var c = dist([xa, ya], [xb, yb]);
      return [(a * xa + b * xb + c * xc) / (c + a + b), (a * ya + b * yb + c * yc) / (c + a + b)];
    }
  }, {
    key: "radiusIncircleTriangle",
    value: function radiusIncircleTriangle(_ref23, _ref24, _ref25) {
      var _ref26 = _slicedToArray(_ref23, 2),
          xa = _ref26[0],
          ya = _ref26[1];

      var _ref27 = _slicedToArray(_ref24, 2),
          xb = _ref27[0],
          yb = _ref27[1];

      var _ref28 = _slicedToArray(_ref25, 2),
          xc = _ref28[0],
          yc = _ref28[1];

      var dist = this.dist;
      var a = dist([xb, yb], [xc, yc]);
      var b = dist([xa, ya], [xc, yc]);
      var c = dist([xa, ya], [xb, yb]);
      return 0.5 * sqrt((b + c - a) * (c + a - b) * (a + b - c) / (a + c + c));
    }
  }, {
    key: "line",
    value: function line(_ref29, _ref30, o) {
      var _ref31 = _slicedToArray(_ref29, 2),
          x1 = _ref31[0],
          y1 = _ref31[1];

      var _ref32 = _slicedToArray(_ref30, 2),
          x2 = _ref32[0],
          y2 = _ref32[1];

      var context = this.context,
          _lineDefault = this._lineDefault;
      var options = Object.assign(_lineDefault, o);
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.strokeStyle = options.color;
      context.stroke();
    }
  }, {
    key: "lineThrough",
    value: function lineThrough(point, deg) {
      var d = 1000;
      var p1 = coordsFromDeg(deg, d, point);
      var p2 = coordsFromDeg(deg, -d, point);
      return [p1, p2];
    }
  }, {
    key: "parallelTo",
    value: function parallelTo(a, b) {
      var d = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var context = arguments.length > 3 ? arguments[3] : undefined;
      var line = this.line,
          middleBetween = this.middleBetween,
          lineThrough = this.lineThrough,
          getAlphaBetweenPoints = this.getAlphaBetweenPoints,
          coordsFromDeg = this.coordsFromDeg;
      var middle = middleBetween(a, b);
      var angle = getAlphaBetweenPoints(a, b);

      var _lineThrough = lineThrough(coordsFromDeg(angle + 90, d, middle), angle, context),
          _lineThrough2 = _slicedToArray(_lineThrough, 2),
          p1 = _lineThrough2[0],
          p2 = _lineThrough2[1];

      line(p1, p2);
    }
  }, {
    key: "tangentPoints",
    value: function tangentPoints(_ref33, p) {
      var _ref34 = _slicedToArray(_ref33, 3),
          x = _ref34[0],
          y = _ref34[1],
          r = _ref34[2];

      var dist = this.dist,
          getAlphaBetweenPoints = this.getAlphaBetweenPoints,
          radToDeg = this.radToDeg;
      var d = dist([x, y], p);
      var alpha = getAlphaBetweenPoints([x, y, r], p);
      var degAlpha = radToDeg(asin(r / d)) + alpha;
      var degBeta = radToDeg(asin(-r / d)) + alpha;
      return [degAlpha, degBeta];
    }
  }, {
    key: "tangentThroughPoint",
    value: function tangentThroughPoint(a, p) {
      var tangentPoints = this.tangentPoints,
          lineThrough = this.lineThrough;

      var _tangentPoints = tangentPoints(a, p),
          _tangentPoints2 = _slicedToArray(_tangentPoints, 2),
          degAlpha = _tangentPoints2[0],
          degBeta = _tangentPoints2[1];

      lineThrough(p, degAlpha);
      lineThrough(p, degBeta);
    }
  }, {
    key: "lengthTangent",
    value: function lengthTangent(_ref35, p) {
      var _ref36 = _slicedToArray(_ref35, 3),
          x = _ref36[0],
          y = _ref36[1],
          r = _ref36[2];

      var dist = this.dist;
      return sqrt(Math.pow(dist([x, y], p), 2) - Math.pow(r, 2));
    }
  }, {
    key: "triangle",
    value: function triangle(_ref37, _ref38, _ref39) {
      var _ref40 = _slicedToArray(_ref37, 3),
          x1 = _ref40[0],
          y1 = _ref40[1],
          r1 = _ref40[2];

      var _ref41 = _slicedToArray(_ref38, 3),
          x2 = _ref41[0],
          y2 = _ref41[1],
          r2 = _ref41[2];

      var _ref42 = _slicedToArray(_ref39, 3),
          x3 = _ref42[0],
          y3 = _ref42[1],
          r3 = _ref42[2];

      var line = this.line,
          circle = this.circle;
      line([x1, y1], [x2, y2]);
      circle([x1, y1, r1]);
      line([x2, y2], [x3, y3]);
      circle([x2, y2, r2]);
      line([x3, y3], [x1, y1]);
      circle([x3, y3, r3]);
    }
  }, {
    key: "equiliteralTriangle",
    value: function equiliteralTriangle(a, b) {
      var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var line = this.line,
          dist = this.dist,
          getAlphaBetweenPoints = this.getAlphaBetweenPoints,
          coordsFromDeg = this.coordsFromDeg;
      var d = dist(a, b);
      var angle = getAlphaBetweenPoints(a, b);
      var c = coordsFromDeg(dir * 60 + angle, d, b);
      line(a, c);
      line(b, c);
      return c;
    }
  }, {
    key: "centroid",
    value: function centroid(_ref43) {
      var _ref44 = _slicedToArray(_ref43, 3),
          _ref44$ = _slicedToArray(_ref44[0], 2),
          xa = _ref44$[0],
          ya = _ref44$[1],
          _ref44$2 = _slicedToArray(_ref44[1], 2),
          xb = _ref44$2[0],
          yb = _ref44$2[1],
          _ref44$3 = _slicedToArray(_ref44[2], 2),
          xc = _ref44$3[0],
          yc = _ref44$3[1];

      return [(xa + xb + xc) / 3, (ya + yb + yc) / 3];
    }
  }, {
    key: "orthocenter",
    value: function orthocenter(_ref45, alpha, beta, gamma) {
      var _ref46 = _slicedToArray(_ref45, 3),
          _ref46$ = _slicedToArray(_ref46[0], 2),
          x1 = _ref46$[0],
          y1 = _ref46$[1],
          _ref46$2 = _slicedToArray(_ref46[1], 2),
          x2 = _ref46$2[0],
          y2 = _ref46$2[1],
          _ref46$3 = _slicedToArray(_ref46[2], 2),
          x3 = _ref46$3[0],
          y3 = _ref46$3[1];

      return [(x1 * tan(alpha) + x2 * tan(beta) + x3 * tan(gamma)) / (tan(alpha) + tan(beta) + tan(gamma)), (y1 * tan(alpha) + y2 * tan(beta) + y3 * tan(gamma)) / (tan(alpha) + tan(beta) + tan(gamma))];
    }
  }, {
    key: "altitude",
    value: function altitude(a, alpha, b, beta, c, gamma, p) {
      var coordsFromDeg = this.coordsFromDeg,
          getAlphaBetweenPoints = this.getAlphaBetweenPoints;
      var ar = b * cos(alpha);
      var r = coordsFromDeg(getAlphaBetweenPoints(p[1], p[0]), ar, p[0]);
      var bs = c * cos(beta);
      var s = coordsFromDeg(getAlphaBetweenPoints(p[2], p[1]), bs, p[1]);
      var ct = a * cos(gamma);
      var t = coordsFromDeg(getAlphaBetweenPoints(p[0], p[2]), ct, p[2]);
      return [s, t, r];
    }
  }, {
    key: "triangleCenter",
    value: function triangleCenter(_ref47, _ref48, _ref49) {
      var _ref50 = _slicedToArray(_ref47, 2),
          xa = _ref50[0],
          ya = _ref50[1];

      var _ref51 = _slicedToArray(_ref48, 2),
          xb = _ref51[0],
          yb = _ref51[1];

      var _ref52 = _slicedToArray(_ref49, 2),
          xc = _ref52[0],
          yc = _ref52[1];

      var centerX = (xa + xb + xc) / 3;
      var centerY = (ya + ya + ya) / 3;
      return [centerX, centerY];
    }
  }, {
    key: "innerTriangle",
    value: function innerTriangle(a, b, c) {
      var triangle = this.triangle,
          middleBetween = this.middleBetween;
      var p1 = middleBetween(a, b);
      var p2 = middleBetween(b, c);
      var p3 = middleBetween(c, a);
      triangle(p1, p2, p3);
    }
  }]);

  return EuclideanGeometry;
}();

_defineProperty(EuclideanGeometry, "degToRad", function (deg) {
  return deg * pi / 180;
});

_defineProperty(EuclideanGeometry, "radToDeg", function (rad) {
  return rad * 180 / pi;
});



/***/ }),

/***/ "./constants/constants.js":
/*!********************************!*\
  !*** ./constants/constants.js ***!
  \********************************/
/*! exports provided: pi, tau, e, sqrt, pow, atan2, atan, sin, asin, cos, acos, tan */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pi", function() { return pi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tau", function() { return tau; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return e; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrt", function() { return sqrt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pow", function() { return pow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atan2", function() { return atan2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atan", function() { return atan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sin", function() { return sin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asin", function() { return asin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cos", function() { return cos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "acos", function() { return acos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tan", function() { return tan; });
var EuclideanGeometry = __webpack_require__(/*! ../EuclideanGeometry */ "./EuclideanGeometry/EuclideanGeometry.js");

var pi = Math.PI;
var tau = Math.PI * 2;
var e = Math.E;
var sqrt = function sqrt(n) {
  return Math.sqrt(n);
};
var pow = function pow(n, p) {
  return Math.sqrt(n, p);
};
var atan2 = function atan2(h, w) {
  return Math.atan2(h, w);
};
var atan = function atan(d) {
  return Math.atan(EuclideanGeometry.degToRad(d));
};
var sin = function sin(d) {
  return Math.sin(EuclideanGeometry.degToRad(d));
};
var asin = function asin(d) {
  return Math.asin(EuclideanGeometry.degToRad(d));
};
var cos = function cos(d) {
  return Math.cos(EuclideanGeometry.degToRad(d));
};
var acos = function acos(d) {
  return Math.acos(EuclideanGeometry.degToRad(d));
};
var tan = function tan(d) {
  return Math.tan(EuclideanGeometry.degToRad(d));
};

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var EuclideanGeometry = __webpack_require__(/*! ./EuclideanGeometry */ "./EuclideanGeometry/EuclideanGeometry.js");

var constants = __webpack_require__(/*! ./constants */ "./constants/constants.js");

module.exports = {
  EuclideanGeometry: EuclideanGeometry,
  constants: constants
};

/***/ })

/******/ });
//# sourceMappingURL=main.js.map