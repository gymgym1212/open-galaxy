/**
 * This component renders a huge steering wheel, which denotes we are in the
 * steering mode (camera follows mouse cursor).
 */
import appEvents from './service/appEvents.js';
import React from 'react';

module.exports = require('maco')(steeringIndicator, React);

function steeringIndicator(x) {
  var showSteeringMode = false;
  appEvents.showSteeringMode.on(updateSteering);

  x.render = function () {
    if (!showSteeringMode) return null;

    return (
      <div className='steering'>
        <div className='inner'></div>
        <div className="steering-help">按下 Space 键关闭领航模式</div>
      </div>
    );
  };

  function updateSteering(isVisible) {
    showSteeringMode = isVisible;
    x.forceUpdate();
  }
}
