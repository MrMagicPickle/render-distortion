import React, { forwardRef, useMemo } from 'react'
import { Uniform } from 'three'
import { Effect } from 'postprocessing'

const fragmentShader = /* glsl */`
  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    // Normalizing the uv
    vec2 centeredUv = 2.*uv - vec2(1.);

    // Adding random distortions to the uv
    vec2 p = centeredUv + 0.1 * cos(2.* centeredUv.yx + time);
    p += 0.1 * cos(2.7 * p.yx + 1.4 *time + vec2(1.3, 4.3));
    p += 0.3 * cos(3.7 * p.yx + 2.6 *time + vec2(0.3, 3.2));
    p += 0.5 * cos(4.1 * p.yx + 1.7 *time + vec2(2.1, 0.2));

    // inputBuffer is built-in that references the sampler2D of the render view.
    outputColor = texture2D(inputBuffer, uv);
    outputColor = texture2D(inputBuffer, vec2(length(p)));
  }`


let _uParam

// Effect implementation
class MyCustomEffectImpl extends Effect {
  constructor({ param = 0.1 } = {}) {
    super('MyCustomEffect', fragmentShader, {
      uniforms: new Map([['param', new Uniform(param)]])
    })

    _uParam = param
  }

  update(renderer, inputBuffer, deltaTime) {
    this.uniforms.get('param').value = _uParam
  }
}

// Effect component
export const MyCustomEffect = forwardRef(({ param }, ref) => {
  const effect = useMemo(() => new MyCustomEffectImpl(param), [param])
  return <primitive ref={ref} object={effect} />
})
