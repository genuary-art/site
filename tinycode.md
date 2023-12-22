# TINY BOILERPLATE CODE

## Tiny shader code

Melissa asked, "Can you even make a shader in under 1KB", and so we did. The following code is the result of some code golfing between Laurent Houdard, Frank Force and Piter Pasma.

This is a basic full screen fragment shader setup (548 chars):

```js
<!doctype html><html><style>*{margin:0}#V{display:block}</style><canvas id=V><script>a=V.width=innerWidth;a/=V.height=innerHeight+.01;with(V.getContext`webgl2`){p=createProgram(t=35633);[`out O{X x=X(-1);x[gl_VertexID]=3.;gl_Position=X(u=x.xy,0,1);u.x*=${a};}`,`out X c;in O{c=X(.5+.5*fract(u*7.),.5,1);}`].map(x=>attachShader(p,s=createShader(t--),shaderSource(s,`#version 300 es\n~V vec2~X vec4~F float~O V u;void main()\nprecision highp F;`.split`~`.join`\n#define `+x),compileShader(s)));linkProgram(p);useProgram(p);drawArrays(5,0,3)}</script>
```

And this is the code for an animated full screen frag shader:

```js
<!doctype html><html><style>*{margin:0}#V{display:block}</style><canvas id=V><script>a=V.width=innerWidth;a/=V.height=innerHeight+.01;with(V.getContext`webgl2`){p=createProgram(t=35633);[`out O{X x=X(-1);x[gl_VertexID]=3.;gl_Position=X(u=x.xy,0,1);u.x*=${a};}`,`uniform F t;out X c;in O{c=X(.5+.5*fract(u*7.+t),.5,1);}`].map(x=>attachShader(p,s=createShader(t--),shaderSource(s,`#version 300 es\n~V vec2~X vec4~F float~O V u;void main()\nprecision highp F;`.split`~`.join`\n#define `+x),compileShader(s)));linkProgram(p);useProgram(p);k=_=>requestAnimationFrame(k,uniform1f(getUniformLocation(p,'t'),performance.now()/5e2),drawArrays(5,0,3));k()}</script>
```

My advice is to add some newlines to this code and try to understand it. One important thing is that both of them have a section for making many `#define` statements. The code could be even shorter without it, but when you add more code, it quickly becomes worth it to squeeze every bit of repeated code into a single character `#define`. See for example the trick with the letter `O` in the code above.

The "magic number" 35633 is the value of `gl.VERTEX_SHADER`. It also gets decreased once, to 35632, which is the value of `gl.FRAGMENT_SHADER`.

## Tiny canvas code

(TODO)

[This tweet maybe](https://twitter.com/piterpasma/status/1525927224209199106)

## Tiny SVG code

(TODO)

[Epihyperderpflardioids on FXhash](https://www.fxhash.xyz/generative/21343) (source)[https://gateway.fxhash2.xyz/ipfs/QmS7mdKKLHAAvoc5gVU1ASc3d8SPXPgkce1NzAm8g5GBQB/?fxhash=ooevZgrtKftGMCmF2kRG2MBNgvRw8gTLNHEKBTvLB1YfQEkof9g]

## What counts?

As you can see, the above code samples include both the Javascript code, the HTML code and sometimes even GLSL code. So does it count if only your Javascript code is under 1KB? What if you made a cool thing in [Shadertoy](https://www.shadertoy.com/) or [Twigl](https://twigl.app/) and the GLSL code is just under 1KB? You might ask, does this count? But I ask you:

Who is the master who makes the grass green?

Genuary is not a competition. It's about the challenge you set for yourself, and providing people with prompts to find fruitful challenges that other people are also participating in.

## Other tips

If you find ways to make the code shorter -- this is not unlikely, and why code golf exists -- please do let us know.

Maybe don't develop on the code while everything is on one line. It's much easier to read and you can always remove the newlines at the end.

I do recommend using single character variable names right from the start. This is because it becomes harder to see what it actually shorter once you do replace them. And this may just be me, but I actually find mathematical formulas easier to read when the variables are not very long.

It can be confusing to keep count. Saving some characters here, might require you to add some characters elsewhere, and it can become hard to keep track. What I usually do, is take the current snippet of code I am optimizing, and copy it to its own line. Then copy that line a few more times, start rewriting the copies, keeping the original on top. This way it is easy to see what actually saves characters. Otherwise you're just undoing and redoing stuff, and it gets hard to compare between versions.

## Links

Here are some links about optimizing Javascript code.

(TODO)

