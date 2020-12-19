import * as $ from '//unpkg.com/three@0.123.0/build/three.module.js'
import { OrbitControls } from '//unpkg.com/three@0.123.0/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from '//unpkg.com/three@0.123.0/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from '//unpkg.com/three@0.123.0/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from '//unpkg.com/three@0.123.0/examples/jsm/postprocessing/UnrealBloomPass'

// ----
// Boot
// ----
const renderer = new $.WebGLRenderer({ antialias: true });
const scene = new $.Scene();
const camera = new $.PerspectiveCamera(75, 2, .01, 1000);
const controls = new OrbitControls(camera, renderer.domElement);
const composer = new EffectComposer(renderer);
const bufSize = new $.Vector2();
window.addEventListener('resize', () => {
    const { clientWidth, clientHeight } = renderer.domElement;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    composer.setPixelRatio(window.devicePixelRatio);
    composer.setSize(clientWidth, clientHeight);
    renderer.getDrawingBufferSize(bufSize);
});
document.body.prepend(renderer.domElement);
window.dispatchEvent(new Event('resize'));
renderer.setAnimationLoop((t) => {
    composer.render();
    controls.update();
    animate(t);
});

// ----
// Main
// ----

$.ShaderChunk.my_map_fragment = `
#ifdef USE_MAP
    float t = t * 0.001;
    vec4 texelColor = vec4(vec3(0.4), 1.0);   // def color

    float R = length(res / min(res.x, res.y));   // r of circum cir.
    float angle = fract(t);
    float prevRadius = fract(floor(t) * sw) * R;
    float radius = (prevRadius / R + sw) * R;

    vec2 pq = vUv * 2.0 - 1.0;   // center
    pq.x = pq.x * (res.x / res.y);   // ratio
    float an = fract((PI2 + atan(pq.y, pq.x)) / PI2); // angle 0..1

    float k = 1.0 - (0.5 + 0.5 * sin(an * PI2));   // mirror
    if (length(pq) < prevRadius) {   // fill
        texelColor = vec4(k, 0.0, 0.5, 1.0);
    } else if (an < angle && length(pq) < radius) {   // stroke
        texelColor = vec4(k * radius, fract(t), 1.0, 1.0);
    }

    texelColor = mapTexelToLinear(texelColor);
    diffuseColor *= texelColor;
#endif
`;

camera.position.set(1, 1, 1);
scene.background = new $.Color('#888');
const RES = new $.Vector2(1, 1); // ratio
const geom = new $.SphereBufferGeometry(1, 100, 100);
const matB = new $.ShaderMaterial({
    uniforms: $.UniformsUtils.merge([ // deep clone
        $.ShaderLib.basic.uniforms,
        { t: 0, res: { value: RES }, sw: { value: 0.08 } } // sw=stroke width
    ]),
    vertexShader: $.ShaderLib.basic.vertexShader,
    fragmentShader: `
    uniform float t;
    uniform vec2 res;
    uniform float sw;
    ` + $.ShaderLib.basic.fragmentShader.replace(
        '#include <map_fragment>',
        '#include <my_map_fragment>'
    ),
});
matB.map = matB.uniforms.map.value = new $.Texture();
scene.add(new $.Mesh(geom, matB));

//// Pp

const renderPass = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(bufSize, 0.4, 0.5, 0.3);
composer.addPass(renderPass);
composer.addPass(bloomPass);

//// Anim

function animate(t /*sec*/) {
    matB.uniforms.t.value = t;
}
