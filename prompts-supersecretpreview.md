# PROMPTS

## JAN. 1. <span class="credit">(credit: [Stranger in the Q](#))</span> {#jan1}

Vertical or horizontal lines only.

## JAN. 2. <span class="credit">(credit: [Monokai](#))</span> {#jan2}

Layers upon layers upon layers.

## JAN. 3. <span class="credit">(credit: [Roni](#))</span> {#jan3}

Exactly 42 lines of code.

## JAN. 4. <span class="credit">(credit: [Stranger in the Q](#))</span> {#jan4}

Black on black.

## JAN. 5. <span class="credit">(credit: [P1xelboy](#))</span> {#jan5}

Isometric Art - (No vanishing points).

## JAN. 6. <span class="credit">(credit: [Jonathan Barbeau](#))</span> {#jan6}

Make a landscape using only primitive shapes.

## JAN. 7. <span class="credit">(credit: [Camille Roux](#))</span> {#jan7}

Use software that is not intended to create art or images.

## JAN. 8. <span class="credit">(credit: [Piter](#))</span> {#jan8}

Draw one million of something.

## JAN. 9. <span class="credit">(credit: [Piter](#))</span> {#jan9}

The textile design patterns of public transport seating.

## JAN. 10. <span class="credit">(credit: [Darien](#))</span> {#jan10}

You can only use TAU in your code, no other number allowed.

TAU = 2 * pi = 6.2831853...
{:.info}

## JAN. 11. <span class="credit">(credit: [Rachel Ehrlich (Joy of Randomness) ](#))</span> {#jan11}

Impossible day - Try to do something that feels impossible for you to do. Maybe it is impossible. Maybe it’s too ambitious. Maybe it’s something you know nothing about how to accomplish.

## JAN. 12. <span class="credit">(credit: [Melissa](#))</span> {#jan12}

Subdivision.

## JAN. 13. <span class="credit">(credit: [Heeey](#))</span> {#jan13}

Triangles and nothing else.

## JAN. 14. <span class="credit">(credit: [Melissa](#))</span> {#jan14}

Pure black and white. No gray.

## JAN. 15. <span class="credit">(credit: [Melissa](#))</span> {#jan15}

Design a rug.

## JAN. 16. <span class="credit">(credit: [Stranger in the Q](#))</span> {#jan16}

Generative palette.

## JAN. 17. <span class="credit">(credit: [Roni](#))</span> {#jan17}

What happens if pi=4?

## JAN. 18. <span class="credit">(credit: [Melissa](#))</span> {#jan18}

What does wind look like?

## JAN. 19. <span class="credit">(credit: [Melissa](#))</span> {#jan19}

Op Art.

## JAN. 20. <span class="credit">(credit: [Melissa](#))</span> {#jan20}

Generative Architecture.

## JAN. 21. <span class="credit">(credit: [Darien](#))</span> {#jan21}

Create a collision detection system (no libraries allowed).

## JAN. 22. <span class="credit">(credit: [Melissa](#))</span> {#jan22}

Gradients only.

## JAN. 23. <span class="credit">(credit: [Melissa](#), [Roni](#))</span> {#jan23}

Inspired by brutalism.

## JAN. 24. <span class="credit">(credit: [Bruce Holmer](#))</span> {#jan24}

Geometric art - pick either a circle, rectangle, or triangle and use only that geometric shape.

## JAN. 25. <span class="credit">(credit: [Bruce Holmer](#), [Chris Barber (code_rgb)](#), [Heeey](#), [Monokai](#))</span> {#jan25}

One line that may or may not intersect itself

## JAN. 26. <span class="credit">(credit: [Melissa](#))</span> {#jan26}

Symmetry.

## JAN. 27. <span class="credit">(credit: [Melissa](#))</span> {#jan27}

Make something interesting with no randomness or noise or trig.

## JAN. 28. <span class="credit">(credit: [Sophia (fractal kitty)](#))</span> {#jan28}

Infinite Scroll.

## JAN. 29. <span class="credit">(credit: [Melissa](#))</span> {#jan29}

Grid-based graphic design.

## JAN. 30. <span class="credit">(credit: [Melissa](#))</span> {#jan30}

Abstract map.

Not to be confused with [AbstractMap](https://docs.oracle.com/javase/8/docs/api/java/util/AbstractMap.html).
{:.info}

## JAN. 31. <span class="credit">(credit: [Melissa](#))</span> {#jan31}

Pixel sorting.

You can sort pixels by weight, size, age, etc.
{:.info}

# [THANKS](thanks)

[Big thanks goes out to all these people](thanks) for contributing to GENUARY and generally being awesome.

# 2024 PROMPTS

Looking for the 2024 prompts? They're at [2024/prompts](2024/prompts).

<script>
  // this is the script to highlight the right prompt every day
  onload=_=>{
    let now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth(),
        day = now.getDate();

    if (year !== 2025 || month !== 0) return; // The if statement makes sure we only highlight days in January 2023 (TODO: somebody please update this comment)
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
