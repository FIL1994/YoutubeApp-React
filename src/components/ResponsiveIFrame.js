/**
 * @author Philip Van Raalte
 * @date 2017-12-13
 */
import React from 'react';

export default (props) => {
  return(
    <div className="iframe-container">
      <iframe
        frameBorder={0}
        gesture="media"
        allow="encrypted-media"
        allowFullScreen="true"
        {...props}
      />
    </div>
  );
}