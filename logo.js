let start_time;
log_start=()=>{
  start_time = performance.now();
  console.log(`log start (${Math.round(start_time*1000)/1000}ms)`);
  console.table(O);
}
max_fails = 0;
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

(code=({copyright:piterpasma,max,floor,abs,sin,cos,min,imul,PI}=Math)=>{
  // PRUTSTRACER (c) 2022 by Piter Pasma
  //
  // commented version
  //
  // featuring some comments and white space
  
  // get options from URL
  O={lw:.45,d:.6,h:140,bg:1,inv:0}; // default options
  (new(U=URLSearchParams)(location.search)).forEach((v,k)=>O[k]=v);
  seed = O.seed || 'GENUARY2023' + Date.now();

  // init PRNG
  S=Uint32Array.of(9,7,5,3);
  // R=(a=1)=>a*(t=S[3],S[3]=S[2],S[2]=S[1],S[1]=n=S[0],t^=t<<11,S[0]^=(t^t>>>8)^(n>>>19),S[0]/2**32); // orig PRNG 97
  R=(a=1)=>a*(a=S[3],S[3]=S[2],S[2]=S[1],a^=a<<11,S[0]^=a^a>>>8^(S[1]=S[0])>>>19,S[0]/2**32);
  [...seed+'SOURCERY'].map(c=>R(S[3]^=c.charCodeAt()*23205));
  console.log(R(999)|0,R(999)|0,R(999)|0,R(999)|0); // 497 969 812 15

  // maaaaaath
  TAU=PI*2;
  T=a=>R(a)-R(a); // triangle noise
  F=(N,f)=>[...Array(N)].map(_=>f()); // loop function
  Fi=(N,f)=>[...Array(N)].map((_,i)=>f(i)); // loop function

  L=(x,y)=>(x*x+y*y)**.5; // vec2 length (adapted from: Elements, Euclid 300 BC)
  len3=(x,y,z)=>(x*x+y*y+z*z)**.5; // vec3 length

  A=([x,y,z],[a,b,c],t=1)=>[x+a*t,y+b*t,z+c*t]; // vec3 add
  mix=([x,y,z],[a,b,c],t=1,s=1-t)=>[x*s+a*t,y*s+b*t,z*s+c*t]; // vec3 mix

  m=0;N=([x,y,z])=>[x/(m=1e-99+(x*x+y*y+z*z)**.5),y/m,z/m]; // vec3 normalize + save length in m
  X=([x,y,z],[a,b,c])=>[y*c-z*b,z*a-x*c,x*b-y*a]; // vec3 cross product
  D=([x,y,z=0],[a,b,c=0])=>x*a+y*b+z*c; // vec2/vec3 dot product
  SM=(a,b,x)=>(x=min(max((x-a)/(b-a),0),1),x*x*(3-2*x)); // smoothstep
  mod=(x,m)=>(x%=m,x<0?x+m:x); // proper modulo (TODO: test speed vs floor)
  cl=(x,a,b)=>x<a?a:x>b?b:x;
  k=(a,b)=>a>0&&b>0?L(a,b):a>b?a:b; // 2D edge distance function
  kx=(a,b)=>a<0&&b<0?-L(a,b):a<b?a:b; // 2D edge distance function
  k3=(a,b,c)=>k(a,k(b,c));

  W=(a,b,r)=>-a<r&&-b<r?L(r+a,r+b)-r:a>b?a:b; // "round max"
  box2=(a,b,c)=>(a=abs(a)-c,b=abs(b)-c,a>0&&b>0?L(a,b):a>b?a:b);
  cbox2=(a,b,c)=>(a=abs(a)-c,b=abs(b)-c,a>b?a:b);

  box3=(a,b,c,d)=>k(abs(a)-d,k(abs(b)-d,abs(c)-d));

  // W=(a,b,r)=>k(a+r,b+r)-r;

  // init canvas
  M=O.h; // height in mm
  Y2=(Y=4)/2; // aspect ratio
  H=1e5; // viewbox height
  B=logo; // logo container element
  V=document.createElement`canvas`;
  B.appendChild(V);
  C=V.getContext`2d`;
  cw=V.width=Y*(ch=V.height=B.offsetWidth/Y);
  C.strokeStyle=O.inv?'#ff8':'#008';
  C.fillStyle=O.inv?'#111':'#ddd';
  C.fillRect(0,0,cw,ch);

  // init 3D stuff
  Z=1.15; // zoom / FOV
  cp=[T(8),3+T(12),-48]; // camera pos
  lp=[cp[0],40,-50]; // light pos

  fw=N(A([0,12,0],cp,-1)); // camera forward axis
  console.log(`lookat distance = ${m.toFixed(3)}`);
  rt=N(X(fw,[T(.05),-1,0])); // camera right axis
  up=X(rt,fw); // camera up axis

  [sx,sy]=(([a,d,g],[b,e,h],[c,f,i])=>(t=a*(e*i-h*f)-b*(d*i-f*g)+c*(d*h-g*e),[[(e*i-f*h)/t,(c*h-b*i)/t,(b*f-c*e)/t],[(f*g-d*i)/t,(a*i-c*g)/t,(c*d-a*f)/t]]))(rt,up,fw); // inverse camera matrix

  fw=fw.map(v=>v*Z); // pre multiply fwd vector

  G=(x,y,t)=>A(cp,N(A(A(fw,rt,Y*x),up,y)),t); // 2D+depth to 3D function

  // some kind of proper noise??
  const KNUTH = 0x9e3779b1;
  let NSEED = R(2**32);
  ri=(i,j,k)=>(
    i=imul((((i&1023)<<20)|((j&1023)<<10)|(k&1023))^NSEED,KNUTH),
    i<<=3+(i>>>29),(i>>>1)/2**31
  );
  no=F(99,_=>R(999));
  // SM=(a,b,x)=>(x=min(max((x-a)/(b-a),0),1),x*x*(3-2*x)); // smoothstep

  nr=(x,y,z,s,i,xi=floor(x=x*s+no[i]),
        yi=floor(y=y*s+no[i+1]),
        zi=floor(z=z*s+no[i+2]))=>(
    x-=xi,y-=yi,z-=zi,
    x*=x*(3-2*x),
    y*=y*(3-2*y),
    z*=z*(3-2*z),
      ri(xi,yi,zi)*(1-x)*(1-y)*(1-z)
    + ri(xi,yi,zi+1)*(1-x)*(1-y)*z
    + ri(xi,yi+1,zi)*(1-x)*y*(1-z)
    + ri(xi,yi+1,zi+1)*(1-x)*y*z
    + ri(xi+1,yi,zi)*x*(1-y)*(1-z)
    + ri(xi+1,yi,zi+1)*x*(1-y)*z
    + ri(xi+1,yi+1,zi)*x*y*(1-z)
    + ri(xi+1,yi+1,zi+1)*x*y*z);

  // very very minimal sinus noise
  // [pa,pb,pc,qa,qb,qc]=F(6,R); // random phases
  [na,nb]=F(2,_=>N(F(3,T)));nb=N(X(na,nb));nc=N(X(na,nb)); // noise axes
  PHI=.5+.5*5**.5;
  g=x=>(x=abs(x-floor(x)-.5)*2)*x*(6-4*x)-1; // fast fake sinus
  xg=x=>16*(x-=floor(x)+.5)*(.5-abs(x)); // faster? fake sinus TODO: check if actually faster
  gg=F(99,(p=R(),q=R())=>x=>g(x+p)*(.7+.3*g(x*PHI+q)));
  nz=(p,i,s=.05,m=.2,a=D(p,na)*s,b=D(p,nb)*s,c=D(p,nc)*s)=>
    gg[0+i](a+gg[3+i](c*PHI-b)*m) + 
    gg[1+i](b+gg[4+i](a*PHI-c)*m) + 
    gg[2+i](c+gg[5+i](b*PHI-a)*m);

  // eight=(x,y)=>{
  //   let qq = 0,o=0;

  //   if (x<0&&y<0) { [x,y]=[-y,-x]; qq+=6; o^=1}    
  //   if (y<0) { [x,y]=[-y,x]; qq+=4; o^=1 }
  //   if (x<0) { [x,y]=[y,-x]; qq+=2; o^=1 }
  //   if (x>y) { [x,y]=[y,x]; qq+=1; o^=1 }
  //   y-=32;
  //   x-=12;
  //   let a = ([1,2,1,2,1,2,2,1][qq]) * TAU / 8, ca=cos(a), sa=sin(a);
  //   [x,y] = [x*ca+y*sa, y*ca-x*sa];

  //   return [x,y,qq];
  // }
  frm=(x,y,z,b,e,p,q,r)=>(y=abs(y)-b,z=abs(z)-b,min(k3(x=abs(x)-b,q=abs(y+e)-e,r=abs(z+e)-e),k3(p=abs(x+e)-e,y,r),k3(p,q,z)));
  sabs=x=>(x*x+.5)**.5;
  ra=T()<0?1:-1;rx=T(35);r2=.5**.5;
  a=R(TAU);rs=sin(a);rc=cos(a);
  rid = T()<0?0:8+T(6);
  rir = max(15+r2*rid,R(30));riw=1+T(.6);
  frw = .7+T(.3);frr = 9+R(9)+frw;
  b8d = 9+R(3); b8r = b8d/4+R(2);
  barfns=[
    (x,y,z)=>L(L(y,z)-rir,abs(x)-rid)-riw, // ring
    (x,y,z)=>box2(box2(y,z,rir),abs(x)-rid,riw)-.3, // square
    (x,y,z)=>frm(x,y,z,frr,frw), // frame
    (x,y,z)=>(y=abs(y),z=abs(z),[z,y]=z<y?[z,y]:[y,z],len3(x-6,y-b8d*2,z-b8d)-b8r), // 8 balls
  ];
  barfn = barfns[R(barfns.length)|0];
  // twp=R();
  // barfn=(x,y,z,a=x*.2+twp,s=xg(a),c=xg(a+.25))=>(y-=18,L(y*c+z*s,z*c-y*s)-2);
  // === DISTANCE FUNCTION ===
  P=([x,y,z])=>{
    // let plane = -z+2, bplane = -z+12;
    // let bar = L(y-10,z-12)-6;
    let by=y-12,bz=rc*z+rs*by;by=rc*by-rs*z;
    let bar = barfn((x+bz*ra+rx)*r2,by,(x-bz*ra+rx)*r2);
    // let bar = L(L(y-10,(x-z*ra+rx)*r2)-23,abs(x+z*ra+rx)*r2-8)-.6;
    let x0,ns=.04;
    let n0 = 2*nr(x,y,z,ns,0) + nr(x,y,z,ns*PHI,3);
    let n1 = 2*nr(x,y,z,ns,6) + nr(x,y,z,ns*PHI,9);
    let n2 = 2*nr(x,y,z,ns,12) + nr(x,y,z,ns*PHI,15);
    x+=(n0*2-3)*2.0;
    y+=(n1*2-3)*2.0;
    z+=(n2*2-3)*1.6;
    let yw = SM(15,3,y);
    let br = .8 + 1 * yw;
    y -= 4;
    x += 49; 
    z -= cl(z,yw-1,1-yw);
    let ay9=abs(y-9),ay12=abs(y-12),y9=y>9,y6=y>6;
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
    let Y = L(z, 
              k(
                min(abs(k(-1-x,12-y)-3),abs(k(x-1,-y+1)-3)),
                k(y-15,
                  x-4)
                )
              );
    x -= 16; x0=(!y6&&x<0)*3;
    let d2a = k(L(z, k(x-1,ay12)-3),-3-x+3*(y<12));
    let d2b = k(L(z, k(-x-1-x0,abs(y-6)-x0)-3+x0),-3+x+3*(y>6));
    let d2 = min(d2a,d2b);
    x -= 12;
    let d3 = k(L(z, k(x-1,abs(ay9-3))-3),-3-x);
    let dd = min(G, E, N, U, A, R, Y, d2, d3)-br;
    // let rin = L(dd-2,(x+96)*rx+(y-9)*ry)-.3;
    return min(bar,dd);
  }; // distance function for everything

  Npts=0;
  cb=1-O.inv;
  ca=O.inv?1:-1;
  u=([x,y])=>{ // raytrace function, evaluate point (x,y) on screen
    Npts++;
    fd=k(abs(x)-Y2+.03,abs(y)-.5+.03)-.012;
    if(fd<0){ // page margins
      d=IX(cp,rd=N(A(A(fw,rt,x),up,y)),150); // trace a ray
      if(d<150){ // did we hit anything
        n=nl(p=A(cp,rd,d)); // calc normal
        lv=N(A(lp,p,-1));ld=m;
        // shade=1;//SM(0,.3,edg*edg);
        la=SM(150,60,ld);
        shade=.4+.6*la*(ld<150 && IX(A(p,n,.02),lv,ld,.02)>=ld);
        let ao_step=1.5,aos=0;
        for(a=0,b=1,i=1;i<6;i++,b*=.7){
          a+=max(0,b*P(A(p,n,i*ao_step))/i); // shadow ray + AO loop
          aos+=b*ao_step;
        }
        a/=aos;
        // shade *= a * .2 + .8*max(0,D(n,lv))*(.5+.5*a); // diffuse
        shade *= max(0,D(n,lv)); // diffuse
        // shade *= SM(0,.9,max(0,D(n,lv)));
        edg=(1-cl(-D(n,rd)+.5*n[1]**2,0,1))**2;
        // shade*=1-edg;//SM(.9,0,edg);
        shade=shade+(1-shade)*SM(75,150,d);
        // d*=edg;
        d=cb+ca*cl(shade,0,1);

      } else {
        d=.5*SM(1,0,rd[2]+.2*rd[1]);

        // d=DR/(d+1e-3);
        edg=1;
        // d=0;
        n=[0,0,-1];lv=hv;
      }
      cr=DR/(d+1e-3); // transform grey value 1..0 into clear radius
      hhv=mix(hv,rd,edg);
      // hhv=hv;
      return [
        N([D(sx,hd=N(X(n,hhv))),D(sy,hd),0]), // surface hatch direction
        cr<.3&&!Qh(QT,x-cr,y-cr,cr*2,(u,v)=>(x-u)**2+(y-v)**2<cr*cr) // clear test
        ]
    }
    return [] // fail
  };

  IX=(o,d,z,t=0,h=9)=>{for(;t<z&&h>.005;t+=h=.7*P(A(o,d,t)));return t}; // ray intersect
  nl=([x,y,z],e=1e-4,l=P([x+e,y,z]),s=P([x,y,z+e]),n=P([x,y+=e,z]),o=P([x+e,y,z+e]))=>N([l-s-n+o,o-l-s+n,o-l+s-n]); // normal

  // very very tiny QuadTree (spatial data structure to speed up 2D point queries)
  Qa=(q,v,{x,y,w,p}=q)=>p[7]?(w/=2,q.r?0:q.r=[Q(x+w,y+w,w),Q(x+w,y,w),Q(x,y+w,w),Q(x,y,w)],Qa(q.r[(v[0]<x+w)*2+(v[1]<y+w)],v)):p.push(v);
  Qh=({x,y,w,p,r},X,Y,W,f)=>X<x+w&&X+W>x&&Y<y+w&&Y+W>y&&(p.some(([a,b])=>a>=X&&a<X+W&&b>=Y&&b<Y+W&&f(a,b))||r&&r.some(s=>Qh(s,X,Y,W,f)));
  Q=(x,y,w)=>({x,y,w,p:[]});

  DR=O.d*(LW=O.lw/M); // dot radius

  v=[`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${H*Y|0} ${H}" width="${M*Y}mm" height="${M}mm">\n<!-`+`- `+Date(),new U(O),,`seed='${seed}';(code=${code})()\n-`+`->`,O.bg?`<rect x="${-H*Y}" y="${-H}" width="${H*Y*3}" height="${H*3}" fill="#${O.inv?'000000':'ffffff'}"/>`:``]; // init SVG
  
  function* E() {
    // flow field tracing rendering SVG creating function
    v.push([`<g fill="none" stroke="#${O.inv?'ffffff':'000000'}" stroke-width="${(LW*H).toFixed(4)}" stroke-linecap="round">`]);
    hv=N(A(A(rt,fw,1/Z),up,.5)); // hatch direction
    QT=Q(-2,-2,4); // init empty QuadTree
    log_start();
    DR0=DR;
    for(I=0;I<1e3;I++){ // I = fail counter
      DR=DR0;
      [f0,h]=u(q0=[R(Y)-Y2,R()-.5]); // evaluate random point
      if(h){ // if OK then trace bidirectionally
        qq=[q0]; // init trace with first point
        ss=[]; // these six characters could have been saved
        [m=T()<0?DR0:-DR0,-m].map(s=>{ // randomly start in one or the other direction
          qq.reverse(); // flip trace so we are adding on the right side
          q=q0; // current pos
          pd=fq=f0; // current+start direction
          for(h=1;h&&D(pd,fq)>0&&D(f0,fq)>-.7;qq.push(q)) {// trace as long as: 1) clear, 2) not too sharp corners, 3) maximum turn wrt starting direction (to prevent infinite spiral)
            // DR=DR0*(.5+.5*d);
            // DR=DR0*.5;
            [fq,h]=u(q=A(q,pd=fq,s)); // take a step and evaluate
          }
        });
        if(qq[9]){
          // accept only if trace has more than 10 pts
          log_trace(I);
          C.beginPath(I=0); // begin path and also reset fail counter
          n=v.push(`<path d="M ${qq.map(([x,y])=>(Qa(QT,[x,y]),x+=Y2,y+=.5,C.lineTo(x*ch,y*ch),[x*H|0,y*H|0])).join` `}"/>`); // draw trace to canvas and also add it to the SVG and add points to QuadTree
          C.stroke(); // stroke path
          if(n%63<1)yield // periodically return control to timeout function, so the browser doesn't hang
        }
      }
    }
    log_end();
    v.push`</g></svg>`; // finish SVG
    // show SVG 
    B.append(im=new Image);
    B.removeChild(V) // remove canvas
    im.src=`data:image/svg+xml,`+encodeURIComponent(v.join`\n`);
  }

  J=_=>E.next().done||setTimeout(J); // timeout loop function loops until E iterator is done
  J(E=E()) // start the render generator function
})() // start the program