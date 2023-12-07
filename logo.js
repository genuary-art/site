// Genuary 2023 logo code, Copyright by Piter Pasma

// debug/logging functions
let start_time,max_fails;
log_start=()=>{
  start_time = performance.now();
  max_fails = 0;
  console.log(`log start (${Math.round(start_time*1000)/1000}ms)`);
  console.table(O);
}
log_trace=(fails)=>{
  if (fails > max_fails) {
    max_fails = fails;
    console.log(`max_fails = ${max_fails}`);
  }
}
log_end=()=>{
  elapserd = performance.now() - start_time;
  let key = location.pathname;
  let log;
  if (localStorage[key]) {
    log = localStorage[key].split(',');
  } else {
    log = [];
  }
  dd=new Date();
  time=`${dd.getHours()}:${(dd.getMinutes()+'').padStart(2,'0')}.${(dd.getSeconds()+'').padStart(2,'0')}`;
  log.push(`[${time}] ${(elapserd/1000).toFixed(2)}s / ${v.length} paths / ${(Npts/1000)|0}K pts / seed=${seed}`); 
  log = log.slice(-9);
  localStorage[key]=log; N = log.length;
  log.reverse();
  console.log(`log .. key=${key}`);
  console.log(log.map((s,i)=>`${N-i} .. ${s}`).join('\n'));
}

// the actual code
(code=({copyright:piterpasma,max,floor,abs,sin,cos,min,imul,PI}=Math)=>{
  // RAYHATCHER (c) 2022 by Piter Pasma
  //
  // commented version
  //
  // featuring some comments and white space
    // localStorage['cache_img_2024'] = '';

  logo.onclick = _=>{ // click to refresh
    localStorage['cache_img_2024'] = '';
    I=9e9;
    gen_img();
  }

  show_img = s=>{ 
    (im=new Image).src=s;
    im.decode().then(_=>{
      logo.replaceChildren(im);
    }); 
  }

  gen_img = _=>{
    // this function checks if an image is cached and if not generates a new one

    // get options from URL
    // h = page height in mm
    // lw = line width in mm
    // d = line density multiplier (smaller is more dense)
    // bg = 1=include background rect 0=don't include
    // res = resolution
    // svg = 1=draw as SVG (for plotters etc) 0=draw as Canvas/PNG
    O={lw:.45,d:.6,h:140,bg:1,res:1e4,svg:0}; // default options
    (new(U=URLSearchParams)(location.search)).forEach((v,k)=>O[k]=v);
    O.seed = seed = O.seed || 'GENUARY2023' + Date.now();

    // init canvas
    M=O.h; // height in mm
    Y2=(Y=4)/2; // aspect ratio
    H=O.res; // viewbox height
    DR=O.d*(LW=O.lw/M); // dot radius
    V=document.createElement`canvas`;
    C=V.getContext`2d`;
    cw=V.width=Y*(ch=V.height=devicePixelRatio*logo.offsetWidth/Y);
    logo.replaceChildren(V);
    C.strokeStyle='#ffcc44';
    C.lineWidth=LW*ch;
    C.fillStyle='#1D1828';
    C.fillRect(0,0,cw,ch);

    // load cache after creating canvas to reduce flicker
    let cache=localStorage['cache_img_2024'];
    if (!O.svg && cache && cache.startsWith('data:image/png')) {
      show_img(cache);
      return;
    }

    // init PRNG
    S=Uint32Array.of(9,7,5,3); // dont init to 0
    R=(a=1)=>a*(a=S[3],S[3]=S[2],S[2]=S[1],a^=a<<11,S[0]^=a^a>>>8^(S[1]=S[0])>>>19,S[0]/2**32);
    [...seed+'SOURCERY'].map(c=>R(S[3]^=c.charCodeAt()*23205));

    // math defs and functions
    TAU=PI*2;
    PHI=.5+.5*5**.5; // golden ratio
    T=a=>R(a)-R(a); // triangle noise
    F=(N,f)=>[...Array(N)].map(_=>f()); // loop function

    L=(x,y)=>(x*x+y*y)**.5; // vec2 length (adapted from: Elements, Euclid 300 BC)
    len3=(x,y,z)=>(x*x+y*y+z*z)**.5; // vec3 length

    A=([x,y,z],[a,b,c],t=1)=>[x+a*t,y+b*t,z+c*t]; // vec3 add
    mix=([x,y,z],[a,b,c],t=1,s=1-t)=>[x*s+a*t,y*s+b*t,z*s+c*t]; // vec3 mix

    m=0;N=([x,y,z])=>[x/(m=1e-99+(x*x+y*y+z*z)**.5),y/m,z/m]; // vec3 normalize + save length in m
    X=([x,y,z],[a,b,c])=>[y*c-z*b,z*a-x*c,x*b-y*a]; // vec3 cross product
    D=([x,y,z=0],[a,b,c=0])=>x*a+y*b+z*c; // vec2/vec3 dot product
    SM=(a,b,x)=>(x=min(max((x-a)/(b-a),0),1),x*x*(3-2*x)); // smoothstep
    SM=(a,b,x)=>(x=(x-a)/(b-a),x=x<0?0:x>1?1:x,x*x*(3-2*x)); // smoothstep
    cl=(x,a,b)=>x<a?a:x>b?b:x; // clamp
    k=(a,b)=>a>0&&b>0?L(a,b):a>b?a:b; // 2D edge distance function
    k3=(a,b,c)=>k(a,k(b,c)); // 3D edge distance function

    box2=(a,b,c)=>(a=abs(a)-c,b=abs(b)-c,a>0&&b>0?L(a,b):a>b?a:b);

    // init 3D stuff
    Z=1.15; // zoom / FOV
    cp=[T(8),3+T(12),-48]; // camera pos
    lp=[cp[0],40,-50]; // light pos

    fw=N(A([0,12,0],cp,-1)); // camera forward axis
    console.log(`lookat distance = ${m.toFixed(3)}`);
    rt=N(X(fw,[T(.05),-1,0])); // camera right axis
    up=X(rt,fw); // camera up axis

    [sx,sy]=(([a,d,g],[b,e,h],[c,f,i])=>(t=a*(e*i-h*f)-b*(d*i-f*g)+c*(d*h-g*e),[[(e*i-f*h)/t,(c*h-b*i)/t,(b*f-c*e)/t],[(f*g-d*i)/t,(a*i-c*g)/t,(c*d-a*f)/t]]))(rt,up,fw); // inverse camera matrix, used to convert 3D direction to 2D

    fw=fw.map(v=>v*Z); // pre multiply fwd vector (used later in raytrace fn)

    // minimal value noise function
    const KNUTH = 0x9e3779b1; // prime number close to PHI*2**32 (used for multiplicative hash)
    let NSEED = R(2**32); // random 32 bit integer (yes it's an integer)
    ri=(i,j,k)=>(
      // this function returns random numbers based on integer coordinates i,j,k
      // the coordinates are truncated modulo 1024 (10 bits)
      // then they are concatenated into a 30 bit number
      // this number gets XORed with our random 32 bit integer NSEED
      // we use 32-bit integer multiply (imul) to do a multiplicative hash
      i=imul((((i&1023)<<20)|((j&1023)<<10)|(k&1023))^NSEED,KNUTH),
      // then we apply the PCG trick and shift the hashed number based on its
      // top three bits. (important to also shift away the top 3 bits, see PCG paper
      // https://www.pcg-random.org/paper.html ) 
      i<<=3+(i>>>29),
      // finally we shift the sign bit and return a float between 0..1
      (i>>>1)/2**31
    );
    no=F(99,_=>R(999)); // a bunch of random noise offsets

    // the noise function
    nr=(x,y,z,s,i, // (x,y,z) = coords, s=scale, i=noise offset 
          xi=floor(x=x*s+no[i]), // (xi,yi,zi) = integer coords
          yi=floor(y=y*s+no[i+1]),
          zi=floor(z=z*s+no[i+2]))=>(
      x-=xi,y-=yi,z-=zi, // now (x,y,z) are fractional coords, used for interpolation
      x*=x*(3-2*x), // apply smoothstep easing function, this makes
      y*=y*(3-2*y), // the derivative continuous (because it is 0 at grid points)
      z*=z*(3-2*z),
        ri(xi,yi,zi)*(1-x)*(1-y)*(1-z) // return the interpolated number
      + ri(xi,yi,zi+1)*(1-x)*(1-y)*z // xi gets multiplied by (1-x)
      + ri(xi,yi+1,zi)*(1-x)*y*(1-z) // xi+1 gets multiplied by (x)
      + ri(xi,yi+1,zi+1)*(1-x)*y*z // and same for yi and zi
      + ri(xi+1,yi,zi)*x*(1-y)*(1-z) // use all 8 combinations
      + ri(xi+1,yi,zi+1)*x*(1-y)*z
      + ri(xi+1,yi+1,zi)*x*y*(1-z)
      + ri(xi+1,yi+1,zi+1)*x*y*z);

    // box frame SDF based on Inigo Quilez' formula, see https://iquilezles.org/articles/distfunctions/ 
    frm=(x,y,z,b,e,p,q,r)=>(y=abs(y)-b,z=abs(z)-b,min(k3(x=abs(x)-b,q=abs(y+e)-e,r=abs(z+e)-e),k3(p=abs(x+e)-e,y,r),k3(p,q,z)));

    // distance function for the object around the logo
    ra=T()<0?1:-1; // angle left or right
    rx=T(35);
    r2=.5**.5; // sin(45°) (xz rotation)
    a=R(TAU);rs=sin(a);rc=cos(a); // random angle for yz rotation
    rid = T()<0?0:8+T(6); // x reflection distance, if >0 then there's two of the object
    rir = max(15+r2*rid,R(30));riw=1+T(.6); // radius and width of the object
    frw = .7+T(.3);frr = 9+R(9)+frw; // different settings if object is a box frame
    b8d = 9+R(3); b8r = b8d/4+R(2); // distance and radius for 8-balls object
    barfns=[ // object distance functions
      (x,y,z)=>L(L(y,z)-rir,abs(x)-rid)-riw, // ring
      (x,y,z)=>box2(box2(y,z,rir),abs(x)-rid,riw)-.3, // square
      (x,y,z)=>frm(x,y,z,frr,frw), // box frame
      (x,y,z)=>(y=abs(y),z=abs(z),[z,y]=z<y?[z,y]:[y,z],len3(x-6,y-b8d*2,z-b8d)-b8r), // 8 balls
    ];
    barfn = barfns[R(barfns.length)|0]; // pick random object

    // === THE BIG DISTANCE FUNCTION FOR EVERYTHING ===
    P=([x,y,z])=>{
      let by=y-12,bz=rc*z+rs*by;by=rc*by-rs*z;
      let bar = barfn((x+bz*ra+rx)*r2,by,(x-bz*ra+rx)*r2); // object around logo

      // noise distortion for the letters
      let ns=.04;
      let n0 = 2*nr(x,y,z,ns,0) + nr(x,y,z,ns*PHI,3);
      let n1 = 2*nr(x,y,z,ns,6) + nr(x,y,z,ns*PHI,9);
      let n2 = 2*nr(x,y,z,ns,12) + nr(x,y,z,ns*PHI,15);
      x+=(n0*2-3)*2.0;
      y+=(n1*2-3)*2.0;
      z+=(n2*2-3)*1.6;
      let yw = SM(15,3,y); // makes the letters fatter at the bottom
      let br = .8 + 1 * yw; // letter thickness
      y -= 4; // letters base line
      x += 49; // centre horizontally
      z -= cl(z,yw-1,1-yw); // make the thinner parts of letters a bit fatter in z-direction

      // distance functions for all the letters, it's magic
      let x0,ay9=abs(y-9),ay12=abs(y-12),y9=y>9,y6=y>6;
      x0=(x>0)*3;
      let G = k(min(x-1,y-8),L(k(abs(x)-1-x0,ay9-3-x0)-3+x0,z));
      x -= 12;
      let E = k(L(z,k(-4-x,abs(ay9-3)-3)),x-3);
      x -= 12; x0=(x<0)*3;
      let N = k(L(z,k(y-12-x0,abs(x)-1-x0)-3+x0),3-y);
      x -= 12; x0=(x>0)*3;
      let U = k(L(z,k(6-y-x0,abs(x)-1-x0)-3+x0),y-15);
      x -= 12;
      let A = k(L(z,max(-abs(6-abs(y-3)),k(y-12,abs(x)-1)-3) ),3-y);
      x -= 12; x0=(x<0)*3;
      let R = k(L(z,k((y9?ay12:y-6)-x0,abs(x)-1-x0)-3+x0),3-y);
      x -= 12; 
      let Y = L(z,k(min(abs(k(-1-x,12-y)-3),abs(k(x-1,-y+1)-3)),k(y-15,x-4)));
      x -= 16; x0=(!y6&&x<0)*3;
      let d2a = k(L(z, k(x-1,ay12)-3),-3-x+3*(y<12));
      let d2b = k(L(z, k(-x-1-x0,abs(y-6)-x0)-3+x0),-3+x+3*(y>6));
      let d2 = min(d2a,d2b); // digit 2
      x -= 12;
      let d4 = L(z,k(min(abs(k(-1-x,12-y)-3),k(abs(x-3),3-y)  ),k(y-15,x-4)));
      // let d = k(L(z, k(x-1,abs(ay9-3))-3),-3-x); // digit 3
      let letters = min(G, E, N, U, A, R, Y, d2, d4)-br; // union of letters inflated by br
      return min(bar,letters); // return distance function for union of letters and object around letters
    };

    Npts=0;
    u=([x,y])=>{ // raytrace function, evaluate point (x,y) on screen
      Npts++;
      fd=k(abs(x)-Y2+.03,abs(y)-.5+.03)-.012; // 2D SDF for page margins
      if(fd<0) {
        d=IX(cp,rd=N(A(A(fw,rt,x),up,y)),150); // trace a ray
        if(d<150){ // did we hit anything
          n=nl(p=A(cp,rd,d)); // calc normal
          lv=N(A(lp,p,-1));ld=m; // lv = light vector, ld = light distance
          shade=.4+.6*(ld<150 && IX(A(p,n,.02),lv,ld,.02)>=ld); // apply shadow
          shade *= max(0,D(n,lv)); // apply diffuse lighting
          edg=(1-cl(-D(n,rd),0,1))**2; // how edgy it is (changes the hatch dir)
          d=1-cl(shade,0,1); // clamp brightness
        } else {
          d= 1-.2*SM(1,0,rd[2]+.2*rd[1]); // background gradient
          // d=1;
          edg=1;
          n=[0,0,-1];
        }
        cr=DR/(1-d**.4+1e-3); // transform grey value 1..0 into clear radius
        hhv=mix(hv,rd,edg); // hatch direction based on edge
        // hhv=hv;
        return [
          N([D(sx,hd=N(X(n,hhv))),D(sy,hd),0]), // cross product hatch direction with normal (surface direction), then inv cam transform to 2D, and normalize
          cr<.3&&!Qh(QT,x-cr,y-cr,cr*2,(u,v)=>(x-u)**2+(y-v)**2<cr*cr) // clear test
          ]
      }
      return [[0,0],0] // fail
    };

    IX=(o,d,z,t=0,h=9)=>{for(;t<z&&h>.005;t+=h=.7*P(A(o,d,t)));return t}; // ray intersect
    nl=([x,y,z],e=1e-4,l=P([x+e,y,z]),s=P([x,y,z+e]),n=P([x,y+=e,z]),o=P([x+e,y,z+e]))=>N([l-s-n+o,o-l-s+n,o-l+s-n]); // normal (tetrahedral method)

    // very very tiny QuadTree (spatial data structure to speed up 2D point queries)
    Qa=(q,v,{x,y,w,p}=q)=>p[7]?(w/=2,q.r?0:q.r=[Q(x+w,y+w,w),Q(x+w,y,w),Q(x,y+w,w),Q(x,y,w)],Qa(q.r[(v[0]<x+w)*2+(v[1]<y+w)],v)):p.push(v);
    Qh=({x,y,w,p,r},X,Y,W,f)=>X<x+w&&X+W>x&&Y<y+w&&Y+W>y&&(p.some(([a,b])=>a>=X&&a<X+W&&b>=Y&&b<Y+W&&f(a,b))||r&&r.some(s=>Qh(s,X,Y,W,f)));
    Q=(x,y,w)=>({x,y,w,p:[]});

    v=[`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${H*Y|0} ${H}" width="${M*Y}mm" height="${M}mm">\n<!-`+`- `+Date(),new U(O),,`seed='${seed}';(code=${code})()\n-`+`->`,O.bg==1?`<rect x="${-H*Y}" y="${-H}" width="${H*Y*3}" height="${H*3}" fill="#eee8dd"/>`:``]; // init SVG array
    
    function* E() {
      // flow field tracing canvas rendering + SVG creating function
      // this function is a generator function to occasionally yield control to the calling function,
      // which is a setTimeout loop, so the browser can update and doesn't hang
      v.push([`<g fill="none" stroke="#000000" stroke-width="${(LW*H).toFixed(4)}" stroke-linecap="round">`]); // use SVG group element to set  style
      hv=N(A(A(rt,fw,1/Z),up,.5)); // hatch direction based on camera vectors
      QT=Q(-2,-2,4); // init empty QuadTree
      log_start(); // debug
      for(I=0;I<1e3;I++){ // I = fail counter
        [f0,h]=u(q0=[R(Y)-Y2,R()-.5]); // evaluate random point
        if(h){ // if OK then trace bidirectionally
          qq=[q0]; // init trace with first point
          [m=T()<0?DR:-DR,-m].map(s=>{ // randomly start in one or the other direction
            qq.reverse(); // flip trace so we are adding on the right side
            q=q0; // current pos
            pd=fq=f0; // current+start direction
            for(sh=0;sh<3&&D(pd,fq)>0&&D(f0,fq)>-.7;qq.push(q)) {// trace as long as: 1) clear (two steps leeway), 2) not too sharp corners, 3) maximum turn wrt starting direction (to prevent infinite spiral)
              [fq,h]=u(q=A(q,pd=fq,s)); // take a step and evaluate
              sh=h?0:sh+1;

            }
          });
          if(qq[9]){
            // accept only if trace has at least 10 pts
            log_trace(I); // debug
            I=0; // reset fail counter
            C.beginPath();
            n=v.push(`<path d="M ${qq.map(([x,y])=>(Qa(QT,[x,y]),x+=Y2,y+=.5,C.lineTo(x*ch,y*ch),[x*H|0,y*H|0])).join` `}"/>`); // draw trace to canvas and also add it to the SVG and add points to QuadTree
            C.stroke(); // stroke path
            if(n%63<1)yield // periodically return control to timeout function, so the browser doesn't hang
          }
        }
      }
      log_end(); // debug
      v.push(`</g></svg>`); // finish SVG
      if(O.svg){
        // show SVG
        svg_str = `data:image/svg+xml;charset=utf-8,`+encodeURIComponent(v.join`\n`);
        show_img(svg_str);
      }
      localStorage['cache_img_2024'] = V.toDataURL(); // save canvas to localStorage
    }

    J=_=>E.next().done||setTimeout(J); // timeout loop function loops until E iterator is done
    J(E=E()) // start the render generator function
  }
  gen_img(); // also start the program, or something
})() // start the program for real