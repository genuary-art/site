// Genuary 2024 logo code, Copyright by Piter Pasma
(code=({copyright:piterpasma,max,floor,abs,sin,cos,min,imul,PI}=Math)=>{
  // featuring some comments and white space

  gen_img = _=>{
    // init canvas
    Y2=(Y=4)/2; // aspect ratio
    DR=.7*(LW=.0035); // dot radius 
    V=document.createElement`canvas`;
    C=V.getContext`2d`;
    cw=V.width=Y*(ch=V.height=devicePixelRatio*logo.offsetWidth/Y);
    logo.replaceChildren(V);

    // clear
    C.fillStyle='#1D1828';
    C.fillRect(0,0,cw,ch);

    // init PRNG
    seed="blemk"+Date.now();
    S=Uint32Array.of(9,7,5,3); // dont init to 0, or seed after midnight
    R=(a=1)=>a*(a=S[3],S[3]=S[2],S[2]=S[1],a^=a<<11,S[0]^=a^a>>>8^(S[1]=S[0])>>>19,S[0]/2**32);
    [...seed+Infinity].map(c=>R(S[3]^=c.charCodeAt()*23205));

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
    SM=(a,b,x)=>(x=min(max((x-a)/(b-a),0),1),x*x*(3-2*x)); // smoothstep 54
    SM=(a,b,x)=>(x=(x-a)/(b-a),x=x<0?0:x>1?1:x,x*x*(3-2*x)); // smoothstep 56
    SM=(a,b,x)=>(x-=a,x/=b-a,x=x<0?0:x>1?1:x*x*(3-2*x)); // smoothstep 52
    SM=(a,b,x)=>(x-=a,x/=b-a)<0?0:x>1?1:x*x*(3-2*x); // smoothstep 48
    cl=(x,a,b)=>x<a?a:x>b?b:x; // clamp
    k=(a,b)=>a>0&&b>0?(a*a+b*b)**.5:a>b?a:b; // 2D edge distance function
    k3=(a,b,c)=>k(a,k(b,c)); // 3D edge distance function

    box2=(a,b,c)=>(a=abs(a)-c,b=abs(b)-c,a>0&&b>0?L(a,b):a>b?a:b); // 2D box distance function

    // init 3D stuff
    Z=2; // zoom / FOV
    cp=[T(8),T(12),-72]; // camera pos
    lp=[cp[0],40,-50]; // light pos

    fw=N(A([0,12,0],cp,-1)); // camera forward axis
    rt=N(X(fw,[T(.05),-1,0])); // camera right axis
    up=X(rt,fw); // camera up axis

    fw=fw.map(v=>v*Z); // pre multiply fwd vector (used later in raytrace fn)

    // tiny value noise function
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
    r2=.5**.5; // sin(45°) = 1/sqrt(2) (xz rotation)
    a=R(TAU);rs=sin(a);rc=cos(a); // random angle for yz rotation
    rid = T()<0?0:8+T(6); // flip coin, x reflection distance, if >0 then there's two of the object
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
    balx = T(299); baly=T(99);
    P=([x,y,z])=>{
      let by=y-12,bz=rc*z+rs*by;by=rc*by-rs*z;
      let bar = barfn((x+bz*ra+rx)*r2,by,(x-bz*ra+rx)*r2); // object around logo
      // noise distortion for the letters
      let ns=.04,nsp=ns*PHI;
      let n0 = 2*nr(x,y,z,ns,0) + nr(x,y,z,nsp,3);
      let n1 = 2*nr(x,y,z,ns,6) + nr(x,y,z,nsp,9);
      let n2 = 2*nr(x,y,z,ns,12) + nr(x,y,z,nsp,15);
      x+=(n0*2-3)*2.0;
      y+=(n1*2-3)*2.0;
      z+=(n2*2-3)*1.6;
      let bal = y*21/29-z*20/29+8;
      let yw = SM(15,3,y); // makes the letters fatter at the bottom
      let br = .8 + 1 * yw; // letter thickness
      y -= 4; // letters base line
      x += 49; // centre horizontally
      z -= cl(z,yw-1,1-yw); // make the thinner parts of letters a bit fatter in z-direction

      // distance functions for all the letters, don't worry it's magic -- I had a hard 
      // time figuring it out again this year, and I only had to change a 3 to a 4 :)
      let x0,ay9=abs(y-9),ay12=abs(y-12),y9=y>9,y6=y>6;
      x0=(x>0)*3;
      let G = k(x<y-7?x-1:y-8,L(k(abs(x)-1-x0,ay9-3-x0)-3+x0,z)); // G
      x -= 12;
      let E = k(L(z,k(-4-x,abs(ay9-3)-3)),x-3); // E
      x -= 12; x0=(x<0)*3;
      let N = k(y-12-x0,abs(x)-1-x0)-3+x0; // N
      x -= 12; x0=(x>0)*3;
      let U = k(L(z,k(6-y-x0,abs(x)-1-x0)-3+x0),y-15); // U
      x -= 12;
      let A = max(-abs(6-abs(y-3)),k(y-12,abs(x)-1)-3); // A
      x -= 12; x0=(x<0)*3;
      let R = k((y9?ay12:y-6)-x0,abs(x)-1-x0)-3+x0; // R
      let NAR = k(L(z,min(N,A,R)),3-y); // NAR
      x -= 12; 
      let Y = L(z,k(min(abs(k(-1-x,12-y)-3),abs(k(x-1,-y+1)-3)),k(y-15,x-4))); // Y
      x -= 16; x0=(!y6&&x<0)*3;
      let d2a = k(L(z, k(x-1,ay12)-3),-3-x+3*(y<12)); // d2a
      let d2b = k(L(z, k(-x-1-x0,abs(y-6)-x0)-3+x0),-3+x+3*y6); // d2b
      // let d2 = min(d2a,d2b); // digit 2 // d2
      x -= 12;
      let d4 = L(z,k(min(abs(k(-1-x,12-y)-3),k(abs(x-3),3-y)  ),k(y-15,x-4))); // d4

      let letters = min(G, E, U, NAR, Y, d2a,d2b, d4)-br; // union of letters inflated by br
      return bar<letters&&bar<bal?(ma=1,bar):letters<bal?(ma=0,letters):(ma=2,bal);
    };

    Npts=0;MAXD=300;
    u=([x,y])=>{ // raytrace function, evaluate point (x,y) on screen
      Npts++;
      fd=k(abs(x)-Y2+.03,abs(y)-.5+.03)-.012; // 2D SDF for page margins
      if(fd<0) {
        d=IX(cp,rd=N(A(A(fw,rt,x),up,y)),MAXD); // trace a ray
        if(d<MAXD){ // did we hit anything
          n=nl(p=A(cp,rd,d)); // calc normal
          lv=N(A(lp,p,-1));ld=m; // lv = light vector, ld = light distance
          shade=.4+.6*(ld<MAXD && IX(A(p,n,.02),lv,ld,.02)>=ld); // apply shadow
          shade *= max(0,D(n,lv)); // apply diffuse lighting
          shade *= SM(MAXD,.3*MAXD,d); // depth shading
          d=cl(shade,0,1); // clamp brightness
          P(p); // evaluate dist func to get material
          cc=d*d>.5+R(.5)?['#ff8','#8ff','#ccc'][ma]:['#fc4','#4cf','#888'][ma];          
        } else {
          d= 1;
          cc='#888';
        }
        rr=.5+d*2;
        cr=rr*DR/(d**2*.999+.001); // transform grey value 1..0 into clear radius
        return [
          cr<.3&&!Qh(QT,x-cr,y-cr,cr*2,(u,v)=>(x-u)**2+(y-v)**2<cr*cr), // clear test
          cc, // color
          rr // radius
          ]
      }
      return [0,'#0f0',1] // fail
    };

    IX=(o,d,z,t=0,h=9)=>{for(;t<z&&h>.005;t+=h=.7*P(A(o,d,t)));return t}; // ray intersect
    nl=([x,y,z],e=1e-4,l=P([x+e,y,z]),s=P([x,y,z+e]),n=P([x,y+=e,z]),o=P([x+e,y,z+e]))=>N([l-s-n+o,o-l-s+n,o-l+s-n]); // normal (tetrahedral method)

    // very very tiny QuadTree (spatial data structure to speed up 2D point queries)
    Qa=(q,v,{x,y,w,p}=q)=>p[2]?(w/=2,q.r?0:q.r=[Q(x+w,y+w,w),Q(x+w,y,w),Q(x,y+w,w),Q(x,y,w)],Qa(q.r[(v[0]<x+w)*2+(v[1]<y+w)],v)):p.push(v);
    Qh=({x,y,w,p,r},X,Y,W,f)=>X<x+w&&X+W>x&&Y<y+w&&Y+W>y&&(p.some(([a,b])=>a>=X&&a<X+W&&b>=Y&&b<Y+W&&f(a,b))||r&&r.some(s=>Qh(s,X,Y,W,f)));
    Q=(x,y,w)=>({x,y,w,p:[]});

    function draw_circle(x, y, r) {
      // I swear I got this from Stack Overflow or something
      C.moveTo(x + r, y); C.arc(x, y, r, 0, TAU); 
    }

    let rpt=_=>[R(Y),R()]; // random point on the canvas
    function* E() {
      // rendering function
      // this function is a generator function to occasionally yield control to the calling function,
      // which is a setTimeout loop, so the browser can update and doesn't hang
      // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop for more info
      QT=Q(-2,-2,4); // init empty QuadTree
      let nn=0;
      for(let I=0;I<999;I++){ // I = fail counter
        let [qx,qy]=rpt(); // get random point
        let q = [qx-Y2,qy-.5]; // translate point, our raytrace function is centered on (0,0)
        if(Qh(QT,q[0]-DR,q[1]-DR,DR*2,(qu,qv)=>(q[0]-qu)**2+(q[1]-qv)**2<DR*DR))continue; // fail early if there's no space (this line is optional but yields a bit of speed improvement)
        let [h,c,r]=u(q); // raytrace evaluate point
        if (h) { // if the clear radius is clear 
          Qa(QT,q); // add point to quadtree
          C.fillStyle=c; // and we draw a small circle in the right colour
          C.beginPath();
          draw_circle(qx*ch, qy*ch, LW * ch * r);
          C.fill();
          I=0; // reset fail counter
        }
        if (++nn>999) {nn=0;yield;} // occasionally yield for the event loop
      }
    }

    J=_=>E.next().done||setTimeout(J); // timeout loop function loops until E iterator is done
    J(E=E()) // start the render generator function
  }

  logo.onclick = gen_img; // click to refresh
  gen_img(); // also start the program
})() // start the program for real

// the end thank you for reading
