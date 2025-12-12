// Genuary 2026 logo code, Copyright by Piter Pasma

(code=({copyright:piterpasma,max:G,floor:Z,abs:B,sin,cos,min:U,imul,PI}=Math,TAU=PI*2)=>{
  seed="ANGRUARY"+Date.now();
  gen_img = (anim)=>{
    start_time = Date.now();
    if(anim)seed="ANGRUARY"+Date.now();
    // init canvas
    ASPECT=logo.offsetWidth/logo.offsetHeight; // aspect ratio
    V=document.createElement`canvas`;
    cw=V.width=ASPECT*(ch=V.height=devicePixelRatio*logo.offsetWidth/ASPECT);
    logo.replaceChildren(V);

    // init PRNG
    PRNG=(s,a=9,b,c,d,R=(x=1)=>x*(x=d^d<<11,d=c,c=b,b=a,((a^=x^x>>>8^(b>>>19))>>>0)/2**32))=>([...s+1/0].map(e=>R(d^=e.charCodeAt()*a)),R);
    R=PRNG(seed);
    T=a=>R(a)-R(a); // triangle noise
    RS=a=>R(2)<1?a:-a;
    L=(x,y,z=0)=>(x*x+y*y+z*z)**.5; // vec2/3 length (adapted from: Elements, Euclid 300 BC)
    N=([x,y,z=0],m=L(x,y,z))=>[x/m,y/m,z/m]; // vec3 normalize

    // math defs and functions
    PHI=.5+.5*5**.5; // golden ratio
    F=(N,f)=>[...Array(N)].map((_,i)=>f(i)); // loop function

    // shader code
    // RT=_=>`W(${F(3,_=>R(TAU))})`;
    // RF=_=>`W(${F(3,_=>2**(R(.6)-.3))})`;
    RT4=_=>`X(${F(4,_=>R(TAU))})`;
    RF4=_=>`X(${F(4,i=>2**(i*.6+R(.6)-1.3))})`;
    vRT4=_=>F(4,_=>R(TAU));
    vRF4=_=>F(4,i=>2**(i*.6+R(.6)-1.3));

    // frarg shade
    frag_shader = `out X c;

    uniform X f0,f1,f2,f3,p0,p1,p2,p3;
    uniform V zz;

    F aastep(F threshold, F value) {
      F afwidth = L(vec2(dFdx(value), dFdy(value))) * 0.7;
      return S(threshold-afwidth, threshold+afwidth, value);
    }
    F smin(F a,F b,F k){
      F h=G(0,1-B(a-b)/k);
      return U(a,b)-h*h*k/4; // smooth min
    }
    F smax(F a,F b,F k){
      return -smin(-a,-b,k); // smooth max
    }

    F sqr(F x) { return x*x; }
    F cub(F x) { return x*x*x; }
    X cub(X x) { return x*x*x; }
    X sin3(X x) { return cub(sin(x)); }
    F k(F a,F b) {
      return a>0&&b>0?sqrt(a*a+b*b):a>b?a:b; // 2D edge distance function
    }
    const V K=V(1,-1);
    F wb4(V p) {    
      const F ma = 3;
      X q = X(p,p.yx*K*2);
      return dot(
          sin(q.xyzw*f0+p0+ma*sin(q.yzwx*f1+p1)),
          sin(q.zwyx*f2+p2+ma*sin(q.xwyz*f3+p3))
        );
    }

F GENUARY(V p) {
  F x = p.x, y = p.y;
  y += 7; // centre vertically
  x += 50; // centre horizontally
  F x0=x>0?3:0,ay9=B(y-9),ay12=B(y-12);
  F G_=k(U(x,y-8),B(k(B(x)-1-x0,ay9-3-x0)-3+x0));//G
  x -= 12;
  F E = k(B(k(-4-x,B(ay9-3)-3)),x-3); // E
  x -= 12; x0=x<0?3:0;
  F N = k(y-12-x0,B(x)-1-x0)-3+x0; // N
  x -= 12; x0=x>0?3:0;
  F U_ = k(B(k(6-y-x0,B(x)-1-x0)-3+x0),y-15); // U_
  x -= 12;
  F A = G(-B(6-B(y-3)),k(y-12,B(x)-1)-3); // A
  x -= 12; x0=x<0?3:0;
  F R = k((y>9?ay12:y-6)-x0,B(x)-1-x0)-3+x0; // R
  x -= 12; 
  F Y = G(k(U(B(k(-1-x,12-y)-3),B(k(x-1,-y+1)-3)),y-15),x-4); // Y
  x -= 16;
  x0=y<6?3:0;
  F d2a=B(x<0?k(B(y-6)-x0,-x-1-x0)-3+x0:k(B(y-12),x-1)-3);
  F d2b=k(B(x+(y<9?-1.5:1.5))-1.5,B(B(y-9)-6));
  x -= 12; x0=x<0&&B(y-9)<3?3:0; 
  F d6a = B(k(B(6-y)-x0,B(x)-1-x0)-3+x0);
  F d6b = k(B(k(y-12-x0,-x-1-x0)-3+x0),G(6-y,x-3));
  
  // TODO: 7, 8 (3), 9 (6), 0, 1, 
  return U(G_,U(E,U(k(B(U(N,U(A,R))),3-y),U(U_,U(Y,U(d2a,U(d2b,U(d6a,d6b))))))));
}

    F rf=9,
      bd = .6;
    V ni = V(17,-23), n0 = V(0,0);
    F angry_noise(F d, V p) {
      F s = 1;
      for(F i=0; i<6; i++) {
        F n = B(wb4(p*.05/s+i*ni+n0)*(.45/.05)*s)-s*bd;
        F ng = smax(d-s, n,s);
        d = smin(d+s*.35+n*rf,ng-s*.8,s*2);
        s *= .6;
      }
      return d;
    }

    W col(V p) {
      // perspectiv
      F z = dot(p,sin(zz.x*V(23,17)*.1+V(${[R(TAU),R(TAU)]}))*V(2,4))+23;
      p *= 450/z; 
      // shadow offset
      const F oo = .4;
      p += oo;
      F f = S(0,3,sqr(wb4(p*.07-73)));
      F d = GENUARY(p)-(2+S(-7,11,p.y))-f*.3,e;
      W c = W(0);

      bd = mix(.05,1.8,f); 
      rf = mix(.0,${R(.03+R(.05))},f*f);
      n0=V(0,0);
      e = angry_noise(d-.6,p);
      c = mix(c,W(0,.33,1),aastep(0,-e));
      n0=V(77,-13); bd -= .3;
      e = angry_noise(d,p);
      c = mix(c,W(1,0,.33),aastep(0,-e));
      n0=V(-87,42); bd -= .3;
      e = angry_noise(d+.4,p);
      c = mix(c,W(0),aastep(0,-e));
      n0=V(-88,43); bd -= .3;
      p-=oo;
      d = GENUARY(p)-(2+S(-7,11,p.y))-f*.3,e;
      e = angry_noise(d+.7,p);
      c = mix(c,W(0),aastep(0,-e+.15));
      c = mix(c,W(1),aastep(0,-e-.05));
      return c;
    }

    in O{
      c=X(pow(col(u),W(1/2.2)),1);
    }`;

    // fix GLSL so you can type `4` instead of `4.`
    fix_GLSL = s=>s.replace(/([^a-zA-Z_0-9.])([0-9]+)(?![.0-9u])/g,'$1$2.').replace(/([0-9.]e-[0-9]+)\./gi,'$1');

    // WebGL2 init / wow very plate, such boiler
    g=V.getContext`webgl2`;p=g.createProgram(t=35633);[`out O{X x=X(-1);x[gl_VertexID]=3.;gl_Position=X(u=x.xy,0,1);u.x*=${ASPECT};}`,frag_shader].map(x=>g.attachShader(p,s=g.createShader(t--),g.shaderSource(s,src=`#version 300 es\n~V vec2~W vec3~X vec4~F float~O V u;void main()~L length~S smoothstep~U min~B abs~G max\nprecision highp F;`.split`~`.join`\n#define `+fix_GLSL(x)),g.compileShader(s)));g.linkProgram(p);g.useProgram(p);
    // fine, if you also want error messages
    if (!g.getProgramParameter(p,g.LINK_STATUS)) {
      // display error with (possibly generated) code and line numbers
      console.log(src.split('\n').map((v,i)=>`${i+1}: ${v}`).join('\n'));
      console.log(`Link failed:\n${g.getProgramInfoLog(p)}`);
      console.log(`S LOG:\n${g.getShaderInfoLog(s)}`);
      throw 'AARG DED';
    }
// fpz
    c=[];
    un = (t,n,v)=>g[`uniform${t}v`](g.getUniformLocation(p,n),v);


    pp=F(4,i=>(un('4f','f'+i,vRF4()),vRT4()));
    pd = F(16,i=>RS(1+R(3)));
    z0 = R(TAU);
    k=_=>{
      let t = performance.now() * 5e-5;
      F(4,i=>{
        un('4f','p'+i,pp[i].map((v,j)=>v+t * pd[i*4+j]));
      });
      un('2f','zz',[t,z0]);
      g.drawArrays(5,0,3);
      if(anim)requestAnimationFrame(k);
    };
    k();

    console.log(`elaps = ${Date.now() - start_time}ms`);

  };
  anim=0;
  logo.onclick = e=>gen_img(anim^=1); // click to refresh
  gen_img(anim); // start the program
})(); // start the program for real

// the end thank you for reading

