/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";
define(["ojs/ojcore","jquery","hammerjs"],function(a,g,c){c?(g.fn.hj=function(a){switch(a){case "instance":return this.data("ojHammer");case "destroy":return this.each(function(){var a=g(this),b=a.data("ojHammer");b&&(b.destroy(),a.removeData("ojHammer"))});default:return this.each(function(){var d=g(this);d.data("ojHammer")||d.data("ojHammer",new c.Manager(d[0],a))})}},o_("$.fn.ojHammer",g.fn.hj,void 0),c.Manager.prototype.emit=function(a){return function(c,e){a.call(this,c,e);g(this.element).trigger({type:c,
gesture:e})}}(c.Manager.prototype.emit)):a.r.warn("Hammer jQuery extension loaded without Hammer.")});