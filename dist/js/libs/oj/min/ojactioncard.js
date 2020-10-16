define(["exports","ojs/ojvcomponent","ojs/ojdomutils"],(function(t,e,o){"use strict";
/**
     * @license
     * Copyright (c) 2014, 2020, Oracle and/or its affiliates.
     * The Universal Permissive License (UPL), Version 1.0
     * as shown at https://oss.oracle.com/licenses/upl/
     * @ignore
     */var n=function(t,e,o,n){var i,a=arguments.length,s=a<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(t,e,o,n);else for(var r=t.length-1;r>=0;r--)(i=t[r])&&(s=(a<3?i(s):a>3?i(e,o,s):i(e,o))||s);return a>3&&s&&Object.defineProperty(e,o,s),s};t.ActionCard=class extends e.VComponent{constructor(t){super(t),this.state={active:!1,focus:!1},this._rootElemRef=t=>{this._rootElem=t}}render(){var t;const n={"oj-actioncard":!0,"oj-active":this.state.active,"oj-focus-highlight":this.state.focus&&!o.recentPointer()},i=null!==(t=this.props.tabIndex)&&void 0!==t?t:0;return e.h("oj-action-card",{tabIndex:i,class:n,role:"button",onKeyup:this._handleKeyup,onMouseup:this._handleMouseup,onKeydown:this._handleKeydown,onMousedown:this._handleMousedown,onMousemove:this._handleMousemove,onTouchstart:this._handleTouchstart,onTouchend:this._handleTouchend,onTouchcancel:this._handleTouchcancel,onTouchmove:this._handleTouchmove,onFocusin:this._handleFocusin,onFocusout:this._handleFocusout,onOjAction:this._handleOjAction,ref:this._rootElemRef},this.props.children)}_isFromActiveSource(t){let e=t.target;if(e===this._rootElem)return!1;for(;e!=this._rootElem;){if(e.hasAttribute("data-oj-clickthrough")&&"disabled"===e.getAttribute("data-oj-clickthrough"))return!0;e=e.parentNode}return!1}_handleOjAction(t){this._isFromActiveSource(t)&&t.stopPropagation()}_handleTouchstart(t){this._isFromActiveSource(t)||this.updateState({active:!0})}_handleTouchend(t){var e,o;this._isFromActiveSource(t)||this.state.active&&(this.updateState({active:!1}),t.preventDefault(),t.stopPropagation(),null===(o=(e=this.props).onOjAction)||void 0===o||o.call(e,{originalEvent:t}))}_handleTouchcancel(t){this._isFromActiveSource(t)||this.updateState({active:!1})}_handleTouchmove(t){this.state.active&&(this._isFromActiveSource(t)||this.updateState({active:!1}))}_handleKeydown(t){this._isFromActiveSource(t)||t.repeat||"Enter"!==t.key&&" "!==t.key||this.updateState({active:!0})}_handleKeyup(t){var e,o;this._isFromActiveSource(t)||"Enter"!==t.key&&" "!==t.key||(t.preventDefault(),t.stopPropagation(),this.updateState({active:!1}),null===(o=(e=this.props).onOjAction)||void 0===o||o.call(e,{originalEvent:t}))}_handleMousedown(t){this._isFromActiveSource(t)||this.updateState({active:!0})}_handleMouseup(t){var e,o;this._isFromActiveSource(t)||this.state.active&&(t.preventDefault(),t.stopPropagation(),this.updateState({active:!1}),null===(o=(e=this.props).onOjAction)||void 0===o||o.call(e,{originalEvent:t}))}_handleMousemove(t){this.state.active&&(this._isFromActiveSource(t)||this.updateState({active:!1}))}_handleFocusin(t){this.updateState({focus:!0})}_handleFocusout(t){this.updateState({focus:!1})}},t.ActionCard.metadata={extension:{_DEFAULTS:class{},_ROOT_PROPS_MAP:{tabIndex:!0,role:!0}},slots:{"":{}},events:{ojAction:{bubbles:!0}}},n([e.listener({passive:!1})],t.ActionCard.prototype,"_handleOjAction",null),n([e.listener({passive:!0})],t.ActionCard.prototype,"_handleTouchstart",null),n([e.listener({passive:!1})],t.ActionCard.prototype,"_handleTouchend",null),n([e.listener({passive:!0})],t.ActionCard.prototype,"_handleTouchcancel",null),n([e.listener({passive:!0})],t.ActionCard.prototype,"_handleTouchmove",null),n([e.listener({passive:!0})],t.ActionCard.prototype,"_handleKeydown",null),n([e.listener({passive:!1})],t.ActionCard.prototype,"_handleKeyup",null),n([e.listener({passive:!0})],t.ActionCard.prototype,"_handleMousedown",null),n([e.listener({passive:!1})],t.ActionCard.prototype,"_handleMouseup",null),n([e.listener({passive:!0})],t.ActionCard.prototype,"_handleMousemove",null),n([e.listener()],t.ActionCard.prototype,"_handleFocusin",null),n([e.listener()],t.ActionCard.prototype,"_handleFocusout",null),t.ActionCard=n([e.customElement("oj-action-card")],t.ActionCard),Object.defineProperty(t,"__esModule",{value:!0})}));