# THE WORST PROMPTS

**By ChatGPT**

**THESE ARE NOT THE ACTUAL PROMPTS**

## FAKE PROMPTS BELOW, IMPLEMENT AT YOUR PERIL

Awful prompts ahead.

<script>
  // the worst prompts, by ChatGPT
  onload=_=>{
    let R = (a=1)=>a*Math.random();
    let shuf=a=>(a.map((j,i)=>[a[i],a[j]]=[a[j=i+R(a.length-i)|0],a[i]]),a);
    let fake_artists1=["Lira","Jaxon","Nomi","Elio","Pixel","Maro","Tessa","Remy","Kiro","Soft","Vexen","Aero","Nata","Lumen","Echo","Vera","Heliot","Dorian","Kitsu","Claude","Neo","Orra","Mathilde","Vector","Oskar","Nova","Marten","Sable","Corin","Byte","Fera","Ren","Mira","Juno","Haxley","Liora","Knut","Ellin","Raster","Calyx","Milo","Echo","Kaia","Leonid","Paradox","Rhea","Yaro","Fynn","Indigo","Taro","Janis","Synthex","Lidia","Moss","Ravel","Ciel","Artif","Solin","Tekno","Arden","Phi","Corvo"];
    let fake_artists2=["Montalvo","Leclair","Kestrel","Brammer","Druid","Pencini","Ruhl","Folds","Lumen","Collision","Marrot","Glyph","Solberg","Jax","Related","Kline","Fenn","Loops","Marvell","Vesper","Number","Devine","Quill","Nomad","Finch","Silvius","Lux","Orion","Ledger","Mantis","Linetti","Ardel","Voxell","Verstrand","Trent","Venn","Parallax","Zoré","Bard","Moreno","Hanford","Fragment","Drumm","Sharpe","Sprite","Solstice","Pelham","Calder","Circuit","Feldman","Orrell","Wisp","Farren","Line","Kincaid","Fontaine","Fendrix","Mercer","Lark","Vale","Solaris","Minuet"];
    let worst_prompts=[`Animate a bouncing dot on an infinite canvas.`,`Animate a static grid.`,`Animate an invisible wave.`,`Cellular automaton based on arguing with its neighbors.`,`Create a fractal forest where each tree is actually a single line.`,`Create a noise pattern that becomes progressively smoother the more you zoom in.`,`Create a pattern optimized for printing on water.`,`Create a pattern where every repeated element is deliberately misaligned by one pixel.`,`Create a perfect circle using only left-handed pixels.`,`Create a tileable pattern using only triangles that are not allowed to touch each other.`,`Create an image made of exactly one straight line.`,`Design a poster for an event that both happened last year and will happen next month.`,`Draw 'blue' but make it red.`,`Draw a "perfectly random" grid where every row contains exactly one duplicate color.`,`Draw a fractal that stops growing halfway and apologizes in a tooltip.`,`Draw a frame that erases itself.`,`Draw a grid where every cell is empty.`,`Draw a map consisting only of roads that lead nowhere but are extremely useful.`,`Draw a single pixel claiming the canvas.`,`Draw lines only where there is no space.`,`Draw shadows without objects.`,`Draw silence as a waveform.`,`Fill a canvas with invisible shapes.`,`Fill a grid with almost duplicates.`,`Fill canvas with one pixel, repeat 16K times.`,`Fill space with missing lines.`,`Fill space with the opposite of texture.`,`Generate a 16K photorealistic image of the smell of plywood.`,`Generate a canvas filled with straight lines where exactly one line is wavy.`,`Generate a GIF of a bouncing ball that only moves when you blink.`,`Generate a texture that behaves like silk when you stare at it and like sand when you blink.`,`Generate a texture where each pixel copies the value of a random neighbor every frame.`,`Generate an image where every pixel is a slightly different shade of gray except for one neon pink pixel.`,`Generate color without repeating it.`,`Generate order that mutates randomly.`,`Illustrate an Escher staircase that's safe for toddlers and obeys gravity.`,`Illustrate the concept 'less is more' using exactly 2,473 distinct objects.`,`Illustrate the exact midpoint between chaos and order as a neatly labeled SVG.`,`Loop a line that never ends.`,`Make a GIF of absolute silence (no frames should suggest motion or sound).`,`Make a repeating pattern optimized for curtains that must never be hung.`,`Make pixels shy from each other.`,`Paint a landscape at the moment it decides to stop being a landscape.`,`Produce a canvas where only the corners are filled with color.`,`Produce a tileable pattern where no two tiles are allowed to be the same.`,`Produce an image made entirely of horizontal lines that are each exactly one pixel apart, except one line.`,`Produce an image where every color is slightly "off" from the previous row.`,`Render a gradient that ignores boundaries.`,`Render a horizon that folds inward.`,`Render a looping GIF of a square slowly transforming into a circle and back, but never quite finishing.`,`Render an image where every object casts a shadow in the wrong direction.`,`Render light bending itself.`,`Render texture made entirely of negative pixels.`,`Render yesterday's weather as a photorealistic object.`,`Tile noise so it looks exactly the same everywhere.`,`Tile patterns that repel each other.`,`Tile squares that are too small to see.`];
    shuf(fake_artists1);
    shuf(fake_artists2);
    shuf(worst_prompts);
    for(let i=1; i<=31; i++) {
      let n1 = fake_artists1[i];
      if (R(2)<1) n1 = n1.toLowerCase();
      let n2 = fake_artists2[i];
      if (R(2)<1) n2 = n2.toLowerCase();
      let n = R(3)<1?n1+n2:n1+' '+n2;
      thanks.insertAdjacentHTML("beforebegin",`<h2 id="jan${i}">JAN. ${i}. <span class="credit">(credit: <a href="https://en.wikipedia.org/wiki/Special:Random">${n}</a>)</span></h2>\n<p>${worst_prompts[i]}</p>\n`);
    }
  }
</script>

# [THANKS](thanks)

[Big thanks goes out to all these people](thanks) for contributing to *GENUARY* and generally being awesome.

# 2024 PROMPTS

Looking for the 2024 prompts? They're at [2024/prompts](2024/prompts).
