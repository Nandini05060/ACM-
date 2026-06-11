"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Point2D {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
  phase: number;
}

interface LightBeam {
  startX: number; // percentage of canvas width (0 to 1)
  angle: number;  // radians
  width: number;
  speed: number;
  phase: number;
  color: string;
}

export default function RotatingDiamond() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, isOver: false, targetX: 0, targetY: 0 });
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.resetTransform();
        ctx.scale(dpr, dpr);
      }
      
      setDimensions({ width: rect.width, height: rect.height });
    };

    // Initial resize
    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    // 3D Diamond Settings
    const size = 110;
    const thickness = 15;
    const cameraDistance = 600;

    // 3D local coordinates of the extruded diamond
    const vertices: Point3D[] = [
      // Front face vertices (z = +thickness)
      { x: 0, y: -size, z: thickness },  // 0: Top
      { x: size, y: 0, z: thickness },   // 1: Right
      { x: 0, y: size, z: thickness },   // 2: Bottom
      { x: -size, y: 0, z: thickness },  // 3: Left

      // Back face vertices (z = -thickness)
      { x: 0, y: -size, z: -thickness }, // 4: Top
      { x: size, y: 0, z: -thickness },  // 5: Right
      { x: 0, y: size, z: -thickness },  // 6: Bottom
      { x: -size, y: 0, z: -thickness }, // 7: Left
    ];

    // Local basis vectors for front face (origin is 0,0,thickness)
    const O_front: Point3D = { x: 0, y: 0, z: thickness };
    const U_front: Point3D = { x: 1, y: 0, z: 0 }; // Right vector
    const V_front: Point3D = { x: 0, y: 1, z: 0 }; // Down vector

    // Local basis vectors for back face (origin is 0,0,-thickness)
    const O_back: Point3D = { x: 0, y: 0, z: -thickness };
    const U_back: Point3D = { x: -1, y: 0, z: 0 }; // Mirrored Right vector to align correct reading direction
    const V_back: Point3D = { x: 0, y: 1, z: 0 };

    // Setup volumetric light beams
    const lightBeams: LightBeam[] = [
      {
        startX: 0.25,
        angle: 0.15,
        width: 140,
        speed: 0.005,
        phase: 0,
        color: "rgba(0, 229, 255, 0.06)", // Teal
      },
      {
        startX: 0.5,
        angle: -0.05,
        width: 200,
        speed: 0.003,
        phase: Math.PI / 3,
        color: "rgba(139, 92, 246, 0.08)", // Purple
      },
      {
        startX: 0.75,
        angle: -0.2,
        width: 160,
        speed: 0.004,
        phase: Math.PI * 1.2,
        color: "rgba(20, 241, 149, 0.04)", // Emerald
      },
    ];

    // Setup ambient floating particles
    const particles: Particle[] = [];
    const particleCount = 35;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.5, // Float upwards
        radius: 1 + Math.random() * 2,
        color: Math.random() > 0.5 ? "#00E5FF" : Math.random() > 0.3 ? "#8B5CF6" : "#14F195",
        alpha: 0.1 + Math.random() * 0.5,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Main lighting parameters
    const defaultLightSource = { x: 0.4, y: -0.8, z: 0.8 }; // Directional light from top-right-front

    // Helper: Rotate point in 3D space
    const rotate3D = (p: Point3D, angleX: number, angleY: number, angleZ: number): Point3D => {
      // Rotate around Y-axis
      let cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      let x1 = p.x * cosY - p.z * sinY;
      let y1 = p.y;
      let z1 = p.x * sinY + p.z * cosY;

      // Rotate around X-axis (tilt)
      let cosX = Math.cos(angleX), sinX = Math.sin(angleX);
      let x2 = x1;
      let y2 = y1 * cosX - z1 * sinX;
      let z2 = y1 * sinX + z1 * cosX;

      // Rotate around Z-axis (slight roll)
      let cosZ = Math.cos(angleZ), sinZ = Math.sin(angleZ);
      let x3 = x2 * cosZ - y2 * sinZ;
      let y3 = x2 * sinZ + y2 * cosZ;
      let z3 = z2;

      return { x: x3, y: y3, z: z3 };
    };

    // Helper: Project 3D point to 2D screen space
    const project = (p: Point3D, width: number, height: number): Point2D & { z: number } => {
      const scale = cameraDistance / (cameraDistance + p.z);
      return {
        x: width / 2 + p.x * scale,
        y: height / 2 + p.y * scale,
        z: p.z,
      };
    };

    // Render loop
    const render = () => {
      const width = canvasRef.current?.getBoundingClientRect().width || dimensions.width;
      const height = canvasRef.current?.getBoundingClientRect().height || dimensions.height;

      // Clear with radial cosmic gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      bgGrad.addColorStop(0, "#080b18");
      bgGrad.addColorStop(0.5, "#04060f");
      bgGrad.addColorStop(1, "#020307");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      time += 0.006;

      // Update light source position based on mouse coordinate (lerp for smoothness)
      const mouse = mouseRef.current;
      if (mouse.isOver) {
        // Interpolate target position
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      } else {
        // Return to center when mouse leaves
        mouse.x += (width / 2 - mouse.x) * 0.05;
        mouse.y += (height / 2 - mouse.y) * 0.05;
      }

      // Compute interactive lighting vector
      const dx = (mouse.x - width / 2) / (width / 2);
      const dy = (mouse.y - height / 2) / (height / 2);
      
      const lightX = defaultLightSource.x + dx * 0.6;
      const lightY = defaultLightSource.y + dy * 0.6;
      const lightZ = defaultLightSource.z;
      const lightLen = Math.sqrt(lightX * lightX + lightY * lightY + lightZ * lightZ);
      const lx = lightX / lightLen;
      const ly = lightY / lightLen;
      const lz = lightZ / lightLen;

      // Draw background light shafts
      lightBeams.forEach((beam) => {
        beam.phase += beam.speed;
        const currentAngle = beam.angle + Math.sin(beam.phase) * 0.05;
        const startX = beam.startX * width + Math.cos(beam.phase * 0.7) * 40;

        ctx.save();
        const beamGrad = ctx.createLinearGradient(startX, 0, startX + Math.tan(currentAngle) * height, height);
        beamGrad.addColorStop(0, beam.color);
        beamGrad.addColorStop(0.4, beam.color.replace("0.08", "0.04").replace("0.06", "0.03").replace("0.04", "0.02"));
        beamGrad.addColorStop(1, "rgba(3, 7, 18, 0)");

        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(startX - beam.width / 2, 0);
        ctx.lineTo(startX + beam.width / 2, 0);
        ctx.lineTo(startX + Math.tan(currentAngle) * height + beam.width * 1.5, height);
        ctx.lineTo(startX + Math.tan(currentAngle) * height - beam.width * 1.5, height);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      // Update and Draw floating particles
      particles.forEach((p) => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(time + p.phase) * 0.15;
        p.phase += p.pulseSpeed;

        // Reset particle if off top or sides
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10 || p.x > width + 10) {
          p.x = Math.random() * width;
        }

        // Particle Glow
        const currentAlpha = p.alpha * (0.6 + Math.sin(p.phase) * 0.4);
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Compute current 3D rotations
      // Continuous spin around Y, rocking on X, slight wiggle on Z
      const angleY = time * 1.2;
      const angleX = -0.15 + Math.sin(time * 0.3) * 0.12; 
      const angleZ = Math.cos(time * 0.2) * 0.05;

      // Rotate and project all vertices
      const rotatedVerts = vertices.map((v) => rotate3D(v, angleX, angleY, angleZ));
      const projectedVerts = rotatedVerts.map((v) => project(v, width, height));

      // Define Faces
      // Indices map to the vertices list (0-3: Front, 4-7: Back)
      // Winding order is counter-clockwise looking from inside the shape outwards (which is clockwise looking at it)
      const faces = [
        {
          name: "front",
          indices: [0, 1, 2, 3],
          centroid: O_front,
          uBasis: U_front,
          vBasis: V_front,
          draw: (centroidZ: number, norm: Point3D) => {
            drawBrandFace(true, centroidZ, norm);
          }
        },
        {
          name: "back",
          indices: [4, 7, 6, 5], // Reverse order to point normal in -Z
          centroid: O_back,
          uBasis: U_back,
          vBasis: V_back,
          draw: (centroidZ: number, norm: Point3D) => {
            drawBrandFace(false, centroidZ, norm);
          }
        },
        { name: "side0", indices: [0, 4, 5, 1], draw: (centroidZ: number, norm: Point3D) => drawSideFace(0, 4, 5, 1, norm) },
        { name: "side1", indices: [1, 5, 6, 2], draw: (centroidZ: number, norm: Point3D) => drawSideFace(1, 5, 6, 2, norm) },
        { name: "side2", indices: [2, 6, 7, 3], draw: (centroidZ: number, norm: Point3D) => drawSideFace(2, 6, 7, 3, norm) },
        { name: "side3", indices: [3, 7, 4, 0], draw: (centroidZ: number, norm: Point3D) => drawSideFace(3, 7, 4, 0, norm) },
      ];

      // Rotate face centroids for depth sorting and normal computing
      const facesWithDepth = faces.map((face) => {
        let centroidRotated: Point3D;
        let norm: Point3D;

        if (face.name === "front" || face.name === "back") {
          centroidRotated = rotate3D(face.centroid!, angleX, angleY, angleZ);
          
          // Calculate exact normal for front/back faces
          const baseNormal = face.name === "front" ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 };
          norm = rotate3D(baseNormal, angleX, angleY, angleZ);
        } else {
          // Side faces - calculate centroid of their 4 vertices
          const faceVerts = face.indices.map(idx => vertices[idx]);
          const cx = faceVerts.reduce((sum, v) => sum + v.x, 0) / 4;
          const cy = faceVerts.reduce((sum, v) => sum + v.y, 0) / 4;
          const cz = faceVerts.reduce((sum, v) => sum + v.z, 0) / 4;
          centroidRotated = rotate3D({ x: cx, y: cy, z: cz }, angleX, angleY, angleZ);

          // Calculate normal for side face via cross product
          const vA = rotate3D(faceVerts[0], angleX, angleY, angleZ);
          const vB = rotate3D(faceVerts[1], angleX, angleY, angleZ);
          const vC = rotate3D(faceVerts[2], angleX, angleY, angleZ);
          
          const ab = { x: vB.x - vA.x, y: vB.y - vA.y, z: vB.z - vA.z };
          const ac = { x: vC.x - vA.x, y: vC.y - vA.y, z: vC.z - vA.z };
          
          const nx = ab.y * ac.z - ab.z * ac.y;
          const ny = ab.z * ac.x - ab.x * ac.z;
          const nz = ab.x * ac.y - ab.y * ac.x;
          
          const len = Math.sqrt(nx*nx + ny*ny + nz*nz);
          norm = { x: nx/len, y: ny/len, z: nz/len };
        }

        return {
          ...face,
          centroidZ: centroidRotated.z,
          normal: norm,
        };
      });

      // Painter's Algorithm: Sort faces by depth (Z coordinate) - smallest Z is furthest away, drawn first
      facesWithDepth.sort((a, b) => a.centroidZ - b.centroidZ);

      // Draw side face helper
      const drawSideFace = (i0: number, i1: number, i2: number, i3: number, norm: Point3D) => {
        // Back-face culling for side panels
        if (norm.z < 0) return;

        // Lighting calculation
        const dot = norm.x * lx + norm.y * ly + norm.z * lz;
        const diffuse = Math.max(0.15, (dot + 1) / 2); // Half-Lambert shading
        
        ctx.beginPath();
        ctx.moveTo(projectedVerts[i0].x, projectedVerts[i0].y);
        ctx.lineTo(projectedVerts[i1].x, projectedVerts[i1].y);
        ctx.lineTo(projectedVerts[i2].x, projectedVerts[i2].y);
        ctx.lineTo(projectedVerts[i3].x, projectedVerts[i3].y);
        ctx.closePath();

        // Shaded side color (deep metallic steel blue base)
        const baseR = 30, baseG = 58, baseB = 98;
        ctx.fillStyle = `rgb(${Math.floor(baseR * diffuse)}, ${Math.floor(baseG * diffuse)}, ${Math.floor(baseB * diffuse)})`;
        ctx.fill();

        // Subtle side panel highlighting borders
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + 0.1 * diffuse})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      };

      // Draw high-fidelity branded face helper (front/back)
      const drawBrandFace = (isFront: boolean, centroidZ: number, norm: Point3D) => {
        // Back-face culling: only draw if normal points towards screen
        if (norm.z < 0) return;

        // Lighting calculation
        const dot = norm.x * lx + norm.y * ly + norm.z * lz;
        const diffuse = Math.max(0.18, (dot + 1.1) / 2.1); // Bright and smooth diffuse

        // Specular highlight: Halfway vector approximation
        // View vector is straight down Z-axis: V = (0, 0, 1)
        // R = 2 * (N . L) * N - L
        const rx = 2 * dot * norm.x - lx;
        const ry = 2 * dot * norm.y - ly;
        const rz = 2 * dot * norm.z - lz;
        const spec = Math.pow(Math.max(0, rz), 18) * 0.75;

        // Compute local affine transform matrix relative to origin O
        const face = isFront ? faces[0] : faces[1];
        
        const O_rot = rotate3D(face.centroid!, angleX, angleY, angleZ);
        const U_rot = rotate3D({
          x: face.centroid!.x + face.uBasis!.x,
          y: face.centroid!.y + face.uBasis!.y,
          z: face.centroid!.z + face.uBasis!.z,
        }, angleX, angleY, angleZ);
        const V_rot = rotate3D({
          x: face.centroid!.x + face.vBasis!.x,
          y: face.centroid!.y + face.vBasis!.y,
          z: face.centroid!.z + face.vBasis!.z,
        }, angleX, angleY, angleZ);

        const O_proj = project(O_rot, width, height);
        const U_proj = project(U_rot, width, height);
        const V_proj = project(V_rot, width, height);

        const dx_u = U_proj.x - O_proj.x;
        const dy_u = U_proj.y - O_proj.y;
        const dx_v = V_proj.x - O_proj.x;
        const dy_v = V_proj.y - O_proj.y;

        ctx.save();
        // Set affine matrix mapping local coordinates directly to the projected face
        ctx.transform(dx_u, dy_u, dx_v, dy_v, O_proj.x, O_proj.y);

        // Draw Diamond base path
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size, 0);
        ctx.closePath();

        // 1. Base Fill: Steel Blue gradient
        const shapeGrad = ctx.createLinearGradient(-size, -size, size, size);
        shapeGrad.addColorStop(0, "#7fa4dc");
        shapeGrad.addColorStop(0.5, "#527bb5");
        shapeGrad.addColorStop(1, "#2e4a77");
        ctx.fillStyle = shapeGrad;
        ctx.fill();

        // 2. Inner Circle with white border
        const circleRadius = size * 0.64;
        const borderThickness = 6;

        ctx.beginPath();
        ctx.arc(0, 0, circleRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Inner Circle content: Blue gradient
        ctx.beginPath();
        ctx.arc(0, 0, circleRadius - borderThickness, 0, Math.PI * 2);
        const circleGrad = ctx.createLinearGradient(-circleRadius, -circleRadius, circleRadius, circleRadius);
        circleGrad.addColorStop(0, "#2a75cd");
        circleGrad.addColorStop(0.5, "#154f91");
        circleGrad.addColorStop(1, "#092d59");
        ctx.fillStyle = circleGrad;
        ctx.fill();

        // 3. Draw white lowercase text "acm" in center
        ctx.font = "bold 56px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        
        // Let's add text shadow/glow locally
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        ctx.fillText("acm", 0, -2); // Offset slightly upward for optical centering
        ctx.shadowBlur = 0; // Reset shadow

        // 4. SHADING OVERLAYS
        // Draw Shadow: overlay black on areas facing away from light
        ctx.globalCompositeOperation = "source-atop"; // Clip shading overlays strictly inside the face boundary
        ctx.fillStyle = `rgba(0, 3, 15, ${Math.max(0, 0.72 - diffuse)})`;
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size, 0);
        ctx.closePath();
        ctx.fill();

        // 5. Specular Highlights / Light Sweep (Glint)
        // We draw a sweeping white gradient band that moves across the diamond over time
        const sweepPhase = (time * 1.5) % (size * 4) - size * 2;
        const glintGrad = ctx.createLinearGradient(sweepPhase - 40, -size, sweepPhase + 40, size);
        glintGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
        glintGrad.addColorStop(0.5, `rgba(255, 255, 255, ${0.12 * diffuse})`); // Sweep brightness scales with diffuse
        glintGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = glintGrad;
        ctx.fillRect(-size, -size, size * 2, size * 2);

        // Spotlights Highlight: overlay white based on specular lighting
        ctx.fillStyle = `rgba(255, 255, 255, ${spec})`;
        ctx.fillRect(-size, -size, size * 2, size * 2);
        
        ctx.restore(); // Restore transforms

        // Draw Outer Frame/Outline for crispness (outside local transforms to avoid thickness scaling)
        const polyIdxs = face.indices;
        ctx.beginPath();
        ctx.moveTo(projectedVerts[polyIdxs[0]].x, projectedVerts[polyIdxs[0]].y);
        ctx.lineTo(projectedVerts[polyIdxs[1]].x, projectedVerts[polyIdxs[1]].y);
        ctx.lineTo(projectedVerts[polyIdxs[2]].x, projectedVerts[polyIdxs[2]].y);
        ctx.lineTo(projectedVerts[polyIdxs[3]].x, projectedVerts[polyIdxs[3]].y);
        ctx.closePath();
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 + spec * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Soft Outer Glow: Add screen-blend subtle radial aura behind the diamond
        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        const auraGrad = ctx.createRadialGradient(O_proj.x, O_proj.y, 40, O_proj.x, O_proj.y, size * 1.7);
        // Aura color matches glow theme (violet/teal blend)
        const auraAlpha = 0.15 * diffuse;
        auraGrad.addColorStop(0, `rgba(0, 229, 255, ${auraAlpha})`);
        auraGrad.addColorStop(0.5, `rgba(139, 92, 246, ${auraAlpha * 0.5})`);
        auraGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(O_proj.x, O_proj.y, size * 1.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };

      // Draw all faces sorted by Painter's Algorithm
      facesWithDepth.forEach((f) => {
        f.draw(f.centroidZ, f.normal);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    // Initialize animation loop
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current.targetX = x;
    mouseRef.current.targetY = y;
    mouseRef.current.isOver = true;
  };

  const handleMouseEnter = () => {
    mouseRef.current.isOver = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.isOver = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-[350px] w-full items-center justify-center overflow-hidden rounded-[2.5rem] bg-[#030712]/10 border border-white/5 shadow-2xl glass backdrop-blur-md sm:h-[450px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic glow backdrops */}
      <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/10 blur-[80px] mix-blend-screen pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-teal/10 blur-[60px] mix-blend-screen pointer-events-none" style={{ animation: "pulse-ring 4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite" }} />
      
      <canvas
        ref={canvasRef}
        className="block h-full w-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
