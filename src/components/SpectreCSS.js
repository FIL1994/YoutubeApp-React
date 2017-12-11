/** @license GPL-3.0
 * SpectreCSS.js
 *
 * @author: Philip Van Raalte
 * @date November 8, 2017
 *
 * Functional components for the Spectre CSS library.
 */
import React from 'react';
import _ from 'lodash';

/**
 * Prepends the className from props to the component default className.
 * @param {String} defaultClass The default class for the component.
 * @param {String} newClass The class name to prepend to the default class. (So the default class will override it)
 * @returns {String} JSX Component
 */
function addClass(defaultClass, newClass) {
  return `${_.isString(newClass) ? newClass : ''} ${defaultClass}`.trim();
}

/**
 * A simple button.
 * @param {Object} props Properties for the component.
 * @returns {XML} JSX Component
 * @constructor
 */
let Button = (props) => {
  const {small, large, block, primary} = props;
  let className = "btn";

  // allow size to be passed as a string or a number
  if(!_.isEmpty(props.size) || _.isNumber(props.size)) {
    className = `${className} col-${props.size.toString().trim()}`;
  }

  if(large) {
    className = addClass(className, "btn-lg");
  } else if(small) {
    className = addClass(className, "btn-sm");
  }

  if(block) {
    className = addClass(className, "btn-block");
  }

  if(primary) {
    className = addClass(className, "btn-primary");
  }

  // add the className prop to the className
  className = addClass(className, props.className);

  // remove unnecessary props
  let myProps = _.omit(props, ['small', 'large', 'block', 'primary']);

  return <button {...myProps} className={className}/>;
};

Button.defaultProps = {
  type: "button"
};

export {Button};

/**
 * A divider for separating elements.
 * @param {Object} props Properties for the component.
 * @returns {XML} JSX Component
 * @constructor
 */
export const Divider = (props) => {
  // add the className prop to the className
  let className = addClass("divider", props.className);

  // allow size to be passed as a string or a number
  if(!_.isEmpty(props.size) || _.isNumber(props.size)) {
    className = addClass(className, `col-${props.size.toString().trim()} centered`);
  }

  return <div {...props} className={className}/>;
};

/**
 * A loading indicator.
 * @param {Object} props Properties for the component.
 * @returns {XML} JSX Component
 * @constructor
 */
export const Loading = (props) => {
  const {large} = props;
  let className = "loading";

  if(large) {
    className = addClass(className, "loading-lg");
  }

  // add the className prop to the className
  className = addClass(className, props.className);

  // remove unnecessary props
  let myProps = _.omit(props, ['large']);

  return <div {...myProps} className={className}/>;
};

/**
 * A page for containing elements.
 * @param {Object} props Properties for the component.
 * @returns {XML} JSX Component
 * @constructor
 */
export const Page = (props) => {
  // add the className prop to the className
  let className = addClass("page container", props.className);

  return <div {...props} className={className}/>;
};

/**
 * A hover parallax effect.
 * @param {Object} props Properties for the component.
 * @returns {XML} JSX Component
 * @constructor
 */
export const Parallax = (props) => {
  const {children, title, topLeft, topRight, bottomLeft, bottomRight} = props;

  // add the className prop to the className
  let className = addClass("parallax", props.className);

  // remove unnecessary props
  let myProps = _.omit(props, ['children', 'title', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight']);

  return (
    <div {...myProps} className={className}>
      <div className="parallax-top-left" onClick={topLeft}/>
      <div className="parallax-top-right" onClick={topRight}/>
      <div className="parallax-bottom-left" onClick={bottomLeft}/>
      <div className="parallax-bottom-right" onClick={bottomRight}/>
      <div className="parallax-content">
        <div className="parallax-front">
          <h2>{title}</h2>
        </div>
        <div className="parallax-back">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * A flexible view container with an auto-expand content section.
 * @param {Object} props Properties for the component.
 * @returns {XML} JSX Component
 * @constructor
 */
export const Panel = (props) => {
  const {children, title, footer} = props;

  // add the className prop to the className
  let className = addClass("panel", props.className);

  // remove unnecessary props
  let myProps = _.omit(props, ['children', 'title', 'footer']);

  return (
    <div {...myProps} className={className}>
      <div className="panel-header">
        <div className="panel-title">
          <h5>{title}</h5>
        </div>
      </div>
      <div className="panel-body">
        {children}
      </div>
      <div className="panel-footer">
        {footer}
      </div>
    </div>
  );
};

/**
 * A placeholder for first time use, empty data and error screens.
 * @param {Object} props Properties for the component.
 * @returns {XML} JSX Component
 * @constructor
 */
export const EmptyState = (props) => {
  const {children, title} = props;

  // add the className prop to the className
  let className = addClass("empty", props.className);

  // remove unnecessary props
  let myProps = _.omit(props, ['children', 'title']);

  return(
    <div {...myProps} className={className}>
      <div className="empty-title h5">{title}</div>
      <div className="empty-action">
        {children}
      </div>
    </div>
  );
};