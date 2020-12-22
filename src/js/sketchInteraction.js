import * as THREE from 'three'
import { isMobile } from 'mobile-device-detect'

const sketchInteraction = ( event, mouse, canvasWidth, canvasHeight, mesh, radius ) => {

  const width = canvasWidth;
  const height = canvasHeight;

  event.preventDefault();

  const mouseX = isMobile ? event.pageX : event.clientX;
  const mouseY = isMobile ? event.pageY : event.clientY;

  const canvas_x = ( mouseX / window.innerWidth ) * 2 - 1;
  const canvas_y = - ( mouseY / window.innerHeight ) * 2 + 1;
  if(document.body.clientWidth > document.body.clientHeight) {
    mouse.x = canvas_x;
    mouse.y = window.innerHeight * canvas_y / height;
  } else {
    mouse.x = window.innerWidth * canvas_x / width;
    mouse.y = canvas_y;
  }

  const geometry = mesh.geometry;

  for ( let i = 0, il = geometry.faces.length; i < il; i ++ ) {
    const face = geometry.faces[ i ];
  
    if ( face instanceof THREE.Face3 ) {
    
      const a = geometry.vertices[face.a];
      const b = geometry.vertices[face.b];
      const c = geometry.vertices[face.c];
      const vList = [a, b, c];
    
      if(!a.origXSet) {
        a.origX = a.x;
        a.origY = a.y;
        a.distance = Math.random() * radius + 0;
        a.travel = Math.random() * (radius + 0.2);
      }

      const vect = a;
      const dx = (a.origX - mouse.x), dy = (vect.origY - mouse.y);
      const dist = Math.sqrt( dx*dx + dy*dy);

      if(dist < a.distance) {
        for ( let j = 0, jl = vList.length; j < jl; j ++ ) {
          const v = vList[j];
          if(!v.origXSet) {
              v.origX = v.x;
              v.origY = v.y;
              v.origXSet = true;
          }
          const len = Math.sqrt(dx*dx + dy*dy);
          if(len===0) return;
          const ndx = dx / len,
              ndy = dy / len;
          v.x = v.origX + ndx * a.travel;
          v.y = v.origY + ndy * a.travel; 
        };
      } else {
        vList.forEach(function(v) {
          if(v.origXSet) {
            v.x = v.origX;
            v.y = v.origY;   
          }
        });
      }
    }
  }
  geometry.verticesNeedUpdate = true;
  geometry.normalsNeedUpdate = true;    

}

export default sketchInteraction