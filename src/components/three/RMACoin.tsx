"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

export default function RMACoin() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ─── Renderer ─────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // ─── Scene / Camera ───────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000812, 0.18);

    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 0.3, 6.5);

    // ─── Procedural HDRI env (studio cyberpunk) ───────────────
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    const envSphere = new THREE.Mesh(
      new THREE.SphereGeometry(50, 64, 32),
      new THREE.MeshBasicMaterial({ side: THREE.BackSide, vertexColors: true })
    );
    const envPos = envSphere.geometry.attributes.position as THREE.BufferAttribute;
    const envColors: number[] = [];
    for (let i = 0; i < envPos.count; i++) {
      const y = envPos.getY(i) / 50; // -1 to 1
      const x = envPos.getX(i) / 50;
      // Top: slightly warm bright studio
      if (y > 0.5) { envColors.push(1.8, 1.7, 1.5); }
      // Side top cyan key
      else if (y > 0.1 && x > 0.3) { envColors.push(0.0, 0.7, 1.4); }
      // Side opposite purple fill
      else if (y > 0.1 && x < -0.3) { envColors.push(0.5, 0.0, 1.0); }
      // Horizon mid
      else if (y > -0.1) { envColors.push(0.05, 0.1, 0.25); }
      // Floor: very dark
      else { envColors.push(0.01, 0.01, 0.03); }
    }
    envSphere.geometry.setAttribute("color", new THREE.Float32BufferAttribute(envColors, 3));
    envScene.add(envSphere);
    const envMap = pmrem.fromScene(envScene).texture;
    scene.environment = envMap;

    // ─── Reflective floor ─────────────────────────────────────
    const floorGeo = new THREE.PlaneGeometry(20, 20);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x000510,
      metalness: 0.9,
      roughness: 0.35,
      envMap,
      envMapIntensity: 0.6,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.4;
    floor.receiveShadow = true;
    scene.add(floor);

    // ─── Build coin face textures ─────────────────────────────
    const makeFaceTex = (isFront: boolean): THREE.CanvasTexture => {
      const S = 1024;
      const cv = document.createElement("canvas");
      cv.width = S; cv.height = S;
      const ctx = cv.getContext("2d")!;

      // Deep gunmetal base
      const bg = ctx.createRadialGradient(S/2, S/2, 0, S/2, S/2, S/2);
      bg.addColorStop(0,   "#1c2a3a");
      bg.addColorStop(0.4, "#111e2e");
      bg.addColorStop(0.8, "#0a1220");
      bg.addColorStop(1,   "#040810");
      ctx.beginPath();
      ctx.arc(S/2, S/2, S/2, 0, Math.PI * 2);
      ctx.fillStyle = bg;
      ctx.fill();
      ctx.clip();

      // Micro-scratch noise overlay
      for (let i = 0; i < 600; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * S * 0.45;
        const x1 = S/2 + Math.cos(a) * r;
        const y1 = S/2 + Math.sin(a) * r;
        const len = Math.random() * 30 + 5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + Math.cos(a + 0.2) * len, y1 + Math.sin(a + 0.2) * len);
        ctx.strokeStyle = `rgba(180,220,255,${Math.random() * 0.04})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Engraved concentric rings
      for (let r = 460; r > 80; r -= 22) {
        ctx.beginPath();
        ctx.arc(S/2, S/2, r, 0, Math.PI * 2);
        const alpha = 0.05 + (460 - r) / 460 * 0.1;
        ctx.strokeStyle = `rgba(0,200,255,${alpha})`;
        ctx.lineWidth = r > 400 ? 2 : 1;
        ctx.stroke();
      }

      if (isFront) {
        // ── Circuit board traces ──────────────────────────────
        const drawCircuit = (startR: number, endR: number, angleOffset: number, segments: number) => {
          for (let i = 0; i < segments; i++) {
            const a = angleOffset + (i / segments) * Math.PI * 2;
            const a2 = a + (Math.PI * 2) / segments * 0.4;
            const x1 = S/2 + Math.cos(a) * startR;
            const y1 = S/2 + Math.sin(a) * startR;
            const xM = S/2 + Math.cos(a) * ((startR + endR) / 2);
            const yM = S/2 + Math.sin(a) * ((startR + endR) / 2);
            const x2 = S/2 + Math.cos(a2) * endR;
            const y2 = S/2 + Math.sin(a2) * endR;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(xM, yM);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = "rgba(0,220,255,0.18)";
            ctx.lineWidth = 1.5;
            ctx.stroke();
            // Circuit node dot
            ctx.beginPath();
            ctx.arc(xM, yM, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0,220,255,0.35)";
            ctx.fill();
          }
        };
        drawCircuit(360, 290, 0.2, 12);
        drawCircuit(270, 210, 0.8, 10);
        drawCircuit(195, 140, 1.2, 8);

        // Radial spoke lines
        for (let i = 0; i < 24; i++) {
          const a = (i / 24) * Math.PI * 2;
          ctx.beginPath();
          ctx.moveTo(S/2 + Math.cos(a) * 135, S/2 + Math.sin(a) * 135);
          ctx.lineTo(S/2 + Math.cos(a) * 380, S/2 + Math.sin(a) * 380);
          ctx.strokeStyle = i % 3 === 0 ? "rgba(0,200,255,0.12)" : "rgba(0,150,200,0.06)";
          ctx.lineWidth = i % 3 === 0 ? 1.5 : 0.5;
          ctx.stroke();
        }

        // Outer text ring "DECENTRALIZED • SECURE • FUTURE"
        ctx.save();
        ctx.font = "bold 26px 'Arial', monospace";
        ctx.fillStyle = "rgba(0,200,255,0.5)";
        ctx.shadowColor = "#00d4ff";
        ctx.shadowBlur = 8;
        const text = "DECENTRALIZED  •  SECURE  •  FUTURE  •  ";
        const charCount = text.length;
        const radius = 430;
        for (let i = 0; i < charCount; i++) {
          const angle = (i / charCount) * Math.PI * 2 - Math.PI / 2;
          ctx.save();
          ctx.translate(S/2 + Math.cos(angle) * radius, S/2 + Math.sin(angle) * radius);
          ctx.rotate(angle + Math.PI / 2);
          ctx.fillText(text[i], 0, 0);
          ctx.restore();
        }
        ctx.restore();
        ctx.shadowBlur = 0;

        // ── Central RMA emblem ────────────────────────────────
        // Hexagon backdrop
        ctx.save();
        ctx.translate(S/2, S/2);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
          const x = Math.cos(a) * 100;
          const y = Math.sin(a) * 100;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        const hexGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 100);
        hexGrad.addColorStop(0, "rgba(0,180,255,0.15)");
        hexGrad.addColorStop(1, "rgba(0,80,180,0.05)");
        ctx.fillStyle = hexGrad;
        ctx.fill();
        ctx.strokeStyle = "rgba(0,220,255,0.6)";
        ctx.lineWidth = 2;
        ctx.shadowColor = "#00d4ff";
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.restore();
        ctx.shadowBlur = 0;

        // RMA — multi-pass glow render
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Outer diffuse glow
        for (let blur = 40; blur >= 0; blur -= 8) {
          ctx.font = `900 180px 'Arial Black', Impact, sans-serif`;
          ctx.fillStyle = blur > 0 ? `rgba(0,200,255,${0.03 + (40 - blur) * 0.002})` : "rgba(180,230,255,0.95)";
          ctx.shadowColor = "#00d4ff";
          ctx.shadowBlur = blur;
          ctx.fillText("RMA", S/2, S/2 - 20);
        }

        // "PROTOCOL" subtitle
        ctx.font = "bold 46px 'Arial', monospace";
        ctx.fillStyle = "rgba(0,255,220,0.75)";
        ctx.shadowColor = "#00ffea";
        ctx.shadowBlur = 18;
        ctx.letterSpacing = "8px";
        ctx.fillText("PROTOCOL", S/2, S/2 + 105);

        ctx.restore();
        ctx.shadowBlur = 0;

        // Holographic gloss sweep
        const sweep = ctx.createLinearGradient(100, 100, 924, 924);
        sweep.addColorStop(0,   "rgba(0,0,0,0)");
        sweep.addColorStop(0.35,"rgba(0,180,255,0.04)");
        sweep.addColorStop(0.5, "rgba(255,255,255,0.08)");
        sweep.addColorStop(0.65,"rgba(180,0,255,0.04)");
        sweep.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(S/2, S/2, S/2, 0, Math.PI * 2);
        ctx.fillStyle = sweep;
        ctx.fill();

      } else {
        // ── Back face: abstract circuit grid ─────────────────
        for (let i = 0; i < 20; i++) {
          const y = 80 + i * 44;
          ctx.beginPath();
          ctx.moveTo(80, y);
          ctx.lineTo(S - 80, y);
          ctx.strokeStyle = "rgba(0,150,220,0.08)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        for (let i = 0; i < 20; i++) {
          const x = 80 + i * 44;
          ctx.beginPath();
          ctx.moveTo(x, 80);
          ctx.lineTo(x, S - 80);
          ctx.strokeStyle = "rgba(0,150,220,0.08)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        // Center hex mono
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "900 160px 'Arial Black', monospace";
        ctx.fillStyle = "rgba(0,180,255,0.18)";
        ctx.shadowColor = "#00d4ff";
        ctx.shadowBlur = 30;
        ctx.fillText("RMA", S/2, S/2);
        ctx.shadowBlur = 0;
        ctx.font = "bold 36px monospace";
        ctx.fillStyle = "rgba(0,200,255,0.3)";
        ctx.fillText("ERC-20 · 2025", S/2, S/2 + 120);
      }

      return new THREE.CanvasTexture(cv);
    };

    // ─── Emissive map — glowing cyan lines ────────────────────
    const makeEmissiveTex = (): THREE.CanvasTexture => {
      const S = 1024;
      const cv = document.createElement("canvas");
      cv.width = S; cv.height = S;
      const ctx = cv.getContext("2d")!;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, S, S);

      // Outer ring glow
      ctx.beginPath();
      ctx.arc(S/2, S/2, 480, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,220,255,0.9)";
      ctx.lineWidth = 5;
      ctx.stroke();

      // Inner ring
      ctx.beginPath();
      ctx.arc(S/2, S/2, 455, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(100,0,255,0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Circuit trace glows
      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2;
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.moveTo(S/2 + Math.cos(a) * 140, S/2 + Math.sin(a) * 140);
          ctx.lineTo(S/2 + Math.cos(a) * 370, S/2 + Math.sin(a) * 370);
          ctx.strokeStyle = "rgba(0,200,255,0.3)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // RMA letters emissive
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "900 180px 'Arial Black', Impact, sans-serif";
      ctx.fillStyle = "rgba(0,180,255,0.6)";
      ctx.shadowColor = "#00d4ff";
      ctx.shadowBlur = 20;
      ctx.fillText("RMA", S/2, S/2 - 20);
      ctx.shadowBlur = 0;

      return new THREE.CanvasTexture(cv);
    };

    // ─── Normal map for surface detail ────────────────────────
    const makeNormalTex = (): THREE.CanvasTexture => {
      const S = 512;
      const cv = document.createElement("canvas");
      cv.width = S; cv.height = S;
      const ctx = cv.getContext("2d")!;
      // Flat normal base (128,128,255)
      ctx.fillStyle = "#8080ff";
      ctx.fillRect(0, 0, S, S);
      // Ring grooves
      for (let r = 230; r > 40; r -= 11) {
        ctx.beginPath();
        ctx.arc(S/2, S/2, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(80,80,255,0.5)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(S/2, S/2, r - 1, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(180,180,255,0.5)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      return new THREE.CanvasTexture(cv);
    };

    // ─── Edge roughness/metalness texture ─────────────────────
    const makeRoughnessTex = (): THREE.CanvasTexture => {
      const S = 512;
      const cv = document.createElement("canvas");
      cv.width = S; cv.height = S;
      const ctx = cv.getContext("2d")!;
      ctx.fillStyle = "#141414"; // mostly smooth
      ctx.fillRect(0, 0, S, S);
      for (let r = 240; r > 30; r -= 11) {
        ctx.beginPath();
        ctx.arc(S/2, S/2, r, 0, Math.PI * 2);
        ctx.strokeStyle = "#252525";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      return new THREE.CanvasTexture(cv);
    };

    // ─── Coin geometry ─────────────────────────────────────────
    const coinGeo = new THREE.CylinderGeometry(1.55, 1.55, 0.14, 128, 1, false);

    const frontTex   = makeFaceTex(true);
    const backTex    = makeFaceTex(false);
    const emissiveTex = makeEmissiveTex();
    const normalTex  = makeNormalTex();
    const roughTex   = makeRoughnessTex();

    // Side / edge material — gunmetal ridged
    const edgeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x1a2a35),
      metalness: 1.0,
      roughness: 0.25,
      envMap,
      envMapIntensity: 3.0,
      emissive: new THREE.Color(0x003366),
      emissiveIntensity: 0.3,
    });

    const faceMat = (map: THREE.CanvasTexture, isF: boolean) => new THREE.MeshPhysicalMaterial({
      map,
      normalMap: normalTex,
      normalScale: new THREE.Vector2(0.6, 0.6),
      roughnessMap: roughTex,
      metalness: 0.95,
      roughness: 0.12,
      envMap,
      envMapIntensity: 2.8,
      emissiveMap: isF ? emissiveTex : undefined,
      emissive: isF ? new THREE.Color(0x00ccff) : new THREE.Color(0x001133),
      emissiveIntensity: isF ? 0.35 : 0.1,
      color: new THREE.Color(0x8ab0cc),
    });

    const coin = new THREE.Mesh(coinGeo, [
      edgeMat,
      faceMat(frontTex, true),   // top face
      faceMat(backTex, false),   // bottom face
    ]);
    coin.rotation.x = Math.PI / 2;
    coin.castShadow = true;
    scene.add(coin);

    // Bevel torus on edge
    const bevelGeo = new THREE.TorusGeometry(1.55, 0.07, 32, 128);
    const bevelMesh = new THREE.Mesh(bevelGeo, edgeMat);
    bevelMesh.rotation.x = Math.PI / 2;
    scene.add(bevelMesh);

    // ─── Edge glow lines (mechanical ridges with cyan emission) ──
    const ridgeGeo = new THREE.TorusGeometry(1.56, 0.002, 4, 128);
    const ridgeMat = new THREE.MeshBasicMaterial({ color: 0x00ddff });
    for (let i = -3; i <= 3; i++) {
      const ridge = new THREE.Mesh(ridgeGeo, ridgeMat);
      ridge.rotation.x = Math.PI / 2;
      ridge.position.z = i * 0.018;
      scene.add(ridge);
    }

    // ─── Holographic dust particles ───────────────────────────
    const dustCount = 400;
    const dustPos  = new Float32Array(dustCount * 3);
    const dustCol  = new Float32Array(dustCount * 3);
    const dustData = new Float32Array(dustCount * 3); // theta, radius, vertSpd

    for (let i = 0; i < dustCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 1.9 + Math.random() * 2.2;
      const y = (Math.random() - 0.5) * 1.2;
      dustPos[i*3]   = Math.cos(theta) * r;
      dustPos[i*3+1] = y;
      dustPos[i*3+2] = Math.sin(theta) * r;
      const cyan = Math.random() > 0.5;
      dustCol[i*3]   = cyan ? 0.0 : 0.5;
      dustCol[i*3+1] = cyan ? 0.8 : 0.0;
      dustCol[i*3+2] = 1.0;
      dustData[i*3]   = theta;
      dustData[i*3+1] = r;
      dustData[i*3+2] = (Math.random() - 0.5) * 0.004;
    }

    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    dustGeo.setAttribute("color",    new THREE.BufferAttribute(dustCol, 3));
    const dustMat = new THREE.PointsMaterial({
      size: 0.022, vertexColors: true,
      transparent: true, opacity: 0.65,
      sizeAttenuation: true,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // ─── Lighting ─────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x050a15, 1.0));

    // Top key light — cool white
    const key = new THREE.DirectionalLight(0xe8f0ff, 4.5);
    key.position.set(-2, 5, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);

    // Cyan rim light
    const rim1 = new THREE.DirectionalLight(0x00ccff, 5.0);
    rim1.position.set(4, 1, -3);
    scene.add(rim1);

    // Purple fill
    const fill = new THREE.DirectionalLight(0x7700ff, 2.5);
    fill.position.set(-4, -1, 2);
    scene.add(fill);

    // Front glow point
    const frontGlow = new THREE.PointLight(0x00aaff, 3.0, 8);
    frontGlow.position.set(0, 0, 4);
    scene.add(frontGlow);

    // Floor bounce
    const bounce = new THREE.PointLight(0x002244, 1.5, 6);
    bounce.position.set(0, -3, 1);
    scene.add(bounce);

    // ─── Post-processing (Bloom) ──────────────────────────────
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(W, H),
      0.9,   // strength
      0.5,   // radius
      0.72   // threshold
    );
    composer.addPass(bloom);
    composer.addPass(new OutputPass());

    // ─── Mouse tracking ───────────────────────────────────────
    let mouseNX = 0, mouseNY = 0; // normalized -1 to 1
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseNX =  ((e.clientX - rect.left)  / rect.width  - 0.5) * 2;
      mouseNY = -((e.clientY - rect.top)   / rect.height - 0.5) * 2;
    };
    const onTouchMove = (e: TouchEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseNX =  ((e.touches[0].clientX - rect.left) / rect.width  - 0.5) * 2;
      mouseNY = -((e.touches[0].clientY - rect.top)  / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // ─── Drag spin ────────────────────────────────────────────
    let isDragging = false;
    let prevDX = 0, velDX = 0, velDY = 0;
    let manualRotY = 0, manualRotX = 0;
    let lastDragTime = 0;

    const onDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      prevDX = "touches" in e ? e.touches[0].clientX : e.clientX;
      velDX = velDY = 0;
    };
    const onDrag = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const cx = "touches" in e ? e.touches[0].clientX : e.clientX;
      const cy = "touches" in e ? e.touches[0].clientY : e.clientY;
      const dx = cx - prevDX;
      velDX = dx * 0.022;
      velDY = 0;
      manualRotY += velDX;
      prevDX = cx;
      lastDragTime = Date.now();
    };
    const onUp = () => { isDragging = false; };

    renderer.domElement.addEventListener("mousedown",  onDown);
    renderer.domElement.addEventListener("touchstart", onDown);
    window.addEventListener("mousemove",  onDrag);
    window.addEventListener("touchmove",  onDrag, { passive: true });
    window.addEventListener("mouseup",    onUp);
    window.addEventListener("touchend",   onUp);
    renderer.domElement.style.cursor = "grab";
    renderer.domElement.addEventListener("mousedown", () => { renderer.domElement.style.cursor = "grabbing"; });
    renderer.domElement.addEventListener("mouseup",   () => { renderer.domElement.style.cursor = "grab"; });

    // ─── Glitch state ─────────────────────────────────────────
    let glitchTimer = 0;
    let isGlitching = false;

    // ─── Animate ──────────────────────────────────────────────
    let raf: number;
    const clock = new THREE.Clock();
    let t = 0;

    // Lerp targets
    let smoothRotY  = 0;
    let smoothRotX  = 0;
    let pendulumAmt = 0; // pendulum swing accumulator

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      t += dt;

      // Inertia decay on manual spin
      if (!isDragging) {
        velDX *= 0.93;
        manualRotY += velDX;
      }

      // Pendulum: oscillate X ±12°
      pendulumAmt = Math.sin(t * 0.6) * 0.21;

      // Mouse influence (damped)
      const targetY = manualRotY + mouseNX * 0.3;
      const targetX = (Math.PI / 2) + pendulumAmt + mouseNY * 0.15;

      smoothRotY += (targetY - smoothRotY) * 0.04;
      smoothRotX += (targetX - smoothRotX) * 0.04;

      coin.rotation.y = smoothRotY;
      coin.rotation.x = smoothRotX;
      bevelMesh.rotation.y = smoothRotY;
      bevelMesh.rotation.x = smoothRotX;

      // Ridge lines follow coin
      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.TorusGeometry
          && (child.geometry as THREE.TorusGeometry).parameters.tube === 0.002) {
          child.rotation.y = smoothRotY;
          child.rotation.x = smoothRotX;
        }
      });

      // Idle bob
      const bobY = Math.sin(t * 0.9) * 0.1;
      coin.position.y     = bobY;
      bevelMesh.position.y = bobY;
      dust.position.y     = bobY;

      // Orbit lights for shimmer
      rim1.position.x  = Math.cos(t * 0.5) * 5;
      rim1.position.z  = Math.sin(t * 0.5) * 3;
      fill.position.x  = Math.cos(t * 0.4 + 2) * 4;
      fill.position.z  = Math.sin(t * 0.4 + 2) * 3;
      frontGlow.position.x = Math.sin(t * 0.7) * 0.5;
      frontGlow.position.y = bobY + Math.cos(t * 0.3) * 0.3;

      // Glitch emissive flicker
      glitchTimer -= dt;
      if (glitchTimer <= 0) {
        glitchTimer = 2.5 + Math.random() * 5;
        isGlitching = true;
        setTimeout(() => { isGlitching = false; }, 80 + Math.random() * 120);
      }
      const emInt = isGlitching
        ? 0.5 + Math.random() * 0.8
        : 0.35 + Math.sin(t * 1.2) * 0.05;

      const frontM = coin.material as THREE.MeshPhysicalMaterial[];
      if (frontM[1]) (frontM[1] as THREE.MeshPhysicalMaterial).emissiveIntensity = emInt;

      // Edge glow pulse
      if (edgeMat) edgeMat.emissiveIntensity = 0.2 + Math.sin(t * 1.5) * 0.12;

      // Animate dust particles
      const pos = dustGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < dustCount; i++) {
        dustData[i*3]   += dustData[i*3+2] + 0.0008;
        const r    = dustData[i*3+1];
        const theta = dustData[i*3];
        pos.setXYZ(
          i,
          Math.cos(theta) * r,
          pos.getY(i) + Math.sin(t + i) * 0.0005,
          Math.sin(theta) * r
        );
      }
      pos.needsUpdate = true;

      // Bloom strength pulse
      bloom.strength = 0.85 + Math.sin(t * 0.8) * 0.1;

      composer.render();
    };
    animate();

    // ─── Resize ───────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mousemove", onDrag);
      window.removeEventListener("mouseup",   onUp);
      window.removeEventListener("touchend",  onUp);
      window.removeEventListener("resize",    onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      composer.dispose();
      pmrem.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ touchAction: "none" }}
    />
  );
}
