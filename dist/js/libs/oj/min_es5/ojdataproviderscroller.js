/**
 * @license
 * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
define(["ojs/ojcore","jquery","require","ojs/ojcontext","ojs/ojconfig","ojs/ojcomponentcore","ojs/ojlogger","ojs/ojdatacollection-common","ojs/ojanimation","ojs/ojdomscroller"],(function(t,e,i,n,o,r,s,l,a,d){"use strict";var h=function(t,e,i){this.m_root=e,this.m_widget=t,this.m_fetching=!1,this.setDataProvider(i),this.Init()};t.Object.createSubclass(h,t.Object,"DataProviderContentHandler"),h.prototype.Init=function(){h.superclass.Init.call(this)},h.prototype.notifyShown=function(){},h.prototype.notifyAttached=function(){},h.prototype.cleanItems=function(t,e){if(void 0===t&&(t=this.getTemplateEngine()),void 0===e&&(e=this.m_root),t&&e)for(var i=e.childNodes,n=0;n<i.length;n++)t.clean(i[n])},h.prototype.Destroy=function(t){null!=this.m_superRoot&&(this.m_root=this.m_superRoot),this.cleanItems(),t&&e(this.m_root).empty(),this.m_widget=null,this.m_root=null,this.m_superRoot=null},h.prototype.IsReady=function(){return!this.m_fetching},h.prototype.setRootAriaProperties=function(){this.shouldUseGridRole()?this.m_root.setAttribute("role","grid"):this.IsHierarchical()?this.m_root.setAttribute("role","tree"):this.m_root.setAttribute("role","listbox")},h.prototype.RenderContent=function(){this.signalTaskStart("rendering content"),this.setRootAriaProperties(),this.fetchRows(!1),this.signalTaskEnd()},h.prototype.GetKey=function(t){return t.key},h.prototype.FindElementByKey=function(i){for(var n=e(this.m_root).find("."+this.m_widget.getItemElementStyleClass()),o=0;o<n.length;o++){var r=n[o];if(i==this.GetKey(r)||t.Object.compareValues(i,this.GetKey(r)))return r}return null},h.prototype.getDataProvider=function(){return this.m_dataProvider},h.prototype.setDataProvider=function(t){this._removeDataSourceEventListeners(),null!=t&&(this.m_handleModelMutateEventListener=this.handleModelMutateEvent.bind(this),this.m_handleModelRefreshEventListener=this.handleModelRefreshEvent.bind(this),t.addEventListener("mutate",this.m_handleModelMutateEventListener),t.addEventListener("refresh",this.m_handleModelRefreshEventListener)),this.m_dataProvider=t},h.prototype._removeDataSourceEventListeners=function(){var e=this.getDataProvider();null!=e&&(e.removeEventListener("mutate",this.m_handleModelMutateEventListener),e.removeEventListener("refresh",this.m_handleModelRefreshEventListener),t.TableDataSourceAdapter&&e instanceof t.TableDataSourceAdapter&&e.destroy())},h.prototype.loadTemplateEngine=function(){var t=this;return null!=this.m_widget.getItemTemplate()&&null==this.m_widget._getItemRenderer()?new Promise((function(e){o.__getTemplateEngine().then((function(i){t.m_engine=i,e(i)}),(function(t){throw new Error("Error loading template engine: "+t)}))})):Promise.resolve(null)},h.prototype.getTemplateEngine=function(){return this.m_engine},h.prototype.fetchRows=function(t){this.m_widget.showStatusText()},h.prototype.GetChildElementTagName=function(){return"LI"},h.prototype.GetReferenceNode=function(t,i){if(-1===i)return null;var n=e(t).children("."+this.m_widget.getItemElementStyleClass()+", ."+this.m_widget.getEmptyTextStyleClass()+", .oj-listview-temp-item");return i===n.length?null:n[i]},h.prototype.addItem=function(t,i,n,o,r,s,l){var a=document.createElement(this.GetChildElementTagName());e(a).uniqueId();var d=this.GetReferenceNode(t,i);this.m_widget.BeforeInsertItem&&this.m_widget.BeforeInsertItem(),t.insertBefore(a,d);var h=e(t).children().index(a);return this._addOrReplaceItem(a,h,t,i,n,o,r,s,!1,l)},h.prototype.replaceItem=function(t,i,n,o,r,s,l){this.signalTaskStart("replace item");var a=t.parentNode,d=e(a).children().index(t),h=document.createElement(this.GetChildElementTagName());r&&r.clean(t),e(t).replaceWith(h),this._addOrReplaceItem(h,d,a,i,n,o,r,s,l)},h.prototype._addOrReplaceItem=function(t,i,n,o,r,s,l,a,d,h){null==a&&(a=this.afterRenderItem.bind(this));var m,c=this.createContext(i,r,s,t,h),u=this.m_widget._getItemRenderer(),p=this.m_widget.getItemTemplate(),g=!1;if(null!=u){var _=u.call(this,c);null!=_&&(null===_.parentNode||_.parentNode instanceof DocumentFragment?t.appendChild(_):null!=_.parentNode||_.toString&&((m=document.createElement("span")).appendChild(document.createTextNode(_.toString())),t.appendChild(m)))}else if(null!=p&&null!=l)for(var f=this.m_widget.GetRootElement()[0],v=this.GetBindingContext(c),y=this.m_widget.getAs?this.m_widget.getAs():null,w=l.execute(f,p,v,y),S=this.GetChildElementTagName(),E=0;E<w.length;E++){if(w[E].tagName===S){n.replaceChild(w[E],t),g=!0;break}t.appendChild(w[E])}else(m=document.createElement("span")).appendChild(document.createTextNode(null==r?"":r.toString())),t.appendChild(m);var k=n.children?n.children[i]:this._getItemFromDocumentFragment(n,i);return c.parentElement=k,e.data(k,"data",r),e.data(k,"metadata",h),a(k,c,g,d),{item:k,context:c}},h.prototype._getItemFromDocumentFragment=function(t,e){for(var i=0,n=t.childNodes,o=0;o<n.length;o++){var r=n[o];if(!r)break;if(1===r.nodeType){if(i===e)return r;i+=1}}return null},h.prototype.GetBindingContext=function(t){var e={};return e.data=t.data,e.index=t.index,e.key=t.key,e.componentElement=t.componentElement,e},h.prototype.afterRenderItem=function(t,i){t.key=i.key;var n=e(t);n.uniqueId();var o=this.m_widget.getSingleFocusableElement(n);if(this.shouldUseGridRole())if(null==i.leaf||i.leaf)if(this.isCardLayout())o.attr("role","gridcell");else if(n.attr("role","row"),o!==n)o.attr("role","gridcell");else{if(0===o.children().length)o.get(0).innerHTML="<div role='gridcell' class='oj-listview-cell-element'></div>";else{var r=document.createElement("div");for(r.setAttribute("role","gridcell"),r.className="oj-listview-cell-element";o[0].firstChild;)r.appendChild(o[0].firstChild);o[0].appendChild(r)}}else n.attr("role","presentation");else o.attr("role",this.IsHierarchical()?"treeitem":"option"),o!==n&&n.attr("role","presentation");o.addClass(this.m_widget.getFocusedElementStyleClass()),this.isFocusable(i)||n.addClass("oj-skipfocus"),n.addClass(this.m_widget.getItemElementStyleClass())},h.prototype.getMetadata=function(t,e,i,n){var o=i.context;return null==o&&(o={}),null==o.index&&(o.index=t),null==o.key&&(o.key=e),o},h.prototype.handleModelMutateEvent=function(t){null!=this.m_root&&this.m_widget.isAvailable()&&(null!=t.detail.remove&&this.handleModelRemoveEvent(t),null!=t.detail.add&&this.handleModelAddEvent(t),null!=t.detail.update&&this.handleModelChangeEvent(t))},h.prototype.handleModelRefreshEvent=function(t){},h.prototype._pushToEventQueue=function(t){null==this.m_eventQueue&&(this.m_eventQueue=[]),this.m_eventQueue.push(t)},h.prototype._processEventQueue=function(){var t;if(null!=this.m_eventQueue&&this.m_eventQueue.length>0){for(var e=0;e<this.m_eventQueue.length;e++)if("refresh"===(t=this.m_eventQueue[e]).type)return void this.handleModelRefreshEvent(t.event);"mutate"===(t=this.m_eventQueue.shift()).type&&this.handleModelMutateEvent(t.event)}},h.prototype._clearEventQueue=function(){null!=this.m_eventQueue&&(this.m_eventQueue.length=0)},h.prototype.addItemsForModelInsert=function(t,e,i,n,o){},h.prototype.handleModelAddEvent=function(t){if(this.IsReady()){this.signalTaskStart("handling model add event"),this.m_superRoot&&0===this.m_root.childNodes.length&&this.m_superRoot.appendChild(this.m_root.parentNode);var e,i,n=t.detail.add,o=n.data,r=[];n.keys.forEach((function(t){r.push(t)}));var s=!0;void 0!==n.addBeforeKeys?i=n.addBeforeKeys:void 0!==n.afterKeys&&(i=n.afterKeys,s=!1),i&&(e=[],i.forEach((function(t){e.push(t)})));var l=n.parentKeys,a=n.indexes,d=n.metadata;null!=o&&null!=r&&r.length>0&&o.length>0&&r.length===o.length&&(null==a||a.length===o.length)&&this.addItemsForModelInsert(o,a,r,l,s,e,d),this.signalTaskEnd()}else this._pushToEventQueue({type:t.type,event:t})},h.prototype.afterRenderItemForInsertEvent=function(t,i,o){this.signalTaskStart("after render item from model insert event"),t.setAttribute("data-oj-context",""),this.afterRenderItem(t,i,o);var r=e(t),s=t.className;t._className=s,t.className="oj-listview-temp-item oj-listview-item-add-remove-transition",this.isCardLayout()&&(t.className=t.className+" "+this.m_widget.getItemStyleClass()),this.shouldUseGridRole()||r.children().wrapAll("<div></div>");var l=r.children().first();this.isCardLayout()||(l[0].className=s),l[0].key=t.key,this.shouldUseGridRole()||(l.attr("role",t.getAttribute("role")),r[0].hasAttribute("aria-selected")&&l.attr("aria-selected",t.getAttribute("aria-selected")));var a=this;t.style.opacity=0,n.getContext(t).getBusyContext().whenReady().then((function(){null!=a.m_widget&&(a.signalTaskStart("kick off animation for insert item"),a.m_widget.StartAnimation(t,"add").then((function(){t.style.opacity="",t.removeAttribute("data-oj-context"),a._handleAddTransitionEnd(i,t)})),a.signalTaskEnd())}))},h.prototype._handleAddTransitionEnd=function(t,i){if(null!=this.m_widget&&null!=i.parentNode){var n=i.classList.contains("oj-focus")&&i.classList.contains("oj-focus-highlight");if(i.className=i._className,n&&(i.classList.add("oj-focus"),i.classList.add("oj-focus-highlight")),this.shouldUseGridRole()){if(!this.isCardLayout()){var o=i.firstElementChild;if(o){i._className.split(" ").forEach((function(t){o.classList.remove(t)})),o.classList.add("oj-listview-cell-element");var r=o.firstElementChild;r&&r.classList.remove("oj-listview-cell-element")}}}else e(i).children().children().unwrap();this.m_widget.itemInsertComplete(i,t),this.signalTaskEnd()}else this.signalTaskEnd()},h.prototype.handleModelRemoveEvent=function(t){var e=this,i=t.detail.remove.keys;if(null!=i&&0!==i.size)if(this.IsReady()){this.signalTaskStart("handling model remove event");var n=[];if(i.forEach((function(t){var i=e.FindElementByKey(t);null!=i&&(e.signalTaskStart("handling model remove event for item: "+t),i.parentNode.classList.contains("oj-listview-temp-item")&&(i=i.parentNode),n.push(e._removeItem(i)),e.signalTaskEnd())})),this.isSelectionEnabled()){var o=this.m_widget.options.selected,r=o.delete(i);if(o!==r){var s=[];r.values&&r.values().forEach((function(t){s.push(e.FindElementByKey(t))})),this.m_widget._setSelectionOption(r,null,s)}}this.m_widget.ClearCache(),Promise.all(n).then((function(){e.afterItemsRemoved()})),this.signalTaskEnd()}else this._pushToEventQueue({type:t.type,event:t})},h.prototype.afterItemsRemoved=function(){},h.prototype._removeItem=function(t){var i=this;this.signalTaskStart("removing an item");var n=document.activeElement,o=t.contains(n),r=e(t).get(0),s=r.className;e(r).children().wrapAll("<div class='"+s+"'></div>"),r.className="oj-listview-item-add-remove-transition",r.children[0].key=t.key,this.signalTaskStart("kick off animation to remove an item");var l=this.m_widget.StartAnimation(r,"remove");return l.then((function(){i.handleRemoveTransitionEnd(t,o)})),this.signalTaskEnd(),l},h.prototype.handleRemoveTransitionEnd=function(t,i){if(null!=this.m_widget){var n=e(t),o=n.parent();if(0!==o.length){this.m_widget.itemRemoveComplete(n.get(0),i);var r=this.getTemplateEngine();r&&r.clean(n.get(0)),n.remove(),0===o.get(0).childElementCount&&this.m_widget.renderComplete(),this.isSelectionEnabled()&&this.m_widget.enforceSelectionRequired(),i&&this.m_root.focus(),this.signalTaskEnd()}else this.signalTaskEnd()}else this.signalTaskEnd()},h.prototype.handleModelChangeEvent=function(t){this.signalTaskStart("handling model update event");var e=t.detail.update,i=e.data,n=[];e.keys.forEach((function(t){n.push(t)}));for(var o,r=this.getTemplateEngine(),s=e.indexes,l=!1,a=0;a<n.length;a++){var d=this.FindElementByKey(n[a]);if(null!=d){void 0===o&&d.contains(document.activeElement)&&(o=d),!l&&this.m_widget.isFirstSelectedItem(n[a])&&(this.m_widget.setFirstSelectedItem(n[a],i[a]),l=!0),this.signalTaskStart("handling model update event for item: "+n[a]);var h=null==s?-1:s[a];this.replaceItem(d,h,i[a],this.getMetadata(h,n[a],i[a],d.parentNode),r,this.afterRenderItemForChangeEvent.bind(this),null!=o),this.signalTaskEnd(),null!=o&&(o=null)}}this.m_widget.ClearCache(),this.signalTaskEnd()},h.prototype.afterRenderItemForChangeEvent=function(t,e,i,n){var o=this;this.signalTaskStart("after render item for model change event"),this.afterRenderItem(t,e,i),this.m_widget.StartAnimation(t,"update").then((function(){o._handleReplaceTransitionEnd(t,n)})),this.signalTaskEnd()},h.prototype._handleReplaceTransitionEnd=function(t,i){null!=this.m_widget?(e(t).removeClass("oj-listview-item-add-remove-transition"),i&&this.m_widget.restoreCurrentItemFocus(t),this.signalTaskEnd()):this.signalTaskEnd()},h.prototype.createContext=function(t,e,i,n,o){var r={};r.parentElement=n,r.index=t,r.data=e,r.component=this.m_widget.getWidgetConstructor(),r.datasource=this.getDataProvider(),(r=this.m_widget._FixRendererContext(r)).metadata=o;for(var s=Object.keys(i),l=0;l<s.length;l++){var a=s[l];r[a]=i[a]}return r},h.prototype.isSelectionEnabled=function(){return this.m_widget._isSelectionEnabled()},h.prototype.isFocusable=function(t){return this.m_widget.getItemFocusable(t)},h.prototype.isSelectable=function(t){return this.m_widget.getItemSelectable(t)},h.prototype.isCardLayout=function(){return this.m_widget.isCardLayout()},h.prototype.shouldUseGridRole=function(){return this.m_widget.ShouldUseGridRole()},h.prototype.isAsyncRendering=function(){return!1},h.prototype.signalTaskStart=function(t){this.m_widget&&this.m_widget.signalTaskStart("DataSource ContentHandler "+t)},h.prototype.signalTaskEnd=function(){this.m_widget&&this.m_widget.signalTaskEnd()},h.prototype.isSkeletonSupport=function(){return this.m_widget.isSkeletonSupport()},h.prototype.getRootElementHeight=function(){return isNaN(this.m_height)&&(this.m_height=this.m_widget.GetRootElement()[0].offsetHeight),this.m_height},h.prototype.getDefaultSkeletonDimension=function(){if(null==this.m_defaultSkeletonDim){var t=this.m_widget.GetRootElement()[0],e=this.createSkeleton(!0);e.style.display="block",e.style.visibility="hidden",t.appendChild(e);var i={width:e.offsetWidth,height:e.offsetHeight};return t.removeChild(e),i.height>0&&i.width>0&&(this.m_defaultSkeletonDim=i),i}return this.m_defaultSkeletonDim},h.prototype.createSkeleton=function(t){return this.createSkeletonItem()},h.prototype.createSkeletonItem=function(){var t=document.createElement("li"),e=document.createElement("div");return t.className="oj-listview-item oj-listview-item-layout",this.m_widget._isGridlinesVisible()||t.classList.add("gridline-hidden"),e.className="oj-listview-cell-element oj-listview-skeleton oj-listview-skeleton-line-height oj-animation-skeleton",t.appendChild(e),t},h.prototype.animateShowContent=function(t,i,n){return new Promise(function(o,r){var s=null!=this.m_superRoot?this.m_superRoot:this.m_root,l=s.querySelector(".oj-listview-skeleton-container");null!=l?a.fadeOut(l,{duration:"100ms"}).then(function(){if(null!=this.m_widget){var r=l.parentNode;r.classList.contains("oj-listview-initial-skeletons")&&s.removeChild(r),n&&e(t).empty(),t.appendChild(i),t.style.opacity=0,window.requestAnimationFrame((function(){a.fadeIn(t,{duration:"150ms",persist:"all"})})),o(!1)}else o(!1)}.bind(this)):(n&&e(t).empty(),t.appendChild(i),o(!1))}.bind(this))};var m=function t(e,i,n){t.superclass.constructor.call(this,e,i,n)};return t.Object.createSubclass(m,h,"IteratingDataProviderContentHandler"),m.prototype.Init=function(){m.superclass.Init.call(this)},m.prototype.IsHierarchical=function(){return!1},m.prototype.IsReady=function(){return!this.m_fetching&&null==this.m_idleCallback},m.prototype._destroyDomScroller=function(){null!=this.m_domScroller&&(this.m_domScroller.destroy(),this.m_domScroller=null),this._removeLoadingIndicator()},m.prototype.Destroy=function(t){m.superclass.Destroy.call(this,t),this._removeDataSourceEventListeners(),this._destroyDomScroller(),this._cancelIdleCallback(),this.m_loadingIndicator=null,this.m_viewportCheckPromise=null,this.m_checkViewportPromise=null},m.prototype._cancelIdleCallback=function(){null!=this.m_idleCallback&&(window.requestIdleCallback&&window.cancelIdleCallback?(window.cancelIdleCallback(this.m_idleCallback),window.cancelAnimationFrame(this.m_idleCallback)):window.cancelAnimationFrame(this.m_idleCallback),this.m_idleCallback=null)},m.prototype.shouldHandleResize=function(){return this._isLoadMoreOnScroll()},m.prototype.HandleResize=function(t,e){if(this._isLoadMoreOnScroll()){var i=this.m_width,n=this.m_height;this.m_height=e,this.m_width=t,this.m_colCount=void 0;var o=this.isCardLayout();if(o&&this.isSkeletonSupport()&&i!==t)if(null!=this.m_loadingIndicator)this._adjustLoadMoreSkeletons(this._getRootElementWidth(!0));else null!=this.m_root.querySelector(".oj-listview-skeleton-container")&&this.renderInitialSkeletons();(e>n||o&&t>i)&&this.checkViewport()}},m.prototype.notifyShown=function(){this._isLoadMoreOnScroll()&&this.checkViewport()},m.prototype.notifyAttached=function(){var t=this._getFetchTrigger();if(null!=t&&null!=this.m_domScroller){var e=this._getFetchTrigger();t!==e&&this.m_domScroller.setFetchTrigger(e),this.checkViewport()}},m.prototype.setRootAriaProperties=function(){m.superclass.setRootAriaProperties.call(this);var t=this;this.shouldUseGridRole()&&this._isLoadMoreOnScroll()&&this.getDataProvider().getTotalSize().then((function(e){t.m_root&&t.m_root.setAttribute("aria-rowcount",-1===e?t._getMaxCount():e)}))},m.prototype.unsetRootAriaProperties=function(){m.superclass.unsetRootAriaProperties.call(this),this.m_root.removeAttribute("aria-rowcount")},m.prototype._isLoadMoreOnScroll=function(){return this.m_widget.isLoadMoreOnScroll()},m.prototype._getFetchSize=function(){return Math.max(0,this.m_widget.options.scrollPolicyOptions.fetchSize)},m.prototype._getScroller=function(){var t=this.m_widget.options.scrollPolicyOptions.scroller;return null!=t&&e.contains(t,this.m_root)?(void 0===this._fetchTrigger&&(this._fetchTrigger=d.calculateOffsetTop(t,this.m_root)+this._getLoadingIndicatorHeight()),t):this.m_widget.GetRootElement()[0]},m.prototype._getFetchTrigger=function(){return void 0===this._fetchTrigger&&(this._fetchTrigger=this._getLoadingIndicatorHeight()),this._fetchTrigger},m.prototype._getLoadingIndicatorHeight=function(){var t;if(this.isSkeletonSupport())t=this.getDefaultSkeletonDimension().height,this.isCardLayout()||(t*=m.LOAD_MORE_SKELETONS_ROW_COUNT);else{var i=e(document.createElement("div"));i.addClass(this.m_widget.getItemStyleClass()).css({visibility:"hidden",overflow:"hidden",position:"absolute"});var n=e(document.createElement("div"));n.addClass("oj-icon oj-listview-loading-icon"),i.append(n),e(this.m_widget.GetRootElement()).append(i),t=i.get(0).offsetHeight,i.remove()}return t},m.prototype._getMaxCount=function(){return this.m_widget.options.scrollPolicyOptions.maxCount},m.prototype._adjustSkeletonCardContent=function(t,e,i){t.style.width=e+"px",t.style.height=i+"px"},m.prototype._createSkeletonCard=function(){var t=document.createElement("li"),e=document.createElement("div");return t.className="oj-listview-skeleton-card",e.className="oj-listview-skeleton oj-listview-skeleton-card-content oj-animation-skeleton",t.appendChild(e),t},m.prototype.createSkeleton=function(t){var e;if(this.isCardLayout())if(t)void 0===this.m_defaultItemSkeleton&&(this.m_defaultItemSkeleton=this._createSkeletonCard()),e=this.m_defaultItemSkeleton;else{if(void 0===this.m_defaultLoadMoreSkeleton){var i=this._createSkeletonCard(),n=this._getCardDimension();this._adjustSkeletonCardContent(i,n.width,n.height),this.m_defaultLoadMoreSkeleton=i}e=this.m_defaultLoadMoreSkeleton}else void 0===this.m_defaultItemSkeleton&&(this.m_defaultItemSkeleton=this.createSkeletonItem()),e=this.m_defaultItemSkeleton;return e.cloneNode(!0)},m.prototype._getScrollbarWidth=function(){if(isNaN(this.m_scrollbarWidth)){var t=this.m_widget.GetRootElement()[0],e=document.createElement("div");t.appendChild(e),this.m_scrollbarWidth=Math.max(0,l.getDefaultScrollBarWidth(e)),t.removeChild(e)}return this.m_scrollbarWidth},m.prototype._getRootElementWidth=function(t){return isNaN(this.m_width)&&(this.m_width=this.m_widget.GetRootElement()[0].offsetWidth),t?this.m_width-this._getScrollbarWidth():this.m_width},m.prototype.renderInitialSkeletons=function(){this.m_superRoot&&(this.m_root=this.m_superRoot,this.m_superRoot=null),e(this.m_root).empty();var t=this.getRootElementHeight(),i=0,n=this.getDefaultSkeletonDimension();if(n.width>0&&n.height>0)if(this.isCardLayout()){var o=this._getMargin(),r=this._getRootElementWidth(),s=Math.max(1,Math.floor(r/(n.width+o)));i=Math.max(1,Math.floor(t/(n.height+o)))*s}else i=Math.max(1,Math.floor(t/n.height));var l=document.createElement("li");l.setAttribute("role","presentation"),l.classList.add("oj-listview-initial-skeletons");var a=document.createElement("ul");a.setAttribute("role","presentation"),a.className=this.m_widget.getGroupStyleClass()+" oj-listview-skeleton-container";for(var d=0;d<i;d++)a.appendChild(this.createSkeleton(!0));l.appendChild(a),this.m_root.appendChild(l)},m.LOAD_MORE_SKELETONS_ROW_COUNT=3,m.prototype._adjustLoadMoreSkeletons=function(t){var e=this._getMargin();0!==Math.floor(t/(this._getCardDimension().width+e))-this.m_loadingIndicator.get(0).firstElementChild.childElementCount&&(this.m_loadingIndicator.get(0).parentNode.removeChild(this.m_loadingIndicator.get(0)),null!=this.m_fillerSkeletons&&this.m_fillerSkeletons.parentNode.removeChild(this.m_fillerSkeletons),this.m_loadingIndicator=null,this.m_fillerSkeletons=null,this._appendLoadingIndicator())},m.prototype._getMargin=function(){if(void 0===this.m_margin){var t=document.createElement("li");t.className=this.m_widget.getItemStyleClass(),this.m_root.appendChild(t);var e=window.getComputedStyle(t);this.m_margin=parseInt(e.marginRight,10),this.m_root.removeChild(t)}return this.m_margin},m.prototype._getCardDimension=function(){if(void 0===this.m_cardDim){var t=this.m_root.querySelector("."+this.m_widget.getItemElementStyleClass());if(t){var e={width:t.offsetWidth,height:t.offsetHeight};return e.width>0&&e.height>0&&(this.m_cardDim=e),e}}return this.m_cardDim},m.prototype._renderSkeletons=function(t){var e=this.createLoadingIndicator(),i=document.createElement("ul");i.className=this.isCardLayout()?"oj-listview-skeleton-card-group":"oj-listview-group",e.appendChild(i);for(var n=0;n<t;n++)i.appendChild(this.createSkeleton(!1));return e},m.prototype._fillEmptySpaceWithSkeletons=function(){var t=this.m_root.lastElementChild,e=this._getCardDimension().width;if(0!==e){var i=e+this._getMargin(),n=this._getRootElementWidth(!0),o=Math.floor((n-t.offsetLeft-i)/i);if(o>0){var r=this._renderSkeletons(o);this.m_root.appendChild(r),this.m_fillerSkeletons=r}}},m.prototype._createLoadMoreSkeletons=function(){var t;if(this.isCardLayout()){var e=this._getRootElementWidth(!0),i=this._getCardDimension(),n=void 0===i?this.getDefaultSkeletonDimension().width:i.width;t=0===n?0:Math.floor(e/(n+this._getMargin()))}else t=m.LOAD_MORE_SKELETONS_ROW_COUNT;return this._renderSkeletons(t)},m.prototype._createLoadMoreIcon=function(){var t=e(this.createLoadingIndicator());t.uniqueId().attr("role","presentation").addClass(this.m_widget.getItemStyleClass()).addClass("oj-listview-loading-icon-container");var i=e(document.createElement("div"));return i.addClass("oj-icon oj-listview-loading-icon"),t.append(i),t.get(0)},m.prototype.createLoadingIndicator=function(){return document.createElement("li")},m.prototype._appendLoadingIndicator=function(){if(null==this.m_loadingIndicator)if(this.isSkeletonSupport()&&this.isCardLayout()&&0===this._getCardDimension().width){var t=this;n.getContext(this.m_root).getBusyContext().whenReady().then((function(){t._doAppendLoadingIndicator()}))}else this._doAppendLoadingIndicator()},m.prototype._doAppendLoadingIndicator=function(){this.isSkeletonSupport()&&this.isCardLayout()&&this._fillEmptySpaceWithSkeletons();var t=this.isSkeletonSupport()?this._createLoadMoreSkeletons():this._createLoadMoreIcon();this.m_root.appendChild(t),this.m_loadingIndicator=e(t)},m.prototype._removeLoadingIndicator=function(){null!=this.m_loadingIndicator&&this.m_loadingIndicator.remove(),this.m_loadingIndicator=null,null!=this.m_fillerSkeletons&&this.m_fillerSkeletons.remove(),this.m_fillerSkeletons=null},m.prototype.hasMoreToFetch=function(){return null!=this.m_loadingIndicator},m.prototype.afterRenderItem=function(t,i,n){m.superclass.afterRenderItem.call(this,t,i,n),e(t).addClass(this.m_widget.getItemStyleClass()),!n&&this.m_widget.getItemLayoutStyleClass&&t.classList.add(this.m_widget.getItemLayoutStyleClass()),this.isSelectionEnabled()&&this.isSelectable(i)&&this.m_widget.getFocusItem(e(t)).attr("aria-selected",!1),this._isLoadMoreOnScroll()&&e(t).attr("aria-rowindex",i.index+1),this.m_widget.itemRenderComplete(t,i)},m.prototype._handleScrollerMaxRowCount=function(){s.error("max count reached")},m.prototype._prepareRootElement=function(){this.m_superRoot?(e(this.m_superRoot).empty(),this.m_root=this.m_superRoot,this.m_superRoot=null):null==this.m_root.querySelector(".oj-listview-skeleton-container")&&e(this.m_root).empty();if(this.shouldUseGridRole()&&this.isCardLayout()){var t=document.createElement("li");t.classList.add("oj-listview-group-container");var i=document.createElement("ul");t.appendChild(i),e(t).attr("role","presentation").css("width","100%"),e(i).attr("role","row").addClass(this.m_widget.getGroupStyleClass()),this.m_root.appendChild(t),this.m_superRoot=this.m_root,this.m_root=i}},m.prototype._setFetching=function(t){(null==this.m_superRoot?this.m_root:this.m_superRoot).setAttribute("aria-busy",t),this.m_fetching=t},m.prototype.fetchRows=function(e){var i=0;if(this.signalTaskStart("fetching rows"),this.IsReady()){var n=this;this._setFetching(!0),m.superclass.fetchRows.call(this,e);var o=this.loadTemplateEngine();this.signalTaskStart("first fetch"),this._clientId=this._clientId||Symbol();var r={clientId:this._clientId};r.size=this._isLoadMoreOnScroll()?this._getFetchSize():-1,this.m_dataProviderAsyncIterator=this.getDataProvider().fetchFirst(r)[Symbol.asyncIterator]();var s=this.m_dataProviderAsyncIterator.next();n.fetchSize=r.size;return Promise.all([s,o]).then((function(t){return function t(e){return e[0].done||-1!==n.fetchSize||"function"==typeof n.getDataProvider().getPageCount?e:n.m_dataProviderAsyncIterator.next().then((function(i){return e[0].done=i.done,e[0].value.data=e[0].value.data.concat(i.value.data),e[0].value.metadata=e[0].value.metadata.concat(i.value.metadata),t(e)}),(function(t){n._handleFetchError(t),n.signalTaskEnd()}))}(t)}),(function(t){n._handleFetchError(t),n.signalTaskEnd()})).then((function(e){if(n.m_fetching){if(null==n.m_widget)return;var o=e[0],r=e[1],s=n.getDataProvider();t.TableDataSourceAdapter&&s instanceof t.TableDataSourceAdapter&&(i=s.offset),0===i&&(r&&n.cleanItems(r),n.isSkeletonSupport()&&n.m_widget.hideStatusText(),n._prepareRootElement()),n._handleFetchedData(o,r,0===i)}}),(function(t){n._handleFetchError(t),n.signalTaskEnd()})),void this.signalTaskEnd()}this.signalTaskEnd()},m.prototype._handleFetchError=function(t){s.error(t),this._setFetching(!1),null!=this.m_widget?(this._isLoadMoreOnScroll()&&this._removeLoadingIndicator(),this.m_widget.renderComplete()):s.info("handleFetchError: widget has already been destroyed")},m.prototype._renderItemsWhenIdle=function(t,e,i,n,o,r){var s=this;function l(l){window.requestAnimationFrame((function(){null!=s.m_widget&&s.m_root.appendChild(l),s._renderItemsWhenIdle(t,e,i,n,o,r)}))}0!==t.length&&0!==e.length?!o&&window.requestIdleCallback&&window.cancelIdleCallback?this.m_idleCallback=window.requestIdleCallback((function(o){for(var a=o.timeRemaining(),d=0,h=document.createDocumentFragment();a>d&&0!==t.length&&0!==e.length;){var m=t.shift(),c=null!=r?r.shift():null,u=e.shift();s.addItem(h,-1,m,s.getMetadata(i,u,m),n,null,c),i+=1,d=a-o.timeRemaining(),a=o.timeRemaining()}l(h)})):this.m_idleCallback=window.requestAnimationFrame((function(){var o=document.createDocumentFragment(),a=t.shift(),d=null!=r?r.shift():null,h=e.shift();s.addItem(o,-1,a,s.getMetadata(i,h,a),n,null,d),i+=1,l(o)})):window.requestAnimationFrame((function(){s.m_idleCallback&&(s._appendLoadingIndicator(),s.afterItemsInserted(),s.signalTaskEnd()),s.m_idleCallback=null}))},m.prototype._isOverflow=function(){return this._isLoadMoreOnScroll()&&this.m_domScroller&&this.m_domScroller.isOverflow()},m.prototype._handleFetchSuccess=function(t,e,i,n,o,r,s){if(null==this.m_widget)return Promise.resolve(!0);var l=this.m_root.childElementCount;if(l>0&&!i&&this._isOverflow()&&null==this.m_widget.m_scrollPosition){this.signalTaskStart("render items during idle time");var a=null!=r?r.slice(0):null;return this._renderItemsWhenIdle(t.slice(0),e.slice(0),l,n,o,a),Promise.resolve(!0)}for(var d=document.createDocumentFragment(),h=0;h<t.length;h++){var m=t[h];this.addItem(d,-1,m,this.getMetadata(l,e[h],m),n,null,null!=r?r[h]:null),l+=1}return this.animateShowContent(this.m_root,d,s)},m.prototype.handleDomScrollerFetchedData=function(t){null!=t?(this.signalTaskStart("handle results from DomScroller"),this._removeLoadingIndicator(),this.IsReady()&&this.signalTaskStart("dummy task"),this._handleFetchedData(t,this.getTemplateEngine(),!1),t.value&&t.value.data&&this.m_widget.updateStatusFetchEnd(t.value.data.length),this.m_widget.m_scrollHeight=null,this.signalTaskEnd(),this.signalTaskEnd()):(this._removeLoadingIndicator(),this.signalTaskEnd())},m.prototype._registerDomScroller=function(){var t=this,e={fetchSize:this._getFetchSize(),fetchTrigger:this._getFetchTrigger(),maxCount:this._getMaxCount(),asyncIterator:this.m_dataProviderAsyncIterator,initialRowCount:this.m_root.childElementCount,success:function(e){t.handleDomScrollerFetchedData(e),null!=t.m_root&&null!=e.value||(t.signalTaskEnd(),null!=t.m_root&&t.m_widget.renderComplete())},error:this.signalTaskEnd.bind(this),localKeyValidator:function(e){return!!t.m_widget&&null!=t.m_widget.FindElementByKey(e)},beforeFetch:function(){return t.handleBeforeFetch(),t.m_viewportCheckPromise=null,null==t.m_idleCallback&&(t.m_widget.updateStatusFetchStart(),t.signalTaskStart("starts high-water mark scrolling"),!0)}};this.m_domScroller=new d(this._getScroller(),this.getDataProvider(),e)},m.prototype.handleBeforeFetch=function(){},m.prototype._clearEventQueue=function(){null!=this.m_eventQueue&&(this.m_eventQueue.length=0)},m.prototype._getIndex=function(t,i){if(null==t||0===t.length||i>=t.length)return-1;var n=t[i],o=this.FindElementByKey(n);return null!=o?e(this.m_root).children().index(o):-1},m.prototype.GetReferenceNode=function(t,e){var i=m.superclass.GetReferenceNode.call(this,t,e);return null==i&&null!=this.m_loadingIndicator?this.m_loadingIndicator.get(0):i},m.prototype._getMaxIndexForInsert=function(){var t=Number.MAX_VALUE;return this._isLoadMoreOnScroll()&&this.hasMoreToFetch()&&(t=e(this.m_root).children("li."+this.m_widget.getItemElementStyleClass()).length),t},m.prototype.addItemsForModelInsert=function(t,e,i,n,o,r,s){for(var l=this._getMaxIndexForInsert(),a=this.getTemplateEngine(),d=0,h=0;h<t.length;h++){var m;this.signalTaskStart("handling model add event for item: "+i[h]),null!=e?m=e[h]:(m=this._getIndex(r,h))>-1?m=o?m:m+1:this._isLoadMoreOnScroll()&&this.hasMoreToFetch()&&(m=l),m<l&&(this.addItem(this.m_root,m,t[h],this.getMetadata(m,i[h],t[h]),a,this.afterRenderItemForInsertEvent.bind(this),null!=s?s[h]:null),d+=1),this.signalTaskEnd()}if(t.length>0&&0===d&&this.m_widget._isEmpty()){var c=document.createElement("li");c.classList.add("oj-listview-temp-item"),c.style.display="none",this.m_root.appendChild(c)}this.IsReady()&&this.signalTaskStart("dummy task"),this.fetchEnd(!1,!0)},m.prototype.handleModelRemoveEvent=function(t){m.superclass.handleModelRemoveEvent.call(this,t),null==this.m_root.querySelector("li."+this.m_widget.getItemElementStyleClass())&&this.m_loadingIndicator&&(this.m_loadingIndicator.get(0).style.display="none")},m.prototype.handleModelRefreshEvent=function(t){null!=this.m_root&&(this._cancelIdleCallback(),this.IsReady()?(this.signalTaskStart("handling model reset event"),this._clearEventQueue(),this.m_widget.ClearCache(!0),this._destroyDomScroller(),this.m_widget.adjustScrollPositionValueOnRefresh&&this.m_widget.adjustScrollPositionValueOnRefresh(),this.m_widget.resetFocusBeforeRefresh(),this.fetchRows(!0),this.signalTaskEnd()):this._pushToEventQueue({type:t.type,event:t}))},m.prototype._handleFetchedData=function(t,e,i){if(null!=this.m_root&&null!=t.value){var n=t.value.data,o=t.value.metadata.map((function(t){return t.key})),r=t.value.metadata;n.length===o.length&&this._handleFetchSuccess(n,o,t.done||t.maxCountLimit,e,t.isMouseWheel,r,i).then(function(e){if(null!=this.m_widget){var i=null!=o&&0===o.length;this._isLoadMoreOnScroll()&&(t.done||(i&&s.info("handleFetchedData: zero data returned while done flag is false"),e||t.maxCountLimit||(null==this.m_domScroller&&(this._registerDomScroller(),this.getRootElementHeight()),i&&!this.m_domScroller.isOverflow()||this._appendLoadingIndicator()))),t.maxCountLimit&&this._handleScrollerMaxRowCount(),this.fetchEnd(e,!i||!t.done),this.disableAllTabbableElements()}}.bind(this))}},m.prototype.disableAllTabbableElements=function(){var t=this.m_root.childElementCount;this.m_root.lastElementChild&&"presentation"===this.m_root.lastElementChild.getAttribute("role")&&(t-=1);var e=this;n.getContext(this.m_root).getBusyContext().whenReady().then((function(){if(null!=e.m_root)for(var i=e.m_root.children,n=t;n<i.length;n++)e.m_widget.disableAllTabbableElements(i[n])}))},m.prototype.afterItemsInserted=function(t){if(this.m_widget&&(this.m_widget.renderComplete(),this._processEventQueue(),t))if(this.m_widget.ojContext._IsCustomElement()){var e=this,i=n.getContext(e.m_root).getBusyContext().whenReady();i.then((function(){null!=e.m_viewportCheckPromise&&e.checkViewport()})),e.m_viewportCheckPromise=i}else this.checkViewport()},m.prototype.afterItemsRemoved=function(){this.m_widget&&this.checkViewport()},m.prototype.fetchEnd=function(t,e){this._setFetching(!1),t||this.afterItemsInserted(e),this.signalTaskEnd()},m.prototype._checkHorizontalViewport=function(){if(this.isCardLayout()){for(var t,e=this.m_root.children,i=this.m_widget.getItemElementStyleClass(),n=e.length-1;n>=0;n--)if(e[n].classList.contains(i)){t=e[n];break}if(t){var o=this._getScroller(),r=o===this.m_root?this.getRootElementHeight():o.offsetHeight,s=o.scrollTop,l=t.offsetTop;if(l>s&&l<s+r)return this.m_domScroller._fetchMoreRows()}}return null},m.prototype.checkViewport=function(){var t,e=this;return this.m_checkViewportPromise?null:(this.signalTaskStart("checking viewport"),null!=this.m_domScroller&&this.IsReady()&&(null!=(t=this.m_domScroller.checkViewport())&&(this.signalTaskStart("got promise from checking viewport"),t.then((function(i){null!=e.m_widget&&(null!=i?(e.m_checkViewportPromise=null,e.handleDomScrollerFetchedData(i)):null!=(t=e._checkHorizontalViewport())?(e.signalTaskStart("got promise from checking horizontal viewport"),t.then((function(t){e.m_checkViewportPromise=null,null!=e.m_widget&&null!=t&&e.handleDomScrollerFetchedData(t),e.signalTaskEnd()}),null)):e.m_checkViewportPromise=null,e.signalTaskEnd())}),null)),this.m_checkViewportPromise=t),this.signalTaskEnd(),t)},{DataProviderContentHandler:h,IteratingDataProviderContentHandler:m}}));