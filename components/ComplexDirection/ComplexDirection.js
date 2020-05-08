import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';

import { PatchEvent, set, unset, setIfMissing } from 'part:@sanity/form-builder/patch-event';

const createPatchEvent = value => PatchEvent.from(set(value));

export const ComplexDirection = ({ onChange, value = [] }) => {
  
  return (
    <div className="direction_complex">
      <textarea rows={ 20 } cols={ 40 } value={ JSON.stringify( value, null, 2 ) } onChange={ e => onChange( createPatchEvent( JSON.parse( e.target.value ) ) ) } />
    </div>
  )
}