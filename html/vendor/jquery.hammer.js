! function(a, b) {"use strict";
	function c() {
		e.READY || (e.event.determineEventTypes(), e.utils.each(e.gestures, function(a) {
			e.detection.register(a)
		}), e.event.onTouch(e.DOCUMENT, e.EVENT_MOVE, e.detection.detect), e.event.onTouch(e.DOCUMENT, e.EVENT_END, e.detection.detect), e.READY = !0)
	}

	function d(a, c) {
		a.event.bindDom = function(a, d, e) {
			c(a).on(d, function(a) {
				var c = a.originalEvent || a;
				c.pageX === b && (c.pageX = a.pageX, c.pageY = a.pageY), c.target || (c.target = a.target), c.which === b && (c.which = c.button), c.preventDefault || (c.preventDefault = a.preventDefault), c.stopPropagation || (c.stopPropagation = a.stopPropagation), e.call(this, c)
			})
		}, a.Instance.prototype.on = function(a, b) {
			return c(this.element).on(a, b)
		}, a.Instance.prototype.off = function(a, b) {
			return c(this.element).off(a, b)
		}, a.Instance.prototype.trigger = function(a, b) {
			var d = c(this.element);
			return d.has(b.target).length && ( d = c(b.target)), d.trigger({
				type : a,
				gesture : b
			})
		}, c.fn.hammer = function(b) {
			return this.each(function() {
				var d = c(this), e = d.data("hammer");
				e ? e && b && a.utils.extend(e.options, b) : d.data("hammer", new a(this, b || {}))
			})
		}
	}

	var e = function(a, b) {
		return new e.Instance(a, b || {})
	};
	e.defaults = {
		stop_browser_behavior : {
			userSelect : "none",
			touchAction : "none",
			touchCallout : "none",
			contentZooming : "none",
			userDrag : "none",
			tapHighlightColor : "rgba(0,0,0,0)"
		}
	}, e.HAS_POINTEREVENTS = a.navigator.pointerEnabled || a.navigator.msPointerEnabled, e.HAS_TOUCHEVENTS = "ontouchstart" in a, e.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i, e.NO_MOUSEEVENTS = e.HAS_TOUCHEVENTS && a.navigator.userAgent.match(e.MOBILE_REGEX), e.EVENT_TYPES = {}, e.DIRECTION_DOWN = "down", e.DIRECTION_LEFT = "left", e.DIRECTION_UP = "up", e.DIRECTION_RIGHT = "right", e.POINTER_MOUSE = "mouse", e.POINTER_TOUCH = "touch", e.POINTER_PEN = "pen", e.UPDATE_VELOCITY_INTERVAL = 16, e.EVENT_START = "start", e.EVENT_MOVE = "move", e.EVENT_END = "end", e.DOCUMENT = a.document, e.plugins = e.plugins || {}, e.gestures = e.gestures || {}, e.READY = !1, e.utils = {
		extend : function(a, c, d) {
			for (var e in c)a[e] !== b && d || (a[e] = c[e]);
			return a
		},
		each : function(a, c, d) {
			var e, f;
			if ("forEach" in a)
				a.forEach(c, d);
			else if (a.length !== b) {
				for ( e = -1; f = a[++e]; )
					if (c.call(d, f, e, a) === !1)
						return
			} else
				for (e in a)
				if (a.hasOwnProperty(e) && c.call(d, a[e], e, a) === !1)
					return
		},
		hasParent : function(a, b) {
			for (; a; ) {
				if (a == b)
					return !0;
				a = a.parentNode
			}
			return !1
		},
		getCenter : function(a) {
			var b = [], c = [];
			return e.utils.each(a, function(a) {
				b.push("undefined" != typeof a.clientX ? a.clientX : a.pageX), c.push("undefined" != typeof a.clientY ? a.clientY : a.pageY)
			}), {
				pageX : (Math.min.apply(Math, b) + Math.max.apply(Math, b)) / 2,
				pageY : (Math.min.apply(Math, c) + Math.max.apply(Math, c)) / 2
			}
		},
		getVelocity : function(a, b, c) {
			return {
				x : Math.abs(b / a) || 0,
				y : Math.abs(c / a) || 0
			}
		},
		getAngle : function(a, b) {
			var c = b.pageY - a.pageY, d = b.pageX - a.pageX;
			return 180 * Math.atan2(c, d) / Math.PI
		},
		getDirection : function(a, b) {
			var c = Math.abs(a.pageX - b.pageX), d = Math.abs(a.pageY - b.pageY);
			return c >= d ? a.pageX - b.pageX > 0 ? e.DIRECTION_LEFT : e.DIRECTION_RIGHT : a.pageY - b.pageY > 0 ? e.DIRECTION_UP : e.DIRECTION_DOWN
		},
		getDistance : function(a, b) {
			var c = b.pageX - a.pageX, d = b.pageY - a.pageY;
			return Math.sqrt(c * c + d * d)
		},
		getScale : function(a, b) {
			return a.length >= 2 && b.length >= 2 ? this.getDistance(b[0], b[1]) / this.getDistance(a[0], a[1]) : 1
		},
		getRotation : function(a, b) {
			return a.length >= 2 && b.length >= 2 ? this.getAngle(b[1], b[0]) - this.getAngle(a[1], a[0]) : 0
		},
		isVertical : function(a) {
			return a == e.DIRECTION_UP || a == e.DIRECTION_DOWN
		},
		toggleDefaultBehavior : function(a, b, c) {
			b && a && a.style && (e.utils.each(["webkit", "moz", "Moz", "ms", "o", ""], function(d) {
				e.utils.each(b, function(b, e) {
					d && ( e = d + e.substring(0, 1).toUpperCase() + e.substring(1)), e in a.style && (a.style[e] = !c && b)
				})
			}), "none" == b.userSelect && (a.onselectstart = !c &&
			function() {
				return !1
			}), "none" == b.userDrag && (a.ondragstart = !c &&
			function() {
				return !1
			}))

		}
	}, e.Instance = function(a, b) {
		var d = this;
		return c(), this.element = a, this.enabled = !0, this.options = e.utils.extend(e.utils.extend({}, e.defaults), b || {}), this.options.stop_browser_behavior && e.utils.toggleDefaultBehavior(this.element, this.options.stop_browser_behavior, !1), this.eventStartHandler = e.event.onTouch(a, e.EVENT_START, function(a) {
			d.enabled && e.detection.startDetect(d, a)
		}), this.eventHandlers = [], this
	}, e.Instance.prototype = {
		on : function(a, b) {
			var c = a.split(" ");
			return e.utils.each(c, function(a) {
				this.element.addEventListener(a, b, !1), this.eventHandlers.push({
					gesture : a,
					handler : b
				})
			}, this), this
		},
		off : function(a, b) {
			var c, d, f = a.split(" ");
			return e.utils.each(f, function(a) {
				for (this.element.removeEventListener(a, b, !1), c = -1; d = this.eventHandlers[++c]; )
					d.gesture === a && d.handler === b && this.eventHandlers.splice(c, 1)
			}, this), this
		},
		trigger : function(a, b) {
			b || ( b = {});
			var c = e.DOCUMENT.createEvent("Event");
			c.initEvent(a, !0, !0), c.gesture = b;
			var d = this.element;
			return e.utils.hasParent(b.target, d) && ( d = b.target), d.dispatchEvent(c), this
		},
		enable : function(a) {
			return this.enabled = a, this
		},
		dispose : function() {
			var a, b;
			for (this.options.stop_browser_behavior && e.utils.toggleDefaultBehavior(this.element, this.options.stop_browser_behavior, !0), a = -1; b = this.eventHandlers[++a]; )
				this.element.removeEventListener(b.gesture, b.handler, !1);
			return this.eventHandlers = [], e.event.unbindDom(this.element, e.EVENT_TYPES[e.EVENT_START], this.eventStartHandler), null
		}
	};
	var f = null, g = !1, h = !1;
	e.event = {
		bindDom : function(a, b, c) {
			var d = b.split(" ");
			e.utils.each(d, function(b) {
				a.addEventListener(b, c, !1)
			})
		},
		unbindDom : function(a, b, c) {
			var d = b.split(" ");
			e.utils.each(d, function(b) {
				a.removeEventListener(b, c, !1)
			})
		},
		onTouch : function(a, b, c) {
			var d = this, i = function(i) {
				var j = i.type.toLowerCase();
				if (!j.match(/mouse/) || !h) {
					j.match(/touch/) || j.match(/pointerdown/) || j.match(/mouse/) && 1 === i.which ? g = !0 : j.match(/mouse/) && !i.which && ( g = !1), j.match(/touch|pointer/) && ( h = !0);
					var k = 0;
					g && (e.HAS_POINTEREVENTS && b != e.EVENT_END ? k = e.PointerEvent.updatePointer(b, i) : j.match(/touch/) ? k = i.touches.length : h || ( k = j.match(/up/) ? 0 : 1), k > 0 && b == e.EVENT_END ? b = e.EVENT_MOVE : k || ( b = e.EVENT_END), (k || null === f) && ( f = i), c.call(e.detection, d.collectEventData(a, b, d.getTouchList(f, b), i)), e.HAS_POINTEREVENTS && b == e.EVENT_END && ( k = e.PointerEvent.updatePointer(b, i))), k || ( f = null, g = !1, h = !1, e.PointerEvent.reset())
				}
			};
			return this.bindDom(a, e.EVENT_TYPES[b], i), i
		},
		determineEventTypes : function() {
			var a;
			a = e.HAS_POINTEREVENTS ? e.PointerEvent.getEvents() : e.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"], e.EVENT_TYPES[e.EVENT_START] = a[0], e.EVENT_TYPES[e.EVENT_MOVE] = a[1], e.EVENT_TYPES[e.EVENT_END] = a[2]
		},
		getTouchList : function(a) {
			return e.HAS_POINTEREVENTS ? e.PointerEvent.getTouchList() : a.touches ? a.touches : (a.identifier = 1, [a])
		},
		collectEventData : function(a, b, c, d) {
			var f = e.POINTER_TOUCH;
			return (d.type.match(/mouse/) || e.PointerEvent.matchType(e.POINTER_MOUSE, d)) && ( f = e.POINTER_MOUSE), {
				center : e.utils.getCenter(c),
				timeStamp : (new Date).getTime(),
				target : d.target,
				touches : c,
				eventType : b,
				pointerType : f,
				srcEvent : d,
				preventDefault : function() {
					this.srcEvent.preventManipulation && this.srcEvent.preventManipulation(), this.srcEvent.preventDefault && this.srcEvent.preventDefault()
				},
				stopPropagation : function() {
					this.srcEvent.stopPropagation()
				},
				stopDetect : function() {
					return e.detection.stopDetect()
				}
			}
		}
	}, e.PointerEvent = {
		pointers : {},
		getTouchList : function() {
			var a = this, b = [];
			return e.utils.each(a.pointers, function(a) {
				b.push(a)
			}), b
		},
		updatePointer : function(a, b) {
			return a == e.EVENT_END ?
			delete this.pointers[b.pointerId] : (b.identifier = b.pointerId, this.pointers[b.pointerId] = b), Object.keys(this.pointers).length
		},
		matchType : function(a, b) {
			if (!b.pointerType)
				return !1;
			var c = b.pointerType, d = {};
			return d[e.POINTER_MOUSE] = c === b.MSPOINTER_TYPE_MOUSE || c === e.POINTER_MOUSE, d[e.POINTER_TOUCH] = c === b.MSPOINTER_TYPE_TOUCH || c === e.POINTER_TOUCH, d[e.POINTER_PEN] = c === b.MSPOINTER_TYPE_PEN || c === e.POINTER_PEN, d[a]
		},
		getEvents : function() {
			return ["pointerdown MSPointerDown", "pointermove MSPointerMove", "pointerup pointercancel MSPointerUp MSPointerCancel"]
		},
		reset : function() {
			this.pointers = {}
		}
	}, e.detection = {
		gestures : [],
		current : null,
		previous : null,
		stopped : !1,
		startDetect : function(a, b) {
			this.current || (this.stopped = !1, this.current = {
				inst : a,
				startEvent : e.utils.extend({}, b),
				lastEvent : !1,
				lastVEvent : !1,
				velocity : !1,
				name : ""
			}, this.detect(b))
		},
		detect : function(a) {
			if (this.current && !this.stopped) {
				a = this.extendEventData(a);
				var b = this.current.inst.options;
				return e.utils.each(this.gestures, function(c) {
					return this.stopped || b[c.name] === !1 || c.handler.call(c, a, this.current.inst) !== !1 ?
					void 0 : (this.stopDetect(), !1)
				}, this), this.current && (this.current.lastEvent = a), a.eventType == e.EVENT_END && !a.touches.length - 1 && this.stopDetect(), a
			}
		},
		stopDetect : function() {
			this.previous = e.utils.extend({}, this.current), this.current = null, this.stopped = !0
		},
		extendEventData : function(a) {
			var b = this.current.startEvent, c = this.current.lastVEvent;
			!b || a.touches.length == b.touches.length && a.touches !== b.touches || (b.touches = [], e.utils.each(a.touches, function(a) {
				b.touches.push(e.utils.extend({}, a))
			}));
			var d, f, g = a.timeStamp - b.timeStamp, h = a.center.pageX - b.center.pageX, i = a.center.pageY - b.center.pageY, j = this.current.velocity;
			return c !== !1 && a.timeStamp - c.timeStamp > e.UPDATE_VELOCITY_INTERVAL ? ( j = e.utils.getVelocity(a.timeStamp - c.timeStamp, a.center.pageX - c.center.pageX, a.center.pageY - c.center.pageY), this.current.lastVEvent = a, j.x > 0 && j.y > 0 && (this.current.velocity = j)) : this.current.velocity === !1 && ( j = e.utils.getVelocity(g, h, i), this.current.velocity = j, this.current.lastVEvent = a), a.eventType == e.EVENT_END ? ( d = this.current.lastEvent && this.current.lastEvent.interimAngle, f = this.current.lastEvent && this.current.lastEvent.interimDirection) : ( d = this.current.lastEvent && e.utils.getAngle(this.current.lastEvent.center, a.center), f = this.current.lastEvent && e.utils.getDirection(this.current.lastEvent.center, a.center)), e.utils.extend(a, {
				deltaTime : g,
				deltaX : h,
				deltaY : i,
				velocityX : j.x,
				velocityY : j.y,
				distance : e.utils.getDistance(b.center, a.center),
				angle : e.utils.getAngle(b.center, a.center),
				interimAngle : d,
				direction : e.utils.getDirection(b.center, a.center),
				interimDirection : f,
				scale : e.utils.getScale(b.touches, a.touches),
				rotation : e.utils.getRotation(b.touches, a.touches),
				startEvent : b
			}), a
		},
		register : function(a) {
			var c = a.defaults || {};
			return c[a.name] === b && (c[a.name] = !0), e.utils.extend(e.defaults, c, !0), a.index = a.index || 1e3, this.gestures.push(a), this.gestures.sort(function(a, b) {
				return a.index < b.index ? -1 : a.index > b.index ? 1 : 0
			}), this.gestures
		}
	}, e.gestures.Drag = {
		name : "drag",
		index : 50,
		defaults : {
			drag_min_distance : 10,
			correct_for_drag_min_distance : !0,
			drag_max_touches : 1,
			drag_block_horizontal : !1,
			drag_block_vertical : !1,
			drag_lock_to_axis : !1,
			drag_lock_min_distance : 25
		},
		triggered : !1,
		handler : function(a, b) {
			if (e.detection.current.name != this.name && this.triggered)
				return b.trigger(this.name + "end", a),
				void (this.triggered = !1);
			if (!(b.options.drag_max_touches > 0 && a.touches.length > b.options.drag_max_touches))
				switch(a.eventType) {
					case e.EVENT_START:
						this.triggered = !1;
						break;
					case e.EVENT_MOVE:
						if (a.distance < b.options.drag_min_distance && e.detection.current.name != this.name)
							return;
						if (e.detection.current.name != this.name && (e.detection.current.name = this.name, b.options.correct_for_drag_min_distance && a.distance > 0)) {
							var c = Math.abs(b.options.drag_min_distance / a.distance);
							e.detection.current.startEvent.center.pageX += a.deltaX * c, e.detection.current.startEvent.center.pageY += a.deltaY * c, a = e.detection.extendEventData(a)
						}
						(e.detection.current.lastEvent.drag_locked_to_axis || b.options.drag_lock_to_axis && b.options.drag_lock_min_distance <= a.distance) && (a.drag_locked_to_axis = !0);
						var d = e.detection.current.lastEvent.direction;
						a.drag_locked_to_axis && d !== a.direction && (a.direction = e.utils.isVertical(d) ? a.deltaY < 0 ? e.DIRECTION_UP : e.DIRECTION_DOWN : a.deltaX < 0 ? e.DIRECTION_LEFT : e.DIRECTION_RIGHT), this.triggered || (b.trigger(this.name + "start", a), this.triggered = !0), b.trigger(this.name, a), b.trigger(this.name + a.direction, a);
						var f = e.utils.isVertical(a.direction);
						(b.options.drag_block_vertical && f || b.options.drag_block_horizontal && !f) && a.preventDefault();
						break;
					case e.EVENT_END:
						this.triggered && b.trigger(this.name + "end", a), this.triggered = !1
				}
		}
	}, e.gestures.Hold = {
		name : "hold",
		index : 10,
		defaults : {
			hold_timeout : 500,
			hold_threshold : 1
		},
		timer : null,
		handler : function(a, b) {
			switch(a.eventType) {
				case e.EVENT_START:
					clearTimeout(this.timer), e.detection.current.name = this.name, this.timer = setTimeout(function() {
						"hold" == e.detection.current.name && b.trigger("hold", a)
					}, b.options.hold_timeout);
					break;
				case e.EVENT_MOVE:
					a.distance > b.options.hold_threshold && clearTimeout(this.timer);
					break;
				case e.EVENT_END:
					clearTimeout(this.timer)
			}
		}
	}, e.gestures.Release = {
		name : "release",
		index : 1 / 0,
		handler : function(a, b) {
			a.eventType == e.EVENT_END && b.trigger(this.name, a)
		}
	}, e.gestures.Swipe = {
		name : "swipe",
		index : 40,
		defaults : {
			swipe_min_touches : 1,
			swipe_max_touches : 1,
			swipe_velocity : .7
		},
		handler : function(a, b) {
			if (a.eventType == e.EVENT_END) {
				if (a.touches.length < b.options.swipe_min_touches || a.touches.length > b.options.swipe_max_touches)
					return;
				(a.velocityX > b.options.swipe_velocity || a.velocityY > b.options.swipe_velocity) && (b.trigger(this.name, a), b.trigger(this.name + a.direction, a))
			}
		}
	}, e.gestures.Tap = {
		name : "tap",
		index : 100,
		defaults : {
			tap_max_touchtime : 250,
			tap_max_distance : 10,
			tap_always : !0,
			doubletap_distance : 20,
			doubletap_interval : 300
		},
		has_moved : !1,
		handler : function(a, b) {
			var c, d, f;
			a.eventType == e.EVENT_START ? this.has_moved = !1 : a.eventType != e.EVENT_MOVE || this.moved ? a.eventType == e.EVENT_END && "touchcancel" != a.srcEvent.type && a.deltaTime < b.options.tap_max_touchtime && !this.has_moved && ( c = e.detection.previous, d = c && a.timeStamp - c.lastEvent.timeStamp, f = !1, c && "tap" == c.name && d && d < b.options.doubletap_interval && a.distance < b.options.doubletap_distance && (b.trigger("doubletap", a), f = !0), (!f || b.options.tap_always) && (e.detection.current.name = "tap", b.trigger(e.detection.current.name, a))) : this.has_moved = a.distance > b.options.tap_max_distance
		}
	}, e.gestures.Touch = {
		name : "touch",
		index : -1 / 0,
		defaults : {
			prevent_default : !1,
			prevent_mouseevents : !1
		},
		handler : function(a, b) {
			return b.options.prevent_mouseevents && a.pointerType == e.POINTER_MOUSE ?
			void  a.stopDetect() : (b.options.prevent_default && a.preventDefault(),
			void (a.eventType == e.EVENT_START && b.trigger(this.name, a)))
		}
	}, e.gestures.Transform = {
		name : "transform",
		index : 45,
		defaults : {
			transform_min_scale : .01,
			transform_min_rotation : 1,
			transform_always_block : !1,
			transform_within_instance : !1
		},
		triggered : !1,
		handler : function(a, b) {
			if (e.detection.current.name != this.name && this.triggered)
				return b.trigger(this.name + "end", a),
				void (this.triggered = !1);
			if (!(a.touches.length < 2)) {
				if (b.options.transform_always_block && a.preventDefault(), b.options.transform_within_instance)
					for (var c = -1; a.touches[++c]; )
						if (!e.utils.hasParent(a.touches[c].target, b.element))
							return;
				switch(a.eventType) {
					case e.EVENT_START:
						this.triggered = !1;
						break;
					case e.EVENT_MOVE:
						var d = Math.abs(1 - a.scale), f = Math.abs(a.rotation);
						if (d < b.options.transform_min_scale && f < b.options.transform_min_rotation)
							return;
						e.detection.current.name = this.name, this.triggered || (b.trigger(this.name + "start", a), this.triggered = !0), b.trigger(this.name, a), f > b.options.transform_min_rotation && b.trigger("rotate", a), d > b.options.transform_min_scale && (b.trigger("pinch", a), b.trigger("pinch" + (a.scale < 1 ? "in" : "out"), a));
						break;
					case e.EVENT_END:
						this.triggered && b.trigger(this.name + "end", a), this.triggered = !1
				}
			}
		}
	}, a.Hammer = e, "object" == typeof module && module.exports && (module.exports = e), "function" == typeof define && define.amd ? define(["jquery"], function(b) {
		return d(a.Hammer, b)
	}) : d(a.Hammer, a.jQuery || a.Zepto)
}(window);
