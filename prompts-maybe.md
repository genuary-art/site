# PROMPTS

## JAN. 1 <span class="credit">(credit: Melissa)</span> {#jan1}
Lava lamp

## JAN. 2 <span class="credit">(credit: Piter)</span> {#jan2}
In the style of Wassily Kandinsky (1846-1944)

## JAN. 3 <span class="credit">(credit: PaoloCurtoni)</span> {#jan3}
Point–Line–Plane: create a composition using only basic elements such as points and lines

## JAN. 4 <span class="credit">(credit: Piter)</span> {#jan4}
Pixels

## JAN. 5 <span class="credit">(credit: Luis Fraguada)</span> {#jan5}
No palettes (generative colors, procedural colors, emergent colors)

## JAN. 6 <span class="credit">(credit: nicolas barradeau & Yazid)</span> {#jan6}
Screensaver

## JAN. 7 <span class="credit">(credit: Piter)</span> {#jan7}
Progress bar / indicator / loading animation

## JAN. 8 <span class="credit">(credit: Darien)</span> {#jan8}
Chaotic system

## JAN. 9 <span class="credit">(credit: Camille Roux)</span> {#jan9}
ASCII

## JAN. 10 <span class="credit">(credit: greweb)</span> {#jan10}
Hexagonal

## JAN. 11 <span class="credit">(credit: Neel)</span> {#jan11}
Use a library that you haven't used before

## JAN. 12 <span class="credit">(credit: Melissa & nicolas barradeau)</span> {#jan12}
"Particles, lots of them."

## JAN. 13 <span class="credit">(credit: Piter)</span> {#jan13}
Wobbly function day! sin(a * b + c + d * sin(e * f + g)) + sin(h * i + j + k * sin(l * m + n)) + ... (or something along those lines)

## JAN. 14 <span class="credit">(credit: Heeey)</span> {#jan14}
Less than 1KB artwork

## JAN. 15 <span class="credit">(credit: Amy)</span> {#jan15}
Use a physics library

## JAN. 16 <span class="credit">(credit: Bruce Holmer & Michael Lowe)</span> {#jan16}
Draw 10000 of something

## JAN. 17 <span class="credit">(credit: Melissa)</span> {#jan17}
Inspired by Islamic art

## JAN. 18 <span class="credit">(credit: Chris Barber (code_rgb))</span> {#jan18}
Bauhaus

## JAN. 19 <span class="credit">(credit: Shaderism)</span> {#jan19}
Flocking

## JAN. 20 <span class="credit">(credit: Roni)</span> {#jan20}
Generative typography

## JAN. 21 <span class="credit">(credit: Roni)</span> {#jan21}
In the style of Anni Albers

## JAN. 22 <span class="credit">(credit: Melissa & Piter)</span> {#jan22}
(In the style of) Vera Molnár

## JAN. 23 <span class="credit">(credit: Marc Edwards)</span> {#jan23}
16×16

## JAN. 24 <span class="credit">(credit: Jorge Ledezma)</span> {#jan24}
Impossible objects (undecided geometry)

## JAN. 25 <span class="credit">(credit: Piter)</span> {#jan25}
If you like generative art, you probably have some photos on your phone of cool looking patterns, textures, shapes or things that you've seen. You might have even thought, "I should try to recreate this with code". Today is the day

## JAN. 26 <span class="credit">(credit: Monokai)</span> {#jan26}
Grow a seed

## JAN. 27 <span class="credit">(credit: Amy)</span> {#jan27}
Code for one hour. At the one hour mark, you're done

## JAN. 28 <span class="credit">(credit: Melissa)</span> {#jan28}
Skeuomorphism

## JAN. 29 <span class="credit">(credit: Melissa & Camille Roux)</span> {#jan29}
SDFs. (if we keep trying once per year, eventually we will be good at it!)

## JAN. 30 <span class="credit">(credit: Melissa)</span> {#jan30}
Shaders

## JAN. 31 <span class="credit">(credit: Neel & Monokai)</span> {#jan31}
Generative music / Generative audio / Generative sound


# [THANKS](thanks)
[Big thanks goes out to all these people](thanks) for contributing to GENUARY and generally being awesome.


<script>
  // this is the script to highlight the right prompt every day
  onload=_=>{
    let now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth(),
        day = now.getDate();
    
    if (year !== 2024 || month !== 0) return; // The if statement makes sure we only highlight days in January 2023
    let hash = `#jan${day}`;
    if (!location.hash) location = hash;
    let h2 = document.querySelector(hash);
    h2.classList.add("today");
    let p = document.createElement("p");
    p.className="share";
    p.innerHTML=`Share your results using the hashtags <b>#genuary${day}</b> (this prompt) and <b>#genuary</b>!`;
    h2.after(p)
  }
</script>
