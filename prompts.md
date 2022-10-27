# PROMPTS

## JAN.1 <span class="credit">(credit: [Piter Pasma](https://twitter.com/piterpasma))</span> {#jan1}

Draw a rectangle. No shenanigans.

[What even is a rectangle](https://en.wikipedia.org/wiki/Rectangle)  
{:.info}

## JAN.2 <span class="credit">(credit: [Piter Pasma](https://twitter.com/piterpasma))</span> {#jan2}

Reverse code golf: Make the longest program, how much code can you write in a day to make something interesting? 

## JAN.3 <span class="credit">([Piter Pasma](https://twitter.com/piterpasma))</span> {#jan3}

Four-fold rotational symmetry only. Bonus challenge: keep it to right angles only.

## JAN.27 <span class="credit">(credit: [Piter Pasma](https://twitter.com/piterpasma))</span> {#jan27}

<b style="background-color: #000000; color:#eee8dd">#000000</b>
<b style="background-color: #990000; color:#eee8dd">#990000</b>
<b style="background-color: #ffffff">#ffffff</b>

# [THANKS](thanks)

[Big thanks goes out to all these people](thanks) for contributing to GENUARY and generally being awesome.

# IDEAS

Came up with a brilliant idea for next year's prompt? There will be a link for suggestions, soon.

<script>
    function setHighlight () {
        const now = new Date();
        // The if statement makes sure we only highlight days in January 2023
        if (now.getFullYear() !== 2023 || now.getMonth() !== 0) return;
        const hash = "#jan" + now.getDate();
        if (!document.location.hash) document.location = hash;
        document.querySelector(hash).classList.add("today");
    }

    // Make sure we aren't trying to do this before
    // the browser has loaded the whole page
    onload=setHighlight;
</script>
